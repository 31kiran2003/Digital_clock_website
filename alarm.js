



let interval;

const timerDisplay = document.querySelector(".counter");
const alarmDisplay = document.querySelector(".alarm-time");
const ring = document.querySelector(".ring-fg"); // Ring progress circle
const stopBtn = document.getElementById("stopBtn");
const startBtn = document.getElementById("startBtn");
const timeInput = document.getElementById("alarmTimeInput");
const alarmSound = document.getElementById("alarmSound");
const alarmSource = document.getElementById("alarmSource");
const ringtoneSelect = document.getElementById("ringtoneSelect");

// Setup circular ring
const radius = ring.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

ring.style.strokeDasharray = `${circumference}`;
ring.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  ring.style.strokeDashoffset = offset;
}

function updateTimerDisplay(remainingSeconds) {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startCountdown() {
  clearInterval(interval); // Stop any existing countdown
  const inputTime = timeInput.value;

  if (!inputTime) {
    alert("Please select a valid time.");
    return;
  }

  // Set selected ringtone and loop it
  const selectedRingtone = ringtoneSelect.value;
  alarmSource.src = selectedRingtone;
  alarmSound.load();
  alarmSound.loop = true; // 🔁 Loop sound until stopped

  const now = new Date();
  const [hour, minute] = inputTime.split(":").map(Number);
  const targetTime = new Date();
  targetTime.setHours(hour, minute, 0, 0);

  // If selected time is in the past, set for next day
  if (targetTime <= now) {
    targetTime.setDate(now.getDate() + 1);
  }

  const totalSeconds = Math.floor((targetTime - now) / 1000);
  let remainingSeconds = totalSeconds;

  const formattedAlarm = targetTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  alarmDisplay.textContent = `🔔 Alarm at: ${formattedAlarm}`;
  updateTimerDisplay(remainingSeconds);
  setProgress(0);

  interval = setInterval(() => {
    remainingSeconds--;
    updateTimerDisplay(remainingSeconds);

    const percentElapsed = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    setProgress(percentElapsed);

   if (remainingSeconds <= 0) {
   clearInterval(interval);
   setProgress(100);
   alarmSound.play();              // 🔊 Start ringing
   alarmSound.loop = true;        // 🔁 Keep ringing until stopped
   document.getElementById("snoozeControls").style.display = "flex"; // 👇 Show snooze buttons
   alert("⏰ Alarm time reached!");
}

  }, 1000);
}

// Stop button logic
stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmSound.loop = false;
  setProgress(0);
  timerDisplay.textContent = "00:00";
  alarmDisplay.textContent = "🔔 Alarm at: --:--";
  document.getElementById("snoozeControls").style.display = "none"; // ⛔ Hide snooze
  alert("⏹️ Alarm stopped.");
});

// Snooze logic
function snooze(seconds) {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmSound.loop = false;
  document.getElementById("snoozeControls").style.display = "none";

  let remainingSeconds = seconds;
  interval = setInterval(() => {
    remainingSeconds--;
    updateTimerDisplay(remainingSeconds);
    setProgress(((seconds - remainingSeconds) / seconds) * 100);

    if (remainingSeconds <= 0) {
      clearInterval(interval);
      setProgress(100);
      alarmSound.play();
      alarmSound.loop = true;
      document.getElementById("snoozeControls").style.display = "flex";
      alert("🔁 Snoozed alarm ringing!");
    }
  }, 1000);
}

startBtn.addEventListener("click", startCountdown);


