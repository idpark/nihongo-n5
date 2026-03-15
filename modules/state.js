// ===================== STATE MANAGEMENT =====================
const STORAGE_KEY = "nihongo_n5";

const DEF_STATE = {
  // Progress
  currentChapter: 1,
  unlockedChapters: [1],

  // XP & Gamification
  totalXP: 0,
  levelXP: 0,
  playerLevel: 1,
  streak: { current: 0, best: 0, lastDate: "" },
  dailyGoal: 50,
  todayXP: 0,
  todayDate: "",
  dailyGoalMet: false,
  badges: [],

  // Vocabulary SRS
  vocabSRS: {},
  vocabStats: {},

  // Grammar progress
  grammarProgress: {},

  // Dialogue progress
  dialogueProgress: {},

  // AI settings
  aiEnabled: false,
  aiApiKey: "",
  aiProvider: "anthropic",

  // Settings
  audioEnabled: true,
  showFurigana: true,
  showKorean: true,

  // App
  appVersion: "1.0.0"
};

let state = loadState();

export function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { ...DEF_STATE };
    // Ensure all fields exist (migration safety)
    for (const key of Object.keys(DEF_STATE)) {
      if (s[key] === undefined) s[key] = typeof DEF_STATE[key] === "object" && DEF_STATE[key] !== null
        ? JSON.parse(JSON.stringify(DEF_STATE[key]))
        : DEF_STATE[key];
    }
    return s;
  } catch (e) {
    return { ...DEF_STATE };
  }
}

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getState() { return state; }

export function updateState(updates) {
  Object.assign(state, updates);
  saveState();
}

// ===================== SM-2 SRS =====================
export function newSRSRecord() {
  return { interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: 0, quality: 0 };
}

export function updateSRS(record, quality) {
  const r = { ...record };
  if (quality >= 3) {
    if (r.repetitions === 0) r.interval = 1;
    else if (r.repetitions === 1) r.interval = 6;
    else r.interval = Math.round(r.interval * r.easeFactor);
    r.repetitions++;
  } else {
    r.repetitions = 0;
    r.interval = 1;
  }
  r.easeFactor = r.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (r.easeFactor < 1.3) r.easeFactor = 1.3;
  r.quality = quality;
  r.nextReview = Date.now() + r.interval * 86400000;
  return r;
}

export function getSRSQuality(isCorrect, elapsed) {
  if (!isCorrect) return 1;
  if (elapsed > 6) return 3;
  if (elapsed > 4) return 4;
  return 5;
}

// ===================== XP =====================
export function xpForLevel(lv) { return lv * 200; }

export function addXP(amount) {
  state.totalXP += amount;
  state.levelXP += amount;
  state.todayXP += amount;

  // Level up check
  let leveled = false;
  while (state.levelXP >= xpForLevel(state.playerLevel)) {
    state.levelXP -= xpForLevel(state.playerLevel);
    state.playerLevel++;
    leveled = true;
  }

  // Daily goal check
  if (state.todayXP >= state.dailyGoal && !state.dailyGoalMet) {
    state.dailyGoalMet = true;
  }

  saveState();
  return leveled;
}

// ===================== STREAK =====================
export function checkStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.todayDate && state.todayDate !== today) {
    const last = new Date(state.streak.lastDate);
    const now = new Date(today);
    const diff = Math.floor((now - last) / 86400000);
    if (diff > 1) {
      state.streak.current = 0;
    }
    state.todayXP = 0;
    state.dailyGoalMet = false;
    state.todayDate = today;
    saveState();
  }
  if (!state.todayDate) { state.todayDate = today; saveState(); }
}

export function recordActivity() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.streak.lastDate !== today) {
    if (state.streak.lastDate) {
      const diff = Math.floor((new Date(today) - new Date(state.streak.lastDate)) / 86400000);
      if (diff === 1) state.streak.current++;
      else if (diff > 1) state.streak.current = 1;
    } else {
      state.streak.current = 1;
    }
    state.streak.lastDate = today;
    if (state.streak.current > state.streak.best) state.streak.best = state.streak.current;
    saveState();
  }
}

// ===================== CHAPTER UNLOCK =====================
export function unlockChapter(ch) {
  if (!state.unlockedChapters.includes(ch)) {
    state.unlockedChapters.push(ch);
    saveState();
  }
}

export function isChapterUnlocked(ch) {
  return true; // All chapters freely accessible
}

// ===================== VOCAB STATS =====================
export function recordVocabResult(vocabId, isCorrect, elapsed) {
  if (!state.vocabStats[vocabId]) state.vocabStats[vocabId] = { correct: 0, total: 0 };
  state.vocabStats[vocabId].total++;
  if (isCorrect) state.vocabStats[vocabId].correct++;

  if (!state.vocabSRS[vocabId]) state.vocabSRS[vocabId] = newSRSRecord();
  const quality = getSRSQuality(isCorrect, elapsed);
  state.vocabSRS[vocabId] = updateSRS(state.vocabSRS[vocabId], quality);
  saveState();
}

export function getDueVocab(allVocab) {
  const now = Date.now();
  return allVocab.filter(v => {
    const srs = state.vocabSRS[v.id];
    return !srs || srs.nextReview <= now;
  });
}

// ===================== BACKUP / RESTORE =====================
export function exportData() {
  return JSON.stringify(state, null, 2);
}

export function importData(json) {
  try {
    const data = JSON.parse(json);
    state = { ...DEF_STATE, ...data };
    saveState();
    return true;
  } catch (e) {
    return false;
  }
}

// Initialize streak check
checkStreak();
