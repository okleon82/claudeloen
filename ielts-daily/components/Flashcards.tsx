"use client";

import { useMemo, useState } from "react";

type VocabEntry = { day: number; word: string; meaning: string; example: string };

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Flashcards({ entries }: { entries: VocabEntry[] }) {
  const [order, setOrder] = useState(() => shuffle(entries.map((_, i) => i)));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = entries[order[index]];

  const progressLabel = useMemo(() => `${index + 1} / ${order.length}`, [index, order.length]);

  function go(delta: number) {
    setFlipped(false);
    setIndex((i) => (i + delta + order.length) % order.length);
  }

  function reshuffle() {
    setOrder(shuffle(entries.map((_, i) => i)));
    setIndex(0);
    setFlipped(false);
  }

  if (!current) {
    return <p className="text-sm text-neutral-500">단어 데이터가 없습니다.</p>;
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4">
      <p className="text-xs text-neutral-400">{progressLabel}</p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="flex h-56 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900"
      >
        {!flipped ? (
          <>
            <span className="text-2xl font-bold text-accent dark:text-accent-light">{current.word}</span>
            <span className="text-xs text-neutral-400">Day {current.day} · 클릭해서 뜻 보기</span>
          </>
        ) : (
          <>
            <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">{current.meaning}</span>
            <span className="max-w-xs text-sm text-neutral-500 dark:text-neutral-400">{current.example}</span>
          </>
        )}
      </button>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          ← 이전
        </button>
        <button
          type="button"
          onClick={reshuffle}
          className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          🔀 섞기
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="rounded-lg bg-accent px-3 py-1.5 text-sm text-white hover:bg-accent-dark"
        >
          다음 →
        </button>
      </div>
    </div>
  );
}
