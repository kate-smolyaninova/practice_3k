const XLSX = require("xlsx");
const path = require("path");

class RabotodateliController {
  async getData(req, res) {
    try {
      // const filePath = path.join(__dirname, "../data/kollektivnie_dogovory.xlsx");
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\rabotodateli.xlsx";

      const wb = XLSX.readFile(filePath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      console.log(data);
      return res.json(data);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данные для постороения диаграммы "Собственность: структура"
  async ownershipStructure(req, res) {
    try {
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\rabotodateli.xlsx";

      const wb = XLSX.readFile(filePath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      const ownershipTypes = {
        Муниципальная: 0,
        Частная: 0,
        Государственная: 0,
      };

      data.map((row) => {
        const form = row["Форма собственности"].toLowerCase().trim();

        if (form.includes("муницип")) {
          ownershipTypes.Муниципальная += 1;
        } else if (form.includes("частн")) {
          ownershipTypes.Частная += 1;
        } else if (form.includes("госуд")) {
          ownershipTypes.Государственная += 1;
        }
      });

      return res.json(ownershipTypes);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данные для постороения диаграммы диаграммы "Типология организаций"
  async organizationTypes(req, res) {
    try {
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\rabotodateli.xlsx";

      const wb = XLSX.readFile(filePath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      const organizationTypes = {
        Малая: 0,
        Средняя: 0,
        Крупная: 0,
      };

      data.map((row) => {
        const type = row["Тип организации"].toLowerCase().trim();

        if (type.includes("мал")) {
          organizationTypes.Малая += 1;
        } else if (type.includes("сред")) {
          organizationTypes.Средняя += 1;
        } else if (type.includes("круп")) {
          organizationTypes.Крупная += 1;
        }
      });

      return res.json(organizationTypes);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данные для графика "Статус актуализации данных"
  async actualizationStatus(req, res) {
    try {
      // const filePath = path.join(__dirname, "../data/kollektivnie_dogovory.xlsx");
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\rabotodateli.xlsx";

      const wb = XLSX.readFile(filePath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      const actualizationStatusCount = {
        "не актуализировано": 0,
        "данные актуализированы": 0,
      };

      data.map((row) => {
        const period = row["Отчетный период"]?.toLowerCase().trim();
        const isActualize = row["Статус согласования"]?.toLowerCase().trim();

        if (period !== "2 квартал 2025") return; // исправить позже, АВТОМАТИЗИРОВАТЬ

        isActualize === "данные актуализированы"
          ? (actualizationStatusCount["данные актуализированы"] += 1)
          : (actualizationStatusCount["не актуализировано"] += 1);
      });

      return actualizationStatusCount;
      // return res.json(actualizationStatusCount);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }
}

module.exports = new RabotodateliController();
