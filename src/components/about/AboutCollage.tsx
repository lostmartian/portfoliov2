import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import LocalTime from "@/components/ui/LocalTime";
import { EDUCATION } from "@/config/about";

/**
 * A pinboard of me: real photos printed on paper, cards and notes held with
 * washi tape. Prints stay paper-coloured in both themes (they're objects on the
 * table). Every piece straightens and lifts on hover.
 */

function Tape({ tone = "haldi", className = "" }: { tone?: "haldi" | "accent" | "leaf"; className?: string }) {
  const bg = { haldi: "bg-haldi/45", accent: "bg-accent/35", leaf: "bg-leaf/35" }[tone];
  return <span className={`absolute h-6 w-20 ${bg} backdrop-blur-[1px] ${className}`} aria-hidden="true" />;
}

function Card({ r, className = "", children }: { r: number; className?: string; children: ReactNode }) {
  return (
    <div className={`collage-card ${className}`} style={{ "--r": `${r}deg` } as CSSProperties}>
      {children}
    </div>
  );
}

const PRINT = "bg-[#f7f1e6] text-[#2b2420] p-2.5 pb-3 shadow-[0_18px_30px_-18px_rgba(40,20,10,0.45)] border border-black/5";

export default function AboutCollage() {
  const edu = EDUCATION[0];
  return (
    <div className="relative md:max-w-[600px] xl:ml-auto">
      {/* Desktop: overlapping board. Mobile: a tidy two-column stack. */}
      <div className="collage-board grid grid-cols-2 gap-5 md:block md:relative">
        <Card r={-4} className="col-span-2 md:absolute md:left-0 md:top-6 md:w-[56%] md:z-[2]">
          <figure className={PRINT}>
            <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image src="/me/profile-photo.png" alt="Sahil on a beach" fill sizes="(max-width: 768px) 90vw, 360px" className="object-cover object-[50%_40%]" />
            </div>
            <figcaption className="pt-2.5 px-1 font-display italic text-[17px] leading-snug">Chasing sunsets, debugging threads.</figcaption>
          </figure>
        </Card>

        <Card r={5} className="md:absolute md:right-0 md:top-0 md:w-[36%] md:z-[3]">
          <figure className={PRINT}>
            <Tape tone="accent" className="-top-3 right-4 rotate-6" />
            <div className="relative aspect-square overflow-hidden bg-white">
              <Image src="/me/headshot.jpg" alt="Sahil, a black-and-white portrait" fill sizes="(max-width: 768px) 45vw, 240px" className="object-cover mix-blend-multiply" />
            </div>
            <figcaption className="pt-2.5 px-1 font-display italic text-[16px]">The official one.</figcaption>
          </figure>
        </Card>

        <Card r={-3} className="md:absolute md:right-[3%] md:top-[53%] md:w-[44%] md:z-[5]">
          <div className="relative bg-card-bg border border-border p-5 shadow-[0_18px_30px_-20px_rgba(40,20,10,0.4)]">
            <Tape tone="leaf" className="-top-3 left-6 -rotate-6" />
            <p className="label mb-3">Currently</p>
            <ul className="space-y-2 text-[15px] leading-snug">
              <li>
                Building <a href="https://agentdiff.app/" target="_blank" rel="noopener noreferrer" className="ink-link">AgentDiff</a>
              </li>
              <li>Freelancing for First500days &amp; JRat&apos;s Studio</li>
              <li>
                Writing <a href="https://latentchronicle.online/" target="_blank" rel="noopener noreferrer" className="ink-link">The Latent Chronicle</a>
              </li>
            </ul>
            <Link href="/now" className="mt-3 inline-block text-[13px] text-muted link-u">More on /now</Link>
          </div>
        </Card>

        <Card r={2} className="md:absolute md:left-[2%] md:top-[61%] md:w-[48%] md:z-[4]">
          <div className="relative bg-[#efe3cf] text-[#2b2420] border border-[#2b2420]/20 shadow-[0_18px_30px_-20px_rgba(40,20,10,0.4)]">
            <Tape className="-top-3 right-6 rotate-3" />
            <div className="flex items-center justify-between border-b border-dashed border-[#2b2420]/30 px-4 py-2 text-[10px] tracking-[0.2em] uppercase">
              <span>Admit card</span>
              <span>{edu.years.replace(/\s/g, "")}</span>
            </div>
            <div className="px-4 py-3.5">
              <p className="font-display text-2xl leading-none">{edu.school}</p>
              <p className="mt-1.5 text-[13px] leading-snug text-[#5b5047]">{edu.degree}</p>
            </div>
          </div>
        </Card>

        <Card r={-2} className="md:absolute md:left-[40%] md:top-[85%] md:w-[30%] md:z-[6]">
          <div className="relative bg-accent text-accent-foreground p-4 shadow-[0_18px_30px_-20px_rgba(40,20,10,0.45)]">
            <p className="deva text-2xl leading-none">पुणे</p>
            <p className="mt-2 text-[13px]"><LocalTime /></p>
          </div>
        </Card>

        <Card r={4} className="md:absolute md:right-0 md:top-[86%] md:w-[26%] md:z-[6]">
          <div className="relative bg-card-bg border border-border p-4 shadow-[0_18px_30px_-20px_rgba(40,20,10,0.4)]">
            <Tape tone="haldi" className="-top-3 left-1/2 -translate-x-1/2 rotate-2 !w-14" />
            <svg viewBox="0 0 80 34" className="w-full h-auto text-accent" aria-hidden="true">
              <path d="M8 26 q-2 -14 12 -16 q12 -1 13 10 q0 8 -9 8 q-5 0 -5 4 q0 3 -6 2 q-6 -1 -5 -8z" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="14" cy="17" r="2" fill="var(--haldi)" /><circle cx="21" cy="14" r="2" fill="var(--leaf)" /><circle cx="27" cy="18" r="2" fill="currentColor" />
              <path d="M48 22 q-2 10 13 11 q15 -1 13 -11 z" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M46 22 h30" stroke="currentColor" strokeWidth="1.3" />
              <path d="M56 17 q-3 -4 0 -8 M64 17 q-3 -4 0 -8" fill="none" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            <p className="mt-2 text-[13px] leading-snug">
              Paint &amp; cook
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
