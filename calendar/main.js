import { useState } from "./useState.js";

// Target is at first the current date, day, year, etc. But could change
const [target, setTarget] = useState(new Date());
const today = new Date();
const cells = document.querySelectorAll('.date-table td');
renderCalendar();

function renderCalendar() {
    cleanDateTable();
    renderMonthAndYear();
    renderCurrentDate();
    renderMonthDates();        
}

const prevMonth = document.querySelector('.prev-month');
const nexMonth = document.querySelector('.next-month');

prevMonth.addEventListener('click', () => {
    setTarget(new Date(target().getFullYear(), target().getMonth() - 1));
    renderCalendar();    
})


nexMonth.addEventListener('click', () => {
    setTarget(new Date(target().getFullYear(), target().getMonth() + 1));
    renderCalendar();    
})

for(const cell of cells) {
    cell.addEventListener('click', () => {
        cleanActiveDate();
        if (cell.textContent) {
            cell.classList.toggle('active-date');
        }
    })
}


function renderMonthAndYear() {
    const month = target().getMonth();
    const year = target().getFullYear();
    const monthElement = document.querySelector('.target-month');
    monthElement.textContent = `${monthNumToString(month)} ${year}`;
}

function renderCurrentDate() {
    const dateElement = document.querySelector('.current-date');
    dateElement.textContent = today.toDateString();
}

function renderMonthDates() {
    const month = target().getMonth();
    const day = target().getDay();
    const numOfDays = monthNumToDays(month);
    let dateCounter = 1;

    const cells = document.querySelectorAll('.date-table td');

    for (let i = 0 + day; i < (day + numOfDays); i++) {
        if(dateCounter === today.getDate() && target().getMonth() === today.getMonth() && target().getFullYear() === today.getFullYear()) {
            cells[i].classList.toggle('current-day');
        }
        cells[i].textContent = dateCounter++;
    }
}

function monthNumToDays(monthNum) {
    const isBis = (target().getFullYear() % 4 === 0);

    const daysMapping = 
    {
        0: 31, 1: (isBis ? 29 : 28), 2: 31, 3: 30, 4: 31, 5: 30,
        6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31
    };

    return daysMapping[monthNum];
}

function monthNumToString(monthNum) {
    const monthMapping = 
    {0: 'January', 1: 'February', 2: 'March', 
        3: 'April', 4: 'May', 5: 'June',
        6: 'July', 7: 'August', 8: 'September',
        9: 'October', 10: 'November', 11: 'December'
    }

    return monthMapping[monthNum];
}

function cleanDateTable() {
    const cells = document.querySelectorAll('.date-table td');

    for(const cell of cells) {
        cell.textContent = "";

        if (cell.classList.contains('current-day')) {
            cell.classList.toggle('current-day');
        }

        cleanActiveDate();
    }
}

function cleanActiveDate() {
    const activeDate = document.querySelector('.active-date');

    if (activeDate) {
        activeDate.classList.remove('active-date');
    }
}

/*      
    Al clickear una celda del calendario

    - El dia sera marcado como 'objetivo'. Ser 'objetivo' tiene prioridad sobre
    ser 'actual'
*/