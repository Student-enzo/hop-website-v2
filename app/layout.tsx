import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
  ],
  alternates: { canonical: "https://hopbahamas.com" },
  openGraph: {
    title: "HOP — Nassau's Ride App. Fixed Price. No Haggling.",
    description: "No Uber in Nassau. HOP gives you fixed fares, pre-booking, and built-in safety. Built for the Bahamas.",
    type: "website",
    url: "https://hopbahamas.com",
    siteName: "HOP Bahamas",
    images: [{ url: "https://hopbahamas.com/images/hero-bahamas.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOP — Nassau's Ride App. No Uber? No Problem.",
    description: "No Uber in Nassau. Fixed fares, pre-booking before you land, real-time safety. Book in under a minute.",
    images: ["https://hopbahamas.com/images/hero-bahamas.jpg"],
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HOP Bahamas",
  url: "https://hopbahamas.com",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://hopbahamas.com/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "HOP — Nassau Ride App",
  description: "Fixed-fare ride-hailing app for Nassau, Bahamas. Pre-book before you land, track in real time, one-tap SOS safety.",
  url: "https://app.hopbahamas.com",
  applicationCategory: "TravelApplication",
  operatingSystem: "iOS, Android",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "47",
    bestRating: "5",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ backgroundColor: "#161616", color: "#f0ede8" }}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MX6HJ5EQ1N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MX6HJ5EQ1N');`}
        </Script>
      </body>
    </html>
  );
}
