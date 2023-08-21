const express = require("express");
const app = express();

const food = require("../controllers/food");
const joker = require("../controllers/joker");
const portfolio = require("../controllers/portfolio");

app.get("/joker", joker.getDataBase);
app.get("/food", food.getFoodOptions);
app.get("/stack", portfolio.getStack);
app.get("/project", portfolio.getProject);
app.get("/experience", portfolio.getExperience);

module.exports = app;
