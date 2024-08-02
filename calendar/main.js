
const today = new Date();
let events = [];

// Target is at first the current date. Then is the first of any month
const targetDate = {
    date: today.getDate(),
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDay()
}

const calendar = document.querySelector('.date');
const prevMonth = document.querySelector('.prev-month');
const nexMonth = document.querySelector('.next-month');
renderCalendar();

function renderCalendar() {
    renderMonthAndYear();
    renderCurrentDate();
    renderMonthDates(); 
    cleanActiveDate();   
}


prevMonth.addEventListener('click', () => {
    const prevMonth = new Date(targetDate.year, targetDate.month - 1)
    targetDate.date = prevMonth,
    targetDate.year = prevMonth.getFullYear(),
    targetDate.month = prevMonth.getMonth(),
    targetDate.day = prevMonth.getDay() 
    renderCalendar();    
})


nexMonth.addEventListener('click', () => {
    const nextMonth = new Date(targetDate.year, targetDate.month + 1)
    targetDate.date = nextMonth,
    targetDate.year = nextMonth.getFullYear(),
    targetDate.month = nextMonth.getMonth(),
    targetDate.day = nextMonth.getDay() 

    renderCalendar();    
})


function addCellEvents (cell) {
    cell.addEventListener('click', () => {
        
        cleanActiveDate();
        if (cell.textContent) {
            const eventList = document.createElement('ul');
            targetDate.date = cell.textContent;
            const dateEvents = document.querySelector('.events');
            
            const addEventBtn = document.createElement('button');
            addEventBtn.textContent = "Add event";
            addEventBtn.classList = "add-event-btn";

            addEventBtn.addEventListener('click', () => {
                dateEvents.textContent = "";
                renderEventForm()
            });

            dateEvents.textContent = "";

            const targetEvents = events.map (e => {
                if (e.year == targetDate.year 
                    && e.month == targetDate.month 
                    && e.date == targetDate.date){
                        return e;
                    }
            })

            if(targetEvents.length) {
                const eventPara = document.createElement('p');
                eventPara.textContent = `Events for ${targetDate.date}/${targetDate.month + 1}/${targetDate.year}:`
                dateEvents.appendChild(eventPara);

                for (const event of events) {
                    if (event.year == targetDate.year 
                    && event.month == targetDate.month 
                    && event.date == targetDate.date){
                        const eventItem = document.createElement('li');
                        eventItem.textContent = event.description;
                        eventList.appendChild(eventItem);
                    }
                }

            } else {
                eventList.textContent = `${targetDate.date}/${targetDate.month + 1}/${targetDate.year}: No events`
            }
            eventList.className = "event-list";

            dateEvents.appendChild(eventList);
            dateEvents.appendChild(addEventBtn);
            cell.classList.toggle('active-date');
        }
    })
}


function renderMonthAndYear() {
    const monthElement = document.querySelector('.target-month');
    monthElement.textContent = `${monthNumToString(targetDate.month)} ${targetDate.year}`;
}

function renderCurrentDate() {
    const dateElement = document.querySelector('.current-date');
    dateElement.textContent = today.toDateString();
}



function renderMonthDates() {
    const dateTable = document.querySelector('.date-table');
    dateTable.textContent = "";

    const date = new Date(targetDate.year, targetDate.month);
    const numOfDays = monthNumToDays(targetDate.month);
    let dateCounter = 1 - date.getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const dateHeaders = document.createElement('tr');
    dateHeaders.className = "days";


    for (let i = 0; i < 7; i++) {
        const dayHeader = document.createElement('th');
        dayHeader.textContent =  days[i];
        dateHeaders.appendChild(dayHeader);
    }
    dateTable.appendChild(dateHeaders);


    while (dateCounter <= numOfDays) {
        const weekRow = document.createElement('tr');

        for (let i = 0; i < 7; i++) {
            const dayCell = document.createElement('td');
            if (dateCounter > 0 && dateCounter <= numOfDays) {
                dayCell.textContent =  dateCounter;
            }
            if (today.getFullYear() == targetDate.year 
            && today.getMonth() == targetDate.month 
            && today.getDate() == dateCounter){
                    dayCell.classList.add("current-day");
                }
            dayCell.classList.add("day");
            addCellEvents(dayCell);
            weekRow.appendChild(dayCell);
            dateCounter++;
        }

        dateTable.appendChild(weekRow);
    }
    
    calendar.appendChild(dateTable);
}


function monthNumToDays(monthNum) {
    const isBis = (targetDate.month % 4 === 0);

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


function cleanActiveDate() {
    const activeDate = document.querySelector('.active-date');

    const dayEvents = calendar.querySelector('.date-events');
    if (dayEvents) calendar.removeChild(dayEvents);
    
    if (activeDate) activeDate.classList.remove('active-date');
}


function renderEventForm() {
    const dateEvents = document.querySelector('.events');

    const eventForm = document.createElement('form');
    eventForm.className = "event-form";
    const eventDescription = document.createElement('input');
    const submitBtn = document.createElement('button');

    eventDescription.setAttribute('name', 'description');
    eventDescription.setAttribute('required', 'true');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.textContent = "Add";
    submitBtn.classList = "submit-btn";

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        events = [...events, {
            date: targetDate.date,
            month: targetDate.month,
            year: targetDate.year,
            description: e.target.description.value
        }]
    
        eventForm.remove();
        renderCalendar();
    })


    eventForm.appendChild(eventDescription);
    eventForm.appendChild(submitBtn);
    dateEvents.appendChild(eventForm);
}