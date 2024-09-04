let startTime;
let elapsedTime = 0;
let intervalID;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalID = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.style.backgroundColor = '#E94E77';
        isRunning = true;
    } else {
        clearInterval(intervalID);
        elapsedTime = Date.now() - startTime;
        startPauseBtn.textContent = 'Start';
        startPauseBtn.style.backgroundColor = '#088395';
        isRunning = false;
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;

    const milliseconds = Math.floor((elapsedTime % 1000));
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    display.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function reset() {
    clearInterval(intervalID);
    elapsedTime = 0;
    isRunning = false;
    display.textContent = '00:00:00.000';
    startPauseBtn.textContent = 'Start';
    startPauseBtn.style.backgroundColor = '#088395';
    laps.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.textContent;
        laps.appendChild(lapTime);
    }
}
