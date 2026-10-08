import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { devaNum } from "@/components/ui/deva";
import { CaseCover } from "./Covers";

/** Each case keeps the palette of its own story: the IPO register is paper, Farsight is night sky. */
const THEMES: Record<string, { card: string; muted: string; label: string; rule: string; accent: string; chip: string; ruled?: boolean }> = {
  "ipo-allotment-engine": {
    card: "bg-card-bg text-foreground",
    muted: "text-muted",
    label: "!text-muted",
    rule: "border-foreground/15",
    accent: "text-accent",
    chip: "border-foreground/20",
    ruled: true,
  },
  agentdiff: {
    card: "bg-card-bg text-foreground",
    muted: "text-muted",
    label: "!text-muted",
    rule: "border-foreground/15",
    accent: "text-accent",
    chip: "border-foreground/20",
  },
  farsight: {
    card: "bg-[#15141c] text-[#efe6d6]",
    muted: "text-[#efe6d6]/60",
    label: "!text-night-muted",
    rule: "border-[#efe6d6]/15",
    accent: "text-[#e08a6b]",
    chip: "border-[#efe6d6]/20",
  },
};

const BEATS = [
  { key: "problem", mr: "प्रश्न", label: "The problem" },
  { key: "approach", mr: "मार्ग", label: "What I built" },
  { key: "outcome", mr: "फळ", label: "What it changed" },
] as const;

/**
 * Case studies as a stack of story cards: each one pins as you scroll and the
 * next slides over it, like turning to the next chapter.
 */
export default function CaseStack({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-10 pb-[10vh]">
      {projects.map((p, i) => {
        const t = THEMES[p.slug] ?? THEMES["ipo-allotment-engine"];
        const s = p.story;
        return (
          <article
            key={p.slug}
            className="lg:sticky"
            style={{ top: `${96 + i * 28}px`, zIndex: i + 1 }}
          >
            <Link
              href={`/work/${p.slug}`}
              className={`group relative block overflow-hidden border border-foreground/10 shadow-[0_30px_60px_-40px_rgba(40,20,10,0.5)] ${t.card}`}
              style={
                t.ruled
                  ? { backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 27px, color-mix(in srgb, var(--accent) 9%, transparent) 27px 28px)" }
                  : p.slug === "agentdiff"
                    ? { backgroundImage: "linear-gradient(to right, color-mix(in srgb, var(--leaf) 14%, transparent) 0 6px, transparent 6px)" }
                    : undefined
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col gap-10">
                  <div className="flex items-center justify-between gap-4">
                    <p className={`label ${t.label}`}>
                      Case <span className="deva normal-case tracking-normal text-sm">{devaNum(i + 1)}</span> · {p.duration}
                    </p>
                    <span className={`grid place-items-center h-11 w-11 rounded-full border ${t.chip} transition-all duration-500 group-hover:rotate-45 group-hover:bg-current`}>
                      <ArrowUpRight className="w-4 h-4 transition-colors group-hover:text-accent" />
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-5xl sm:text-6xl xl:text-7xl leading-[0.95]">{p.title}</h2>
                    {s && (
                      <p className={`text-[15px] ${t.muted}`}>
                        For <span className={`${t.accent}`}>{s.client}</span>
                        <span className="opacity-70"> · {s.clientNote}</span>
                        <br />
                        As {s.role}
                      </p>
                    )}
                  </div>

                  {s && (
                    <ol className={`border-t ${t.rule}`}>
                      {BEATS.map((b) => (
                        <li key={b.key} className={`grid grid-cols-[88px_1fr] gap-4 py-4 border-b ${t.rule}`}>
                          <span className="pt-0.5">
                            <span className={`deva block text-lg leading-none ${t.accent}`}>{b.mr}</span>
                            <span className={`label !text-[10px] ${t.label}`}>{b.label}</span>
                          </span>
                          <span className="text-[15px] leading-relaxed opacity-90">{s[b.key]}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  <span className="inline-flex items-center gap-2 text-[15px]">
                    <span className="link-u">Read the full story</span>
                    <ArrowUpRight className="nudge w-4 h-4" />
                  </span>
                </div>

                <div className="lg:col-span-7 flex items-center overflow-hidden lg:border-l border-foreground/10">
                  <CaseCover slug={p.slug} bare className="block w-full h-auto transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
