import { Client } from "@notionhq/client";

let client: Client;
const databaseId = process.env.DATABASE || "";
const databaseIdStack = process.env.DATABASE_STACK || "";
const databaseIdProject = process.env.DATABASE_PROJECT || "";
const databaseIdExperience = process.env.DATABASE_EXPERIENCE || "";
const databaseIdCheatsheet = process.env.DATABASE_CHEATSHEET || "";

client = new Client({
	auth: process.env.NOTION_TOKEN,
});

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
		return results?.map((page: any) => {
			const { properties } = page;
			const { title, description, img, author, url, markdown,date } = properties;
			return {
				id: title?.title[0]?.plain_text?.replaceAll(' ', '_') ?? "",
				title: title?.title[0]?.plain_text ?? "",
				description: description?.rich_text[0]?.plain_text ?? "",
				img: img?.files[0]?.file?.url ?? "",
				author: author?.rich_text[0]?.plain_text ?? "",
				url: url?.url ?? "",
				markdown: markdown?.rich_text[0]?.plain_text ?? "",
				date: date?.date?.start ?? ""
			};
		});
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
		return results.filter((f: any) => f?.properties?.title?.title[0]?.plain_text === id?.replaceAll('_', ' '))?.map((page: any) => {
			const { properties } = page;
			const { title, description, img, author, url, markdown,date } = properties;
			return {
				id: title?.title[0]?.plain_text?.replaceAll(' ', '_') ?? "",
				title: title?.title[0]?.plain_text ?? "",
				description: description?.rich_text[0]?.plain_text ?? "",
				img: img?.files[0]?.file?.url ?? "",
				author: author?.rich_text[0]?.plain_text ?? "",
				url: url?.url ?? "",
				markdown: markdown?.rich_text.map((m: any) => m?.plain_text).join('') ?? "",
				date: date?.date?.start ?? ""
			};
		})[0];
	} catch (err) {
		return false;
	}
};

module.exports = { getDatabase, getFoodOptions, getStack, getProject, getExperience, getCheatsheet, getCheatsheetById };
