import { Request, Response } from "express";

const notion = require("../client/notion-client");

const getStack = async (req: Request, res: Response) => {
	const results = await notion.getStack();
	return res.json(results);
};

const getProject = async (req: Request, res: Response) => {
	const results = await notion.getProject();
	return res.json(results);
};

const getExperience = async (req: Request, res: Response) => {
	const results = await notion.getExperience();
	return res.json(results);
};

module.exports = {
	getStack,
	getProject,
	getExperience
};
