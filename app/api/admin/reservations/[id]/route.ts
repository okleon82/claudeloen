import { NextRequest, NextResponse } from "next/server";
import { updateReservation } from "@/lib/db";
import { ReservationStatus } from "@/lib/types";

const VALID_STATUSES: ReservationStatus[] = [
  "pending",
  "confirmed",
  "rejected",
  "cancelled",
  "no_show",
];

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json().catch(() => null);
    const status = body?.status as ReservationStatus | undefined;
    const adminNote = typeof body?.admin_note === "string" ? body.admin_note : undefined;

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ ok: false, message: "잘못된 상태 값입니다." }, { status: 400 });
    }
    if (status === undefined && adminNote === undefined) {
      return NextResponse.json({ ok: false, message: "수정할 값이 없습니다." }, { status: 400 });
    }

    const reservation = await updateReservation(params.id, { status, admin_note: adminNote });
    return NextResponse.json({ ok: true, reservation });
  } catch (error) {
    console.error("예약 상태 변경 API 오류:", error);
    return NextResponse.json({ ok: false, message: "예약 상태 변경에 실패했습니다." }, { status: 500 });
  }
}
