/**
 * Warli line-art kit. Warli is the tribal painting tradition of the Sahyadri
 * foothills in Maharashtra: circles, triangles and lines on a mud wall.
 *
 * Everything here is plain SVG drawn in `currentColor`, so a scene takes the
 * colour of its parent. Strokes use pathLength=1 + the `.draw` class to draw
 * themselves in; fills use `.ink-in`. Pass `delay` (ms) to stagger.
 */
import type { CSSProperties, ReactNode } from "react";
import PuneSky from "./PuneSky";

const dl = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type Pose = "stand" | "raise" | "dance" | "hold" | "walk";

const ARMS: Record<Pose, [string, string]> = {
  stand: ["-5.5,-26 -9,-19 -7.5,-13", "5.5,-26 9,-19 7.5,-13"],
  raise: ["-5.5,-26 -10,-31 -11,-38", "5.5,-26 10,-31 11,-38"],
  dance: ["-5.5,-26 -12,-22", "5.5,-26 12,-22"],
  hold: ["-5.5,-26 -9,-19 -7.5,-13", "5.5,-26 11,-23 16,-25"],
  walk: ["-5.5,-26 -10,-20 -12,-15", "5.5,-26 9,-20 11,-15"],
};

const LEGS: Record<Pose, [string, string]> = {
  stand: ["-3,-8 -4,0", "3,-8 4,0"],
  raise: ["-3,-8 -6,-3 -5,0", "3,-8 6,-3 5,0"],
  dance: ["-3,-8 -6,-3 -5,0", "3,-8 6,-3 5,0"],
  hold: ["-3,-8 -4,0", "3,-8 4,0"],
  walk: ["-3,-8 -7,0", "3,-8 5,-4 7,0"],
};

