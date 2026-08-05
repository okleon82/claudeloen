"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Section, StatTile } from "@/components/Section";
import { formatPercent, formatWon } from "@/lib/calc";

type SeriesRow = {
  id: string;
  month: string;
  salary: number;
  other_income: number;
  loan_payment: number;
  other_fixed: number;
  extra_expense: number;
  memo: string | null;
  totalIncome: number;
  totalExpense: number;
  remaining: number;
  cumulativeAssets: number;
};

export default function DashboardClient({
  series,
  defaultMonth,
  netWorth,
  totalDebt,
  weightedRate,
  topPriorityDebtName,
  allocationStage,
}: {
  series: SeriesRow[];
  defaultMonth: string;
  netWorth: number;
  totalDebt: number;
  weightedRate: number;
  topPriorityDebtName: string;
  allocationStage: number;
}) {
  const months = series.map((s) => s.month);
  const initialMonth = months.includes(defaultMonth) ? defaultMonth : months[months.length - 1] ?? defaultMonth;
  const [month, setMonth] = useState(initialMonth);

  const row = useMemo(() => series.find((s) => s.month === month), [series, month]);

  const remainingTone = !row ? "default" : row.remaining >= 500000 ? "good" : row.remaining >= 0 ? "default" : "bad";
  const remainingLabel = !row ? "-" : row.remaining >= 500000 ? "우수" : row.remaining >= 0 ? "주의" : "적자";
  const debtRatio = row && row.totalIncome > 0 ? row.loan_payment / row.totalIncome : 0;

  return (
    <div>
      <Section title="이번 달 자금관리" description="지금 필요한 숫자만 확인하세요.">
        <label className="mb-3 block text-xs text-brand-gray">
          조회 월
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input mt-1"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        {row ? (
          <>
            <div className="grid grid-cols-3 gap-2">
              <StatTile label="총수입" value={formatWon(row.totalIncome)} />
              <StatTile label="총지출" value={formatWon(row.totalExpense)} />
              <StatTile
                label="남는 돈"
                value={formatWon(row.remaining)}
                tone={row.remaining >= 0 ? "good" : "bad"}
              />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <StatTile label="대출상환" value={formatWon(row.loan_payment)} />
              <StatTile label="기타고정비" value={formatWon(row.other_fixed)} />
              <StatTile label="추가지출" value={formatWon(row.extra_expense)} />
            </div>

            <div className="mt-4 rounded-xl border border-gray-100 p-3 text-sm">
              <div className="mb-1.5 flex justify-between">
                <span className="text-brand-gray">남는 돈 상태</span>
                <span className={remainingTone === "bad" ? "font-semibold text-red-600" : "font-semibold text-emerald-600"}>
                  {remainingLabel}
                </span>
              </div>
              <div className="mb-1.5 flex justify-between">
                <span className="text-brand-gray">부채상환 · 수입 대비 비율</span>
                <span>{formatPercent(debtRatio)}</span>
              </div>
              <div className="mb-1.5 flex justify-between">
                <span className="text-brand-gray">1순위 고금리 부채</span>
                <span>{topPriorityDebtName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-gray">누적 보유자산</span>
                <span>{formatWon(row.cumulativeAssets)}</span>
              </div>
            </div>

            {row.remaining < 500000 && (
              <p className="mt-3 text-xs text-brand-gray">
                남는 돈이 {formatWon(row.remaining)}입니다. 500,000원 미만이면 비상금 또는 부채상환에 우선
                배분하세요.
              </p>
            )}
            {row.memo && <p className="mt-2 text-xs text-brand-gray">메모: {row.memo}</p>}
          </>
        ) : (
          <p className="text-sm text-brand-gray">등록된 월별기록이 없습니다. &apos;월별기록&apos; 탭에서 추가하세요.</p>
        )}
      </Section>

      <Section title="자산 · 부채 요약">
        <div className="grid grid-cols-2 gap-2">
          <StatTile label="순자산" value={formatWon(netWorth)} tone={netWorth >= 0 ? "good" : "bad"} />
          <StatTile label="총부채" value={formatWon(totalDebt)} />
          <StatTile label="가중평균금리" value={formatPercent(weightedRate, 2)} />
          <StatTile label="여유자금 적용 단계" value={`${allocationStage}단계`} />
        </div>
        <Link href="/debts" className="mt-3 inline-block text-sm font-medium text-brand-black underline">
          장기플랜 자세히 보기 →
        </Link>
      </Section>

      <div className="grid grid-cols-2 gap-3">
        <Link href="/goal" className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-bold">자금확보플랜</div>
          <div className="mt-1 text-xs text-brand-gray">호주 워킹홀리데이 준비 비용</div>
        </Link>
        <Link href="/allocation" className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-bold">여유자금 배분</div>
          <div className="mt-1 text-xs text-brand-gray">부채상환 / ETF / 개별주 / CMA</div>
        </Link>
        <Link href="/etf" className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-bold">ETF 증식자산</div>
          <div className="mt-1 text-xs text-brand-gray">장기 투자 시뮬레이션</div>
        </Link>
        <Link href="/monthly" className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-bold">월별기록</div>
          <div className="mt-1 text-xs text-brand-gray">월별 자금 계획 전체 보기</div>
        </Link>
      </div>
    </div>
  );
}
