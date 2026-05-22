import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = "HOP Bahamas <no-reply@hopbahamas.com>";
const TEAM_EMAIL = "info@quickyy.life";

export interface BookingEmailData {
  id: string;
  name: string;
  email: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  tier: string;
  luxVehicle?: string;
  price: number;
  pax: number;
  bags: number;
  phone: string;
}

function fmt(d: string) {
  return new Date(d + "T00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}
function fmtT(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function tierLabel(tier: string, luxVehicle?: string) {
  if (tier === "luxury") return `Luxury — ${luxVehicle ? luxVehicle.charAt(0).toUpperCase() + luxVehicle.slice(1) : "Sedan"}`;
  return tier === "eco" ? "Economic" : "Standard";
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  if (!resend) return;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#161616;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:540px;margin:0 auto;padding:2rem 1.5rem;">
    <div style="margin-bottom:1.5rem;">
      <span style="color:#F5A020;font-weight:900;font-size:1.4rem;letter-spacing:-0.02em;">HOP</span>
      <span style="color:#8a8070;font-size:0.8rem;margin-left:0.5rem;">Bahamas</span>
    </div>

    <div style="background:#1e1c14;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:1.75rem;margin-bottom:1rem;">
      <div style="width:48px;height:48px;border-radius:50%;background:rgba(58,173,110,0.12);border:2px solid rgba(58,173,110,0.3);display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
        <span style="color:#3aad6e;font-size:1.2rem;">✓</span>
      </div>
      <h1 style="color:#f0ede8;font-size:1.3rem;font-weight:800;margin:0 0 0.3rem;">Ride confirmed, ${data.name.split(" ")[0]}.</h1>
      <p style="color:#8a8070;font-size:0.875rem;margin:0 0 1.5rem;">Your HOP booking is locked in.</p>

      <div style="background:#F5A020;border-radius:999px;display:inline-block;padding:0.2rem 1rem;margin-bottom:1.25rem;">
        <span style="color:#161616;font-weight:900;font-size:0.875rem;letter-spacing:0.06em;">${data.id}</span>
      </div>

      <table style="width:100%;border-collapse:collapse;font-size:0.83rem;">
        ${[
          ["Route", `${data.pickup} → ${data.dropoff}`],
          ["Date", fmt(data.date)],
          ["Time", fmtT(data.time)],
          ["Passengers", `${data.pax}${data.bags > 0 ? ` · ${data.bags} bag${data.bags > 1 ? "s" : ""}` : ""}`],
          ["Ride type", tierLabel(data.tier, data.luxVehicle)],
          ["Total", `$${data.price} USD`],
        ].map(([label, value]) => `
          <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
            <td style="padding:0.5rem 0;color:#8a8070;">${label}</td>
            <td style="padding:0.5rem 0;color:#f0ede8;font-weight:600;text-align:right;">${value}</td>
          </tr>`).join("")}
      </table>
    </div>

    <div style="background:#1e1c14;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:1.25rem;margin-bottom:1rem;">
      <p style="color:#F5A020;font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.5rem;">Download the HOP app</p>
      <p style="color:#8a8070;font-size:0.83rem;margin:0 0 1rem;">Track your driver in real time and access your booking.</p>
      <a href="https://apps.apple.com/us/app/hop-bahamas/id6756782428" style="display:inline-block;background:#F5A020;color:#161616;font-weight:700;font-size:0.83rem;padding:0.6rem 1.25rem;border-radius:999px;text-decoration:none;">Download on App Store →</a>
    </div>

    <p style="color:#8a8070;font-size:0.75rem;line-height:1.6;margin-top:1.5rem;">
      Questions? Reply to this email or contact us at <a href="mailto:info@hopbahamas.com" style="color:#F5A020;">info@hopbahamas.com</a><br>
      © 2026 Quicky Solutions LLC (dba HOP Bahamas)
    </p>
  </div>
</body>
</html>`;

  await Promise.all([
    resend.emails.send({
      from: FROM,
      to: data.email,
      subject: `Your HOP ride is confirmed — ${data.id}`,
      html,
    }),
    resend.emails.send({
      from: FROM,
      to: TEAM_EMAIL,
      subject: `New HOP booking ${data.id} — ${data.pickup} → ${data.dropoff}`,
      html: `<p style="font-family:sans-serif;color:#333;">
        <strong>${data.id}</strong><br>
        ${data.name} · ${data.email} · ${data.phone}<br>
        ${data.pickup} → ${data.dropoff}<br>
        ${fmt(data.date)} at ${fmtT(data.time)}<br>
        ${tierLabel(data.tier, data.luxVehicle)} · $${data.price} · ${data.pax} pax${data.bags > 0 ? ` · ${data.bags} bags` : ""}
      </p>`,
    }),
  ]);
}

export interface AppCredentialsEmailData {
  email: string;
  name: string;
  appEmail: string;
  appPassword: string;
}

export async function sendAppCredentialsEmail(data: AppCredentialsEmailData) {
  if (!resend) return;
  const firstName = data.name.split(" ")[0];
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#161616;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:540px;margin:0 auto;padding:2rem 1.5rem;">
    <div style="margin-bottom:1.5rem;">
      <span style="color:#F5A020;font-weight:900;font-size:1.4rem;letter-spacing:-0.02em;">HOP</span>
      <span style="color:#8a8070;font-size:0.8rem;margin-left:0.5rem;">Bahamas</span>
    </div>

    <h1 style="color:#f0ede8;font-size:1.4rem;font-weight:800;margin:0 0 0.5rem;">Hey ${firstName}, your account is ready.</h1>
    <p style="color:#8a8070;font-size:0.9rem;line-height:1.7;margin:0 0 1.75rem;">Download the HOP app and log in with the credentials below. You can change your password after your first login.</p>

    <div style="background:#1e1c14;border:1px solid rgba(245,160,32,0.2);border-radius:16px;padding:1.5rem;margin-bottom:1.25rem;">
      <p style="color:#F5A020;font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 1rem;">Your Login Details</p>
      <table style="width:100%;border-collapse:collapse;font-size:0.875rem;">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <td style="padding:0.6rem 0;color:#8a8070;">Email</td>
          <td style="padding:0.6rem 0;color:#f0ede8;font-weight:700;text-align:right;">${data.appEmail}</td>
        </tr>
        <tr>
          <td style="padding:0.6rem 0;color:#8a8070;">Password</td>
          <td style="padding:0.6rem 0;color:#f0ede8;font-weight:700;text-align:right;font-family:monospace;font-size:1rem;">${data.appPassword}</td>
        </tr>
      </table>
    </div>

    <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.75rem;">
      <a href="https://apps.apple.com/us/app/hop-bahamas/id6756782428"
         style="display:block;background:#F5A020;color:#161616;font-weight:800;font-size:0.9rem;padding:0.875rem 1.5rem;border-radius:999px;text-decoration:none;text-align:center;">
        Download on iPhone — App Store →
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.hopbahamas.rider"
         style="display:block;background:rgba(255,255,255,0.06);color:#f0ede8;font-weight:700;font-size:0.9rem;padding:0.875rem 1.5rem;border-radius:999px;text-decoration:none;text-align:center;border:1px solid rgba(255,255,255,0.1);">
        Download on Android — Google Play →
      </a>
    </div>

    <p style="color:#8a8070;font-size:0.78rem;line-height:1.6;">
      Need help? Reply to this email or reach us at <a href="mailto:info@hopbahamas.com" style="color:#F5A020;">info@hopbahamas.com</a><br>
      © 2026 Quicky Solutions LLC (dba HOP Bahamas)
    </p>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: "Your HOP account is ready — download the app",
    html,
  });
}

export async function sendWelcomeEmail(email: string, name?: string) {
  if (!resend) return;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to HOP Bahamas — Nassau's ride app",
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#161616;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:540px;margin:0 auto;padding:2rem 1.5rem;">
    <div style="margin-bottom:1.5rem;">
      <span style="color:#F5A020;font-weight:900;font-size:1.4rem;">HOP</span>
      <span style="color:#8a8070;font-size:0.8rem;margin-left:0.5rem;">Bahamas</span>
    </div>
    <h1 style="color:#f0ede8;font-size:1.3rem;font-weight:800;margin:0 0 0.75rem;">
      ${name ? `Hey ${name.split(" ")[0]}, w` : "W"}elcome to HOP.
    </h1>
    <p style="color:#8a8070;font-size:0.9rem;line-height:1.7;margin:0 0 1.5rem;">
      No Uber in Nassau? No problem. HOP gives you fixed fares, real-time tracking, and a safety desk monitoring every ride — all built for New Providence.
    </p>
    <a href="https://apps.apple.com/us/app/hop-bahamas/id6756782428" style="display:inline-block;background:#F5A020;color:#161616;font-weight:700;font-size:0.9rem;padding:0.75rem 1.5rem;border-radius:999px;text-decoration:none;margin-bottom:0.75rem;">Download on App Store →</a>
    <br>
    <a href="https://app.hopbahamas.com" style="display:inline-block;background:rgba(255,255,255,0.06);color:#f0ede8;font-weight:600;font-size:0.9rem;padding:0.75rem 1.5rem;border-radius:999px;text-decoration:none;border:1px solid rgba(255,255,255,0.1);">Book online →</a>
    <p style="color:#8a8070;font-size:0.75rem;margin-top:2rem;">
      © 2026 Quicky Solutions LLC (dba HOP Bahamas) · <a href="https://hopbahamas.com/privacy-policy" style="color:#F5A020;">Privacy Policy</a>
    </p>
  </div>
</body>
</html>`,
  });
}
