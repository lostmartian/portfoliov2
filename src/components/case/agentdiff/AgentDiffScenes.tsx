"use client";

import type { ReactNode } from "react";
import ScrollScene, { StepCaption, StepDots, ease, seg } from "@/components/story/ScrollScene";

/**
 * AgentDiff, told as a code review. Its own grammar: a terminal command as the
 * kicker, the visual on the left, the words on the right, mono everywhere the
 * machine speaks. Theme tokens, so it works day and night.
 */

const mono = { fontFamily: "var(--font-geist-mono)" };

function Review({
  cmd,
  title,
  p,
  steps,
  children,
}: {
  cmd: string;
  title: ReactNode;
  p: number;
  steps: { at: number; text: ReactNode }[];
  children: ReactNode;
}) {
  return (
    <div className="h-full grid grid-rows-[minmax(0,1fr)_auto] lg:grid-rows-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center pt-24 pb-8 lg:py-0">
      <div className="lg:col-span-7 h-full min-h-0 flex items-center order-2 lg:order-1">{children}</div>
      <div className="lg:col-span-5 space-y-4 lg:space-y-6 order-1 lg:order-2">
        <p className="text-[13px] text-muted" style={mono}>
          <span className="text-leaf">$</span> {cmd}
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.98]">{title}</h2>
        <StepCaption p={p} steps={steps} className="min-h-[4.5rem] lg:min-h-[6rem] text-lg lg:text-xl leading-relaxed text-muted" />
        <StepDots p={p} count={steps.length} />
      </div>
    </div>
  );
}

const BASE = ["plan", "get_user_database_stats", "summarize"];
const CAND = ["plan", "get_user_database_stats", "get_user_database_stats", "summarize"];

