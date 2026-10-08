"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/** Hours (0–24, fractional) in Pune right now. */
function puneHours() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 12);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return (h % 24) + m / 60;
}

const RISE = 6.25;
const SET = 18.5;

/**
 * The sky over the hero village follows real time in Pune: the Warli sun
 * travels its arc through the day; after sunset a crescent moon and stars.
 * Renders inside the WideVillageScene SVG (viewBox 1440 × 220).
 */
export default function PuneSky() {
  const [h, setH] = useState<number | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const tick = () => setH(puneHours());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 60_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  if (h === null) return null;

  // The theme decides day or night: light mode shows the sun, dark mode the moon.
  // Where the real time in Pune agrees, the body sits where it really is in the sky;
  // otherwise it rests at a calm mid-morning / mid-evening spot.
  const day = resolvedTheme !== "dark";
  const realDay = h >= RISE && h < SET;
  const t =
    day === realDay
      ? day
        ? (h - RISE) / (SET - RISE)
        : ((h - SET + 24) % 24) / (24 - (SET - RISE))
      : day
        ? 0.2
        : 0.8;
  const x = 90 + t * 1260;
  const y = 176 - Math.sin(t * Math.PI) * 132;
  const low = Math.sin(t * Math.PI) < 0.35;
  const label = `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")} in Pune`;

  if (day) {
    const rays = Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2;
      const p = (r: number, da = 0) => `${(Math.cos(a + da) * r).toFixed(1)},${(Math.sin(a + da) * r).toFixed(1)}`;
      return <polygon key={i} points={`${p(16, -0.12)} ${p(16, 0.12)} ${p(22)}`} />;
    });
    return (
      <g transform={`translate(${x} ${y})`} className="ink-in" style={{ animationDelay: "300ms" }}>
        <title>{`Sun over Pune · ${label}`}</title>
        <circle r="13" fill="none" stroke={low ? "var(--haldi)" : "currentColor"} strokeWidth="1.3" />
        <circle r="6" fill={low ? "var(--haldi)" : "currentColor"} />
        <g fill={low ? "var(--haldi)" : "currentColor"}>
          <g className="turn">{rays}</g>
        </g>
      </g>
    );
  }

  const stars = Array.from({ length: 22 }, (_, i) => [((i * 263) % 1380) + 30, ((i * 97) % 110) + 12, (i % 3) * 0.4 + 0.8]);
  return (
    <g className="ink-in" style={{ animationDelay: "300ms" }}>
      <title>{`Night over Pune · ${label}`}</title>
      {stars.map(([sx, sy, r], i) => (
        <circle key={i} cx={sx} cy={sy} r={r} fill="currentColor" className="twinkle" style={{ animationDelay: `${-(i % 7) * 0.5}s` }} />
      ))}
      <g transform={`translate(${x} ${y})`}>
        <circle r="13" fill="currentColor" />
        <circle r="13" cx="6" cy="-4" fill="var(--background)" />
      </g>
    </g>
  );
}
