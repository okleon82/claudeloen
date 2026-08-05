import { getAllocationSettings, getLongTermSettings, listDebts, listMonthlyRecords } from "@/lib/db";
import {
  computeMonthlySeries,
  computeNetWorth,
  computeTotalDebt,
  computeWeightedAvgRate,
  formatMonth,
  sortDebtsByPriority,
} from "@/lib/calc";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [records, debts, longTerm, allocation] = await Promise.all([
    listMonthlyRecords(),
    listDebts(),
    getLongTermSettings(),
    getAllocationSettings(),
  ]);

  const series = computeMonthlySeries(records, longTerm.starting_cumulative_assets);
  const netWorth = computeNetWorth(longTerm, debts);
  const totalDebt = computeTotalDebt(debts);
  const weightedRate = computeWeightedAvgRate(debts);
  const topPriorityDebt = sortDebtsByPriority(debts)[0] ?? null;
  const defaultMonth = formatMonth(new Date());

  return (
    <DashboardClient
      series={series}
      defaultMonth={defaultMonth}
      netWorth={netWorth}
      totalDebt={totalDebt}
      weightedRate={weightedRate}
      topPriorityDebtName={topPriorityDebt?.name ?? "-"}
      allocationStage={allocation.current_stage}
    />
  );
}