/** A Warli figure: circle head, two triangles meeting at the waist, line limbs. Feet at (x, y). */
export function Figure({
  x = 0,
  y = 0,
  s = 1,
  pose = "stand",
  delay = 0,
  flip = false,
  rotate = 0,
}: {
  x?: number;
  y?: number;
  s?: number;
  pose?: Pose;
  delay?: number;
  flip?: boolean;
  rotate?: number;
}) {
  const [la, ra] = ARMS[pose];
  const [ll, rl] = LEGS[pose];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${flip ? -s : s} ${s})`}>
      <g fill="none" stroke="currentColor" strokeWidth={1.1 / s} strokeLinecap="round" strokeLinejoin="round">
        <polyline points={la} pathLength={1} className="draw" style={dl(delay + 300)} />
        {pose === "hold" ? (
          <g className="wave">
            <polyline points={ra} pathLength={1} className="draw" style={dl(delay + 300)} />
          </g>
        ) : (
          <polyline points={ra} pathLength={1} className="draw" style={dl(delay + 300)} />
        )}
        <polyline points={ll} pathLength={1} className="draw" style={dl(delay + 200)} />
        <polyline points={rl} pathLength={1} className="draw" style={dl(delay + 200)} />
      </g>
      <g fill="currentColor" className="ink-in" style={dl(delay)}>
        <circle cx="0" cy="-31" r="3.2" />
        <polygon points="-5.5,-27 5.5,-27 0,-17.5" />
        <polygon points="0,-17.5 -5.5,-8 5.5,-8" />
      </g>
    </g>
  );
}

/** A Warli tree: trunk, alternating branches, oval leaves. Sways from the root. Root at (x, y). */
export function Tree({ x = 0, y = 0, h = 90, delay = 0, branches = 7 }: { x?: number; y?: number; h?: number; delay?: number; branches?: number }) {
  const parts: ReactNode[] = [];
  const leaves: ReactNode[] = [];

  for (let i = 0; i < branches; i++) {
    const t = i / (branches - 1);
    const by = -h * (0.3 + 0.62 * t);
    const side = i % 2 === 0 ? -1 : 1;
    const len = (1 - t) * h * 0.32 + h * 0.1;
    const ang = ((40 + t * 15) * Math.PI) / 180;
    const ex = side * len * Math.sin(ang);
    const ey = by - len * Math.cos(ang);
    const cx = side * len * 0.35;
    const cy = by - len * 0.1;
    parts.push(
      <path
        key={`b${i}`}
        d={`M0 ${by.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`}
        pathLength={1}
        className="draw"
        style={dl(delay + 500 + i * 90)}
      />
    );
    const n = Math.max(3, Math.round(len / 5));
    for (let k = 1; k <= n; k++) {
      const u = k / n;
      // point on the quadratic curve
      const px = 2 * (1 - u) * u * cx + u * u * ex;
      const py = (1 - u) * (1 - u) * by + 2 * (1 - u) * u * cy + u * u * ey;
      const deg = (Math.atan2(ey - by, ex) * 180) / Math.PI;
      for (const off of [-55, 55]) {
        leaves.push(
          <ellipse
            key={`l${i}-${k}-${off}`}
            cx={px.toFixed(1)}
            cy={py.toFixed(1)}
            rx="1.2"
            ry="3"
            transform={`rotate(${Math.round(deg + 90 + off) + 0} ${px.toFixed(1)} ${py.toFixed(1)})`}
          />
        );
      }
    }
  }

  // crown
  for (let k = 0; k < 5; k++) {
    const a = -60 + k * 30;
    leaves.push(<ellipse key={`c${k}`} cx="0" cy={-h - 3} rx="1.2" ry="3.4" transform={`rotate(${a} 0 ${-h})`} />);
  }

  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="sway">
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d={`M0 0 C -2 ${-h * 0.4} 2 ${-h * 0.7} 0 ${-h}`} pathLength={1} className="draw" style={dl(delay)} strokeWidth="2" />
          {parts}
        </g>
        <g fill="var(--leaf)" className="ink-in" style={dl(delay + 1300)}>
          {leaves}
        </g>
      </g>
    </g>
  );
}

/** Sun: ring, core, and a slowly turning crown of triangle rays. */
export function Sun({ x = 0, y = 0, r = 10, delay = 0 }: { x?: number; y?: number; r?: number; delay?: number }) {
  const rays = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    const p = (rr: number, da = 0) => `${(Math.cos(a + da) * rr).toFixed(1)},${(Math.sin(a + da) * rr).toFixed(1)}`;
    return <polygon key={i} points={`${p(r + 3, -0.12)} ${p(r + 3, 0.12)} ${p(r + 9)}`} />;
  });
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="none" stroke="currentColor" strokeWidth="1.2" pathLength={1} className="draw" style={dl(delay)} />
      <circle r={r * 0.45} fill="currentColor" className="ink-in" style={dl(delay + 600)} />
      <g fill="currentColor" className="ink-in" style={dl(delay + 900)}>
        <g className="turn">{rays}</g>
      </g>
    </g>
  );
}

/** Hut with thatched roof hatching. Base centre at (x, y). */
export function Hut({ x = 0, y = 0, delay = 0 }: { x?: number; y?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(1.5)`} fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" strokeLinecap="round">
      <polyline points="-13,0 -13,-18 13,-18 13,0 -13,0" pathLength={1} className="draw" style={dl(delay)} />
      <polygon points="-18,-18 0,-33 18,-18" pathLength={1} className="draw" style={dl(delay + 250)} />
      <polyline points="-4,0 -4,-10 4,-10 4,0" pathLength={1} className="draw" style={dl(delay + 500)} />
      {[-12, -6, 0, 6, 12].map((dx, i) => (
        <line key={i} x1={dx} y1="-18" x2={dx * 0.4} y2={-18 - (18 - Math.abs(dx)) * 0.75} pathLength={1} className="draw" style={dl(delay + 600 + i * 60)} />
      ))}
    </g>
  );
}

