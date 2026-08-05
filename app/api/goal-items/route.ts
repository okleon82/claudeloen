import { NextRequest, NextResponse } from "next/server";
import { listGoalItems, upsertGoalItem } from "@/lib/db";

export async function GET() {
  const items = await listGoalItems();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.category || !body?.item) {
    return NextResponse.json({ error: "카테고리와 항목명은 필수입니다." }, { status: 400 });
  }
  const item = await upsertGoalItem({
    id: body.id,
    category: body.category,
    item: body.item,
    expected_month: body.expected_month || null,
    amount: Number(body.amount) || 0,
    note: body.note || null,
    sort_order: Number(body.sort_order) || 0,
  });
  return NextResponse.json({ item });
}
