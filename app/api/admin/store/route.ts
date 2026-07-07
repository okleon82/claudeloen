import { NextRequest, NextResponse } from "next/server";
import { getStore, updateStore } from "@/lib/db";
import { Store } from "@/lib/types";

export const dynamic = "force-dynamic";

const EDITABLE_FIELDS: (keyof Store)[] = [
  "name",
  "opening_time",
  "closing_time",
  "last_order_time",
  "total_seats",
  "max_reservation_seats",
  "closed_days",
  "address",
  "parking_info",
  "main_menu",
  "group_reservation_threshold",
  "notice",
];

export async function GET() {
  try {
    const store = await getStore();
    return NextResponse.json({ ok: true, store });
  } catch (error) {
    console.error("매장 설정 조회 오류:", error);
    return NextResponse.json({ ok: false, message: "매장 정보를 불러오지 못했습니다." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, message: "입력값을 확인해주세요." }, { status: 400 });
    }

    const patch: Partial<Store> = {};
    for (const field of EDITABLE_FIELDS) {
      if (field in body) {
        (patch as Record<string, unknown>)[field] = (body as Record<string, unknown>)[field];
      }
    }

    const store = await getStore();
    const updated = await updateStore(store.id, patch);
    return NextResponse.json({ ok: true, store: updated });
  } catch (error) {
    console.error("매장 설정 수정 오류:", error);
    return NextResponse.json({ ok: false, message: "매장 정보 수정에 실패했습니다." }, { status: 500 });
  }
}
