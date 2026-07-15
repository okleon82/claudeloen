import type { Metadata } from "next";
import "./globals.css";
import { meta } from "@/lib/portfolio/content";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#f9f9f7] text-[#0b0b0b]">{children}</body>
    </html>
  );
}
