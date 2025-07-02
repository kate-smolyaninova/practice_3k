const XLSX = require("xlsx");
const path = require("path");
const OtraslevyeController = require("./otraslevyeController");
const KollektivnyeController = require("./kollektivnyeController");

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
}

module.exports = new DashboardController();
