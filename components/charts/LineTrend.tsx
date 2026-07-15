const ACCENT = "#2a78d6";
const GRID = "#e1e0d9";
const MUTED = "#898781";

export default function LineTrend({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const width = 320;
  const height = 120;
  const padX = 8;
  const padY = 16;
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padX + (i / (data.length - 1)) * (width - padX * 2);
    const y = padY + (1 - (d.value - min) / range) * (height - padY * 2);
    return { x, y, value: d.value, label: d.label };
  });

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const last = points[points.length - 1];

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full" role="img" aria-label="지표 추이 라인 차트">
        <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke={GRID} strokeWidth={1} />
        <path d={path} fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={last.x} cy={last.y} r={4} fill={ACCENT} stroke="#fff" strokeWidth={2} />
        <text x={last.x} y={last.y - 10} textAnchor="end" fontSize={11} fill="#0b0b0b" fontWeight={600}>
          {last.value}
        </text>
        {points.map((p, i) => (
          <text key={i} x={p.x} y={height + 14} textAnchor="middle" fontSize={9} fill={MUTED}>
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
