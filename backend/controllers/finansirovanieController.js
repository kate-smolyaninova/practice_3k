const XLSX = require("xlsx");
const path = require("path");

class FinansirovanieController {
  async getData(req, res) {
    try {
      // const filePath = path.join(__dirname, "../data/kollektivnie_dogovory.xlsx");
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\finansirovanie.xlsx";

      const wb = XLSX.readFile(filePath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

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
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\finansirovanie.xlsx";

      const wb = XLSX.readFile(filePath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      const regionSummary = {
        "Липецкая область": 0,
        "МО": 0,
      };

      function normalizeCityName(name) {
        return name
          .toLowerCase()
          .replace(/^(г(ород)?\.?\s*|о(круг)?\.?\s*|м[ро]\.?\s*|мун\.?обл\.?\s*)/i, "")
          .replace(/(г(ород)?\.?|о(круг)?\.?|м[ро]\.?|мун\.?обл\.?)\s*$/i, "")
          .trim();
      }

      data.map((row) => {
        const city = normalizeCityName(row["Муниципальное образование"]);
        const period = row["Отчетный период"]?.toLowerCase().trim();

        const sum = parseFloat(row["Сумма, тыс. руб."]);

        if (period !== "2 квартал 2025") return; // исправить позже, АВТОМАТИЗИРОВАТЬ

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
      // const filePath = path.join(__dirname, "../data/kollektivnie_dogovory.xlsx");
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\finansirovanie.xlsx";

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

module.exports = new FinansirovanieController();
