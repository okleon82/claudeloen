import { NextResponse } from "next/server";
import { deleteMonthlyRecord } from "@/lib/db";

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  await deleteMonthlyRecord(params.id);
  return NextResponse.json({ ok: true });
}
