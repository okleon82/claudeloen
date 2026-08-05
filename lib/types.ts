// 월 문자열은 'YYYY-MM' 형식으로 통일한다.

export type MonthlyRecord = {
  id: string;
  month: string; // '2026-08'
  salary: number;
  other_income: number;
  loan_payment: number;
  other_fixed: number;
  extra_expense: number;
  memo: string | null;
};

export type Debt = {
  id: string;
  name: string;
  balance: number;
  annual_rate: number; // 0.1366 = 13.66%
  monthly_payment: number;
  priority: number;
};

export type LongTermSettings = {
  cash_assets: number;
  investment_assets: number;
  target_net_worth: number;
  expected_annual_return: number; // ETF 기본 시나리오와 동일 값을 공유
  expected_severance: number;
  expected_unemployment_benefit: number;
  starting_cumulative_assets: number; // 월별기록 첫 달 이전까지의 누적 보유자산
};

export type GoalPlanSettings = {
  title: string;
  target_month: string | null; // 'YYYY-MM'
  note: string | null;
};

export type GoalPlanItem = {
  id: string;
  category: string;
  item: string;
  expected_month: string | null;
  amount: number;
  note: string | null;
  sort_order: number;
};

export type AllocationSettings = {
  monthly_spare_cash: number;
  cma_rate: number;
  emergency_fund_months: number;
  monthly_essential_expense: number;
  current_stage: 1 | 2;
  stage1_debt_pct: number;
  stage1_etf_pct: number;
  stage1_stock_pct: number;
  stage1_cma_pct: number;
  stage2_debt_pct: number;
  stage2_etf_pct: number;
  stage2_stock_pct: number;
  stage2_cma_pct: number;
};

export type EtfSettings = {
  stage1_monthly_invest: number;
  scenario_conservative_rate: number;
  scenario_base_rate: number;
  scenario_aggressive_rate: number;
  voo_pct: number;
  voo_dividend_yield: number;
  schd_pct: number;
  schd_dividend_yield: number;
  stock_pct: number;
  stock_dividend_yield: number;
};

export type StockHolding = {
  id: string;
  name: string;
  ticker: string | null;
  buy_amount: number;
  buy_date: string | null;
  current_value: number;
  note: string | null;
  sort_order: number;
};

export type FinanceSnapshot = {
  monthlyRecords: MonthlyRecord[];
  debts: Debt[];
  longTerm: LongTermSettings;
  goalSettings: GoalPlanSettings;
  goalItems: GoalPlanItem[];
  allocation: AllocationSettings;
  etf: EtfSettings;
  stocks: StockHolding[];
};
