import { NextRequest, NextResponse } from "next/server";
import { listFaqs, getStore } from "@/lib/db";
import { askFaq } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = typeof body?.question === "string" ? body.question.trim() : "";

    if (!question) {
      return NextResponse.json({ ok: false, message: "질문을 입력해주세요." }, { status: 400 });
    }

    const store = await getStore();
    const faqs = await listFaqs(store.id);
    const answer = await askFaq(question, store, faqs);

    return NextResponse.json({ ok: true, answer });
  } catch (error) {
    console.error("FAQ API 오류:", error);
    return NextResponse.json(
      { ok: false, message: "답변 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
