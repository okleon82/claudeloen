export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-bold">{title}</h2>
      {description && <p className="mt-0.5 text-xs text-brand-gray">{description}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function StatTile({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "good" | "bad";
}) {
  const toneClass =
    tone === "good" ? "text-emerald-600" : tone === "bad" ? "text-red-600" : "text-brand-black";
  return (
    <div className="rounded-xl bg-brand-light px-3 py-2.5">
      <div className="text-[11px] text-brand-gray">{label}</div>
      <div className={`mt-0.5 text-base font-bold ${toneClass}`}>{value}</div>
    </div>
  );
}
