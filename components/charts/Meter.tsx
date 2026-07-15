export default function Meter({ label, level, max = 5 }: { label: string; level: number; max?: number }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-32 shrink-0 text-[#52514e]">{label}</span>
      <div className="h-1.5 flex-1 rounded-full bg-[#cde2fb]">
        <div
          className="h-1.5 rounded-full bg-[#2a78d6]"
          style={{ width: `${(level / max) * 100}%` }}
        />
      </div>
      <span className="w-6 shrink-0 text-right text-[#0b0b0b]">{level}</span>
    </div>
  );
}
