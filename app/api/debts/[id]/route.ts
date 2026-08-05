import { NextResponse } from "next/server";
import { deleteDebt } from "@/lib/db";

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  await deleteDebt(params.id);
  return NextResponse.json({ ok: true });
}
