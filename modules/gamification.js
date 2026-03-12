// ===================== GAMIFICATION =====================
import { getState, saveState } from "./state.js";

export const BADGES = [
  { id: "first_dialogue", name: "첫 대화", desc: "첫 번째 대화 완료", icon: "🗣️", condition: s => Object.values(s.dialogueProgress).some(d => d.completed) },
  { id: "vocab_10", name: "단어 10개", desc: "단어 10개 학습", icon: "📝", condition: s => Object.keys(s.vocabStats).length >= 10 },
  { id: "vocab_50", name: "단어 50개", desc: "단어 50개 학습", icon: "📚", condition: s => Object.keys(s.vocabStats).length >= 50 },
  { id: "vocab_100", name: "단어 100개", desc: "단어 100개 학습", icon: "🏆", condition: s => Object.keys(s.vocabStats).length >= 100 },
  { id: "streak_3", name: "3일 연속", desc: "3일 연속 학습", icon: "🔥", condition: s => s.streak.current >= 3 },
  { id: "streak_7", name: "7일 연속", desc: "7일 연속 학습", icon: "💪", condition: s => s.streak.current >= 7 },
  { id: "streak_30", name: "30일 연속", desc: "30일 연속 학습", icon: "⭐", condition: s => s.streak.current >= 30 },
  { id: "chapter_5", name: "Ch.5 완료", desc: "챕터 5까지 완료", icon: "🎯", condition: s => s.unlockedChapters.includes(6) },
  { id: "daily_goal", name: "일일 목표", desc: "일일 XP 목표 달성", icon: "🎉", condition: s => s.dailyGoalMet },
  { id: "xp_1000", name: "1000 XP", desc: "총 1000 XP 달성", icon: "💎", condition: s => s.totalXP >= 1000 },
  { id: "grammar_10", name: "문법 10개", desc: "문법 10개 학습", icon: "📖", condition: s => Object.keys(s.grammarProgress).filter(k => s.grammarProgress[k].studied).length >= 10 },
  { id: "ai_chat", name: "AI 대화", desc: "AI 대화 첫 사용", icon: "🤖", condition: s => s._aiChatUsed }
];

export function checkBadges() {
  const state = getState();
  const newBadges = [];
  for (const badge of BADGES) {
    if (!state.badges.includes(badge.id) && badge.condition(state)) {
      state.badges.push(badge.id);
      newBadges.push(badge);
    }
  }
  if (newBadges.length > 0) saveState();
  return newBadges;
}

export function getEarnedBadges() {
  const state = getState();
  return BADGES.filter(b => state.badges.includes(b.id));
}

export function getAllBadges() {
  const state = getState();
  return BADGES.map(b => ({ ...b, earned: state.badges.includes(b.id) }));
}
