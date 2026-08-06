"use client";

import { useEffect, useState } from "react";

/** Print / save-as-PDF trigger with an opt-in checkbox for including the answer key. */
export function PrintButton() {
  const [includeAnswers, setIncludeAnswers] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("print-with-answers", includeAnswers);
  }, [includeAnswers]);

  return (
    <div className="flex flex-wrap items-center gap-3 print:hidden">
      <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
        <input
          type="checkbox"
          checked={includeAnswers}
          onChange={(e) => setIncludeAnswers(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-accent focus:ring-accent"
        />
        정답지 포함하여 인쇄
      </label>
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-dark"
      >
        🖨️ 인쇄 / PDF 저장
      </button>
    </div>
  );
}
