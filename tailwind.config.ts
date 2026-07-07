import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#111111",
          gray: "#6b7280",
          light: "#f4f4f5",
        },
      },
    },
  },
  plugins: [],
};

export default config;
