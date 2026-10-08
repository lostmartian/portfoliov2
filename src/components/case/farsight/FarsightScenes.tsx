"use client";

import type { ReactNode } from "react";
import ScrollScene, { StepCaption, ease, seg } from "@/components/story/ScrollScene";
import { LINKS, NODES } from "./graph";

/**
 * Farsight told as an observation log under a night sky. Different grammar
 * from the IPO story on purpose: full-stage visuals, a roman-numeral title in
 * the corner, and short lines at the bottom like film subtitles.
 */

const CREAM = "#efe6d6";
const GERU = "#e08a6b";
const LEAF = "#9bb07f";

function NightScene({ length, children }: { length: number; children: (p: number) => ReactNode }) {
  return (
    <ScrollScene length={length} dark className="bleed bg-[#15141c] text-[#efe6d6]">
      {(p) => <div className="w-full px-5 sm:px-8 lg:px-12 2xl:px-20 h-full">{children(p)}</div>}
    </ScrollScene>
  );
}

function Frame({
  n,
  title,
  p,
  steps,
  children,
}: {
  n: string;
  title: ReactNode;
  p: number;
  steps: { at: number; text: ReactNode }[];
  children: ReactNode;
}) {
  return (
    <div className="h-full flex flex-col pt-24 pb-10">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-4xl sm:text-5xl leading-none" style={{ color: GERU }}>{n}</span>
        <h2 className="text-3xl sm:text-5xl leading-none">{title}</h2>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center py-6">{children}</div>
      <StepCaption
        p={p}
        steps={steps}
        className="min-h-[4.5rem] sm:min-h-[3.5rem] text-center font-display text-2xl sm:text-3xl leading-snug max-w-3xl w-full mx-auto"
      />
      <div className="mt-4 mx-auto h-px w-40 bg-[#efe6d6]/15 overflow-hidden" aria-hidden="true">
        <div className="h-full" style={{ width: `${p * 100}%`, background: GERU }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* I · The fog: scattered fragments come into focus and line up         */
/* ------------------------------------------------------------------ */

const FRAGMENTS = [
  "Docs", "Eval metrics", "Permissions", "Workspace A",
  "Model scores", "Labels", "Gold sets", "Workspace B",
  "Runbooks", "Leaderboards", "Access rules", "Workspace C",
];

const SCATTER = FRAGMENTS.map((_, i) => ({
  x: ((i * 37 + 11) % 86) + 2,
  y: ((i * 53 + 7) % 78) + 6,
  r: ((i * 29) % 30) - 15,
}));

export function FogScene() {
  return (
    <NightScene length={3}>
      {(p) => {
        const focus = seg(p, 0.15, 0.6);
        const order = ease(seg(p, 0.4, 0.8));
        const lens = seg(p, 0.78, 0.92);
        return (
          <Frame
            n="I"
            p={p}
            title={<>The <span className="serif" style={{ color: GERU }}>fog.</span></>}
            steps={[
              { at: 0, text: "Docs in one place. Metrics in another." },
              { at: 0.22, text: "Permissions everywhere. Every client workspace an island." },
              { at: 0.5, text: "There was no single view of how the models were doing across tenants." },
              { at: 0.8, text: <>Farsight put it all <span className="serif" style={{ color: GERU }}>under one lens.</span></> },
            ]}
          >
            <div className="relative w-full max-w-5xl h-full max-h-[460px]">
              {/* the lens bar */}
              <div
                className="absolute left-[6%] right-[6%] top-0 h-12 border flex items-center justify-center font-display text-2xl"
                style={{ opacity: lens, transform: `translateY(${(1 - lens) * -20}px)`, borderColor: GERU, color: GERU }}
              >
                Farsight
              </div>
              {FRAGMENTS.map((f, i) => {
                const gx = 6 + (i % 4) * 22;
                const gy = 26 + Math.floor(i / 4) * 24;
                const x = SCATTER[i].x + (gx - SCATTER[i].x) * order;
                const y = SCATTER[i].y + (gy - SCATTER[i].y) * order;
                return (
                  <div
                    key={f}
                    className="absolute w-[20%] min-w-[90px] border px-3 py-2.5 text-[13px] sm:text-[15px]"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `rotate(${SCATTER[i].r * (1 - order)}deg)`,
                      filter: `blur(${(1 - focus) * 7}px)`,
                      opacity: 0.35 + 0.65 * focus,
                      borderColor: `rgba(239,230,214,${0.15 + 0.25 * order})`,
                      background: i % 4 === 3 ? `rgba(224,138,107,${0.12 * order})` : "transparent",
                    }}
                  >
                    {f}
                  </div>
                );
              })}
            </div>
          </Frame>
        );
      }}
    </NightScene>
  );
}

/* ------------------------------------------------------------------ */
/* II · The lens sweeps across workspaces and locks each one            */
/* ------------------------------------------------------------------ */

const WORKSPACES = ["Workspace A", "Workspace B", "Workspace C", "Workspace D"];

export function LensScene() {
  return (
    <NightScene length={2.6}>
      {(p) => {
        const sweep = seg(p, 0.08, 0.85);
        return (
          <Frame
            n="II"
            p={p}
            title={<>The <span className="serif" style={{ color: GERU }}>lens.</span></>}
            steps={[
              { at: 0, text: "Enterprise SSO through AWS Cognito at the door." },
              { at: 0.3, text: "Roles scoped per organisation, then per workspace." },
              { at: 0.6, text: "Documents, models and scores strictly partitioned." },
              { at: 0.85, text: <>Nothing leaks <span className="serif" style={{ color: GERU }}>across tenants.</span></> },
            ]}
          >
            <div className="relative w-full max-w-5xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {WORKSPACES.map((w, i) => {
                  const locked = sweep > (i + 0.6) / WORKSPACES.length;
                  return (
                    <div
                      key={w}
                      className="aspect-[4/5] border p-4 flex flex-col justify-between transition-all duration-500"
                      style={{ borderColor: locked ? GERU : "rgba(239,230,214,0.2)", background: locked ? "rgba(224,138,107,0.07)" : "transparent" }}
                    >
                      <div className="flex items-center justify-between text-[14px]">
                        <span>{w}</span>
                        <svg viewBox="0 0 12 14" className="w-3.5 h-4 transition-all duration-500" style={{ color: GERU, opacity: locked ? 1 : 0, transform: `scale(${locked ? 1 : 0.5})` }} aria-hidden="true">
                          <rect x="1" y="6" width="10" height="7" fill="currentColor" />
                          <path d="M3 6V4a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.4" />
                        </svg>
                      </div>
                      <div className="space-y-2">
                        {["Docs", "Models", "Scores"].map((r, j) => (
                          <div key={r} className="flex items-center gap-2 text-[11px] text-[#efe6d6]/60">
                            <span className="w-12">{r}</span>
                            <span className="flex-1 h-1.5 bg-[#efe6d6]/10">
                              <span className="block h-full transition-all duration-700" style={{ width: locked ? `${45 + ((i + j) * 17) % 50}%` : "15%", background: locked ? GERU : "rgba(239,230,214,0.3)" }} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* sweeping reticle (desktop) */}
              <svg
                viewBox="-60 -60 120 120"
                className="hidden md:block absolute top-1/2 w-40 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                style={{ left: `${12.5 + sweep * 75}%`, opacity: seg(p, 0.02, 0.1) * (1 - seg(p, 0.88, 0.98)) }}
                aria-hidden="true"
              >
                <circle r="44" fill="none" stroke={GERU} strokeDasharray="3 5" />
                <circle r="56" fill="none" stroke={GERU} strokeOpacity="0.4" />
                {[[0, -60, 0, -40], [0, 40, 0, 60], [-60, 0, -40, 0], [40, 0, 60, 0]].map(([a, b, c, e], i) => (
                  <line key={i} x1={a} y1={b} x2={c} y2={e} stroke={GERU} />
                ))}
              </svg>
            </div>
          </Frame>
        );
      }}
    </NightScene>
  );
}

/* ------------------------------------------------------------------ */
/* III · PDFs become a knowledge graph, then answer a question           */
/* ------------------------------------------------------------------ */

const PATH = new Set(["director-party-a", "party-a-contract", "contract-clause", "clause-obligation", "obligation-invoice"]);
const FILL = [CREAM, GERU, LEAF];

export function ConstellationScene() {
  return (
    <NightScene length={3.6}>
      {(p) => {
        const pages = 1 - seg(p, 0.12, 0.32);
        const nodes = ease(seg(p, 0.18, 0.38));
        const edges = seg(p, 0.38, 0.68);
        const ask = seg(p, 0.72, 0.8);
        const answer = seg(p, 0.8, 0.95);
        const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
        return (
          <Frame
            n="III"
            p={p}
            title={<>Mapping the <span className="serif" style={{ color: GERU }}>constellations.</span></>}
            steps={[
              { at: 0, text: "DocuNexus starts with thousands of legal and financial PDFs." },
              { at: 0.2, text: "Gemini 1.5 Pro pulls out the entities." },
              { at: 0.42, text: "Neo4j holds the relationships, even the ones no single document states." },
              { at: 0.72, text: <>Ask in plain English: LangGraph agents <span className="serif" style={{ color: GERU }}>write the Cypher.</span></> },
            ]}
          >
            <div className="relative w-full max-w-4xl">
              {/* the question */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 border px-4 py-2 text-[14px] sm:text-[15px] whitespace-nowrap bg-[#15141c]"
                style={{ opacity: ask, transform: `translate(-50%, ${(1 - ask) * 10}px)`, borderColor: GERU }}
              >
                “Which director is linked to this invoice?”
              </div>
              <svg viewBox="0 0 640 340" className="w-full h-auto max-h-[52svh] overflow-visible">
                {/* PDFs dissolving */}
                {Array.from({ length: 9 }, (_, i) => (
                  <g key={i} opacity={pages} transform={`translate(${250 + i * 8} ${80 + i * 6})`}>
                    <rect width="90" height="116" fill="#15141c" stroke={CREAM} strokeOpacity="0.5" />
                    {[18, 30, 42, 54, 66].map((y) => (
                      <line key={y} x1="12" x2={y === 66 ? 50 : 78} y1={y} y2={y} stroke={CREAM} strokeOpacity="0.3" />
                    ))}
                    <text x="12" y="104" fontSize="9" fill={CREAM} fillOpacity="0.5" fontFamily="var(--font-geist-mono), monospace">PDF</text>
                  </g>
                ))}
                {LINKS.map(([a, b], i) => {
                  const A = byId[a], B = byId[b];
                  const t = Math.min(1, Math.max(0, edges * LINKS.length - i));
                  const onPath = PATH.has(`${a}-${b}`) || PATH.has(`${b}-${a}`);
                  const lit = onPath && answer > 0;
                  return (
                    <line
                      key={a + b}
                      x1={A.x} y1={A.y}
                      x2={A.x + (B.x - A.x) * t} y2={A.y + (B.y - A.y) * t}
                      stroke={lit ? GERU : CREAM}
                      strokeOpacity={lit ? 0.4 + 0.6 * answer : answer > 0 ? 0.12 : 0.35}
                      strokeWidth={lit ? 2 : 1}
                    />
                  );
                })}
                {NODES.map((n, i) => {
                  const onPath = ["director", "party-a", "contract", "clause", "obligation", "invoice"].includes(n.id);
                  const s = Math.min(1, Math.max(0, nodes * NODES.length - i * 0.6));
                  return (
                    <g key={n.id} opacity={answer > 0 && !onPath ? 1 - 0.6 * answer : 1}>
                      {answer > 0.2 && (n.id === "director" || n.id === "invoice") && (
                        <circle cx={n.x} cy={n.y} r="14" fill="none" stroke={GERU} strokeDasharray="2 3" className="turn" />
                      )}
                      <circle cx={n.x} cy={n.y} r={(n.k ? 6 : 4.5) * s} fill={FILL[n.k]} />
                      <text x={n.x} y={n.y + 22} textAnchor="middle" fontSize="11" fill={CREAM} fillOpacity={0.7 * s} fontFamily="var(--font-body), sans-serif">
                        {n.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <p className="mt-2 text-right text-[11px] text-night-muted">Illustrative graph</p>
            </div>
          </Frame>
        );
      }}
    </NightScene>
  );
}

/* ------------------------------------------------------------------ */
/* IV · Calibration loop                                                */
/* ------------------------------------------------------------------ */

const STATIONS = [
  { label: "Annotate", sub: "Go task engine · parallel & series" },
  { label: "Agree", sub: "Consensus + expert arbitration" },
  { label: "Score", sub: "Against human gold standards" },
  { label: "Feed back", sub: "Edge cases into training" },
];

export function CalibrationScene() {
  return (
    <NightScene length={3}>
      {(p) => {
        const loop = seg(p, 0.05, 0.95);
        const angle = -90 + loop * 360;
        const meters = ease(seg(p, 0.45, 0.75));
        return (
          <Frame
            n="IV"
            p={p}
            title={<>Calibrating the <span className="serif" style={{ color: GERU }}>instrument.</span></>}
            steps={[
              { at: 0, text: "Better models came from better data, so the data got instruments." },
              { at: 0.25, text: "Annotators agree through consensus; experts settle the rest." },
              { at: 0.5, text: "Every field scored against gold: precision, recall, Cohen's κ." },
              { at: 0.75, text: <>And every edge case <span className="serif" style={{ color: GERU }}>flows back into training.</span></> },
            ]}
          >
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <svg viewBox="-150 -150 300 300" className="w-full max-w-[220px] md:max-w-[360px] mx-auto">
                <circle r="105" fill="none" stroke={CREAM} strokeOpacity="0.15" />
                <circle
                  r="105" fill="none" stroke={GERU} strokeWidth="2"
                  strokeDasharray={`${loop * 660} 660`} transform="rotate(-90)"
                />
                {STATIONS.map((s, i) => {
                  const a = (-90 + i * 90) * (Math.PI / 180);
                  const lit = loop * 4 >= i;
                  return (
                    <g key={s.label} transform={`translate(${Math.cos(a) * 105} ${Math.sin(a) * 105})`}>
                      <circle r="8" fill={lit ? GERU : "#15141c"} stroke={GERU} strokeWidth="1.5" />
                    </g>
                  );
                })}
                <g transform={`rotate(${angle}) translate(105 0)`}>
                  <circle r="4" fill={CREAM} />
                </g>
                <text textAnchor="middle" y="-4" fontSize="11" letterSpacing="2" fill={CREAM} fillOpacity="0.6" fontFamily="var(--font-body), sans-serif">GROUND</text>
                <text textAnchor="middle" y="12" fontSize="11" letterSpacing="2" fill={CREAM} fillOpacity="0.6" fontFamily="var(--font-body), sans-serif">TRUTH</text>
              </svg>
              <div className="space-y-5">
                {STATIONS.map((s, i) => {
                  const lit = loop * 4 >= i;
                  return (
                    <div key={s.label} className="hidden md:flex items-baseline gap-4 transition-opacity duration-500" style={{ opacity: lit ? 1 : 0.3 }}>
                      <span className="font-display text-xl w-6" style={{ color: GERU }}>{["i", "ii", "iii", "iv"][i]}</span>
                      <span>
                        <span className="font-display text-2xl">{s.label}</span>
                        <span className="block text-[13px] text-[#efe6d6]/60">{s.sub}</span>
                      </span>
                    </div>
                  );
                })}
                <div className="pt-4 space-y-2.5" style={{ opacity: seg(p, 0.42, 0.5) }}>
                  {["Precision", "Recall", "Cohen's κ"].map((m, i) => (
                    <div key={m} className="grid grid-cols-[90px_1fr] items-center gap-3 text-[13px]">
                      <span className="text-[#efe6d6]/70">{m}</span>
                      <span className="h-1.5 bg-[#efe6d6]/10">
                        <span className="block h-full" style={{ width: `${meters * (92 - i * 6)}%`, background: i === 2 ? LEAF : GERU }} />
                      </span>
                    </div>
                  ))}
                  <p className="text-[11px] text-night-muted">Per field, per model. Bars illustrative.</p>
                </div>
              </div>
            </div>
          </Frame>
        );
      }}
    </NightScene>
  );
}

/* ------------------------------------------------------------------ */
/* V · Principles                                                       */
/* ------------------------------------------------------------------ */

const PRINCIPLES = [
  "Don't build features for users; build intelligence engines that empower them.",
  "Data is noise until it's governed by Ground Truth.",
];

export function PrinciplesScene() {
  return (
    <NightScene length={2.4}>
      {(p) => (
        <div className="h-full flex flex-col items-center justify-center text-center gap-10 pt-16">
          <p className="label !text-night-muted"><span style={{ color: GERU }}>V.</span> What it taught me</p>
          <div className="relative w-full max-w-4xl min-h-[14rem]">
            {PRINCIPLES.map((q, i) => {
              const v = i === 0 ? 1 - seg(p, 0.45, 0.55) : seg(p, 0.5, 0.6);
              return (
                <blockquote
                  key={q}
                  className="absolute inset-0 flex items-center justify-center font-display text-4xl sm:text-6xl leading-[1.05]"
                  style={{ opacity: v, transform: `translateY(${(1 - v) * (i === 0 ? -20 : 20)}px)`, filter: `blur(${(1 - v) * 4}px)` }}
                >
                  &ldquo;{q}&rdquo;
                </blockquote>
              );
            })}
          </div>
          <p className="max-w-xl text-[#efe6d6]/60 text-lg" style={{ opacity: seg(p, 0.7, 0.85) }}>
            AI wasn&apos;t a layer added at the end. Every Go service and every Neo4j schema was built to be used by agents.
          </p>
        </div>
      )}
    </NightScene>
  );
}
