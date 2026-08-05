"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Section, StatTile } from "@/components/Section";
import { computeGoalMonthsLeft, computeGoalTotal, formatWon, groupGoalItemsByCategory } from "@/lib/calc";
import { GoalPlanItem, GoalPlanSettings } from "@/lib/types";

type ItemDraft = Omit<GoalPlanItem, "id"> & { id?: string };

const EMPTY_ITEM: ItemDraft = { category: "", item: "", expected_month: null, amount: 0, note: "", sort_order: 0 };

export default function GoalClient({
  initialSettings,
  initialItems,
}: {
  initialSettings: GoalPlanSettings;
  initialItems: GoalPlanItem[];
}) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [settingsDraft, setSettingsDraft] = useState(initialSettings);
  const [items, setItems] = useState<GoalPlanItem[]>(initialItems);
  const [itemDrafts, setItemDrafts] = useState<Record<string, ItemDraft>>(
    Object.fromEntries(initialItems.map((i) => [i.id, { ...i }]))
  );
  const [newItem, setNewItem] = useState<ItemDraft>(EMPTY_ITEM);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const monthsLeft = useMemo(() => computeGoalMonthsLeft(settings.target_month, new Date()), [settings.target_month]);
  const groups = useMemo(() => groupGoalItemsByCategory(items), [items]);
  const total = useMemo(() => computeGoalTotal(items), [items]);

  async function saveSettings() {
    setSavingKey("settings");
    try {
      const res = await fetch("/api/goal-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsDraft),
      });
      const data = await res.json();
      if (data.settings) setSettings(data.settings);
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  function updateItemDraft(id: string, patch: Partial<ItemDraft>) {
    setItemDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function saveItem(id: string) {
    setSavingKey(id);
    try {
      const res = await fetch("/api/goal-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemDrafts[id]),
      });
      const data = await res.json();
      if (data.item) setItems((prev) => prev.map((i) => (i.id === id ? data.item : i)));
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  async function deleteItem(id: string) {
    if (!confirm("이 항목을 삭제할까요?")) return;
    setSavingKey(id);
    try {
      await fetch(`/api/goal-items/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  async function addItem() {
    if (!newItem.category || !newItem.item) return;
    setSavingKey("new");
    try {
      const res = await fetch("/api/goal-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newItem, sort_order: items.length + 1 }),
      });
      const data = await res.json();
      if (data.item) {
        setItems((prev) => [...prev, data.item]);
        setItemDrafts((prev) => ({ ...prev, [data.item.id]: { ...data.item } }));
        setNewItem(EMPTY_ITEM);
      }
      router.refresh();
    } finally {
      setSavingKey(null);
    }
  }

  return (
    <div>
      <Section title="자금확보플랜">
        <label className="block text-xs text-brand-gray">
          제목
          <input
            type="text"
            value={settingsDraft.title}
            onChange={(e) => setSettingsDraft((s) => ({ ...s, title: e.target.value }))}
            className="input mt-1"
          />
        </label>
        <label className="mt-2 block text-xs text-brand-gray">
          목표월
          <input
            type="month"
            value={settingsDraft.target_month ?? ""}
            onChange={(e) => setSettingsDraft((s) => ({ ...s, target_month: e.target.value }))}
            className="input mt-1"
          />
        </label>
        <label className="mt-2 block text-xs text-brand-gray">
          메모
          <textarea
            value={settingsDraft.note ?? ""}
            onChange={(e) => setSettingsDraft((s) => ({ ...s, note: e.target.value }))}
            className="input mt-1"
            rows={2}
          />
        </label>
        <button
          onClick={saveSettings}
          disabled={savingKey === "settings"}
          className="mt-3 w-full rounded-xl bg-brand-black py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {savingKey === "settings" ? "저장 중..." : "저장"}
        </button>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <StatTile label="목표까지 남은 개월수" value={monthsLeft !== null ? `${monthsLeft}개월` : "-"} />
          <StatTile label="목표자금 총액" value={formatWon(total)} />
        </div>
      </Section>

      {groups.map((group) => (
        <Section key={group.category} title={group.category} description={`소계 ${formatWon(group.subtotal)}`}>
          {group.items.map((item) => {
            const draft = itemDrafts[item.id] ?? item;
            return (
              <div key={item.id} className="mb-3 rounded-xl border border-gray-100 p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={draft.item}
                    onChange={(e) => updateItemDraft(item.id, { item: e.target.value })}
                    className="input flex-1 font-medium"
                  />
                  <button onClick={() => deleteItem(item.id)} className="text-xs text-red-600">
                    삭제
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <label className="block text-xs text-brand-gray">
                    예상 시기
                    <input
                      type="month"
                      value={draft.expected_month ?? ""}
                      onChange={(e) => updateItemDraft(item.id, { expected_month: e.target.value })}
                      className="input mt-1"
                    />
                  </label>
                  <label className="block text-xs text-brand-gray">
                    금액
                    <input
                      type="number"
                      value={draft.amount}
                      onChange={(e) => updateItemDraft(item.id, { amount: Number(e.target.value) })}
                      className="input mt-1"
                    />
                  </label>
                </div>
                <label className="mt-2 block text-xs text-brand-gray">
                  비고
                  <input
                    type="text"
                    value={draft.note ?? ""}
                    onChange={(e) => updateItemDraft(item.id, { note: e.target.value })}
                    className="input mt-1"
                  />
                </label>
                <button
                  onClick={() => saveItem(item.id)}
                  disabled={savingKey === item.id}
                  className="mt-2 w-full rounded-lg bg-brand-black py-2 text-xs font-semibold text-white disabled:opacity-50"
                >
                  {savingKey === item.id ? "저장 중..." : "저장"}
                </button>
              </div>
            );
          })}
        </Section>
      ))}

      <Section title="새 항목 추가">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="카테고리"
            value={newItem.category}
            onChange={(e) => setNewItem((i) => ({ ...i, category: e.target.value }))}
            className="input"
          />
          <input
            type="text"
            placeholder="항목명"
            value={newItem.item}
            onChange={(e) => setNewItem((i) => ({ ...i, item: e.target.value }))}
            className="input"
          />
          <input
            type="month"
            value={newItem.expected_month ?? ""}
            onChange={(e) => setNewItem((i) => ({ ...i, expected_month: e.target.value }))}
            className="input"
          />
          <input
            type="number"
            placeholder="금액"
            value={newItem.amount || ""}
            onChange={(e) => setNewItem((i) => ({ ...i, amount: Number(e.target.value) }))}
            className="input"
          />
          <input
            type="text"
            placeholder="비고"
            value={newItem.note ?? ""}
            onChange={(e) => setNewItem((i) => ({ ...i, note: e.target.value }))}
            className="input col-span-2"
          />
        </div>
        <button
          onClick={addItem}
          disabled={savingKey === "new"}
          className="mt-2 w-full rounded-lg bg-brand-black py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          {savingKey === "new" ? "추가 중..." : "추가"}
        </button>
      </Section>
    </div>
  );
}
