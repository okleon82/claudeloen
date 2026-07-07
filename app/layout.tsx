import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "점장AI - 전화 받기 힘든 사장님을 위한 AI 예약비서",
  description: "소형 음식점/이자카야를 위한 AI 예약비서 서비스, 점장AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-brand-black">{children}</body>
    </html>
  );
}
