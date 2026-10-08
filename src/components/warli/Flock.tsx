"use client";

import { useEffect, useRef } from "react";

/**
 * A small flock crossing the hero sky, drawn on a canvas.
 * Each bird flaps on its own rhythm and periodically glides; the flock loosely
 * keeps a V around a leader that drifts on smooth noise, so no two crossings
 * look alike. Birds nearer the viewer are larger and darker. Stays inside the
 * sky band it's given, pauses off-screen, and holds still for reduced motion.
 */

interface Bird {
  ox: number; // formation offset behind / beside the leader
  oy: number;
  size: number; // depth: 0.6 (far) .. 1.25 (near)
  phase: number;
  rate: number; // flaps per second
  drift: number; // personal noise seed
}

const TAU = Math.PI * 2;

/** Cheap smooth 1D noise from a few incommensurate sines. */
function noise(t: number, seed: number) {
  return (
    Math.sin(t * 0.31 + seed) * 0.5 +
    Math.sin(t * 0.73 + seed * 1.7) * 0.3 +
    Math.sin(t * 1.37 + seed * 2.3) * 0.2
  );
}

function makeFlock(n: number): Bird[] {
  const birds: Bird[] = [];
  for (let i = 0; i < n; i++) {
    const side = i === 0 ? 0 : i % 2 ? 1 : -1;
    const rank = Math.ceil(i / 2);
    birds.push({
      ox: -rank * 34 - Math.random() * 14,
      oy: side * rank * 15 + (Math.random() - 0.5) * 10,
      size: 0.65 + Math.random() * 0.6,
      phase: Math.random() * TAU,
      rate: 2.4 + Math.random() * 1.2,
      drift: Math.random() * 100,
    });
  }
  return birds;
}

export default function Flock({ className = "", count = 11, crossSeconds = 28 }: { className?: string; count?: number; crossSeconds?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    let colour = "#2b2420";
    let flocks = [
      { birds: makeFlock(count), start: 0, seed: Math.random() * 50, dir: 1 },
      { birds: makeFlock(3), start: -crossSeconds * 0.55, seed: Math.random() * 50, dir: -1 },
    ];

    const readColour = () => {
      colour = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || colour;
    };
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawBird = (x: number, y: number, s: number, flap: number, heading: number, alpha: number) => {
      const span = 11 * s;
      const lift = flap * span * 0.55; // wing tip height
      const bend = span * 0.28 - flap * span * 0.12; // elbow
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(heading);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = colour;
      ctx.lineWidth = Math.max(1, 1.5 * s);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(-span, -lift);
      ctx.quadraticCurveTo(-span * 0.45, -bend, 0, 0);
      ctx.quadraticCurveTo(span * 0.45, -bend, span, -lift);
      ctx.stroke();
      ctx.restore();
    };

    let last = performance.now();
    let t = 0;
    let raf = 0;
    let visible = true;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      ctx.clearRect(0, 0, w, h);

      for (const f of flocks) {
        const life = (t - f.start) / crossSeconds; // 0..1 across the screen
        if (life < 0) continue;
        if (life > 1.25) {
          // re-launch this flock with a fresh shape and height
          f.start = t + 2 + Math.random() * 6;
          f.seed = Math.random() * 50;
          f.dir = Math.random() < 0.7 ? 1 : -1;
          f.birds = makeFlock(f.birds.length);
          continue;
        }
        const span = w + 400;
        const lx = f.dir > 0 ? -200 + life * span : w + 200 - life * span;
        const ly = h * (0.42 + 0.28 * noise(t * 0.6, f.seed));
        const climb = (noise(t * 0.6 + 0.05, f.seed) - noise(t * 0.6, f.seed)) * 4; // for heading

        for (const b of f.birds) {
          // formation loosens and breathes over time
          const x = lx + f.dir * (b.ox + noise(t * 0.9, b.drift) * 10);
          const y = ly + b.oy * (0.8 + 0.3 * noise(t * 0.4, b.drift + 9)) + noise(t * 1.3, b.drift + 3) * 4;
          // flap, with glides when this bird's energy noise dips
          const energy = noise(t * 0.5, b.drift + 20);
          const gliding = energy < -0.25;
          b.phase += dt * TAU * b.rate * (gliding ? 0.15 : 1);
          const flap = gliding ? 0.15 : Math.sin(b.phase) * 0.9 + 0.1;
          const heading = Math.atan(climb) * 0.6 * f.dir;
          const alpha = 0.35 + 0.5 * ((b.size - 0.65) / 0.6);
          drawBird(x, y, b.size, flap, heading, alpha);
        }
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    readColour();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const mo = new MutationObserver(readColour);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    if (reduce) {
      // a single still flock
      t = crossSeconds * 0.5;
      flocks = [flocks[0]];
      last = performance.now();
      frame(last);
      cancelAnimationFrame(raf);
    } else {
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      });
      io.observe(canvas);
      raf = requestAnimationFrame(frame);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        mo.disconnect();
      };
    }
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [count, crossSeconds]);

  return <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true" />;
}
