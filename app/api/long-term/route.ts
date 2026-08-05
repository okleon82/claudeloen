import { NextRequest, NextResponse } from "next/server";
import { getLongTermSettings, updateLongTermSettings } from "@/lib/db";

export async function GET() {
  const settings = await getLongTermSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const patch: Record<string, number> = {};
  for (const key of [
    "cash_assets",
    "investment_assets",
    "target_net_worth",
    "expected_annual_return",
    "expected_severance",
    "expected_unemployment_benefit",
    "starting_cumulative_assets",
  ]) {
    if (body?.[key] !== undefined) patch[key] = Number(body[key]) || 0;
  }
  const settings = await updateLongTermSettings(patch);
  return NextResponse.json({ settings });
}
