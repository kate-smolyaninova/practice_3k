const Router = require("express");
const DashboardController = require("./../controllers/dashboardController");
const router = new Router();

router.get("/agreementTrends", DashboardController.agreementTrends); // данные для диаграммы "Динамика заключения соглашений"
router.get("/quarterlyTrends", DashboardController.quarterlyTrends); // Данне для графика "Динамика договоров по кварталам"

module.exports = router;
