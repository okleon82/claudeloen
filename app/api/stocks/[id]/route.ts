import { NextResponse } from "next/server";
import { deleteStock } from "@/lib/db";

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  await deleteStock(params.id);
  return NextResponse.json({ ok: true });
}
