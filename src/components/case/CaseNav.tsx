import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { CaseCover } from "./Covers";

export function BackToWork({ className = "" }: { className?: string }) {
  return (
    <Link href="/work" className={`group inline-flex items-center gap-2 text-sm ${className}`}>
      <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />
      <span className="link-u">All work</span>
    </Link>
  );
}

/** Footer card pointing to the next case study, using that case's own cover. */
export function NextCase({ current }: { current: string }) {
  const i = projects.findIndex((p) => p.slug === current);
  const next = projects[(i + 1) % projects.length];
  if (!next || next.slug === current) return null;
  return (
    <section className="mt-40 border-t border-border pt-10">
      <p className="label mb-8">Next story</p>
      <Link href={`/work/${next.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-5xl sm:text-7xl leading-[0.95] transition-colors duration-500 group-hover:text-accent">{next.title}</h2>
          {next.story && <p className="text-muted text-lg leading-relaxed max-w-md">{next.story.problem}</p>}
          <span className="inline-flex items-center gap-2 text-[15px]">
            <span className="link-u">Read it</span>
            <ArrowUpRight className="nudge w-4 h-4" />
          </span>
        </div>
        <div className="lg:col-span-7 overflow-hidden border border-border">
          <CaseCover slug={next.slug} animate={false} className="block w-full h-auto transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
        </div>
      </Link>
    </section>
  );
}
