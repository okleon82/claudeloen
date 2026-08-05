import { getAllocationSettings, getEtfSettings, getLongTermSettings, listDebts, listStocks } from "@/lib/db";
import { computeAllocationTable, computeDebtPayoff, currentStageAmount, sortDebtsByPriority } from "@/lib/calc";
import EtfClient from "./EtfClient";

export const dynamic = "force-dynamic";

export default async function EtfPage() {
  const [etf, allocation, longTerm, debts, stocks] = await Promise.all([
    getEtfSettings(),
    getAllocationSettings(),
    getLongTermSettings(),
    listDebts(),
    listStocks(),
  ]);

  const topDebt = sortDebtsByPriority(debts)[0] ?? null;
  const payoff = topDebt ? computeDebtPayoff(topDebt, new Date()) : { months: null };
  const stage2StartMonth = payoff.months !== null && payoff.months !== undefined ? Math.ceil(payoff.months) : null;

  const allocationTable = computeAllocationTable(allocation);
  const etfRow = allocationTable.find((r) => r.key === "etf")!;
  const stage2MonthlyInvest = currentStageAmount(etfRow, allocation.current_stage);

  return (
    <EtfClient
      initialEtf={etf}
      initialStocks={stocks}
      stage2MonthlyInvest={stage2MonthlyInvest}
      stage2StartMonth={stage2StartMonth}
      startingInvestmentAssets={longTerm.investment_assets}
      targetNetWorth={longTerm.target_net_worth}
      startYear={new Date().getFullYear()}
      payoffLabel={topDebt ? `${topDebt.name} 상환 완료 후` : "-"}
    />
  );
}
