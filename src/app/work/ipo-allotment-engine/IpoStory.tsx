import type { CSSProperties } from "react";
import { BackToWork, NextCase } from "@/components/case/CaseNav";
import { IpoCover } from "@/components/case/Covers";
import { BellScene, DrawScene, LayersScene, PartiesScene, PipelineScene, ThroughputScene } from "@/components/case/ipo/IpoScenes";

/**
 * IPO Allotment Engine. A short case-file opener, then the story is told by
 * scrolling: pinned scenes that follow the settlement clock from T to T+3.
 */

const mono = { fontFamily: "var(--font-geist-mono)" };
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function IpoStory() {
  return (
    <article>
      {/* ============ OPENER ============ */}
      <header className="min-h-[calc(100svh-72px)] flex flex-col pt-10 pb-12">
        <BackToWork className="rise" />

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
          <div className="lg:col-span-6 space-y-8">
            <p className="rise label flex items-center gap-2" style={d(60)}>
              Case file <span className="deva normal-case tracking-normal text-[13px] text-accent">०१</span> · Mar 2026 → present
              <span className="pulse-dot ml-1 h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden="true" />
            </p>
            <h1 className="rise text-[3.4rem] sm:text-7xl lg:text-[6.8rem] leading-[0.9]" style={d(120)}>
              IPO Allotment <span className="serif text-accent">Engine</span>
            </h1>
            <p className="rise font-display text-2xl sm:text-3xl leading-snug max-w-xl text-foreground/85" style={d(200)}>
              Allot shares to millions of applicants overnight, and get every single one right.
            </p>
          </div>
          <div className="rise lg:col-span-6" style={d(260)}>
            <IpoCover bare className="block w-full h-auto border border-border" />
          </div>
        </div>

        <dl className="rise grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 border-t border-foreground/70 pt-5 text-[15px]" style={d(340)}>
          <div>
            <dt className="label mb-1.5">Client</dt>
            <dd>
              <a href="https://nichetechpl.com/" {...ext} className="ink-link">Niche Technologies</a>
              <span className="block text-[13px] text-muted">SEBI Category I RTA, via <a href="https://www.jrats.studio/" {...ext} className="ink-link">JRat&apos;s Studio</a></span>
            </dd>
          </div>
          <div>
            <dt className="label mb-1.5">My role</dt>
            <dd>Software Engineer (freelance)</dd>
          </div>
          <div>
            <dt className="label mb-1.5">Peak load</dt>
            <dd>10M+ applications</dd>
          </div>
          <div>
            <dt className="label mb-1.5">Stack</dt>
            <dd>Go · Python · Polars · Aurora · AWS</dd>
          </div>
        </dl>

        <p className="mt-10 label flex items-center gap-3 self-center">
          <span className="block h-8 w-px bg-foreground/40 animate-pulse" aria-hidden="true" />
          Scroll to follow one night
        </p>
      </header>

      {/* ============ THE STORY ============ */}
      <BellScene />
      <PartiesScene />
      <PipelineScene />
      <DrawScene />
      <ThroughputScene />
      <LayersScene />

      {/* ============ CLOSE ============ */}
      <section className="py-40 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <p className="lg:col-span-3 label pt-3" style={mono}>After T+3</p>
        <p className="lg:col-span-9 font-display text-4xl sm:text-6xl leading-[1.05] max-w-4xl">
          Zero error tolerance changes how you build. Every step deterministic, every change audited, every number{" "}
          <span className="serif text-accent">replayable.</span>
        </p>
      </section>

      <NextCase current="ipo-allotment-engine" />
    </article>
  );
}
