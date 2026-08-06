"use client";

import { useState } from "react";

type RevealProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

/** A "click to show" gate used for listening scripts and answer keys. */
export function Reveal({ label, children, className }: RevealProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg border border-accent/30 bg-surface px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/10 dark:border-accent-light/30 dark:bg-surface-dark dark:text-accent-light print:hidden"
        >
          {label}
        </button>
      )}
      <div className={open ? "block" : "hidden print:block"}>{children}</div>
    </div>
  );
}
