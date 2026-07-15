export function Sparkline({ data }: { data: number[] }) {
  const width = 240;
  const height = 64;
  const padX = 4;
  const padY = 10;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, i) => {
    const x = padX + (i / (data.length - 1)) * (width - padX * 2);
    const y = padY + (1 - (value - min) / range) * (height - padY * 2);
    return { x, y };
  });

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const last = points[points.length - 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full text-primary" role="presentation" aria-hidden>
      <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="currentColor" strokeOpacity={0.12} strokeWidth={1} />
      <path d={path} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r={4} fill="currentColor" stroke="hsl(var(--card))" strokeWidth={2} />
    </svg>
  );
}
