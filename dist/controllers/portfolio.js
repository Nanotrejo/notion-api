"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notion = require("../client/notion-client");
const getStack = async (req, res) => {
    const results = await notion.getStack();
    return res.json(results);
};
const getProject = async (req, res) => {
    const results = await notion.getProject();
    return res.json(results);
};
const getExperience = async (req, res) => {
    const results = await notion.getExperience();
    return res.json(results);
};
const getCheatsheet = async (req, res) => {
    const results = await notion.getCheatsheet();
    return res.json(results);
};
const getCheatsheetById = async (req, res) => {
    const { id } = req.headers;
    const results = await notion.getCheatsheetById(id);
    return res.json(results);
};
module.exports = {
    getStack,
    getProject,
    getExperience,
    getCheatsheet,
    getCheatsheetById,
};
//# sourceMappingURL=portfolio.js.map