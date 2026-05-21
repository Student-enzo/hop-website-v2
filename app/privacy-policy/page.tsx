import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — HOP Bahamas",
  description:
    "How HOP Bahamas collects, uses, stores, and discloses personal information when you use the HOP app and website.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT }}>
      <Navbar />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ color: ORANGE, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: TEXT, marginBottom: "0.5rem", lineHeight: 1.2 }}>
          Privacy Policy
        </h1>
        <p style={{ color: MUTED, fontSize: "0.875rem", marginBottom: "2.5rem" }}>
          Quicky Solutions LLC (dba HOP Bahamas) · Effective Date: March 1, 2026
        </p>

        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.8 }}>
            This Privacy Policy describes how Quicky Solutions LLC (dba HOP Bahamas) (&ldquo;HOP,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, stores, and discloses personal information when you use the HOP mobile application, website, or related services. By using the Platform, you consent to the practices described in this Policy.
          </p>
        </div>

        <PolicySection title="Section 1 — Information We Collect">
          <PolicyItem label="1.1 Information You Provide">
            We collect information you provide directly, including: full legal name, date of birth, email address, phone number, and payment method details at registration; pickup and drop-off locations at the time of each booking; and any communications submitted through in-app support.
          </PolicyItem>
          <PolicyItem label="1.2 Information Collected Automatically">
            When you use the Platform, we automatically collect: precise GPS location data during active ride sessions; device identifiers and operating system information; app usage data, including trip history, session duration, and feature interactions; and IP address and network information.
          </PolicyItem>
          <PolicyItem label="1.3 Driver-Specific Data">
            For drivers, we additionally collect: government-issued identification, National Insurance Number (NIB), Public Service Driver&apos;s Licence details, vehicle registration and insurance documents, bank account information for payout routing, and continuous driving behaviour data including speed, braking patterns, and operational zones.
          </PolicyItem>
        </PolicySection>

        <PolicySection title="Section 2 — How We Use Your Information">
          <PolicyItem label="2.1 Service Delivery">To match riders with drivers, process payments, calculate fares, and facilitate the completion of transportation services.</PolicyItem>
          <PolicyItem label="2.2 Safety & Fraud Prevention">To verify identities, detect and prevent fraudulent activity, monitor driver behaviour for safety compliance, and investigate disputes.</PolicyItem>
          <PolicyItem label="2.3 Legal & Regulatory Compliance">To comply with applicable laws in the State of Florida and The Commonwealth of The Bahamas, including tax reporting obligations and Road Traffic Department requirements.</PolicyItem>
          <PolicyItem label="2.4 Platform Improvement">To analyze usage patterns, improve service quality, and develop new features.</PolicyItem>
          <PolicyItem label="2.5 Communications">To send transactional notifications, booking confirmations, and — with your consent — promotional communications.</PolicyItem>
        </PolicySection>

        <PolicySection title="Section 3 — Information Sharing & Disclosure">
          <PolicyItem label="3.1 With Drivers">Rider name, pickup location, and contact information are shared with the matched driver solely for the purpose of completing the requested service.</PolicyItem>
          <PolicyItem label="3.2 With Payment Processors">Payment information is shared with our payment processing partner solely for the purpose of processing transactions. HOP does not store full card numbers on its servers.</PolicyItem>
          <PolicyItem label="3.3 With HOP Solutions Bahamas">Operational data necessary for local service delivery and driver payout processing is shared with HOP Solutions Bahamas under a formal data processing agreement.</PolicyItem>
          <PolicyItem label="3.4 Legal Requirements">We may disclose personal information where required by law, court order, or governmental authority, or where necessary to protect the rights, property, or safety of HOP, its users, or the public.</PolicyItem>
          <PolicyItem label="3.5 No Sale of Data">HOP does not sell, rent, or trade personal information to third parties for marketing purposes.</PolicyItem>
        </PolicySection>

        <PolicySection title="Section 4 — Data Retention">
          <PolicyItem label="4.1">
            We retain personal data for as long as necessary to fulfill the purposes described in this Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Trip records and financial transaction data are retained for a minimum of seven (7) years for tax and compliance purposes. Account data is retained for thirty (30) days following account deletion, after which it is permanently purged from active systems.
          </PolicyItem>
        </PolicySection>

        <PolicySection title="Section 5 — Data Security">
          <PolicyItem label="5.1">
            HOP implements industry-standard technical and organizational measures to protect personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, access controls, and regular security reviews. However, no method of transmission over the internet is completely secure, and HOP cannot guarantee absolute security.
          </PolicyItem>
        </PolicySection>

        <PolicySection title="Section 6 — Your Rights">
          <PolicyItem label="6.1">
            Subject to applicable law, you have the right to: access the personal information we hold about you; request correction of inaccurate data; request deletion of your data, subject to legal retention requirements; withdraw consent to marketing communications at any time; and lodge a complaint with the relevant data protection authority.
          </PolicyItem>
          <PolicyItem label="6.2">
            To exercise any of these rights, contact: <a href="mailto:privacy@hopbahamas.com" style={{ color: ORANGE }}>privacy@hopbahamas.com</a>
          </PolicyItem>
        </PolicySection>

        <PolicySection title="Section 7 — Governing Law & Contact">
          <PolicyItem label="7.1">This Privacy Policy is governed by the laws of the State of Florida, United States of America. For services delivered in The Bahamas, applicable Bahamian data protection principles apply.</PolicyItem>
          <PolicyItem label="7.2">
            For privacy-related inquiries, contact: <a href="mailto:privacy@hopbahamas.com" style={{ color: ORANGE }}>privacy@hopbahamas.com</a> | Quicky Solutions LLC, Tampa, Florida, USA.
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
