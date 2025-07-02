const Router = require("express");
const RabotodateliController = require("./../controllers/rabotodateliController");
const router = new Router();

router.get("/", RabotodateliController.getData);
router.get("/ownershipStructure", RabotodateliController.ownershipStructure); // данные для диаграммы "Собственность: структура"
router.get("/organizationTypes", RabotodateliController.organizationTypes); // данные для диаграммы "Типология организаций"

module.exports = router;
