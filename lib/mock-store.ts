import "server-only";
import { Faq, Reservation, ReservationInput, ReservationStatus, Store } from "./types";

/**
 * Supabase 환경변수가 없을 때 사용하는 메모리 기반 데모 데이터.
 * API 키 없이 전체 플로우(예약 생성/조회/상태 변경/FAQ)를 바로 체험할 수 있도록 하기 위한 것으로,
 * 서버 프로세스가 재시작되면 초기화된다. 운영 환경에서는 반드시 Supabase를 연결해야 한다.
 *
 * Next.js Route Handler는 파일별로 독립된 번들로 컴파일되므로, 일반 모듈 스코프 변수로는
 * 요청(라우트) 간에 상태가 공유되지 않는다. 그래서 같은 Node 프로세스에서 항상 하나인
 * globalThis에 데이터를 올려 진짜 싱글턴으로 동작하게 한다.
 */

const MOCK_STORE_ID = "mock-store-id";

function nowIso(): string {
  return new Date().toISOString();
}

type MockData = {
  store: Store;
  faqs: Faq[];
  reservations: Reservation[];
  reservationSeq: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __jeonjangMockData: MockData | undefined;
}

function createInitialData(): MockData {
  return {
    store: {
      id: MOCK_STORE_ID,
      name: "로바타풍산",
      opening_time: "17:00:00",
      closing_time: "01:00:00",
      last_order_time: "00:00:00",
      total_seats: 32,
      max_reservation_seats: 24,
      closed_days: ["일요일"],
      address: "테스트 주소",
      parking_info: "건물 주차 가능",
      main_menu: "사시미, 나베, 후토마끼",
      group_reservation_threshold: 7,
      notice: "전화 받기 힘든 사장님을 위한 AI 예약비서, 점장AI가 도와드립니다.",
      created_at: nowIso(),
      updated_at: nowIso(),
    },
    faqs: [
      {
        id: "mock-faq-1",
        store_id: MOCK_STORE_ID,
        question: "주차 가능한가요?",
        answer: "건물 주차 가능합니다. 방문 전 매장에 확인 부탁드립니다.",
        category: "주차",
        created_at: nowIso(),
        updated_at: nowIso(),
      },
      {
        id: "mock-faq-2",
        store_id: MOCK_STORE_ID,
        question: "라스트오더는 몇 시인가요?",
        answer: "라스트오더는 00:00입니다.",
        category: "영업시간",
        created_at: nowIso(),
        updated_at: nowIso(),
      },
      {
        id: "mock-faq-3",
        store_id: MOCK_STORE_ID,
        question: "단체예약 가능한가요?",
        answer: "7명 이상 단체예약은 매장 확인 후 확정됩니다.",
        category: "예약",
        created_at: nowIso(),
        updated_at: nowIso(),
      },
      {
        id: "mock-faq-4",
        store_id: MOCK_STORE_ID,
        question: "영업시간이 어떻게 되나요?",
        answer: "영업시간은 17:00부터 01:00까지입니다.",
        category: "영업시간",
        created_at: nowIso(),
        updated_at: nowIso(),
      },
      {
        id: "mock-faq-5",
        store_id: MOCK_STORE_ID,
        question: "대표 메뉴는 무엇인가요?",
        answer: "사시미, 나베, 후토마끼가 대표 메뉴입니다.",
        category: "메뉴",
        created_at: nowIso(),
        updated_at: nowIso(),
      },
    ],
    reservations: [],
    reservationSeq: 1,
  };
}

function getData(): MockData {
  if (!globalThis.__jeonjangMockData) {
    globalThis.__jeonjangMockData = createInitialData();
  }
  return globalThis.__jeonjangMockData;
}

export function mockGetStore(): Store {
  return getData().store;
}

export function mockUpdateStore(patch: Partial<Store>): Store {
  const data = getData();
  data.store = { ...data.store, ...patch, updated_at: nowIso() };
  return data.store;
}

export function mockGetReservedSeatsForSlot(
  storeId: string,
  date: string,
  time: string
): number {
  return getData()
    .reservations.filter(
      (r) =>
        r.store_id === storeId &&
        r.reservation_date === date &&
        r.reservation_time.slice(0, 5) === time.slice(0, 5) &&
        (r.status === "pending" || r.status === "confirmed")
    )
    .reduce((sum, r) => sum + r.party_size, 0);
}

export function mockCreateReservation(storeId: string, input: ReservationInput): Reservation {
  const data = getData();
  const reservation: Reservation = {
    id: `mock-reservation-${data.reservationSeq++}`,
    store_id: storeId,
    customer_name: input.customer_name,
    phone: input.phone,
    reservation_date: input.reservation_date,
    reservation_time: input.reservation_time,
    party_size: input.party_size,
    status: "pending",
    memo: input.memo || null,
    admin_note: null,
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  data.reservations = [...data.reservations, reservation];
  return reservation;
}

export function mockListReservations(storeId: string): Reservation[] {
  return getData()
    .reservations.filter((r) => r.store_id === storeId)
    .sort((a, b) =>
      `${a.reservation_date}${a.reservation_time}`.localeCompare(
        `${b.reservation_date}${b.reservation_time}`
      )
    );
}

export function mockUpdateReservation(
  reservationId: string,
  patch: { status?: ReservationStatus; admin_note?: string }
): Reservation {
  const data = getData();
  const target = data.reservations.find((r) => r.id === reservationId);
  if (!target) throw new Error("예약을 찾을 수 없습니다.");

  const updated: Reservation = { ...target, ...patch, updated_at: nowIso() };
  data.reservations = data.reservations.map((r) => (r.id === reservationId ? updated : r));
  return updated;
}

export function mockListFaqs(): Faq[] {
  return getData().faqs;
}