/** A trace as a mono step list in a bordered pane. */
function TracePane({ label, steps, highlight = -1, reveal = 1, verdict }: { label: string; steps: string[]; highlight?: number; reveal?: number; verdict: ReactNode }) {
  return (
    <div className="border border-foreground/25 bg-card-bg">
      <div className="flex items-center justify-between border-b border-foreground/15 px-4 py-2 text-[11px] text-muted" style={mono}>
        <span>{label}</span>
        {verdict}
      </div>
      <ol className="py-2" style={mono}>
        {steps.map((s, i) => {
          const on = i / steps.length < reveal;
          const bad = i === highlight;
          return (
            <li
              key={i}
              className="grid grid-cols-[20px_12px_minmax(0,1fr)] sm:grid-cols-[28px_14px_minmax(0,1fr)] items-center px-2 sm:px-3 py-1.5 text-[11px] sm:text-[13px] transition-all duration-500"
              style={{ opacity: on ? 1 : 0, background: bad && on ? "color-mix(in srgb, var(--kumkum) 12%, transparent)" : "transparent" }}
            >
              <span className="text-muted text-[11px]">{i + 1}</span>
              <span className={bad ? "text-kumkum" : "text-leaf"}>{bad ? "+" : " "}</span>
              <span className={`break-all ${bad ? "text-kumkum" : ""}`}>{s}()</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · The test passed                                                  */
/* ------------------------------------------------------------------ */

export function PassedScene() {
  return (
    <ScrollScene length={2.8}>
      {(p) => {
        const under = ease(seg(p, 0.35, 0.7));
        return (
          <Review
            cmd="pytest tests/test_agent.py"
            p={p}
            title={<>The test <span className="serif text-accent">passed.</span></>}
            steps={[
              { at: 0, text: "A prompt tweak ships. The agent still gives the right answer." },
              { at: 0.3, text: "But look at how it got there." },
              { at: 0.55, text: "It called the same tool twice: more tokens, more money, more time." },
              { at: 0.8, text: <>Your test never sees it. <span className="text-foreground">Agents fail quietly.</span></> },
            ]}
          >
            <div className="w-full space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {["main", "pull request"].map((b) => (
                  <div key={b} className="border border-foreground/25 bg-card-bg p-4" style={mono}>
                    <p className="text-[11px] text-muted mb-2">{b} · final answer</p>
                    <p className="text-[13px]">&quot;You have 1,284 active users.&quot;</p>
                    <p className="mt-3 text-[12px] text-leaf">✓ assert answer is correct</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 transition-opacity" style={{ opacity: under, transform: `translateY(${(1 - under) * 20}px)` }}>
                <TracePane label="trajectory · main" steps={BASE} verdict={<span>3 steps</span>} />
                <TracePane label="trajectory · pull request" steps={CAND} highlight={2} reveal={seg(p, 0.5, 0.75) * 1.01} verdict={<span className="text-kumkum">4 steps</span>} />
              </div>
              <p className="text-[11px] text-muted" style={mono}>Illustrative run, modelled on the example on agentdiff.app.</p>
            </div>
          </Review>
        );
      }}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · Line them up                                                     */
/* ------------------------------------------------------------------ */

export function AlignScene() {
  return (
    <ScrollScene length={2.8}>
      {(p) => {
        const ties = seg(p, 0.15, 0.5);
        const loop = seg(p, 0.5, 0.7);
        const stepX = (i: number, n: number) => 60 + (i * 520) / (n - 1);
        return (
          <Review
            cmd="agentdiff baseline.json candidate.json"
            p={p}
            title={<>Line them <span className="serif text-accent">up.</span></>}
            steps={[
              { at: 0, text: "A baseline: your known-good run. A candidate: the run from your pull request." },
              { at: 0.2, text: "AgentDiff aligns them as a graph, step against step." },
              { at: 0.5, text: "Whatever doesn't line up is the regression, down to the exact step." },
              { at: 0.8, text: <>Code review, but for <span className="text-foreground">how the agent behaved.</span></> },
            ]}
          >
            <svg viewBox="0 0 640 300" className="w-full h-auto max-h-[60svh]" style={mono}>
              {[["BASELINE", 70, BASE], ["CANDIDATE", 220, CAND]].map(([label, y, steps]) => (
                <g key={label as string}>
                  <text x="20" y={(y as number) - 28} fontSize="11" letterSpacing="1.5" fill="var(--muted)">{label as string}</text>
                  <line x1="60" x2="580" y1={y as number} y2={y as number} stroke="var(--foreground)" strokeOpacity="0.3" />
                  {(steps as string[]).map((s, i, arr) => {
                    const x = stepX(i, arr.length);
                    const bad = label === "CANDIDATE" && i === 2;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y as number} r={bad ? 9 * (0.6 + 0.4 * loop) : 8} fill={bad ? "var(--kumkum)" : "var(--leaf)"} opacity={bad ? 0.3 + 0.7 * loop : 1} />
                        <text x={x} y={(y as number) + 30} fontSize="10.5" textAnchor="middle" fill={bad ? "var(--kumkum)" : "var(--foreground)"}>
                          {s.length > 14 ? s.slice(0, 13) + "…" : s}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ))}
              {/* alignment ties: baseline i -> candidate match */}
              {[[0, 0], [1, 1], [2, 3]].map(([b, c], i) => {
                const x1 = stepX(b, 3), x2 = stepX(c, 4);
                const t = Math.min(1, Math.max(0, ties * 3 - i));
                return <line key={i} x1={x1} y1="80" x2={x1 + (x2 - x1) * t} y2={80 + 130 * t} stroke="var(--foreground)" strokeOpacity="0.35" strokeDasharray="3 4" />;
              })}
              {/* the unmatched step */}
              <g opacity={loop}>
                <path d={`M ${stepX(2, 4) - 18} 205 a 18 18 0 1 1 36 0`} fill="none" stroke="var(--kumkum)" strokeWidth="1.8" />
                <text x={stepX(2, 4)} y="170" fontSize="11" textAnchor="middle" fill="var(--kumkum)">no match · loop</text>
              </g>
            </svg>
          </Review>
        );
      }}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · The gate                                                         */
/* ------------------------------------------------------------------ */

const GATES = [
  { k: "divergence", v: 0.72, limit: 0.25 },
  { k: "loops", v: 1, limit: 0 },
  { k: "cost", v: 0.55, limit: 0.5 },
  { k: "recovery", v: 0.2, limit: 0.5 },
];

export function GateScene() {
  return (
    <ScrollScene length={3}>
      {(p) => {
        const fill = ease(seg(p, 0.05, 0.45));
        const fail = p > 0.5;
        const comment = ease(seg(p, 0.62, 0.85));
        return (
          <Review
            cmd="agentdiff check --fail-on-regression"
            p={p}
            title={<>The <span className="serif text-accent">gate.</span></>}
            steps={[
              { at: 0, text: "Set the limits once in agentdiff.toml: drift, loops, cost, recovery." },
              { at: 0.45, text: "Cross one and the check fails." },
              { at: 0.65, text: "The GitHub Action blocks the merge and comments on the pull request." },
              { at: 0.85, text: <>With the <span className="text-foreground">exact step that caused it.</span></> },
            ]}
          >
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6 items-start" style={mono}>
              <div className="border border-foreground/25 bg-card-bg p-5 space-y-4">
                <p className="text-[11px] text-muted">agentdiff.toml</p>
                {GATES.map((g) => {
                  const over = g.v > g.limit;
                  return (
                    <div key={g.k} className="space-y-1.5">
                      <div className="flex justify-between text-[12px]">
                        <span>{g.k}</span>
                        <span className={fail && over ? "text-kumkum" : "text-muted"}>{fail ? (over ? "✗ over limit" : "✓ ok") : "…"}</span>
                      </div>
                      <div className="relative h-2 bg-foreground/10">
                        <div className="h-full" style={{ width: `${Math.min(1, g.v) * fill * 100}%`, background: over ? "var(--kumkum)" : "var(--leaf)" }} />
                        <span className="absolute -top-1 bottom-[-4px] w-px bg-foreground" style={{ left: `${g.limit * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
                <p className="text-[11px] text-muted">Values illustrative.</p>
              </div>
              <div
                className="border border-foreground/25 bg-card-bg"
                style={{ opacity: comment, transform: `translateY(${(1 - comment) * 24}px)` }}
              >
                <div className="flex items-center gap-2 border-b border-foreground/15 px-4 py-2.5 text-[12px]">
                  <span className="h-5 w-5 rounded-full bg-leaf" />
                  <span>agentdiff</span>
                  <span className="text-muted">commented</span>
                </div>
                <div className="p-4 space-y-3 text-[12.5px] leading-relaxed">
                  <p className="inline-block border-2 border-kumkum text-kumkum px-2 py-0.5 font-semibold tracking-[0.15em] -rotate-3">REGRESSION</p>
                  <p>Trajectory regressed against baseline.</p>
                  <p className="text-muted">
                    Root cause: step 3, <span className="text-kumkum">get_user_database_stats</span> repeated.
                  </p>
                  <p className="text-muted">Merge blocked until fixed or the baseline is updated.</p>
                </div>
              </div>
            </div>
          </Review>
        );
      }}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · Works with what you have                                         */
/* ------------------------------------------------------------------ */

const ADAPTERS = ["LangGraph", "CrewAI", "OpenTelemetry", "Langfuse", "LangSmith", "OpenAI Agents", "JSON"];

export function AdaptersScene() {
  return (
    <ScrollScene length={2.6}>
      {(p) => {
        const flow = ease(seg(p, 0.1, 0.6));
        return (
          <Review
            cmd="agentdiff crewai_run.json langgraph_run.json"
            p={p}
            title={<>Bring your own <span className="serif text-accent">traces.</span></>}
            steps={[
              { at: 0, text: "No need to change your agent. AgentDiff reads the traces you already have." },
              { at: 0.3, text: "Built-in support for LangGraph, CrewAI, OpenTelemetry, Langfuse, LangSmith and OpenAI Agents." },
              { at: 0.6, text: "Everything converts to one format first." },
              { at: 0.8, text: <>So a CrewAI run can be compared <span className="text-foreground">against a LangGraph run.</span></> },
            ]}
          >
            <svg viewBox="0 0 640 360" className="w-full h-auto max-h-[60svh]" style={mono}>
              {ADAPTERS.map((a, i) => {
                const y = 30 + i * 48;
                const t = Math.min(1, Math.max(0, flow * 1.4 - i * 0.06));
                return (
                  <g key={a}>
                    <rect x="10" y={y - 16} width="168" height="32" fill="var(--card-bg)" stroke="var(--foreground)" strokeOpacity="0.3" />
                    <text x="24" y={y + 4} fontSize="12" fill="var(--foreground)">{a}</text>
                    <path d={`M178 ${y} C 300 ${y}, 330 180, 430 180`} fill="none" stroke="var(--foreground)" strokeOpacity="0.15" />
                    <path d={`M178 ${y} C 300 ${y}, 330 180, 430 180`} fill="none" stroke="var(--leaf)" strokeWidth="1.5" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - t} />
                  </g>
                );
              })}
              <g opacity={0.3 + 0.7 * seg(p, 0.45, 0.65)}>
                <rect x="430" y="140" width="190" height="80" fill="var(--accent)" />
                <text x="525" y="175" textAnchor="middle" fontSize="13" fill="var(--accent-foreground)">one trace format</text>
                <text x="525" y="196" textAnchor="middle" fontSize="10" fill="var(--accent-foreground)" opacity="0.85">+ your own adapter</text>
              </g>
            </svg>
          </Review>
        );
      }}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · Deterministic                                                     */
/* ------------------------------------------------------------------ */

const FACTS = [
  ["No LLM judge", "Same two traces, same verdict, every time."],
  ["No network", "Nothing leaves your machine when you run a diff."],
  ["300+ tests", "Across Python 3.10 to 3.13."],
  ["MIT", "Open source, no API keys needed."],
];

export function DeterministicScene() {
  return (
    <ScrollScene length={2.4}>
      {(p) => (
        <Review
          cmd="agentdiff --version"
          p={p}
          title={<>Boring, on <span className="serif text-accent">purpose.</span></>}
          steps={[
            { at: 0, text: "A test that sometimes passes is worse than no test." },
            { at: 0.35, text: "So AgentDiff is deterministic and runs 100% locally." },
            { at: 0.7, text: <>In pre-release, and <span className="text-foreground">open for feedback.</span></> },
          ]}
        >
          <div className="w-full grid grid-cols-2 gap-px bg-foreground/20 border border-foreground/20">
            {FACTS.map(([k, v], i) => {
              const s = ease(seg(p, 0.05 + i * 0.12, 0.25 + i * 0.12));
              return (
                <div key={k} className="bg-background p-6 sm:p-8" style={{ opacity: 0.2 + 0.8 * s }}>
                  <p className="font-display text-3xl sm:text-5xl leading-none">{k}</p>
                  <p className="mt-3 text-[14px] text-muted">{v}</p>
                </div>
              );
            })}
          </div>
        </Review>
      )}
    </ScrollScene>
  );
}
