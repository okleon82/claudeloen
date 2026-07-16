import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site/content";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://claudeloen.vercel.app"),
  title: `${site.name} — Business Growth Strategist`,
  description: site.philosophy,
  keywords: ["Business Growth", "Brand Strategy", "Commercial Planning", "Business Analytics", "Leon"],
  openGraph: {
    title: `${site.name} — Business Growth Strategist`,
    description: site.philosophy,
    type: "profile",
    url: "https://claudeloen.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Business Growth Strategist`,
    description: site.philosophy,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
