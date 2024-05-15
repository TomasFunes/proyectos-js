const date = document.querySelector('.date');
const month = document.querySelector('.month');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const now = new Date();
const currentDate = now.getDate();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();
const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

month.textContent = monthMapping(currentMonth);
date.textContent = now.toDateString();
const numberOfDays = getNumberOfDays(currentMonth, currentYear);
makeCalendar(firstDayOfMonth, numberOfDays);


function monthMapping(month_num) {
    const month_names = [
        "January", "February", "March", "April",
        "May", "June", "July", "August", "September",
        "October", "November", "December"
    ]
    
    return month_names[month_num];
}

function getFirstDayOfMonth(month, year) {
    const firstOfMonth = new Date(year, month);
    return firstOfMonth.getDay();
}

function getNumberOfDays(month, year) {
    const numberOfDays = [
        31, (year % 4 === 0) ? 29 : 28, 31,
        30, 31, 30, 
        31, 31, 30,
        31, 30, 31
    ]

    return numberOfDays[month];
}

function makeCalendar(firstDayOfMonth, numberOfDays) {
    day_count = 1;
    row = 0;
    column = firstDayOfMonth;

    for (row; row < 5; row++) {
        for(column; column < 7; column++) {
            const box = document.querySelector(`.box-${row}${column}`);
            if (day_count <= numberOfDays) {
                box.textContent = day_count;
                if(day_count === currentDate) {
                    box.style.backgroundColor = 'green';
                    box.style.color = 'white';
                }
            }
            day_count++;
        }
        column = 0;
    }
}