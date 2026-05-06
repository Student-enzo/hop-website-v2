"use client"

import { PhotoGallery } from "@/components/ui/gallery"

export default function NassauMomentsSection() {
  return (
    <section style={{ backgroundColor: "#0e0c09", padding: "5rem 1.5rem 6rem", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <PhotoGallery animationDelay={0.3} />
      </div>
    </section>
  )
}
