import { getWeekdayTheme } from "@/lib/content";
import type { Day } from "@/lib/schema";

export function WeekdayBadge({ weekday, className }: { weekday: Day["weekday"]; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white sm:text-sm ${className ?? ""}`}
    >
      <span>{weekday}</span>
      <span className="opacity-80">·</span>
      <span>{getWeekdayTheme(weekday)}</span>
    </span>
  );
}
