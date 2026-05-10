let timer;
let timeLeft;
let isRunning = false;
let isFocusMode = true;

const timerDisplay = document.getElementById('timer');
const statusBadge = document.getElementById('status');
const focusInput = document.getElementById('focusTime');
const breakInput = document.getElementById('breakTime');
const alarmSound = document.getElementById('alarm-sound');
const startBtn = document.getElementById('start');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = timeString;
    document.title = `(${timeString}) Pomodoro`;
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

function switchMode() {
    isFocusMode = !isFocusMode;
    
    if (isFocusMode) {
        statusBadge.textContent = "Foco";
        statusBadge.style.color = "#0a84ff";
        statusBadge.style.background = "rgba(10,132,255,0.1)";
        timeLeft = focusInput.value * 60;
    } else {
        statusBadge.textContent = "Pausa";
        statusBadge.style.color = "#30d158";
        statusBadge.style.background = "rgba(48,209,88,0.1)";
        timeLeft = breakInput.value * 60;
    }
    updateDisplay();
    startTimer();
}

function startTimer() {
    if (isRunning) return;
    
    stopAlarm();
    isRunning = true;
    startBtn.textContent = "Rodando...";

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            alarmSound.play();
            
            setTimeout(() => {
                stopAlarm();
                switchMode(); 
            }, 5000);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    stopAlarm();
    startBtn.textContent = "Continuar";
}

function resetTimer() {
    pauseTimer();
    isFocusMode = true;
    statusBadge.textContent = "Foco";
    statusBadge.style.color = "#0a84ff";
    statusBadge.style.background = "rgba(10,132,255,0.1)";
    startBtn.textContent = "Iniciar";
    timeLeft = focusInput.value * 60;
    updateDisplay();
}

[focusInput, breakInput].forEach(input => {
    input.addEventListener('input', () => {
        if (!isRunning) {
            timeLeft = (isFocusMode ? focusInput.value : breakInput.value) * 60;
            updateDisplay();
        }
    });
});

startBtn.addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

timeLeft = focusInput.value * 60;
updateDisplay();