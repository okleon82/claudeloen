import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllDays, getDayByNumber } from "@/lib/content";
import { WeekdayBadge } from "@/components/WeekdayBadge";
import { DaySections } from "@/components/DaySections";

export function generateStaticParams() {
  return getAllDays().map((d) => ({ n: String(d.day) }));
}

export default function DayPage({ params }: { params: { n: string } }) {
  const n = Number(params.n);
  const day = getDayByNumber(n);
  if (!day) notFound();

  const days = getAllDays();
  const prev = days.find((d) => d.day === n - 1);
  const next = days.find((d) => d.day === n + 1);

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Day {day.day}</h1>
          <WeekdayBadge weekday={day.weekday} />
          <span className="text-sm text-neutral-400">{day.date}</span>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">{day.topic}</p>
      </header>

      <DaySections day={day} />

      <div className="flex items-center justify-between border-t border-neutral-200 pt-4 text-sm dark:border-neutral-800 print:hidden">
        {prev ? (
          <Link href={`/day/${prev.day}`} className="text-accent hover:underline dark:text-accent-light">
            ← Day {prev.day}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/day/${next.day}`} className="text-accent hover:underline dark:text-accent-light">
            Day {next.day} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
