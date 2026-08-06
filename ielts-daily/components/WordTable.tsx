"use client";

import { useMemo, useState } from "react";

type Row = { term: string; meaning: string; example: string };

export function WordTable({ rows, termHeader }: { rows: Row[]; termHeader: string }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) => r.term.toLowerCase().includes(q) || r.meaning.toLowerCase().includes(q)
    );
  }, [rows, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`${termHeader} 검색...`}
        className="mb-3 w-full max-w-xs rounded-lg border border-neutral-300 px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 print:hidden"
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
              <th className="py-2 pr-3 font-medium">{termHeader}</th>
              <th className="py-2 pr-3 font-medium">뜻</th>
              <th className="py-2 font-medium">예문</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-neutral-100 align-top dark:border-neutral-800">
                <td className="py-2 pr-3 font-semibold text-accent dark:text-accent-light">{row.term}</td>
                <td className="py-2 pr-3 text-neutral-700 dark:text-neutral-300">{row.meaning}</td>
                <td className="py-2 text-neutral-500 dark:text-neutral-400">{row.example}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-neutral-400">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
