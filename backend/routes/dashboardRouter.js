const Router = require("express");
const DashboardController = require("./../controllers/dashboardController");
const router = new Router();

router.get("/agreementTrends", DashboardController.agreementTrends); // данные для диаграммы "Динамика заключения соглашений"
router.get("/quarterlyTrends", DashboardController.quarterlyTrends); // Данне для графика "Динамика договоров по кварталам"
router.get("/compareAreasWithRegion", DashboardController.compareAreasWithRegion); // Данные для графика "Сравнение районов с областью"
router.get("/actualizationStatus", DashboardController.actualizationStatus); // Данные для графика "Статус актуализации данных"
router.get("/infoblock", DashboardController.infoblock); // Данные для всех инфоблоков

module.exports = router;
