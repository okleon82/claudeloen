const CATEGORICAL = ["#2a78d6", "#008300", "#e87ba4", "#eda100", "#1baf7a", "#eb6834", "#4a3aa7", "#e34948"];

export default function Donut({ data }: { data: { label: string; value: number }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  const stops = data.map((d, i) => {
    const start = (cumulative / total) * 360;
    cumulative += d.value;
    const end = (cumulative / total) * 360;
    return `${CATEGORICAL[i % CATEGORICAL.length]} ${start}deg ${end}deg`;
  });
  const gradient = `conic-gradient(${stops.join(", ")})`;

  return (
    <div className="flex items-center gap-5">
      <div
        className="relative h-24 w-24 shrink-0 rounded-full"
        style={{ background: gradient }}
        role="img"
        aria-label="카테고리별 매출 비중 도넛 차트"
      >
        <div className="absolute inset-[22%] rounded-full bg-white" />
      </div>
      <ul className="flex flex-col gap-1.5 text-xs">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: CATEGORICAL[i % CATEGORICAL.length] }}
            />
            <span className="text-[#52514e]">{d.label}</span>
            <span className="ml-auto font-medium text-[#0b0b0b]">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
