import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  CaseStudyFrame,
  CaseStudyHero,
  Decisions,
  Pressures,
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
  SITE,
  flow,
  leadResult,
  meta,
  pressures,
  reflection,
  results,
  stack,
  stats,
  stories,
  takeaway,
  week,
} from "@/lib/case-studies/agentdiff";
import { pageMeta } from "@/lib/meta";
import { relatedPosts } from "@/lib/related";
import { caseStudyGraph } from "@/lib/schema";

const keywords = [
  "AgentDiff",
  "AI agent cost",
  "Claude Code cost",
  "OpenAI Codex CLI",
  "AI agent regression testing",
  "LLM token spend",
  "developer tools",
  "open source",
];

export const metadata: Metadata = pageMeta({
  title: "AgentDiff: what your AI coding agent did and what it cost",
  description: meta.description,
  path: "/work/agentdiff",
  type: "article",
  keywords,
});

const structured = [
  ...caseStudyGraph({
    path: "/work/agentdiff",
    headline: "AgentDiff: see what your AI coding agent did, and what it cost",
    description: meta.description,
    project: "AgentDiff",
    client: "KerrShift",
    keywords,
  }),
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AgentDiff",
    url: SITE,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    license: "https://opensource.org/licenses/MIT",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    codeRepository: REPO_URL,
    author: { "@id": "https://lostmartian.in/#person" },
    publisher: { "@id": "https://lostmartian.in/#kerrshift" },
  },
];

const SECTIONS: TocItem[] = [
  { id: "problem", label: "The problem" },
  { id: "approach", label: "How it works" },
  { id: "decisions", label: "Key decisions" },
  { id: "results", label: "Results" },
  { id: "stack", label: "Stack" },
  { id: "progress", label: "Where it stands" },
];

const sec = (id: string) => {
  const index = SECTIONS.findIndex((s) => s.id === id);
  return { id, index, name: SECTIONS[index].label };
};

/** "Where the money went", from one real week, drawn to scale. */
function Spend() {
  return (
    <figure>
      <p className="tabular text-[13px] text-muted">{week.label}</p>
      <div className="mt-6 grid gap-6">
        {week.rows.map((r, i) => (
          <div key={r.name}>
            <div className="flex items-baseline justify-between gap-4">
              <p className={`text-[15px] font-medium ${i === 0 ? "text-fg" : "text-muted"}`}>{r.name}</p>
              <p className="tabular text-[13px] text-muted">
                ${r.value.toFixed(2)} · {r.share}%
              </p>
            </div>
            <span className="relative mt-2.5 block h-2.5 overflow-hidden rounded-full bg-fg/[0.06]">
              <span
                className={`absolute inset-y-0 left-0 rounded-full ${i === 0 ? "bg-fg" : "bg-fg/30"}`}
                style={{ width: `${Math.max(r.share, 2)}%` }}
              />
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-8 border-t border-fg/10 pt-5 text-[15px] font-medium">
        {week.avoidable}
        <span className="mt-1 block text-[13px] font-normal text-muted">One real week from my own Claude Code logs.</span>
      </figcaption>
    </figure>
  );
}

export default function AgentDiffCaseStudy() {
  return (
    <>
      <JsonLd data={structured} />
      <CaseStudyFrame
        sections={SECTIONS}
        related={relatedPosts("/work/agentdiff")}
        hero={
          <CaseStudyHero
            eyebrow="Case study · AgentDiff · KerrShift"
            title={
              <>
                Where your agent&apos;s money went. <span className="text-fg/40">And what was avoidable.</span>
              </>
            }
            summary={meta.summary}
            facts={meta.facts}
            visualLabel="Where the money went"
            visual={<Spend />}
          />
        }
      >
        <Section
          {...sec("problem")}
          title="Agent bills grow. Nobody can say why."
          intro="Teams now spend real money on AI coding agents like Claude Code and Codex. Three things made that spend hard to manage."
        >
          <Pressures items={pressures} />
        </Section>

        <Section
          {...sec("approach")}
          title="One command. Your logs, your machine."
          intro="AgentDiff reads the logs your agent already writes, prices every request, and names the habits that cost the most."
        >
          <StepFlow steps={flow} columns={5} />
          <p className="mt-14 max-w-[62ch] text-[15px] leading-[1.7] text-muted">
            Every finding names the session and the file or command involved, with a dollar estimate.{" "}
            <span className="text-fg">For teams building their own agents, it also ships a CI gate that fails the build on loops or cost spikes.</span>
          </p>
        </Section>

        <Section
          {...sec("decisions")}
          title={
            <>
              Built solo. <span className="text-fg/45">Four calls that shaped it.</span>
            </>
          }
        >
          <StatRow stats={stats} />
          <div className="mt-16">
            <Decisions stories={stories} />
          </div>
        </Section>

        <Section {...sec("results")} title="Measured on real work.">
          <Results lead={leadResult} items={results} />
        </Section>

        <Section {...sec("stack")} title="Small, local, and easy to install.">
          <StackList stack={stack} />
        </Section>

        <Section {...sec("progress")} title="In pre-release, and moving fast.">
          <Reflection takeaway={takeaway} paragraphs={reflection} />
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { label: "Try it at agentdiff.app", href: SITE },
              { label: "Star it on GitHub", href: REPO_URL },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium ring-1 ring-inset ring-fg/15 transition-colors hover:bg-fg/[0.04]"
              >
                {l.label}
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 text-fg/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  strokeWidth={1.75}
                />
              </a>
            ))}
          </div>
        </Section>
      </CaseStudyFrame>
    </>
  );
}
