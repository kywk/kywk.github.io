
console.log(process.argv);

const year = process.argv[2];
const month = process.argv[3];

console.log(`${year}-${month}-01`);

const monthStartDate = new Date(`${year}-${month}-01`);

console.log(monthStartDate.toLocaleString());

const weekdayOfMonthDay = monthStartDate.getDay();

console.log(weekdayOfMonthDay);

const beginDate = new Date(monthStartDate.getTime() - (weekdayOfMonthDay - 1) * 24 * 60 * 60 * 1000);

console.log(beginDate.toISOString().split('T')[0])

