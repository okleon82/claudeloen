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

function buildQuestion(entries: VocabEntry[]) {
  const answer = entries[Math.floor(Math.random() * entries.length)];
  const distractors = shuffle(entries.filter((e) => e.word !== answer.word)).slice(0, 3);
  const options = shuffle([answer, ...distractors]);
  return { answer, options };
}

export function VocabQuiz({ entries }: { entries: VocabEntry[] }) {
  const [question, setQuestion] = useState(() => buildQuestion(entries));
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const canQuiz = entries.length >= 4;

  function choose(word: string) {
    if (selected) return;
    setSelected(word);
    setScore((s) => ({
      correct: s.correct + (word === question.answer.word ? 1 : 0),
      total: s.total + 1,
    }));
  }

  function next() {
    setQuestion(buildQuestion(entries));
    setSelected(null);
  }

  const scoreLabel = useMemo(
    () => (score.total ? `${score.correct} / ${score.total}` : "0 / 0"),
    [score]
  );

  if (!canQuiz) {
    return <p className="text-sm text-neutral-500">퀴즈를 시작하려면 단어가 4개 이상 필요합니다.</p>;
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4">
      <p className="text-right text-xs text-neutral-400">점수: {scoreLabel}</p>
      <div className="rounded-xl border border-neutral-200 bg-white p-5 text-center shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        <p className="text-xs text-neutral-400">Day {question.answer.day} · 이 단어의 뜻은?</p>
        <p className="mt-1 text-2xl font-bold text-accent dark:text-accent-light">{question.answer.word}</p>
      </div>
      <div className="grid gap-2">
        {question.options.map((opt) => {
          const isCorrect = opt.word === question.answer.word;
          const isSelected = selected === opt.word;
          const showState = selected !== null;
          return (
            <button
              key={opt.word}
              type="button"
              onClick={() => choose(opt.word)}
              disabled={showState}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                showState && isCorrect
                  ? "border-green-300 bg-correct dark:border-green-800 dark:bg-correct-dark"
                  : showState && isSelected
                    ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
                    : "border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
              }`}
            >
              {opt.meaning}
            </button>
          );
        })}
      </div>
      {selected && (
        <button
          type="button"
          onClick={next}
          className="self-center rounded-lg bg-accent px-4 py-1.5 text-sm text-white hover:bg-accent-dark"
        >
          다음 문제 →
        </button>
      )}
    </div>
  );
}
