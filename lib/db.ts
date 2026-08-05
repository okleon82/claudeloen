import "server-only";
import { createAdminSupabaseClient, hasSupabaseConfig } from "./supabase/admin";
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
import * as mock from "./mock-store";

function useSupabase(): boolean {
  return hasSupabaseConfig();
}

// ── 월별기록 ──
export async function listMonthlyRecords(): Promise<MonthlyRecord[]> {
  if (!useSupabase()) return mock.mockListMonthlyRecords();
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("monthly_records").select("*").order("month");
  if (error) throw error;
  return data as MonthlyRecord[];
}

export async function upsertMonthlyRecord(
  input: Omit<MonthlyRecord, "id"> & { id?: string }
): Promise<MonthlyRecord> {
  if (!useSupabase()) return mock.mockUpsertMonthlyRecord(input);
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("monthly_records").upsert(input).select().single();
  if (error) throw error;
  return data as MonthlyRecord;
}

export async function deleteMonthlyRecord(id: string): Promise<void> {
  if (!useSupabase()) return mock.mockDeleteMonthlyRecord(id);
  const sb = createAdminSupabaseClient();
  const { error } = await sb.from("monthly_records").delete().eq("id", id);
  if (error) throw error;
}

// ── 대출 ──
export async function listDebts(): Promise<Debt[]> {
  if (!useSupabase()) return mock.mockListDebts();
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("debts").select("*").order("priority");
  if (error) throw error;
  return data as Debt[];
}

export async function upsertDebt(input: Omit<Debt, "id"> & { id?: string }): Promise<Debt> {
  if (!useSupabase()) return mock.mockUpsertDebt(input);
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("debts").upsert(input).select().single();
  if (error) throw error;
  return data as Debt;
}

export async function deleteDebt(id: string): Promise<void> {
  if (!useSupabase()) return mock.mockDeleteDebt(id);
  const sb = createAdminSupabaseClient();
  const { error } = await sb.from("debts").delete().eq("id", id);
  if (error) throw error;
}

// ── 장기플랜 설정 (싱글턴) ──
export async function getLongTermSettings(): Promise<LongTermSettings> {
  if (!useSupabase()) return mock.mockGetLongTermSettings();
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("long_term_settings").select("*").eq("id", 1).single();
  if (error) throw error;
  return data as LongTermSettings;
}

export async function updateLongTermSettings(
  patch: Partial<LongTermSettings>
): Promise<LongTermSettings> {
  if (!useSupabase()) return mock.mockUpdateLongTermSettings(patch);
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb
    .from("long_term_settings")
    .update(patch)
    .eq("id", 1)
    .select()
    .single();
  if (error) throw error;
  return data as LongTermSettings;
}

// ── 자금확보플랜 설정 (싱글턴) & 항목 ──
export async function getGoalSettings(): Promise<GoalPlanSettings> {
  if (!useSupabase()) return mock.mockGetGoalSettings();
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("goal_plan_settings").select("*").eq("id", 1).single();
  if (error) throw error;
  return data as GoalPlanSettings;
}

export async function updateGoalSettings(
  patch: Partial<GoalPlanSettings>
): Promise<GoalPlanSettings> {
  if (!useSupabase()) return mock.mockUpdateGoalSettings(patch);
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb
    .from("goal_plan_settings")
    .update(patch)
    .eq("id", 1)
    .select()
    .single();
  if (error) throw error;
  return data as GoalPlanSettings;
}

export async function listGoalItems(): Promise<GoalPlanItem[]> {
  if (!useSupabase()) return mock.mockListGoalItems();
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("goal_plan_items").select("*").order("sort_order");
  if (error) throw error;
  return data as GoalPlanItem[];
}

export async function upsertGoalItem(
  input: Omit<GoalPlanItem, "id"> & { id?: string }
): Promise<GoalPlanItem> {
  if (!useSupabase()) return mock.mockUpsertGoalItem(input);
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("goal_plan_items").upsert(input).select().single();
  if (error) throw error;
  return data as GoalPlanItem;
}

export async function deleteGoalItem(id: string): Promise<void> {
  if (!useSupabase()) return mock.mockDeleteGoalItem(id);
  const sb = createAdminSupabaseClient();
  const { error } = await sb.from("goal_plan_items").delete().eq("id", id);
  if (error) throw error;
}

// ── 여유자금 배분 설정 (싱글턴) ──
export async function getAllocationSettings(): Promise<AllocationSettings> {
  if (!useSupabase()) return mock.mockGetAllocationSettings();
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("allocation_settings").select("*").eq("id", 1).single();
  if (error) throw error;
  return data as AllocationSettings;
}

export async function updateAllocationSettings(
  patch: Partial<AllocationSettings>
): Promise<AllocationSettings> {
  if (!useSupabase()) return mock.mockUpdateAllocationSettings(patch);
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb
    .from("allocation_settings")
    .update(patch)
    .eq("id", 1)
    .select()
    .single();
  if (error) throw error;
  return data as AllocationSettings;
}

// ── ETF 설정 (싱글턴) ──
export async function getEtfSettings(): Promise<EtfSettings> {
  if (!useSupabase()) return mock.mockGetEtfSettings();
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("etf_settings").select("*").eq("id", 1).single();
  if (error) throw error;
  return data as EtfSettings;
}

export async function updateEtfSettings(patch: Partial<EtfSettings>): Promise<EtfSettings> {
  if (!useSupabase()) return mock.mockUpdateEtfSettings(patch);
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("etf_settings").update(patch).eq("id", 1).select().single();
  if (error) throw error;
  return data as EtfSettings;
}

// ── 개별주 ──
export async function listStocks(): Promise<StockHolding[]> {
  if (!useSupabase()) return mock.mockListStocks();
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("stock_holdings").select("*").order("sort_order");
  if (error) throw error;
  return data as StockHolding[];
}

export async function upsertStock(
  input: Omit<StockHolding, "id"> & { id?: string }
): Promise<StockHolding> {
  if (!useSupabase()) return mock.mockUpsertStock(input);
  const sb = createAdminSupabaseClient();
  const { data, error } = await sb.from("stock_holdings").upsert(input).select().single();
  if (error) throw error;
  return data as StockHolding;
}

export async function deleteStock(id: string): Promise<void> {
  if (!useSupabase()) return mock.mockDeleteStock(id);
  const sb = createAdminSupabaseClient();
  const { error } = await sb.from("stock_holdings").delete().eq("id", id);
  if (error) throw error;
}
