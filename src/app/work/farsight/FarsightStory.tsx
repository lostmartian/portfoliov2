import type { CSSProperties } from "react";
import { BackToWork, NextCase } from "@/components/case/CaseNav";
import { FarsightCover } from "@/components/case/Covers";
import { CalibrationScene, ConstellationScene, FogScene, LensScene, PrinciplesScene } from "@/components/case/farsight/FarsightScenes";

/**
 * Farsight, as an observation log under a night sky. A short opener, then
 * five scroll-scrubbed observations.
 */

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function FarsightStory() {
  return (
    <article>
      {/* ============ NIGHT OPENER ============ */}
      <header data-nav="dark" className="bleed relative overflow-hidden bg-[#15141c] text-[#efe6d6]">
        <FarsightCover slice bare className="absolute inset-0 w-full h-full opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15141c] via-[#15141c]/80 to-transparent" aria-hidden="true" />
        <div className="relative w-full px-5 sm:px-8 lg:px-12 2xl:px-20 pt-10 pb-16 min-h-[calc(100svh-72px)] flex flex-col">
          <BackToWork className="rise text-[#efe6d6]" />
          <div className="mt-auto space-y-8 pt-20">
            <p className="rise label !text-[#efe6d6]/60" style={d(60)}>
              Observation log · Case <span className="deva normal-case tracking-normal text-[13px]">०२</span> · Oct 2024 → Jan 2026
            </p>
            <h1 className="rise text-[4.2rem] sm:text-[7.5rem] lg:text-[10rem] leading-[0.85]" style={d(120)}>
              Far<span className="serif text-[#e08a6b]">sight</span>
            </h1>
            <p className="rise font-display text-2xl sm:text-3xl leading-snug max-w-xl text-[#efe6d6]/90" style={d(200)}>
              Bringing an enterprise AI ecosystem into focus.
            </p>
          </div>
          <dl className="rise mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 text-[15px] border-t border-[#efe6d6]/25 pt-5" style={d(300)}>
            {[
              ["Client", "Omara Technologies"],
              ["My role", "Founding Full-Stack AI Engineer"],
              ["Built", "Governance portal · GT scoring · DocuNexus hub"],
              ["Stack", "Go · Python · Next.js · LangGraph · Neo4j · AWS"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label !text-night-muted mb-1.5">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 label !text-night-muted flex items-center gap-3 self-center">
            <span className="block h-8 w-px bg-[#efe6d6]/40 animate-pulse" aria-hidden="true" />
            Scroll to look closer
          </p>
        </div>
      </header>

      {/* ============ OBSERVATIONS ============ */}
      <FogScene />
      <LensScene />
      <ConstellationScene />
      <CalibrationScene />
      <PrinciplesScene />

      <NextCase current="farsight" />
    </article>
  );
}
