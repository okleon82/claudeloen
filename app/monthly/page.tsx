import { getLongTermSettings, listMonthlyRecords } from "@/lib/db";
import { computeMonthlySeries } from "@/lib/calc";
import MonthlyClient from "./MonthlyClient";

export const dynamic = "force-dynamic";

export default async function MonthlyPage() {
  const [records, longTerm] = await Promise.all([listMonthlyRecords(), getLongTermSettings()]);
  const series = computeMonthlySeries(records, longTerm.starting_cumulative_assets);

  return (
    <MonthlyClient initialSeries={series} startingCumulativeAssets={longTerm.starting_cumulative_assets} />
  );
}
