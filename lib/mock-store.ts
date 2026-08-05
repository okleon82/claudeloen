import "server-only";
import {
  AllocationSettings,
  Debt,
  EtfSettings,
  GoalPlanItem,
  GoalPlanSettings,
  LongTermSettings,
  MonthlyRecord,
  StockHolding,
} from "./types";

/**
 * Supabase 환경변수가 없을 때 사용하는 메모리 기반 데모 데이터.
 * 업로드된 '자금관리_수정본_ETF증식자산' 워크북의 값을 초기 데이터로 사용한다.
 * 서버 프로세스가 재시작되면 초기화되므로, 실제 운영에는 반드시 Supabase를 연결해야 한다.
 */

type MockData = {
  monthlyRecords: MonthlyRecord[];
  debts: Debt[];
  longTerm: LongTermSettings;
  goalSettings: GoalPlanSettings;
  goalItems: GoalPlanItem[];
  allocation: AllocationSettings;
  etf: EtfSettings;
  stocks: StockHolding[];
  seq: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __financeMockData: MockData | undefined;
}

function nextId(prefix: string): string {
  const data = getData();
  data.seq += 1;
  return `${prefix}-${data.seq}`;
}

function createInitialData(): MockData {
  return {
    monthlyRecords: [
      { id: "m-1", month: "2026-08", salary: 2855860, other_income: 380000, loan_payment: 828533, other_fixed: 1007890, extra_expense: 0, memo: "통신비 15만원(이번 달) — 9월부터 5만원으로 인하 예정" },
      { id: "m-2", month: "2026-09", salary: 2855860, other_income: 380000, loan_payment: 828533, other_fixed: 907890, extra_expense: 0, memo: null },
      { id: "m-3", month: "2026-10", salary: 2855860, other_income: 380000, loan_payment: 828533, other_fixed: 907890, extra_expense: 0, memo: null },
      { id: "m-4", month: "2026-11", salary: 0, other_income: 6587200, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: "퇴직금(세전 320만원) 3,136,000원 + 실업급여 1,651,200원(9,907,200원÷6개월) + 용돈 1,800,000원" },
      { id: "m-5", month: "2026-12", salary: 0, other_income: 3451200, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: null },
      { id: "m-6", month: "2027-01", salary: 0, other_income: 3451200, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: null },
      { id: "m-7", month: "2027-02", salary: 0, other_income: 3451200, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: null },
      { id: "m-8", month: "2027-03", salary: 0, other_income: 3451200, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: null },
      { id: "m-9", month: "2027-04", salary: 0, other_income: 3451200, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: "실업급여 마지막 지급월(11/25~4/25, 6개월 분할)" },
      { id: "m-10", month: "2027-05", salary: 1800000, other_income: 0, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: "5/25부터 신규 급여 180만원" },
      { id: "m-11", month: "2027-06", salary: 1800000, other_income: 0, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: null },
      { id: "m-12", month: "2027-07", salary: 1800000, other_income: 0, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: null },
      { id: "m-13", month: "2027-08", salary: 1800000, other_income: 0, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: null },
      { id: "m-14", month: "2027-09", salary: 1800000, other_income: 0, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: null },
      { id: "m-15", month: "2027-10", salary: 1800000, other_income: 0, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: null },
      { id: "m-16", month: "2027-11", salary: 1800000, other_income: 0, loan_payment: 828533, other_fixed: 707890, extra_expense: 0, memo: null },
    ],
    debts: [
      { id: "d-1", name: "다올저축은행", balance: 38900411, annual_rate: 0.1366, monthly_payment: 593753, priority: 1 },
      { id: "d-2", name: "SBI저축은행", balance: 15237533, annual_rate: 0.1366, monthly_payment: 234780, priority: 2 },
    ],
    longTerm: {
      cash_assets: 2502867,
      investment_assets: 1314266,
      target_net_worth: 100000000,
      expected_annual_return: 0.075,
      expected_severance: 3200000,
      expected_unemployment_benefit: 9907200,
      starting_cumulative_assets: 2502867,
    },
    goalSettings: {
      title: "자금확보플랜 · 호주 워킹홀리데이 (전기·배관 기술직 루트)",
      target_month: "2027-12",
      note: "모든 금액은 원화 환산 기준이며, 정확한 금액은 학원·기관 확인 후 업데이트 필요",
    },
    goalItems: [
      { id: "g-1", category: "한국 자격증 취득", item: "전기기능사 (필기+실기)", expected_month: "2026-11", amount: 650000, note: "국비지원 적용", sort_order: 1 },
      { id: "g-2", category: "한국 자격증 취득", item: "전기기능사 필기 교재 4종", expected_month: "2026-08", amount: 140000, note: "기초수학용어집·이론서·기출문제집·포켓요약집, 13만~15만원", sort_order: 2 },
      { id: "g-3", category: "한국 자격증 취득", item: "배관기능사 (선택)", expected_month: "2027-03", amount: 250000, note: "국비지원, 약 20만원대 예상 — 학원 확인 후 업데이트 필요", sort_order: 3 },
      { id: "g-4", category: "한국 자격증 취득", item: "공조냉동기계기능사 (선택)", expected_month: "2027-06", amount: 280000, note: "국비지원, 23만~33만원", sort_order: 4 },
      { id: "g-5", category: "한국 자격증 취득", item: "학점은행제 41학점 (전기산업기사 응시자격용)", expected_month: "2027-09", amount: 950000, note: "국비지원 미적용, 정가 60만~130만원", sort_order: 5 },
      { id: "g-6", category: "호주 출국 준비", item: "워킹홀리데이(417) 비자 신청비", expected_month: "2027-09", amount: 650000, note: "환율 변동 있을 수 있음 — 최신 금액 확인 필요", sort_order: 6 },
      { id: "g-7", category: "호주 출국 준비", item: "입국 자금증빙 (AUD 5,000)", expected_month: "2027-11", amount: 4500000, note: "환율 900원/AUD 가정 — 실제 인출 없이 잔고 증명용", sort_order: 7 },
      { id: "g-8", category: "호주 출국 준비", item: "항공권", expected_month: "2027-12", amount: 0, note: "비자 승인 후 예매 예정 — 별도 확인 필요, 금액 미포함", sort_order: 8 },
      { id: "g-9", category: "호주 현지 초기비용", item: "지게차 면허 (LF class High Risk Work Licence)", expected_month: "2028-01", amount: 405000, note: "AUD 300~600, 환율 900원/AUD 가정", sort_order: 9 },
    ],
    allocation: {
      monthly_spare_cash: 1150000,
      cma_rate: 0.035,
      emergency_fund_months: 3,
      monthly_essential_expense: 1078533,
      current_stage: 1,
      stage1_debt_pct: 0.35,
      stage1_etf_pct: 0.2,
      stage1_stock_pct: 0.1,
      stage1_cma_pct: 0.35,
      stage2_debt_pct: 0.3,
      stage2_etf_pct: 0.4,
      stage2_stock_pct: 0.2,
      stage2_cma_pct: 0.1,
    },
    etf: {
      stage1_monthly_invest: 100000,
      scenario_conservative_rate: 0.06,
      scenario_base_rate: 0.075,
      scenario_aggressive_rate: 0.1,
      voo_pct: 0.5,
      voo_dividend_yield: 0.013,
      schd_pct: 0.3,
      schd_dividend_yield: 0.035,
      stock_pct: 0.2,
      stock_dividend_yield: 0.01,
    },
    stocks: [
      { id: "s-1", name: "Nvidia", ticker: "NVDA", buy_amount: 0, buy_date: null, current_value: 0, note: null, sort_order: 1 },
      { id: "s-2", name: "Google (Alphabet)", ticker: "GOOGL", buy_amount: 0, buy_date: null, current_value: 0, note: null, sort_order: 2 },
      { id: "s-3", name: "dispatch (종목명 확인 필요)", ticker: null, buy_amount: 0, buy_date: null, current_value: 0, note: null, sort_order: 3 },
    ],
    seq: 100,
  };
}

