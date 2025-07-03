function normalizeCityName(name) {
  return name
    .toLowerCase()
    .replace(/^(г(ород)?\.?\s*|о(круг)?\.?\s*|м[ро]\.?\s*|мун\.?обл\.?\s*)/i, "")
    .replace(/(г(ород)?\.?|о(круг)?\.?|м[ро]\.?|мун\.?обл\.?)\s*$/i, "")
    .trim();
}

module.exports = {
  normalizeCityName,
};

// const { normalizeCityName } = require("../utils/normalize");

// normalizeCityName(row["Муниципальное образование"]);
