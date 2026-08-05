import { getGoalSettings, listGoalItems } from "@/lib/db";
import GoalClient from "./GoalClient";

export const dynamic = "force-dynamic";

export default async function GoalPage() {
  const [settings, items] = await Promise.all([getGoalSettings(), listGoalItems()]);
  return <GoalClient initialSettings={settings} initialItems={items} />;
}
