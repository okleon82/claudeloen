import { NextResponse } from "next/server";
import { deleteGoalItem } from "@/lib/db";

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  await deleteGoalItem(params.id);
  return NextResponse.json({ ok: true });
}
