const timer = document.querySelector('.timer');
const startPauseBtn = document.querySelector('.start');
const reset = document.querySelector('.reset');

let countdown = 25 * 60 // In seconds
let tickId;
let timerId;

startPauseBtn.addEventListener("click", () => {
    if(startPauseBtn.classList.contains('start')){
        timer.textContent = getHoursAndMinutes(countdown);

        timerId = setTimeout(function timer() {
            alert("Time's up!");
            clearInterval(tickId);
            startPauseBtn.className = 'start';
            startPauseBtn.textContent = 'Start';
            countdown = 25 * 60;
        }, countdown * 1000 + 200);  // 50 ms added to prevent early clear

        tickId = setInterval(function tick() {
            countdown--;
            timer.textContent = getHoursAndMinutes(countdown);
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
    clearInterval(tickId);

    countdown = 25 * 60;
    timer.textContent = getHoursAndMinutes(countdown);

    startPauseBtn.className = 'start'
    startPauseBtn.textContent = 'Start';
})




function getHoursAndMinutes(countdown) {
    const minutes = Math.floor(countdown / 60);
    const seconds = (countdown % 60);
    return `${minutes} : ${(seconds < 10) ? "0" + seconds : seconds}`
}
