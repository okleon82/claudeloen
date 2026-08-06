const LABELS: Record<string, string> = {
  listening: "Listening",
  reading: "Reading",
  speaking: "Speaking",
  writing: "Writing",
};

export function ProgressBar({ opened }: { opened: Record<string, boolean> }) {
  const keys = Object.keys(LABELS);
  const count = keys.filter((k) => opened[k]).length;

  return (
    <div className="print:hidden">
      <div className="mb-1.5 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span>오늘 진행률</span>
        <span>
          {count} / {keys.length}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${(count / keys.length) * 100}%` }}
        />
      </div>
      <div className="mt-1.5 flex gap-2 text-[11px] text-neutral-400 dark:text-neutral-500">
        {keys.map((k) => (
          <span key={k} className={opened[k] ? "font-medium text-accent dark:text-accent-light" : ""}>
            {LABELS[k]}
          </span>
        ))}
      </div>
    </div>
  );
}
