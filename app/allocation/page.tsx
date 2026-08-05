import { getAllocationSettings, getEtfSettings, getLongTermSettings, listDebts } from "@/lib/db";
import { computeMonthlyDebtPayment, computeWeightedAvgRate } from "@/lib/calc";
import AllocationClient from "./AllocationClient";

export const dynamic = "force-dynamic";

export default async function AllocationPage() {
  const [allocation, etf, longTerm, debts] = await Promise.all([
    getAllocationSettings(),
    getEtfSettings(),
    getLongTermSettings(),
    listDebts(),
  ]);

  const monthlyDebtPayment = computeMonthlyDebtPayment(debts);
  const weightedDebtRate = computeWeightedAvgRate(debts);

  return (
    <AllocationClient
      initialAllocation={allocation}
      cashAssets={longTerm.cash_assets}
      monthlyDebtPayment={monthlyDebtPayment}
      weightedDebtRate={weightedDebtRate}
      etfBaseRate={etf.scenario_base_rate}
    />
  );
}
