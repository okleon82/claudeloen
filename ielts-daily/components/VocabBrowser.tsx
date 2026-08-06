"use client";

import { useMemo, useState } from "react";
import type { VocabEntry } from "@/lib/vocab";
import { Flashcards } from "./Flashcards";
import { VocabQuiz } from "./VocabQuiz";

type Mode = "list" | "flashcards" | "quiz";

export function VocabBrowser({ entries }: { entries: VocabEntry[] }) {
  const [mode, setMode] = useState<Mode>("list");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (e) => e.word.toLowerCase().includes(q) || e.meaning.toLowerCase().includes(q)
    );
  }, [entries, query]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {(
          [
            ["list", "📋 목록"],
            ["flashcards", "🔄 플래시카드"],
            ["quiz", "❓ 퀴즈"],
          ] as [Mode, string][]
        ).map(([m, label]) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              mode === m
                ? "bg-accent text-white"
                : "bg-surface text-neutral-600 hover:bg-neutral-200 dark:bg-surface-dark dark:text-neutral-300 dark:hover:bg-neutral-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "list" && (
        <div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="단어 또는 뜻 검색..."
            className="mb-3 w-full max-w-xs rounded-lg border border-neutral-300 px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800"
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                  <th className="py-2 pr-3 font-medium">Day</th>
                  <th className="py-2 pr-3 font-medium">단어</th>
                  <th className="py-2 pr-3 font-medium">뜻</th>
                  <th className="py-2 font-medium">예문</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={i} className="border-b border-neutral-100 align-top dark:border-neutral-800">
                    <td className="py-2 pr-3 text-neutral-400">{row.day}</td>
                    <td className="py-2 pr-3 font-semibold text-accent dark:text-accent-light">{row.word}</td>
                    <td className="py-2 pr-3 text-neutral-700 dark:text-neutral-300">{row.meaning}</td>
                    <td className="py-2 text-neutral-500 dark:text-neutral-400">{row.example}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-neutral-400">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {mode === "flashcards" && <Flashcards entries={entries} />}
      {mode === "quiz" && <VocabQuiz entries={entries} />}
    </div>
  );
}
