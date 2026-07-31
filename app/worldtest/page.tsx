import type { Metadata } from "next";
import { Quicksand, Caveat } from "next/font/google";
import WorldTestMount from "./WorldTestMount";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "HOP — continuity test",
  robots: { index: false, follow: false },
};

export default function WorldTestPage() {
  return (
    <div
      id="hop-worldtest-root"
      className={`${quicksand.variable} ${caveat.variable}`}
      style={
        {
          "--sw-bg": "#14130f",
          "--sw-ink": "#e7e2da",
          "--sw-ink-soft": "#a8a196",
          "--sw-accent": "#F5A020",
          "--sw-font-display": "var(--font-caveat), cursive",
          "--sw-font-body": "var(--font-quicksand), sans-serif",
          backgroundColor: "#14130f",
          minHeight: "100vh",
        } as React.CSSProperties
      }
    >
      <div data-sw-seo style={{ display: "none" }}>
        <h1>HOP continuity test</h1>
      </div>
      <WorldTestMount />
    </div>
  );
}
