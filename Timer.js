

// Timer variables
let totalMilliseconds = 0;
let remainingMilliseconds = 0;
let timer = null;
let isRunning = false;

const display = document.getElementById('timer-display');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');

// Modal elements
const modal = document.getElementById("editModal");
const editBtn = document.getElementById("editBtn");
const closeBtn = document.querySelector(".close");
const doneBtn = document.getElementById("doneBtn");
const deleteBtn = document.getElementById("deleteBtn");

// Modal inputs
const editHours = document.getElementById("editHours");
const editMinutes = document.getElementById("editMinutes");
const editSeconds = document.getElementById("editSeconds");
const editName = document.getElementById("editName");
const editRingtone = document.getElementById("editRingtone");

// Format time for display
function formatTime(ms) {
  let h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  let m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  let s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  let msPart = String(ms % 1000).padStart(3, '0');
  return `${h}:${m}:${s}.${msPart}`;
}

// Update timer display and progress bar
function updateDisplay() {
  display.textContent = formatTime(remainingMilliseconds);
  let percent = totalMilliseconds
    ? ((totalMilliseconds - remainingMilliseconds) / totalMilliseconds) * 100
    : 0;
  progress.style.width = percent + "%";
}

// Start/Pause Timer
startBtn.addEventListener('click', () => {
  if (!isRunning && remainingMilliseconds > 0) {
    isRunning = true;
    startBtn.innerHTML = '<i class="fas fa-pause"></i>';

    timer = setInterval(() => {
      remainingMilliseconds -= 10;
      if (remainingMilliseconds <= 0) {
        remainingMilliseconds = 0;
        clearInterval(timer);
        isRunning = false;
        startBtn.innerHTML = '<i class="fas fa-play"></i>';
        audio.play();
      }
      updateDisplay();
    }, 10);
  } else {
    clearInterval(timer);
    isRunning = false;
    startBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Reset Button
// Reset timer
resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  remainingMilliseconds = totalMilliseconds;
  updateDisplay();
  isRunning = false;
  startBtn.innerHTML = '<i class="fas fa-play"></i>';


  audio.pause();
  audio.currentTime = 0;

  // Optional: clear displayed name and ringtone
  document.getElementById("displayName").textContent = "";
  document.getElementById("displayRingtone").textContent = "";
});

// Open Modal
editBtn.addEventListener("click", () => {
  const currentH = Math.floor(remainingMilliseconds / 3600000);
  const currentM = Math.floor((remainingMilliseconds % 3600000) / 60000);
  const currentS = Math.floor((remainingMilliseconds % 60000) / 1000);

  editHours.value = currentH;
  editMinutes.value = currentM;
  editSeconds.value = currentS;
  editRingtone.value = audio.src || "skyfall_ringtone.mp3";
  editName.value = "Timer"; // You can prefill last used value here

  modal.style.display = "block";
});

// Close Modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// Done Button
doneBtn.addEventListener("click", () => {
  let h = parseInt(editHours.value) || 0;
  let m = parseInt(editMinutes.value) || 0;
  let s = parseInt(editSeconds.value) || 0;

  totalMilliseconds = (h * 3600 + m * 60 + s) * 1000;
  remainingMilliseconds = totalMilliseconds;

  // Update audio
  audio.src = editRingtone.value;

  updateDisplay();
  clearInterval(timer);
  isRunning = false;
  startBtn.innerHTML = '<i class="fas fa-play"></i>';
  modal.style.display = "none";

  // Update name and ringtone display
  const name = editName.value.trim();
  const ringtoneText = editRingtone.selectedOptions[0].text;

  document.getElementById("displayTimerName").textContent = name ? `Timer Name: ${name}` : "";
  document.getElementById("displayRingtone").textContent = `Ringtone: ${ringtoneText}`;
});

// Delete Button
deleteBtn.addEventListener("click", () => {
  totalMilliseconds = 0;
  remainingMilliseconds = 0;
  updateDisplay();
  clearInterval(timer);
  isRunning = false;

  // Stop audio
  audio.pause();
  audio.currentTime = 0;

  // Clear modal inputs
  editName.value = "";
  editRingtone.selectedIndex = 0;

  // Clear displayed name and ringtone
  document.getElementById("displayTimerName").textContent = "";
  document.getElementById("displayRingtone").textContent = "";

  // Reset start button
  startBtn.innerHTML = '<i class="fas fa-play"></i>';

  // Close modal
  modal.style.display = "none";
});

// Initial display update
updateDisplay();














