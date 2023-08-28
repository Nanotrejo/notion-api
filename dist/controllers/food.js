"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notion = require("../client/notion-client");
const getFoodOptions = async (req, res) => {
    const foodOptions = await notion.getFoodOptions();
    return res.json(foodOptions);
};
module.exports = {
    getFoodOptions,
};
//# sourceMappingURL=food.js.map