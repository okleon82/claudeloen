import { NextRequest, NextResponse } from "next/server";
import { listDebts, upsertDebt } from "@/lib/db";

export async function GET() {
  const debts = await listDebts();
  return NextResponse.json({ debts });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.name) {
    return NextResponse.json({ error: "대출명은 필수입니다." }, { status: 400 });
  }
  const debt = await upsertDebt({
    id: body.id,
    name: body.name,
    balance: Number(body.balance) || 0,
    annual_rate: Number(body.annual_rate) || 0,
    monthly_payment: Number(body.monthly_payment) || 0,
    priority: Number(body.priority) || 1,
  });
  return NextResponse.json({ debt });
}
