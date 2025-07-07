const Router = require("express");
const RabotodateliController = require("./../controllers/rabotodateliController");
const router = new Router();

router.get("/", RabotodateliController.getData);
router.get("/ownershipStructure", RabotodateliController.ownershipStructure); // данные для диаграммы "Собственность: структура"
router.get("/organizationTypes", RabotodateliController.organizationTypes); // данные для диаграммы "Типология организаций"
router.get("/actualizationStatus", RabotodateliController.actualizationStatus); // Данные для графика "Статус актуализации данных"
router.get("/organizationCount", RabotodateliController.organizationCount); // Данные для инфолока "Количество организаций, ед"

module.exports = router;
