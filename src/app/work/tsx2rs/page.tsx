import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { caseStudyGraph } from "@/lib/schema";
import { ArrowUpRight } from "lucide-react";
import {
  CaseStudyFrame,
  CaseStudyHero,
  Decisions,
  Pressures,
  Pullquote,
  Reflection,
  Results,
  Section,
  StackList,
  StatRow,
  StepFlow,
} from "@/components/case-study/blocks";
import type { TocItem } from "@/components/case-study/Toc";
import {
  REPO_URL,
  flow,
  journey,
  leadResult,
  meta,
  premise,
  pressures,
  reflection,
  results,
  stack,
  stats,
  stories,
  takeaway,
  throughput,
} from "@/lib/case-studies/tsx2rs";

export const metadata: Metadata = pageMeta({
  title: "tsx2rs: Next.js compiled to Rust",
  description: meta.description,
  path: "/work/tsx2rs",
  type: "article",
  keywords: ["Next.js", "Rust", "compiler", "React server components", "performance", "oxc", "self-hosting Next.js"],
});

const structured = caseStudyGraph({
  path: "/work/tsx2rs",
  headline: "tsx2rs: Next.js, compiled to Rust",
  description: meta.description,
  project: "tsx2rs",
  keywords: ["Next.js", "Rust", "compiler", "React server components", "performance", "oxc", "self-hosting Next.js"],
});

const SECTIONS: TocItem[] = [
  { id: "problem", label: "The problem" },
  { id: "approach", label: "How it works" },
  { id: "validation", label: "Validate first" },
  { id: "decisions", label: "Key decisions" },
  { id: "results", label: "Results so far" },
  { id: "progress", label: "Where it stands" },
  { id: "stack", label: "Stack" },
];

const sec = (id: string) => {
  const index = SECTIONS.findIndex((s) => s.id === id);
  return { id, index, name: SECTIONS[index].label };
};

/** Two bars, drawn to scale: the real app's requests per second on 8 processes. */
function Throughput() {
  const max = Math.max(...throughput.map((t) => t.value));
  return (
    <figure>
      <div className="grid gap-8">
        {throughput.map((t) => (
          <div key={t.name}>
            <div className="flex items-baseline justify-between gap-4">
              <p className={`text-[15px] font-medium ${t.lead ? "text-fg" : "text-muted"}`}>{t.name}</p>
              <p className="tabular text-[13px] text-muted">{t.latency}</p>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-fg/[0.06]">
                <span
                  className={`absolute inset-y-0 left-0 rounded-full ${t.lead ? "bg-fg" : "bg-fg/30"}`}
                  style={{ width: `${Math.max((t.value / max) * 100, 2)}%` }}
                />
              </span>
              <span className={`tabular w-[4.5ch] text-right font-display text-2xl ${t.lead ? "" : "text-fg/45"}`}>
                {t.value.toLocaleString("en-US")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-8 border-t border-fg/10 pt-5 text-[13px] leading-relaxed text-muted">
        Requests per second, Vercel Commerce product page, 8 processes on Google Cloud. Hand-compiled prototype; output
        identical to Next.js.
      </figcaption>
    </figure>
  );
}

function Validation() {
  return (
    <ol className="relative">
      <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-fg/15 md:left-[167px]" />
      {journey.map((j, i) => (
        <li
          key={j.when}
          className="relative grid gap-2 pb-14 pl-10 last:pb-0 md:grid-cols-[140px_1fr] md:gap-12 md:pl-0"
        >
          <span
            aria-hidden
            className={`absolute left-0 top-[5px] h-[15px] w-[15px] rounded-full md:left-[160px] ${
              i === journey.length - 1 ? "bg-fg ring-[5px] ring-fg/10" : "border-2 border-fg bg-ink"
            }`}
          />
          <p className="text-sm font-medium text-muted md:pt-px md:text-right">{j.when}</p>
          <div className="md:pl-6">
            <h3 className="font-display text-2xl leading-snug">{j.title}</h3>
            <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.7] text-muted">{j.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Tsx2rsCaseStudy() {
  return (
    <>
      <JsonLd data={structured} />
      <CaseStudyFrame
        sections={SECTIONS}
        hero={
          <CaseStudyHero
            eyebrow="Case study · tsx2rs · In progress"
            title={
              <>
                Next.js, compiled to Rust. <span className="text-fg/40">Same output.</span>
              </>
            }
            summary={meta.summary}
            facts={meta.facts}
            visualLabel="Throughput on a real app"
            visual={<Throughput />}
          />
        }
      >
        <Section
          {...sec("problem")}
          title="Self-hosted Next.js spends most of its CPU on itself."
          intro="Next.js is the default way to build a React app, and many teams run it on their own servers. Three facts shaped the project."
        >
          <Pressures items={pressures} />
          <div className="mt-20">
            <Pullquote>{premise}</Pullquote>
          </div>
        </Section>

        <Section
          {...sec("approach")}
          title="One config line, and Next.js stays in charge."
          intro="tsx2rs plugs in through Next.js's official Deployment Adapter API. It routes requests exactly as next start does."
        >
          <StepFlow steps={flow} />
          <p className="mt-14 max-w-[62ch] text-[15px] leading-[1.7] text-muted">
            Users never need a Rust toolchain: the compiler emits template programs for one prebuilt engine.{" "}
            <span className="text-fg">If a page can&apos;t be served identically, it isn&apos;t served by tsx2rs.</span>
          </p>
        </Section>

        <Section
          {...sec("validation")}
          title={
            <>
              Ten experiments before any product code. <span className="text-fg/45">Each one changed the plan.</span>
            </>
          }
          intro="I didn't write the product until every open question had a measured answer. This is how the idea changed along the way."
        >
          <StatRow stats={stats} />
          <div className="mt-16">
            <Validation />
          </div>
        </Section>

        <Section {...sec("decisions")} title="Five calls that shaped it.">
          <Decisions stories={stories} />
        </Section>

        <Section {...sec("results")} title="Measured on clean machines.">
          <Results lead={leadResult} items={results} />
        </Section>

        <Section {...sec("progress")} title="Not usable yet. Here's where it is.">
          <Reflection takeaway={takeaway} paragraphs={reflection} />
          <a
            href={REPO_URL}
            className="group mt-10 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium ring-1 ring-inset ring-fg/15 transition-colors hover:bg-fg/[0.04]"
          >
            Follow it on GitHub
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 text-fg/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
              strokeWidth={1.75}
            />
          </a>
        </Section>

        <Section {...sec("stack")} title="Rust where it counts, Next.js everywhere else.">
          <StackList stack={stack} />
        </Section>
      </CaseStudyFrame>
    </>
  );
}
