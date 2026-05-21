import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy — HOP Bahamas",
  description:
    "HOP Bahamas cancellation, refund, and no-show policy for on-demand rides, scheduled bookings, and day tours.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const CARD2 = "#222018";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

export default function CancellationPolicyPage() {
  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT }}>
      <Navbar />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ color: ORANGE, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: TEXT, marginBottom: "0.5rem", lineHeight: 1.2 }}>
          Cancellation & Refund Policy
        </h1>
        <p style={{ color: MUTED, fontSize: "0.875rem", marginBottom: "2.5rem" }}>
          Quicky Solutions LLC (dba HOP Bahamas) · Effective Date: March 1, 2026
        </p>

        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.8 }}>
            This Policy governs the terms, conditions, and fees applicable to the cancellation of any service booked through the HOP Bahamas platform, operated by Quicky Solutions LLC. By booking a service, you agree to be bound by these terms in their entirety.
          </p>
        </div>

        {/* Quick Reference Table */}
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Quick Reference
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <th style={{ textAlign: "left", padding: "0.5rem 1rem 0.5rem 0", color: MUTED, fontWeight: 600 }}>Scenario</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0", color: MUTED, fontWeight: 600 }}>Refund</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["On-demand — before driver match", "100%", "#4ade80"],
                  ["On-demand — within 2-min grace period", "100%", "#4ade80"],
                  ["On-demand — driver en route", "$3.00 fee", MUTED],
                  ["On-demand — no-show / after arrival", "$5.00 fee", MUTED],
                  ["Scheduled — >24 hrs before pickup", "100%", "#4ade80"],
                  ["Scheduled — 4–24 hrs before pickup", "75%", "#facc15"],
                  ["Scheduled — 2–4 hrs before pickup", "65%", "#facc15"],
                  ["Scheduled — <2 hrs before pickup", "No refund", "#f87171"],
                  ["Day tour — >7 days before", "100%", "#4ade80"],
                  ["Day tour — 3–7 days before", "90%", "#4ade80"],
                  ["Day tour — 48 hrs to 3 days before", "75%", "#facc15"],
                  ["Day tour — <48 hrs before", "No refund", "#f87171"],
                ].map(([scenario, refund, color], i) => (
                  <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                    <td style={{ padding: "0.5rem 1rem 0.5rem 0", color: TEXT }}>{scenario}</td>
                    <td style={{ padding: "0.5rem 0", color: color, fontWeight: 600 }}>{refund}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <PolicySection title="Section 1 — On-Demand Cab Rides">
          <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.8 }}>An on-demand ride is any ride initiated for immediate dispatch, without a designated future pickup time.</p>
          <PolicyItem label="1.1 Cancellation Prior to Driver Match">Full refund. No cancellation fee. Reversal processed within five (5) business days.</PolicyItem>
          <PolicyItem label="1.2 Grace Period Following Driver Match">Full refund if cancelled within two (2) minutes of driver confirmation and before the driver has commenced travel toward the pickup location.</PolicyItem>
          <PolicyItem label="1.3 Cancellation After Driver is En Route">A cancellation fee of $3.00 USD applies. This fee is transferred in full to the assigned driver. No portion is retained by HOP.</PolicyItem>
          <PolicyItem label="1.4 Rider No-Show or Cancellation After Driver Arrival">A no-show fee of $5.00 USD applies if the Rider fails to appear within seven (7) minutes of the driver&apos;s GPS-confirmed arrival, or cancels after the driver has arrived. Three (3) or more no-show events within 90 days may result in account suspension.</PolicyItem>
          <PolicyItem label="1.5 Mid-Trip Cancellation">The Rider is charged a fare based on actual time elapsed and distance traveled as recorded by GPS, or the applicable minimum fare, whichever is greater.</PolicyItem>
          <PolicyItem label="1.6 Valid Reasons for Cancellation Without Penalty">
            A full refund applies, with no fee, where: (a) the driver&apos;s ETA exceeds the original estimate by more than ten (10) minutes; (b) the driver fails to make material progress toward pickup; (c) the driver&apos;s vehicle or details do not match the Platform; or (d) the Rider reports a credible safety concern prior to pickup.
          </PolicyItem>
        </PolicySection>

        <PolicySection title="Section 2 — Scheduled Cab Bookings">
          <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.8 }}>A scheduled booking is any ride with a designated future pickup time, booked between one (1) hour and seven (7) calendar days in advance.</p>
          <PolicyItem label="2.1 Cancellation More Than 24 Hours Prior">100% refund. No cancellation fee.</PolicyItem>
          <PolicyItem label="2.2 Cancellation Between 4 and 24 Hours Prior">75% refund. HOP retains 25%; driver receives 5% of original fare.</PolicyItem>
          <PolicyItem label="2.3 Cancellation Between 2 and 4 Hours Prior">65% refund. HOP retains 35%; driver receives 10% of original fare.</PolicyItem>
          <PolicyItem label="2.4 Cancellation Less Than 2 Hours Prior">No refund. HOP retains full fare; driver receives 25% of original fare.</PolicyItem>
        </PolicySection>

        <PolicySection title="Section 3 — Day Tours">
          <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.8 }}>A day tour is any pre-packaged or customized island tour booked up to seven (7) calendar days in advance.</p>
          <PolicyItem label="3.1 Cancellation More Than 7 Days Prior">100% refund. No cancellation fee.</PolicyItem>
          <PolicyItem label="3.2 Cancellation Between 3 and 7 Days Prior">90% refund. HOP retains 10%.</PolicyItem>
          <PolicyItem label="3.3 Cancellation Between 48 Hours and 3 Days Prior">75% refund. HOP retains 25%.</PolicyItem>
          <PolicyItem label="3.4 Cancellation Less Than 48 Hours Prior">No refund. HOP retains full fare.</PolicyItem>
          <PolicyItem label="3.5 HOP-Initiated Cancellation">If HOP or the driver cancels for any reason attributable to the Platform or driver, the Rider receives a 100% refund regardless of timing.</PolicyItem>
        </PolicySection>

        <PolicySection title="Section 4 — General Provisions">
          <PolicyItem label="4.1 Refund Processing Time">All approved refunds are processed within five (5) to ten (10) business days, subject to the Rider&apos;s card issuer timelines.</PolicyItem>
          <PolicyItem label="4.2 Platform Abuse">HOP may levy a cancellation fee or suspend accounts with three (3) or more cancellations within any fifteen (15) minute timeframe.</PolicyItem>
          <PolicyItem label="4.3 Dispute Resolution">Disputes must be submitted through the HOP in-app support channel within thirty (30) calendar days. HOP issues a final written determination within five (5) business days.</PolicyItem>
          <PolicyItem label="4.4 Chargeback Policy">Riders who initiate chargebacks for completed services or valid cancellation fees may have their accounts permanently suspended.</PolicyItem>
          <PolicyItem label="4.5 Merchant of Record">Quicky Solutions LLC is the sole Merchant of Record for all transactions. All refunds and fees are processed exclusively by HOP.</PolicyItem>
        </PolicySection>

        <p style={{ color: MUTED, fontSize: "0.75rem", marginTop: "3rem", paddingTop: "1.5rem", borderTop: `1px solid ${BORDER}` }}>
          © 2026 Quicky Solutions LLC (dba HOP Bahamas). All Rights Reserved.
        </p>
      </main>
      <Footer />
    </div>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
      <h2 style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>{children}</div>
    </div>
  );
}

function PolicyItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span style={{ color: TEXT, fontWeight: 600, fontSize: "0.875rem" }}>{label}. </span>
      <span style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.8 }}>{children}</span>
    </div>
  );
}
