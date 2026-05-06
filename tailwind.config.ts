import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hop: {
          bg: "#161616",
          card: "#1e1c14",
          "card-2": "#222018",
          orange: "#F5A020",
          "orange-dim": "#c47e14",
          text: "#f0ede8",
          muted: "#8a8070",
          green: "#3aad6e",
          red: "#E84040",
          border: "rgba(255,255,255,0.06)",
        },
      },
      fontFamily: {
        sans: [
          '"Helvetica Neue"',
          "Helvetica",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
      boxShadow: {
        "orange-glow": "0 0 24px rgba(245,160,32,0.25)",
        "orange-glow-lg": "0 0 48px rgba(245,160,32,0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
