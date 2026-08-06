import { getAllDays } from "./content";

export type VocabEntry = { day: number; word: string; meaning: string; example: string };

export function getAllVocab(): VocabEntry[] {
  return getAllDays().flatMap((d) => d.vocab.map((v) => ({ day: d.day, ...v })));
}
