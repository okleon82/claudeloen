import { getAllDays } from "@/lib/content";
import { DayCard } from "@/components/DayCard";

export default function ArchivePage() {
  const days = [...getAllDays()].reverse();

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">아카이브</h1>
        <p className="text-neutral-500 dark:text-neutral-400">지금까지의 모든 Day 콘텐츠 ({days.length}개)</p>
      </header>
      {days.length === 0 ? (
        <p className="text-neutral-500">아직 콘텐츠가 없습니다.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {days.map((d) => (
            <DayCard key={d.day} day={d} />
          ))}
        </div>
      )}
    </div>
  );
}
