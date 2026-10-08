"use client";

import { useEffect, useRef } from "react";

/**
 * Night life for the hero: fireflies drifting through the groves and over the
 * village, each wandering on smooth noise and pulsing on its own rhythm.
 * Kept to the edges and the ground so the words stay clear.
 */

const TAU = Math.PI * 2;
const noise = (t: number, s: number) => Math.sin(t * 0.37 + s) * 0.5 + Math.sin(t * 0.83 + s * 1.9) * 0.3 + Math.sin(t * 1.61 + s * 2.7) * 0.2;

interface Fly {
  hx: number; // home, as a fraction of the canvas
  hy: number;
  seed: number;
  pulse: number;
  rate: number;
}

function makeFlies(n: number): Fly[] {
  return Array.from({ length: n }, (_, i) => {
    // two thirds in the groves at the edges, the rest low over the village
    const edge = i % 3 !== 2;
    const left = i % 2 === 0;
    return {
      hx: edge ? (left ? 0.02 + Math.random() * 0.17 : 0.81 + Math.random() * 0.17) : 0.25 + Math.random() * 0.5,
      hy: edge ? 0.35 + Math.random() * 0.55 : 0.84 + Math.random() * 0.12,
      seed: Math.random() * 100,
      pulse: Math.random() * TAU,
      rate: 0.35 + Math.random() * 0.5,
    };
  });
}

export default function Fireflies({ className = "", count = 26 }: { className?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const flies = makeFlies(count);
    let w = 0, h = 0, raf = 0, t = Math.random() * 100, last = performance.now(), visible = true;
    const glow = getComputedStyle(document.documentElement).getPropertyValue("--haldi").trim() || "#e3a948";

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      ctx.clearRect(0, 0, w, h);
      for (const f of flies) {
        const x = (f.hx + noise(t * 0.25, f.seed) * 0.045) * w;
        const y = (f.hy + noise(t * 0.22, f.seed + 40) * 0.05) * h;
        f.pulse += dt * TAU * f.rate;
        const on = Math.max(0, Math.sin(f.pulse)) ** 2.2; // long dark, short glow
        if (on < 0.02) continue;
        const r = 9 + 6 * on;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, glow);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.25 + 0.55 * on;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = 0.6 + 0.4 * on;
        ctx.fillStyle = "#fff4d6";
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, TAU);
        ctx.fill();
      }
      raf = visible && !reduce ? requestAnimationFrame(frame) : 0;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [count]);

  return <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true" />;
}
