import "server-only";
import { Reservation } from "./types";

/**
 * 사장님 알림 구조 (MVP).
 * 지금은 콘솔 로그로만 남기고, 추후 이메일/카카오 알림톡 등으로 교체 가능하도록
 * 호출부는 이 함수 하나만 의존한다.
 */
export async function notifyNewReservation(reservation: Reservation): Promise<void> {
  const message = `[점장AI] 새 예약 요청 - ${reservation.customer_name}(${reservation.phone}) ${reservation.reservation_date} ${reservation.reservation_time} ${reservation.party_size}명`;

  // TODO: 이메일/카카오 알림톡 연동 시 이 부분을 교체한다.
  console.log(message);
}
