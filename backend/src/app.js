"use strict";

const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser');
const { join } = require("path");
const cors = require("cors");

// Load envs from .env file
if (fs.existsSync("./.env")) {
  require("dotenv").config();
}

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
const config = require("./config");
var apiResponse = require("./helpers/apiResponse");

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
var mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to %s", MONGODB_URL);
      console.log("App is running ... \n");
      console.log("Press CTRL + C to stop the process. \n");
    }
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });

var db = mongoose.connection;

// Initialize the app
let app = express();
app.listen(process.env.PORT);

app.set("config", config);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Require static assets from public folder
app.use(express.static(join(__dirname, 'public')));

// View engine setup
app.set("views", join(__dirname, "public"));
app.set("view engine", "html");

process.on("SIGINT", () => {
  console.log("stopping the server");
  process.exit(-1);
});

//allow cors
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function(req, res) { 
	return apiResponse.notFoundResponse(res, "Page not found");
});

module.exports = app;