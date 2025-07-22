let startTime = 0;
let elapsed = 0;
let timer;
let isRunning = false;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const splitBtn = document.getElementById('split');
const resetBtn = document.getElementById('reset');
const splits = document.getElementById('splits');

function formatTime(ms) {
  const date = new Date(ms);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const mins = String(date.getUTCMinutes()).padStart(2, '0');
  const secs = String(date.getUTCSeconds()).padStart(2, '0');
  const millis = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${hours}:${mins}:${secs}.${millis}`;
}

function startTimer() {
  startTime = Date.now() - elapsed;
  timer = setInterval(() => {
    elapsed = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsed);
  }, 10);
  startBtn.innerHTML = '<i class="fas fa-pause"></i>';
  isRunning = true;
  splitBtn.disabled = false;
  resetBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timer);
  startBtn.innerHTML = '<i class="fas fa-play"></i>';
  isRunning = false;
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
});

splitBtn.addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = formatTime(elapsed);
  splits.appendChild(li);
});

resetBtn.addEventListener('click', () => {
  pauseTimer();
  elapsed = 0;
  timeDisplay.textContent = '00:00:00.000';
  splits.innerHTML = '';
  splitBtn.disabled = true;
  resetBtn.disabled = true;
});


