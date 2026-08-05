"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/Section";
import { computeMonthlySeries, formatMonth, formatWon } from "@/lib/calc";
import { MonthlyRecord } from "@/lib/types";

type Draft = Omit<MonthlyRecord, "id"> & { id?: string };

const EMPTY_DRAFT: Draft = {
  month: formatMonth(new Date()),
  salary: 0,
  other_income: 0,
  loan_payment: 0,
  other_fixed: 0,
  extra_expense: 0,
  memo: "",
};

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block text-xs text-brand-gray">
      {label}
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="input mt-1"
      />
    </label>
  );
}

export default function MonthlyClient({
  initialSeries,
  startingCumulativeAssets,
}: {
  initialSeries: (MonthlyRecord & { totalIncome: number; totalExpense: number; remaining: number; cumulativeAssets: number })[];
  startingCumulativeAssets: number;
}) {
  const router = useRouter();
  const [records, setRecords] = useState<MonthlyRecord[]>(
    initialSeries.map(({ totalIncome: _ti, totalExpense: _te, remaining: _r, cumulativeAssets: _c, ...rest }) => rest)
  );
  const [drafts, setDrafts] = useState<Record<string, Draft>>(
    Object.fromEntries(records.map((r) => [r.id, { ...r }]))
  );
  const [newDraft, setNewDraft] = useState<Draft>(EMPTY_DRAFT);
  const [saving, setSaving] = useState<string | null>(null);

  const series = useMemo(() => computeMonthlySeries(records, startingCumulativeAssets), [records, startingCumulativeAssets]);

  function updateDraft(id: string, patch: Partial<Draft>) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function saveRecord(id: string) {
    const draft = drafts[id];
    setSaving(id);
    try {
      const res = await fetch("/api/monthly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (data.record) {
        setRecords((prev) => prev.map((r) => (r.id === id ? data.record : r)));
      }
      router.refresh();
    } finally {
      setSaving(null);
    }
  }

  async function deleteRecord(id: string) {
    if (!confirm("이 달 기록을 삭제할까요?")) return;
    setSaving(id);
    try {
      await fetch(`/api/monthly/${id}`, { method: "DELETE" });
      setRecords((prev) => prev.filter((r) => r.id !== id));
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      router.refresh();
    } finally {
      setSaving(null);
    }
  }

  async function addRecord() {
    if (!newDraft.month) return;
    setSaving("new");
    try {
      const res = await fetch("/api/monthly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDraft),
      });
      const data = await res.json();
      if (data.record) {
        setRecords((prev) => [...prev, data.record]);
        setDrafts((prev) => ({ ...prev, [data.record.id]: { ...data.record } }));
        setNewDraft({ ...EMPTY_DRAFT, month: formatMonth(new Date()) });
      }
      router.refresh();
    } finally {
      setSaving(null);
    }
  }

  return (
    <div>
      <Section title="월별기록" description="파란 입력값 대신 여기서 직접 수정합니다. 총수입·총지출·남는 돈·누적 보유자산은 자동 계산됩니다.">
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs text-brand-gray">
            월
            <input
              type="month"
              value={newDraft.month}
              onChange={(e) => setNewDraft((d) => ({ ...d, month: e.target.value }))}
              className="input mt-1"
            />
          </label>
          <NumberField label="월급여" value={newDraft.salary} onChange={(v) => setNewDraft((d) => ({ ...d, salary: v }))} />
          <NumberField label="기타수입" value={newDraft.other_income} onChange={(v) => setNewDraft((d) => ({ ...d, other_income: v }))} />
          <NumberField label="대출상환" value={newDraft.loan_payment} onChange={(v) => setNewDraft((d) => ({ ...d, loan_payment: v }))} />
          <NumberField label="기타고정비" value={newDraft.other_fixed} onChange={(v) => setNewDraft((d) => ({ ...d, other_fixed: v }))} />
          <NumberField label="추가지출" value={newDraft.extra_expense} onChange={(v) => setNewDraft((d) => ({ ...d, extra_expense: v }))} />
        </div>
        <button
          onClick={addRecord}
          disabled={saving === "new"}
          className="mt-3 w-full rounded-xl bg-brand-black py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving === "new" ? "추가 중..." : "새 달 추가"}
        </button>
      </Section>

      {series.map((row) => {
        const draft = drafts[row.id] ?? row;
        return (
          <div key={row.id} className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-base font-bold">{row.month}</span>
              <button onClick={() => deleteRecord(row.id)} className="text-xs text-red-600">
                삭제
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <NumberField label="월급여" value={draft.salary} onChange={(v) => updateDraft(row.id, { salary: v })} />
              <NumberField label="기타수입" value={draft.other_income} onChange={(v) => updateDraft(row.id, { other_income: v })} />
              <NumberField label="대출상환" value={draft.loan_payment} onChange={(v) => updateDraft(row.id, { loan_payment: v })} />
              <NumberField label="기타고정비" value={draft.other_fixed} onChange={(v) => updateDraft(row.id, { other_fixed: v })} />
              <NumberField label="추가지출" value={draft.extra_expense} onChange={(v) => updateDraft(row.id, { extra_expense: v })} />
            </div>

            <label className="mt-2 block text-xs text-brand-gray">
              메모
              <input
                type="text"
                value={draft.memo ?? ""}
                onChange={(e) => updateDraft(row.id, { memo: e.target.value })}
                className="input mt-1"
              />
            </label>

            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 rounded-xl bg-brand-light px-3 py-2.5 text-sm">
              <span className="text-brand-gray">총수입</span>
              <span className="text-right font-medium">{formatWon(row.totalIncome)}</span>
              <span className="text-brand-gray">총지출</span>
              <span className="text-right font-medium">{formatWon(row.totalExpense)}</span>
              <span className="text-brand-gray">남는 돈</span>
              <span className={`text-right font-semibold ${row.remaining >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {formatWon(row.remaining)}
              </span>
              <span className="text-brand-gray">누적 보유자산</span>
              <span className="text-right font-medium">{formatWon(row.cumulativeAssets)}</span>
            </div>

            <button
              onClick={() => saveRecord(row.id)}
              disabled={saving === row.id}
              className="mt-3 w-full rounded-xl bg-brand-black py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {saving === row.id ? "저장 중..." : "저장"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
