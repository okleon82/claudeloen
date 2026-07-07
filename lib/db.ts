import "server-only";
import { createAdminSupabaseClient } from "./supabase/admin";
import { Faq, Reservation, ReservationInput, ReservationStatus, Store } from "./types";

// MVP는 단일 매장 구조이므로, 첫 번째 매장 row를 "그 매장"으로 사용한다.
export async function getStore(): Promise<Store> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(`매장 정보 조회 실패: ${error.message}`);
  if (!data) throw new Error("매장 정보가 없습니다. seed 데이터를 먼저 등록해주세요.");

  return data as Store;
}

export async function updateStore(storeId: string, patch: Partial<Store>): Promise<Store> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("stores")
    .update(patch)
    .eq("id", storeId)
    .select("*")
    .single();

  if (error) throw new Error(`매장 정보 수정 실패: ${error.message}`);
  return data as Store;
}

/** 같은 매장/날짜/시간대에 이미 pending 또는 confirmed 상태로 잡힌 인원 합계 */
export async function getReservedSeatsForSlot(
  storeId: string,
  date: string,
  time: string
): Promise<number> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("party_size")
    .eq("store_id", storeId)
    .eq("reservation_date", date)
    .eq("reservation_time", time)
    .in("status", ["pending", "confirmed"]);

  if (error) throw new Error(`예약 현황 조회 실패: ${error.message}`);

  return (data ?? []).reduce((sum, row) => sum + (row.party_size as number), 0);
}

export async function createReservation(
  storeId: string,
  input: ReservationInput
): Promise<Reservation> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("reservations")
    .insert({
      store_id: storeId,
      customer_name: input.customer_name,
      phone: input.phone,
      reservation_date: input.reservation_date,
      reservation_time: input.reservation_time,
      party_size: input.party_size,
      memo: input.memo || null,
      status: "pending",
    })
    .select("*")
    .single();

  if (error) throw new Error(`예약 생성 실패: ${error.message}`);
  return data as Reservation;
}

export async function listReservations(storeId: string): Promise<Reservation[]> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("store_id", storeId)
    .order("reservation_date", { ascending: true })
    .order("reservation_time", { ascending: true });

  if (error) throw new Error(`예약 목록 조회 실패: ${error.message}`);
  return (data ?? []) as Reservation[];
}

export async function updateReservation(
  reservationId: string,
  patch: { status?: ReservationStatus; admin_note?: string }
): Promise<Reservation> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("reservations")
    .update(patch)
    .eq("id", reservationId)
    .select("*")
    .single();

  if (error) throw new Error(`예약 수정 실패: ${error.message}`);
  return data as Reservation;
}

export async function listFaqs(storeId: string): Promise<Faq[]> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("store_id", storeId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(`FAQ 조회 실패: ${error.message}`);
  return (data ?? []) as Faq[];
}
