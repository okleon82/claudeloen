import { NextRequest, NextResponse } from "next/server";
import { listStocks, upsertStock } from "@/lib/db";

export async function GET() {
  const stocks = await listStocks();
  return NextResponse.json({ stocks });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.name) {
    return NextResponse.json({ error: "종목명은 필수입니다." }, { status: 400 });
  }
  const stock = await upsertStock({
    id: body.id,
    name: body.name,
    ticker: body.ticker || null,
    buy_amount: Number(body.buy_amount) || 0,
    buy_date: body.buy_date || null,
    current_value: Number(body.current_value) || 0,
    note: body.note || null,
    sort_order: Number(body.sort_order) || 0,
  });
  return NextResponse.json({ stock });
}
