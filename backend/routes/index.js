const Router = require("express");

const kollektivnyeRouter = require("./kollektivnyeRouter.js");
const otraslevyeRouter = require("./otraslevyeRouter.js");
const finansirovanieRouter = require("./finansirovanieRouter.js");
const rabotodateliRouter = require("./rabotodateliRouter.js");
const dashboardRouter = require("./dashboardRouter")

const router = new Router();

router.use("/kollektivnye", kollektivnyeRouter);
router.use("/otraslevye", otraslevyeRouter);
router.use("/finansirovanie", finansirovanieRouter);
router.use("/rabotodateli", rabotodateliRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
