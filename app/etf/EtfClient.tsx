"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Section, StatTile } from "@/components/Section";
import {
  computeEtfAllocationSummary,
  computeEtfYearlyScenarios,
  computeGoalReachYear,
  computeStockRow,
  computeStockTotals,
  formatPercent,
  formatWon,
  fromPercentInput,
  toPercentInput,
} from "@/lib/calc";
import { EtfSettings, StockHolding } from "@/lib/types";

type StockDraft = Omit<StockHolding, "id"> & { id?: string };

const EMPTY_STOCK: StockDraft = {
  name: "",
  ticker: "",
  buy_amount: 0,
  buy_date: null,
  current_value: 0,
  note: "",
  sort_order: 0,
};

export default function EtfClient({
  initialEtf,
  initialStocks,
  stage2MonthlyInvest,
  stage2StartMonth,
  startingInvestmentAssets,
  targetNetWorth,
  startYear,
  payoffLabel,
}: {
  initialEtf: EtfSettings;
  initialStocks: StockHolding[];
  stage2MonthlyInvest: number;
  stage2StartMonth: number | null;
  startingInvestmentAssets: number;
  targetNetWorth: number;
  startYear: number;
  payoffLabel: string;
}) {
  const router = useRouter();
  const [etf, setEtf] = useState(initialEtf);
  const [draft, setDraft] = useState(initialEtf);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const [stocks, setStocks] = useState<StockHolding[]>(initialStocks);
  const [stockDrafts, setStockDrafts] = useState<Record<string, StockDraft>>(
    Object.fromEntries(initialStocks.map((s) => [s.id, { ...s }]))
  );
  const [newStock, setNewStock] = useState<StockDraft>(EMPTY_STOCK);

  const rows = useMemo(
    () =>
      computeEtfYearlyScenarios(
        etf,
        stage2MonthlyInvest,
        stage2StartMonth,
        startingInvestmentAssets,
        startYear,
        30
      ),
    [etf, stage2MonthlyInvest, stage2StartMonth, startingInvestmentAssets, startYear]
  );

  const reach = {
    conservative: computeGoalReachYear(rows, targetNetWorth, "conservativeValue", startYear),
    base: computeGoalReachYear(rows, targetNetWorth, "baseValue", startYear),
    aggressive: computeGoalReachYear(rows, targetNetWorth, "aggressiveValue", startYear),
  };

  const allocationSummary = useMemo(() => computeEtfAllocationSummary(etf), [etf]);
  const stockTotals = useMemo(() => computeStockTotals(stocks), [stocks]);

  async function saveEtf() {
    setSavingKey("etf");
    try {
      const res = await fetch("/api/etf-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (data.settings) {
        setEtf(data.settings);
        setDraft(data.settings);
      }
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  function updateStockDraft(id: string, patch: Partial<StockDraft>) {
    setStockDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function saveStock(id: string) {
    setSavingKey(id);
    try {
      const res = await fetch("/api/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stockDrafts[id]),
      });
      const data = await res.json();
      if (data.stock) setStocks((prev) => prev.map((s) => (s.id === id ? data.stock : s)));
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  async function deleteStock(id: string) {
    if (!confirm("이 종목을 삭제할까요?")) return;
    setSavingKey(id);
    try {
      await fetch(`/api/stocks/${id}`, { method: "DELETE" });
      setStocks((prev) => prev.filter((s) => s.id !== id));
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  async function addStock() {
    if (!newStock.name) return;
    setSavingKey("new-stock");
    try {
      const res = await fetch("/api/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newStock, sort_order: stocks.length + 1 }),
      });
      const data = await res.json();
      if (data.stock) {
        setStocks((prev) => [...prev, data.stock]);
        setStockDrafts((prev) => ({ ...prev, [data.stock.id]: { ...data.stock } }));
        setNewStock(EMPTY_STOCK);
      }
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  return (
    <div>
      <Section
        title="투자 개시 전략"
        description={`고금리 부채(${payoffLabel}) 상환 완료 시점을 기준으로 투자금액이 자동 전환됩니다.`}
      >
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs text-brand-gray">
            1단계(상환 중) 월 투자금액
            <input
              type="number"
              value={draft.stage1_monthly_invest}
              onChange={(e) => setDraft((d) => ({ ...d, stage1_monthly_invest: Number(e.target.value) }))}
              className="input mt-1"
            />
          </label>
          <div className="block text-xs text-brand-gray">
            2단계(상환 완료 후) 월 투자금액
            <div className="input mt-1 flex items-center bg-brand-light text-brand-black">
              {formatWon(stage2MonthlyInvest)}
              <span className="ml-1 text-[10px] text-brand-gray">← 여유자금 배분 연동</span>
            </div>
          </div>
        </div>
        <button
          onClick={saveEtf}
          disabled={savingKey === "etf"}
          className="mt-3 w-full rounded-xl bg-brand-black py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {savingKey === "etf" ? "저장 중..." : "저장"}
        </button>
      </Section>

      <Section title="ETF 배분 및 예상 배당">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-brand-gray">
                <th className="py-1">ETF</th>
                <th className="py-1 text-right">배분비율(%)</th>
                <th className="py-1 text-right">연 배당수익률(%)</th>
              </tr>
            </thead>
            <tbody>
              {(["voo", "schd", "stock"] as const).map((key) => (
                <tr key={key} className="border-t border-gray-100">
                  <td className="py-1.5">{key === "voo" ? "VOO" : key === "schd" ? "SCHD" : "미국 우량주(개별)"}</td>
                  <td className="py-1.5 text-right">
                    <input
                      type="number"
                      step="0.01"
                      value={toPercentInput(draft[`${key}_pct` as keyof EtfSettings] as number)}
                      onChange={(e) => setDraft((d) => ({ ...d, [`${key}_pct`]: fromPercentInput(Number(e.target.value)) }))}
                      className="input w-20 px-1 py-1 text-right"
                    />
                  </td>
                  <td className="py-1.5 text-right">
                    <input
                      type="number"
                      step="0.1"
                      value={toPercentInput(draft[`${key}_dividend_yield` as keyof EtfSettings] as number)}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, [`${key}_dividend_yield`]: fromPercentInput(Number(e.target.value)) }))
                      }
                      className="input w-20 px-1 py-1 text-right"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={saveEtf}
          disabled={savingKey === "etf"}
          className="mt-3 w-full rounded-xl bg-brand-black py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {savingKey === "etf" ? "저장 중..." : "저장"}
        </button>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <StatTile label="배분비율 합계" value={formatPercent(allocationSummary.totalPct, 0)} />
          <StatTile label="가중평균 배당수익률" value={formatPercent(allocationSummary.blendedYield, 2)} />
        </div>
      </Section>

      <Section title="시나리오별 장기 성장 시뮬레이션" description="연 단위, 30년. 세전 기준이며 투자자문이 아닙니다.">
        <div className="grid grid-cols-3 gap-2">
          <label className="block text-xs text-brand-gray">
            보수적(%)
            <input
              type="number"
              step="0.1"
              value={toPercentInput(draft.scenario_conservative_rate)}
              onChange={(e) => setDraft((d) => ({ ...d, scenario_conservative_rate: fromPercentInput(Number(e.target.value)) }))}
              className="input mt-1"
            />
          </label>
          <label className="block text-xs text-brand-gray">
            기본(%)
            <input
              type="number"
              step="0.1"
              value={toPercentInput(draft.scenario_base_rate)}
              onChange={(e) => setDraft((d) => ({ ...d, scenario_base_rate: fromPercentInput(Number(e.target.value)) }))}
              className="input mt-1"
            />
          </label>
          <label className="block text-xs text-brand-gray">
            공격적(%)
            <input
              type="number"
              step="0.1"
              value={toPercentInput(draft.scenario_aggressive_rate)}
              onChange={(e) => setDraft((d) => ({ ...d, scenario_aggressive_rate: fromPercentInput(Number(e.target.value)) }))}
              className="input mt-1"
            />
          </label>
        </div>
        <button
          onClick={saveEtf}
          disabled={savingKey === "etf"}
          className="mt-3 w-full rounded-xl bg-brand-black py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {savingKey === "etf" ? "저장 중..." : "저장"}
        </button>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full whitespace-nowrap text-sm">
            <thead>
              <tr className="text-left text-xs text-brand-gray">
                <th className="py-1 pr-2">연도</th>
                <th className="py-1 pr-2 text-right">월투자금</th>
                <th className="py-1 pr-2 text-right">누적투자원금</th>
                <th className="py-1 pr-2 text-right">보수적</th>
                <th className="py-1 pr-2 text-right">기본</th>
                <th className="py-1 text-right">공격적</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.year} className="border-t border-gray-100">
                  <td className="py-1.5 pr-2">{row.calendarYear}</td>
                  <td className="py-1.5 pr-2 text-right">{formatWon(row.monthlyInvestment)}</td>
                  <td className="py-1.5 pr-2 text-right">{formatWon(row.cumulativePrincipal)}</td>
                  <td className="py-1.5 pr-2 text-right">{formatWon(row.conservativeValue)}</td>
                  <td className="py-1.5 pr-2 text-right font-medium">{formatWon(row.baseValue)}</td>
                  <td className="py-1.5 text-right">{formatWon(row.aggressiveValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="목표 순자산 도달 예상 시점" description={`목표: ${formatWon(targetNetWorth)}`}>
        <div className="grid grid-cols-3 gap-2">
          <StatTile
            label="보수적"
            value={reach.conservative.reached ? `${reach.conservative.calendarYear}년` : "30년 내 미도달"}
          />
          <StatTile label="기본" value={reach.base.reached ? `${reach.base.calendarYear}년` : "30년 내 미도달"} />
          <StatTile
            label="공격적"
            value={reach.aggressive.reached ? `${reach.aggressive.calendarYear}년` : "30년 내 미도달"}
          />
        </div>
      </Section>

      <Section title="개별주 투자 현황" description="매수금액·현재 평가금액을 직접 입력하세요.">
        {stocks.map((stock) => {
          const draftStock = stockDrafts[stock.id] ?? stock;
          const computed = computeStockRow(draftStock as StockHolding);
          return (
            <div key={stock.id} className="mb-3 rounded-xl border border-gray-100 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={draftStock.name}
                  onChange={(e) => updateStockDraft(stock.id, { name: e.target.value })}
                  className="input flex-1 font-semibold"
                />
                <button onClick={() => deleteStock(stock.id)} className="text-xs text-red-600">
                  삭제
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="티커"
                  value={draftStock.ticker ?? ""}
                  onChange={(e) => updateStockDraft(stock.id, { ticker: e.target.value })}
                  className="input"
                />
                <input
                  type="date"
                  value={draftStock.buy_date ?? ""}
                  onChange={(e) => updateStockDraft(stock.id, { buy_date: e.target.value })}
                  className="input"
                />
                <label className="block text-xs text-brand-gray">
                  매수금액(원)
                  <input
                    type="number"
                    value={draftStock.buy_amount}
                    onChange={(e) => updateStockDraft(stock.id, { buy_amount: Number(e.target.value) })}
                    className="input mt-1"
                  />
                </label>
                <label className="block text-xs text-brand-gray">
                  현재 평가금액(원)
                  <input
                    type="number"
                    value={draftStock.current_value}
                    onChange={(e) => updateStockDraft(stock.id, { current_value: Number(e.target.value) })}
                    className="input mt-1"
                  />
                </label>
              </div>
              <input
                type="text"
                placeholder="투자 근거 · 메모"
                value={draftStock.note ?? ""}
                onChange={(e) => updateStockDraft(stock.id, { note: e.target.value })}
                className="input mt-2"
              />
              <div className="mt-2 text-xs text-brand-gray">
                평가손익 {formatWon(computed.gain)}
                {computed.returnRate !== null && ` · 수익률 ${formatPercent(computed.returnRate)}`}
              </div>
              <button
                onClick={() => saveStock(stock.id)}
                disabled={savingKey === stock.id}
                className="mt-2 w-full rounded-lg bg-brand-black py-2 text-xs font-semibold text-white disabled:opacity-50"
              >
                {savingKey === stock.id ? "저장 중..." : "저장"}
              </button>
            </div>
          );
        })}

        <div className="mb-3 rounded-xl border border-dashed border-gray-300 p-3">
          <div className="mb-2 text-xs font-semibold text-brand-gray">새 종목 추가</div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="종목명"
              value={newStock.name}
              onChange={(e) => setNewStock((s) => ({ ...s, name: e.target.value }))}
              className="input"
            />
            <input
              type="text"
              placeholder="티커"
              value={newStock.ticker ?? ""}
              onChange={(e) => setNewStock((s) => ({ ...s, ticker: e.target.value }))}
              className="input"
            />
          </div>
          <button
            onClick={addStock}
            disabled={savingKey === "new-stock"}
            className="mt-2 w-full rounded-lg bg-brand-black py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            {savingKey === "new-stock" ? "추가 중..." : "추가"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-xl bg-brand-light px-3 py-2.5 text-sm">
          <StatTile label="총 매수금액" value={formatWon(stockTotals.totalBuy)} />
          <StatTile label="총 평가금액" value={formatWon(stockTotals.totalCurrent)} />
          <StatTile label="총 평가손익" value={formatWon(stockTotals.totalGain)} tone={stockTotals.totalGain >= 0 ? "good" : "bad"} />
          <StatTile
            label="총 수익률"
            value={stockTotals.totalReturnRate !== null ? formatPercent(stockTotals.totalReturnRate) : "-"}
          />
        </div>
      </Section>
    </div>
  );
}
