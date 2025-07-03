const quarterlyCountData = (data) => {
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
};

module.exports = {
  quarterlyCountData,
};

// const { quarterlyCountData } = require("../utils/quarterlyCountData");
// quarterlyCountData(data);
