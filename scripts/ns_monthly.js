const MILLISECOND_OF_DAY = 24 * 60 * 60 * 1000;

const year = process.argv[2];
const month = process.argv[3];

const firstDateOfMonth = new Date(`${year}-${month}-01 00:00:00`);
const weekdayOfFirstDate = firstDateOfMonth.getDay();
var beginDate = new Date(
  firstDateOfMonth.getTime() - (weekdayOfFirstDate - 2) * MILLISECOND_OF_DAY,
);

var lastDayOfMonth = new Date(
  firstDateOfMonth.getFullYear(),
  firstDateOfMonth.getMonth() + 1,
  0,
  0,
  0,
  0,
);
if (lastDayOfMonth.getDay() <= 5)
  var endDate = new Date(
    lastDayOfMonth.getTime() -
      (lastDayOfMonth.getDay() + 5) * MILLISECOND_OF_DAY,
  );
else
  var endDate = new Date(
    lastDayOfMonth.getTime() -
      (lastDayOfMonth.getDay() - 2) * MILLISECOND_OF_DAY,
  );

console.log(`
#NANSHAN #GTD/TODO #${year}/${month}

## Working Note

- [[DD About Birds]]

## TODO

![[NS_TODO]]
`);

while (beginDate <= endDate) {
  let weekEndDate = new Date(beginDate.getTime() + 6 * MILLISECOND_OF_DAY);
  let beforeWeekDate = new Date(beginDate.getTime() - 1 * MILLISECOND_OF_DAY);
  let afterWeekDate = new Date(beginDate.getTime() + 7 * MILLISECOND_OF_DAY);

  console.log(`
### ${beginDate.toISOString().split("T")[0].replaceAll("-", "/")} ~ ${weekEndDate.toISOString().split("T")[0].replaceAll("-", "/")}

\`\`\`tasks
path includes com.nanshan
path does not include Works
heading does not include Pending
due after ${beforeWeekDate.toISOString().split("T")[0]}
due before ${afterWeekDate.toISOString().split("T")[0]}
sort by priority
sort by due
\`\`\`
`);

  beginDate = new Date(beginDate.getTime() + 7 * MILLISECOND_OF_DAY);
}

console.log(`
### Follow Up

![[DefectList#Defects]]
`);
