// function getQuarterDate() {
//   const now = new Date();
//   const year = now.getFullYear();
//   const quarter = Math.floor(now.getMonth() / 3) + 1;

//   const startMonths = [0, 3, 6, 9]; // Январь, Апрель, Июль, Октябрь
  
//   const startDate = new Date(year, startMonths[quarter - 1], 1);

//   const endDate = new Date(year, startMonths[quarter] || 0, 1);
//   // если это Q4, то startMonths[4] undefined, передаём 0 — получаем январь следующего года

//   return { startDate, endDate };
// }

// module.exports = {
//   getQuarterDate,
// };

// const { getQuarterDate } = require("./../utils/getQuarterDate");
// const { startDate, endDate } = getQuarterDate();
//

// не используется в проекте

