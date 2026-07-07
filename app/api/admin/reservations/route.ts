import { NextResponse } from "next/server";
import { getStore, listReservations } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const store = await getStore();
    const reservations = await listReservations(store.id);
    return NextResponse.json({ ok: true, store, reservations });
  } catch (error) {
    console.error("관리자 예약 목록 조회 오류:", error);
    return NextResponse.json({ ok: false, message: "예약 목록을 불러오지 못했습니다." }, { status: 500 });
  }
}
