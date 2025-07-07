const Router = require("express");
const OtraslevyeController = require("./../controllers/otraslevyeController");
const router = new Router();

router.get("/", OtraslevyeController.getData);
router.get("/monthlyCount", OtraslevyeController.monthlyCount);
router.get("/quarterlyCount", OtraslevyeController.quarterlyCount);
router.get("/compareAreasWithRegion", OtraslevyeController.compareAreasWithRegion); // Данные для графика "Сравнение районов с областью"
router.get("/actualizationStatus", OtraslevyeController.actualizationStatus); // Данные для графика "Статус актуализации данных"
router.get("/agreementsUpdated", OtraslevyeController.agreementsUpdated);   // Данные для инфоблока "Обновлено соглашений"

module.exports = router;
