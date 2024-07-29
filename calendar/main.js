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

/* 
  "Al clickear una celda:
    - Borrar el calendario
    - Borrar la flecha derecha
    - Cambiar la fecha de hoy por la de la fecha seleccionada
    - Mostrar eventos de esa fecha
    - Agregar un boton para agregar un evento
  "
*/

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

    for (let i = 0 + day; i < (day + numOfDays); i++) {
        if(dateCounter === today.getDate() && target().getMonth() === today.getMonth() && target().getFullYear() === today.getFullYear()) {
            cells[i].classList.toggle('current-day');
        }
        cells[i].textContent = dateCounter++;
    }
}

function monthNumToDays(monthNum) {
    const isBis = (target().getFullYear() % 4 === 0);

    const days = [31, (isBis ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return days[monthNum];
}

function monthNumToString(monthNum) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return months[monthNum];
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