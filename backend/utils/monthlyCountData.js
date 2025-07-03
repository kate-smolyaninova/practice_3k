const monthlyCountData = (data) => {
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
};

module.exports = {
  monthlyCountData,
};

// const { monthlyCountData } = require("../utils/monthlyCountData");
// monthlyCountData(data);
