"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const TABS = [
  { href: "/", label: "이번달" },
  { href: "/monthly", label: "월별기록" },
  { href: "/debts", label: "장기플랜" },
  { href: "/goal", label: "자금확보" },
  { href: "/allocation", label: "여유자금" },
  { href: "/etf", label: "ETF" },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") return null;

  async function handleLogout() {
    await fetch("/api/login", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 pt-3">
        <span className="text-sm font-bold">자금관리 · ETF증식자산</span>
        <button onClick={handleLogout} className="text-xs text-brand-gray">
          로그아웃
        </button>
      </div>
      <nav className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-2 pb-1 pt-2 text-sm">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`shrink-0 rounded-full px-3 py-1.5 font-medium ${
                active ? "bg-brand-black text-white" : "text-brand-gray hover:bg-brand-light"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
