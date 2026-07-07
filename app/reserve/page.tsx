import { getStore } from "@/lib/db";
import ReserveForm from "./ReserveForm";

export const dynamic = "force-dynamic";

export default async function ReservePage() {
  const store = await getStore();

  return (
    <ReserveForm
      storeName={store.name}
      openingTime={store.opening_time}
      closingTime={store.closing_time}
      closedDays={store.closed_days ?? []}
    />
  );
}
