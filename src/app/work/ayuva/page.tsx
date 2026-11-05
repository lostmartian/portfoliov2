import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { caseStudyGraph } from "@/lib/schema";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { IconBadge } from "@/components/case-study/Icon";
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
import type { TocItem } from "@/components/case-study/Toc";
import {
  architecture,
  capabilities,
  context,
  interpretation,
  layers,
  leadResult,
  meta,
  pressures,
  reflection,
  results,
  stack,
  stats,
  stories,
  takeaway,
} from "@/lib/case-studies/ayuva";

export const metadata: Metadata = pageMeta({
  title: "AYUVA case study",
  description: meta.description,
  path: "/work/ayuva",
  type: "article",
  keywords: ["healthcare AI", "LLM", "medical report summarisation", "AI triage", "UK health app", "AI engineering"],
});

const structured = caseStudyGraph({
  path: "/work/ayuva",
  headline: "AYUVA: Medical reports, in words patients understand",
  description: meta.description,
  project: "AYUVA",
  client: "First500days",
  keywords: ["healthcare AI", "LLM", "medical report summarisation", "AI triage", "UK health app", "AI engineering"],
});

const SECTIONS: TocItem[] = [
  { id: "problem", label: "The problem" },
  { id: "capabilities", label: "What I built" },
  { id: "architecture", label: "How it fits" },
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

const card =
  "rounded-2xl bg-card p-5 ring-1 ring-line shadow-[0_1px_2px_rgb(var(--shadow)/0.04),0_12px_32px_-12px_rgb(var(--shadow)/0.12)]";

/** Hero visual: a lab report line in, a plain-language explanation out. */
function Interpretation() {
  const r = interpretation;
  return (
    <div className="grid items-center gap-4 @2xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)] @2xl:gap-8">
      <div className={card}>
        <p className={label}>What the patient uploads</p>
        <p className="mt-3 text-[15px] font-medium">{r.report.title}</p>
        <dl className="mt-3 divide-y divide-line border-y border-line text-sm">
          {r.report.rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2">
              <dt className="text-muted">{k}</dt>
              <dd className="tabular text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ArrowRight aria-hidden className="mx-auto hidden h-7 w-7 text-fg/30 @2xl:block" strokeWidth={1.5} />

      <div className={card}>
        <p className={label}>What AYUVA explains</p>
        <p className="mt-3 text-[15px] leading-relaxed">{r.summary}</p>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-surface px-4 py-3 text-sm">
          <span className="font-medium">{r.highlight.label}</span>
          <span className="flex items-center gap-2">
            <span className="tabular">{r.highlight.value}</span>
            <span className="rounded-full bg-fg px-2 py-0.5 text-xs font-medium text-ink">{r.highlight.status}</span>
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {r.glossary.map((g) => (
            <span key={g} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
              {g}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          Ask your doctor: <span className="text-fg">{r.question}</span>
        </p>
      </div>
    </div>
  );
}

function Capabilities() {
  return (
    <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
      {capabilities.map((c) => (
        <div key={c.name}>
          <IconBadge name={c.icon} size="lg" />
          <h3 className="mt-6 font-display text-[1.75rem] leading-tight">{c.name}</h3>
          <p className="mt-3 text-[15px] leading-[1.7] text-muted">{c.text}</p>
          <p className="mt-4 flex gap-2.5 border-t border-line pt-4 text-[15px] leading-[1.6]">
            <ShieldCheck aria-hidden className="mt-0.5 h-[18px] w-[18px] shrink-0 text-fg/70" strokeWidth={1.75} />
            <span>{c.guard}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default function AyuvaCaseStudy() {
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
                Medical reports, in words patients understand.{" "}
                <span className="text-fg/40">Without playing doctor.</span>
              </>
            }
            summary={meta.summary}
            facts={meta.facts}
            visualLabel="One report, explained"
            visual={<Interpretation />}
          />
        }
      >
        <Section
          {...sec("problem")}
          title="Patients get the paperwork, not the meaning."
          intro="Navigating healthcare means reading documents written for clinicians and making decisions about where to go next. AI can help with both, but only if it knows its limits."
        >
          <Pressures items={pressures} />
          <div className="mt-20">
            <Pullquote>{context}</Pullquote>
          </div>
        </Section>

        <Section
          {...sec("capabilities")}
          title="Four AI capabilities, each with a safety rule built in."
          intro="Each one answers in a fixed, typed format the app can rely on, and each has a guardrail that holds even when the model gets it wrong."
        >
          <Capabilities />
        </Section>

        <Section
          {...sec("architecture")}
          title="A separate AI service behind the client's gateway."
          intro="The client's backend keeps logins, patient records and audit logs. My service only generates answers, so patient data never lives in AI code."
        >
          <StepFlow steps={architecture} columns={5} />
          <p className="mt-14 max-w-[62ch] text-[15px] leading-[1.7] text-muted">
            Every response carries the same medical disclaimer, and every AI call is logged by the gateway.{" "}
            <span className="text-fg">The safety rules live in code, not in the prompt.</span>
          </p>
        </Section>

        <Section
          {...sec("role")}
          title={
            <>
              The whole AI layer. <span className="text-fg/45">From contract to cost report.</span>
            </>
          }
          intro="I designed, built, tested and documented the AI service, and wired it into the client's backend."
        >
          <StatRow stats={stats} />
          <LayerList layers={layers} />
        </Section>

        <Section {...sec("decisions")} title="Five calls that shaped the work.">
          <Decisions stories={stories} />
        </Section>

        <Section {...sec("results")} title="Measured, not assumed.">
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
