import {
  AllocationSettings,
  Debt,
  EtfSettings,
  GoalPlanItem,
  LongTermSettings,
  MonthlyRecord,
  StockHolding,
} from "./types";

// ── 공통 유틸 ─────────────────────────────────────────

export function formatMonth(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function addMonths(month: string, n: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return formatMonth(d);
}

/** 'YYYY-MM' 두 값 사이의 개월수 (b - a). */
export function monthsBetween(a: string, b: string): number {
  const [ay, am] = a.split("-").map(Number);
  const [by, bm] = b.split("-").map(Number);
  return (by - ay) * 12 + (bm - am);
}

export function formatWon(n: number): string {
  return `${Math.round(n).toLocaleString("ko-KR")}원`;
}

export function formatPercent(n: number, digits = 1): string {
  return `${(n * 100).toFixed(digits)}%`;
}

/** 소수(0.035)를 입력창에 표시할 퍼센트 값(3.5)으로 변환. 부동소수점 오차를 제거한다. */
export function toPercentInput(fraction: number, digits = 4): number {
  return Number((fraction * 100).toFixed(digits));
}

/** 입력창의 퍼센트 값(3.5)을 저장용 소수(0.035)로 변환. */
export function fromPercentInput(percent: number, digits = 6): number {
  return Number((percent / 100).toFixed(digits));
}

// ── 이번 달 자금관리 ───────────────────────────────────

export function computeMonthTotals(r: {
  salary: number;
  other_income: number;
  loan_payment: number;
  other_fixed: number;
  extra_expense: number;
}) {
  const totalIncome = r.salary + r.other_income;
  const totalExpense = r.loan_payment + r.other_fixed + r.extra_expense;
  const remaining = totalIncome - totalExpense;
  return { totalIncome, totalExpense, remaining };
}

/** 월별기록을 월 순서로 정렬하고 누적 보유자산을 계산한다. */
export function computeMonthlySeries(records: MonthlyRecord[], startingCumulative: number) {
  const sorted = [...records].sort((a, b) => a.month.localeCompare(b.month));
  let cumulative = startingCumulative;
  return sorted.map((r) => {
    const totals = computeMonthTotals(r);
    cumulative += totals.remaining;
    return { ...r, ...totals, cumulativeAssets: cumulative };
  });
}

// ── 장기플랜 (자산 · 부채) ─────────────────────────────

export function computeTotalDebt(debts: Debt[]): number {
  return debts.reduce((sum, d) => sum + d.balance, 0);
}

export function computeNetWorth(longTerm: LongTermSettings, debts: Debt[]): number {
  return longTerm.cash_assets + longTerm.investment_assets - computeTotalDebt(debts);
}

export function computeMonthlyDebtPayment(debts: Debt[]): number {
  return debts.reduce((sum, d) => sum + d.monthly_payment, 0);
}

export function computeWeightedAvgRate(debts: Debt[]): number {
  const total = computeTotalDebt(debts);
  if (total === 0) return 0;
  return debts.reduce((sum, d) => sum + d.annual_rate * d.balance, 0) / total;
}

/** Excel NPER(rate, pmt, pv) 재현. rate: 월이율, pmt: 월상환액(양수), pv: 대출잔액. */
export function nper(monthlyRate: number, payment: number, balance: number): number | null {
  if (payment <= 0 || balance <= 0) return null;
  if (monthlyRate === 0) return balance / payment;
  const denom = -payment + balance * monthlyRate;
  const numer = -payment;
  if (denom >= 0 || numer / denom <= 0) return null; // 원금이 절대 안 줄어드는 경우
  return Math.log(numer / denom) / Math.log(1 + monthlyRate);
}

export function computeDebtPayoff(d: Debt, today: Date) {
  const months = nper(d.annual_rate / 12, d.monthly_payment, d.balance);
  if (months === null) return { months: null, payoffDate: null as Date | null };
  const payoffDate = new Date(today.getFullYear(), today.getMonth() + Math.ceil(months), today.getDate());
  return { months, payoffDate };
}

export function sortDebtsByPriority(debts: Debt[]): Debt[] {
  return [...debts].sort((a, b) => a.priority - b.priority);
}

// ── 자금확보플랜 ───────────────────────────────────────

export function computeGoalMonthsLeft(targetMonth: string | null, today: Date): number | null {
  if (!targetMonth) return null;
  return monthsBetween(formatMonth(today), targetMonth);
}

export function groupGoalItemsByCategory(items: GoalPlanItem[]) {
  const groups = new Map<string, GoalPlanItem[]>();
  for (const item of items) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }
  return Array.from(groups.entries()).map(([category, categoryItems]) => ({
    category,
    items: categoryItems,
    subtotal: categoryItems.reduce((sum, i) => sum + i.amount, 0),
  }));
}

export function computeGoalTotal(items: GoalPlanItem[]): number {
  return items.reduce((sum, i) => sum + i.amount, 0);
}

// ── 여유자금 배분 ──────────────────────────────────────

export type AllocationRow = {
  key: "debt" | "etf" | "stock" | "cma";
  label: string;
  stage1Pct: number;
  stage1Amount: number;
  stage2Pct: number;
  stage2Amount: number;
};

