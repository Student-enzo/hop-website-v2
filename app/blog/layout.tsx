import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HOP Blog — Nassau Bahamas Transportation Guides & Tips",
  description:
    "Expert guides on getting around Nassau. Airport transfers, taxis vs HOP, cruise port transport, Atlantis rides, and more — from people who know the island.",
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
