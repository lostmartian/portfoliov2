import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { caseStudyGraph } from "@/lib/schema";
import { Check, ChevronRight, X } from "lucide-react";
import { Icon, IconBadge } from "@/components/case-study/Icon";
import {
  CaseStudyFrame,
  CaseStudyHero,
  Decisions,
  LayerList,
  Pressures,
  Pullquote,
  Reflection,
  Results,
  Section,
  StackList,
  StatRow,
  StepFlow,
  label,
} from "@/components/case-study/blocks";
import { DocuNexusJourney } from "@/components/case-study/DocuNexusJourney";
import { LabelerJourney } from "@/components/case-study/LabelerJourney";
import type { TocItem } from "@/components/case-study/Toc";
import {
  consensusTiers,
  context,
  disagreement,
  labellingFlow,
  layers,
  leadResult,
  matchingWeights,
  meta,
  nexusFlow,
  pressures,
  products,
  reflection,
  results,
  stack,
  stats,
  stories,
  takeaway,
} from "@/lib/case-studies/farsight";

export const metadata: Metadata = pageMeta({
  title: "Farsight case study",
  description: meta.description,
  path: "/work/farsight",
  type: "article",
  keywords: [
    "ground truth labelling",
    "AI data platform",
    "GraphRAG",
    "document knowledge graph",
    "founding engineer",
    "Python",
    "Neo4j",
  ],
});

const structured = caseStudyGraph({
  path: "/work/farsight",
  headline: "Farsight: Trusted answers from messy documents",
  description: meta.description,
  project: "Farsight",
  client: "Omara Technologies",
  keywords: [
    "ground truth labelling",
    "AI data platform",
    "GraphRAG",
    "document knowledge graph",
    "founding engineer",
    "Python",
    "Neo4j",
  ],
});

const SECTIONS: TocItem[] = [
  { id: "problem", label: "The problem" },
  { id: "built", label: "What I built" },
  { id: "workspace", label: "A labeler's day" },
  { id: "labelling", label: "Ground truth" },
  { id: "docunexus", label: "Knowledge graph" },
  { id: "role", label: "My role" },
  { id: "decisions", label: "Key decisions" },
  { id: "results", label: "Results" },
  { id: "stack", label: "Stack" },
  { id: "reflection", label: "Reflection" },
];

const sec = (id: string) => {
  const index = SECTIONS.findIndex((s) => s.id === id);
  return { id, index, name: SECTIONS[index].label };
};

