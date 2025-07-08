const { normalizeCityName } = require("../utils/normalize");
const { readExcelFile } = require("../utils/readExcelFile");
const { compareAreas } = require("../utils/compareAreas");
const { actualizationStatusData } = require("../utils/actualizationStatusData");
const { quarterlyCountData } = require("../utils/quarterlyCountData");
const { monthlyCountData } = require("../utils/monthlyCountData");
const getPreviousQuarter = require("./../utils/getPreviousQuarter");
const { getCurrentQuarter } = require("./../utils/getCurrentQuarter");

const fileName = "otraslevye_soglasheniya";

class OtraslevyeController {
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

  // данные для графика "Динамика заключения соглашений"
  async monthlyCount(req, res) {
    try {
      const data = readExcelFile(fileName);

      const monthCounts = monthlyCountData(data);

      return monthCounts;
      // return res.json(monthCounts)
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данне для графика "Динамика договоров по кварталам"
  async quarterlyCount(req, res) {
    try {
      const data = readExcelFile(fileName);

      const quarterlys = quarterlyCountData(data);

      return quarterlys;
      // return res.json(quarterlys);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данные для графика "Сравнение районов с областью"
  async compareAreasWithRegion(req, res) {
    try {
      const data = readExcelFile(fileName);

      const regionSummary = compareAreas(data);

      return regionSummary;
      // return res.json(regionSummary);
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

      // return res.json(actualizationStatusCount);
      return actualizationStatusCount;
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данные для инфоблока "Обновлено соглашений"
  async agreementsUpdated(req, res) {
    try {
      const data = readExcelFile(fileName);

      const infoBlock = {
        Заголовок: "Обновлено соглашений, ед",
        Значение: 0,
        Процент: 0,
      };

      const currentQuarter = getCurrentQuarter().toLowerCase();
      const previousQuarter = getPreviousQuarter(currentQuarter);

      let currentQuarterTotal = 0;
      let previousQuarterTotal = 0;

      data.forEach((row) => {
        const period = row["Отчетный период"]?.toLowerCase().trim();
        const status = row["Статус согласования"]?.toLowerCase().trim();

        if (status === "данные актуализированы") {
          if (period === currentQuarter) {
            currentQuarterTotal += 1;
          } else if (period === previousQuarter) {
            previousQuarterTotal += 1;
          }
        }
      });

      infoBlock["Значение"] = currentQuarterTotal;

      if (previousQuarterTotal > 0) {
        infoBlock["Процент"] = (
          ((currentQuarterTotal - previousQuarterTotal) / previousQuarterTotal) *
          100
        ).toFixed(2);
      } else if (currentQuarterTotal > 0) {
        infoBlock["Процент"] = "100";
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

module.exports = new OtraslevyeController();
