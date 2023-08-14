import { Request, Response } from "express";

const notion = require("../client/notion-client");

const getDataBase = async (req: Request,res: Response) => {
    const {auth, database} = req.headers; //change to body
	console.log(auth, database)
	const result = await notion.getDatabase(auth, database);
	return res.json(result);
};

module.exports = {
	getDataBase,
};
