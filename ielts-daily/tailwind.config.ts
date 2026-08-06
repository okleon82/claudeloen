import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#7A1F2B",
          light: "#9A3B47",
          dark: "#5A1620",
        },
        surface: {
          DEFAULT: "#FBF3F3",
          dark: "#241a1b",
        },
        correct: {
          DEFAULT: "#F0F7F0",
          dark: "#16241a",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Pretendard Variable",
          "Noto Sans KR",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
