"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";

export function CompletionCheckbox({ day, label = "오늘 학습 완료" }: { day: number; label?: string }) {
  const [done, setDone] = useLocalStorage(`ielts-completed-day-${day}`, false);

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
      <input
        type="checkbox"
        checked={done}
        onChange={(e) => setDone(e.target.checked)}
        className="h-4 w-4 rounded border-neutral-300 text-accent focus:ring-accent"
      />
      {label}
    </label>
  );
}

export function useIsDayCompleted(day: number) {
  return useLocalStorage(`ielts-completed-day-${day}`, false);
}
