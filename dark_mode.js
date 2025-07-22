// Apply saved theme on page load
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
};

// Toggle theme on icon click
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});


// full screen
const fullScreenBtn = document.getElementById("fullscreenToggle");

fullScreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Error attempting full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});
  






// Get elements
const clockCalendarButton = document.getElementById("clockCalendarBtn");
const clockCalendarPopup = document.getElementById("clockCalendarModal");
const clockCalendarCloseBtn = document.querySelector(".clock-calendar-close");

// Show calendar popup
clockCalendarButton.addEventListener("click", () => {
  clockCalendarPopup.style.display = "block";
});

// Close popup
clockCalendarCloseBtn.addEventListener("click", () => {
  clockCalendarPopup.style.display = "none";
});

// Close when clicking outside the popup content
window.addEventListener("click", (event) => {
  if (event.target === clockCalendarPopup) {
    clockCalendarPopup.style.display = "none";
  }
});







