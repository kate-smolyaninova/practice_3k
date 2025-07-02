const Router = require("express");
const FinansirovanieController = require("./../controllers/finansirovanieController");
const router = new Router();

router.get("/", FinansirovanieController.getData);

module.exports = router;