function getData(): MockData {
  if (!globalThis.__financeMockData) {
    globalThis.__financeMockData = createInitialData();
  }
  return globalThis.__financeMockData;
}

// ── 월별기록 ──
export function mockListMonthlyRecords(): MonthlyRecord[] {
  return [...getData().monthlyRecords].sort((a, b) => a.month.localeCompare(b.month));
}
export function mockUpsertMonthlyRecord(input: Omit<MonthlyRecord, "id"> & { id?: string }): MonthlyRecord {
  const data = getData();
  if (input.id) {
    const idx = data.monthlyRecords.findIndex((r) => r.id === input.id);
    if (idx === -1) throw new Error("월별기록을 찾을 수 없습니다.");
    data.monthlyRecords[idx] = { ...data.monthlyRecords[idx], ...input, id: input.id };
    return data.monthlyRecords[idx];
  }
  const record: MonthlyRecord = { ...input, id: nextId("m") };
  data.monthlyRecords.push(record);
  return record;
}
export function mockDeleteMonthlyRecord(id: string): void {
  const data = getData();
  data.monthlyRecords = data.monthlyRecords.filter((r) => r.id !== id);
}

// ── 대출 ──
export function mockListDebts(): Debt[] {
  return [...getData().debts].sort((a, b) => a.priority - b.priority);
}
export function mockUpsertDebt(input: Omit<Debt, "id"> & { id?: string }): Debt {
  const data = getData();
  if (input.id) {
    const idx = data.debts.findIndex((d) => d.id === input.id);
    if (idx === -1) throw new Error("대출 정보를 찾을 수 없습니다.");
    data.debts[idx] = { ...data.debts[idx], ...input, id: input.id };
    return data.debts[idx];
  }
  const debt: Debt = { ...input, id: nextId("d") };
  data.debts.push(debt);
  return debt;
}
export function mockDeleteDebt(id: string): void {
  const data = getData();
  data.debts = data.debts.filter((d) => d.id !== id);
}

