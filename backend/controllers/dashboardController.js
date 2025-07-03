const OtraslevyeController = require("./otraslevyeController");
const KollektivnyeController = require("./kollektivnyeController");
const RabotodateliController = require("./rabotodateliController");
const FinansirovanieController = require("./finansirovanieController");

class DashboardController {
  // данные для графика "Динамика заключения соглашений"
  async agreementTrends(req, res) {
    try {
      const kollektivnye = await KollektivnyeController.monthlyCount();
      const otraslevye = await OtraslevyeController.monthlyCount();

      const data = {
        "Отраслевые соглашения": otraslevye,
        "Коллективные договоры": kollektivnye,
      };

      return res.json(data);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данне для графика "Динамика договоров по кварталам"
  async quarterlyTrends(req, res) {
    const kollektivnye = await KollektivnyeController.quarterlyCount();
    const otraslevye = await OtraslevyeController.quarterlyCount();

    const data = {
      "Отраслевые соглашения": otraslevye,
      "Коллективные договоры": kollektivnye,
    };

    return res.json(data);
  }

  // Данные для графика "Сравнение районов с областью"
  async compareAreasWithRegion(req, res) {
    try {
      const kollektivnye = await KollektivnyeController.compareAreasWithRegion();
      const otraslevye = await OtraslevyeController.compareAreasWithRegion();
      const finansirovanie = await FinansirovanieController.compareAreasWithRegion();

      const data = {
        "Отраслевые соглашения": otraslevye,
        "Коллективные договоры": kollektivnye,
        "Финансирование": finansirovanie,
      };

      return res.json(data);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данные для графика "Статус актуализации данных"
  async actualizationStatus(req, res) {
    try {
      const kollektivnye = await KollektivnyeController.actualizationStatus();
      const otraslevye = await OtraslevyeController.actualizationStatus();
      const finansirovanie = await RabotodateliController.actualizationStatus();
      const rabotodateli = await FinansirovanieController.actualizationStatus();

      const data = {
        "Отраслевые соглашения": otraslevye,
        "Коллективные договоры": kollektivnye,
        "Реестр работодателей": rabotodateli,
        "Финансирование": finansirovanie,
      };

      return res.json(data);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }
}

module.exports = new DashboardController();
