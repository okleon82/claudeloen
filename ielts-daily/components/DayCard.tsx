import Link from "next/link";
import type { Day } from "@/lib/schema";
import { WeekdayBadge } from "./WeekdayBadge";
import { CompletionCheckbox } from "./CompletionCheckbox";

export function DayCard({ day }: { day: Day }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-accent/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/day/${day.day}`} className="group">
          <p className="text-lg font-bold text-neutral-900 group-hover:text-accent dark:text-neutral-50 dark:group-hover:text-accent-light">
            Day {day.day}
          </p>
          <p className="text-xs text-neutral-400">{day.date}</p>
        </Link>
        <WeekdayBadge weekday={day.weekday} />
      </div>
      <Link href={`/day/${day.day}`} className="text-sm text-neutral-600 hover:text-accent dark:text-neutral-300 dark:hover:text-accent-light">
        {day.topic}
      </Link>
      <div className="mt-1 border-t border-neutral-100 pt-2.5 dark:border-neutral-800">
        <CompletionCheckbox day={day.day} label="완료" />
      </div>
    </div>
  );
}
