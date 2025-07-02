const Router = require("express");
const KollektivnyeController = require("../controllers/kollektivnyeController");
const router = new Router();

// router.post("/", (req, res) => {
//   console.log("Получен запрос к /kollektivnye");
//   res.send("Маршрут работает!");
// });

router.get("/", KollektivnyeController.getData);
router.get("/monthlyCount", KollektivnyeController.monthlyCount);
router.get("/quarterlyCount", KollektivnyeController.quarterlyCount);
router.get("/industryCoverage", KollektivnyeController.industryCoverage); // данные для графика "Охват работников по отраслям деятельности"

module.exports = router;
