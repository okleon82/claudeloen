import { NextRequest, NextResponse } from "next/server";
import { getGoalSettings, updateGoalSettings } from "@/lib/db";

export async function GET() {
  const settings = await getGoalSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const patch: Record<string, string | null> = {};
  if (body?.title !== undefined) patch.title = body.title;
  if (body?.target_month !== undefined) patch.target_month = body.target_month || null;
  if (body?.note !== undefined) patch.note = body.note || null;
  const settings = await updateGoalSettings(patch);
  return NextResponse.json({ settings });
}
