"use client";

import { useEffect, useState } from "react";
import AdminNav from "../AdminNav";
import { Store } from "@/lib/types";

const WEEKDAYS = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

type FormState = {
  name: string;
  opening_time: string;
  closing_time: string;
  last_order_time: string;
  total_seats: number;
  max_reservation_seats: number;
  closed_days: string[];
  address: string;
  parking_info: string;
  main_menu: string;
  group_reservation_threshold: number;
  notice: string;
};

function toFormState(store: Store): FormState {
  return {
    name: store.name,
    opening_time: store.opening_time.slice(0, 5),
    closing_time: store.closing_time.slice(0, 5),
    last_order_time: store.last_order_time?.slice(0, 5) ?? "",
    total_seats: store.total_seats,
    max_reservation_seats: store.max_reservation_seats,
    closed_days: store.closed_days ?? [],
    address: store.address ?? "",
    parking_info: store.parking_info ?? "",
    main_menu: store.main_menu ?? "",
    group_reservation_threshold: store.group_reservation_threshold,
    notice: store.notice ?? "",
  };
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/store")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setForm(toFormState(data.store));
      })
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function toggleClosedDay(day: string) {
    if (!form) return;
    const next = form.closed_days.includes(day)
      ? form.closed_days.filter((d) => d !== day)
      : [...form.closed_days, day];
    update("closed_days", next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setSavedMessage("");

    try {
      const res = await fetch("/api/admin/store", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          last_order_time: form.last_order_time || null,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setForm(toFormState(data.store));
        setSavedMessage("저장되었습니다.");
      } else {
        setSavedMessage(data.message ?? "저장에 실패했습니다.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) {
    return (
      <main className="mx-auto w-full max-w-2xl px-6 py-8">
        <AdminNav active="settings" />
        <p className="text-sm text-brand-gray">불러오는 중...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-8">
      <AdminNav active="settings" />
      <h1 className="mb-6 text-xl font-bold">매장 설정</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="매장명">
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="input"
          />
        </Field>

        <div className="grid grid-cols-3 gap-3">
          <Field label="영업 시작">
            <input
              type="time"
              value={form.opening_time}
              onChange={(e) => update("opening_time", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="영업 종료">
            <input
              type="time"
              value={form.closing_time}
              onChange={(e) => update("closing_time", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="라스트오더">
            <input
              type="time"
              value={form.last_order_time}
              onChange={(e) => update("last_order_time", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="총 좌석 수">
            <input
              type="number"
              min={0}
              value={form.total_seats}
              onChange={(e) => update("total_seats", Number(e.target.value))}
              className="input"
            />
          </Field>
          <Field label="최대 예약 가능 좌석">
            <input
              type="number"
              min={0}
              value={form.max_reservation_seats}
              onChange={(e) => update("max_reservation_seats", Number(e.target.value))}
              className="input"
            />
          </Field>
        </div>

        <Field label="휴무일">
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleClosedDay(day)}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  form.closed_days.includes(day)
                    ? "bg-brand-black text-white"
                    : "bg-brand-light text-brand-gray"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </Field>

        <Field label="주소">
          <input
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="주차 안내">
          <input
            value={form.parking_info}
            onChange={(e) => update("parking_info", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="대표 메뉴">
          <input
            value={form.main_menu}
            onChange={(e) => update("main_menu", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="단체예약 기준 인원">
          <input
            type="number"
            min={1}
            value={form.group_reservation_threshold}
            onChange={(e) => update("group_reservation_threshold", Number(e.target.value))}
            className="input"
          />
        </Field>

        <Field label="기본 안내 문구">
          <textarea
            value={form.notice}
            onChange={(e) => update("notice", e.target.value)}
            rows={3}
            className="input"
          />
        </Field>

        <button
          type="submit"
          disabled={saving}
          className="mt-2 w-full rounded-xl bg-brand-black py-4 text-base font-semibold text-white disabled:opacity-50"
        >
          {saving ? "저장 중..." : "저장하기"}
        </button>

        {savedMessage && <p className="text-sm text-brand-gray">{savedMessage}</p>}
      </form>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
