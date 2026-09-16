import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette "atelier" — bleu nuit / acier / accent bleu signalétique
        navy: {
          950: "#0A1B2E",
          900: "#0F2A4A",
          800: "#173a5e",
          700: "#20496f",
        },
        steel: {
          50: "#F5F7F9",
          100: "#EAEEF2",
          200: "#D6DEE6",
          300: "#B4C1CD",
          400: "#8A9BAB",
          500: "#647688",
          600: "#4A5A6A",
          700: "#374553",
          800: "#28323d",
        },
        signal: {
          500: "#1D6FD6",
          600: "#175BB0",
          700: "#134A8F",
        },
        amber: {
          500: "#D98A1E",
        },
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
