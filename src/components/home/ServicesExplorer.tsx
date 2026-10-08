"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Glyph, { type GlyphKind } from "@/components/warli/Glyph";
import { CaseCover } from "@/components/case/Covers";
import { devaNum } from "@/components/ui/deva";

interface Service {
  title: string;
  mr: string;
  glyph: GlyphKind;
  line: string;
  includes: string[];
  engagement: string;
  proof: { label: string; href: string; cover?: string; note: string };
}

const SERVICES: Service[] = [
  {
    title: "AI engineering",
    mr: "बुद्धी",
    glyph: "ai",
    line: "Agents, GraphRAG pipelines and LLM evaluators, taken all the way to production.",
    includes: ["Agentic workflows (LangGraph)", "GraphRAG over your documents", "LLM evaluation & ground truth", "Production deployment"],
    engagement: "Project or contract",
    proof: { label: "Farsight", href: "/work/farsight", cover: "farsight", note: "Knowledge graphs, agentic search and a ground-truth scoring engine for Omara." },
  },
  {
    title: "Backend systems",
    mr: "पाया",
    glyph: "db",
    line: "High-throughput Go/Python services and scale-elastic AWS for systems that can't be wrong.",
    includes: ["High-throughput Go / Python services", "Settlement & reconciliation engines", "Scale-elastic AWS, infrastructure as code", "Audit trails & deterministic pipelines"],
    engagement: "Contract, or full-time SDE 1 / SDE 2",
    proof: { label: "IPO Allotment Engine", href: "/work/ipo-allotment-engine", cover: "ipo-allotment-engine", note: "1.6M+ records reconciled per second under SEBI's T+3 rule." },
  },
  {
    title: "AI consulting",
    mr: "सल्ला",
    glyph: "lens",
    line: "A senior second pair of eyes on the AI you're already shipping.",
    includes: ["Architecture reviews", "Prompt-drift audits", "Agent trajectory evaluation", "Token-cost optimisation"],
    engagement: "Senior consulting",
    proof: { label: "AgentDiff", href: "/work/agentdiff", cover: "agentdiff", note: "The trajectory-regression tool I built from exactly this kind of review work." },
  },
  {
    title: "Mentorship",
    mr: "मार्गदर्शन",
    glyph: "diya",
    line: "1-on-1 teaching from first principles, the way my videos explain things.",
    includes: ["Transformers & attention, from the maths up", "GPU & memory bottlenecks", "Building AI systems end to end", "DSA & ML foundations"],
    engagement: "1-on-1 sessions",
    proof: { label: "First principles, on video", href: "/videos", note: "Previously a DSA & machine-learning instructor; now explaining AI internals on YouTube." },
  },
];

const EMAIL = "sahilgangurde08@gmail.com";

function Panel({ s }: { s: Service }) {
  return (
    <div key={s.title} className="rise border border-foreground/70 bg-card-bg p-7 sm:p-9" style={{ "--d": "0ms" } as React.CSSProperties}>
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="deva text-accent text-lg leading-none">{s.mr}</p>
          <h3 className="text-3xl sm:text-4xl leading-tight mt-2">{s.title}</h3>
        </div>
        <Glyph kind={s.glyph} className="w-14 h-14 shrink-0 text-accent" />
      </div>
      <p className="mt-4 text-[16px] text-muted leading-relaxed">{s.line}</p>

      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-[15px]">
        {s.includes.map((it) => (
          <li key={it} className="flex items-start gap-2.5">
            <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
            {it}
          </li>
        ))}
      </ul>

      <Link href={s.proof.href} className="group mt-7 flex items-center gap-4 border-t border-border pt-5">
        {s.proof.cover ? (
          <span className="block w-28 shrink-0 overflow-hidden border border-border">
            <CaseCover slug={s.proof.cover} bare animate={false} className="block w-full h-auto transition-transform duration-700 group-hover:scale-105" />
          </span>
        ) : (
          <span className="grid place-items-center w-28 h-[70px] shrink-0 border border-border bg-foreground text-background">
            <span className="text-[11px] tracking-[0.2em] uppercase">Videos</span>
          </span>
        )}
        <span className="min-w-0">
          <span className="label">Proof</span>
          <span className="block font-display text-xl leading-tight group-hover:text-accent transition-colors">{s.proof.label} ↗</span>
          <span className="block text-[13px] text-muted leading-snug mt-0.5">{s.proof.note}</span>
        </span>
      </Link>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] text-muted">
          <span className="label mr-2">Engagement</span>
          {s.engagement}
        </span>
        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent(`${s.title} enquiry`)}`}
          className="flourish group inline-flex items-center gap-2 h-11 pl-5 pr-4 rounded-full bg-foreground text-background text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Start a conversation
          <ArrowUpRight className="nudge w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

/**
 * Services as a menu: pick a service on the left (hover, focus or tap) and the
 * panel on the right shows what's included, how we'd work, and the case study
 * that proves it. On small screens the panel opens under its row.
 */
export default function ServicesExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6 items-start">
      <ol className="lg:col-span-5 border-t border-foreground/70" role="tablist" aria-label="Services">
        {SERVICES.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title} className="border-b border-border">
              <button
                role="tab"
                aria-selected={on}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group relative w-full grid grid-cols-[36px_1fr_auto] items-center gap-4 py-6 text-left cursor-pointer"
              >
                <span className={`absolute left-0 top-0 bottom-0 w-[3px] bg-accent origin-top transition-transform duration-500 ${on ? "scale-y-100" : "scale-y-0"}`} aria-hidden="true" />
                <span className={`deva text-2xl transition-all duration-500 ${on ? "text-accent pl-3" : "text-muted"}`}>{devaNum(i + 1)}</span>
                <span>
                  <span className={`block font-display text-3xl sm:text-4xl leading-tight transition-colors ${on ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"}`}>{s.title}</span>
                  <span className="block text-[13px] text-muted mt-1">{s.engagement}</span>
                </span>
                <span className={`grid place-items-center h-10 w-10 rounded-full border transition-all duration-500 ${on ? "bg-accent border-accent text-accent-foreground rotate-45" : "border-border-strong text-muted"}`}>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
              {on && (
                <div className="lg:hidden pb-6">
                  <Panel s={s} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="hidden lg:block lg:col-span-7 lg:sticky lg:top-28" role="tabpanel">
        <Panel s={SERVICES[active]} />
      </div>
    </div>
  );
}
