"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Section, StatTile } from "@/components/Section";
import {
  computeDebtPayoff,
  computeMonthlyDebtPayment,
  computeNetWorth,
  computeTotalDebt,
  computeWeightedAvgRate,
  formatPercent,
  formatWon,
  fromPercentInput,
  sortDebtsByPriority,
  toPercentInput,
} from "@/lib/calc";
import { Debt, LongTermSettings } from "@/lib/types";

type DebtDraft = Omit<Debt, "id"> & { id?: string };

const EMPTY_DEBT: DebtDraft = { name: "", balance: 0, annual_rate: 0, monthly_payment: 0, priority: 1 };

export default function DebtsClient({
  initialDebts,
  initialLongTerm,
}: {
  initialDebts: Debt[];
  initialLongTerm: LongTermSettings;
}) {
  const router = useRouter();
  const [debts, setDebts] = useState<Debt[]>(initialDebts);
  const [longTerm, setLongTerm] = useState<LongTermSettings>(initialLongTerm);
  const [longTermDraft, setLongTermDraft] = useState<LongTermSettings>(initialLongTerm);
  const [debtDrafts, setDebtDrafts] = useState<Record<string, DebtDraft>>(
    Object.fromEntries(initialDebts.map((d) => [d.id, { ...d }]))
  );
  const [newDebt, setNewDebt] = useState<DebtDraft>(EMPTY_DEBT);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const totalDebt = useMemo(() => computeTotalDebt(debts), [debts]);
  const netWorth = useMemo(() => computeNetWorth(longTerm, debts), [longTerm, debts]);
  const weightedRate = useMemo(() => computeWeightedAvgRate(debts), [debts]);
  const monthlyDebtPayment = useMemo(() => computeMonthlyDebtPayment(debts), [debts]);
  const sortedDebts = useMemo(() => sortDebtsByPriority(debts), [debts]);
  const today = new Date();

  async function saveLongTerm() {
    setSavingKey("long-term");
    try {
      const res = await fetch("/api/long-term", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(longTermDraft),
      });
      const data = await res.json();
      if (data.settings) setLongTerm(data.settings);
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  function updateDebtDraft(id: string, patch: Partial<DebtDraft>) {
    setDebtDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function saveDebt(id: string) {
    setSavingKey(id);
    try {
      const res = await fetch("/api/debts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(debtDrafts[id]),
      });
      const data = await res.json();
      if (data.debt) setDebts((prev) => prev.map((d) => (d.id === id ? data.debt : d)));
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  async function deleteDebt(id: string) {
    if (!confirm("이 대출을 삭제할까요?")) return;
    setSavingKey(id);
    try {
      await fetch(`/api/debts/${id}`, { method: "DELETE" });
      setDebts((prev) => prev.filter((d) => d.id !== id));
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  async function addDebt() {
    if (!newDebt.name) return;
    setSavingKey("new");
    try {
      const res = await fetch("/api/debts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDebt),
      });
      const data = await res.json();
      if (data.debt) {
        setDebts((prev) => [...prev, data.debt]);
        setDebtDrafts((prev) => ({ ...prev, [data.debt.id]: { ...data.debt } }));
        setNewDebt(EMPTY_DEBT);
      }
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  return (
    <div>
      <Section title="현재 자산 · 부채 · 핵심 지표" description="월말에만 확인하세요.">
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs text-brand-gray">
            현금성 자산
            <input
              type="number"
              value={longTermDraft.cash_assets}
              onChange={(e) => setLongTermDraft((s) => ({ ...s, cash_assets: Number(e.target.value) }))}
              className="input mt-1"
            />
          </label>
          <label className="block text-xs text-brand-gray">
            투자자산
            <input
              type="number"
              value={longTermDraft.investment_assets}
              onChange={(e) => setLongTermDraft((s) => ({ ...s, investment_assets: Number(e.target.value) }))}
              className="input mt-1"
            />
          </label>
          <label className="block text-xs text-brand-gray">
            목표 순자산
            <input
              type="number"
              value={longTermDraft.target_net_worth}
              onChange={(e) => setLongTermDraft((s) => ({ ...s, target_net_worth: Number(e.target.value) }))}
              className="input mt-1"
            />
          </label>
          <label className="block text-xs text-brand-gray">
            기대 연수익률(ETF, %)
            <input
              type="number"
              step="0.1"
              value={toPercentInput(longTermDraft.expected_annual_return)}
              onChange={(e) =>
                setLongTermDraft((s) => ({ ...s, expected_annual_return: fromPercentInput(Number(e.target.value)) }))
              }
              className="input mt-1"
            />
          </label>
        </div>

        <button
          onClick={saveLongTerm}
          disabled={savingKey === "long-term"}
          className="mt-3 w-full rounded-xl bg-brand-black py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {savingKey === "long-term" ? "저장 중..." : "저장"}
        </button>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <StatTile label="순자산 (자산-부채)" value={formatWon(netWorth)} tone={netWorth >= 0 ? "good" : "bad"} />
          <StatTile label="총부채" value={formatWon(totalDebt)} />
          <StatTile label="월 총상환액" value={formatWon(monthlyDebtPayment)} />
          <StatTile label="가중평균금리" value={formatPercent(weightedRate, 2)} />
        </div>
      </Section>

      <Section title="퇴직 관련 예상액">
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs text-brand-gray">
            예상 퇴직금
            <input
              type="number"
              value={longTermDraft.expected_severance}
              onChange={(e) => setLongTermDraft((s) => ({ ...s, expected_severance: Number(e.target.value) }))}
              className="input mt-1"
            />
          </label>
          <label className="block text-xs text-brand-gray">
            예상 실업급여
            <input
              type="number"
              value={longTermDraft.expected_unemployment_benefit}
              onChange={(e) =>
                setLongTermDraft((s) => ({ ...s, expected_unemployment_benefit: Number(e.target.value) }))
              }
              className="input mt-1"
            />
          </label>
        </div>
        <button
          onClick={saveLongTerm}
          disabled={savingKey === "long-term"}
          className="mt-3 w-full rounded-xl bg-brand-black py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {savingKey === "long-term" ? "저장 중..." : "저장"}
        </button>
        <StatTile
          label="합계"
          value={formatWon(longTermDraft.expected_severance + longTermDraft.expected_unemployment_benefit)}
        />
      </Section>

      <Section title="대출 상세" description="상환 우선순위: 고금리 순">
        {sortedDebts.map((debt) => {
          const draft = debtDrafts[debt.id] ?? debt;
          const payoff = computeDebtPayoff(debt, today);
          return (
            <div key={debt.id} className="mb-3 rounded-xl border border-gray-100 p-3">
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) => updateDebtDraft(debt.id, { name: e.target.value })}
                  className="input flex-1 font-semibold"
                />
                <button onClick={() => deleteDebt(debt.id)} className="ml-2 text-xs text-red-600">
                  삭제
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="block text-xs text-brand-gray">
                  현재잔액
                  <input
                    type="number"
                    value={draft.balance}
                    onChange={(e) => updateDebtDraft(debt.id, { balance: Number(e.target.value) })}
                    className="input mt-1"
                  />
                </label>
                <label className="block text-xs text-brand-gray">
                  연이율(%)
                  <input
                    type="number"
                    step="0.01"
                    value={toPercentInput(draft.annual_rate)}
                    onChange={(e) => updateDebtDraft(debt.id, { annual_rate: fromPercentInput(Number(e.target.value)) })}
                    className="input mt-1"
                  />
                </label>
                <label className="block text-xs text-brand-gray">
                  월상환액
                  <input
                    type="number"
                    value={draft.monthly_payment}
                    onChange={(e) => updateDebtDraft(debt.id, { monthly_payment: Number(e.target.value) })}
                    className="input mt-1"
                  />
                </label>
                <label className="block text-xs text-brand-gray">
                  우선순위
                  <input
                    type="number"
                    value={draft.priority}
                    onChange={(e) => updateDebtDraft(debt.id, { priority: Number(e.target.value) })}
                    className="input mt-1"
                  />
                </label>
              </div>
              <div className="mt-2 text-xs text-brand-gray">
                예상 상환개월: {payoff.months ? Math.ceil(payoff.months) : "-"}개월
                {payoff.payoffDate && ` · 완료 예상: ${payoff.payoffDate.getFullYear()}-${String(payoff.payoffDate.getMonth() + 1).padStart(2, "0")}`}
              </div>
              <button
                onClick={() => saveDebt(debt.id)}
                disabled={savingKey === debt.id}
                className="mt-2 w-full rounded-lg bg-brand-black py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {savingKey === debt.id ? "저장 중..." : "저장"}
              </button>
            </div>
          );
        })}

        <div className="mt-3 rounded-xl border border-dashed border-gray-300 p-3">
          <div className="mb-2 text-xs font-semibold text-brand-gray">새 대출 추가</div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="대출명"
              value={newDebt.name}
              onChange={(e) => setNewDebt((d) => ({ ...d, name: e.target.value }))}
              className="input col-span-2"
            />
            <input
              type="number"
              placeholder="현재잔액"
              value={newDebt.balance || ""}
              onChange={(e) => setNewDebt((d) => ({ ...d, balance: Number(e.target.value) }))}
              className="input"
            />
            <input
              type="number"
              placeholder="연이율(%)"
              value={newDebt.annual_rate ? toPercentInput(newDebt.annual_rate) : ""}
              onChange={(e) => setNewDebt((d) => ({ ...d, annual_rate: fromPercentInput(Number(e.target.value)) }))}
              className="input"
            />
            <input
              type="number"
              placeholder="월상환액"
              value={newDebt.monthly_payment || ""}
              onChange={(e) => setNewDebt((d) => ({ ...d, monthly_payment: Number(e.target.value) }))}
              className="input"
            />
            <input
              type="number"
              placeholder="우선순위"
              value={newDebt.priority || ""}
              onChange={(e) => setNewDebt((d) => ({ ...d, priority: Number(e.target.value) }))}
              className="input"
            />
          </div>
          <button
            onClick={addDebt}
            disabled={savingKey === "new"}
            className="mt-2 w-full rounded-lg bg-brand-black py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            {savingKey === "new" ? "추가 중..." : "추가"}
          </button>
        </div>
      </Section>
    </div>
  );
}
