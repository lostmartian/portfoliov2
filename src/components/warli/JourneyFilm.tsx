"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Figure, Hut, Tree } from "./Warli";

/**
 * The hero's film: my journey, told in Warli, with no captions.
 *
 * The world is a long strip of "sets" (Pune and school → Wadia College →
 * the train to IIIT Gwalior → graduation → back to Pune and Omara →
 * Pondicherry → Lonavala → Matheran → JRat's / Niche → First500days and
 * AgentDiff → Kolkata → Ooty & Coonoor). A camera follows the character
 * across it; distant trips are joined by film cuts. The stage has depth:
 * rows of scenery behind and in front of the main row scale about a vanishing
 * point, so they converge and slide past at their own speeds like a real
 * camera, and people walk into and out of the scene. The viewBox always
 * matches the element's own shape, so nothing is cropped on any screen.
 */

const G = 282; // ground line of the main row, where the story walks
const H = 360; // bottom of the world; the strip below G is foreground
const HZ = 200; // the horizon: every depth row scales about (camera, HZ)
// Set centres; long gaps where the train runs; the last is Pune Airport. The world starts 2000 units
// before Pune and runs 2400 past the airport, so even an ultrawide camera never sees past its edges.
const C = [900, 2400, 5600, 8800, 10400, 11900, 13400, 14900, 16400, 17900, 19400, 20900].map((c) => c + 1100);
const W = C[C.length - 1] + 2400;

type P = [number, number] | [number, number, number]; // x, y, and depth (1 = the main row, <1 further, >1 nearer)
type Pose = "stand" | "raise" | "dance" | "hold" | "walk";
type Prop = "bag" | "scroll" | "book" | "flask" | "pack" | "umbrella" | "cup" | null;

const ln = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const box = { ...ln, fill: "var(--background)" }; // outlines that hide what stands behind them

/* ------------------------------------------------------------------ */
/* Small Warli pieces                                                   */
/* ------------------------------------------------------------------ */

/** Simple flat-roofed city building with window dots. */
function Building({ x, w, h, y = G - 6 }: { x: number; w: number; h: number; y?: number }) {
  const rows = Math.floor((h - 10) / 12);
  const cols = Math.floor((w - 8) / 10);
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} {...box} strokeWidth={1.1} />
      {Array.from({ length: rows * cols }, (_, i) => (
        <rect key={i} x={x + 6 + (i % cols) * 10} y={y - h + 8 + Math.floor(i / cols) * 12} width="3" height="4" fill="currentColor" opacity="0.7" />
      ))}
    </g>
  );
}

function Skyline({ x0, x1, seed = 1, y = G - 6 }: { x0: number; x1: number; seed?: number; y?: number }) {
  const out: ReactNode[] = [];
  let x = x0;
  let i = 0;
  while (x < x1) {
    const w = 26 + ((i * 37 + seed * 13) % 28);
    const h = 36 + ((i * 53 + seed * 29) % 56);
    out.push(<Building key={i} x={x} w={w} h={h} y={y} />);
    x += w + 6;
    i++;
  }
  return <g opacity="0.55">{out}</g>;
}

/** A small platform with a canopy. */
function Station({ x0, x1 }: { x0: number; x1: number }) {
  return (
    <g>
      <rect x={x0} y={G - 6} width={x1 - x0} height="6" fill="currentColor" opacity="0.35" />
      {[x0 + 14, (x0 + x1) / 2, x1 - 14].map((x) => (
        <line key={x} x1={x} x2={x} y1={G - 6} y2={G - 50} {...ln} strokeWidth={1.2} />
      ))}
      <path d={`M${x0 - 6} ${G - 46} L${(x0 + x1) / 2} ${G - 58} L${x1 + 6} ${G - 46} Z`} fill="currentColor" />
    </g>
  );
}

/** Seated, cross-legged figure. Seat at (x, y). */
function Seated({ x, y, s = 1.35 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-27" r="3.2" fill="currentColor" />
      <polygon points="-5.5,-23 5.5,-23 0,-13.5" fill="currentColor" />
      <polygon points="0,-13.5 -5.5,-5 5.5,-5" fill="currentColor" />
      <path d="M-5 -4 L-11 -1 L4 -1" {...ln} strokeWidth={1.1 / s} />
      <path d="M5 -21 L10 -14 L14 -12" {...ln} strokeWidth={1.1 / s} />
    </g>
  );
}

/** Desk with a laptop per job: code for client work, a heartbeat for First500days. */
function Desk({ x, screens }: { x: number; screens: ("code" | "ecg")[] }) {
  const w = 34 + (screens.length - 1) * 28;
  return (
    <g>
      <path d={`M${x - 4} ${G - 16} H${x + w} M${x} ${G - 16} V${G} M${x + w - 4} ${G - 16} V${G}`} {...ln} />
      {screens.map((screen, i) => (
        <g key={i} transform={`translate(${x + 6 + i * 28} ${G - 16})`}>
          <rect className="screen" x="0" y="-18" width="22" height="16" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
          {screen === "code" ? (
            <path d="M4 -13 h8 M4 -9 h12 M4 -5 h6" stroke="currentColor" strokeWidth="1" />
          ) : (
            <path className="ecg" d="M2 -9 h5 l2 -5 l3 9 l2 -4 h7" fill="none" stroke="var(--kumkum)" strokeWidth="1.2" pathLength={1} />
          )}
          <path d="M-3 0 H25" {...ln} />
        </g>
      ))}
    </g>
  );
}

/** Countryside the train passes through: fields, farm huts, trees, a farmer at work. */
function Countryside({ x0, x1, seed }: { x0: number; x1: number; seed: number }) {
  const out: ReactNode[] = [];
  for (let x = x0, i = 0; x < x1; i++) {
    const kind = (i * 7 + seed) % 5;
    if (kind === 0 || kind === 3) out.push(<Tree key={i} x={x} y={G} h={46 + ((i * 13 + seed) % 40)} branches={6} />);
    if (kind === 1) out.push(<g key={i} transform={`translate(${x} ${G})`}><Hut /></g>);
    if (kind === 2)
      out.push(
        <g key={i}>
          {[0, 1, 2].map((r) => (
            <line key={r} x1={x - 50} x2={x + 50} y1={G - 10 - r * 7} y2={G - 10 - r * 7} stroke="var(--leaf)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8" />
          ))}
        </g>
      );
    if (kind === 4) out.push(<Figure key={i} x={x} y={G} s={1.15} pose="hold" />);
    x += 150 + ((i * 41 + seed * 17) % 120);
  }
  return <g opacity="0.85">{out}</g>;
}

/** A signboard on two posts. Width follows the text. */
function Sign({ x, y = G, text, h = 30, tone = "plain" }: { x: number; y?: number; text: string; h?: number; tone?: "plain" | "station" | "road" }) {
  const w = text.length * 6.6 + 16;
  const fill = tone === "station" ? "var(--haldi)" : tone === "road" ? "var(--leaf)" : "var(--background)";
  const ink = tone === "road" ? "var(--background)" : "var(--foreground)";
  return (
    <g>
      <line x1={x - w / 2 + 6} x2={x - w / 2 + 6} y1={y} y2={y - h} stroke="currentColor" strokeWidth="1.3" />
      <line x1={x + w / 2 - 6} x2={x + w / 2 - 6} y1={y} y2={y - h} stroke="currentColor" strokeWidth="1.3" />
      <rect x={x - w / 2} y={y - h - 16} width={w} height="16" fill={fill} stroke="currentColor" strokeWidth="1.2" />
      <text x={x} y={y - h - 4.5} textAnchor="middle" fontSize="11" fontWeight="600" fill={ink} fontFamily="var(--font-body), sans-serif">
        {text}
      </text>
    </g>
  );
}

/** An Indian roadside milestone: the date, carved in stone. */
function Milestone({ x, text }: { x: number; text: string }) {
  const w = Math.max(30, text.length * 5.4 + 10);
  return (
    <g>
      <path d={`M${x - w / 2} ${G} V${G - 18} a${w / 2} ${w / 2.4} 0 0 1 ${w} 0 V${G} Z`} fill="var(--background)" stroke="currentColor" strokeWidth="1.1" />
      <path d={`M${x - w / 2} ${G - 18} a${w / 2} ${w / 2.4} 0 0 1 ${w} 0 Z`} fill="var(--haldi)" opacity="0.85" />
      <text x={x} y={G - 6} textAnchor="middle" fontSize="8.5" fontWeight="600" fill="var(--foreground)" fontFamily="var(--font-body), sans-serif">
        {text}
      </text>
    </g>
  );
}

/** The aeroplane: Warli lines, nose to the right. */
function Plane({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d="M-40 -4 H26 q12 0 14 6 q-2 6 -14 6 H-36 Z" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
      <polygon points="-38,-4 -46,-20 -32,-20 -24,-4" fill="currentColor" />
      <polygon points="-8,4 4,4 -16,24 -26,24" fill="currentColor" />
      <polygon points="-8,-2 4,-2 -10,-14 -18,-14" fill="currentColor" opacity="0.6" />
      {[-18, -10, -2, 6, 14].map((wx) => (
        <circle key={wx} cx={wx} cy="1" r="1.6" fill="currentColor" />
      ))}
    </g>
  );
}

