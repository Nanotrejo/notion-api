"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@notionhq/client");
let client;
const databaseId = process.env.DATABASE || "";
const databaseIdStack = process.env.DATABASE_STACK || "";
const databaseIdProject = process.env.DATABASE_PROJECT || "";
const databaseIdExperience = process.env.DATABASE_EXPERIENCE || "";
const databaseIdCheatsheet = process.env.DATABASE_CHEATSHEET || "";
client = new client_1.Client({
    auth: process.env.NOTION_TOKEN,
});
const getStack = async () => {
    try {
        const { results } = await client.databases.query({
            database_id: databaseIdStack,
        });
        return results === null || results === void 0 ? void 0 : results.map((page) => {
            var _a, _b, _c, _d, _e, _f;
            const { properties } = page;
            const { name, img } = properties;
            return {
                id: (_a = name === null || name === void 0 ? void 0 : name.id) !== null && _a !== void 0 ? _a : "",
                name: (_c = (_b = name === null || name === void 0 ? void 0 : name.title[0]) === null || _b === void 0 ? void 0 : _b.plain_text) !== null && _c !== void 0 ? _c : "",
                img: (_f = (_e = (_d = img === null || img === void 0 ? void 0 : img.files[0]) === null || _d === void 0 ? void 0 : _d.file) === null || _e === void 0 ? void 0 : _e.url) !== null && _f !== void 0 ? _f : "",
            };
        });
    }
    catch (err) {
        return false;
    }
};
const getProject = async () => {
    try {
        const { results } = await client.databases.query({
            database_id: databaseIdProject,
        });
        return results === null || results === void 0 ? void 0 : results.map((page) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            const { properties } = page;
            const { name, img, description, subtitle, drive, github, web, stack } = properties;
            return {
                id: (_a = name === null || name === void 0 ? void 0 : name.id) !== null && _a !== void 0 ? _a : "",
                name: (_c = (_b = name === null || name === void 0 ? void 0 : name.title[0]) === null || _b === void 0 ? void 0 : _b.plain_text) !== null && _c !== void 0 ? _c : "",
                img: (_f = (_e = (_d = img === null || img === void 0 ? void 0 : img.files[0]) === null || _d === void 0 ? void 0 : _d.file) === null || _e === void 0 ? void 0 : _e.url) !== null && _f !== void 0 ? _f : "",
                description: (_h = (_g = description === null || description === void 0 ? void 0 : description.rich_text[0]) === null || _g === void 0 ? void 0 : _g.plain_text) !== null && _h !== void 0 ? _h : "",
                subtitle: (_k = (_j = subtitle === null || subtitle === void 0 ? void 0 : subtitle.rich_text[0]) === null || _j === void 0 ? void 0 : _j.plain_text) !== null && _k !== void 0 ? _k : "",
                drive: (_l = drive === null || drive === void 0 ? void 0 : drive.url) !== null && _l !== void 0 ? _l : "",
                github: (_m = github === null || github === void 0 ? void 0 : github.url) !== null && _m !== void 0 ? _m : "",
                web: (_o = web === null || web === void 0 ? void 0 : web.url) !== null && _o !== void 0 ? _o : "",
                stack: (_p = stack === null || stack === void 0 ? void 0 : stack.multi_select.map((item) => item.name)) !== null && _p !== void 0 ? _p : [],
            };
        });
    }
    catch (err) {
        return false;
    }
};
const getExperience = async () => {
    try {
        const { results } = await client.databases.query({
            database_id: databaseIdExperience,
        });
        return results === null || results === void 0 ? void 0 : results.map((page) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            const { properties } = page;
            const { title, subtitle, url, date, date_end, stack, img, type, position } = properties;
            return {
                id: (_a = title === null || title === void 0 ? void 0 : title.id) !== null && _a !== void 0 ? _a : "",
                title: (_c = (_b = title === null || title === void 0 ? void 0 : title.title[0]) === null || _b === void 0 ? void 0 : _b.plain_text) !== null && _c !== void 0 ? _c : "",
                subtitle: (_e = (_d = subtitle === null || subtitle === void 0 ? void 0 : subtitle.rich_text[0]) === null || _d === void 0 ? void 0 : _d.plain_text) !== null && _e !== void 0 ? _e : "",
                url: (_f = url === null || url === void 0 ? void 0 : url.url) !== null && _f !== void 0 ? _f : "",
                date: (_h = (_g = date === null || date === void 0 ? void 0 : date.date) === null || _g === void 0 ? void 0 : _g.start) !== null && _h !== void 0 ? _h : "",
                date_end: (_k = (_j = date_end === null || date_end === void 0 ? void 0 : date_end.date) === null || _j === void 0 ? void 0 : _j.start) !== null && _k !== void 0 ? _k : "",
                stack: (_l = stack === null || stack === void 0 ? void 0 : stack.multi_select.map((item) => item.name)) !== null && _l !== void 0 ? _l : [],
                img: (_p = (_o = (_m = img === null || img === void 0 ? void 0 : img.files[0]) === null || _m === void 0 ? void 0 : _m.file) === null || _o === void 0 ? void 0 : _o.url) !== null && _p !== void 0 ? _p : "",
                type: (_r = (_q = type === null || type === void 0 ? void 0 : type.select) === null || _q === void 0 ? void 0 : _q.name) !== null && _r !== void 0 ? _r : "",
                position: (_t = (_s = position === null || position === void 0 ? void 0 : position.select) === null || _s === void 0 ? void 0 : _s.name) !== null && _t !== void 0 ? _t : "",
            };
        });
    }
    catch (err) {
        return false;
    }
};
const getDatabase = async (auth, database) => {
    try {
        auth = auth !== null && auth !== void 0 ? auth : process.env.NOTION_TOKEN;
        const clientFast = new client_1.Client({ auth });
        const response = await clientFast.databases.query({
            database_id: database,
        });
        return response;
    }
    catch (err) {
        return false;
    }
};
const getFoodOptions = async () => {
    try {
        const food = await client.databases.query({
            database_id: databaseId,
        });
        return food;
    }
    catch (err) {
        return false;
    }
};
const getCheatsheet = async () => {
    try {
        const { results } = await client.databases.query({
            database_id: databaseIdCheatsheet,
        });
        return results === null || results === void 0 ? void 0 : results.map((page) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
            const { properties } = page;
            const { title, description, img, author, url, markdown, date } = properties;
            return {
                id: (_c = (_b = (_a = title === null || title === void 0 ? void 0 : title.title[0]) === null || _a === void 0 ? void 0 : _a.plain_text) === null || _b === void 0 ? void 0 : _b.replaceAll(' ', '_')) !== null && _c !== void 0 ? _c : "",
                title: (_e = (_d = title === null || title === void 0 ? void 0 : title.title[0]) === null || _d === void 0 ? void 0 : _d.plain_text) !== null && _e !== void 0 ? _e : "",
                description: (_g = (_f = description === null || description === void 0 ? void 0 : description.rich_text[0]) === null || _f === void 0 ? void 0 : _f.plain_text) !== null && _g !== void 0 ? _g : "",
                img: (_k = (_j = (_h = img === null || img === void 0 ? void 0 : img.files[0]) === null || _h === void 0 ? void 0 : _h.file) === null || _j === void 0 ? void 0 : _j.url) !== null && _k !== void 0 ? _k : "",
                author: (_m = (_l = author === null || author === void 0 ? void 0 : author.rich_text[0]) === null || _l === void 0 ? void 0 : _l.plain_text) !== null && _m !== void 0 ? _m : "",
                url: (_o = url === null || url === void 0 ? void 0 : url.url) !== null && _o !== void 0 ? _o : "",
                markdown: (_q = (_p = markdown === null || markdown === void 0 ? void 0 : markdown.rich_text[0]) === null || _p === void 0 ? void 0 : _p.plain_text) !== null && _q !== void 0 ? _q : "",
                date: (_s = (_r = date === null || date === void 0 ? void 0 : date.date) === null || _r === void 0 ? void 0 : _r.start) !== null && _s !== void 0 ? _s : ""
            };
        });
    }
    catch (err) {
        return false;
    }
};
const getCheatsheetById = async (id) => {
    var _a;
    try {
        if (!id)
            return false;
        const { results } = await client.databases.query({
            database_id: databaseIdCheatsheet,
        });
        return (_a = results.filter((f) => { var _a, _b, _c; return ((_c = (_b = (_a = f === null || f === void 0 ? void 0 : f.properties) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.title[0]) === null || _c === void 0 ? void 0 : _c.plain_text) === (id === null || id === void 0 ? void 0 : id.replaceAll('_', ' ')); })) === null || _a === void 0 ? void 0 : _a.map((page) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            const { properties } = page;
            const { title, description, img, author, url, markdown, date } = properties;
            return {
                id: (_c = (_b = (_a = title === null || title === void 0 ? void 0 : title.title[0]) === null || _a === void 0 ? void 0 : _a.plain_text) === null || _b === void 0 ? void 0 : _b.replaceAll(' ', '_')) !== null && _c !== void 0 ? _c : "",
                title: (_e = (_d = title === null || title === void 0 ? void 0 : title.title[0]) === null || _d === void 0 ? void 0 : _d.plain_text) !== null && _e !== void 0 ? _e : "",
                description: (_g = (_f = description === null || description === void 0 ? void 0 : description.rich_text[0]) === null || _f === void 0 ? void 0 : _f.plain_text) !== null && _g !== void 0 ? _g : "",
                img: (_k = (_j = (_h = img === null || img === void 0 ? void 0 : img.files[0]) === null || _h === void 0 ? void 0 : _h.file) === null || _j === void 0 ? void 0 : _j.url) !== null && _k !== void 0 ? _k : "",
                author: (_m = (_l = author === null || author === void 0 ? void 0 : author.rich_text[0]) === null || _l === void 0 ? void 0 : _l.plain_text) !== null && _m !== void 0 ? _m : "",
                url: (_o = url === null || url === void 0 ? void 0 : url.url) !== null && _o !== void 0 ? _o : "",
                markdown: (_p = markdown === null || markdown === void 0 ? void 0 : markdown.rich_text.map((m) => m === null || m === void 0 ? void 0 : m.plain_text).join('')) !== null && _p !== void 0 ? _p : "",
                date: (_r = (_q = date === null || date === void 0 ? void 0 : date.date) === null || _q === void 0 ? void 0 : _q.start) !== null && _r !== void 0 ? _r : ""
            };
        })[0];
    }
    catch (err) {
        return false;
    }
};
module.exports = { getDatabase, getFoodOptions, getStack, getProject, getExperience, getCheatsheet, getCheatsheetById };
//# sourceMappingURL=notion-client.js.map