/** Small flock, drifting across the scene. */
export function Birds({ y = 30, delay = 0 }: { y?: number; delay?: number }) {
  return (
    <g className="fly" style={{ animationDelay: `${delay}ms` }}>
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" transform={`translate(0 ${y})`}>
        <path d="M0 0 q3 -3 6 0 q3 -3 6 0" />
        <path d="M18 -8 q2.5 -2.5 5 0 q2.5 -2.5 5 0" />
        <path d="M30 4 q2 -2 4 0 q2 -2 4 0" />
      </g>
    </g>
  );
}

/** Ground line with grass ticks. */
export function Ground({ y, w, delay = 0 }: { y: number; w: number; delay?: number }) {
  const ticks = Array.from({ length: Math.floor(w / 46) }, (_, i) => 20 + i * 46 + ((i * 17) % 13));
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <line x1="0" y1={y} x2={w} y2={y} pathLength={1} className="draw" style={dl(delay)} />
      {ticks.map((tx, i) => (
        <path key={i} d={`M${tx} ${y} l-2 -5 M${tx} ${y} l0 -6 M${tx} ${y} l2 -5`} pathLength={1} className="draw" style={dl(delay + 400 + i * 30)} />
      ))}
    </g>
  );
}

/** Hero: a village morning. Trees, hut, sun, birds, people walking and dancing. */
export function VillageScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Warli-style drawing of a village morning: trees, a hut, the sun, birds and people">
      <Birds y={50} />
      <Sun x={648} y={52} r={12} delay={200} />
      <Tree x={58} y={216} h={160} delay={100} branches={10} />
      <Tree x={138} y={216} h={100} delay={400} branches={7} />
      <Figure x={236} y={216} s={1.7} pose="walk" delay={900} />
      <Figure x={318} y={216} s={1.7} pose="raise" delay={1050} />
      <Figure x={368} y={216} s={1.7} pose="dance" delay={1150} />
      <Figure x={408} y={216} s={1.7} pose="dance" delay={1200} flip />
      <Figure x={448} y={216} s={1.7} pose="dance" delay={1250} />
      <Hut x={548} y={216} delay={700} />
      <Tree x={612} y={216} h={74} delay={800} branches={5} />
      <Figure x={668} y={216} s={1.4} pose="stand" delay={1350} flip />
      <Ground y={216} w={720} />
    </svg>
  );
}

/** Full-width village band for the hero: a long ground line with life along it. */
export function WideVillageScene({ className = "", slice = false }: { className?: string; slice?: boolean }) {
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio={slice ? "xMidYMax slice" : "xMidYMax meet"} className={className} role="img" aria-label="Warli-style drawing of a village: trees, huts, the sun, birds and people dancing">
      <g style={{ "--fly-to": "1500px" } as CSSProperties}>
        <Birds y={60} />
        <Birds y={90} delay={-11000} />
      </g>
      <PuneSky />
      <Tree x={70} y={206} h={168} delay={0} branches={10} />
      <Tree x={150} y={206} h={112} delay={250} branches={8} />
      <Tree x={214} y={206} h={74} delay={450} branches={5} />
      <Figure x={330} y={206} s={1.7} pose="walk" delay={800} />
      <Figure x={520} y={206} s={1.7} pose="raise" delay={950} />
      <Figure x={566} y={206} s={1.7} pose="dance" delay={1000} />
      <Figure x={606} y={206} s={1.7} pose="dance" delay={1050} flip />
      <Figure x={646} y={206} s={1.7} pose="dance" delay={1100} />
      <Figure x={686} y={206} s={1.7} pose="dance" delay={1150} flip />
      <Figure x={734} y={206} s={1.7} pose="hold" delay={1200} flip />
      <Hut x={860} y={206} delay={600} />
      <g transform="translate(930 206) scale(0.8)"><Hut delay={700} /></g>
      <Figure x={990} y={206} s={1.5} pose="stand" delay={1300} />
      <Tree x={1080} y={206} h={130} delay={500} branches={9} />
      <Tree x={1300} y={206} h={150} delay={350} branches={10} />
      <Tree x={1376} y={206} h={92} delay={650} branches={6} />
      <Ground y={206} w={1440} />
    </svg>
  );
}

