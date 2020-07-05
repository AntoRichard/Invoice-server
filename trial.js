const moment = require("moment");

const currentDate = moment(new Date("06-07-2020"));

const nextDate = moment(new Date("07-07-2020"));

console.log(currentDate, nextDate);
console.log(nextDate.isAfter(currentDate));