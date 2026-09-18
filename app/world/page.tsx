import type { Metadata } from "next";
import { Quicksand, Caveat } from "next/font/google";
import WorldMount from "./WorldMount";

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
  title: "HOP Bahamas — Rides, Tours & a Personal Concierge, One App, Any Hour",
  description:
    "From the airport to the last toast of the night — HOP is Nassau's ride app with a personal concierge built in. Rides, tours, and reservations, one tap, 24/7.",
  alternates: { canonical: "/world" },
};

export default function WorldPage() {
  return (
    <div
      id="hop-world-root"
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
      {/* Server-rendered copy for crawlers, link previews, and no-JS visitors.
          The engine hides this block itself once it mounts (see scrub-engine.js). */}
      <div data-sw-seo style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem", color: "#e7e2da" }}>
        <h1>HOP Bahamas — rides, tours &amp; a personal concierge, one app, any hour</h1>

        <h2>From the second you land</h2>
        <p>One tap in the HOP app and you&apos;re moving — rides, tours, and a personal concierge, no extra cost.</p>

        <h2>Through Nassau</h2>
        <p>Past the harbor, the cruise port, the color of Bay Street — HOP knows the way.</p>

        <h2>By land or by sea</h2>
        <p>Your concierge booked the boat too. Atlantis, dead ahead.</p>

        <h2>Concierge-picked lunch</h2>
        <p>Walk the Marina Village like you belong — because today, you do.</p>

        <h2>No extra cost</h2>
        <p>Fresh Bahamian lobster, the yachts behind it. Arranged before you asked.</p>

        <h2>The Bahamas only locals know</h2>
        <p>Beyond the resorts there&apos;s a beach with your name on it. HOP takes you there.</p>

        <h2>The night is yours</h2>
        <p>Dinner, casino, show — the night runs on your schedule, not a timetable.</p>

        <h2>Any hour</h2>
        <p>From the second you land to the last toast of the night: one app, 24/7.</p>

        <p>
          <a href="/get-the-app">Book a HOP</a>
        </p>
      </div>

      <WorldMount />
    </div>
  );
}
