const XLSX = require("xlsx");

function readExcelFile(fileName) {
  const filePath = `C:\\Users\\Катя\\Desktop\\practice\\backend\\data\\${fileName}.xlsx`;

  const wb = XLSX.readFile(filePath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws);

  return data;
}

module.exports = {
  readExcelFile,
};

// const { readExcelFile } = require("../utils/readExcelFile");

/*
  const fileName = "kollektivnie_dogovory";
  const data = readExcelFile(fileName);
*/
