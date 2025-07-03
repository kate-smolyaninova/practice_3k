const { normalizeCityName } = require("../utils/normalize");
const { readExcelFile } = require("../utils/readExcelFile");
// const { compareAreas } = require("../utils/compareAreas");
const { actualizationStatusData } = require("../utils/actualizationStatusData");
const { getCurrentQuarter } = require("../utils/getCurrentQuarter");

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
}

module.exports = new FinansirovanieController();
