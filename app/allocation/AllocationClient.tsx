"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Section, StatTile } from "@/components/Section";
import {
  computeAllocationTable,
  computeCmaGrowth,
  computeEmergencyFundTarget,
  currentStageAmount,
  formatPercent,
  formatWon,
  fromPercentInput,
  toPercentInput,
} from "@/lib/calc";
import { AllocationSettings } from "@/lib/types";

export default function AllocationClient({
  initialAllocation,
  cashAssets,
  monthlyDebtPayment,
  weightedDebtRate,
  etfBaseRate,
}: {
  initialAllocation: AllocationSettings;
  cashAssets: number;
  monthlyDebtPayment: number;
  weightedDebtRate: number;
  etfBaseRate: number;
}) {
  const router = useRouter();
  const [allocation, setAllocation] = useState(initialAllocation);
  const [draft, setDraft] = useState(initialAllocation);
  const [saving, setSaving] = useState(false);

  const emergency = useMemo(
    () => computeEmergencyFundTarget(allocation, monthlyDebtPayment),
    [allocation, monthlyDebtPayment]
  );
  const shortfall = Math.max(emergency.target - cashAssets, 0);
  const table = useMemo(() => computeAllocationTable(allocation), [allocation]);
  const cmaRow = table.find((r) => r.key === "cma")!;
  const cmaAmount = currentStageAmount(cmaRow, allocation.current_stage);
  const cmaGrowth = useMemo(
    () => computeCmaGrowth(cmaAmount, allocation.cma_rate, 12),
    [cmaAmount, allocation.cma_rate]
  );

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/allocation", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (data.settings) {
        setAllocation(data.settings);
        setDraft(data.settings);
      }
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <Section title="여유자금 배분" description="생활비는 이 배분과 별개로 고정지출에서 처리됩니다.">
        <label className="block text-xs text-brand-gray">
          월 여유자금 (고정지출 이후)
          <input
            type="number"
            value={draft.monthly_spare_cash}
            onChange={(e) => setDraft((d) => ({ ...d, monthly_spare_cash: Number(e.target.value) }))}
            className="input mt-1"
          />
        </label>
        <label className="mt-2 block text-xs text-brand-gray">
          현재 적용 단계
          <select
            value={draft.current_stage}
            onChange={(e) => setDraft((d) => ({ ...d, current_stage: Number(e.target.value) as 1 | 2 }))}
            className="input mt-1"
          >
            <option value={1}>1단계 (비상금 확보 중)</option>
            <option value={2}>2단계 (투자 비중 확대)</option>
          </select>
        </label>
        <button
          onClick={save}
          disabled={saving}
          className="mt-3 w-full rounded-xl bg-brand-black py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </Section>

      <Section title="기대수익률 비교" description="부채상환은 '확정' 수익, 투자는 '기대' 수익입니다.">
        <div className="grid grid-cols-3 gap-2">
          <StatTile label="부채상환 (확정)" value={formatPercent(weightedDebtRate, 2)} />
          <StatTile label="ETF 기본 시나리오 (기대)" value={formatPercent(etfBaseRate, 1)} />
          <StatTile label="CMA (확정에 가까움)" value={formatPercent(allocation.cma_rate, 1)} />
        </div>
      </Section>

      <Section title="비상금(CMA) 현황 체크">
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs text-brand-gray">
            목표 개월수
            <input
              type="number"
              value={draft.emergency_fund_months}
              onChange={(e) => setDraft((d) => ({ ...d, emergency_fund_months: Number(e.target.value) }))}
              className="input mt-1"
            />
          </label>
          <label className="block text-xs text-brand-gray">
            월 필수지출 (직접 입력)
            <input
              type="number"
              value={draft.monthly_essential_expense}
              onChange={(e) => setDraft((d) => ({ ...d, monthly_essential_expense: Number(e.target.value) }))}
              className="input mt-1"
            />
          </label>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="mt-3 w-full rounded-xl bg-brand-black py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <StatTile label="현재 현금성 자산" value={formatWon(cashAssets)} />
          <StatTile label="비상금 목표액" value={formatWon(emergency.target)} />
          <StatTile label="현재 부족액" value={formatWon(shortfall)} tone={shortfall > 0 ? "bad" : "good"} />
        </div>
      </Section>

      <Section title="단계별 배분 계획" description="비율은 자유롭게 조정할 수 있습니다.">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-brand-gray">
                <th className="py-1">구분</th>
                <th className="py-1 text-right">1단계 비율</th>
                <th className="py-1 text-right">1단계 금액</th>
                <th className="py-1 text-right">2단계 비율</th>
                <th className="py-1 text-right">2단계 금액</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row) => (
                <tr key={row.key} className="border-t border-gray-100">
                  <td className="py-1.5">{row.label}</td>
                  <td className="py-1.5 text-right">
                    <input
                      type="number"
                      step="0.01"
                      value={toPercentInput(draft[`stage1_${row.key}_pct` as keyof AllocationSettings] as number)}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, [`stage1_${row.key}_pct`]: fromPercentInput(Number(e.target.value)) }))
                      }
                      className="input w-20 px-1 py-1 text-right"
                    />
                  </td>
                  <td className="py-1.5 text-right">{formatWon(row.stage1Amount)}</td>
                  <td className="py-1.5 text-right">
                    <input
                      type="number"
                      step="0.01"
                      value={toPercentInput(draft[`stage2_${row.key}_pct` as keyof AllocationSettings] as number)}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, [`stage2_${row.key}_pct`]: fromPercentInput(Number(e.target.value)) }))
                      }
                      className="input w-20 px-1 py-1 text-right"
                    />
                  </td>
                  <td className="py-1.5 text-right">{formatWon(row.stage2Amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="mt-3 w-full rounded-xl bg-brand-black py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? "저장 중..." : "비율 저장"}
        </button>
      </Section>

      <Section
        title="CMA 잔액 성장 (12개월)"
        description={`매월 ${formatWon(cmaAmount)}씩 적용 배분액을 CMA에 계속 넣는다고 가정 (세전)`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-brand-gray">
                <th className="py-1">개월</th>
                <th className="py-1 text-right">CMA 잔액</th>
              </tr>
            </thead>
            <tbody>
              {cmaGrowth.map((row) => (
                <tr key={row.month} className="border-t border-gray-100">
                  <td className="py-1.5">{row.month}개월</td>
                  <td className="py-1.5 text-right">{formatWon(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
