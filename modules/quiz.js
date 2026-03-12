// ===================== QUIZ ENGINE =====================
import { shuffleArray, pickRandom } from "./utils.js";
import { getState, recordVocabResult, addXP, recordActivity } from "./state.js";
import { speakJapanese } from "./tts.js";

// Quiz modes
export const QUIZ_MODES = [
  { id: "reading", name: "읽기", nameJp: "読み", desc: "일본어 → 한국어", icon: "📖" },
  { id: "meaning", name: "의미", nameJp: "意味", desc: "한국어 → 일본어", icon: "🔤" },
  { id: "listening", name: "듣기", nameJp: "聞き", desc: "음성 → 한국어", icon: "🎧" },
  { id: "writing", name: "쓰기", nameJp: "書き", desc: "한국어 → 히라가나 입력", icon: "✏️" }
];

export function generateQuiz(vocabPool, mode, count = 10) {
  const pool = shuffleArray(vocabPool).slice(0, count);
  return pool.map(word => {
    const others = vocabPool.filter(w => w.id !== word.id);
    const distractors = pickRandom(others, 3);

    switch (mode) {
      case "reading":
        return {
          word,
          question: word.w,
          questionSub: word.r,
          answer: word.m,
          choices: shuffleArray([word.m, ...distractors.map(d => d.m)]),
          correctIdx: null // set after shuffle
        };
      case "meaning":
        return {
          word,
          question: word.m,
          questionSub: "",
          answer: word.w,
          choices: shuffleArray([word.w, ...distractors.map(d => d.w)]),
          correctIdx: null
        };
      case "listening":
        return {
          word,
          question: "🔊",
          questionSub: "듣고 맞추기",
          answer: word.m,
          choices: shuffleArray([word.m, ...distractors.map(d => d.m)]),
          correctIdx: null,
          audioText: word.r || word.w
        };
      case "writing":
        return {
          word,
          question: word.m,
          questionSub: "히라가나로 입력",
          answer: word.r,
          choices: null, // free input
          correctIdx: null
        };
      default:
        return null;
    }
  }).filter(Boolean).map(q => {
    if (q.choices) {
      q.correctIdx = q.choices.indexOf(q.answer);
    }
    return q;
  });
}

export function processAnswer(quizItem, selectedAnswer, elapsed) {
  const isCorrect = quizItem.choices
    ? selectedAnswer === quizItem.correctIdx
    : selectedAnswer.trim() === quizItem.answer;

  recordVocabResult(quizItem.word.id, isCorrect, elapsed);
  recordActivity();

  const xp = isCorrect ? 10 : 2;
  const leveled = addXP(xp);

  return { isCorrect, xp, leveled };
}
