import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOP — Nassau's Ride App. No Uber? No Problem.",
  description:
    "No Uber in Nassau, Bahamas. HOP is the local ride app — fixed prices, pre-booking before you land, and a real-time safety system. Available now.",
  keywords: [
    "uber nassau bahamas",
    "nassau taxi app",
    "bahamas ride hailing",
    "hop app nassau",
    "nassau airport transfer",
    "atlantis hotel taxi",
    "nassau transportation",
    "cruise port nassau taxi",
  ] as unknown as string,
  openGraph: {
    title: "HOP — Nassau's Ride App. Fixed Price. No Haggling.",
    description:
      "No Uber in Nassau. HOP gives you fixed fares, pre-booking, and built-in safety. Built for the Bahamas.",
    type: "website",
  },
};

const taxiServiceSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "HOP Bahamas",
  description: "Ride-hailing app for Nassau, Bahamas. Fixed prices, pre-booking, and real-time safety.",
  url: "https://hopbahamas.com",
  areaServed: {
    "@type": "City",
    name: "Nassau",
    containedInPlace: { "@type": "Country", name: "Bahamas" },
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://app.hopbahamas.com",
    servicePhone: "+1-242-000-0000",
  },
  offers: {
    "@type": "Offer",
    description: "Fixed-price rides across Nassau with pre-booking available",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceSchema) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ backgroundColor: "#161616", color: "#f0ede8" }}
      >
        {children}
      </body>
    </html>
  );
}
