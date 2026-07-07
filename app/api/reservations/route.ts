import { NextRequest, NextResponse } from "next/server";
import { checkAvailability } from "@/lib/availability";
import { createReservation, getReservedSeatsForSlot, getStore } from "@/lib/db";
import { notifyNewReservation } from "@/lib/notify";
import { ReservationInput } from "@/lib/types";

function isValidInput(body: unknown): body is ReservationInput {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.customer_name === "string" &&
    b.customer_name.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.reservation_date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(b.reservation_date) &&
    typeof b.reservation_time === "string" &&
    /^\d{2}:\d{2}$/.test(b.reservation_time) &&
    typeof b.party_size === "number" &&
    Number.isInteger(b.party_size) &&
    b.party_size > 0
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!isValidInput(body)) {
      return NextResponse.json(
        { ok: false, message: "입력값을 다시 확인해주세요." },
        { status: 400 }
      );
    }

    const store = await getStore();
    const reservedSeats = await getReservedSeatsForSlot(
      store.id,
      body.reservation_date,
      body.reservation_time
    );

    const availability = checkAvailability({
      store,
      reservationDate: body.reservation_date,
      reservationTime: body.reservation_time,
      partySize: body.party_size,
      existingReservedSeats: reservedSeats,
    });

    if (!availability.ok) {
      return NextResponse.json({ ok: false, message: availability.message }, { status: 200 });
    }

    const reservation = await createReservation(store.id, body);
    await notifyNewReservation(reservation);

    return NextResponse.json({
      ok: true,
      message: "예약 요청이 접수되었습니다. 매장 확인 후 확정 안내드리겠습니다.",
      isGroupReservation: availability.isGroupReservation,
      reservation,
    });
  } catch (error) {
    console.error("예약 생성 API 오류:", error);
    return NextResponse.json(
      { ok: false, message: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
