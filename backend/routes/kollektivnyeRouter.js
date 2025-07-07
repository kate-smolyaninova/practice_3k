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
router.get("/compareAreasWithRegion", KollektivnyeController.compareAreasWithRegion); // Данные для графика "Сравнение районов с областью"
router.get("/actualizationStatus", KollektivnyeController.actualizationStatus); // Данные для графика "Статус актуализации данных"
router.get("/employeeCount", KollektivnyeController.employeeCount); // Данные для инфоблока "Численность работников"
router.get("/contractsUpdated", KollektivnyeController.contractsUpdated); // Данные для инфоблока "Обновлено договоров"

// router.get("/contractsNoUpdated", KollektivnyeController.contractsNoUpdated); // Данные для инфоблока "Сколько КД не актуализировано"

module.exports = router;
