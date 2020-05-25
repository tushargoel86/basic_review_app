var express = require("express");
var reviewRouter = require("./review");

var app = express();

app.use("/reviews/", reviewRouter);

module.exports = app;