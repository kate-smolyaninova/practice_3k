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

      console.log(data);
      return res.json(data);
    } catch (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка доступа к файлу" });
    }
  }
}

module.exports = new FinansirovanieController();
