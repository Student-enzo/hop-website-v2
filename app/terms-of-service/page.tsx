import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — HOP Bahamas",
  description:
    "Terms of Service and Rider Agreement for HOP Bahamas. The full agreement governing your use of the HOP platform.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

export default function TermsOfServicePage() {
  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT }}>
      <Navbar />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ color: ORANGE, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: TEXT, marginBottom: "0.5rem", lineHeight: 1.2 }}>
          Terms of Service
        </h1>
        <p style={{ color: MUTED, fontSize: "0.875rem", marginBottom: "2.5rem" }}>
          Quicky Solutions LLC (dba HOP Bahamas) · Effective Date: March 1, 2026
        </p>

        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.8 }}>
            These Terms of Service and Rider Agreement (the &ldquo;Agreement&rdquo;) constitute a legally binding contract between you (&ldquo;User,&rdquo; &ldquo;Rider,&rdquo; or &ldquo;Customer&rdquo;) and Quicky Solutions LLC, a limited liability company incorporated under the laws of the State of Florida, United States of America, operating under the trade name HOP Bahamas. By accessing or using the HOP mobile application, website, or any related services, you acknowledge that you have read, understood, and agree to be bound by this Agreement in its entirety.
          </p>
        </div>

        <PolicySection title="Article 1 — Nature of the Platform & Service Provider Designation">
          <PolicyItem label="1.1 Platform as Sole Service Provider">
            HOP is a technology platform that connects riders with independent, licensed taxi and transportation operators in The Commonwealth of The Bahamas. Quicky Solutions LLC is the sole operator of the HOP platform and is the Merchant of Record for all transactions. Drivers are independent contractors; they are not employees, agents, or representatives of Quicky Solutions LLC.
          </PolicyItem>
          <PolicyItem label="1.2 Driver Classification">
            All drivers operating on the HOP platform are independent contractors. Nothing in this Agreement shall be construed to create an employment relationship, partnership, joint venture, agency, or franchise between HOP and any driver. Drivers are solely responsible for their own tax obligations, insurance, vehicle maintenance, and compliance with applicable laws.
          </PolicyItem>
          <PolicyItem label="1.3 Local Operations">
            Transportation services facilitated through HOP are delivered in The Commonwealth of The Bahamas by HOP Solutions, a locally registered Bahamian entity operating under a formal Operational Agreement with Quicky Solutions LLC, in accordance with the Bahamas National Investment Policy and the Road Traffic Act of The Bahamas.
          </PolicyItem>
        </PolicySection>

        <PolicySection title="Article 2 — Eligibility & Account Registration">
          <PolicyItem label="2.1 Age Requirement">You must be at least eighteen (18) years of age to create an account or use the HOP platform.</PolicyItem>
          <PolicyItem label="2.2 Account Accuracy">You agree to provide accurate, current, and complete information during registration. HOP reserves the right to suspend accounts where false or misleading information has been provided.</PolicyItem>
          <PolicyItem label="2.3 Account Security">You are solely responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.</PolicyItem>
        </PolicySection>

        <PolicySection title="Article 3 — Services, Booking & Payment">
          <PolicyItem label="3.1 Services Offered">HOP facilitates: (a) On-Demand Cab Rides — real-time ride requests matched to an available driver; and (b) Scheduled Cab Bookings and Day Tours — advance reservations confirmed at the time of booking.</PolicyItem>
          <PolicyItem label="3.2 Advance Booking Windows">HOP accepts advance customer payments up to seven (7) days in advance for Scheduled Cab Bookings and Day Tours.</PolicyItem>
          <PolicyItem label="3.3 Payment Authorization & Capture">For advance bookings, the Rider&apos;s payment method is authorized and captured at the time of booking. For on-demand rides, payment is captured upon trip completion. No cash payments are accepted under any circumstances.</PolicyItem>
          <PolicyItem label="3.4 Cashless Platform">HOP operates as a fully cashless platform. Any driver accepting cash payment may have their account immediately terminated.</PolicyItem>
          <PolicyItem label="3.5 Pricing">All fares are calculated in accordance with HOP&apos;s published pricing schedule, displayed to the Rider prior to booking confirmation. Confirmed bookings are honored at the fare displayed at the time of confirmation.</PolicyItem>
        </PolicySection>

        <PolicySection title="Article 4 — Cancellations, Refunds & No-Shows">
          <PolicyItem label="4.1 Cancellation Policy">All cancellations are governed by HOP&apos;s Cancellation, Refund & No-Show Policy, incorporated by reference into this Agreement and available on the HOP website.</PolicyItem>
          <PolicyItem label="4.2 Platform Liability for Refunds">Quicky Solutions LLC, as Merchant of Record, bears sole financial responsibility for all approved refunds. Approved refunds are processed within five (5) to ten (10) business days.</PolicyItem>
          <PolicyItem label="4.3 Disputes & Chargebacks">Any Rider who disputes a charge must first submit a formal dispute through HOP&apos;s in-app support within thirty (30) days. Riders who initiate card-issuer chargebacks without exhausting HOP&apos;s internal process may have their accounts permanently suspended.</PolicyItem>
        </PolicySection>

        <PolicySection title="Article 5 — Rider Conduct & Prohibited Uses">
          <PolicyItem label="5.1 Prohibited Conduct">Riders agree not to: (a) use the Platform for any unlawful purpose; (b) harass, threaten, or intimidate any driver; (c) damage or tamper with any vehicle; (d) provide false information; (e) attempt to circumvent the payment system; (f) engage in collusion with a driver to manufacture fraudulent trips or chargebacks; or (g) use the Platform if under eighteen (18).</PolicyItem>
          <PolicyItem label="5.2 Account Suspension">HOP reserves the right to suspend or permanently terminate any account, without prior notice, upon reasonable determination that the Rider has violated this Agreement or poses a safety risk.</PolicyItem>
        </PolicySection>

        <PolicySection title="Article 6 — Limitation of Liability">
          <PolicyItem label="6.1 Platform Liability Cap">To the maximum extent permitted by law, HOP&apos;s total cumulative liability shall not exceed the total amount paid by the Rider for the specific service giving rise to the claim.</PolicyItem>
          <PolicyItem label="6.2 Exclusion of Consequential Damages">In no event shall HOP be liable for any indirect, incidental, special, exemplary, punitive, or consequential damages.</PolicyItem>
          <PolicyItem label="6.3 Driver Actions">HOP is not liable for the acts, omissions, or negligence of independent contractor drivers.</PolicyItem>
        </PolicySection>

        <PolicySection title="Article 7 — Governing Law & Dispute Resolution">
          <PolicyItem label="7.1 Governing Law">This Agreement shall be governed by the laws of the State of Florida, United States of America.</PolicyItem>
          <PolicyItem label="7.2 Binding Arbitration">Any dispute shall be resolved by binding arbitration administered under the rules of the American Arbitration Association (AAA), conducted in English in Tampa, Florida, or via remote hearing. The arbitrator&apos;s decision shall be final and binding.</PolicyItem>
          <PolicyItem label="7.3 Class Action Waiver">To the fullest extent permitted by law, you waive any right to bring or participate in any class action or collective proceeding against HOP.</PolicyItem>
        </PolicySection>

        <PolicySection title="Article 8 — Modifications & Termination">
          <PolicyItem label="8.1 Modifications">HOP reserves the right to modify this Agreement at any time. Material changes will be communicated at least fourteen (14) days prior to taking effect. Continued use constitutes acceptance.</PolicyItem>
          <PolicyItem label="8.2 Termination by Rider">Riders may terminate their account at any time by contacting HOP support. Outstanding payment obligations survive termination.</PolicyItem>
          <PolicyItem label="8.3 Termination by HOP">HOP may terminate or suspend any account at any time, with or without cause, upon reasonable notice.</PolicyItem>
        </PolicySection>

        <PolicySection title="Article 9 — General Provisions">
          <PolicyItem label="9.1 Entire Agreement">This Agreement, together with the Cancellation Policy and Privacy Policy, constitutes the entire agreement between the parties.</PolicyItem>
          <PolicyItem label="9.2 Severability">If any provision is found invalid or unenforceable, the remaining provisions continue in full force.</PolicyItem>
          <PolicyItem label="9.3 Contact">
            For questions: <a href="mailto:legal@hopbahamas.com" style={{ color: ORANGE }}>legal@hopbahamas.com</a>
          </PolicyItem>
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
