function getPreviousQuarter(currentQuarterStr) {
  const [quarterStr, , yearStr] = currentQuarterStr.split(" ");
  let quarter = parseInt(quarterStr);
  let year = parseInt(yearStr);

  if (quarter === 1) {
    quarter = 4;
    year -= 1;
  } else {
    quarter -= 1;
  }

  return `${quarter} квартал ${year}`;
}

module.exports = getPreviousQuarter;
