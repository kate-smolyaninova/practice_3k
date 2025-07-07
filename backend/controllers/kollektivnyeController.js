const { normalizeCityName } = require("../utils/normalize");
const { readExcelFile } = require("../utils/readExcelFile");
const { compareAreas } = require("../utils/compareAreas");
const { actualizationStatusData } = require("../utils/actualizationStatusData");
const { quarterlyCountData } = require("../utils/quarterlyCountData");
const { monthlyCountData } = require("../utils/monthlyCountData");
const { getCurrentQuarter } = require("./../utils/getCurrentQuarter");
const getPreviousQuarter = require("./../utils/getPreviousQuarter");
const fileName = "kollektivnie_dogovory";

class KollektivnyeController {
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

      // return res.json(monthCounts);
      return monthCounts;
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

      // return res.json(quarterlys);
      return quarterlys;
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данные для графика "Охват работников по отраслям деятельности"
  async industryCoverage(req, res) {
    try {
      const data = readExcelFile(fileName);

      const allCities = [
        "Воловский МО",
        "Грязинский МР",
        "Данковский МР",
        "Добринский МР",
        "Добровский МО",
        "Долгоруковский МР",
        "г. Елец",
        "Елецкий МР",
        "Задонский МР",
        "Измалковский МО",
        "Краснинский МР",
        "Лебедянский МР",
        "Лев-Толстовский МР",
        "г. Липецк",
        "Липецкий МР",
        "Становлянский МО",
        "Тербунский МР",
        "Усманский МР",
        "Хлевенский МР",
        "Чаплыгинский МР",
      ];

      const normalizeCity = allCities.map((city) => normalizeCityName(city));

      const allIndustries = ["образование", "медицина", "культура", "иные отрасли"];

      const industryCoverage = {};

      normalizeCity.map((city) => {
        industryCoverage[city] = {};
        allIndustries.forEach((industry) => {
          industryCoverage[city][industry] = 0;
        });
      });

      data.map((row) => {
        const city = normalizeCityName(row["Муниципальное образование"]);
        let industry = row["Вид деятельности"].toLowerCase().trim();

        const count = parseInt(row["Численность охваченных работников"]);
        const quarterlys = row["Отчетный период"].toLowerCase().trim();

        if (quarterlys !== getCurrentQuarter()) return;

        if (!allIndustries.includes(industry)) {
          industry = "иные отрасли";
        }

        if (normalizeCity.includes(city) && allIndustries.includes(industry)) {
          industryCoverage[city][industry] += count;
        }
      });

      // data.forEach((row) => {
      //   console.log(row["Вид деятельности"]);
      // });

      return res.json(industryCoverage);
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

      return actualizationStatusCount;
      // return res.json(actualizationStatusCount);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данные для инфоблока "Численность работников"
  async employeeCount(req, res) {
    try {
      const data = readExcelFile(fileName);

      const infoBlock = {
        Заголовок: "Численность работников, чел",
        Значение: 0,
        Процент: 0,
      };

      const currentQuarter = getCurrentQuarter().toLowerCase();
      const previousQuarter = getPreviousQuarter(currentQuarter);

      let currentQuarterTotal = 0;
      let previousQuarterTotal = 0;

      data.map((row) => {
        const period = row["Отчетный период"]?.toLowerCase().trim();
        const count = parseFloat(row["Численность охваченных работников"]);

        infoBlock["Значение"] += count;

        if (period === currentQuarter) {
          currentQuarterTotal += count;
        } else if (period === previousQuarter) {
          previousQuarterTotal += count;
        }
      });

      // infoBlock["Процент"] =
      //   infoBlock["Значение"] > 0
      //     ? (
      //         ((infoBlock["Значение"] - pastPeriodsTotal) / pastPeriodsTotal) *
      //         100
      //       ).toFixed(2)
      //     : 0;

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

      return res.json(infoBlock);
      // return infoBlock;
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  // Данные для инфоблока "Обновлено договоров"
  async contractsUpdated(req, res) {
    try {
      const data = readExcelFile(fileName);

      const infoBlock = {
        Заголовок: "Обновлено договоров, ед",
        Значение: 0,
        Процент: 0,
      };

      const currentQuarter = getCurrentQuarter().toLowerCase();
      const previousQuarter = getPreviousQuarter(currentQuarter);

      let currentQuarterTotal = 0;
      let previousQuarterTotal = 0;

      data.map((row) => {
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

      // infoBlock["Процент"] =
      //   infoBlock["Значение"] > 0
      //     ? (
      //         ((infoBlock["Значение"] - pastPeriodsTotal) / pastPeriodsTotal) *
      //         100
      //       ).toFixed(2)
      //     : 0;

      if (previousQuarterTotal > 0) {
        infoBlock["Процент"] = (
          ((currentQuarterTotal - previousQuarterTotal) / previousQuarterTotal) *
          100
        ).toFixed(2);
      } else {
        infoBlock["Процент"] = "0";
      }

      // return infoBlock;
      return res.json(infoBlock);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }

  
}

module.exports = new KollektivnyeController();
