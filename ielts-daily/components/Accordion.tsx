type AccordionProps = {
  title: string;
  open: boolean;
  onToggle: () => void;
  badge?: string;
  children: React.ReactNode;
  sectionClassName?: string;
};

export function Accordion({ title, open, onToggle, badge, children, sectionClassName }: AccordionProps) {
  return (
    <section
      className={`rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 print:break-inside-avoid print:border-neutral-300 print:shadow-none ${sectionClassName ?? ""}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-5 sm:py-4 print:hidden"
      >
        <span className="flex items-center gap-2 text-base font-semibold text-neutral-900 dark:text-neutral-50 sm:text-lg">
          {title}
          {badge && (
            <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-accent dark:bg-surface-dark dark:text-accent-light">
              {badge}
            </span>
          )}
        </span>
        <span
          className={`shrink-0 text-neutral-400 transition-transform duration-200 dark:text-neutral-500 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      <div className={`${open ? "block" : "hidden"} border-t border-neutral-100 px-4 py-4 dark:border-neutral-800 sm:px-5 sm:py-5 print:block print:border-t-0`}>
        {children}
      </div>
    </section>
  );
}
