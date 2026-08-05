import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "자금관리 · ETF증식자산",
  description: "개인 자금관리 · 부채상환 · ETF 장기투자 시뮬레이션 웹앱",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-brand-light text-brand-black">
        <NavBar />
        <div className="mx-auto max-w-3xl px-4 pb-24 pt-4">{children}</div>
      </body>
    </html>
  );
}
