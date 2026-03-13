// ===================== AI API =====================
import { getState, saveState } from "./state.js";

export async function callAI(messages, systemPrompt, maxTokens = 400) {
  const state = getState();
  if (!state.aiEnabled || !state.aiApiKey) return null;
  const provider = state.aiProvider || "anthropic";

  try {
    if (provider === "anthropic") {
      const body = {
        model: "claude-haiku-4-5-20251001",
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: messages
      };
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": state.aiApiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify(body)
      });
      if (!resp.ok) { const err = await resp.text(); throw new Error(err); }
      const data = await resp.json();
      return data.content[0].text;
    } else if (provider === "gemini") {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${state.aiApiKey}`;
      const contents = messages.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { maxOutputTokens: maxTokens }
        })
      });
      if (!resp.ok) { const err = await resp.text(); throw new Error(err); }
      const data = await resp.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } else {
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + state.aiApiKey
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: maxTokens,
          messages: [{ role: "system", content: systemPrompt }, ...messages]
        })
      });
      if (!resp.ok) { const err = await resp.text(); throw new Error(err); }
      const data = await resp.json();
      return data.choices[0].message.content;
    }
  } catch (e) {
    console.error("AI API error:", e);
    return null;
  }
}

// ===================== AI SCENARIOS =====================
export const AI_SCENARIOS = [
  {
    id: "free",
    name: "자유 대화",
    nameJp: "自由会話",
    desc: "자유롭게 일본어로 대화하기",
    icon: "💬",
    reqChapter: 1
  },
  {
    id: "selfintro",
    name: "자기소개",
    nameJp: "自己紹介",
    desc: "일본어로 자기소개 연습",
    icon: "👋",
    reqChapter: 1
  },
  {
    id: "restaurant",
    name: "레스토랑에서",
    nameJp: "レストランで",
    desc: "음식 주문하기",
    icon: "🍱",
    reqChapter: 5
  },
  {
    id: "shopping",
    name: "쇼핑하기",
    nameJp: "買い物",
    desc: "가게에서 물건 사기",
    icon: "🛍️",
    reqChapter: 5
  },
  {
    id: "direction",
    name: "길 찾기",
    nameJp: "道を聞く",
    desc: "길을 물어보기",
    icon: "🗺️",
    reqChapter: 3
  },
  {
    id: "momotaro",
    name: "桃太郎 역할극",
    nameJp: "桃太郎ロールプレイ",
    desc: "모모타로 이야기 속 대화",
    icon: "🍑",
    reqChapter: 16
  },
  {
    id: "grammar",
    name: "문법 연습",
    nameJp: "文法練習",
    desc: "AI와 문법 패턴 연습",
    icon: "📝",
    reqChapter: 1
  },
  {
    id: "story",
    name: "스토리 생성",
    nameJp: "ストーリー作成",
    desc: "배운 단어로 짧은 이야기 만들기",
    icon: "📖",
    reqChapter: 3
  }
];

export function getSystemPrompt(scenarioId, state) {
  const base = `당신은 한국인을 위한 친절한 일본어 튜터입니다.

학생 정보:
- 레벨: JLPT N5 학습 중 (챕터 ${state.currentChapter}/27)
- 학습 단어 수: ${Object.keys(state.vocabStats).length}개

규칙:
- 일본어로 대화하되, N5 수준의 문법과 어휘 사용
- 모든 한자에 후리가나를 괄호로 표시: 食(た)べる
- 각 응답 끝에 [한국어: 번역]을 첨부
- 문법 오류는 올바른 표현을 자연스럽게 반복(리캐스팅)
- 응답은 2~3문장으로 짧게
- 학생이 한국어를 쓰면 일본어로 바꿔주며 격려`;

  const prompts = {
    free: base,
    selfintro: base + "\n\n시나리오: 학생과 처음 만난 상황입니다. 서로 자기소개를 합니다. 이름, 국적, 직업/학교를 물어보세요.",
    restaurant: base + "\n\n시나리오: 당신은 일본 레스토랑의 점원입니다. 학생이 주문하려 합니다. 메뉴를 추천하고 주문을 받으세요. N5 수준의 음식 관련 어휘를 사용하세요.",
    shopping: base + "\n\n시나리오: 당신은 가게 점원입니다. 학생이 물건을 사려 합니다. 가격, 크기, 색상 등을 물어보세요.",
    direction: base + "\n\n시나리오: 학생이 길을 물어봅니다. 간단한 방향 지시(右、左、まっすぐ)를 사용해서 안내하세요.",
    momotaro: base + "\n\n시나리오: 당신은 桃太郎(모모타로) 이야기의 등장인물입니다. 학생과 함께 모모타로 이야기를 역할극으로 진행하세요.",
    grammar: base + "\n\n학생이 특정 문법 패턴을 연습하고 싶어 합니다. 그 문법을 사용한 짧은 대화를 만들고, 학생에게 같은 문법으로 답하도록 유도하세요.",
    story: base + "\n\n학생이 배운 단어와 문법으로 짧은 이야기를 만들어달라고 합니다. 5-8문장의 간단한 이야기를 만들고, 한국어 번역과 핵심 문법 설명을 포함하세요."
  };

  return prompts[scenarioId] || base;
}
