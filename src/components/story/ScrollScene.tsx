"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Map p from [a, b] to [0, 1], clamped. */
export const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

/** Smoothstep easing for scrubbed values. */
export const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * A pinned, scroll-scrubbed scene. The outer block is `length` screens tall;
 * the stage sticks to the viewport while you scroll through it, and `children`
 * receives progress p ∈ [0, 1]. Lenis smooths the native scroll, so the
 * scrubbing glides instead of stepping.
 */
export default function ScrollScene({
  length = 3,
  className = "",
  stageClassName = "",
  dark = false,
  children,
}: {
  length?: number;
  className?: string;
  stageClassName?: string;
  /** a night-sky scene: tells the nav to switch to its dark style */
  dark?: boolean;
  children: (p: number) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const next = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      setP((prev) => (Math.abs(prev - next) > 0.0005 ? next : prev));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={ref} data-nav={dark ? "dark" : undefined} className={`relative ${className}`} style={{ height: `${length * 100}svh` }}>
      <div className={`sticky top-0 h-[100svh] overflow-hidden ${stageClassName}`}>{children(p)}</div>
    </section>
  );
}

/**
 * One short line per step. Steps cross-fade and slide as progress passes each `at`.
 */
export function StepCaption({ p, steps, className = "" }: { p: number; steps: { at: number; text: ReactNode }[]; className?: string }) {
  let active = 0;
  steps.forEach((s, i) => {
    if (p >= s.at) active = i;
  });
  return (
    <div className={`relative ${className}`}>
      {steps.map((s, i) => (
        <p
          key={i}
          className="absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: i === active ? 1 : 0,
            transform: `translateY(${i === active ? 0 : i < active ? -16 : 16}px)`,
          }}
          aria-hidden={i !== active}
        >
          {s.text}
        </p>
      ))}
    </div>
  );
}

/** Progress ticks for a scene: which step you're on. */
export function StepDots({ p, count, className = "" }: { p: number; count: number; className?: string }) {
  const active = Math.min(count - 1, Math.floor(p * count));
  return (
    <div className={`flex gap-1.5 ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-accent" : i < active ? "w-3 bg-accent/50" : "w-3 bg-foreground/20"}`} />
      ))}
    </div>
  );
}