/** Hero visual: three labelers read one field, consensus settles it. */
function Disagreement() {
  return (
    <div className="grid items-center gap-6 @2xl:grid-cols-[minmax(0,1.3fr)_auto_minmax(0,1fr)] @2xl:gap-10">
      <div>
        <p className={`${label} mb-4`}>{disagreement.field}</p>
        <ul className="divide-y divide-fg/10 border-y border-fg/10">
          {disagreement.reads.map((r) => (
            <li key={r.who} className="flex items-center justify-between gap-4 py-4">
              <span className="text-[15px] text-muted">{r.who}</span>
              <span className="flex items-center gap-3">
                <span
                  className={`tabular font-display text-2xl ${r.agrees ? "text-fg" : "text-fg/40 line-through decoration-1"}`}
                >
                  {r.value}
                </span>
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                    r.agrees ? "bg-fg text-ink" : "border border-fg/25 text-fg/50"
                  }`}
                >
                  {r.agrees ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  ) : (
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  )}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ChevronRight aria-hidden className="mx-auto hidden h-8 w-8 text-fg/30 @2xl:block" strokeWidth={1.5} />
      <div className="rounded-2xl bg-card p-7 ring-1 ring-line shadow-[0_1px_2px_rgb(var(--shadow)/0.04),0_12px_32px_-12px_rgb(var(--shadow)/0.12)]">
        <p className={label}>Settled value</p>
        <p className="tabular mt-3 font-display text-5xl">{disagreement.result.value}</p>
        <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-fg" />
          {disagreement.result.how}
        </p>
      </div>
    </div>
  );
}

function Products() {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-16">
      {products.map((p) => (
        <div key={p.name}>
          <IconBadge name={p.icon} size="lg" />
          <h3 className="mt-6 font-display text-[1.75rem] leading-tight">{p.name}</h3>
          <p className="mt-3 text-[15px] leading-[1.7] text-muted">{p.text}</p>
        </div>
      ))}
    </div>
  );
}

function ConsensusLadder() {
  return (
    <div>
      <h3 className="text-lg font-medium">How a disagreement gets settled</h3>
      <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.7] text-muted">
        Every field runs through the tiers in order and stops at the first one that settles it.
      </p>
      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
        {consensusTiers.map((t, i) => {
          const last = i === consensusTiers.length - 1;
          return (
            <li key={t.tier} className={`p-7 ${last ? "bg-fg text-ink" : "bg-ink"}`}>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                    last ? "bg-ink/10 text-ink" : "bg-card text-fg ring-1 ring-line"
                  }`}
                >
                  <IconInline name={t.icon} />
                </span>
                <span className={`tabular text-[13px] font-medium ${last ? "text-ink/60" : "text-muted"}`}>
                  Tier {i + 1}
                </span>
              </div>
              <p className="mt-6 text-lg font-medium">{t.tier}</p>
              <p className={`mt-2 text-sm leading-relaxed ${last ? "text-ink/70" : "text-muted"}`}>{t.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// Thin wrapper so the ladder can render icons without the badge chrome.
function IconInline({ name }: { name: string }) {
  return <Icon name={name} className="h-5 w-5" />;
}

function MatchingWeights() {
  return (
    <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
      <div>
        <h3 className="text-lg font-medium">Matching repeated items across labelers</h3>
        <p className="mt-2 text-[15px] leading-[1.7] text-muted">
          When a document has several members or payments, labelers annotate them in different orders. The Hungarian
          algorithm pairs them up on a weighted score before consensus runs.
        </p>
      </div>
      <div>
        <div className="flex h-3 overflow-hidden rounded-full">
          {matchingWeights.map((w, i) => (
            <span key={w.label} className={["bg-fg", "bg-fg/45", "bg-fg/15"][i]} style={{ width: `${w.weight}%` }} />
          ))}
        </div>
        <dl className="mt-6 grid grid-cols-3 gap-6">
          {matchingWeights.map((w, i) => (
            <div key={w.label}>
              <dt className="flex items-center gap-2 text-sm text-muted">
                <span className={`h-2.5 w-2.5 rounded-full ${["bg-fg", "bg-fg/45", "bg-fg/15"][i]}`} />
                {w.label}
              </dt>
              <dd className="tabular mt-2 font-display text-3xl">{w.weight}%</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default function FarsightCaseStudy() {
  return (
    <>
      <JsonLd data={structured} />
      <CaseStudyFrame
        sections={SECTIONS}
        hero={
          <CaseStudyHero
            eyebrow={`Case study · ${meta.title}`}
            title={
              <>
                Trusted answers from messy documents. <span className="text-fg/40">Even when people disagree.</span>
              </>
            }
            summary={meta.summary}
            facts={meta.facts}
            visualLabel="Three labelers, one field"
            visual={<Disagreement />}
          />
        }
      >
        <Section
          {...sec("problem")}
          title="AI is only as good as its ground truth."
          intro="Teams that extract data from documents, or evaluate AI that does, need answers they can trust. Getting those answers by hand runs into three problems."
        >
          <Pressures items={pressures} />
          <div className="mt-20">
            <Pullquote>{context}</Pullquote>
          </div>
        </Section>

        <Section
          {...sec("built")}
          title="Two products, one goal."
          intro="Both turn unstructured documents into something reliable: one through people, one through AI."
        >
          <Products />
        </Section>

        <Section
          {...sec("workspace")}
          title="From sign-in to submitted task."
          intro="A labeler signs in, sees their projects, earnings and productivity, picks up a task from the queue and annotates it in the workspace. Every common action has a keyboard shortcut, because a labeler repeats it hundreds of times a day."
        >
          <LabelerJourney />
        </Section>

        <Section
          {...sec("labelling")}
          title="From many opinions to one trusted value."
          intro="The labelling platform moves each document through six stages. Automation handles everything it can, and people step in only where they're needed."
        >
          <StepFlow steps={labellingFlow} />
          <div className="mt-24">
            <ConsensusLadder />
          </div>
          <MatchingWeights />
        </Section>

        <Section
          {...sec("docunexus")}
          title="From documents to digital intelligence."
          intro="An organisation designs its ontology with AI, uploads its FIR records as CSV or JSON, and lets the GraphRAG engine build the graph in the background. Then anyone in the organisation can ask questions in plain language and get answers backed by the FIRs they came from."
        >
          <DocuNexusJourney />
          <div className="mt-20">
            <StepFlow steps={nexusFlow} columns={5} />
          </div>
          <p className="mt-14 max-w-[62ch] text-[15px] leading-[1.7] text-muted">
            Every extracted value carries a bounding box and a confidence score, and every graph entity links back to
            its source document.{" "}
            <span className="text-fg">An answer is only useful if you can check where it came from.</span>
          </p>
        </Section>

        <Section
          {...sec("role")}
          title={
            <>
              Founding engineer. <span className="text-fg/45">Every layer, solo.</span>
            </>
          }
          intro="I designed and built both products end to end, from database schema and algorithms to the screens labelers and experts use every day."
        >
          <StatRow stats={stats} />
          <LayerList layers={layers} />
        </Section>

        <Section {...sec("decisions")} title="Five calls that shaped the work.">
          <Decisions stories={stories} />
        </Section>

        <Section {...sec("results")} title="What shipped.">
          <Results lead={leadResult} items={results} />
        </Section>

        <Section {...sec("stack")} title="The right tool for each layer.">
          <StackList stack={stack} />
        </Section>

        <Section {...sec("reflection")} title="What I took away.">
          <Reflection takeaway={takeaway} paragraphs={reflection} />
        </Section>
      </CaseStudyFrame>
    </>
  );
}
