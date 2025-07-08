const Router = require("express");
const FinansirovanieController = require("./../controllers/finansirovanieController");
const router = new Router();

router.get("/", FinansirovanieController.getData);
router.get("/actualizationStatus", FinansirovanieController.actualizationStatus); // Данные для графика "Статус актуализации данных"
router.get("/compareAreasWithRegion", FinansirovanieController.compareAreasWithRegion); // Данные для графика "Сравнение районов с областью"
router.get("/financingAmount", FinansirovanieController.financingAmount); // Данные для графика "Сравнение районов с областью"

module.exports = router;
