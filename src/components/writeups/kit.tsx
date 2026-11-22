"use client";

// Small building blocks for interactive writeups: a figure frame, a labelled slider, a
// segmented control, and an SVG plot that draws functions and maps pointer positions back
// to data coordinates. Everything is themed from the site's tokens, so it works in dark mode.

import { useEffect, useId, useRef, useState } from "react";

export function Figure({ children, caption }: { children: React.ReactNode; caption?: React.ReactNode }) {
  return (
    <figure className="my-10 rounded-2xl bg-surface p-4 ring-1 ring-line sm:p-6">
      {children}
      {caption && <figcaption className="mt-4 text-[13px] leading-relaxed text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
  format = (v) => v.toFixed(2),
}: {
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  const id = useId();
  return (
    <div className="grid grid-cols-[4.5rem_minmax(0,1fr)_3.5rem] items-center gap-3 text-[13px]">
      <label htmlFor={id} className="font-medium text-fg">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-full cursor-pointer accent-[var(--fg)]"
      />
      <output htmlFor={id} className="tabular text-right font-mono text-muted">
        {format(value)}
      </output>
    </div>
  );
}

export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex flex-wrap gap-1.5">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`rounded-full px-3 py-1 text-[13px] font-medium transition-colors ${
              on ? "bg-fg text-ink" : "text-muted ring-1 ring-inset ring-line hover:text-fg"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Button({ children, onClick, primary = false }: { children: React.ReactNode; onClick: () => void; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
        primary ? "bg-fg text-ink hover:opacity-85" : "text-fg ring-1 ring-inset ring-line hover:bg-fg/[0.05]"
      }`}
    >
      {children}
    </button>
  );
}

/** A plotted function. `style` sets the stroke; colour defaults to the text colour. */
export type Curve = {
  f: (x: number) => number;
  style?: "bold" | "solid" | "dashed" | "faint";
  color?: string;
  key?: string;
};

export type Scale = { x: (v: number) => number; y: (v: number) => number; ix: (px: number) => number; iy: (py: number) => number };

// Drawn at its real width (measured), so labels stay 11px and dots stay full size on phones.
const DEFAULT_W = 600;

/** An SVG plot over [x0, x1] × [y0, y1] with a light grid, axes through zero, and curves. */
export function Plot({
  x,
  y,
  height = 320,
  curves = [],
  grid = 1,
  gridY,
  children,
  onPointer,
  onPointerUp,
  ariaLabel,
}: {
  x: [number, number];
  y: [number, number];
  height?: number;
  curves?: Curve[];
  /** spacing of grid lines and labels; `gridY` overrides it for the y axis */
  grid?: number;
  gridY?: number;
  children?: (s: Scale) => React.ReactNode;
  /** called with data coordinates while the pointer is down (dragging) */
  onPointer?: (dx: number, dy: number, phase: "down" | "move") => void;
  onPointerUp?: () => void;
  ariaLabel: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [W, setW] = useState(DEFAULT_W);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(260, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const clip = useId().replace(/[^a-zA-Z0-9]/g, "");
  const pad = 28;
  // Narrow screens get a slightly shorter plot, so it isn't a tall strip.
  const H = Math.round(Math.min(height, Math.max(240, W * 0.85)));
  const s: Scale = {
    x: (v) => pad + ((v - x[0]) / (x[1] - x[0])) * (W - 2 * pad),
    y: (v) => H - pad - ((v - y[0]) / (y[1] - y[0])) * (H - 2 * pad),
    ix: (px) => x[0] + ((px - pad) / (W - 2 * pad)) * (x[1] - x[0]),
    iy: (py) => y[0] + ((H - pad - py) / (H - 2 * pad)) * (y[1] - y[0]),
  };

  const toData = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    return [s.ix(((e.clientX - r.left) / r.width) * W), s.iy(((e.clientY - r.top) / r.height) * H)] as const;
  };

  const ticks = (a: number, b: number, step: number) => {
    const out: number[] = [];
    for (let v = Math.ceil(a / step) * step; v <= b + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6);
    return out;
  };
  const xs = ticks(x[0], x[1], grid);
  const ys = ticks(y[0], y[1], gridY ?? grid);

  const path = (f: (v: number) => number) => {
    const n = 240;
    let d = "";
    let pen = false;
    for (let i = 0; i <= n; i++) {
      const vx = x[0] + ((x[1] - x[0]) * i) / n;
      const vy = f(vx);
      if (!Number.isFinite(vy)) {
        pen = false;
        continue;
      }
      d += `${pen ? "L" : "M"}${s.x(vx).toFixed(2)} ${s.y(vy).toFixed(2)}`;
      pen = true;
    }
    return d;
  };

  const strokes = {
    bold: { w: 3, dash: undefined, o: 1 },
    solid: { w: 2, dash: undefined, o: 1 },
    dashed: { w: 1.75, dash: "6 5", o: 0.85 },
    faint: { w: 2, dash: undefined, o: 0.3 },
  };

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={ariaLabel}
      className={`block h-auto w-full select-none ${onPointer ? "cursor-crosshair touch-none" : ""}`}
      onPointerDown={
        onPointer
          ? (e) => {
              (e.target as Element).setPointerCapture?.(e.pointerId);
              const [dx, dy] = toData(e);
              onPointer(dx, dy, "down");
            }
          : undefined
      }
      onPointerMove={
        onPointer
          ? (e) => {
              if (e.buttons === 0 && e.pointerType === "mouse") return;
              const [dx, dy] = toData(e);
              onPointer(dx, dy, "move");
            }
          : undefined
      }
      onPointerUp={onPointerUp}
    >
      <defs>
        <clipPath id={clip}>
          <rect x={pad} y={pad} width={W - 2 * pad} height={H - 2 * pad} />
        </clipPath>
      </defs>
      <g stroke="var(--line)" strokeWidth={1}>
        {xs.map((v) => (
          <line key={`gx${v}`} x1={s.x(v)} x2={s.x(v)} y1={pad} y2={H - pad} />
        ))}
        {ys.map((v) => (
          <line key={`gy${v}`} y1={s.y(v)} y2={s.y(v)} x1={pad} x2={W - pad} />
        ))}
      </g>
      <g stroke="var(--muted)" strokeWidth={1.25} opacity={0.7}>
        {x[0] <= 0 && x[1] >= 0 && <line x1={s.x(0)} x2={s.x(0)} y1={pad} y2={H - pad} />}
        {y[0] <= 0 && y[1] >= 0 && <line y1={s.y(0)} y2={s.y(0)} x1={pad} x2={W - pad} />}
      </g>
      <g fontSize={11} fill="var(--muted)" fontFamily="var(--font-geist-mono), monospace">
        {xs
          .filter((v) => v !== 0)
          .map((v) => (
            <text key={`tx${v}`} x={s.x(v)} y={H - pad + 16} textAnchor="middle">
              {v}
            </text>
          ))}
        {ys
          .filter((v) => v !== 0)
          .map((v) => (
            <text key={`ty${v}`} x={pad - 6} y={s.y(v) + 4} textAnchor="end">
              {v}
            </text>
          ))}
      </g>
      <g clipPath={`url(#${clip})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {curves.map((c, i) => {
          const st = strokes[c.style ?? "solid"];
          return (
            <path
              key={c.key ?? i}
              d={path(c.f)}
              stroke={c.color ?? "var(--fg)"}
              strokeWidth={st.w}
              strokeDasharray={st.dash}
              opacity={st.o}
            />
          );
        })}
        {children?.(s)}
      </g>
    </svg>
  );
}

export const relu = (z: number) => Math.max(0, z);
export const fmt = (v: number, d = 2) => (Math.abs(v) < 1e-9 ? 0 : v).toFixed(d);

/** Series colours for charts that need to tell several lines apart (globals.css). */
export const series = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
