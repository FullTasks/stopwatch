let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = Date.now() - difference;
        tInterval = setInterval(updateDisplay, 10);
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = Date.now() - startTime;
        running = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function updateDisplay() {
    updatedTime = Date.now() - startTime;
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((updatedTime % 1000) / 10);
    display.innerHTML = `${(hours > 9 ? hours : "0" + hours)}:${(minutes > 9 ? minutes : "0" + minutes)}:${(seconds > 9 ? seconds : "0" + seconds)}:${(milliseconds > 9 ? milliseconds : "0" + milliseconds)}`;
}

function recordLap() {
    if (running) {
        lapCounter++;
        let li = document.createElement('li');
        li.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
        laps.appendChild(li);
    }
}
