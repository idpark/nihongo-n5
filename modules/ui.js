// ===================== UI ROUTER =====================
import { $ } from "./utils.js";

const screenHistory = {};
let currentTab = "dialogue";

export function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tabId));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.toggle("active", c.id === "tab-" + tabId));
}

export function getCurrentTab() { return currentTab; }

export function showScreen(containerId, screenId) {
  const container = $(containerId);
  if (!container) return;
  container.querySelectorAll(".screen").forEach(s => s.style.display = "none");
  const screen = $(`${containerId}-${screenId}`) || container.querySelector(`[data-screen="${screenId}"]`);
  if (screen) screen.style.display = "block";
}

// Toast notification
export function showToast(msg, type = "info", duration = 2000) {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Badge popup
export function showBadgePopup(badge) {
  const popup = $("badgePopup");
  if (!popup) return;
  popup.querySelector(".badge-popup-icon").textContent = badge.icon;
  popup.querySelector(".badge-popup-name").textContent = badge.name;
  popup.querySelector(".badge-popup-desc").textContent = badge.desc;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 3000);
}

// Modal helpers
export function showModal(modalId) {
  const modal = $(modalId);
  if (modal) modal.classList.add("show");
}

export function hideModal(modalId) {
  const modal = $(modalId);
  if (modal) modal.classList.remove("show");
}

// Confetti animation
export function confetti() {
  const colors = ["#f59e0b","#7c3aed","#2563eb","#10b981","#ef4444","#ec4899"];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.background = colors[i % colors.length];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-10px";
    piece.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2500);
  }
}
