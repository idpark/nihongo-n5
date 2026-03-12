// ===================== UTILS =====================
export function $(id) { return document.getElementById(id); }
export function qs(sel) { return document.querySelector(sel); }
export function qsa(sel) { return document.querySelectorAll(sel); }

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom(arr, n = 1) {
  const shuffled = shuffleArray(arr);
  return n === 1 ? shuffled[0] : shuffled.slice(0, n);
}

export function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

export function formatDate(d) {
  return new Date(d).toISOString().slice(0, 10);
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function daysBetween(d1, d2) {
  return Math.floor((new Date(d2) - new Date(d1)) / 86400000);
}

// Debounce helper for search inputs
export function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// Add furigana markup: 漢字(かんじ) → <ruby>漢字<rt>かんじ</rt></ruby>
export function furiganaHTML(text, showFurigana = true) {
  if (!showFurigana) {
    return escapeHTML(text.replace(/\([ぁ-ん]+\)/g, "").replace(/（[ぁ-ん]+）/g, ""));
  }
  return text.replace(/([一-龯々]+)\(([ぁ-ん]+)\)/g, "<ruby>$1<rt>$2</rt></ruby>")
             .replace(/([一-龯々]+)（([ぁ-ん]+)）/g, "<ruby>$1<rt>$2</rt></ruby>");
}
