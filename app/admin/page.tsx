"use client";

import { useEffect, useMemo, useState } from "react";
import AdminNav from "./AdminNav";
import { STATUS_BADGE_CLASS, STATUS_LABEL, todayStr } from "./statusLabels";
import { Reservation, ReservationStatus, Store } from "@/lib/types";

type FilterTab = "all" | "pending" | "confirmed";

export default function AdminDashboardPage() {
  const [store, setStore] = useState<Store | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reservations");
      const data = await res.json();
      if (data.ok) {
        setStore(data.store);
        setReservations(data.reservations);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const today = todayStr();

  const todayReservations = useMemo(
    () =>
      reservations.filter(
        (r) => r.reservation_date === today && (r.status === "pending" || r.status === "confirmed")
      ),
    [reservations, today]
  );

  const pendingReservations = useMemo(
    () => reservations.filter((r) => r.status === "pending"),
    [reservations]
  );

  const confirmedReservations = useMemo(
    () => reservations.filter((r) => r.status === "confirmed"),
    [reservations]
  );

  const todayPartySize = useMemo(
    () => todayReservations.reduce((sum, r) => sum + r.party_size, 0),
    [todayReservations]
  );

  const remainingSeatsToday = store
    ? Math.max(store.max_reservation_seats - todayPartySize, 0)
    : 0;

  const visibleReservations = useMemo(() => {
    if (filter === "pending") return pendingReservations;
    if (filter === "confirmed") return confirmedReservations;
    return reservations;
  }, [filter, reservations, pendingReservations, confirmedReservations]);

  async function handleStatusChange(id: string, status: ReservationStatus) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.ok) {
        setReservations((prev) => prev.map((r) => (r.id === id ? data.reservation : r)));
      }
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-8">
      <AdminNav active="dashboard" />
      <h1 className="mb-6 text-xl font-bold">{store?.name ?? "예약"} 대시보드</h1>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="오늘 예약" value={todayReservations.length} />
        <StatCard label="대기중" value={pendingReservations.length} />
        <StatCard label="확정" value={confirmedReservations.length} />
        <StatCard label="오늘 예약 인원" value={`${todayPartySize}명`} />
        <StatCard label="오늘 남은 좌석" value={`${remainingSeatsToday}석`} />
      </div>

      <div className="mb-4 flex gap-2">
        {(["all", "pending", "confirmed"] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              filter === tab ? "bg-brand-black text-white" : "bg-brand-light text-brand-gray"
            }`}
          >
            {tab === "all" ? "전체" : tab === "pending" ? "대기중" : "확정"}
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-brand-gray">불러오는 중...</p>}

      {!loading && visibleReservations.length === 0 && (
        <p className="text-sm text-brand-gray">예약이 없습니다.</p>
      )}

      <div className="flex flex-col gap-3">
        {visibleReservations.map((r) => (
          <div key={r.id} className="rounded-xl border border-gray-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold">{r.customer_name}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_BADGE_CLASS[r.status]}`}
              >
                {STATUS_LABEL[r.status]}
              </span>
            </div>
            <p className="text-sm text-brand-gray">
              {r.reservation_date} {r.reservation_time.slice(0, 5)} · {r.party_size}명 · {r.phone}
            </p>
            {r.memo && <p className="mt-1 text-sm text-brand-black">요청사항: {r.memo}</p>}
            {r.admin_note && (
              <p className="mt-1 text-sm text-brand-gray">관리자 메모: {r.admin_note}</p>
            )}

            {r.status === "pending" && (
              <div className="mt-3 flex gap-2">
                <button
                  disabled={updatingId === r.id}
                  onClick={() => handleStatusChange(r.id, "confirmed")}
                  className="flex-1 rounded-lg bg-brand-black py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  승인
                </button>
                <button
                  disabled={updatingId === r.id}
                  onClick={() => handleStatusChange(r.id, "rejected")}
                  className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold disabled:opacity-50"
                >
                  거절
                </button>
              </div>
            )}

            {r.status === "confirmed" && (
              <div className="mt-3 flex gap-2">
                <button
                  disabled={updatingId === r.id}
                  onClick={() => handleStatusChange(r.id, "cancelled")}
                  className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold disabled:opacity-50"
                >
                  취소 처리
                </button>
                <button
                  disabled={updatingId === r.id}
                  onClick={() => handleStatusChange(r.id, "no_show")}
                  className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold disabled:opacity-50"
                >
                  노쇼 처리
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-brand-light px-4 py-3">
      <p className="text-xs text-brand-gray">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