// ── 장기플랜 설정 ──
export function mockGetLongTermSettings(): LongTermSettings {
  return getData().longTerm;
}
export function mockUpdateLongTermSettings(patch: Partial<LongTermSettings>): LongTermSettings {
  const data = getData();
  data.longTerm = { ...data.longTerm, ...patch };
  return data.longTerm;
}

// ── 자금확보플랜 설정 & 항목 ──
export function mockGetGoalSettings(): GoalPlanSettings {
  return getData().goalSettings;
}
export function mockUpdateGoalSettings(patch: Partial<GoalPlanSettings>): GoalPlanSettings {
  const data = getData();
  data.goalSettings = { ...data.goalSettings, ...patch };
  return data.goalSettings;
}
export function mockListGoalItems(): GoalPlanItem[] {
  return [...getData().goalItems].sort((a, b) => a.sort_order - b.sort_order);
}
export function mockUpsertGoalItem(input: Omit<GoalPlanItem, "id"> & { id?: string }): GoalPlanItem {
  const data = getData();
  if (input.id) {
    const idx = data.goalItems.findIndex((g) => g.id === input.id);
    if (idx === -1) throw new Error("항목을 찾을 수 없습니다.");
    data.goalItems[idx] = { ...data.goalItems[idx], ...input, id: input.id };
    return data.goalItems[idx];
  }
  const item: GoalPlanItem = { ...input, id: nextId("g") };
  data.goalItems.push(item);
  return item;
}
export function mockDeleteGoalItem(id: string): void {
  const data = getData();
  data.goalItems = data.goalItems.filter((g) => g.id !== id);
}

// ── 여유자금 배분 설정 ──
export function mockGetAllocationSettings(): AllocationSettings {
  return getData().allocation;
}
export function mockUpdateAllocationSettings(patch: Partial<AllocationSettings>): AllocationSettings {
  const data = getData();
  data.allocation = { ...data.allocation, ...patch };
  return data.allocation;
}

// ── ETF 설정 ──
export function mockGetEtfSettings(): EtfSettings {
  return getData().etf;
}
export function mockUpdateEtfSettings(patch: Partial<EtfSettings>): EtfSettings {
  const data = getData();
  data.etf = { ...data.etf, ...patch };
  return data.etf;
}

// ── 개별주 ──
export function mockListStocks(): StockHolding[] {
  return [...getData().stocks].sort((a, b) => a.sort_order - b.sort_order);
}
export function mockUpsertStock(input: Omit<StockHolding, "id"> & { id?: string }): StockHolding {
  const data = getData();
  if (input.id) {
    const idx = data.stocks.findIndex((s) => s.id === input.id);
    if (idx === -1) throw new Error("종목을 찾을 수 없습니다.");
    data.stocks[idx] = { ...data.stocks[idx], ...input, id: input.id };
    return data.stocks[idx];
  }
  const stock: StockHolding = { ...input, id: nextId("s") };
  data.stocks.push(stock);
  return stock;
}
export function mockDeleteStock(id: string): void {
  const data = getData();
  data.stocks = data.stocks.filter((s) => s.id !== id);
}
