import { getStore, listFaqs } from "@/lib/db";
import FaqChat from "./FaqChat";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const store = await getStore();
  const faqs = await listFaqs(store.id);

  return <FaqChat faqs={faqs} />;
}
