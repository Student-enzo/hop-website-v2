"use client";

import { trackEvent } from "@/lib/analytics";

interface Props {
  href: string;
  eventLabel: string;
  eventLocation: string;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export default function TrackedLink({ href, eventLabel, eventLocation, children, ...rest }: Props) {
  return (
    <a
      href={href}
      onClick={() => trackEvent("cta_click", { label: eventLabel, location: eventLocation })}
      {...rest}
    >
      {children}
    </a>
  );
}