/** The tarpa dance: a ring of dancers, heads outward, turning slowly around a musician. */
export function DanceCircle({ className = "", count = 16 }: { className?: string; count?: number }) {
  return (
    <svg viewBox="-120 -120 240 240" className={className} aria-hidden="true">
      <g className="turn-slow">
        {Array.from({ length: count }, (_, i) => (
          <g key={i} transform={`rotate(${(360 / count) * i}) translate(0 -46)`}>
            <Figure pose="dance" s={1.15} delay={i * 60} />
          </g>
        ))}
        <circle r="44" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
        <circle r="98" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 5" />
      </g>
      <Figure x={0} y={14} s={1.1} pose="hold" delay={1200} />
    </svg>
  );
}

/** Cooking: a figure tending a pot on three stones, fire below and steam rising. */
export function CookingScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 130" className={className} aria-hidden="true">
      <Tree x={26} y={118} h={62} branches={5} delay={0} />
      <Figure x={86} y={118} s={1.4} pose="hold" delay={300} />
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M128 96 q-4 -14 8 -20 h16 q12 6 8 20 z" pathLength={1} className="draw" style={dl(500)} />
        <line x1="134" y1="76" x2="154" y2="76" pathLength={1} className="draw" style={dl(700)} />
        {[0, 1, 2].map((i) => (
          <path key={i} className="steam" pathLength={1} d={`M${138 + i * 6} 70 q-4 -6 0 -12 q4 -6 0 -12 q-4 -6 0 -12`} />
        ))}
      </g>
      <g fill="currentColor" className="ink-in" style={dl(800)}>
        <circle cx="128" cy="114" r="4" />
        <circle cx="144" cy="116" r="3.5" />
        <circle cx="160" cy="114" r="4" />
        <polygon points="134,112 137,100 140,112" />
        <polygon points="141,112 144,98 147,112" />
        <polygon points="148,112 151,101 154,112" />
      </g>
      <Ground y={118} w={220} delay={0} />
    </svg>
  );
}

/** Painting: a figure at an easel; the canvas holds a tiny sun and hills. */
export function PaintingScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 130" className={className} aria-hidden="true">
      <Figure x={80} y={118} s={1.4} pose="hold" delay={300} />
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="148" y1="44" x2="132" y2="118" pathLength={1} className="draw" style={dl(400)} />
        <line x1="148" y1="44" x2="166" y2="118" pathLength={1} className="draw" style={dl(450)} />
        <line x1="148" y1="44" x2="150" y2="118" pathLength={1} className="draw" style={dl(500)} />
        <rect x="118" y="50" width="60" height="42" pathLength={1} className="draw" style={dl(650)} />
        <polyline points="122,88 136,70 146,80 158,64 174,88" pathLength={1} className="draw" style={dl(1000)} />
      </g>
      <circle cx="163" cy="60" r="3.5" fill="currentColor" className="ink-in" style={dl(1300)} />
      <Tree x={200} y={118} h={54} branches={5} delay={200} />
      <Ground y={118} w={220} />
    </svg>
  );
}

/** A Warli border band: alternating triangles and dots, used as a divider. Colour = currentColor. */
const BORDER_MASK =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='12'><polygon points='0,11 4,3 8,11'/><circle cx='12' cy='6' r='1.1'/></svg>\")";

export function Border({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-3 w-full bg-current ${className}`}
      style={{ WebkitMaskImage: BORDER_MASK, maskImage: BORDER_MASK, WebkitMaskRepeat: "repeat-x", maskRepeat: "repeat-x" }}
      aria-hidden="true"
    />
  );
}
