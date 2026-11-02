
/* ================= DARK MODE ================= */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  themeIcon.classList.toggle("fa-moon", !isDark);
  themeIcon.classList.toggle("fa-sun", isDark);

  localStorage.setItem("d2sr-theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("d2sr-theme");
setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  setTheme(isDark);
});

/* ================= MOBILE MENU ================= */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const menuIcon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuIcon.classList.toggle("fa-bars", !isOpen);
  menuIcon.classList.toggle("fa-xmark", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuIcon.classList.add("fa-bars");
    menuIcon.classList.remove("fa-xmark");
  });
});

/* ================= FILE UPLOAD ================= */
const fileInput = document.getElementById("fileInput");
const browseBtn = document.getElementById("browseBtn");
const dropZone = document.getElementById("dropZone");
const filePreview = document.getElementById("filePreview");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const removeFileBtn = document.getElementById("removeFile");
const analyzeBtn = document.getElementById("analyzeBtn");
const analysisResult = document.getElementById("analysisResult");

let selectedFile = null;

browseBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    displaySelectedFile(file);
  }
});

function displaySelectedFile(file) {
  selectedFile = file;

  fileName.textContent = file.name;
  fileSize.textContent = formatFileSize(file.size);

  filePreview.classList.add("show");
  analyzeBtn.disabled = false;
  analysisResult.classList.remove("show");
}

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

removeFileBtn.addEventListener("click", () => {
  selectedFile = null;
  fileInput.value = "";

  filePreview.classList.remove("show");
  analyzeBtn.disabled = true;
  analysisResult.classList.remove("show");
});

/* ================= DRAG AND DROP ================= */
["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("drag-over");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("drag-over");
  });
});

dropZone.addEventListener("drop", (event) => {
  const file = event.dataTransfer.files[0];

  if (file) {
    displaySelectedFile(file);
  }
});

/* ================= ANALYZE BUTTON ================= */
analyzeBtn.addEventListener("click", () => {
  if (!selectedFile) return;

  analysisResult.classList.add("show");

  // Demo behavior only.
  // Connect your backend/API here for real forensic analysis.
  analysisResult.querySelector("strong").textContent = "File ready for analysis";
  analysisResult.querySelector("p").textContent =
    `${selectedFile.name} is selected. Connect your backend to perform real forensic analysis.`;
});
