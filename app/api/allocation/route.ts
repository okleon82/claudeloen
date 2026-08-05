import { NextRequest, NextResponse } from "next/server";
import { getAllocationSettings, updateAllocationSettings } from "@/lib/db";

const NUMERIC_KEYS = [
  "monthly_spare_cash",
  "cma_rate",
  "emergency_fund_months",
  "monthly_essential_expense",
  "current_stage",
  "stage1_debt_pct",
  "stage1_etf_pct",
  "stage1_stock_pct",
  "stage1_cma_pct",
  "stage2_debt_pct",
  "stage2_etf_pct",
  "stage2_stock_pct",
  "stage2_cma_pct",
] as const;

export async function GET() {
  const settings = await getAllocationSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const patch: Record<string, number> = {};
  for (const key of NUMERIC_KEYS) {
    if (body?.[key] !== undefined) patch[key] = Number(body[key]) || 0;
  }
  const settings = await updateAllocationSettings(patch);
  return NextResponse.json({ settings });
}
