import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "IELTS Daily",
  description: "매일 오후 5시, 나만의 IELTS General Training 연습 세트",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('ielts-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen font-sans">
        <nav className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold text-accent dark:text-accent-light">
              IELTS Daily
            </Link>
            <div className="flex items-center gap-1 text-sm">
              <Link href="/" className="rounded-lg px-2.5 py-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
                오늘
              </Link>
              <Link href="/archive" className="rounded-lg px-2.5 py-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
                아카이브
              </Link>
              <Link href="/vocab" className="rounded-lg px-2.5 py-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
                단어장
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-3xl px-4 py-6 sm:py-8">{children}</main>
        <footer className="mx-auto max-w-3xl px-4 py-8 text-center text-xs text-neutral-400 print:hidden">
          매일 오후 5시, 꾸준히. 🔥
        </footer>
      </body>
    </html>
  );
}
