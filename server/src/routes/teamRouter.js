const express = require("express");
const teamRouter = express.Router();
const {getTeamsHandler} = require("../handlers/teamHandler")

teamRouter.get("/",getTeamsHandler)

module.exports=teamRouter;