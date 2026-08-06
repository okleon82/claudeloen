import type { Day } from "@/lib/schema";

export function WritingFeedback({ feedback }: { feedback: Day["writing"]["feedback"] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-950/30">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-700 dark:text-red-400">
          수정 전 (6점대 예시)
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
          {feedback.before}
        </p>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-800/60">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          첨삭 코멘트
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
          {feedback.comment}
        </p>
      </div>
      <div className="rounded-lg border border-green-200 bg-correct p-3 dark:border-green-900/50 dark:bg-correct-dark">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-400">
          수정 후 (7점대 예시)
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
          {feedback.after}
        </p>
      </div>
    </div>
  );
}
