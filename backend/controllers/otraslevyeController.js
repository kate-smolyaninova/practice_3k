const XLSX = require("xlsx");
const path = require("path");

class OtraslevyeController {
  async getData(req, res) {
    try {
      // const filePath = path.join(__dirname, "../data/kollektivnie_dogovory.xlsx");
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\otraslevye_soglasheniya.xlsx";

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

  async monthlyCount(req, res) {
    try {
      // const filePath = path.join(__dirname, "../data/kollektivnie_dogovory.xlsx");
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\otraslevye_soglasheniya.xlsx";

      const wb = XLSX.readFile(filePath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      const monthCounts = {
        Январь: 0,
        Февраль: 0,
        Март: 0,
        Апрель: 0,
        Май: 0,
        Июнь: 0,
        Июль: 0,
        Август: 0,
        Сентябрь: 0,
        Октябрь: 0,
        Ноябрь: 0,
        Декабрь: 0,
      };

      const monthNames = {
        "01": "Январь",
        "02": "Февраль",
        "03": "Март",
        "04": "Апрель",
        "05": "Май",
        "06": "Июнь",
        "07": "Июль",
        "08": "Август",
        "09": "Сентябрь",
        "10": "Октябрь",
        "11": "Ноябрь",
        "12": "Декабрь",
      };

      data.map((row) => {
        const startDate = row["Начало действия"].toLowerCase().trim();
        if (!startDate) return;

        const pars = startDate.trim().split(".");
        const monthNum = pars[1];

        let today = new Date();
        if (Number(pars[2]) !== today.getFullYear()) return;

        const monthName = monthNames[monthNum];
        if (monthNames[monthNum]) {
          monthCounts[monthName]++;
        }
      });

      return monthCounts;
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  async quarterlyCount(req, res) {
    try {
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\otraslevye_soglasheniya.xlsx";

      const wb = XLSX.readFile(filePath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      const quarterlys = {
        "1 квартал 2025": 0,
        "2 квартал 2025": 0,
        "3 квартал 2025": 0,
        "4 квартал 2025": 0,
      };

      data.map((row) => {
        const data = row["Отчетный период"].toLowerCase().trim();
        if (data) {
          quarterlys[data]++;
        }
      });

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
      const filePath =
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\otraslevye_soglasheniya.xlsx";

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
        const current = row["Действующий"]?.toLowerCase().trim();

        if (period !== "2 квартал 2025") return; // исправить позже, АВТОМАТИЗИРОВАТЬ
        if (current !== "да") return;

        regionSummary["Липецкая область"] += 1;

        if (!city.includes("липец")) {
          regionSummary["МО"] += 1;
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
        "C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\otraslevye_soglasheniya.xlsx";

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

      // return res.json(actualizationStatusCount);
      return actualizationStatusCount;
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }
}

module.exports = new OtraslevyeController();
