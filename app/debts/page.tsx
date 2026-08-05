import { getLongTermSettings, listDebts } from "@/lib/db";
import DebtsClient from "./DebtsClient";

export const dynamic = "force-dynamic";

export default async function DebtsPage() {
  const [debts, longTerm] = await Promise.all([listDebts(), getLongTermSettings()]);
  return <DebtsClient initialDebts={debts} initialLongTerm={longTerm} />;
}
