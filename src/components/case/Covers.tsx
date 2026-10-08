/**
 * Code-drawn cover art for each case study (replaces the old screenshots).
 * Each cover speaks the visual language of its own case study:
 *  - IPO Allotment Engine: a ruled allotment register with the lottery grid and the T+3 clock.
 *  - Farsight: a night sky where a knowledge-graph constellation is being brought into focus.
 * Pure SVG. The IPO register follows the site theme; Farsight is a night sky in both themes.
 */
import type { CSSProperties } from "react";

const dl = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

interface CoverProps {
  className?: string;
  animate?: boolean;
  /** crop to fill the box (like object-fit: cover) instead of letterboxing */
  slice?: boolean;
  /** hide the title lettering (when the page already shows the title next to it) */
  bare?: boolean;
}

/** Small deterministic PRNG so server and client render identical art. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Reverse-digit shuffle, the same trick the real allotment solver uses for reproducible draws. */
export function isAllotted(i: number, ratio = 0.32) {
  const rev = Number(String(i * 7919 + 104729).split("").reverse().join(""));
  return (rev % 1000) / 1000 < ratio;
}

export function IpoCover({ className = "", animate = true, slice = false, bare = false }: CoverProps) {
  const cols = 18;
  const rows = 9;
  const a = animate ? "ink-in" : "";
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio={slice ? "xMidYMid slice" : "xMidYMid meet"} className={className} role="img" aria-label="Cover: an IPO allotment register with a lottery grid and the T+3 settlement clock">
      <rect width="640" height="400" fill="var(--card-bg)" />
      {/* ruled ledger lines and a double red margin */}
      {Array.from({ length: 19 }, (_, i) => (
        <line key={i} x1="0" x2="640" y1={30 + i * 20} y2={30 + i * 20} stroke="var(--accent)" strokeOpacity="0.09" />
      ))}
      <line x1="66" x2="66" y1="0" y2="400" stroke="var(--accent)" strokeOpacity="0.45" />
      <line x1="70" x2="70" y1="0" y2="400" stroke="var(--accent)" strokeOpacity="0.45" />

      {/* header */}
      <text x="92" y="58" fontSize="11" letterSpacing="3" fill="var(--muted)" fontFamily="var(--font-body), sans-serif">BASIS OF ALLOTMENT · REGISTER</text>
      {!bare && (
        <>
          <text x="92" y="104" fontSize="44" fill="var(--foreground)" fontFamily="var(--font-serif-face), Georgia, serif">IPO Allotment</text>
          <text x="92" y="146" fontSize="44" fill="var(--accent)" fontStyle="italic" fontFamily="var(--font-serif-face), Georgia, serif">Engine</text>
        </>
      )}

      {/* lottery grid: filled = allotted */}
      <g transform="translate(92 186)">
        {Array.from({ length: cols * rows }, (_, i) => {
          const x = (i % cols) * 22;
          const y = Math.floor(i / cols) * 16;
          const on = isAllotted(i);
          return on ? (
            <circle key={i} cx={x} cy={y} r="5" fill="var(--accent)" className={a} style={dl(300 + (i % 37) * 25)} />
          ) : (
            <circle key={i} cx={x} cy={y} r="4.5" fill="none" stroke="var(--foreground)" strokeOpacity="0.35" />
          );
        })}
      </g>

      {/* T+3 clock along the bottom */}
      <g transform="translate(92 352)" fontFamily="var(--font-body), sans-serif">
        <line x1="0" x2="440" y1="0" y2="0" stroke="var(--foreground)" strokeOpacity="0.5" />
        {["T", "T+1", "T+2", "T+3"].map((t, i) => (
          <g key={t} transform={`translate(${i * 146} 0)`}>
            <circle r={i === 3 ? 6 : 4} fill={i === 3 ? "var(--leaf)" : "var(--foreground)"} />
            <text y="24" fontSize="12" textAnchor="middle" fill="var(--foreground)" letterSpacing="1">{t}</text>
          </g>
        ))}
      </g>

      {/* stamp */}
      <g transform="translate(560 92) rotate(-12)" fontFamily="var(--font-body), sans-serif">
        <circle r="42" fill="none" stroke="var(--leaf)" strokeWidth="2" />
        <circle r="34" fill="none" stroke="var(--leaf)" strokeWidth="1" />
        <text y="-4" fontSize="13" textAnchor="middle" fill="var(--leaf)" fontWeight="700" letterSpacing="1">SEBI</text>
        <text y="13" fontSize="9" textAnchor="middle" fill="var(--leaf)" letterSpacing="1.5">T+3 · OK</text>
      </g>
    </svg>
  );
}

