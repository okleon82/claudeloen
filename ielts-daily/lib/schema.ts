import { z } from "zod";

const listeningPartASchema = z.object({
  script: z.string(),
  questions: z.array(z.string()).min(1),
  answers: z.array(z.string()).min(1),
});

const listeningPartBSchema = z.object({
  script: z.string(),
  questions: z
    .array(
      z.object({
        question: z.string(),
        options: z.array(z.string()).min(2),
      })
    )
    .min(1),
  answers: z.array(z.string()).min(1),
});

const qnaSchema = z.object({
  questions: z.array(z.string()).min(1),
  answers: z.array(z.string()).min(1),
});

const vocabItemSchema = z.object({
  word: z.string(),
  meaning: z.string(),
  example: z.string(),
});

const idiomItemSchema = z.object({
  phrase: z.string(),
  meaning: z.string(),
  example: z.string(),
});

const linkSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

export const daySchema = z.object({
  day: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  weekday: z.enum(["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"]),
  topic: z.string().min(1),
  listening: z.object({
    partA: listeningPartASchema,
    partB: listeningPartBSchema,
  }),
  reading: z.object({
    title: z.string(),
    article: z.string(),
    tfng: qnaSchema,
    completion: qnaSchema,
  }),
  speaking: z.object({
    part1: z.array(z.string()).min(1),
    part2: z.string(),
    part3: z.array(z.string()).min(1),
  }),
  writing: z.object({
    task1: z.object({
      type: z.enum(["Formal", "Semi-formal", "Informal"]),
      prompt: z.string(),
      outline: z.string(),
    }),
    task2: z.object({
      prompt: z.string(),
      outline: z.string(),
    }),
    feedback: z.object({
      before: z.string(),
      comment: z.string(),
      after: z.string(),
    }),
  }),
  vocab: z.array(vocabItemSchema),
  idioms: z.array(idiomItemSchema),
  recommendations: z.object({
    article: linkSchema,
    podcast: linkSchema,
  }),
});

export type Day = z.infer<typeof daySchema>;
export type VocabItem = z.infer<typeof vocabItemSchema>;
export type IdiomItem = z.infer<typeof idiomItemSchema>;
