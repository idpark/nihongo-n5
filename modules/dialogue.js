// ===================== DIALOGUE MODULE =====================
import { getState, saveState, unlockChapter, addXP, recordActivity } from "./state.js";
import { DIALOGUES } from "../data/dialogues.js";
import { VOCAB_N5 } from "../data/vocab-n5.js";
import { GRAMMAR_N5 } from "../data/grammar-n5.js";

export function getDialogue(chapter) {
  return DIALOGUES.find(d => d.chapter === chapter) || null;
}

export function getVocabById(id) {
  return VOCAB_N5.find(v => v.id === id) || null;
}

export function getGrammarById(id) {
  return GRAMMAR_N5.find(g => g.id === id) || null;
}

export function getChapterVocab(chapter) {
  return VOCAB_N5.filter(v => v.ch === chapter);
}

export function getChapterGrammar(chapter) {
  const dialogue = getDialogue(chapter);
  if (!dialogue) return [];
  return dialogue.grammarList.map(id => getGrammarById(id)).filter(Boolean);
}

export function completeDialogue(chapter) {
  const state = getState();
  if (!state.dialogueProgress[chapter]) {
    state.dialogueProgress[chapter] = { completed: false, exerciseScore: 0, reviewCount: 0 };
  }
  state.dialogueProgress[chapter].completed = true;
  state.dialogueProgress[chapter].reviewCount++;
  saveState();

  // Unlock next chapter
  if (chapter < 27) {
    unlockChapter(chapter + 1);
  }

  recordActivity();
  addXP(20);
}

export function saveExerciseScore(chapter, score, total) {
  const state = getState();
  if (!state.dialogueProgress[chapter]) {
    state.dialogueProgress[chapter] = { completed: false, exerciseScore: 0, reviewCount: 0 };
  }
  const pct = Math.round(score / total * 100);
  if (pct > state.dialogueProgress[chapter].exerciseScore) {
    state.dialogueProgress[chapter].exerciseScore = pct;
  }
  saveState();
  addXP(score * 5);
}

export function isDialogueCompleted(chapter) {
  const state = getState();
  return state.dialogueProgress[chapter]?.completed || false;
}

export function getDialogueScore(chapter) {
  const state = getState();
  return state.dialogueProgress[chapter]?.exerciseScore || 0;
}
