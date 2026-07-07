import { Store } from "./types";

const WEEKDAYS_KO = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

export type AvailabilityResult =
  | { ok: true; isGroupReservation: boolean; message: string }
  | {
      ok: false;
      reason: "closed_day" | "outside_hours" | "past_last_order" | "seats_full";
      message: string;
    };

export interface AvailabilityCheckParams {
  store: Store;
  reservationDate: string; // "YYYY-MM-DD"
  reservationTime: string; // "HH:MM"
  partySize: number;
  /** 같은 날짜/시간대에 이미 confirmed + pending 상태로 잡힌 인원 합계 */
  existingReservedSeats: number;
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

/** 영업시간이 자정을 넘기는 경우(예: 17:00~01:00)를 고려해 기준 시각(open) 이후 경과 분으로 정규화한다. */
function normalizeAfterOpen(minutes: number, openMinutes: number): number {
  return minutes >= openMinutes ? minutes : minutes + 24 * 60;
}

export function checkAvailability(params: AvailabilityCheckParams): AvailabilityResult {
  const { store, reservationDate, reservationTime, partySize, existingReservedSeats } = params;

  // 1. 휴무일 체크
  const weekday = WEEKDAYS_KO[new Date(`${reservationDate}T00:00:00`).getDay()];
  if (store.closed_days?.includes(weekday)) {
    return {
      ok: false,
      reason: "closed_day",
      message: "해당 날짜는 휴무일입니다. 다른 날짜를 선택해주세요.",
    };
  }

  const openMin = toMinutes(store.opening_time);
  const closeMin = normalizeAfterOpen(toMinutes(store.closing_time), openMin);
  const resMin = normalizeAfterOpen(toMinutes(reservationTime), openMin);

  // 2. 영업시간 체크
  if (resMin < openMin || resMin > closeMin) {
    return {
      ok: false,
      reason: "outside_hours",
      message: "해당 시간은 예약이 어렵습니다. 영업시간을 확인해주세요.",
    };
  }

  // 3. 라스트오더 체크
  if (store.last_order_time) {
    const lastOrderMin = normalizeAfterOpen(toMinutes(store.last_order_time), openMin);
    if (resMin > lastOrderMin) {
      return {
        ok: false,
        reason: "past_last_order",
        message: "해당 시간은 라스트오더 이후라 예약이 어렵습니다.",
      };
    }
  }

  // 4. 좌석 수 체크
  if (existingReservedSeats + partySize > store.max_reservation_seats) {
    return {
      ok: false,
      reason: "seats_full",
      message: "해당 시간은 예약이 어렵습니다. 다른 시간을 선택해주세요.",
    };
  }

  // 5. 단체 예약 여부
  const isGroupReservation = partySize >= store.group_reservation_threshold;

  return {
    ok: true,
    isGroupReservation,
    message: isGroupReservation
      ? "단체 예약은 매장 확인 후 확정됩니다."
      : "예약 요청이 가능합니다.",
  };
}
