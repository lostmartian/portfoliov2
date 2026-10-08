"use client";

import type { ReactNode } from "react";
import ScrollScene, { StepCaption, StepDots, ease, seg } from "@/components/story/ScrollScene";

/**
 * The IPO Allotment Engine story as pinned, scroll-scrubbed scenes that follow
 * the settlement clock (T → T+3). Short lines of text, visuals doing the work.
 * Colours come from theme tokens so the register works in day and night.
 */

const mono = { fontFamily: "var(--font-geist-mono)" };

function Shell({
  t,
  title,
  p,
  steps,
  children,
}: {
  t: string;
  title: ReactNode;
  p: number;
  steps: { at: number; text: ReactNode }[];
  children: ReactNode;
}) {
  return (
    <div className="h-full grid grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center pt-24 pb-8 lg:py-0">
      <div className="lg:col-span-4 space-y-4 lg:space-y-6">
        <p className="font-display text-5xl lg:text-7xl text-accent leading-none">{t}</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.98]">{title}</h2>
        <StepCaption p={p} steps={steps} className="min-h-[4.5rem] lg:min-h-[6rem] text-lg lg:text-xl leading-relaxed text-muted" />
        <StepDots p={p} count={steps.length} />
      </div>
      <div className="lg:col-span-8 h-full min-h-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* T · Night falls, applications flood in                              */
/* ------------------------------------------------------------------ */

const COLS = 24;
const ROWS = 12;
const ORDER = Array.from({ length: COLS * ROWS }, (_, i) => ((i * 7919) % 997) / 997);

export function BellScene() {
  return (
    <ScrollScene length={3}>
      {(p) => {
        const fill = ease(seg(p, 0.08, 0.7));
        const count = Math.round(fill * 10_000_000);
        const night = seg(p, 0, 0.6);
        const sunA = Math.PI * (1 - night * 0.55);
        const moonA = Math.PI * (0.9 - seg(p, 0.35, 1) * 0.5);
        return (
          <Shell
            t="T"
            p={p}
            title={<>The bell <span className="serif text-accent">closes.</span></>}
            steps={[
              { at: 0, text: "Bidding closes on an IPO." },
              { at: 0.2, text: "Millions of applications land at once." },
              { at: 0.55, text: "SEBI's T+3 rule leaves one night to process them." },
              { at: 0.8, text: <>And there is <span className="text-foreground">zero room for error.</span></> },
            ]}
          >
            <div className="w-full">
              <svg viewBox="0 0 720 360" className="w-full h-auto max-h-[62svh]">
                {/* sky arc: sun sets, moon rises */}
                <path d="M40 150 A 320 120 0 0 1 680 150" fill="none" stroke="var(--border)" strokeDasharray="2 6" />
                <circle cx={360 + Math.cos(sunA) * 320} cy={150 - Math.sin(sunA) * 120} r="14" fill="var(--accent)" opacity={1 - night * 0.9} />
                <g transform={`translate(${360 + Math.cos(moonA) * 320} ${150 - Math.sin(moonA) * 120})`} opacity={seg(p, 0.3, 0.6)}>
                  <circle r="12" fill="var(--foreground)" />
                  <circle r="12" cx="6" cy="-3" fill="var(--background)" />
                </g>
                {/* the register filling up */}
                <g transform="translate(60 170)">
                  {ORDER.map((o, i) => {
                    const x = (i % COLS) * 25;
                    const y = Math.floor(i / COLS) * 14;
                    const on = o < fill;
                    return <circle key={i} cx={x} cy={y} r={on ? 4.2 : 2} fill={on ? "var(--accent)" : "var(--foreground)"} opacity={on ? 0.9 : 0.15} />;
                  })}
                </g>
              </svg>
              <div className="mt-4 flex items-end justify-between border-t border-foreground/70 pt-3">
                <span className="label">Applications received</span>
                <span className="font-display text-4xl sm:text-6xl tabular-nums leading-none">
                  {count.toLocaleString("en-IN")}
                  {fill >= 1 ? "+" : ""}
                </span>
              </div>
            </div>
          </Shell>
        );
      }}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ */
/* T · Everyone converges on the registrar                             */
/* ------------------------------------------------------------------ */

const PARTIES = [
  { name: "Stock exchanges", sub: "BSE · NSE bid files", x: 110, y: 70 },
  { name: "SCSB banks", sub: "Blocked ASBA funds", x: 610, y: 70 },
  { name: "NPCI UPI", sub: "Mandates", x: 110, y: 330 },
  { name: "Depositories", sub: "NSDL · CDSL", x: 610, y: 330 },
];

export function PartiesScene() {
  return (
    <ScrollScene length={2.6}>
      {(p) => (
        <Shell
          t="T"
          p={p}
          title={<>Everyone, <span className="serif text-accent">all at once.</span></>}
          steps={[
            { at: 0, text: "Exchanges send the bids." },
            { at: 0.2, text: "Banks hold the blocked money." },
            { at: 0.4, text: "UPI confirms the mandates." },
            { at: 0.6, text: "Depositories hold the shares." },
            { at: 0.8, text: <>The registrar, my client, sits <span className="text-foreground">in the middle of all of it.</span></> },
          ]}
        >
          <svg viewBox="0 0 720 400" className="w-full h-auto max-h-[66svh]">
            {PARTIES.map((pt, i) => {
              const show = ease(seg(p, i * 0.2, i * 0.2 + 0.15));
              const flow = seg(p, 0.8, 1);
              const px = 360 + (pt.x - 360) * (0.6 + 0.4 * show);
              const py = 200 + (pt.y - 200) * (0.6 + 0.4 * show);
              return (
                <g key={pt.name} opacity={show}>
                  <line x1={px} y1={py} x2="360" y2="200" stroke="var(--foreground)" strokeOpacity="0.3" strokeDasharray="4 6" />
                  {flow > 0 &&
                    [0, 0.33, 0.66].map((o) => {
                      const t = (flow * 3 + o) % 1;
                      return <circle key={o} cx={px + (360 - px) * t} cy={py + (200 - py) * t} r="4" fill="var(--accent)" />;
                    })}
                  <rect x={px - 92} y={py - 30} width="184" height="60" fill="var(--card-bg)" stroke="var(--foreground)" strokeOpacity="0.4" />
                  <text x={px} y={py - 3} textAnchor="middle" fontSize="17" fill="var(--foreground)" fontFamily="var(--font-serif-face), serif">{pt.name}</text>
                  <text x={px} y={py + 16} textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--font-body), sans-serif">{pt.sub}</text>
                </g>
              );
            })}
            <g opacity={0.35 + 0.65 * seg(p, 0.7, 0.85)}>
              <circle cx="360" cy="200" r={58 + 8 * seg(p, 0.8, 1)} fill="var(--accent)" />
              <text x="360" y="196" textAnchor="middle" fontSize="20" fill="var(--accent-foreground)" fontFamily="var(--font-serif-face), serif">The RTA</text>
              <text x="360" y="216" textAnchor="middle" fontSize="10" letterSpacing="1.5" fill="var(--accent-foreground)" fontFamily="var(--font-body), sans-serif" opacity="0.85">NICHE TECHNOLOGIES</text>
            </g>
          </svg>
        </Shell>
      )}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ */
/* T+1 · The overnight pipeline                                        */
/* ------------------------------------------------------------------ */

const STAGES = [
  { name: "Ingest", tag: "SFTP connectors", line: "Bid files pulled from the exchanges over SFTP." },
  { name: "Validate", tag: "Google-RE2", line: "Every PAN and demat checked in linear time. Duplicate PAN bids drop out." },
  { name: "Reconcile", tag: "Polars · Arrow", line: "Bids × bank × UPI, joined three ways in memory, across all cores." },
  { name: "Allot", tag: "Basis of Allotment", line: "Category rules first, then the lottery." },
  { name: "Hand back", tag: "Checksummed files", line: "Results returned to the exchanges, every number verified." },
];

const PARTICLES = Array.from({ length: 46 }, (_, i) => ({ o: (i * 0.618) % 1, y: ((i * 37) % 21) - 10, bad: i % 7 === 3 }));

export function PipelineScene() {
  return (
    <ScrollScene length={3.4}>
      {(p) => {
        const active = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
        return (
          <Shell
            t="T+1"
            p={p}
            title={<>One night, <span className="serif text-accent">five stages.</span></>}
            steps={STAGES.map((s, i) => ({ at: i / STAGES.length, text: <><span className="text-foreground">{s.name}.</span> {s.line}</> }))}
          >
            <svg viewBox="0 0 760 300" className="w-full h-auto max-h-[60svh]">
              <line x1="10" x2="738" y1="150" y2="150" stroke="var(--foreground)" strokeOpacity="0.25" />
              {/* particles flowing; bad ones fall out at Validate */}
              {PARTICLES.map((pt, i) => {
                const x = 10 + ((pt.o + p * 2.2) % 1) * 728;
                const dropped = pt.bad && x > 224;
                const drop = dropped ? Math.min(90, (x - 224) * 0.9) : 0;
                if (dropped && drop >= 90) return null;
                return (
                  <circle
                    key={i}
                    cx={dropped ? 224 + drop * 0.2 : x}
                    cy={150 + pt.y + drop}
                    r="3.2"
                    fill={pt.bad && x > 200 ? "var(--kumkum)" : "var(--foreground)"}
                    opacity={dropped ? 1 - drop / 90 : 0.55}
                  />
                );
              })}
              {STAGES.map((s, i) => {
                const x = 10 + i * 150;
                const on = i === active;
                const done = i < active;
                return (
                  <g key={s.name} transform={`translate(${x} 0)`}>
                    <rect
                      x="0" y="105" width="128" height="90"
                      fill={on ? "var(--accent)" : "var(--card-bg)"}
                      stroke={on || done ? "var(--accent)" : "var(--foreground)"}
                      strokeOpacity={on || done ? 1 : 0.35}
                      style={{ transition: "fill 400ms, stroke 400ms" }}
                    />
                    <text x="12" y="128" fontSize="10" fill={on ? "var(--accent-foreground)" : "var(--muted)"} style={mono}>0{i + 1}</text>
                    <text x="12" y="158" fontSize="20" fill={on ? "var(--accent-foreground)" : "var(--foreground)"} fontFamily="var(--font-serif-face), serif">{s.name}</text>
                    <text x="12" y="180" fontSize="9.5" fill={on ? "var(--accent-foreground)" : "var(--muted)"} fontFamily="var(--font-body), sans-serif" opacity="0.9">{s.tag}</text>
                    {done && <path d="M106 120 l5 5 l9 -10" fill="none" stroke="var(--leaf)" strokeWidth="2" />}
                  </g>
                );
              })}
              <text x="224" y="270" fontSize="11" fill="var(--kumkum)" textAnchor="middle" fontFamily="var(--font-body), sans-serif" opacity={seg(p, 0.15, 0.3)}>
                duplicates rejected
              </text>
            </svg>
          </Shell>
        );
      }}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ */
/* T+2 · The draw, then the replay                                     */
/* ------------------------------------------------------------------ */

const APPLICANTS = 120;
const LOTS = 30;
const WINNERS = (() => {
  const keyed = Array.from({ length: APPLICANTS }, (_, i) => {
    const id = 100000 + i * 37 + 2026;
    return { i, key: Number(String((id * 2654435761) % 1000003).split("").reverse().join("")) };
  });
  keyed.sort((a, b) => a.key - b.key || a.i - b.i);
  return keyed.slice(0, LOTS).map((k) => k.i);
})();

export function DrawScene() {
  return (
    <ScrollScene length={3.4}>
      {(p) => {
        const first = Math.round(seg(p, 0.05, 0.42) * LOTS);
        const replay = Math.round(seg(p, 0.6, 0.92) * LOTS);
        const resetting = p > 0.45 && p < 0.6;
        const shown = new Set(WINNERS.slice(0, resetting ? 0 : p >= 0.6 ? replay : first));
        const confirmed = new Set(WINNERS.slice(0, replay));
        return (
          <Shell
            t="T+2"
            p={p}
            title={<>The <span className="serif text-accent">draw.</span></>}
            steps={[
              { at: 0, text: "4× oversubscribed: 120 applicants, 30 lots." },
              { at: 0.2, text: "Each application ID's digits are reversed to shuffle fairly. No dice anyone can nudge." },
              { at: 0.45, text: "Now wipe it, and run it again." },
              { at: 0.75, text: <>Same seed, <span className="text-foreground">same 30 winners.</span> An auditor can replay every draw.</> },
            ]}
          >
            <div className="w-full max-w-[560px]">
              <div className="grid grid-cols-12 gap-2">
                {Array.from({ length: APPLICANTS }, (_, i) => {
                  const on = shown.has(i);
                  const ok = p >= 0.6 && confirmed.has(i);
                  return (
                    <span
                      key={i}
                      className="relative aspect-square rounded-full border transition-all duration-300"
                      style={{
                        background: on ? "var(--accent)" : "transparent",
                        borderColor: on ? "var(--accent)" : "color-mix(in srgb, var(--foreground) 30%, transparent)",
                        transform: on ? "scale(1)" : "scale(0.86)",
                      }}
                    >
                      {ok && <span className="absolute -inset-1 rounded-full border-2 border-leaf" />}
                    </span>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-between text-[13px] text-muted" style={mono}>
                <span>seed 2026 · {p >= 0.6 ? "replay" : "draw 1"}</span>
                <span>
                  {p >= 0.6 ? replay : resetting ? 0 : first} / {LOTS} allotted
                  {p > 0.92 && <span className="text-leaf"> · identical ✓</span>}
                </span>
              </div>
            </div>
          </Shell>
        );
      }}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ */
/* T+3 · Throughput                                                    */
/* ------------------------------------------------------------------ */

export function ThroughputScene() {
  return (
    <ScrollScene length={3}>
      {(p) => {
        const run = ease(seg(p, 0.05, 0.6));
        const locks = ease(seg(p, 0.72, 0.92));
        return (
          <Shell
            t="T+3"
            p={p}
            title={<>Listing <span className="serif text-accent">day.</span></>}
            steps={[
              { at: 0, text: "10 million records." },
              { at: 0.3, text: "Reconciled in 6.34 seconds." },
              { at: 0.55, text: "About 1.6 million a second, with Python's GIL out of the way." },
              { at: 0.72, text: "And 80% less lock contention on the database." },
            ]}
          >
            <div className="w-full">
              <p className="label mb-2">Records reconciled</p>
              <p className="font-display text-[3.4rem] sm:text-8xl lg:text-[8.5rem] leading-none tabular-nums">
                {Math.round(run * 10_000_000).toLocaleString("en-IN")}
              </p>
              <div className="mt-6 h-2 bg-foreground/10">
                <div className="h-full bg-accent" style={{ width: `${run * 100}%` }} />
              </div>
              <div className="mt-3 flex justify-between text-sm text-muted tabular-nums" style={mono}>
                <span>{(run * 6.34).toFixed(2)} s</span>
                <span>≈ 1.6M / s</span>
              </div>

              <div className="mt-14 space-y-3" style={{ opacity: seg(p, 0.66, 0.74) }}>
                <p className="label">Database lock contention</p>
                {[
                  ["Before", 1],
                  ["After", 1 - 0.8 * locks],
                ].map(([k, v]) => (
                  <div key={k as string} className="grid grid-cols-[70px_1fr] items-center gap-4">
                    <span className="text-sm text-muted">{k}</span>
                    <div className="h-3 bg-foreground/10">
                      <div className="h-full" style={{ width: `${(v as number) * 100}%`, background: k === "Before" ? "var(--foreground)" : "var(--leaf)", opacity: k === "Before" ? 0.35 : 1 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Shell>
        );
      }}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ */
/* T+3 · What I built, layer by layer                                  */
/* ------------------------------------------------------------------ */

const LAYERS = [
  { name: "Infrastructure", line: "OpenTofu, Step Functions, AWS Batch on Fargate scaling to zero, static NAT IPs for exchanges." },
  { name: "Database", line: "Aurora PostgreSQL, Flyway, concurrent indexes, 4-byte enums, JSONB audit archives." },
  { name: "Data engine", line: "Polars reconciliation, RE2 validation, PAN de-dup, external merge sort, the seeded solver." },
  { name: "Control plane", line: "Go (Gin) API, pgx, Cognito + JWT roles, stage gates, an immutable audit ledger." },
];

export function LayersScene() {
  return (
    <ScrollScene length={2.8}>
      {(p) => (
        <Shell
          t="T+3"
          p={p}
          title={<>What I <span className="serif text-accent">built.</span></>}
          steps={LAYERS.map((l, i) => ({ at: i / LAYERS.length, text: <><span className="text-foreground">{l.name}.</span> {l.line}</> }))}
        >
          <div className="w-full max-w-[620px] flex flex-col-reverse gap-3">
            {LAYERS.map((l, i) => {
              const s = ease(seg(p, i / LAYERS.length - 0.08, i / LAYERS.length + 0.12));
              const top = Math.min(LAYERS.length - 1, Math.floor(p * LAYERS.length)) === i;
              return (
                <div
                  key={l.name}
                  className="border px-6 py-5 sm:py-7 flex items-baseline justify-between gap-6"
                  style={{
                    opacity: s,
                    transform: `translateY(${(1 - s) * -60}px) translateX(${i * 14}px)`,
                    background: top ? "var(--accent)" : "var(--card-bg)",
                    color: top ? "var(--accent-foreground)" : "var(--foreground)",
                    borderColor: top ? "var(--accent)" : "color-mix(in srgb, var(--foreground) 25%, transparent)",
                    transition: "background 400ms, color 400ms",
                  }}
                >
                  <span className="font-display text-3xl sm:text-4xl">{l.name}</span>
                  <span className="text-[11px] opacity-70" style={mono}>L{i + 1}</span>
                </div>
              );
            })}
          </div>
        </Shell>
      )}
    </ScrollScene>
  );
}
