const { getCurrentQuarter } = require("./../utils/getCurrentQuarter");

const actualizationStatusData = (data) => {
  const actualizationStatusCount = {
    "не актуализировано": 0,
    "данные актуализированы": 0,
  };

  data.map((row) => {
    const period = row["Отчетный период"]?.toLowerCase().trim();
    const isActualize = row["Статус согласования"]?.toLowerCase().trim();

    if (period !== getCurrentQuarter()) return; // исправить позже, АВТОМАТИЗИРОВАТЬ

    isActualize === "данные актуализированы"
      ? (actualizationStatusCount["данные актуализированы"] += 1)
      : (actualizationStatusCount["не актуализировано"] += 1);
  });

  return actualizationStatusCount;
};

module.exports = {
  actualizationStatusData,
};

// const { actualizationStatusData } = require("../utils/actualizationStatusData");
// actualizationStatusData(data);
