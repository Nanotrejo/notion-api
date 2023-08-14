import { Request, Response } from "express";

const notion = require("../client/notion-client");

const getFoodOptions = async (req: Request,res: Response) => {
	const foodOptions = await notion.getFoodOptions();
	return res.json(foodOptions);
};

module.exports = {
	getFoodOptions,
};