const NODES: [number, number, number][] = [
  // x, y, kind (0 cream, 1 geru, 2 leaf)
  [130, 120, 0], [205, 88, 1], [262, 150, 0], [330, 110, 2], [395, 170, 0],
  [470, 120, 1], [520, 210, 0], [430, 250, 2], [350, 230, 0], [270, 270, 1],
  [190, 220, 0], [560, 150, 0],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 11], [4, 7], [7, 6], [7, 8], [8, 9], [9, 10], [10, 2], [8, 4], [3, 5],
];

export { NODES as FARSIGHT_NODES, EDGES as FARSIGHT_EDGES };

export function FarsightCover({ className = "", animate = true, slice = false, bare = false }: CoverProps) {
  const r = rng(7);
  const stars = Array.from({ length: 90 }, () => [r() * 640, r() * 330, r() * 1.1 + 0.3, r()]);
  const fill = ["#efe6d6", "#e08a6b", "#9bb07f"];
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio={slice ? "xMidYMid slice" : "xMidYMid meet"} className={className} role="img" aria-label="Cover: a night sky where a knowledge-graph constellation comes into focus through a telescope reticle">
      <rect width="640" height="400" fill="#15141c" />
      {stars.map(([x, y, rad, t], i) => (
        <circle key={i} cx={x} cy={y} r={rad} fill="#efe6d6" opacity={0.25 + t * 0.5} className={animate && i % 4 === 0 ? "twinkle" : ""} style={{ animationDelay: `${-t * 4}s` }} />
      ))}

      {/* constellation */}
      <g stroke="#efe6d6" strokeOpacity="0.45" strokeWidth="1" fill="none">
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} pathLength={1} className={animate ? "draw" : ""} style={dl(200 + i * 90)} />
        ))}
      </g>
      {NODES.map(([x, y, k], i) => (
        <circle key={i} cx={x} cy={y} r={k === 0 ? 3.5 : 5} fill={fill[k]} className={animate ? "ink-in" : ""} style={dl(150 + i * 70)} />
      ))}

      {/* telescope reticle focusing on one node */}
      <g transform="translate(395 170)" stroke="#e08a6b" fill="none">
        <circle r="34" strokeWidth="1" strokeDasharray="3 5" className={animate ? "turn" : ""} />
        <circle r="52" strokeWidth="0.75" strokeOpacity="0.5" />
        <line x1="-64" x2="-40" y1="0" y2="0" />
        <line x1="40" x2="64" y1="0" y2="0" />
        <line y1="-64" y2="-40" x1="0" x2="0" />
        <line y1="40" y2="64" x1="0" x2="0" />
      </g>

      {/* Warli hills on the horizon */}
      <path d="M0 400 L0 352 L70 318 L130 350 L210 300 L300 352 L380 322 L460 356 L540 310 L640 350 L640 400 Z" fill="#201d27" />
      <path d="M0 352 L70 318 L130 350 L210 300 L300 352 L380 322 L460 356 L540 310 L640 350" fill="none" stroke="#e08a6b" strokeOpacity="0.6" />

      {!bare && (
        <text x="40" y="58" fontSize="11" letterSpacing="3" fill="#efe6d6" fillOpacity="0.6" fontFamily="var(--font-body), sans-serif">OBSERVATION LOG · OMARA</text>
      )}
      {!bare && (
        <text x="40" y="100" fontSize="44" fill="#efe6d6" fontFamily="var(--font-serif-face), Georgia, serif">Far<tspan fontStyle="italic" fill="#e08a6b">sight</tspan></text>
      )}
    </svg>
  );
}

