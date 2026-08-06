"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Day } from "@/lib/schema";
import { Accordion } from "./Accordion";
import { Reveal } from "./Reveal";
import { ProgressBar } from "./ProgressBar";
import { WordTable } from "./WordTable";
import { WritingFeedback } from "./WritingFeedback";
import { CompletionCheckbox } from "./CompletionCheckbox";
import { PrintButton } from "./PrintButton";

type OpenState = {
  listening: boolean;
  reading: boolean;
  speaking: boolean;
  writing: boolean;
  vocab: boolean;
  idioms: boolean;
  answers: boolean;
  recommendations: boolean;
};

const DEFAULT_OPEN: OpenState = {
  listening: true,
  reading: false,
  speaking: false,
  writing: false,
  vocab: false,
  idioms: false,
  answers: false,
  recommendations: false,
};

export function DaySections({ day }: { day: Day }) {
  const [open, setOpen] = useLocalStorage<OpenState>(`ielts-open-day-${day.day}`, DEFAULT_OPEN);
  const [openedOnce, setOpenedOnce] = useLocalStorage<Record<string, boolean>>(
    `ielts-progress-day-${day.day}`,
    {}
  );

  function toggle(key: keyof OpenState) {
    const next = !open[key];
    setOpen({ ...open, [key]: next });
    if (next && !openedOnce[key]) {
      setOpenedOnce({ ...openedOnce, [key]: true });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ProgressBar opened={openedOnce} />
        <div className="flex items-center gap-3">
          <CompletionCheckbox day={day.day} />
          <PrintButton />
        </div>
      </div>

      <Accordion title="🎧 Listening" open={open.listening} onToggle={() => toggle("listening")}>
        <div className="space-y-6">
          <div>
            <h4 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-100">Part A</h4>
            <ol className="mb-3 list-decimal space-y-1.5 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {day.listening.partA.questions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
            <Reveal label="스크립트 보기">
              <p className="whitespace-pre-wrap rounded-lg bg-surface p-3 text-sm leading-relaxed text-neutral-700 dark:bg-surface-dark dark:text-neutral-300">
                {day.listening.partA.script}
              </p>
            </Reveal>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-100">Part B</h4>
            <ol className="mb-3 list-decimal space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {day.listening.partB.questions.map((q, i) => (
                <li key={i}>
                  <p>{q.question}</p>
                  <ul className="mt-1 space-y-0.5 pl-2 text-neutral-500 dark:text-neutral-400">
                    {q.options.map((opt, oi) => (
                      <li key={oi}>{opt}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <Reveal label="스크립트 보기">
              <p className="whitespace-pre-wrap rounded-lg bg-surface p-3 text-sm leading-relaxed text-neutral-700 dark:bg-surface-dark dark:text-neutral-300">
                {day.listening.partB.script}
              </p>
            </Reveal>
          </div>
        </div>
      </Accordion>

      <Accordion title="📖 Reading" open={open.reading} onToggle={() => toggle("reading")}>
        <div className="space-y-5">
          <div>
            <h4 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-100">{day.reading.title}</h4>
            <p className="whitespace-pre-wrap rounded-lg bg-surface p-3 text-sm leading-relaxed text-neutral-700 dark:bg-surface-dark dark:text-neutral-300">
              {day.reading.article}
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-100">
              Task A — True / False / Not Given
            </h4>
            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {day.reading.tfng.questions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-100">Task B — Sentence Completion</h4>
            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {day.reading.completion.questions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          </div>
        </div>
      </Accordion>

      <Accordion title="🗣️ Speaking" open={open.speaking} onToggle={() => toggle("speaking")}>
        <div className="space-y-5">
          <div>
            <h4 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-100">Part 1</h4>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {day.speaking.part1.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-100">Part 2 — Cue Card</h4>
            <p className="whitespace-pre-wrap rounded-lg bg-surface p-3 text-sm leading-relaxed text-neutral-700 dark:bg-surface-dark dark:text-neutral-300">
              {day.speaking.part2}
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-100">Part 3</h4>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {day.speaking.part3.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        </div>
      </Accordion>

      <Accordion title="✍️ Writing" open={open.writing} onToggle={() => toggle("writing")}>
        <div className="space-y-6">
          <div>
            <h4 className="mb-2 flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-100">
              Task 1
              <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-accent dark:bg-surface-dark dark:text-accent-light">
                {day.writing.task1.type}
              </span>
            </h4>
            <p className="mb-2 whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {day.writing.task1.prompt}
            </p>
            <p className="whitespace-pre-wrap rounded-lg bg-surface p-3 text-xs leading-relaxed text-neutral-600 dark:bg-surface-dark dark:text-neutral-400">
              <span className="font-semibold">Outline: </span>
              {day.writing.task1.outline}
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-100">Task 2</h4>
            <p className="mb-2 whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {day.writing.task2.prompt}
            </p>
            <p className="whitespace-pre-wrap rounded-lg bg-surface p-3 text-xs leading-relaxed text-neutral-600 dark:bg-surface-dark dark:text-neutral-400">
              <span className="font-semibold">Outline: </span>
              {day.writing.task2.outline}
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-100">첨삭 예시</h4>
            <WritingFeedback feedback={day.writing.feedback} />
          </div>
        </div>
      </Accordion>

      <Accordion title="📚 단어장" open={open.vocab} onToggle={() => toggle("vocab")}>
        <WordTable
          termHeader="단어"
          rows={day.vocab.map((v) => ({ term: v.word, meaning: v.meaning, example: v.example }))}
        />
      </Accordion>

      <Accordion title="💬 숙어장" open={open.idioms} onToggle={() => toggle("idioms")}>
        <WordTable
          termHeader="숙어"
          rows={day.idioms.map((i) => ({ term: i.phrase, meaning: i.meaning, example: i.example }))}
        />
      </Accordion>

      <div id="answer-key-accordion">
        <Accordion title="✅ 정답지" open={open.answers} onToggle={() => toggle("answers")}>
          <div className="space-y-4 text-sm">
            <AnswerList title="Listening Part A" answers={day.listening.partA.answers} />
            <AnswerList title="Listening Part B" answers={day.listening.partB.answers} />
            <AnswerList title="Reading — TFNG" answers={day.reading.tfng.answers} />
            <AnswerList title="Reading — Completion" answers={day.reading.completion.answers} />
          </div>
        </Accordion>
      </div>

      <Accordion
        title="🔗 오늘의 추천 Article / Podcast"
        open={open.recommendations}
        onToggle={() => toggle("recommendations")}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <RecommendationLink label="Article" title={day.recommendations.article.title} url={day.recommendations.article.url} />
          <RecommendationLink label="Podcast" title={day.recommendations.podcast.title} url={day.recommendations.podcast.url} />
        </div>
      </Accordion>
    </div>
  );
}

function AnswerList({ title, answers }: { title: string; answers: string[] }) {
  return (
    <div>
      <h4 className="mb-1.5 font-semibold text-neutral-800 dark:text-neutral-100">{title}</h4>
      <ol className="list-decimal space-y-1 pl-5 text-neutral-700 dark:text-neutral-300">
        {answers.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ol>
    </div>
  );
}

function RecommendationLink({ label, title, url }: { label: string; title: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-neutral-200 p-3 text-sm hover:border-accent hover:bg-surface dark:border-neutral-700 dark:hover:border-accent-light dark:hover:bg-surface-dark"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">{label}</p>
      <p className="mt-0.5 font-medium text-accent dark:text-accent-light">{title} ↗</p>
    </a>
  );
}
