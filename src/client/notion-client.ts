import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";


let client: Client;
const databaseId = process.env.DATABASE || "";
const databaseIdStack = process.env.DATABASE_STACK || "";
const databaseIdProject = process.env.DATABASE_PROJECT || "";
const databaseIdExperience = process.env.DATABASE_EXPERIENCE || "";
const databaseIdCheatsheet = process.env.DATABASE_CHEATSHEET || "";

client = new Client({
	auth: process.env.NOTION_TOKEN,
});
const n2m = new NotionToMarkdown({ notionClient: client });

// Simple in-memory cache for converted markdown (pageId -> { value, ts })
const mdCache = new Map<string, { value: string; ts: number }>();
const MD_CACHE_TTL = 1000 * 60 * 5; // 5 minutes
const MAX_CONCURRENCY = 4; // number of parallel conversions

async function fetchMarkdownForPage(pageId: string) {
	if (!pageId) return "";
	const now = Date.now();
	const cached = mdCache.get(pageId);
	if (cached && now - cached.ts < MD_CACHE_TTL) {
		return cached.value;
	}

	try {
		const mdBlocks = await n2m.pageToMarkdown(pageId);

		// first, convert notion-to-md result to a plain string (robust coercion)
		const mdResult = n2m.toMarkdownString(mdBlocks);
		let mdString = "";
		if (typeof mdResult === "string") {
			mdString = mdResult;
		} else if (Array.isArray(mdResult)) {
			mdString = mdResult.map((r: any) => typeof r === 'string' ? r : (r?.plain_text ?? JSON.stringify(r))).join('\n');
		} else if (mdResult && typeof mdResult === 'object') {
			const vals = Object.values(mdResult).map((v: any) => typeof v === 'string' ? v : (v?.plain_text ?? JSON.stringify(v)));
			mdString = vals.join('\n');
		} else {
			mdString = JSON.stringify(mdResult ?? "");
		}

		// build safe preview cards for bookmark/embed blocks and append to the markdown
		try {
			const cards: string[] = [];
			for (const _b of mdBlocks) {
				const b: any = _b;
				const bookmark = b.bookmark ?? b.block?.bookmark ?? null;
				if (bookmark) {
					const url = bookmark?.url ?? b.url ?? null;
					const meta = bookmark?.meta ?? bookmark?.og ?? null;
					const title = meta?.title ?? meta?.site_name ?? '';
					const desc = meta?.description ?? '';
					const thumb = meta?.thumbnail ?? meta?.image ?? '';
					let card = `> [${title || url}](${url})`;
					if (desc) card += `\n> \n> ${desc}`;
					if (thumb) card += `\n> \n> ![](${thumb})`;
					cards.push(card);
					continue;
				}

				const embed = b.embed ?? b.block?.embed ?? null;
				if (embed) {
					const src = embed?.url ?? b.url ?? null;
					if (src) {
						const yt = String(src).match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
						if (yt && yt[1]) {
							const id = yt[1];
							// add a small iframe card; frontend should sanitize or strip HTML if needed
							cards.push(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen loading="lazy"></iframe>`);
						} else {
							cards.push(`> [Embedded content](${src})`);
						}
					}
				}
			}

			if (cards.length) {
				mdString = mdString.trim() + '\n\n' + cards.join('\n\n');
			}
	} catch (e) {
			// ignore preview building errors
		}

		mdCache.set(pageId, { value: mdString, ts: now });
		return mdString;
	} catch (e) {
		// if conversion fails, cache empty string briefly to avoid retry storm
		mdCache.set(pageId, { value: "", ts: now });
		return "";
	}
}

// map with limited concurrency
async function mapWithConcurrency<T, R>(items: T[], mapper: (t: T) => Promise<R>, concurrency = MAX_CONCURRENCY) {
	const results: R[] = [];
	let i = 0;
	async function worker() {
		while (i < items.length) {
			const idx = i++;
			try {
				const r = await mapper(items[idx]);
				results[idx] = r;
			} catch (err) {
				results[idx] = null as any;
			}
		}
	}

	const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
	await Promise.all(workers);
	return results;
}

// renderMdBlocks removed - previews built inline in fetchMarkdownForPage

const getStack = async () => {
	try {
		const { results } = await client.databases.query({
			database_id: databaseIdStack,
		});
		return results?.map((page: any) => {
			const { properties } = page;
			const { name, img } = properties;
			return {
				id: name?.id ?? "",
				name: name?.title[0]?.plain_text ?? "",
				img: img?.files[0]?.file?.url ?? "",
			};
		});
	} catch (err) {
		return false;
	}
};

const getProject = async () => {
	try {
		const { results } = await client.databases.query({
			database_id: databaseIdProject,
		});
		return results?.map((page: any) => {
			const { properties } = page;
			const { name, img, description, subtitle, drive, github, web, stack } = properties;
			return {
				id: name?.id ?? "",
				name: name?.title[0]?.plain_text ?? "",
				img: img?.files[0]?.file?.url ?? "",
				description: description?.rich_text[0]?.plain_text ?? "",
				subtitle: subtitle?.rich_text[0]?.plain_text ?? "",
				drive: drive?.url ?? "",
				github: github?.url ?? "",
				web: web?.url ?? "",
				stack: stack?.multi_select.map((item: any) => item.name) ?? [],
			};
		});
	} catch (err) {
		return false;
	}
};
const getExperience = async () => {
	try {
		const { results } = await client.databases.query({
			database_id: databaseIdExperience,
		});
		return results?.map((page: any) => {
			const { properties } = page;
			const { title, subtitle, url, date, date_end, stack, img, type, position } = properties;
			return {
				id: title?.id ?? "",
				title: title?.title[0]?.plain_text ?? "",
				subtitle: subtitle?.rich_text[0]?.plain_text ?? "",
				url: url?.url ?? "",
				date: date?.date?.start ?? "",
				date_end: date_end?.date?.start ?? "",
				stack: stack?.multi_select.map((item: any) => item.name) ?? [],
				img: img?.files[0]?.file?.url ?? "",
				type: type?.select?.name ?? "",
				position: position?.select?.name ?? "",
			};
		});
	} catch (err) {
		return false;
	}
};
const getDatabase = async (auth: string, database: string) => {
	try {
		auth = auth ?? process.env.NOTION_TOKEN;
		const clientFast = new Client({ auth });
		const response = await clientFast.databases.query({
			database_id: database,
		});
		return response;
	} catch (err) {
		return false;
	}
};

const getFoodOptions = async () => {
	try {
		const food = await client.databases.query({
			database_id: databaseId,
		});
		return food;
	} catch (err) {
		return false;
	}
};

const getCheatsheet = async () => {
	try {
		const { results } = await client.databases.query({
			database_id: databaseIdCheatsheet,
		});

		// process items with limited concurrency and cache for markdown conversions
		const mapper = async (page: any) => {
			const { properties } = page;
			const { title, description, img, author, url, markdown, date } = properties;
			const relatedId = markdown?.relation?.[0]?.id ?? null;
			let markdownContent = relatedId ? await fetchMarkdownForPage(relatedId) : (markdown?.rich_text?.[0]?.plain_text ?? "");

			return {
				id: title?.title[0]?.plain_text?.replaceAll(' ', '_') ?? "",
				title: title?.title[0]?.plain_text ?? "",
				description: description?.rich_text[0]?.plain_text ?? "",
				img: img?.files[0]?.file?.url ?? "",
				author: author?.rich_text[0]?.plain_text ?? "",
				url: url?.url ?? "",
				markdown: markdownContent,
				date: date?.date?.start ?? ""
			};
		};

		const items = await mapWithConcurrency(results ?? [], mapper, MAX_CONCURRENCY);
		return items.filter(Boolean);
	} catch (err) {
		return false;
	}
};

const getCheatsheetById = async (id: string | any) => {
    try {
        if(!id) return false;
		
        const { results } = await client.databases.query({
            database_id: databaseIdCheatsheet,
        });
        const page: any = results.find((f: any) => f?.properties?.title?.title[0]?.plain_text === id?.replaceAll('_', ' '));
        if(!page) return false;

        const { properties } = page;
        const { title, description, img, author, url, markdown, date } = properties;

		// convertir la página relacionada a Markdown usando notion-to-md si existe
	const relatedPageId = markdown?.relation?.[0]?.id ?? null;
	const mdString = relatedPageId ? await fetchMarkdownForPage(relatedPageId) : (markdown?.rich_text?.[0]?.plain_text ?? "");

        return {
            id: title?.title[0]?.plain_text?.replaceAll(' ', '_') ?? "",
            title: title?.title[0]?.plain_text ?? "",
            description: description?.rich_text[0]?.plain_text ?? "",
            img: img?.files[0]?.file?.url ?? "",
            author: author?.rich_text[0]?.plain_text ?? "",
            url: url?.url ?? "",
            markdown: mdString,
            date: date?.date?.start ?? ""
        };
    } catch (err) {
        return false;
    }
};

module.exports = { getDatabase, getFoodOptions, getStack, getProject, getExperience, getCheatsheet, getCheatsheetById };