/** AgentDiff: two agent runs as diff tracks. The candidate repeats a tool call; the gate fails it. */
export function AgentDiffCover({ className = "", animate = true, slice = false, bare = false }: CoverProps) {
  const a = animate ? "ink-in" : "";
  const base = ["plan", "get_user_database_stats", "summarize"];
  const cand = ["plan", "get_user_database_stats", "get_user_database_stats", "summarize"];
  const mono = "var(--font-geist-mono), monospace";
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio={slice ? "xMidYMid slice" : "xMidYMid meet"} className={className} role="img" aria-label="Cover: a baseline agent run and a candidate run side by side; the candidate repeats a tool call and the regression gate fails it">
      <rect width="640" height="400" fill="var(--card-bg)" />
      {/* diff gutter */}
      <rect x="0" y="0" width="44" height="400" fill="var(--foreground)" opacity="0.04" />
      {Array.from({ length: 20 }, (_, i) => (
        <text key={i} x="34" y={24 + i * 19} fontSize="9" textAnchor="end" fill="var(--muted)" fontFamily={mono}>{i + 1}</text>
      ))}
      {!bare && (
        <>
          <text x="70" y="62" fontSize="11" letterSpacing="2" fill="var(--muted)" fontFamily={mono}>$ agentdiff baseline.json candidate.json</text>
          <text x="70" y="108" fontSize="44" fill="var(--foreground)" fontFamily="var(--font-serif-face), Georgia, serif">Agent<tspan fontStyle="italic" fill="var(--accent)">Diff</tspan></text>
        </>
      )}
      {/* baseline track */}
      <g transform="translate(70 168)" fontFamily={mono}>
        <text x="0" y="-16" fontSize="10" letterSpacing="1.5" fill="var(--muted)">BASELINE</text>
        <line x1="10" x2="500" y1="0" y2="0" stroke="var(--foreground)" strokeOpacity="0.3" />
        {base.map((b, i) => (
          <g key={i} transform={`translate(${10 + i * 245} 0)`}>
            <circle r="7" fill="var(--leaf)" />
            <text y="24" fontSize="10" fill="var(--foreground)" textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}>{b}</text>
          </g>
        ))}
      </g>
      {/* candidate track */}
      <g transform="translate(70 262)" fontFamily={mono}>
        <text x="0" y="-16" fontSize="10" letterSpacing="1.5" fill="var(--muted)">CANDIDATE</text>
        <line x1="10" x2="500" y1="0" y2="0" stroke="var(--foreground)" strokeOpacity="0.3" />
        {cand.map((b, i) => {
          const x = 10 + i * (490 / 3);
          const bad = i === 2;
          return (
            <g key={i} transform={`translate(${x} 0)`} className={bad ? a : ""} style={bad ? ({ "--d": "700ms" } as CSSProperties) : undefined}>
              {bad && <rect x="-60" y="-18" width="120" height="50" fill="var(--kumkum)" opacity="0.1" />}
              <circle r="7" fill={bad ? "var(--kumkum)" : "var(--leaf)"} />
              {bad && <path d="M-14 -16 a 14 14 0 1 1 28 0" fill="none" stroke="var(--kumkum)" strokeWidth="1.5" />}
              <text y="24" fontSize="10" fill={bad ? "var(--kumkum)" : "var(--foreground)"} textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}>{bad ? "↻ repeated" : i === 1 ? "get_user_…" : b}</text>
            </g>
          );
        })}
      </g>
      {/* alignment ties */}
      {[[80, 80], [325, 243], [570, 570]].map(([x1, x2], i) => (
        <line key={i} x1={x1} y1="176" x2={x2} y2="254" stroke="var(--foreground)" strokeOpacity="0.25" strokeDasharray="2 4" />
      ))}
      {/* gate */}
      <g transform="translate(548 330) rotate(-10)" fontFamily="var(--font-body), sans-serif">
        <rect x="-58" y="-20" width="116" height="40" fill="none" stroke="var(--kumkum)" strokeWidth="2.2" />
        <text y="6" fontSize="16" fontWeight="700" letterSpacing="3" textAnchor="middle" fill="var(--kumkum)">FAILED</text>
      </g>
      <text x="70" y="352" fontSize="11" fill="var(--muted)" fontFamily={mono}>
        <tspan fill="var(--leaf)">+ 1 step</tspan>  <tspan fill="var(--kumkum)">loop on get_user_database_stats</tspan>
      </text>
    </svg>
  );
}

export function CaseCover({ slug, ...props }: CoverProps & { slug: string }) {
  if (slug === "ipo-allotment-engine") return <IpoCover {...props} />;
  if (slug === "farsight") return <FarsightCover {...props} />;
  if (slug === "agentdiff") return <AgentDiffCover {...props} />;
  return null;
}
