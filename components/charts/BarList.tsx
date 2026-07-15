const ACCENT = "#2a78d6";

export default function BarList({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <ul className="flex flex-col gap-2.5">
      {data.map((d) => (
        <li key={d.label} className="flex items-center gap-3 text-xs">
          <span className="w-16 shrink-0 text-[#52514e]">{d.label}</span>
          <div className="h-2 flex-1 rounded-full bg-[#e1e0d9]">
            <div
              className="h-2 rounded-full"
              style={{ width: `${(d.value / max) * 100}%`, backgroundColor: ACCENT }}
            />
          </div>
          <span className="w-8 shrink-0 text-right font-medium text-[#0b0b0b]">{d.value}</span>
        </li>
      ))}
    </ul>
  );
}
