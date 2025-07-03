const { normalizeCityName } = require("../utils/normalize");
const { getCurrentQuarter } = require("../utils/getCurrentQuarter");

/*
  Для Коллективных договоров и Отраслевых соглашений
  выводит их кол-во по Лип.области и МО. 
    {
      "Липецкая область": 4,
      "МО": 3
    }
*/

const compareAreas = (data) => {
  const regionSummary = {
    "Липецкая область": 0,
    "МО": 0,
  };

  data.map((row) => {
    const city = normalizeCityName(row["Муниципальное образование"]);
    const period = row["Отчетный период"]?.toLowerCase().trim();
    const current = row["Действующий"]?.toLowerCase().trim();

    if (period !== getCurrentQuarter()) return;
    if (current !== "да") return;

    regionSummary["Липецкая область"] += 1;

    if (!city.includes("липец")) {
      regionSummary["МО"] += 1;
    }
  });

  // console.log(today);
  return regionSummary;
};

module.exports = {
  compareAreas,
};

// const { compareAreas } = require("../utils/compareAreas");
// compareAreas(data);
