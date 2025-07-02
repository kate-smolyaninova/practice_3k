const Router = require("express");
const OtraslevyeController = require("./../controllers/otraslevyeController");
const router = new Router();

router.get("/", OtraslevyeController.getData);
router.get("/monthlyCount", OtraslevyeController.monthlyCount);
router.get("/quarterlyCount", OtraslevyeController.quarterlyCount);

module.exports = router;