export function computeAllocationTable(a: AllocationSettings): AllocationRow[] {
  const spare = a.monthly_spare_cash;
  return [
    { key: "debt", label: "빚상환 (다올·SBI)", stage1Pct: a.stage1_debt_pct, stage2Pct: a.stage2_debt_pct },
    { key: "etf", label: "ETF (VOO+SCHD)", stage1Pct: a.stage1_etf_pct, stage2Pct: a.stage2_etf_pct },
    { key: "stock", label: "개별주", stage1Pct: a.stage1_stock_pct, stage2Pct: a.stage2_stock_pct },
    { key: "cma", label: "CMA", stage1Pct: a.stage1_cma_pct, stage2Pct: a.stage2_cma_pct },
  ].map((row) => ({
    ...row,
    stage1Amount: row.stage1Pct * spare,
    stage2Amount: row.stage2Pct * spare,
  })) as AllocationRow[];
}

export function computeEmergencyFundTarget(a: AllocationSettings, monthlyDebtPayment: number) {
  const monthlyEssential = a.monthly_essential_expense || 250000 + monthlyDebtPayment;
  const target = a.emergency_fund_months * monthlyEssential;
  return { monthlyEssential, target };
}

export function currentStageAmount(row: AllocationRow, stage: 1 | 2): number {
  return stage === 1 ? row.stage1Amount : row.stage2Amount;
}

/** Excel FV(rate, 1, -pmt, -pv) 재현: pv를 rate만큼 불린 뒤 pmt를 더한다. */
export function fvStep(monthlyRate: number, pv: number, contribution: number): number {
  return pv * (1 + monthlyRate) + contribution;
}

export function computeCmaGrowth(monthlyContribution: number, annualRate: number, months: number) {
  const monthlyRate = annualRate / 12;
  const series: { month: number; balance: number }[] = [];
  let balance = 0;
  for (let m = 1; m <= months; m++) {
    balance = fvStep(monthlyRate, balance, monthlyContribution);
    series.push({ month: m, balance });
  }
  return series;
}

// ── ETF 증식자산 ───────────────────────────────────────

/** Excel FV(rate, nper, -pmt, -pv) 재현 (정기납입, 기말 지급 기준). */
export function fv(rate: number, periods: number, payment: number, presentValue: number): number {
  if (rate === 0) return presentValue + payment * periods;
  const growth = Math.pow(1 + rate, periods);
  return presentValue * growth + payment * ((growth - 1) / rate);
}

export type EtfYearRow = {
  year: number;
  calendarYear: number;
  monthlyInvestment: number;
  annualPrincipal: number;
  cumulativePrincipal: number;
  conservativeValue: number;
  baseValue: number;
  aggressiveValue: number;
};

export function computeEtfYearlyScenarios(
  etf: EtfSettings,
  stage2MonthlyInvest: number,
  stage2StartMonth: number | null,
  startingInvestmentAssets: number,
  startYear: number,
  years = 30,
): EtfYearRow[] {
  const rows: EtfYearRow[] = [];
  let cumulativePrincipal = 0;
  let conservative = startingInvestmentAssets;
  let base = startingInvestmentAssets;
  let aggressive = startingInvestmentAssets;

  for (let year = 1; year <= years; year++) {
    const monthlyInvestment =
      stage2StartMonth !== null && year * 12 <= stage2StartMonth
        ? etf.stage1_monthly_invest
        : stage2MonthlyInvest;
    const annualPrincipal = monthlyInvestment * 12;
    cumulativePrincipal += annualPrincipal;

    conservative = fv(etf.scenario_conservative_rate / 12, 12, monthlyInvestment, conservative);
    base = fv(etf.scenario_base_rate / 12, 12, monthlyInvestment, base);
    aggressive = fv(etf.scenario_aggressive_rate / 12, 12, monthlyInvestment, aggressive);

    rows.push({
      year,
      calendarYear: startYear + year - 1,
      monthlyInvestment,
      annualPrincipal,
      cumulativePrincipal,
      conservativeValue: conservative,
      baseValue: base,
      aggressiveValue: aggressive,
    });
  }
  return rows;
}

export function computeGoalReachYear(
  rows: EtfYearRow[],
  targetNetWorth: number,
  scenario: "conservativeValue" | "baseValue" | "aggressiveValue",
  startYear: number,
) {
  const idx = rows.findIndex((r) => r[scenario] >= targetNetWorth);
  if (idx === -1) return { reached: false as const };
  return { reached: true as const, year: idx + 1, calendarYear: startYear + idx };
}

export function computeEtfAllocationSummary(etf: EtfSettings) {
  const items = [
    { key: "voo", label: "VOO", pct: etf.voo_pct, yield: etf.voo_dividend_yield },
    { key: "schd", label: "SCHD", pct: etf.schd_pct, yield: etf.schd_dividend_yield },
    { key: "stock", label: "미국 우량주(개별)", pct: etf.stock_pct, yield: etf.stock_dividend_yield },
  ];
  const totalPct = items.reduce((sum, i) => sum + i.pct, 0);
  const blendedYield = items.reduce((sum, i) => sum + i.pct * i.yield, 0);
  return { items, totalPct, blendedYield };
}

// ── 개별주 트래킹 ──────────────────────────────────────

export function computeStockRow(s: StockHolding) {
  const gain = s.current_value - s.buy_amount;
  const returnRate = s.buy_amount > 0 ? gain / s.buy_amount : null;
  return { gain, returnRate };
}

export function computeStockTotals(stocks: StockHolding[]) {
  const totalBuy = stocks.reduce((sum, s) => sum + s.buy_amount, 0);
  const totalCurrent = stocks.reduce((sum, s) => sum + s.current_value, 0);
  const totalGain = totalCurrent - totalBuy;
  const totalReturnRate = totalBuy > 0 ? totalGain / totalBuy : null;
  return { totalBuy, totalCurrent, totalGain, totalReturnRate };
}
