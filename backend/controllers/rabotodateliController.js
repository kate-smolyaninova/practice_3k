const { readExcelFile } = require("../utils/readExcelFile");
const { actualizationStatusData } = require("../utils/actualizationStatusData");
const getPreviousQuarter = require("./../utils/getPreviousQuarter");
const { getCurrentQuarter } = require("./../utils/getCurrentQuarter");

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

  // Данные для инфолока "Количество организаций, ед"
  async organizationCount(req, res) {
    try {
      const data = readExcelFile(fileName);

      const infoBlock = {
        Заголовок: "Количество организаций, ед",
        Значение: 0,
        Процент: 0,
      };

      const currentQuarter = getCurrentQuarter().toLowerCase();
      const previousQuarter = getPreviousQuarter(currentQuarter);

      const currentOrgs = new Set();
      const previousOrgs = new Set();

      data.map((row) => {
        const period = row["Отчетный период"]?.toLowerCase().trim();
        const name = row["Наименование"]?.trim();

        if (!name) return; 

        if (period === currentQuarter) {
          currentOrgs.add(name);
        } else if (period === previousQuarter) {
          previousOrgs.add(name);
        }
      });

      const currentCount = currentOrgs.size;
      const previousCount = previousOrgs.size;

      infoBlock["Значение"] = currentCount;

      if (previousCount > 0) {
        infoBlock["Процент"] = (
          ((currentCount - previousCount) / previousCount) *
          100
        ).toFixed(2);
      } else {
        infoBlock["Процент"] = "0";
      }

      return infoBlock;
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }
}

module.exports = new RabotodateliController();
