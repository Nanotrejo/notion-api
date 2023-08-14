import { Client } from "@notionhq/client";

let client: Client;
const databaseId = process.env.DATABASE || "";
const databaseIdStack = process.env.DATABASE_STACK || "";
const databaseIdProject = process.env.DATABASE_PROJECT || "";

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
				id: name?.id ?? '',
				name: name?.title[0]?.plain_text ?? '',
				img: img?.files[0]?.file?.url ?? '',
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
				id: name?.id ?? '',
				name: name?.title[0]?.plain_text ?? '',
				img: img?.files[0]?.file?.url ?? '',
				description: description?.rich_text[0]?.plain_text ?? '',
				subtitle: subtitle?.rich_text[0]?.plain_text ?? '',
				drive: drive?.url ?? '',
				github: github?.url ?? '',
				web: web?.url ?? '',
				stack: stack?.multi_select.map((item: any) => item.name) ?? [],
			};
		});
	} catch (err) {
		return false;
	}
}
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

module.exports = { getDatabase, getFoodOptions, getStack, getProject };
