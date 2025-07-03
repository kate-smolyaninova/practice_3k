const { normalizeCityName } = require("../utils/normalize");
const { readExcelFile } = require("../utils/readExcelFile");
const { compareAreas } = require("../utils/compareAreas");
const { actualizationStatusData } = require("../utils/actualizationStatusData");
const { quarterlyCountData } = require("../utils/quarterlyCountData");
const { monthlyCountData } = require("../utils/monthlyCountData");

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

      // return regionSummary;
      return res.json(regionSummary);
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
}

module.exports = new OtraslevyeController();
