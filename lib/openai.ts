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

function getClient(): OpenAI {
  if (client) return client;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY 환경변수가 설정되지 않았습니다.");
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

export async function askFaq(question: string, store: Store, faqs: Faq[]): Promise<string> {
  const openai = getClient();
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
