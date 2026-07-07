"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNav({ active }: { active: "dashboard" | "settings" }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
      <nav className="flex gap-4 text-sm font-medium">
        <Link href="/admin" className={active === "dashboard" ? "text-brand-black" : "text-brand-gray"}>
          예약 대시보드
        </Link>
        <Link
          href="/admin/settings"
          className={active === "settings" ? "text-brand-black" : "text-brand-gray"}
        >
          매장 설정
        </Link>
      </nav>
      <button onClick={handleLogout} className="text-sm text-brand-gray">
        로그아웃
      </button>
    </div>
  );
}
