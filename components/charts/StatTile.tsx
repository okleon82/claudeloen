export default function StatTile({
  label,
  value,
  delta,
  deltaGood = true,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaGood?: boolean;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white px-4 py-3">
      <div className="text-[11px] text-[#898781]">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-lg font-semibold text-[#0b0b0b]">{value}</span>
        {delta && (
          <span className={`text-xs font-medium ${deltaGood ? "text-[#006300]" : "text-[#d03b3b]"}`}>
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
