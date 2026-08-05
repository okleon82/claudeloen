import { NextRequest, NextResponse } from "next/server";
import { getEtfSettings, updateEtfSettings } from "@/lib/db";

const NUMERIC_KEYS = [
  "stage1_monthly_invest",
  "scenario_conservative_rate",
  "scenario_base_rate",
  "scenario_aggressive_rate",
  "voo_pct",
  "voo_dividend_yield",
  "schd_pct",
  "schd_dividend_yield",
  "stock_pct",
  "stock_dividend_yield",
] as const;

export async function GET() {
  const settings = await getEtfSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const patch: Record<string, number> = {};
  for (const key of NUMERIC_KEYS) {
    if (body?.[key] !== undefined) patch[key] = Number(body[key]) || 0;
  }
  const settings = await updateEtfSettings(patch);
  return NextResponse.json({ settings });
}
