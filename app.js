const express = require("express");
const apiRouter = require("./routes/api");
const {
  handle400,
  handle500,
  handle404,
  routeNotFound,
  handle422
} = require("./errors/index");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handle400);

app.use(handle404);

app.use(handle422);

app.use(handle500);

module.exports = app;
