/**
 * Every "book a ride" call to action on the site points at one place.
 *
 * Web booking (app.hopbahamas.com) is paused, so the site sends people to the
 * apps instead. To send traffic back to the web app, set WEB_APP_URL below and
 * point GET_THE_APP_URL at it.
 */

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/hop-bahamas/id6756782428";

/**
 * The passenger app is not published on Google Play yet — the old link
 * (com.hopbahamas.rider) 404s, and the real package (com.quicky.hopipassengers)
 * has no public listing. Leave this null until the listing is live; the page
 * shows the WhatsApp fallback instead of a button that goes nowhere.
 */
export const GOOGLE_PLAY_URL: string | null = null;

/** The web booking app. Still reachable directly; just no longer advertised. */
export const WEB_APP_URL = "https://app.hopbahamas.com";

/** Where every booking CTA goes. */
export const GET_THE_APP_URL = "/get-the-app";

export const WHATSAPP_URL = "https://wa.me/12424285167";
export const SUPPORT_PHONE = "+1 (242) 428-5167";
export const SUPPORT_PHONE_HREF = "tel:+12424285167";
