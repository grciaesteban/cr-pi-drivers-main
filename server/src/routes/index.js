const { Router } = require("express");
const router = Router();

const driversRouter = require("./driverRouter");
const teamsRouter = require("./teamRouter")

router.use("/drivers",driversRouter)
router.use("/teams",teamsRouter)

module.exports = router;
