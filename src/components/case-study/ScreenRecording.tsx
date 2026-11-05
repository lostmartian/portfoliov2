"use client";

// Engine for the auto-playing "screen recording" mockups in case studies.
//
// A clock drives a timeline. The page renders each screen from the current time (typed text,
// active tab, progress...). A layout effect then measures elements tagged with `data-t` and
// moves the cursor and camera imperatively, so motion never lags a frame behind layout.
// The camera frames a target by picking the largest zoom (up to `max`) that fits it on screen.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Lock, Pause, Play, Plus, RotateCw, Star, X } from "lucide-react";

export type Anchor = { id?: string; abs?: { x: number; y: number }; ax?: number; ay?: number; dx?: number; dy?: number };
/** The cursor arrives at the anchor at time `t`, having travelled for `move` seconds. */
export type Waypoint = Anchor & { t: number; move?: number; linear?: boolean };
/** Camera framing of target `id` (or the full view) at time `t`. */
export type Shot = { t: number; id?: string; max?: number; pad?: number };
export type Scene = { t: number; label: string; path: string };

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
export const between = (t: number, a: number, b: number) => t >= a && t < b;

const DESIGN = { w: 960, h: 620 };
const CHROME_H = 78;
export const VIEW = { w: DESIGN.w, h: DESIGN.h - CHROME_H };

type Rect = { x: number; y: number; w: number; h: number };

function measure(root: HTMLElement, id: string): Rect | null {
  const el = root.querySelector<HTMLElement>(`[data-t="${id}"]`);
  if (!el) return null;
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== root) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

function CursorArrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]" aria-hidden>
      <path d="M4 2.5 L4 19 L8.6 14.9 L11.6 21.4 L14.5 20.1 L11.6 13.7 L17.8 13.4 Z" fill="#fff" stroke="#000" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function ScreenRecording({
  duration,
  scenes,
  cursor,
  clicks,
  camera,
  drag,
  host,
  app,
  favicon,
  avatar,
  posterTime,
  children,
}: {
  duration: number;
  scenes: Scene[];
  cursor: Waypoint[];
  clicks: number[];
  camera: Shot[];
  /** Optional rubber-band rectangle dragged from `from` to the cursor between start and end. */
  drag?: { start: number; end: number; from: Anchor };
  host: string;
  app: string;
  favicon: string;
  avatar: string;
  /** Frame shown when the visitor prefers reduced motion. */
  posterTime: number;
  children: (t: number, scene: number) => React.ReactNode;
}) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [fit, setFit] = useState(1);

  const outerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const cache = useRef<Record<string, Rect>>({});

  // Scale the fixed-size frame to the available width, track visibility, and respect
  // reduced motion by starting paused on a representative frame.
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => {
        setPlaying(false);
        setT(posterTime);
      });
    }
    const ro = new ResizeObserver(([e]) => setFit(e.contentRect.width / DESIGN.w));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [posterTime]);

  // Clock: only runs while playing and on screen.
  useEffect(() => {
    if (!playing || !visible) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      setT((p) => (p + dt) % duration);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, visible, duration]);

  const resolve = useCallback((a: Anchor) => {
    if (a.abs) return a.abs;
    const root = layerRef.current;
    if (!root || !a.id) return null;
    const r = measure(root, a.id);
    if (r) cache.current[a.id] = r;
    const c = r ?? cache.current[a.id];
    if (!c) return null;
    return { x: c.x + c.w * (a.ax ?? 0.5) + (a.dx ?? 0), y: c.y + c.h * (a.ay ?? 0.5) + (a.dy ?? 0) };
  }, []);

  // After every render: place cursor, click ripple, drag rectangle and camera.
  useLayoutEffect(() => {
    // Cursor
    let i = 0;
    while (i < cursor.length - 1 && cursor[i + 1].t <= t) i++;
    const a = cursor[i];
    const b = cursor[i + 1];
    let p = resolve(a) ?? { x: VIEW.w / 2, y: VIEW.h / 2 };
    if (b) {
      const start = b.t - (b.move ?? 0.7);
      if (t > start) {
        const pb = resolve(b);
        if (pb) {
          const k0 = clamp((t - start) / (b.t - start));
          const k = b.linear ? k0 : ease(k0);
          p = { x: p.x + (pb.x - p.x) * k, y: p.y + (pb.y - p.y) * k };
        }
      }
    }
    if (cursorRef.current) cursorRef.current.style.transform = `translate(${p.x - 4}px, ${p.y - 3}px)`;

    // Click ripple
    const click = clicks.find((c) => t >= c && t < c + 0.45);
    if (rippleRef.current) {
      if (click !== undefined) {
        const k = (t - click) / 0.45;
        rippleRef.current.style.opacity = String(1 - k);
        rippleRef.current.style.transform = `translate(${p.x - 14}px, ${p.y - 14}px) scale(${0.5 + k})`;
      } else rippleRef.current.style.opacity = "0";
    }

    // Rubber-band rectangle
    if (dragRef.current) {
      const from = drag && t >= drag.start && t < drag.end + 0.15 ? resolve(drag.from) : null;
      if (from) {
        Object.assign(dragRef.current.style, {
          opacity: "1",
          transform: `translate(${Math.min(from.x, p.x)}px, ${Math.min(from.y, p.y)}px)`,
          width: `${Math.abs(p.x - from.x)}px`,
          height: `${Math.abs(p.y - from.y)}px`,
        });
      } else dragRef.current.style.opacity = "0";
    }

    // Camera
    let j = 0;
    while (j < camera.length - 1 && camera[j + 1].t <= t) j++;
    const c0 = camera[j];
    const c1 = camera[Math.min(j + 1, camera.length - 1)];
    const frame = (shot: Shot) => {
      const center = { x: VIEW.w / 2, y: VIEW.h / 2, s: 1 };
      if (!shot.id || !layerRef.current) return center;
      const r = measure(layerRef.current, shot.id) ?? cache.current[shot.id];
      if (!r) return center;
      cache.current[shot.id] = r;
      const pad = 1 - (shot.pad ?? 0.1);
      const fitS = Math.min((VIEW.w * pad) / r.w, (VIEW.h * pad) / r.h);
      return { x: r.x + r.w / 2, y: r.y + r.h / 2, s: clamp(fitS, 1, shot.max ?? 2) };
    };
    const f0 = frame(c0);
    const f1 = frame(c1);
    const k = c1.t > c0.t ? ease(clamp((t - c0.t) / (c1.t - c0.t))) : 1;
    const s = f0.s + (f1.s - f0.s) * k;
    const fx = f0.x + (f1.x - f0.x) * k;
    const fy = f0.y + (f1.y - f0.y) * k;
    const tx = clamp(VIEW.w / 2 - fx * s, VIEW.w - VIEW.w * s, 0);
    const ty = clamp(VIEW.h / 2 - fy * s, VIEW.h - VIEW.h * s, 0);
    if (layerRef.current) layerRef.current.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
  });

  const scene = scenes.reduce((acc, sc, idx) => (t >= sc.t ? idx : acc), 0);
  const fade = clamp(1 - Math.abs(t - duration) / 0.5) + clamp(1 - t / 0.4);

  return (
    <figure>
      <div
        ref={outerRef}
        className="relative w-full overflow-hidden rounded-xl bg-[#202124] shadow-[0_2px_6px_rgba(12,12,13,0.08),0_30px_70px_-30px_rgba(12,12,13,0.5)] ring-1 ring-black/20"
        style={{ height: DESIGN.h * fit }}
      >
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: DESIGN.w, height: DESIGN.h, transform: `scale(${fit})` }}>
          {/* Tab strip */}
          <div className="flex h-[38px] items-end gap-2 bg-[#202124] px-3">
            <div className="mb-[13px] mr-2 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex h-[30px] w-[220px] items-center gap-2 rounded-t-lg bg-[#35363a] px-3 text-[11.5px] text-white/90">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-white text-[8px] font-bold text-black">{favicon}</span>
              <span className="flex-1 truncate">
                {app} · {scenes[scene].label}
              </span>
              <X className="h-3 w-3 text-white/50" />
            </div>
            <Plus className="mb-2 h-4 w-4 text-white/50" />
          </div>
          {/* Toolbar */}
          <div className="flex h-10 items-center gap-3 bg-[#35363a] px-3">
            <ChevronLeft className="h-4 w-4 text-white/60" />
            <ChevronRight className="h-4 w-4 text-white/30" />
            <RotateCw className="h-3.5 w-3.5 text-white/60" />
            <div className="flex h-7 flex-1 items-center gap-2 rounded-full bg-[#202124] px-3.5 text-[12px] text-white/55">
              <Lock className="h-3 w-3" />
              <span className="text-white/90">{host}</span>
              <span>{scenes[scene].path}</span>
              <Star className="ml-auto h-3.5 w-3.5" />
            </div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[9px] text-white">{avatar}</span>
          </div>

          {/* Viewport with camera */}
          <div className="relative overflow-hidden" style={{ width: VIEW.w, height: VIEW.h }}>
            <div ref={layerRef} className="absolute left-0 top-0 origin-top-left" style={{ width: VIEW.w, height: VIEW.h }}>
              <div key={scene} className="absolute inset-0 animate-[fade-in_300ms_ease-out]">
                {children(t, scene)}
              </div>
              <div ref={dragRef} className="pointer-events-none absolute left-0 top-0 rounded-[2px] border border-[#3b82f6] bg-[#3b82f6]/10 opacity-0" />
              <div ref={rippleRef} className="pointer-events-none absolute left-0 top-0 h-7 w-7 rounded-full border-2 border-white/80 bg-white/20 opacity-0" />
              <div ref={cursorRef} className="pointer-events-none absolute left-0 top-0 z-20">
                <CursorArrow />
              </div>
            </div>
          </div>

          {/* Loop fade */}
          <div className="pointer-events-none absolute inset-0 bg-[#0d0d0f]" style={{ opacity: clamp(fade) }} />
        </div>
      </div>

      {/* Player controls: kept quiet so the walkthrough stays the focus */}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-px h-3.5 w-3.5" />}
        </button>
        <div className="flex-1">
          <div
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={Math.round(t)}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setT(clamp((e.clientX - r.left) / r.width) * (duration - 0.01));
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setT((v) => Math.min(duration - 0.01, v + 2));
              if (e.key === "ArrowLeft") setT((v) => Math.max(0, v - 2));
            }}
            className="group relative flex h-3 cursor-pointer items-center"
          >
            <div className="relative h-[2px] w-full rounded-full bg-fg/10 transition-[height] group-hover:h-1">
              <div className="absolute inset-y-0 left-0 rounded-full bg-fg/40" style={{ width: `${(t / duration) * 100}%` }} />
            </div>
          </div>
          <div className="relative mt-1 h-4 text-[11px]">
            {scenes.map((sc, i) => (
              <button
                key={sc.label}
                type="button"
                onClick={() => setT(sc.t + 0.01)}
                className={`absolute whitespace-nowrap transition-colors hover:text-fg ${i === scene ? "text-fg/70" : "text-muted/70"}`}
                style={{ left: `${(sc.t / duration) * 100}%` }}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-right text-[11px] text-muted/70">*Actual product differs</figcaption>
    </figure>
  );
}
