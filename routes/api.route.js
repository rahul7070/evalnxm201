const express = require("express");
const checkLocation = require("../controller/api.controller");

const app = express()
const apiRouter = express.Router();

apiRouter.get("/checklocation", checkLocation )


module.exports = apiRouter