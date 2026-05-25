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
  "@id": "https://hopbahamas.com/#service",
  name: "HOP Bahamas",
  alternateName: "HOP — Nassau Ride App",
  description: "Nassau's ride-hailing app. Fixed fares, no haggling, pre-booking before you land, and one-tap SOS safety. ECO rides from $26. Airport to Atlantis from $47.",
  url: "https://hopbahamas.com",
  telephone: "+1-242-428-5167",
  priceRange: "$26–$190",
  currenciesAccepted: "USD",
  paymentAccepted: "Credit Card, Debit Card",
  areaServed: [
    { "@type": "City", name: "Nassau", containedInPlace: { "@type": "Country", name: "Bahamas" } },
    { "@type": "Place", name: "Paradise Island, Bahamas" },
    { "@type": "Place", name: "Cable Beach, Nassau" },
    { "@type": "Place", name: "Lynden Pindling International Airport" },
    { "@type": "Place", name: "Nassau Cruise Port" },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.0480,
    longitude: -77.3554,
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://app.hopbahamas.com",
    servicePhone: "+1-242-428-5167",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "HOP Bahamas Ride Options",
    itemListElement: [
      { "@type": "Offer", name: "ECO Ride", description: "Economy ride from $26. Nassau airport to Atlantis from $47.", priceCurrency: "USD", price: "26" },
      { "@type": "Offer", name: "Standard Ride", description: "Standard ride from $32. Nassau airport to Atlantis from $58.", priceCurrency: "USD", price: "32" },
      { "@type": "Offer", name: "Luxury Sedan", description: "Luxury Sedan flat $95 per trip.", priceCurrency: "USD", price: "95" },
      { "@type": "Offer", name: "Luxury SUV", description: "Luxury SUV flat $120 per trip.", priceCurrency: "USD", price: "120" },
      { "@type": "Offer", name: "Group Mini Bus", description: "Group mini bus flat $190 per trip.", priceCurrency: "USD", price: "190" },
    ],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://hopbahamas.com/#organization",
  name: "HOP Bahamas",
  alternateName: "HOP — Nassau Ride App",
  url: "https://hopbahamas.com",
  logo: "https://hopbahamas.com/images/hop-logo.png",
  description: "HOP is Nassau's ride-hailing app — fixed fares, pre-booking, and real-time safety. The local alternative to Uber in the Bahamas.",
  foundingDate: "2026",
  areaServed: "Nassau, Bahamas",
  sameAs: [
    "https://app.hopbahamas.com",
    "https://apps.apple.com/us/app/hop-bahamas/id6756782428",
    "https://wa.me/12424285167",
  ],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+1-242-428-5167", contactType: "customer service", areaServed: "BS", availableLanguage: "English" },
    { "@type": "ContactPoint", telephone: "+1-305-850-5042", contactType: "customer service", areaServed: "US", availableLanguage: "English" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there Uber in Nassau, Bahamas?",
      acceptedAnswer: { "@type": "Answer", text: "No. Uber and Lyft do not operate in Nassau, Bahamas. HOP is the local ride-hailing alternative — fixed fares, pre-booking before you land, and real-time GPS tracking. Book at app.hopbahamas.com." },
    },
    {
      "@type": "Question",
      name: "How much does it cost to get from Nassau Airport (LPIA) to Atlantis?",
      acceptedAnswer: { "@type": "Answer", text: "HOP's fixed fare from Lynden Pindling International Airport to Atlantis on Paradise Island is $47 (ECO) or $58 (Standard). Government-regulated taxis charge $45–$55 plus a $1 bridge toll. Book HOP in advance at app.hopbahamas.com to lock in your fare before landing." },
    },
    {
      "@type": "Question",
      name: "How do I get from Nassau Airport to Cable Beach or Baha Mar?",
      acceptedAnswer: { "@type": "Answer", text: "HOP's fixed fare from Nassau Airport (LPIA) to Cable Beach or Baha Mar is $32 (ECO) or $39 (Standard). The drive takes approximately 15–20 minutes. Book at app.hopbahamas.com." },
    },
    {
      "@type": "Question",
      name: "What is the safest way to get around Nassau as a tourist?",
      acceptedAnswer: { "@type": "Answer", text: "HOP is the safest option for tourists in Nassau — every driver is verified, you see the driver's name, photo, and plate before they arrive, and a one-tap SOS button connects directly to Nassau 919 emergency services. Your real-time GPS is shareable with trusted contacts." },
    },
    {
      "@type": "Question",
      name: "Can I pre-book a ride from Nassau Airport before I land?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. HOP lets you pre-book your Nassau airport transfer before your flight lands. Set your pickup time, see the fixed fare upfront, and your verified driver meets you at arrivals. Book at app.hopbahamas.com — no app download required." },
    },
    {
      "@type": "Question",
      name: "How much does a ride in Nassau cost with HOP?",
      acceptedAnswer: { "@type": "Answer", text: "HOP fares are fixed per trip: ECO rides from $26, Standard from $32. Airport to Atlantis: ECO $47, Standard $58. Airport to Cable Beach: ECO $32, Standard $39. Cruise Port to Atlantis: from $26. Luxury Sedan: flat $95. Luxury SUV: flat $120. Group Mini Bus: flat $190. All fares shown before you confirm." },
    },
    {
      "@type": "Question",
      name: "Does HOP Bahamas require an app download?",
      acceptedAnswer: { "@type": "Answer", text: "No. HOP works in your mobile browser at app.hopbahamas.com — no app download required. It also works on Nassau's spotty cellular network with Low Data Mode. The app is also available on the App Store for iOS users who prefer it." },
    },
    {
      "@type": "Question",
      name: "How do I get from the Nassau cruise port to Atlantis?",
      acceptedAnswer: { "@type": "Answer", text: "HOP's fixed fare from Nassau Cruise Port to Atlantis on Paradise Island starts from $26. The drive takes approximately 10–15 minutes across the Paradise Island Bridge. Book at app.hopbahamas.com — pre-schedule before your ship docks for guaranteed pickup." },
    },
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ backgroundColor: "#161616", color: "#f0ede8" }}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BDLN5QH736"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-BDLN5QH736');`}
        </Script>
      </body>
    </html>
  );
}
