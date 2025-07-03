const { normalizeCityName } = require("../utils/normalize");
const { readExcelFile } = require("../utils/readExcelFile");
const { actualizationStatusData } = require("../utils/actualizationStatusData");

const fileName = "rabotodateli";

class RabotodateliController {
  async getData(req, res) {
    try {
      const data = readExcelFile(fileName);
      // console.log(data);
      return res.json(data);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данные для постороения диаграммы "Собственность: структура"
  async ownershipStructure(req, res) {
    try {
      const data = readExcelFile(fileName);

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
      const data = readExcelFile(fileName);

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
      const data = readExcelFile(fileName);

      const actualizationStatusCount = actualizationStatusData(data);

      return actualizationStatusCount;
      // return res.json(actualizationStatusCount);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }
}

module.exports = new RabotodateliController();
