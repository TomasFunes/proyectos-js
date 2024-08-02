const startPauseBtn = document.querySelector('.start');
const reset = document.querySelector('.reset');
const workCountdown = 25 * 60;
const restCountdown = 5*60; 


const pomodoro = {
    currentSession: "work",
    countdown: workCountdown,
    completedSessions: 0
}



function renderTimer() {
    const timer = document.querySelector('.timer');
    const cueText = document.querySelector('.cue-text');
    const timerContainer = document.querySelector('.timer-container');
    const sessionStatus = document.querySelector('.session-status');



    if (pomodoro.completedSessions == 4) {
        timerContainer.textContent = "All sessions completed";
    } else {
        sessionStatus.textContent = `Sessions completed:  ${pomodoro.completedSessions} / 4`;
        cueText.textContent = (pomodoro.currentSession == "work") ? "Focus!" : "Rest";
        timer.textContent = getMinutes(pomodoro.countdown);
    }
}

let tickId;
let timerId;

renderTimer(pomodoro.countdown);


startPauseBtn.addEventListener("click", () => {
    
    if(startPauseBtn.classList.contains('start')){       
        startCountdown();

        tickId = setInterval(function tick() {
            pomodoro.countdown--;
            renderTimer();           
        }, 1000)


        startPauseBtn.className = 'pause'
        startPauseBtn.textContent = 'Pause';
    } else {
        clearTimeout(timerId);
        clearInterval(tickId);

        startPauseBtn.className = 'start'
        startPauseBtn.textContent = 'Start';
    }

});

reset.addEventListener("click", () => {
    clearTimeout(timerId);
    pomodoro.countdown = pomodoro.currentSession == "work" ? workCountdown : restCountdown;
    startCountdown();
    renderTimer();

})

function getMinutes(countdown) {
    const minutes = Math.floor(countdown / 60);
    const seconds = (countdown % 60);
    return `${minutes} : ${(seconds < 10) ? "0" + seconds : seconds}`
}

function startCountdown() {
    timerId = setTimeout(() => {
        if (pomodoro.currentSession == "work") pomodoro.completedSessions++;
        pomodoro.currentSession = (pomodoro.currentSession == "work") ? "rest" : "work";
        pomodoro.countdown = pomodoro.currentSession == "work" ? workCountdown : restCountdown;
        startPauseBtn.className = 'start';
        startPauseBtn.textContent = 'Start';
        clearInterval(tickId);
        renderTimer();
    }, pomodoro.countdown * 1000 + 200);  // 200 ms added to prevent early clear
}