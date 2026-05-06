import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOP Rides — Nassau Bahamas Transportation Services",
  description:
    "Economic, Standard, and Luxury rides in Nassau. Sedan from $95, SUV from $120, Mini Bus from $190. Scheduled pickups, ride share, priority rides, and Low Data Mode.",
  alternates: { canonical: "https://hopbahamas.com/services" },
  openGraph: {
    title: "HOP Rides — Nassau Bahamas Transportation Services",
    description: "Economic, Standard, and Luxury rides in Nassau. Fixed flat rates. Pre-book before you land.",
    url: "https://hopbahamas.com/services",
    siteName: "HOP Bahamas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HOP Rides — Nassau Bahamas Transportation Services",
    description: "Economic, Standard, and Luxury rides in Nassau. Fixed flat rates. Pre-book before you land.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
