import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { relatedPosts } from "@/lib/related";
import { caseStudyGraph } from "@/lib/schema";
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
} from "@/components/case-study/blocks";
import type { TocItem } from "@/components/case-study/Toc";
import {
  journey,
  layers,
  leadResult,
  listingTimeline,
  market,
  meta,
  pipeline,
  pressures,
  reflection,
  results,
  stack,
  stats,
  stories,
  takeaway,
} from "@/lib/case-studies/ipo";

export const metadata: Metadata = pageMeta({
  title: "IPO Allotment Engine case study",
  description: meta.description,
  path: "/work/ipo-allotment-engine",
  type: "article",
  keywords: [
    "IPO allotment software",
    "SEBI registrar",
    "RTA software",
    "fintech engineering",
    "capital markets",
    "Go",
    "Python",
    "Polars",
    "AWS",
  ],
});

const structured = caseStudyGraph({
  path: "/work/ipo-allotment-engine",
  headline: "IPO Allotment Engine: One day to get every share right",
  description: meta.description,
  project: "IPO Allotment Engine",
  client: "Niche Technologies",
  keywords: [
    "IPO allotment software",
    "SEBI registrar",
    "RTA software",
    "fintech engineering",
    "capital markets",
    "Go",
    "Python",
    "Polars",
    "AWS",
  ],
});

const SECTIONS: TocItem[] = [
  { id: "problem", label: "The problem" },
  { id: "platform", label: "What we built" },
  { id: "role", label: "My role" },
  { id: "journey", label: "The journey" },
  { id: "decisions", label: "Key decisions" },
  { id: "results", label: "Results" },
  { id: "stack", label: "Stack" },
  { id: "reflection", label: "Reflection" },
];

const sec = (id: string) => {
  const index = SECTIONS.findIndex((s) => s.id === id);
  return { id, index, name: SECTIONS[index].label };
};

/** Vertical rows when narrow (e.g. beside the hero text); four columns only with real width. */
function ListingTimeline() {
  return (
    <ol className="relative grid gap-6 @3xl:grid-cols-4 @3xl:gap-6">
      <span
        aria-hidden
        className="absolute bottom-5 left-[7px] top-5 w-px bg-fg/15 @3xl:inset-x-0 @3xl:bottom-auto @3xl:left-0 @3xl:top-[7px] @3xl:h-px @3xl:w-auto"
      />
      {listingTimeline.map((t) => (
        <li
          key={t.day}
          className="relative grid grid-cols-[64px_1fr] items-baseline gap-x-4 pl-9 @3xl:block @3xl:pl-0 @3xl:pt-10"
        >
          <span
            aria-hidden
            className={`absolute left-0 top-3 h-[15px] w-[15px] rounded-full @3xl:top-0 ${
              t.crunch ? "bg-fg ring-[6px] ring-fg/10" : "border border-fg/30 bg-ink"
            }`}
          />
          <p className={`font-display text-3xl @3xl:text-4xl ${t.crunch ? "text-fg" : "text-fg/45"}`}>{t.day}</p>
          <div className="@3xl:mt-2">
            <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <span className="tabular">{t.time}</span>
              {t.crunch && (
                <span className="rounded-full border border-fg/80 px-2 py-px text-[11px] font-medium text-fg">
                  The crunch
                </span>
              )}
            </p>
            <p className={`mt-0.5 text-[15px] leading-snug ${t.crunch ? "font-medium text-fg" : "text-muted"}`}>
              {t.text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Journey() {
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

export default function IpoCaseStudy() {
  return (
    <>
      <JsonLd data={structured} />
      <CaseStudyFrame
        sections={SECTIONS}
        related={relatedPosts("/work/ipo-allotment-engine")}
        hero={
          <CaseStudyHero
            eyebrow={`Case study · ${meta.title}`}
            title={
              <>
                One day to get every share right. <span className="text-fg/40">No room for error.</span>
              </>
            }
            summary={meta.summary}
            facts={meta.facts}
            visualLabel="India's T+3 listing timeline"
            visual={<ListingTimeline />}
          />
        }
      >
        <Section
          {...sec("problem")}
          title="A licence, a deadline, and no platform."
          intro="When a company lists in India, a Registrar & Transfer Agent sits between the issuer, the exchanges, the depositories and the banks. It decides which bids are valid and who gets shares, under three pressures at once."
        >
          <Pressures items={pressures} />
          <div className="mt-20">
            <Pullquote>{market}</Pullquote>
          </div>
        </Section>

        <Section
          {...sec("platform")}
          title="A pipeline from raw bids to allotted shares."
          intro="Four engineers built a platform that takes an IPO from closing bell to listing, end to end."
        >
          <StepFlow steps={pipeline} />
          <p className="mt-14 max-w-[62ch] text-[15px] leading-[1.7] text-muted">
            Under the hood it runs as an event-driven batch pipeline on AWS. Operators work in a separate control plane,
            and investors get an isolated public read path.{" "}
            <span className="text-fg">My work touched every stage.</span>
          </p>
        </Section>

        <Section
          {...sec("role")}
          title={
            <>
              Six layers. <span className="text-fg/45">I worked in every one.</span>
            </>
          }
          intro="I led the engine at the heart of the product, built most of the surfaces around it, and wrote in five languages along the way."
        >
          <StatRow stats={stats} />
          <LayerList layers={layers} />
        </Section>

        <Section
          {...sec("journey")}
          title="Eight months, month by month."
          intro="How the work unfolded from the first commit to production hardening."
        >
          <Journey />
        </Section>

        <Section {...sec("decisions")} title="Five calls that shaped the work.">
          <Decisions stories={stories} />
        </Section>

        <Section {...sec("results")} title="Checked against a real IPO.">
          <Results lead={leadResult} items={results} />
        </Section>

        <Section {...sec("stack")} title="The right tool for each layer.">
          <StackList stack={stack} />
        </Section>

        <Section {...sec("reflection")} title="Where it stands.">
          <Reflection takeaway={takeaway} paragraphs={reflection} />
        </Section>
      </CaseStudyFrame>
    </>
  );
}
