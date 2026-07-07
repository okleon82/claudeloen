"use client";

import { useState } from "react";

interface ReserveFormProps {
  storeName: string;
  openingTime: string;
  closingTime: string;
  closedDays: string[];
}

interface ReservationResponse {
  ok: boolean;
  message: string;
  isGroupReservation?: boolean;
}

export default function ReserveForm({
  storeName,
  openingTime,
  closingTime,
  closedDays,
}: ReserveFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [memo, setMemo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ReservationResponse | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          phone,
          reservation_date: reservationDate,
          reservation_time: reservationTime,
          party_size: partySize,
          memo,
        }),
      });

      const data: ReservationResponse = await res.json();
      setResult(data);

      if (data.ok) {
        setCustomerName("");
        setPhone("");
        setReservationDate("");
        setReservationTime("");
        setPartySize(2);
        setMemo("");
      }
    } catch {
      setResult({ ok: false, message: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-10">
      <h1 className="mb-1 text-xl font-bold">{storeName} 예약하기</h1>
      <p className="mb-6 text-sm text-brand-gray">
        영업시간 {openingTime.slice(0, 5)} ~ {closingTime.slice(0, 5)}
        {closedDays.length > 0 && ` · 휴무일 ${closedDays.join(", ")}`}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">이름</label>
          <input
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base"
            placeholder="홍길동"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">연락처</label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base"
            placeholder="010-1234-5678"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">예약 날짜</label>
            <input
              required
              type="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-base"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">예약 시간</label>
            <input
              required
              type="time"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-base"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">인원</label>
          <input
            required
            type="number"
            min={1}
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">요청사항 (선택)</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base"
            placeholder="창가 자리 부탁드려요"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-xl bg-brand-black py-4 text-base font-semibold text-white disabled:opacity-50"
        >
          {submitting ? "전송 중..." : "예약 요청 보내기"}
        </button>
      </form>

      {result && (
        <div
          className={`mt-5 rounded-xl border px-4 py-4 text-sm ${
            result.ok
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <p className="font-medium">{result.message}</p>
          {result.ok && result.isGroupReservation && (
            <p className="mt-1 text-green-700">단체 예약은 매장 확인 후 확정됩니다.</p>
          )}
        </div>
      )}
    </main>
  );
}
