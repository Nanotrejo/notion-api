const express = require("express");
const app = express();
const food = require("../controllers/food");
const joker = require("../controllers/joker");
const portfolio = require("../controllers/portfolio");
const youtube = require('../controllers/youtube');
app.get("/joker", joker.getDataBase);
app.get("/food", food.getFoodOptions);
app.get("/stack", portfolio.getStack);
app.get("/project", portfolio.getProject);
app.get("/experience", portfolio.getExperience);
app.get('/get-videos', youtube.videos);
app.get('/cheatsheet', portfolio.getCheatsheet);
app.get('/cheatsheet-by-id', portfolio.getCheatsheetById);
module.exports = app;
//# sourceMappingURL=routes.js.map