"use client";

import Link from "next/link";
import { useState } from "react";
import { Faq } from "@/lib/types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const RESERVATION_KEYWORDS = ["예약", "자리", "테이블"];

export default function FaqChat({ faqs }: { faqs: Faq[] }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk(q: string) {
    const trimmed = q.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await res.json();
      const answer: string = data.ok ? data.answer : data.message ?? "매장 확인이 필요합니다.";
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showReserveHint =
    messages.length > 0 &&
    RESERVATION_KEYWORDS.some((k) => messages[messages.length - 1]?.content.includes(k));

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-10">
      <h1 className="mb-1 text-xl font-bold">FAQ 문의</h1>
      <p className="mb-6 text-sm text-brand-gray">궁금한 점을 편하게 물어보세요.</p>

      <div className="mb-6 flex flex-col gap-2">
        {faqs.map((faq) => (
          <button
            key={faq.id}
            onClick={() => handleAsk(faq.question)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-left text-sm text-brand-black active:bg-brand-light"
          >
            {faq.question}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-1 flex-col gap-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
              m.role === "user"
                ? "self-end bg-brand-black text-white"
                : "self-start bg-brand-light text-brand-black"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="self-start rounded-xl bg-brand-light px-4 py-3 text-sm text-brand-gray">
            답변 작성 중...
          </div>
        )}
      </div>

      {showReserveHint && (
        <Link
          href="/reserve"
          className="mb-4 w-full rounded-xl border border-gray-300 py-3 text-center text-sm font-semibold active:bg-brand-light"
        >
          예약 페이지로 이동
        </Link>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(question);
        }}
        className="flex gap-2"
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="예: 주차 가능한가요?"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-black px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          전송
        </button>
      </form>
    </main>
  );
}
