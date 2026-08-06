import Link from "next/link";
import { getAllDays, getTodayDay, getWeekdayTheme } from "@/lib/content";
import type { Day } from "@/lib/schema";
import { WeekdayBadge } from "@/components/WeekdayBadge";
import { DaySections } from "@/components/DaySections";

const KOREAN_WEEKDAYS: Day["weekday"][] = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

export default function HomePage() {
  const days = getAllDays();

  if (!days.length) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700">
        <p>아직 콘텐츠가 없습니다. <code>content/days/day-001.json</code> 파일을 추가해보세요.</p>
      </div>
    );
  }

  const now = new Date();
  const todayWeekday = KOREAN_WEEKDAYS[now.getDay()];
  const { day, isToday } = getTodayDay();

  if (!isToday && todayWeekday === "일요일") {
    return <ReviewDayBanner recentDays={days.slice(-7).reverse()} />;
  }

  if (!day) return null;

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Day {day.day}</h1>
          <WeekdayBadge weekday={day.weekday} />
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">{day.topic}</p>
        {!isToday && (
          <p className="rounded-lg bg-surface px-3 py-2 text-sm text-accent dark:bg-surface-dark dark:text-accent-light">
            오늘({now.toISOString().slice(0, 10)})자 콘텐츠가 아직 없어요. 가장 최근 콘텐츠인 Day {day.day}를 보여드립니다.
          </p>
        )}
      </header>
      <DaySections day={day} />
    </div>
  );
}

function ReviewDayBanner({ recentDays }: { recentDays: Day[] }) {
  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">오늘은 일요일 — 복습의 날</h1>
          <WeekdayBadge weekday="일요일" />
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          일요일은 새 콘텐츠 없이 지난 한 주를 복습하는 날이에요. 아래 Day 중 하나를 골라 다시 풀어보거나,{" "}
          <Link href="/vocab" className="font-medium text-accent hover:underline dark:text-accent-light">
            단어장 모음
          </Link>
          에서 플래시카드·퀴즈로 복습해보세요.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {recentDays.map((d) => (
          <Link
            key={d.day}
            href={`/day/${d.day}`}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-accent/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <p className="font-bold text-neutral-900 dark:text-neutral-50">
              Day {d.day} · {getWeekdayTheme(d.weekday)}
            </p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{d.topic}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
