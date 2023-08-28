"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notion = require("../client/notion-client");
const getDataBase = async (req, res) => {
    const { auth, database } = req.headers;
    console.log(auth, database);
    const result = await notion.getDatabase(auth, database);
    return res.json(result);
};
module.exports = {
    getDataBase,
};
//# sourceMappingURL=joker.js.map