/** A van with luggage on the roof: seven of us went to Lonavala. */
function Van({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} ${G})`}>
      <path d="M-40 -6 V-30 H20 L32 -17 V-6 Z" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
      {[-34, -21, -8, 5].map((wx) => (
        <rect key={wx} x={wx} y="-26" width="10" height="8" fill="currentColor" opacity="0.4" />
      ))}
      <path d="M19 -26 L27 -18 H19 Z" fill="currentColor" opacity="0.4" />
      <rect x="-32" y="-36" width="26" height="6" rx="1" fill="currentColor" />
      {[-26, 18].map((cx) => (
        <g key={cx} transform={`translate(${cx} -5)`}>
          <circle r="5" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
          <g className="wheel-spin">
            <path d="M-3.5 0 H3.5 M0 -3.5 V3.5" stroke="currentColor" strokeWidth="1" />
          </g>
        </g>
      ))}
    </g>
  );
}

/** A fishing boat that bobs; with `sail` it also drifts along the horizon, trailing a wake. */
function Boat({ x, y, sail = true, delay = 0 }: { x: number; y: number; sail?: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={sail ? "boat-sail" : undefined}>
        {sail && (
          <g className="boat-wake" {...ln} strokeWidth={1}>
            <path d="M-6 6 q -10 -3 -22 0" />
            <path d="M-14 10 q -12 -3 -26 0" opacity="0.6" />
          </g>
        )}
        <g className="boat-bob" style={{ animationDelay: `${delay}s` }}>
          <path d="M0 0 h48 q -4 10 -14 10 h-24 q -8 0 -10 -10 z" fill="currentColor" />
          <path d="M22 0 V-36" {...ln} />
          <path className="boat-canvas" d="M22 -34 Q 40 -20 22 -4 Z" fill="var(--haldi)" stroke="currentColor" strokeWidth={1.1} />
          <path d="M22 -34 L 6 -6 H22" fill="none" stroke="currentColor" strokeWidth={1} opacity="0.7" />
          <circle cx="36" cy="-5" r="2.4" fill="currentColor" />
          <path d="M36 -3 v4" {...ln} />
        </g>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Depth: rows of scenery behind and in front of the main row           */
/* ------------------------------------------------------------------ */

/** A row at depth z (1 = the main row) is the main row scaled about the vanishing point (cx, HZ). */
const depthAt = (z: number, cx: number) =>
  z === 1 ? undefined : `translate(${(cx * (1 - z)).toFixed(1)} ${(HZ * (1 - z)).toFixed(1)}) scale(${z})`;

/** Deterministic 0..1 noise from integer maths, so the server and every browser draw the same scenery. */
const rnd = (i: number, k: number) => (((Math.imul(i + 1, 2654435761) ^ Math.imul(k + 7, 40503)) >>> 0) % 997) / 997;
const r1 = (n: number) => Math.round(n * 10) / 10;
const oval = (cx: number, cy: number, rx: number, ry: number) =>
  `M${r1(cx - rx)} ${r1(cy)}a${rx} ${ry} 0 1 0 ${r1(2 * rx)} 0a${rx} ${ry} 0 1 0 ${r1(-2 * rx)} 0`;

type Theme = "city" | "country" | "sea" | "river" | "ghat" | "forest" | "tea";

interface Row {
  z: number;
  op: number;
  hill: string; // big soft masses
  mass: string; // solid ink
  ink: string; // lines
  leaf: string;
  wave: string;
  bloom: string; // haldi flowers
  boats: number[];
}

/** Fill one row of a place's scenery. Shapes are drawn on the main row's ground line; the row's transform sets them back or forward. */
function fillRow(R: Row, theme: Theme, c: number, seed: number) {
  const { z } = R;
  const far = z < 0.5;
  const texture = z > 0.75 && z < 1; // the near-ground row: marks on the ground only
  const front = z > 1;
  const half = 1500 / z;

  const tuft = (x: number, k = 1) =>
    (R.ink += `M${x} ${G}q${-1 * k} ${-4 * k} ${-5 * k} ${-6 * k}M${x} ${G}q0 ${-5 * k} ${1 * k} ${-8 * k}M${x} ${G}q${2 * k} ${-4 * k} ${5 * k} ${-5 * k}`);
  const tree = (x: number, h: number) => {
    R.ink += `M${x} ${G}V${r1(G - h)}`;
    for (let b = 0; b < 3; b++) {
      const y = G - h * (0.5 + b * 0.16);
      const w = Math.round(h * (0.26 - b * 0.06));
      R.ink += `M${x} ${r1(y + w * 0.6)}L${x - w} ${r1(y)}M${x} ${r1(y + w * 0.6)}L${x + w} ${r1(y)}`;
      R.leaf += oval(x - w, y, 5, 2.6) + oval(x + w, y, 5, 2.6);
    }
    R.leaf += oval(x, G - h, 3.5, 6);
  };
  const hut = (x: number) => {
    R.ink += `M${x - 13} ${G}V${G - 18}H${x + 13}V${G}M${x - 18} ${G - 18}L${x} ${G - 33}L${x + 18} ${G - 18}Z`;
    R.mass += `M${x - 4} ${G}v-10h8v10z`;
  };
  const building = (x: number, w: number, h: number, windows: boolean) => {
    R.ink += `M${x} ${G}V${G - h}H${x + w}V${G}`;
    if (windows) for (let wy = G - h + 8; wy < G - 12; wy += 16) for (let wx = x + 6; wx < x + w - 6; wx += 12) R.mass += `M${wx} ${wy}h3v4h-3z`;
  };
  const temple = (x: number) => {
    R.mass += `M${x} ${G}V${G - 30}L${x + 13} ${G - 72}L${x + 26} ${G - 30}V${G}Z`;
    R.ink += `M${x + 13} ${G - 72}V${G - 88}l10 4l-10 4`;
  };
  const mesa = (x: number, w: number, h: number) =>
    (R.hill += `M${x} ${G}L${r1(x + w * 0.18)} ${r1(G - h)}L${r1(x + w * 0.66)} ${r1(G - h * 0.92)}L${r1(x + w * 0.8)} ${r1(G - h * 0.55)}L${x + w} ${G}Z`);
  const mound = (x: number, w: number, h: number) => (R.hill += `M${x} ${G}Q${r1(x + w / 2)} ${r1(G - h * 2)} ${x + w} ${G}Z`);
  const teaRow = (x: number, n: number, r: number) => {
    for (let k = 0; k < n; k++) R.leaf += oval(x + k * r * 2.1, G - r * 0.45, r, r * 0.45);
  };
  const oak = (x: number, h: number) => {
    R.ink += `M${x} ${G}V${G - h}`;
    for (let k = 0; k < 4; k++) R.leaf += oval(x + (k % 2 ? 5 : -5), G - h + 8 + k * 12, 5, 2.5);
  };
  const waves = (x: number) => (R.wave += `M${x} ${G - 3}q7 -4 14 0t14 0`);
  const rock = (x: number, k = 1) => (R.mass += `M${x - 9 * k} ${G}q${k} ${-8 * k} ${9 * k} ${-9 * k}q${8 * k} ${k} ${9 * k} ${9 * k}z`);
  const flower = (x: number) => {
    R.ink += `M${x} ${G}v-10`;
    R.bloom += oval(x, G - 11, 2.4, 2.4);
  };
  const fern = (x: number) => (R.ink += `M${x} ${G}q-6 -10 -14 -12M${x} ${G}q0 -12 2 -18M${x} ${G}q6 -9 14 -10`);
  const shell = (x: number) => (R.mass += `M${x - 5} ${G}a5 5 0 0 1 10 0z`);
  const sand = (x: number) => (R.mass += `M${x} ${G - 3}h1.6v1.6h-1.6zM${x + 9} ${G - 5}h1.6v1.6h-1.6zM${x + 4} ${G - 1}h1.6v1.6h-1.6z`);

  for (let x = Math.round(c - half), i = 0; x < c + half; i++) {
    const a = rnd(i, seed);
    const b = rnd(i, seed + 101);
    let step = 90 + Math.round(b * 90);

    /** Run the first option whose threshold `a` falls under. */
    const pick = (...opts: [number, () => unknown][]) => opts.find(([t]) => a < t)?.[1]();

    if (texture) {
      step = 40 + Math.round(b * 50);
      if (theme === "river") waves(x);
      else if (theme === "sea") pick([0.3, () => shell(x)], [1, () => sand(x)]);
      else if (theme === "tea") {
        teaRow(x, 4, 9);
        step += 80;
      } else pick([0.88, () => tuft(x)], [1, () => flower(x)]);
    } else if (front) {
      step = 70 + Math.round(b * 120);
      if (theme === "sea") pick([0.3, () => shell(x)], [0.5, () => rock(x, 0.8)], [1, () => sand(x)]);
      else if (theme === "tea") {
        teaRow(x, 3, 12);
        step += 60;
      } else if (theme === "forest") pick([0.55, () => fern(x)], [0.8, () => rock(x)], [1, () => tuft(x, 1.8)]);
      else if (theme === "ghat") pick([0.4, () => tuft(x, 1.8)], [0.6, () => (R.wave += oval(x, G - 1, 12, 2))], [0.8, () => rock(x)], [1, () => flower(x)]);
      else pick([0.45, () => tuft(x, 1.8)], [0.7, () => flower(x)], [0.85, () => rock(x)], [1, () => (R.leaf += oval(x, G - 5, 10, 5) + oval(x + 9, G - 8, 8, 6))]);
    } else if (theme === "city" || (theme === "river" && far)) {
      if (i % 9 === 4) {
        temple(x);
        step = 50;
      } else if (a < 0.72) {
        const w = 26 + Math.round(b * 34);
        building(x, w, (far ? 44 : 30) + Math.round(a * (far ? 90 : 50)), a < 0.4);
        step = w + 10 + Math.round(a * 30);
      } else if (a < 0.86 && !far) {
        hut(x + 18);
        step = 60;
      } else {
        tree(x + 10, 50 + a * 40);
        step = 50;
      }
    } else if (theme === "country") {
      if (far && a < 0.3) {
        mound(x, 260 + Math.round(b * 200), 30 + Math.round(a * 60));
        step = 140;
      } else pick([0.5, () => tree(x, 46 + b * 60)], [0.7, () => hut(x)], [0.84, () => (R.mass += `M${x - 12} ${G}q12 -36 24 0z`)], [1, () => teaRow(x, 5, 6)]);
    } else if (theme === "ghat") {
      if (far) {
        mesa(x, 320 + Math.round(b * 260), 90 + Math.round(a * 70));
        step = 220 + Math.round(b * 120);
      } else pick([0.3, () => mesa(x, 160, 40 + Math.round(b * 30))], [1, () => tree(x, 50 + b * 50)]);
    } else if (theme === "forest") {
      tree(x, (far ? 80 : 60) + b * 60);
      step = (far ? 34 : 60) + Math.round(a * 50);
    } else if (theme === "tea") {
      step = far ? 120 : 130;
      if (far) pick([0.4, () => mound(x, 300, 50 + Math.round(b * 40))], [1, () => oak(x, 70 + b * 40)]);
      else pick([0.75, () => teaRow(x, 6, 8)], [1, () => oak(x, 80 + b * 40)]);
    } else {
      // water: the sea at Pondicherry, the Hooghly at Kolkata
      waves(x);
      step = 50 + Math.round(a * 50);
      if (a > 0.93) R.boats.push(x);
    }
    x += step;
  }
}

/** The places, each with its own rows. Train stretches get open country. */
const SCENES = ([
  [C[0], "city"],
  [C[1], "city"],
  [C[1] + 1600, "country"],
  [C[2], "country"],
  [C[2] + 1600, "country"],
  [C[3], "city"],
  [C[4], "sea"],
  [C[5], "ghat"],
  [C[6], "forest"],
  [C[7], "city"],
  [C[8], "city"],
  [C[9], "river"],
  [C[10], "tea"],
  [C[11], "city"],
] as [number, Theme][]).map(([c, theme], si) => ({
  c,
  theme,
  rows: ([
    [0.42, 0.34],
    [0.64, 0.5],
    [0.84, 0.6],
    [1.3, 0.8],
    [1.7, 0.9],
  ] as [number, number][]).map(([z, op], li) => {
    const R: Row = { z, op, hill: "", mass: "", ink: "", leaf: "", wave: "", bloom: "", boats: [] };
    fillRow(R, theme, c, si * 31 + li * 7 + 3);
    return R;
  }),
}));

/** Which places' scenery to show for a camera centre, crossfading near the midpoint between two. */
function sceneWeights(cam: number): [number, number][] {
  const by = SCENES.map((s, i) => [i, Math.abs(cam - s.c)] as [number, number]).sort((p, q) => p[1] - q[1]);
  const w = Math.min(1, 0.5 + (by[1][1] - by[0][1]) / 600);
  return w > 0.99 ? [[by[0][0], 1]] : [[by[0][0], w], [by[1][0], 1 - w]];
}

const rowY = (z: number) => HZ + (G - HZ) * z; // where the ground at depth z meets the screen

/**
 * The ground plane itself: lines running into the distance (furrows, tea rows, sand ripples) that
 * converge on the horizon and swing as the camera moves. Drawn fresh each frame from the camera.
 */
function Ground3D({ cx, view, scenes }: { cx: number; view: number; scenes: [number, number][] }) {
  return (
    <g>
      {scenes.map(([si, w]) => {
        const { theme } = SCENES[si];
        if (theme === "sea" || theme === "river") {
          // ripples on the sand, closer together toward the water
          const d = [0.9, 1.08, 1.3, 1.6].map((z) => `M${(cx - view).toFixed(0)} ${rowY(z).toFixed(1)}H${(cx + view).toFixed(0)}`).join("");
          return <path key={si} d={d} {...ln} strokeWidth={1} strokeDasharray="2 10" opacity={0.35 * w} />;
        }
        const gap = theme === "tea" ? 70 : theme === "city" ? 150 : 110;
        const [zA, zB] = [0.46, 2];
        let d = "";
        for (let x = Math.floor((cx - view / (2 * zA)) / gap) * gap; x < cx + view / (2 * zA); x += gap) {
          const xa = cx + zA * (x - cx);
          const xb = cx + zB * (x - cx);
          d += `M${xa.toFixed(1)} ${rowY(zA).toFixed(1)}L${xb.toFixed(1)} ${rowY(zB).toFixed(1)}`;
        }
        return theme === "tea" ? (
          <path key={si} d={d} fill="none" stroke="var(--leaf)" strokeWidth={4} strokeLinecap="round" strokeDasharray="0.1 9" opacity={0.45 * w} />
        ) : theme === "city" ? (
          <path key={si} d={d} {...ln} strokeWidth={0.8} strokeDasharray="8 8" opacity={0.18 * w} />
        ) : (
          <path key={si} d={d} fill="none" stroke="var(--leaf)" strokeWidth={1.6} strokeLinecap="round" strokeDasharray="0.1 7" opacity={0.4 * w} />
        );
      })}
    </g>
  );
}

function SceneRow({ r, cx, w }: { r: Row; cx: number; w: number }) {
  return (
    <g transform={depthAt(r.z, cx)} opacity={r.op * w}>
      {r.hill && <path d={r.hill} fill="currentColor" opacity="0.28" />}
      {r.mass && <path d={r.mass} fill="currentColor" />}
      {r.ink && <path d={r.ink} {...ln} />}
      {r.leaf && <path d={r.leaf} fill="var(--leaf)" />}
      {r.wave && <path d={r.wave} {...ln} strokeWidth={1.1} />}
      {r.bloom && <path d={r.bloom} fill="var(--haldi)" />}
      {r.boats.map((x, i) => (
        <Boat key={x} x={x} y={G - 4} sail={false} delay={-i * 0.7} />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* The sets                                                             */
/* ------------------------------------------------------------------ */

const SETS = (
  <g>
    {/* 0 · Pune: the city, Shaniwar Wada's gate, home and school */}
    {/* more of Pune, out to the edge of the world */}
    <Skyline x0={40} x1={C[0] - 460} seed={7} />
    {[C[0] - 1900, C[0] - 1500, C[0] - 1100, C[0] - 800].map((x, i) => (
      <Tree key={x} x={x} y={G} h={90 + (i % 2) * 40} branches={8} />
    ))}
    <Skyline x0={C[0] + 330} x1={C[0] + 640} seed={2} />
    <g transform={`translate(${C[0] - 420} ${G - 6})`}>
      <path d="M-70 0 V-40 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 V0" {...ln} />
      <path d="M-14 0 V-22 a14 14 0 0 1 28 0 V0" fill="currentColor" />
      {[-80, 72].map((x) => (
        <g key={x}>
          <rect x={x} y="-56" width="16" height="56" {...ln} />
          <polygon points={`${x - 2},-56 ${x + 8},-70 ${x + 18},-56`} fill="currentColor" />
        </g>
      ))}
    </g>
    <g transform={`translate(${C[0] - 320} ${G})`}>
      <path d="M-22 0 V-28 H22 V0" {...ln} />
      <polygon points="-27,-28 0,-45 27,-28" fill="currentColor" />
      <path d="M-6 0 V-11 a6 6 0 0 1 12 0 V0" {...ln} />
    </g>
    <g transform={`translate(${C[0] + 150} ${G})`}>
      <rect x="-70" y="-58" width="140" height="58" {...box} />
      <polygon points="-78,-58 0,-82 78,-58" {...ln} />
      <g className="bell-swing" style={{ transformOrigin: `0px -70px` }}>
        <path d="M-5 -62 q5 -12 10 0 z" fill="currentColor" />
      </g>
      <path d="M-46 0 V-20 a6 6 0 0 1 12 0 V0" fill="currentColor" />
      {[-10, 14, 38].map((x) => (
        <rect key={x} x={x} y="-44" width="14" height="14" {...ln} strokeWidth={1.1} />
      ))}
      <path d="M58 -82 V-112" {...ln} />
      <polygon points="58,-112 76,-106 58,-100" fill="currentColor" />
    </g>
    <Tree x={C[0] - 170} y={G} h={70} branches={6} />

    <Milestone x={C[0] + 300} text="Std 1–10" />
    <Tree x={C[0] - 560} y={G} h={150} branches={11} />
    <Tree x={C[0] + 580} y={G} h={128} branches={10} delay={200} />

    {/* 1 · Nowrosjee Wadia College: the clock tower and pointed arches */}
    <Sign x={C[1] - 170} text="Nowrosjee Wadia College" h={34} />
    <Milestone x={C[1] + 330} text="Std 11–12 · Science" />
    <Sign x={C[1] + 570} text="Pune Jn." tone="station" h={50} />
    <Tree x={C[1] - 560} y={G} h={150} branches={11} />
    <Tree x={C[1] - 260} y={G} h={84} branches={7} />
    <g transform={`translate(${C[1] + 40} ${G})`}>
      <rect x="-130" y="-56" width="260" height="56" {...box} />
      {Array.from({ length: 9 }, (_, i) => -116 + i * 28).map((x) => (
        <path key={x} d={`M${x} -12 V-34 q7 -12 14 0 V-12`} {...ln} strokeWidth={1.1} />
      ))}
      <rect x="-16" y="-120" width="32" height="64" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
      <polygon points="-20,-120 0,-150 20,-120" fill="currentColor" />
      <circle cx="0" cy="-100" r="8" {...ln} />
      <path d="M0 -100 V-106 M0 -100 L4 -98" {...ln} strokeWidth={1.1} />
      <path d="M-8 0 V-18 q8 -14 16 0 V0" fill="currentColor" />
    </g>
    <Tree x={C[1] + 250} y={G} h={66} branches={6} />
    <Station x0={C[1] + 440} x1={C[1] + 700} />

    {/* the long way north, and back */}
    <Countryside x0={C[1] + 860} x1={C[2] - 720} seed={1} />
    <Countryside x0={C[2] + 700} x1={C[3] - 720} seed={4} />

    {/* 2 · Gwalior: the fort on its hill, and the IIIT campus below */}
    <Sign x={C[2] - 430} text="Gwalior Jn." tone="station" h={50} />
    <Sign x={C[2] - 40} text="IIIT Gwalior" h={26} />
    <Milestone x={C[2] + 40} text="2019–2024" />
    <Tree x={C[2] + 620} y={G} h={140} branches={11} />
    <Station x0={C[2] - 560} x1={C[2] - 300} />
    <path d={`M${C[2] - 80} ${G} C ${C[2] + 40} ${G - 40}, ${C[2] + 120} ${G - 120}, ${C[2] + 240} ${G - 124} S ${C[2] + 460} ${G - 40}, ${C[2] + 560} ${G}`} fill="currentColor" opacity="0.1" />
    <g transform={`translate(${C[2] + 240} ${G - 122})`}>
      <path d="M-90 0 V-24 h8 v4 h8 v-4 h8 v4 h8 v-4 h8 v4 h8 v-4 h8 v4 h8 v-4 h8 v4 h8 v-4 h8 v4 h8 v-4 h8 v4 h8 v-4 h12 V0" {...ln} />
      {[-90, -30, 30, 78].map((x) => (
        <g key={x}>
          <rect x={x} y="-38" width="12" height="14" {...ln} strokeWidth={1.1} />
          <path d={`M${x - 1} -38 q7 -12 14 0`} fill="currentColor" />
        </g>
      ))}
    </g>
    <g transform={`translate(${C[2] - 150} ${G})`}>
      <rect x="-80" y="-54" width="160" height="54" {...box} />
      <path d="M-86 -54 H86" {...ln} strokeWidth={2} />
      {[-64, -40, 40, 64].map((x) => (
        <line key={x} x1={x} x2={x} y1="-54" y2="0" {...ln} strokeWidth={1.1} />
      ))}
      <path d="M-14 -54 a14 14 0 0 1 28 0" fill="currentColor" />
      <path d="M-50 0 V-22 h14 V0" fill="currentColor" />
    </g>
    <Tree x={C[2] - 300} y={G} h={60} branches={5} />

    {/* 3 · back in Pune: Omara's first hut (its roof a network), the desk, the city */}
    <Sign x={C[3] - 430} text="Pune Jn." tone="station" h={50} />
    <Sign x={C[3] + 360} text="Omara Technologies" h={136} />
    <Tree x={C[3] - 640} y={G} h={140} branches={11} />
    <Station x0={C[3] - 560} x1={C[3] - 300} />
    <Skyline x0={C[3] + 280} x1={C[3] + 620} seed={3} />
    <g transform={`translate(${C[3] + 360} ${G - 6})`}>
      <rect x="-24" y="-124" width="48" height="124" {...box} />
      {Array.from({ length: 30 }, (_, i) => (
        <line key={i} x1="-18" x2="18" y1={-116 + i * 4} y2={-116 + i * 4} stroke="currentColor" strokeOpacity="0.3" />
      ))}
    </g>
    <g transform={`translate(${C[3] - 80} ${G}) scale(1.3)`}>
      <Hut />
    </g>
    <Desk x={C[3] + 150} screens={["code"]} />

    {/* 4 · Pondicherry: the sea, a palm, a boat, the lighthouse */}
    <Sign x={C[4] - 420} text="Pondicherry" tone="road" h={30} />
    <Milestone x={C[4] + 160} text="Dec 2024" />
    {[-620, 640].map((dx, i) => (
      <g key={dx} transform={`translate(${C[4] + dx} ${G}) scale(${1.5 - i * 0.2})`}>
        <path d="M0 0 C 4 -30, -2 -60, 10 -92" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        {[-60, -25, 10, 45, 80, 120].map((a) => (
          <path key={a} d="M10 -92 q 18 -6 30 10" fill="none" stroke="var(--leaf)" strokeWidth="1.6" strokeLinecap="round" transform={`rotate(${a} 10 -92)`} />
        ))}
      </g>
    ))}
    <g>
      <line x1={C[4] - 800} x2={C[4] + 800} y1={G - 64} y2={G - 64} {...ln} strokeWidth={1} opacity="0.6" />
      {[G - 52, G - 38, G - 24].map((y, i) => (
        <path
          key={y}
          className="waves"
          style={{ animationDelay: `${-i * 0.9}s` }}
          d={`M${C[4] - 820} ${y} ${Array.from({ length: 41 }, () => "q 10 -5 20 0 t 20 0").join(" ")}`}
          {...ln}
          strokeWidth={1.1}
          opacity={0.75 - i * 0.15}
        />
      ))}
      {/* a fishing boat sailing out along the horizon */}
      <Boat x={C[4] - 40} y={G - 62} />
      <g transform={`translate(${C[4] - 260} ${G})`}>
        <path d="M0 0 C 4 -30, -2 -60, 10 -92" {...ln} strokeWidth={2.2} />
        {[-60, -25, 10, 45, 80, 120].map((a) => (
          <path key={a} d="M10 -92 q 18 -6 30 10" {...ln} transform={`rotate(${a} 10 -92)`} />
        ))}
      </g>
      <g transform={`translate(${C[4] + 520} ${G})`}>
        <path d="M-12 0 L-7 -96 H7 L12 0 Z" {...ln} />
        {[-24, -48, -72].map((y) => (
          <path key={y} d={`M-10 ${y} H10`} {...ln} strokeWidth={4} opacity="0.5" />
        ))}
        <rect x="-8" y="-108" width="16" height="12" fill="var(--haldi)" stroke="currentColor" strokeWidth="1.2" />
        <polygon points="-10,-108 0,-118 10,-108" fill="currentColor" />
        <g className="beam" style={{ transformOrigin: "0px -102px" }}>
          <polygon points="0,-102 -90,-118 -90,-86" fill="var(--haldi)" opacity="0.25" />
        </g>
      </g>
    </g>

    {/* 5 · Lonavala & Khandala in the monsoon: ghat cliffs, a waterfall, rain */}
    <Sign x={C[5] - 470} text="Lonavala · Khandala" tone="road" h={30} />
    <Milestone x={C[5] - 120} text="Aug 2025" />
    <Tree x={C[5] - 640} y={G} h={150} branches={11} />
    <Tree x={C[5] + 640} y={G} h={136} branches={10} delay={200} />
    <g>
      <path d={`M${C[5] + 120} ${G} L${C[5] + 150} ${G - 120} L${C[5] + 210} ${G - 150} L${C[5] + 300} ${G - 142} L${C[5] + 360} ${G - 160} L${C[5] + 470} ${G - 130} L${C[5] + 540} ${G} Z`} fill="currentColor" opacity="0.16" />
      {[0, 7, 14].map((dx, i) => (
        <path key={dx} className="fall" style={{ animationDelay: `${-i * 0.3}s` }} d={`M${C[5] + 296 + dx} ${G - 142} V${G - 8}`} stroke="var(--background)" strokeWidth="3" strokeDasharray="8 6" />
      ))}
      <ellipse cx={C[5] + 306} cy={G - 4} rx="34" ry="4" fill="currentColor" opacity="0.35" />
      <Tree x={C[5] - 260} y={G} h={72} branches={6} />
      <Tree x={C[5] - 160} y={G} h={52} branches={5} />
      <g className="rain" opacity="0.5">
        {Array.from({ length: 80 }, (_, i) => {
          const x = C[5] - 640 + ((i * 97) % 1280);
          const y = 40 + ((i * 61) % 220);
          return <line key={i} x1={x} y1={y} x2={x - 6} y2={y + 14} stroke="currentColor" strokeWidth="1" />;
        })}
      </g>
    </g>

    {/* 6 · Matheran: forest, red earth, the toy train on the hill */}
    <Sign x={C[6] - 330} text="Matheran" tone="road" h={30} />
    <Milestone x={C[6] + 120} text="Dec 2025" />
    <Tree x={C[6] - 660} y={G} h={156} branches={12} />
    <Tree x={C[6] + 660} y={G} h={150} branches={11} delay={200} />
    <g>
      <path d={`M${C[6] - 700} ${G - 70} C ${C[6] - 300} ${G - 110}, ${C[6] + 200} ${G - 60}, ${C[6] + 700} ${G - 100}`} {...ln} strokeWidth={1} opacity="0.6" />
      <g className="toy-train">
        <g transform={`translate(${C[6] - 520} ${G - 82})`}>
          {[0, 22, 44].map((x) => (
            <g key={x}>
              <rect x={x} y="-12" width="18" height="10" {...ln} strokeWidth={1.1} />
              <circle cx={x + 4} cy="0" r="2" fill="currentColor" />
              <circle cx={x + 14} cy="0" r="2" fill="currentColor" />
            </g>
          ))}
          <path d="M66 -2 V-14 H78 L84 -8 V-2 Z" fill="currentColor" />
        </g>
      </g>
      {[-560, -440, -300, 260, 380, 520].map((dx, i) => (
        <Tree key={dx} x={C[6] + dx} y={G} h={60 + (i % 3) * 16} branches={6} />
      ))}
    </g>

    {/* 7 · JRat's, for Niche Technology: finance, a registry, the rack */}
    <Sign x={C[7] + 380} text="Niche Technologies" h={100} />
    <Sign x={C[7] - 320} text="JRat's Studio" h={30} />
    <Milestone x={C[7] + 200} text="Jan 2026" />
    <Tree x={C[7] + 620} y={G} h={140} branches={11} />
    <Skyline x0={C[7] - 640} x1={C[7] - 380} seed={5} />
    <g transform={`translate(${C[7] + 380} ${G})`}>
      <polygon points="-70,-70 0,-96 70,-70" fill="currentColor" />
      <rect x="-64" y="-70" width="128" height="8" {...ln} />
      {[-52, -26, 0, 26, 52].map((x) => (
        <line key={x} x1={x} x2={x} y1="-62" y2="-6" {...ln} strokeWidth={2} />
      ))}
      <rect x="-72" y="-6" width="144" height="6" {...ln} />
    </g>

    {/* 8 · August 2026: First500days (healthcare AI), and AgentDiff's flag */}
    <Sign x={C[8] - 380} text="First500days" h={74} />
    <Sign x={C[8] + 270} text="AgentDiff" h={24} />
    <Tree x={C[8] - 640} y={G} h={140} branches={11} />
    <Tree x={C[8] + 600} y={G} h={120} branches={10} delay={200} />
    <g transform={`translate(${C[8] - 380} ${G})`}>
      <rect x="-50" y="-70" width="100" height="70" {...box} />
      <rect x="-9" y="-62" width="18" height="18" fill="var(--kumkum)" />
      <path d="M-3 -62 h6 v6 h6 v6 h-6 v6 h-6 v-6 h-6 v-6 h6 z" fill="var(--background)" />
      <path d="M-12 0 V-22 h24 V0" fill="currentColor" />
    </g>
    <Desk x={C[8] - 150} screens={["code", "ecg"]} />
    <path d={`M${C[8] + 200} ${G} V${G - 96}`} {...ln} strokeWidth={1.8} />

    {/* 9 · Kolkata: Howrah Bridge over the Hooghly, a taxi crossing */}
    <Sign x={C[9] - 560} text="Kolkata" tone="road" h={30} />
    <Milestone x={C[9] + 520} text="Aug 2026" />
    <Tree x={C[9] + 660} y={G} h={140} branches={11} />
    <g>
      {[G - 14, G - 6].map((y, i) => (
        <path key={y} className="waves" style={{ animationDelay: `${-i}s` }} d={`M${C[9] - 340} ${y} ${Array.from({ length: 17 }, () => "q 10 -4 20 0 t 20 0").join(" ")}`} {...ln} strokeWidth={1} opacity="0.6" />
      ))}
      <path d={`M${C[9] - 470} ${G} L${C[9] - 340} ${G - 30} H${C[9] + 340} L${C[9] + 470} ${G}`} {...ln} strokeWidth={2} />
      {[-200, 200].map((x) => (
        <g key={x}>
          <path d={`M${C[9] + x - 10} ${G - 30} V${G - 150} M${C[9] + x + 10} ${G - 30} V${G - 150} M${C[9] + x - 10} ${G - 150} H${C[9] + x + 10}`} {...ln} strokeWidth={2} />
          {Array.from({ length: 6 }, (_, k) => (
            <path key={k} d={`M${C[9] + x - 10} ${G - 50 - k * 18} L${C[9] + x + 10} ${G - 32 - k * 18}`} {...ln} strokeWidth={1} />
          ))}
        </g>
      ))}
      <path d={`M${C[9] - 340} ${G - 30} L${C[9] - 190} ${G - 150} L${C[9]} ${G - 60} L${C[9] + 190} ${G - 150} L${C[9] + 340} ${G - 30}`} {...ln} strokeWidth={1.6} />
      {Array.from({ length: 16 }, (_, k) => {
        const x = C[9] - 320 + k * 40;
        return <line key={k} x1={x} x2={x + 20} y1={G - 30} y2={G - 70 - (Math.abs(x - C[9]) < 190 ? 0 : 20)} {...ln} strokeWidth={0.9} opacity="0.7" />;
      })}
      <g className="taxi">
        <g transform={`translate(${C[9] - 330} ${G - 32})`}>
          <rect x="0" y="-10" width="26" height="8" fill="var(--haldi)" stroke="currentColor" strokeWidth="1" />
          <path d="M5 -10 l3 -5 h10 l3 5" fill="var(--haldi)" stroke="currentColor" strokeWidth="1" />
          <circle cx="6" cy="-1" r="2.2" fill="currentColor" />
          <circle cx="20" cy="-1" r="2.2" fill="currentColor" />
        </g>
      </g>
    </g>

    {/* 10 · Ooty & Coonoor: tea gardens and the Nilgiri train */}
    <Sign x={C[10] - 560} text="Ooty · Coonoor" tone="road" h={30} />
    <Sign x={C[10] + 380} y={G - 52} text="Coonoor" tone="station" h={22} />
    <Milestone x={C[10] + 120} text="Sep 2026" />
    {[-660, 640, 700].map((dx, i) => (
      <g key={dx} transform={`translate(${C[10] + dx} ${G})`}>
        <path d={`M0 0 V-${150 - i * 20}`} stroke="currentColor" strokeWidth="2" />
        {Array.from({ length: 7 }, (_, k) => (
          <ellipse key={k} cx={k % 2 ? 8 : -8} cy={-50 - k * 14 + i * 10} rx="9" ry="4" fill="var(--leaf)" opacity="0.8" />
        ))}
      </g>
    ))}
    <g>
      <path d={`M${C[10] - 700} ${G} C ${C[10] - 450} ${G - 120}, ${C[10] - 150} ${G - 110}, ${C[10] + 80} ${G - 40} S ${C[10] + 450} ${G - 150}, ${C[10] + 700} ${G - 60} V${G} Z`} fill="var(--leaf)" opacity="0.12" />
      {Array.from({ length: 5 }, (_, r) => (
        <path key={r} d={`M${C[10] - 640} ${G - 14 - r * 18} C ${C[10] - 400} ${G - 60 - r * 18}, ${C[10] - 160} ${G - 50 - r * 16}, ${C[10] + 60} ${G - 20 - r * 6}`} stroke="var(--leaf)" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 11" fill="none" />
      ))}
      <path d={`M${C[10] + 120} ${G - 70} L${C[10] + 640} ${G - 140}`} {...ln} strokeWidth={1} opacity="0.6" />
      <g className="nilgiri">
        <g transform={`translate(${C[10] + 140} ${G - 74}) rotate(-7.7)`}>
          {[0, 22].map((x) => (
            <g key={x}>
              <rect x={x} y="-12" width="18" height="10" fill="var(--leaf)" stroke="currentColor" strokeWidth="1" />
              <circle cx={x + 4} cy="0" r="2" fill="currentColor" />
              <circle cx={x + 14} cy="0" r="2" fill="currentColor" />
            </g>
          ))}
          <path d="M44 -2 V-14 H56 L62 -8 V-2 Z" fill="currentColor" />
        </g>
      </g>
    </g>

    {/* 11 · Pune Airport: terminal, tower, runway */}
    <g>
      <Sign x={C[11] - 380} text="Pune Airport" h={70} />
      <rect x={C[11] - 520} y={G - 52} width="300" height="52" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={C[11] - 510 + i * 24} y={G - 44} width="16" height="22" fill="currentColor" opacity="0.25" />
      ))}
      <path d={`M${C[11] - 200} ${G} V${G - 110} M${C[11] - 186} ${G} V${G - 110}`} stroke="currentColor" strokeWidth="1.4" />
      <path d={`M${C[11] - 214} ${G - 110} h42 l-6 -18 h-30 z`} fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
      <rect x={C[11] - 120} y={G - 6} width="900" height="6" fill="currentColor" opacity="0.25" />
      <line x1={C[11] - 110} x2={C[11] + 770} y1={G - 3} y2={G - 3} stroke="var(--background)" strokeWidth="1.5" strokeDasharray="14 12" />
      <Tree x={C[11] - 640} y={G} h={130} branches={10} />
      <Countryside x0={C[11] + 900} x1={W - 60} seed={9} />
    </g>
  </g>
);

/** Far hills and fields, long enough for parallax across the whole world. */
function hills(len: number, base: number, amp: number, seed: number) {
  let d = `M0 ${H}`;
  for (let x = 0; x <= len; x += 120) {
    const y = base - amp * (0.5 + 0.5 * Math.sin(x / 310 + seed) * Math.cos(x / 170 + seed * 2));
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return `${d} L${len} ${H} Z`;
}
const FAR = hills(W * 0.4 + 4000, 190, 70, 1);
const MID = hills(W * 0.7 + 4000, 238, 34, 4);

/** The railway: one straight line from Pune to Gwalior and back to Pune. */
const RAIL0 = C[1] + 380;
const RAIL1 = C[3] - 260;
const RAIL_Y = G - 2;
const RAILS = (
  <g>
    <line x1={RAIL0} x2={RAIL1} y1={RAIL_Y} y2={RAIL_Y} stroke="currentColor" strokeWidth="1.2" />
    <line x1={RAIL0} x2={RAIL1} y1={RAIL_Y + 4} y2={RAIL_Y + 4} stroke="currentColor" strokeWidth="1.2" />
    {Array.from({ length: Math.floor((RAIL1 - RAIL0) / 14) }, (_, i) => (
      <line key={i} x1={RAIL0 + i * 14} x2={RAIL0 + i * 14 + 4} y1={RAIL_Y - 1} y2={RAIL_Y + 6} stroke="currentColor" strokeOpacity="0.45" />
    ))}
  </g>
);

const GROUND = (
  <g>
    <line x1="0" x2={W} y1={G} y2={G} stroke="currentColor" strokeWidth="1.2" />
    {Array.from({ length: Math.floor(W / 60) }, (_, i) => {
      const x = 20 + i * 60 + ((i * 17) % 23);
      return <path key={i} d={`M${x} ${G} l-2 -5 M${x} ${G} l0 -6 M${x} ${G} l2 -5`} stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />;
    })}
  </g>
);

/* ------------------------------------------------------------------ */
/* The train                                                            */
/* ------------------------------------------------------------------ */

function Train({ front, moving }: { front: number; moving: boolean }) {
  const cars = [0, 1, 2];
  return (
    <g transform={`translate(${front} ${RAIL_Y})`}>
      <g className={moving ? "train-bob" : ""}>
      {/* engine (faces right) */}
      <g transform="translate(-36 0)">
        <path d="M0 -4 V-24 H20 L34 -12 V-4 Z" fill="currentColor" />
        <rect x="4" y="-32" width="6" height="8" fill="currentColor" />
        <rect x="22" y="-20" width="6" height="5" fill="var(--background)" />
        {[7, 24].map((cx) => (
          <g key={cx} transform={`translate(${cx} -2)`}>
            <circle r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.3" />
            <g className={moving ? "wheel-spin" : ""}>
              <path d="M-3 0 H3 M0 -3 V3" stroke="currentColor" strokeWidth="1" />
            </g>
          </g>
        ))}
        {moving && (
          <>
            <circle className="smoke" cx="7" cy="-40" r="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle className="smoke" cx="0" cy="-48" r="4.5" fill="none" stroke="currentColor" strokeWidth="1" style={{ animationDelay: "-0.8s" }} />
            <circle className="smoke" cx="-8" cy="-55" r="5.5" fill="none" stroke="currentColor" strokeWidth="1" style={{ animationDelay: "-1.6s" }} />
          </>
        )}
      </g>
      {/* coaches */}
      {cars.map((i) => (
        <g key={i} transform={`translate(${-72 - i * 34} 0)`}>
          <rect x="0" y="-24" width="30" height="20" {...ln} />
          <circle cx="9" cy="-15" r="2.4" fill="currentColor" />
          <circle cx="21" cy="-15" r="2.4" fill="currentColor" />
          {[6, 24].map((cx) => (
            <g key={cx} transform={`translate(${cx} -2)`}>
              <circle r="3.6" fill="var(--background)" stroke="currentColor" strokeWidth="1.3" />
              <g className={moving ? "wheel-spin" : ""}>
                <path d="M-2.6 0 H2.6 M0 -2.6 V2.6" stroke="currentColor" strokeWidth="1" />
              </g>
            </g>
          ))}
          <line x1="30" x2="36" y1="-8" y2="-8" stroke="currentColor" strokeWidth="1.2" />
        </g>
      ))}
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* The timeline                                                         */
/* ------------------------------------------------------------------ */

interface Step {
  d: number;
  path?: P[]; // walk along this
  at?: P; // or stand here
  pose?: Pose;
  s?: number; // character scale
  prop?: Prop;
  cam: number | "char" | "train" | "plane";
  show?: [number, number];
  fade?: [number, number];
  train?: [number, number]; // engine front x from → to
  seated?: boolean;
  ride?: boolean;
  caps?: boolean;
  nodes?: [number, number];
  flag?: [number, number];
  partner?: boolean;
  plane?: P[]; // the aeroplane flies this path during the step
  car?: [number, number]; // the van drives from → to
  crew?: number; // how many of us, me included
  cal?: string; // the date on the milestone when I'm back at a desk
}

const g = (x: number): P => [x, G];
const gz = (x: number, z: number): P => [x, G, z]; // on the ground, at depth z
const PUNE_FRONT = C[1] + 690;
const GWALIOR_FRONT = C[2] - 300;
const PUNE2_FRONT = C[3] - 300;

const A = C[11]; // Pune Airport

/** Walk into Pune Airport, board, take off and climb out of frame. */
const flyOut = (crew = 1): Step[] => [
  { d: 0.6, at: g(A - 600), pose: "walk", s: 1.35, prop: "pack", cam: A, fade: [1, 0], crew },
  { d: 2, path: [g(A - 600), g(A - 330)], pose: "walk", s: 1.35, prop: "pack", cam: A, crew },
  { d: 0.4, at: g(A - 330), pose: "stand", s: 1.35, prop: "pack", cam: A, show: [1, 0], crew },
  { d: 4.2, at: g(A - 330), cam: "plane", show: [0, 0], plane: [[A - 60, G - 16], [A + 320, G - 16], [A + 820, G - 110], [A + 1400, G - 138]] },
  { d: 0.5, at: g(A - 330), cam: "plane", show: [0, 0], plane: [[A + 1400, G - 138], [A + 1560, G - 140]], fade: [0, 1] },
];

/** The plane descends over the destination, then we walk in. */
const flyIn = (c: number, prop: Prop, crew = 1, z = 1): Step[] => [
  { d: 0.5, at: gz(c - 440, z), cam: c, show: [0, 0], plane: [[c - 900, 146], [c - 700, 150]], fade: [1, 0] },
  { d: 2.6, at: gz(c - 440, z), cam: c, show: [0, 0], plane: [[c - 700, 150], [c + 200, 192], [c + 900, 232]] },
  { d: 0.4, at: gz(c - 440, z), pose: "stand", s: 1.35, prop, cam: c, show: [0, 1], crew },
];

/** Between trips: a cut back to the desk, the date moving on. */
const OMARA_DESK = C[3] + 140;
const BOTH_DESK = C[8] - 160; // JRat's and First500days, side by side
const atDesk = (x: number, cam: number, cal: string, leave = false): Step[] => [
  { d: 0.5, at: g(x), cam, seated: true, cal, fade: [1, 0] },
  { d: 2.2, at: g(x), cam, seated: true, cal },
  ...(leave
    ? // packing up and walking out
      [
        { d: 2.2, path: [g(x), g(x + 520)], pose: "walk", s: 1.35, prop: "pack", cam, cal },
        { d: 0.6, path: [g(x + 520), g(x + 600)], pose: "walk", s: 1.35, prop: "pack", cam, cal, fade: [0, 1] },
      ]
    : [{ d: 0.5, at: g(x), cam, seated: true, cal, fade: [0, 1] }]),
] as Step[];

const STEPS: Step[] = [
  // Pune: a schoolchild walks from home to school, years pass, out comes a 10th-grader
  { d: 1, at: g(C[0] - 300), pose: "stand", s: 0.9, prop: "bag", cam: C[0], show: [0, 1], fade: [1, 0] },
  { d: 2.8, path: [g(C[0] - 300), g(C[0] + 104)], pose: "walk", s: 0.9, prop: "bag", cam: C[0] },
  { d: 0.4, at: g(C[0] + 104), pose: "stand", s: 0.9, prop: "bag", cam: C[0], show: [1, 0] },
  { d: 1.6, at: g(C[0] + 104), cam: C[0], show: [0, 0] },
  { d: 0.4, at: g(C[0] + 104), pose: "stand", s: 1.1, prop: "scroll", cam: C[0], show: [0, 1] },
  { d: 1.4, at: g(C[0] + 104), pose: "raise", s: 1.1, prop: "scroll", cam: C[0] },
  { d: 1.2, path: [g(C[0] + 104), g(C[0] + 330)], pose: "walk", s: 1.1, cam: C[0], fade: [0, 1] },
  // Wadia College: 11th & 12th, science
  { d: 0.6, at: g(C[1] - 520), pose: "walk", s: 1.15, prop: "book", cam: C[1], fade: [1, 0] },
  { d: 2.4, path: [g(C[1] - 520), g(C[1] - 60)], pose: "walk", s: 1.15, prop: "book", cam: C[1] },
  { d: 2.4, at: g(C[1] - 60), pose: "hold", s: 1.15, prop: "flask", cam: C[1] },
  { d: 2.4, path: [g(C[1] - 60), g(C[1] + 600)], pose: "walk", s: 1.15, prop: "pack", cam: C[1] },
  { d: 0.4, at: g(C[1] + 600), pose: "stand", s: 1.15, prop: "pack", cam: C[1], show: [1, 0] },
  // the train north to Gwalior
  { d: 8, at: g(C[1] + 600), cam: "train", show: [0, 0], train: [PUNE_FRONT, GWALIOR_FRONT] },
  // IIIT Gwalior: in through the campus, out with two degrees
  { d: 0.4, at: g(C[2] - 380), pose: "stand", s: 1.25, prop: "pack", cam: C[2], show: [0, 1] },
  { d: 1.8, path: [g(C[2] - 380), g(C[2] - 196)], pose: "walk", s: 1.25, prop: "pack", cam: C[2] },
  { d: 0.4, at: g(C[2] - 196), pose: "stand", s: 1.25, cam: C[2], show: [1, 0] },
  { d: 1.8, at: g(C[2] - 196), cam: C[2], show: [0, 0] },
  { d: 0.4, at: g(C[2] - 196), pose: "raise", s: 1.35, cam: C[2], show: [0, 1] },
  { d: 2.6, at: g(C[2] - 196), pose: "raise", s: 1.35, cam: C[2], caps: true },
  { d: 1.8, path: [g(C[2] - 196), g(C[2] - 380)], pose: "walk", s: 1.35, prop: "pack", cam: C[2] },
  { d: 0.4, at: g(C[2] - 380), pose: "stand", s: 1.35, prop: "pack", cam: C[2], show: [1, 0] },
  // back home to Pune
  { d: 8, at: g(C[2] - 380), cam: "train", show: [0, 0], train: [GWALIOR_FRONT, PUNE2_FRONT] },
  // Omara: founding engineer, building the first hut, then shipping at the desk
  { d: 0.4, at: g(C[3] - 380), pose: "stand", s: 1.35, cam: C[3], show: [0, 1] },
  { d: 1.8, path: [g(C[3] - 380), g(C[3] - 140)], pose: "walk", s: 1.35, cam: C[3] },
  { d: 2.6, at: g(C[3] - 140), pose: "hold", s: 1.35, cam: C[3], nodes: [0, 3] },
  { d: 1.6, path: [g(C[3] - 140), g(C[3] + 140)], pose: "walk", s: 1.35, cam: C[3] },
  { d: 2.6, at: g(C[3] + 140), cam: C[3], seated: true },
  { d: 0.6, at: g(C[3] + 140), cam: C[3], seated: true, fade: [0, 1] },
  // Pondicherry, December 2024: six of us fly out of Pune and walk down to the sea
  ...flyOut(6),
  ...flyIn(C[4], "pack", 6, 1.14),
  { d: 3, path: [gz(C[4] - 440, 1.14), gz(C[4] + 40, 0.84)], pose: "walk", s: 1.35, prop: "pack", cam: C[4], crew: 6 },
  { d: 2.6, at: gz(C[4] + 40, 0.84), pose: "raise", s: 1.35, cam: C[4], crew: 6 },
  { d: 0.6, at: gz(C[4] + 40, 0.84), pose: "raise", s: 1.35, cam: C[4], crew: 6, fade: [0, 1] },
  ...atDesk(OMARA_DESK, C[3], "Jan 2025"),
  // Lonavala & Khandala, August 2025: seven of us in a van, into the monsoon
  { d: 0.5, at: gz(C[5] - 420, 1.12), cam: C[5], show: [0, 0], car: [C[5] - 900, C[5] - 780], fade: [1, 0] },
  { d: 2.4, at: gz(C[5] - 420, 1.12), cam: C[5], show: [0, 0], car: [C[5] - 780, C[5] - 480] },
  { d: 0.6, at: gz(C[5] - 420, 1.12), pose: "stand", s: 1.35, prop: "umbrella", cam: C[5], show: [0, 1], crew: 7 },
  { d: 3, path: [gz(C[5] - 420, 1.12), gz(C[5] + 30, 0.86)], pose: "walk", s: 1.35, prop: "umbrella", cam: C[5], crew: 7 },
  { d: 2.4, at: gz(C[5] + 30, 0.86), pose: "stand", s: 1.35, prop: "umbrella", cam: C[5], crew: 7 },
  { d: 0.6, at: gz(C[5] + 30, 0.86), pose: "stand", s: 1.35, prop: "umbrella", cam: C[5], crew: 7, fade: [0, 1] },
  ...atDesk(OMARA_DESK, C[3], "Sep 2025"),
  // Matheran, December 2025: four of us, on horses (no cars up there)
  { d: 0.6, at: gz(C[6] - 440, 1.1), cam: C[6], ride: true, crew: 4, fade: [1, 0] },
  { d: 4.2, path: [gz(C[6] - 440, 1.1), gz(C[6] + 220, 0.9)], cam: C[6], ride: true, crew: 4 },
  { d: 0.6, at: gz(C[6] + 220, 0.9), cam: C[6], ride: true, crew: 4, fade: [0, 1] },
  // a last stretch at Omara, then I leave in January 2026
  ...atDesk(OMARA_DESK, C[3], "Jan 2026", true),
  // JRat's, for Niche Technology, January 2026: carrying the rack
  { d: 0.6, at: g(C[7] - 420), pose: "walk", s: 1.35, cam: C[7], fade: [1, 0], partner: true },
  { d: 1.8, path: [g(C[7] - 420), g(C[7] - 160)], pose: "walk", s: 1.35, cam: C[7], partner: true },
  { d: 3, path: [g(C[7] - 160), g(C[7] + 140)], pose: "walk", s: 1.35, cam: C[7], partner: true },
  { d: 0.6, at: g(C[7] + 140), pose: "stand", s: 1.35, cam: C[7], partner: true, fade: [0, 1] },
  // August 2026: First500days at the desk, then AgentDiff's flag goes up
  { d: 0.6, at: g(C[8] - 300), pose: "walk", s: 1.35, cam: C[8], fade: [1, 0] },
  { d: 1.4, path: [g(C[8] - 300), g(C[8] - 160)], pose: "walk", s: 1.35, cam: C[8] },
  { d: 2.6, at: g(C[8] - 160), cam: C[8], seated: true },
  { d: 1.8, path: [g(C[8] - 120), g(C[8] + 176)], pose: "walk", s: 1.35, cam: C[8] },
  { d: 3.2, at: g(C[8] + 176), pose: "raise", s: 1.35, cam: C[8], flag: [0, 1] },
  { d: 1, at: g(C[8] + 176), pose: "raise", s: 1.35, cam: C[8], flag: [1, 1] },
  { d: 0.6, at: g(C[8] + 176), pose: "raise", s: 1.35, cam: C[8], flag: [1, 1], fade: [0, 1] },
  // Kolkata, August 2026: three of us across Howrah Bridge
  ...flyOut(3),
  ...flyIn(C[9], "pack", 3),
  { d: 4.4, path: [g(C[9] - 440), g(C[9] - 470 + 30), [C[9] - 340, G - 30], [C[9] + 240, G - 30]], pose: "walk", s: 1.35, prop: "pack", cam: C[9], crew: 3 },
  { d: 1.2, at: [C[9] + 240, G - 30], pose: "stand", s: 1.35, prop: "pack", cam: C[9], crew: 3 },
  { d: 0.6, at: [C[9] + 240, G - 30], pose: "stand", s: 1.35, prop: "pack", cam: C[9], crew: 3, fade: [0, 1] },
  ...atDesk(BOTH_DESK, C[8], "Sep 2026"),
  // Ooty & Coonoor, September 2026: five of us in the tea gardens, chai in hand
  ...flyIn(C[10], "pack", 5, 1.16),
  { d: 3, path: [gz(C[10] - 440, 1.16), gz(C[10] - 40, 0.9)], pose: "walk", s: 1.35, prop: "pack", cam: C[10], crew: 5 },
  { d: 3.6, at: gz(C[10] - 40, 0.9), pose: "hold", s: 1.35, prop: "cup", cam: C[10], crew: 5 },
  { d: 0.8, at: gz(C[10] - 40, 0.9), pose: "hold", s: 1.35, prop: "cup", cam: C[10], crew: 5, fade: [0, 1] },
  ...atDesk(BOTH_DESK, C[8], "Oct 2026"),
];

const STARTS = STEPS.reduce<number[]>((acc, s, i) => [...acc, i ? acc[i - 1] + STEPS[i - 1].d : 0], []);
const LOOP = STARTS[STARTS.length - 1] + STEPS[STEPS.length - 1].d;

const smooth = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const mix = (a: number, b: number, k: number) => a + (b - a) * k;

function along(pts: P[], f: number): [number, number, number] {
  const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  let d = Math.max(0, Math.min(1, f)) * lens.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i] || i === lens.length - 1) {
      const k = lens[i] ? d / lens[i] : 0;
      return [mix(pts[i][0], pts[i + 1][0], k), mix(pts[i][1], pts[i + 1][1], k), mix(pts[i][2] ?? 1, pts[i + 1][2] ?? 1, k)];
    }
    d -= lens[i];
  }
  const last = pts[pts.length - 1];
  return [last[0], last[1], last[2] ?? 1];
}

interface Frame {
  t: number;
  z: number; // my depth
  plane: { x: number; y: number; rot: number } | null;
  car: number | null;
  step: Step;
  k: number;
  at: [number, number];
  show: number;
  fade: number;
  train: number;
  trainMoving: boolean;
  nodes: number;
  flag: number;
  cam: number;
}

function frame(t: number): Frame {
  let i = STARTS.length - 1;
  while (i > 0 && STARTS[i] > t) i--;
  const step = STEPS[i];
  const k = Math.min(1, (t - STARTS[i]) / step.d);
  const p = step.path ? along(step.path, smooth(k)) : step.at ?? g(C[0]);
  const at: [number, number] = [p[0], p[1]];

  // where the train is: it waits at the last station it reached
  let train = PUNE_FRONT;
  for (let j = 0; j <= i; j++) if (STEPS[j].train) train = STEPS[j].train![1];
  if (step.train) train = mix(step.train[0], step.train[1], smooth(k));

  let nodes = 0;
  let flag = 0;
  for (let j = 0; j < i; j++) {
    if (STEPS[j].nodes) nodes = STEPS[j].nodes![1];
    if (STEPS[j].flag) flag = STEPS[j].flag![1];
  }
  if (step.nodes) nodes = Math.floor(mix(step.nodes[0], step.nodes[1] + 0.99, k));
  if (step.flag) flag = mix(step.flag[0], step.flag[1], smooth(k));

  // the aeroplane, nose along its path
  let plane: Frame["plane"] = null;
  if (step.plane) {
    const pts = step.plane;
    const k2 = step.cam === "plane" ? k * k : k; // accelerate down the runway
    const [px, py] = along(pts, k2);
    const [nx, ny] = along(pts, Math.min(1, k2 + 0.02));
    plane = { x: px, y: py, rot: (Math.atan2(ny - py, nx - px) * 180) / Math.PI };
  }

  // the car stays parked for the rest of its scene
  let car: number | null = null;
  for (let j = i; j >= 0; j--) {
    if (STEPS[j].cam !== step.cam) break;
    if (STEPS[j].car) {
      car = j === i ? mix(STEPS[j].car![0], STEPS[j].car![1], smooth(k)) : STEPS[j].car![1];
      break;
    }
  }

  const cam =
    step.cam === "train" ? train - 160 : step.cam === "plane" ? (plane ? plane.x : at[0]) : step.cam === "char" ? at[0] : step.cam;
  return {
    t,
    z: p[2] ?? 1,
    plane,
    car,
    step,
    k,
    at,
    show: step.show ? mix(step.show[0], step.show[1], k) : 1,
    fade: step.fade ? mix(step.fade[0], step.fade[1], k) : 0,
    train,
    trainMoving: !!step.train && k > 0 && k < 1,
    nodes,
    flag,
    cam,
  };
}

/* ------------------------------------------------------------------ */
/* The character and props                                              */
/* ------------------------------------------------------------------ */

/** A Warli horse, trotting, with a rider. */
function Rider({ x, y, k, phase = 0 }: { x: number; y: number; k: number; phase?: number }) {
  const bob = Math.sin(k * Math.PI * 16 + phase) * 1.5;
  return (
    <g transform={`translate(${x} ${y + bob})`}>
      <path d="M-22 -26 L18 -26 L26 -40 L32 -36 L24 -24 L18 -16 L-20 -16 Z" fill="currentColor" />
      <path d="M-22 -24 l-8 10" {...ln} />
      {[-16, -8, 10, 16].map((lx, i) => (
        <path key={lx} d={`M${lx} -16 l${Math.sin(k * Math.PI * 16 + i + phase) * 4} 16`} {...ln} strokeWidth={1.3} />
      ))}
      <Seated x={-2} y={-24} s={1.2} />
    </g>
  );
}

/** One person with a prop. `gait` alternates the legs while walking. */
function Person({ x, y, s, pose, prop, gait = 0 }: { x: number; y: number; s: number; pose: Pose; prop?: Prop; gait?: number }) {
  const stride = pose === "walk" && gait % 2 === 1;
  const at: [number, number] = [x, y - (stride ? 1 : 0)];
  const hand: [number, number] = [at[0] + 14 * s, at[1] - 24 * s];
  return (
    <g>
      <Figure x={at[0]} y={at[1]} s={s} pose={stride ? "stand" : pose} />
      {prop === "bag" && <rect x={at[0] - 9 * s} y={at[1] - 26 * s} width={6 * s} height={9 * s} fill="currentColor" />}
      {prop === "pack" && <rect x={at[0] - 10 * s} y={at[1] - 27 * s} width={6 * s} height={11 * s} rx={1.5} fill="currentColor" />}
      {prop === "scroll" && <rect x={hand[0]} y={hand[1] - 2} width={4 * s} height={10 * s} fill="var(--background)" stroke="currentColor" strokeWidth="1.2" />}
      {prop === "book" && <rect x={hand[0] - 2} y={hand[1] + 2} width={8 * s} height={6 * s} fill="currentColor" />}
      {prop === "flask" && (
        <g transform={`translate(${hand[0] + 2} ${hand[1]})`}>
          <path d="M-2 -10 V-5 L-7 4 H7 L2 -5 V-10" fill="var(--background)" stroke="currentColor" strokeWidth="1.2" />
          <path d="M-5 1 H5 L3 -2 H-3 Z" fill="var(--leaf)" />
          {[0, 1, 2].map((b) => (
            <circle key={b} className="bubble" cx={-2 + b * 2} cy="-12" r="1.4" fill="none" stroke="var(--leaf)" style={{ animationDelay: `${b * 0.4}s` }} />
          ))}
        </g>
      )}
      {prop === "umbrella" && (
        <g>
          <path d={`M${at[0] + 4 * s} ${at[1] - 22 * s} V${at[1] - 46 * s}`} {...ln} strokeWidth={1.2} />
          <path d={`M${at[0] + 4 * s - 22} ${at[1] - 44 * s} a22 14 0 0 1 44 0 z`} fill="currentColor" />
        </g>
      )}
      {prop === "cup" && (
        <g transform={`translate(${hand[0] + 2} ${hand[1] + 2})`}>
          <path d="M-4 -6 H4 L3 2 H-3 Z" fill="var(--background)" stroke="currentColor" strokeWidth="1.2" />
          <path className="steam" d="M-1 -9 q-3 -4 0 -8 q3 -4 0 -8" pathLength={1} fill="none" stroke="currentColor" strokeWidth="1" />
          <path className="steam" d="M2 -9 q-3 -4 0 -8 q3 -4 0 -8" pathLength={1} fill="none" stroke="currentColor" strokeWidth="1" style={{ animationDelay: "-0.6s" }} />
        </g>
      )}
    </g>
  );
}

function Me({ f, gait }: { f: Frame; gait: number }) {
  const { step, at } = f;
  const s = step.s ?? 1.35;
  if (step.seated) return <Seated x={at[0]} y={at[1]} s={1.35} />;
  if (step.ride) return <Rider x={at[0]} y={at[1]} k={f.k} />;
  return (
    <g>
      <Person x={at[0]} y={at[1]} s={s} pose={step.pose ?? "stand"} prop={step.prop} gait={gait} />
      {step.caps &&
        [-1, 1].map((side) => {
          const up = Math.sin(Math.min(1, f.k * 1.15) * Math.PI) * 46;
          return (
            <g key={side} transform={`translate(${at[0] + side * 10 + side * f.k * 10} ${at[1] - 48 * s - up}) rotate(${side * f.k * 200})`}>
              <polygon points="-8,0 0,-3.5 8,0 0,3.5" fill="currentColor" />
              <path d="M5 1 v5" {...ln} strokeWidth={1} />
            </g>
          );
        })}
    </g>
  );
}

/** Where my friends walk, relative to me: [x offset, depth factor]. Some a step behind, some a step ahead. */
const FORM: [number, number][] = [
  [-40, 0.84],
  [30, 1.16],
  [54, 0.8],
  [-70, 1.2],
  [-96, 0.88],
  [84, 1.24],
];

/** Me, and on trips the friends who came along, each at their own depth. */
function Cast({ f, cx }: { f: Frame; cx: number }) {
  const { step, at, z } = f;
  const s = step.s ?? 1.35;
  const gait = step.path && f.k < 1 ? Math.floor(f.t * 6) : 0;
  const prop: Prop = step.prop === "umbrella" || step.prop === "cup" || step.prop === "pack" ? step.prop : null;
  const spread = step.ride ? 1.7 : 1; // horses need more room
  const crew = FORM.slice(0, Math.max(0, (step.crew ?? 1) - 1)).map(([dx, dz], i) => ({ i, x: at[0] + dx * spread, z: z * dz }));
  const mate = (m: { i: number; x: number; z: number }) => (
    <g key={m.i} transform={depthAt(m.z, cx)}>
      {step.ride ? (
        <Rider x={m.x} y={at[1]} k={f.k} phase={m.i + 1} />
      ) : (
        <Person x={m.x} y={at[1]} s={s} pose={step.pose === "stand" && m.i % 2 ? "raise" : step.pose ?? "stand"} prop={prop} gait={gait + m.i + 1} />
      )}
    </g>
  );
  return (
    <g>
      {crew.filter((m) => m.z < z).map(mate)}
      <g transform={depthAt(z, cx)}>
        <Me f={f} gait={gait} />
      </g>
      {crew.filter((m) => m.z >= z).map(mate)}
    </g>
  );
}

/* ------------------------------------------------------------------ */

const FLAG_DONE = (() => {
  const i = STEPS.findIndex((s) => s.flag && s.flag[0] === 0);
  return STARTS[i] + STEPS[i].d + 0.5;
})();

/** Where the camera wants to be (centre x), given the frame and the view width. */
function aim(f: Frame, view: number) {
  // On narrow screens follow the character within its set, so the action stays in frame.
  if (view < 1100 && typeof f.step.cam === "number") return Math.max(f.step.cam - 380, Math.min(f.step.cam + 380, f.at[0]));
  return f.cam;
}

export default function JourneyFilm({ className = "" }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const viewRef = useRef(1440);
  // viewBox size in world units: the element's own shape, at the zoom the old 30svh strip had
  const [size, setSize] = useState({ w: 1440, h: 420 });
  const [state, setState] = useState({ t: 1.2, cam: C[0] });

  // measure before the first paint, so the film never flashes at the wrong size
  useLayoutEffect(() => {
    const el = svg.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.height > 0) {
        const u = 300 / Math.min(280, Math.max(150, window.innerHeight * 0.27)); // world units per pixel
        viewRef.current = r.width * u;
        setSize({ w: r.width * u, h: Math.max(H, r.height * u) });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = setTimeout(() => setState({ t: FLAG_DONE, cam: aim(frame(FLAG_DONE), viewRef.current) }), 0);
      return () => clearTimeout(id);
    }

    let raf = 0, last = performance.now(), time = 1.2, acc = 0, visible = true;
    let cam = C[0];
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      time = (time + dt) % LOOP;
      const f = frame(time);
      const target = aim(f, viewRef.current);
      // glide toward the target; cut straight there while the screen is faded
      cam = f.fade > 0.9 || Math.abs(target - cam) > 1600 ? target : cam + (target - cam) * Math.min(1, dt * 4);
      acc += dt;
      if (acc > 1 / 30) {
        acc = 0;
        setState({ t: time, cam });
      }
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const f = frame(state.t);
  const view = size.w;
  const x0 = Math.max(0, Math.min(W - view, state.cam - view / 2));
  const y0 = H - size.h; // the world sits at the bottom; the sky above is the page's
  const cx = x0 + view / 2;
  const scenes = sceneWeights(cx);
  const rows = (near: boolean) =>
    scenes.flatMap(([si, w]) => SCENES[si].rows.filter((r) => r.z > 1 === near).map((r) => <SceneRow key={`${si}-${r.z}`} r={r} cx={cx} w={w} />));
  return (
    <svg ref={svg} viewBox={`${x0.toFixed(1)} ${y0.toFixed(1)} ${view.toFixed(1)} ${size.h.toFixed(1)}`} preserveAspectRatio="xMidYMax meet" className={`text-accent ${className}`} aria-hidden="true">
      {/* depth: far hills and fields drift slower than the ground */}
      <g transform={`translate(${(x0 * 0.6).toFixed(1)} 0)`}>
        <path d={FAR} fill="currentColor" opacity="0.06" />
      </g>
      <g transform={`translate(${(x0 * 0.3).toFixed(1)} 0)`}>
        <path d={MID} fill="currentColor" opacity="0.07" />
      </g>

      {/* the ground running into the distance, then rows behind the main row, nearest last */}
      <Ground3D cx={cx} view={view} scenes={scenes} />
      {rows(false)}

      {SETS}
      {RAILS}
      {GROUND}

      {/* the date at the desk moves on between trips */}
      <Milestone x={C[3] + 40} text={f.step.cam === C[3] && f.step.cal ? f.step.cal : "Oct 2024"} />
      <Milestone x={C[8] + 30} text={f.step.cam === C[8] && f.step.cal ? f.step.cal : "Aug 2026"} />

      {/* Omara's roof network lights up as it's built */}
      <g transform={`translate(${C[3] - 80} ${G - 58})`}>
        <path d="M-18 0 L0 -12 L18 0 M-18 0 L18 0" fill="none" stroke="var(--leaf)" strokeWidth="1.2" opacity={f.nodes ? 1 : 0.35} />
        {[[-18, 0], [0, -12], [18, 0]].map(([x, y], i) => (
          <circle key={i} className={i < f.nodes ? "pulse-node" : ""} cx={x} cy={y} r="3.2" fill={i < f.nodes ? "var(--leaf)" : "var(--background)"} stroke="var(--leaf)" strokeWidth="1.2" />
        ))}
      </g>

      {/* the rack, carried with a colleague */}
      {(() => {
        const carrying = f.step.partner;
        const lead = carrying ? f.at[0] : C[7] - 160;
        const px = lead + 62;
        return (
          <g>
            <Figure x={px} y={G} s={1.35} pose={carrying && f.step.path ? "walk" : "stand"} />
            <path d={`M${lead + 4} ${G - 44} H${px - 4}`} fill="none" stroke="currentColor" strokeWidth="1.8" />
            <g transform={`translate(${lead + 22} ${G - 42})`}>
              <path d="M9 0 v4" fill="none" stroke="currentColor" />
              <rect x="0" y="4" width="18" height="22" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
              {[9, 15, 21].map((y, i) => (
                <g key={y}>
                  <path d={`M3 ${y} h8`} stroke="currentColor" />
                  <circle className="led" cx="14.5" cy={y} r="1.3" fill="var(--leaf)" style={{ animationDelay: `${i * 0.4}s` }} />
                </g>
              ))}
            </g>
          </g>
        );
      })()}

      {/* AgentDiff's flag */}
      <polygon
        className="flag"
        points={`${C[8] + 200},${G - 26 - 66 * f.flag} ${C[8] + 230},${G - 18 - 66 * f.flag} ${C[8] + 200},${G - 10 - 66 * f.flag}`}
        fill="currentColor"
      />

      <Train front={f.train} moving={f.trainMoving} />
      {f.car !== null && <Van x={f.car} />}
      {f.plane && <Plane x={f.plane.x} y={f.plane.y} rot={f.plane.rot} />}

      <g opacity={f.show}>
        <Cast f={f} cx={cx} />
      </g>

      {/* rows in front: the near ground slides past fastest */}
      {rows(true)}

      {/* film cut */}
      {f.fade > 0 && <rect x={x0} y={y0} width={view} height={size.h} fill="var(--background)" opacity={f.fade} />}
    </svg>
  );
}
