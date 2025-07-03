// Возвращет данные о сегодняшнем квартале
// в виде "2 квартал 2025"

const getCurrentQuarter = () => {
  const today = new Date();
  const year = today.getFullYear();
  quarter = Math.floor(today.getMonth() + 3) / 3;

  return `${quarter} квартал ${year}`;
};

module.exports = {
  getCurrentQuarter,
};

// const { getCurrentQuarter } = require("../utils/getCurrentQuarter");
// getCurrentQuarter(data);
