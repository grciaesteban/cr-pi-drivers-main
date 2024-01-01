const express = require("express");
const driverRouter = express.Router();
const {getAllDriversHandler,getDriverByIdHandler,createDriverHandler} = require("../handlers/driversHandlers.js")


driverRouter.get("/", getAllDriversHandler)
driverRouter.get("/:idDriver", getDriverByIdHandler)
driverRouter.post("/", createDriverHandler)


module.exports=driverRouter;