import "server-only";
import OpenAI from "openai";
import { Faq, Store } from "./types";

const SYSTEM_PROMPT = `너는 음식점의 AI 예약비서다.
고객 질문에 짧고 친절하게 답변한다.
매장 정보와 FAQ에 있는 내용만 근거로 답변한다.
모르는 내용은 "매장 확인이 필요합니다."라고 답한다.
예약을 확정한다고 말하지 않는다.
예약 관련 질문이면 예약 페이지로 안내한다.
영업시간, 주차, 위치, 메뉴, 단체예약, 라스트오더를 우선적으로 안내한다.
과장된 홍보 문구는 쓰지 않는다.`;

let client: OpenAI | null = null;
let warnedAboutDemoMode = false;

function getClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    if (!warnedAboutDemoMode) {
      warnedAboutDemoMode = true;
      console.warn(
        "[점장AI] OPENAI_API_KEY가 없어 FAQ 데이터 기반 규칙 매칭으로 답변합니다 (데모 모드)."
      );
    }
    return null;
  }
  if (client) return client;
  client = new OpenAI({ apiKey });
  return client;
}

function buildStoreContext(store: Store, faqs: Faq[]): string {
  const faqText = faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  return `[매장 정보]
매장명: ${store.name}
영업시간: ${store.opening_time} ~ ${store.closing_time}
라스트오더: ${store.last_order_time ?? "정보 없음"}
주소: ${store.address ?? "정보 없음"}
주차 안내: ${store.parking_info ?? "정보 없음"}
대표 메뉴: ${store.main_menu ?? "정보 없음"}
단체예약 기준 인원: ${store.group_reservation_threshold}명 이상
휴무일: ${store.closed_days?.length ? store.closed_days.join(", ") : "없음"}
안내 문구: ${store.notice ?? ""}

[FAQ]
${faqText}`;
}

/** OPENAI_API_KEY 없이 체험할 수 있도록 하는 규칙 기반 FAQ 매칭 (데모 모드 전용). */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  주차: ["주차"],
  영업시간: ["영업", "몇시", "언제", "오픈", "마감", "라스트오더", "라스트 오더"],
  예약: ["예약", "단체", "인원"],
  메뉴: ["메뉴", "추천", "안주", "음식"],
};

function mockAskFaq(question: string, faqs: Faq[]): string {
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => question.includes(k))) {
      const matched = faqs.find((f) => f.category === category);
      if (matched) {
        return category === "예약"
          ? `${matched.answer} 예약을 원하시면 예약 페이지에서 신청해주세요.`
          : matched.answer;
      }
    }
  }
  return "매장 확인이 필요합니다.";
}

export async function askFaq(question: string, store: Store, faqs: Faq[]): Promise<string> {
  const openai = getClient();
  if (!openai) return mockAskFaq(question, faqs);

  const context = buildStoreContext(store, faqs);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "system", content: context },
      { role: "user", content: question },
    ],
  });

  return completion.choices[0]?.message?.content?.trim() ?? "매장 확인이 필요합니다.";
}
