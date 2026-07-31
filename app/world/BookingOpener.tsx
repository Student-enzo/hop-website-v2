"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TOTAL_MS = 2500;

export default function BookingOpener({
  active,
  onDismiss,
}: {
  active: boolean;
  onDismiss: () => void;
}) {
  const [closing, setClosing] = useState(false);
  const dismissedRef = useRef(false);

  const dismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setClosing(true);
    window.setTimeout(onDismiss, 180);
  };

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(dismiss, TOTAL_MS);
    const skip = () => dismiss();
    window.addEventListener("wheel", skip, { passive: true, once: true });
    window.addEventListener("touchstart", skip, { passive: true, once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active) return null;

  return (
    <div className={`hop-opener${closing ? " is-closing" : ""}`}>
      <div className="hop-opener__glow" />
      <div className="hop-opener__phone">
        <div className="hop-opener__bezel">
          <div className="hop-opener__screen">
            <Image
              src="/world/app-booking.png"
              alt=""
              width={1290}
              height={2796}
              priority
              className="hop-opener__shot"
            />
            <span className="hop-opener__ripple" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .hop-opener {
          position: fixed;
          inset: 0;
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #14130f;
          opacity: 1;
          transition: opacity 0.18s ease;
        }
        .hop-opener.is-closing {
          opacity: 0;
          pointer-events: none;
        }
        .hop-opener__glow {
          position: absolute;
          left: 50%;
          top: 62%;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 160, 32, 0.9), rgba(245, 160, 32, 0) 70%);
          transform: translate(-50%, -50%) scale(0);
          animation: hop-glow-bloom 1.1s cubic-bezier(0.22, 1, 0.36, 1) 1.35s forwards;
        }
        @keyframes hop-glow-bloom {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.9; }
          70% { opacity: 0.85; }
          100% { transform: translate(-50%, -50%) scale(220); opacity: 0; }
        }
        .hop-opener__phone {
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(16px) scale(0.96);
          animation: hop-phone-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
        }
        @keyframes hop-phone-in {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .hop-opener__bezel {
          display: inline-block;
          border-radius: 48px;
          padding: 10px;
          background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
        }
        .hop-opener__screen {
          position: relative;
          width: min(72vw, 260px);
          aspect-ratio: 1290 / 2796;
          border-radius: 40px;
          overflow: hidden;
        }
        .hop-opener__shot {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .hop-opener__ripple {
          position: absolute;
          left: 50%;
          top: 62%;
          width: 46px;
          height: 46px;
          margin: -23px 0 0 -23px;
          border-radius: 50%;
          border: 2px solid #F5A020;
          opacity: 0;
          animation: hop-ripple 0.55s ease-out 0.9s;
        }
        @keyframes hop-ripple {
          0% { opacity: 0.9; transform: scale(0.3); }
          100% { opacity: 0; transform: scale(2.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hop-opener__glow,
          .hop-opener__phone,
          .hop-opener__ripple {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
