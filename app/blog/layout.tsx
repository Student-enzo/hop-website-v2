import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HOP Blog — Nassau Bahamas Transportation Guides & Tips",
  description:
    "Expert guides on getting around Nassau. Airport transfers, taxis vs HOP, cruise port transport, Atlantis rides, and more — from people who know the island.",
  alternates: { canonical: "https://hopbahamas.com/blog" },
  openGraph: {
    title: "HOP Blog — Nassau Bahamas Transportation Guides & Tips",
    description: "Expert guides on getting around Nassau — airport transfers, taxi costs, cruise port transport, and more.",
    url: "https://hopbahamas.com/blog",
    siteName: "HOP Bahamas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HOP Blog — Nassau Bahamas Transportation Guides & Tips",
    description: "Expert guides on getting around Nassau — airport transfers, taxi costs, cruise port transport, and more.",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
