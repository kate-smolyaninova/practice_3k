const { normalizeCityName } = require("../utils/normalize");
const { readExcelFile } = require("../utils/readExcelFile");
// const { compareAreas } = require("../utils/compareAreas");
const { actualizationStatusData } = require("../utils/actualizationStatusData");
const { getCurrentQuarter } = require("../utils/getCurrentQuarter");
const getPreviousQuarter = require("./../utils/getPreviousQuarter");

const fileName = "finansirovanie";

class FinansirovanieController {
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

  // Данные для графика "Сравнение районов с областью"
  async compareAreasWithRegion(req, res) {
    try {
      const data = readExcelFile(fileName);

      const regionSummary = {
        "Липецкая область": 0,
        "МО": 0,
      };

      data.map((row) => {
        const city = normalizeCityName(row["Муниципальное образование"]);
        const period = row["Отчетный период"]?.toLowerCase().trim();
        const sum = parseFloat(row["Сумма, тыс. руб."]);

        if (period !== getCurrentQuarter()) return;

        regionSummary["Липецкая область"] += sum;

        if (!city.includes("липец")) {
          regionSummary["МО"] += sum;
        }
      });

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

      return actualizationStatusCount;
      // return res.json(actualizationStatusCount);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  async financingAmount(req, res) {
    try {
      const data = readExcelFile(fileName);

      const infoBlock = {
        Заголовок: "Финансирование, млн руб",
        Значение: 0,
        Процент: 0,
      };

      const currentQuarter = getCurrentQuarter().toLowerCase();
      const previousQuarter = getPreviousQuarter(currentQuarter);

      let currentQuarterSum = 0;
      let previousQuarterSum = 0;

      data.forEach((row) => {
        const period = row["Отчетный период"]?.toLowerCase().trim();
        const sum = parseFloat(row["Сумма, тыс. руб."]);

        if (isNaN(sum)) return;

        if (period === currentQuarter) {
          currentQuarterSum += sum;
        } else if (period === previousQuarter) {
          previousQuarterSum += sum;
        }
      });

      // Переводим из тысяч в миллионы
      const currentInMillions = currentQuarterSum / 1000;
      const previousInMillions = previousQuarterSum / 1000;

      infoBlock["Значение"] = Number(currentInMillions.toFixed(2));

      if (previousInMillions > 0) {
        infoBlock["Процент"] = (
          ((currentInMillions - previousInMillions) / previousInMillions) *
          100
        ).toFixed(2);
      } else if (currentInMillions > 0) {
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

module.exports = new FinansirovanieController();
