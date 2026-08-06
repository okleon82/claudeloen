import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { daySchema, type Day } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "days");

function readAllDayFiles(): { file: string; raw: unknown }[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((file) => {
      const fullPath = path.join(CONTENT_DIR, file);
      const raw = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
      return { file, raw };
    });
}

let cachedDays: Day[] | null = null;

/**
 * Scans /content/days, validates every file against the Day schema, and
 * throws a descriptive error (including which file and which field failed)
 * if any file doesn't match — so a bad day-XXX.json fails the build loudly
 * instead of rendering broken content.
 */
export function getAllDays(): Day[] {
  if (cachedDays) return cachedDays;

  const files = readAllDayFiles();
  const days: Day[] = [];

  for (const { file, raw } of files) {
    const result = daySchema.safeParse(raw);
    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("\n");
      throw new Error(
        `[content/days/${file}] does not match the Day schema:\n${details}\n\n` +
          `Fix the file to match the schema described in README.md before continuing.`
      );
    }
    days.push(result.data);
  }

  days.sort((a, b) => a.day - b.day);
  cachedDays = days;
  return days;
}

export function getDayByNumber(n: number): Day | undefined {
  return getAllDays().find((d) => d.day === n);
}

export function getLatestDay(): Day | undefined {
  const days = getAllDays();
  return days.length ? days[days.length - 1] : undefined;
}

/**
 * Returns today's Day if one exists for today's date, otherwise falls back
 * to the most recent Day so the homepage always has something to show.
 */
export function getTodayDay(): { day: Day | undefined; isToday: boolean } {
  const days = getAllDays();
  if (!days.length) return { day: undefined, isToday: false };

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayDay = days.find((d) => d.date === todayStr);
  if (todayDay) return { day: todayDay, isToday: true };

  return { day: days[days.length - 1], isToday: false };
}

const WEEKDAY_THEMES: Record<Day["weekday"], string> = {
  월요일: "직장/커리어",
  화요일: "환경/기술",
  수요일: "교육",
  목요일: "건강/라이프스타일",
  금요일: "사회 이슈",
  토요일: "자유 주제 + 모의 세트",
  일요일: "복습",
};

export function getWeekdayTheme(weekday: Day["weekday"]): string {
  return WEEKDAY_THEMES[weekday];
}

export function isReviewDay(weekday: Day["weekday"]): boolean {
  return weekday === "일요일";
}
