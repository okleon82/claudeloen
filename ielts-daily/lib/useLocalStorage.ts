"use client";

import { useEffect, useState } from "react";

/**
 * Same API as useState, but persisted to localStorage under `key`.
 * Reads lazily on mount (after hydration) so SSR output stays consistent.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable (e.g. private mode) — fail silently
    }
  }, [key, value, hydrated]);

  return [value, setValue] as const;
}
