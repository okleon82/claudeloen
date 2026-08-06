import { getAllVocab } from "@/lib/vocab";
import { VocabBrowser } from "@/components/VocabBrowser";

export default function VocabPage() {
  const entries = getAllVocab();

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">단어장 모음</h1>
        <p className="text-neutral-500 dark:text-neutral-400">모든 Day의 단어 {entries.length}개를 모았어요.</p>
      </header>
      {entries.length === 0 ? (
        <p className="text-neutral-500">아직 단어 데이터가 없습니다.</p>
      ) : (
        <VocabBrowser entries={entries} />
      )}
    </div>
  );
}
