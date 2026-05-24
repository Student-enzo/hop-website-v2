type GtagFn = (...args: unknown[]) => void

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFn }).gtag === "function") {
    ;(window as unknown as { gtag: GtagFn }).gtag("event", name, params)
  }
}
