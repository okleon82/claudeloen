import { NextRequest, NextResponse } from "next/server";
import { listMonthlyRecords, upsertMonthlyRecord } from "@/lib/db";

export async function GET() {
  const records = await listMonthlyRecords();
  return NextResponse.json({ records });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.month) {
    return NextResponse.json({ error: "월(month)은 필수입니다." }, { status: 400 });
  }
  const record = await upsertMonthlyRecord({
    id: body.id,
    month: body.month,
    salary: Number(body.salary) || 0,
    other_income: Number(body.other_income) || 0,
    loan_payment: Number(body.loan_payment) || 0,
    other_fixed: Number(body.other_fixed) || 0,
    extra_expense: Number(body.extra_expense) || 0,
    memo: body.memo || null,
  });
  return NextResponse.json({ record });
}
