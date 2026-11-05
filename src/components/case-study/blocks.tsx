// Shared building blocks for case-study pages. Each page supplies its own content
// file and any one-off visuals; everything structural lives here.

import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { Icon, IconBadge } from "@/components/case-study/Icon";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { MobileToc, ReadingProgress, Toc, type TocItem } from "@/components/case-study/Toc";
import { EMAIL } from "@/lib/data";

export { container } from "@/lib/layout";
import { container } from "@/lib/layout";
import { reveal } from "@/lib/reveal";
// Small sentence-case label used instead of mono/uppercase eyebrows.
export const label = "text-[13px] font-medium text-muted";

/* ---------- Frame ---------- */

export function CaseStudyFrame({
  sections,
  hero,
  children,
  related = [],
}: {
  sections: TocItem[];
  hero: React.ReactNode;
  children: React.ReactNode;
  /** posts that tell the same story, linked under the last section */
  related?: readonly { title: string; href: string }[];
}) {
  return (
    <>
      <ReadingProgress />
      {hero}
      <MobileToc items={sections} />

      <div className={`${container} grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-20`}>
        <aside className="hidden pt-28 lg:block">
          <Toc items={sections} />
        </aside>
        <main className="min-w-0 divide-y divide-line">
          {children}
          {related.length > 0 && (
            <section className="py-16">
              <p className={label}>Further reading</p>
              <ul className="mt-5 space-y-3">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="group inline-flex items-start gap-3 text-xl font-medium leading-snug">
                      <span className="transition-opacity group-hover:opacity-60">{r.title}</span>
                      <ArrowRight aria-hidden className="mt-1 h-5 w-5 shrink-0 text-fg/40 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>

      <section className="graphite-fade relative">
        <div className={`${container} relative z-10`}>
          <div className="flex flex-col gap-10 border-t border-line py-28 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[16ch] font-display text-[2.75rem] leading-[1.08] sm:text-6xl">
              Building something that has to be exactly right? <span className="text-fg/40">Let&apos;s talk.</span>
            </h2>
            <div className="flex flex-wrap items-center gap-6 text-[15px]">
              <a
                href={`mailto:${EMAIL}?subject=Project%20enquiry`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-fg px-6 py-3.5 font-medium text-ink transition-colors hover:bg-fg/85"
              >
                Start a conversation
                <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </a>
              <Link href="/services" className="text-muted transition-colors hover:text-fg">
                How I work
              </Link>
              <Link href="/#work" className="text-muted transition-colors hover:text-fg">
                All work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className={container}>
        <div className="border-t border-line py-8 text-[13px] text-muted">© 2026 Sahil Gangurde · Pune</div>
      </footer>
    </>
  );
}

export function CaseStudyHero({
  eyebrow,
  title,
  summary,
  facts,
  visualLabel,
  visual,
}: {
  eyebrow: string;
  title: React.ReactNode;
  summary: string;
  facts: readonly (readonly [string, string])[];
  visualLabel?: string;
  visual?: React.ReactNode;
}) {
  // The hero is exactly one screen tall, never more: type scales with viewport height so it
  // fits short laptop screens, and the illustrative visual sits just below the fold.
  return (
    <>
      <header className="graphite-fade relative isolate flex h-svh flex-col">
        <nav className={`${container} relative z-10 flex w-full shrink-0 items-center justify-between py-6 text-sm`}>
          <Link href="/" className="font-medium tracking-tight">
            Sahil Gangurde
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/#work" className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
              <ArrowLeft className="h-[18px] w-[18px] transition-transform group-hover:-translate-x-0.5" strokeWidth={1.5} />
              All work
            </Link>
            <ThemeSwitcher />
          </div>
        </nav>

        <div
          className={`${container} relative z-10 grid min-h-0 w-full flex-1 items-center gap-12 ${
            visual ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-16" : ""
          }`}
        >
          <div>
            <p {...reveal(60)} className={label}>
              {eyebrow}
            </p>
            <h1
              {...reveal(140)}
              className="mt-[clamp(8px,1.8svh,24px)] max-w-4xl font-display leading-[1.02]"
              style={{
                ...reveal(140).style,
                fontSize: visual ? "clamp(2rem, min(7.2vw, 7.4svh), 4.5rem)" : "clamp(2rem, min(7.2vw, 8.6svh), 5.75rem)",
              }}
            >
              {title}
            </h1>
            <p
              {...reveal(240)}
              className="mt-[clamp(10px,2.2svh,28px)] max-w-[58ch] leading-[1.6] text-muted"
              style={{ ...reveal(240).style, fontSize: "clamp(14px, 2.1svh, 18px)" }}
            >
              {summary}
            </p>

            <dl {...reveal(320)} className="mt-[clamp(14px,3svh,48px)] grid grid-cols-2 gap-x-8 gap-y-4 border-t border-fg/10 pt-[clamp(10px,2.4svh,28px)]">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className={label}>{k}</dt>
                  <dd className="mt-1 text-[15px] font-medium leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Beside the text on wide screens; below the hero on narrow ones. */}
          {visual && (
            <div {...reveal(400)} className="@container hidden lg:block">
              {visualLabel && <p className={`${label} mb-8`}>{visualLabel}</p>}
              {visual}
            </div>
          )}
        </div>

        {/* Scroll cue: the hero fills the screen, so say there is more below. */}
        <div {...reveal(600)} className="relative z-10 flex shrink-0 justify-center pb-[clamp(10px,2.2svh,24px)] pt-[clamp(6px,1.2svh,12px)]">
          <a
            href="#after-hero"
            className="flex items-center gap-3 text-[13px] font-medium text-fg/60 transition-colors hover:text-fg"
          >
            Scroll to read
            <span aria-hidden className="relative h-5 w-px overflow-hidden bg-fg/20">
              <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-fg motion-reduce:animate-none" />
            </span>
          </a>
        </div>
      </header>
      <div id="after-hero" aria-hidden />

      {visual && (
        <div className={`${container} @container pb-8 pt-14 lg:hidden`}>
          {visualLabel && <p className={`${label} mb-10`}>{visualLabel}</p>}
          {visual}
        </div>
      )}
    </>
  );
}

export function Section({
  id,
  index,
  name,
  title,
  intro,
  children,
}: {
  id: string;
  index: number;
  name: string;
  title: React.ReactNode;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <div {...reveal()}>
        <p className={`flex items-center gap-3 ${label}`}>
          <span className="tabular text-fg">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden className="h-px w-8 bg-fg/20" />
          {name}
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-[2.5rem] leading-[1.08] sm:text-[3.25rem]">{title}</h2>
        {intro && <p className="mt-5 max-w-[60ch] text-lg leading-[1.7] text-muted">{intro}</p>}
      </div>
      <div {...reveal(120)} className="mt-14">
        {children}
      </div>
    </section>
  );
}

/* ---------- Content blocks ---------- */

export function Pressures({ items }: { items: readonly { icon: string; title: string; text: string }[] }) {
  return (
    <div className="grid gap-12 md:grid-cols-3">
      {items.map((p) => (
        <div key={p.title}>
          <IconBadge name={p.icon} size="lg" />
          <h3 className="mt-6 text-lg font-medium">{p.title}</h3>
          <p className="mt-2 text-[15px] leading-[1.7] text-muted">{p.text}</p>
        </div>
      ))}
    </div>
  );
}

export function Pullquote({ children }: { children: React.ReactNode }) {
  return (
    <figure className="max-w-3xl border-l-2 border-fg pl-8">
      <p className="font-display text-[1.75rem] leading-[1.35] sm:text-[2rem]">{children}</p>
    </figure>
  );
}

/** Horizontal chain of icon steps joined by chevrons; stacks on small screens. */
export function StepFlow({
  steps,
  columns = 6,
}: {
  steps: readonly { icon: string; step: string; text: string }[];
  columns?: 4 | 5 | 6;
}) {
  const cols = { 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" }[columns];
  return (
    <ol className={`grid grid-cols-1 gap-10 sm:grid-cols-3 lg:gap-0 ${cols}`}>
      {steps.map((p, i) => (
        <li key={p.step} className="lg:pr-5">
          <div className="flex items-center">
            <IconBadge name={p.icon} size="lg" />
            {i < steps.length - 1 && (
              <span aria-hidden className="ml-3 hidden flex-1 items-center text-fg/35 lg:flex">
                <span className="h-px flex-1 bg-current" />
                <ChevronRight className="-ml-2 h-5 w-5" strokeWidth={1.75} />
              </span>
            )}
          </div>
          <p className="tabular mt-5 text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-0.5 text-base font-medium">{p.step}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function StatRow({ stats }: { stats: readonly { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-3 gap-x-6 gap-y-8 border-y border-line py-10 sm:grid-cols-5 sm:gap-x-8">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse justify-end">
          <dt className={`${label} mt-3`}>{s.label}</dt>
          <dd className="tabular font-display text-4xl leading-none sm:text-5xl">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export type CaseLayer = {
  icon: string;
  name: string;
  role: string;
  impact: string;
  stack: readonly string[];
  points: readonly string[];
};

export function LayerList({ layers }: { layers: readonly CaseLayer[] }) {
  return (
    <div className="divide-y divide-line">
      {layers.map((l) => (
        <article key={l.name} className="grid gap-6 py-12 sm:grid-cols-[48px_1fr] sm:gap-8">
          <IconBadge name={l.icon} size="lg" />
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-medium tracking-tight">{l.name}</h3>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  l.role === "Contributed" ? "border-line text-muted" : "border-fg/70 text-fg"
                }`}
              >
                {l.role}
              </span>
            </div>
            <p className="mt-4 max-w-[34ch] font-display text-[1.625rem] leading-[1.3] sm:max-w-[44ch]">{l.impact}</p>
            <ul className="mt-7 grid gap-x-12 gap-y-3.5 md:grid-cols-2">
              {l.points.map((p) => (
                <li key={p} className="flex gap-3.5 text-[15px] leading-[1.65] text-muted">
                  <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-fg/50" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-7 flex flex-wrap gap-2">
              {l.stack.map((s) => (
                <li key={s} className="rounded-full bg-surface px-3 py-1 text-xs text-fg/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export type CaseStory = {
  tag: string;
  title: string;
  problem: string;
  decision: string;
  outcome: string;
  metric: { value: string; label: string };
};

export function Decisions({ stories }: { stories: readonly CaseStory[] }) {
  return (
    <div className="divide-y divide-line border-t border-line">
      {stories.map((s, i) => (
        <article key={s.title} className="py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div>
              <p className={label}>
                <span className="tabular text-fg">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2 text-fg/25">/</span>
                {s.tag}
              </p>
              <h3 className="mt-3 font-display text-[2rem] leading-[1.15]">{s.title}</h3>
            </div>
            <div className="shrink-0 sm:text-right">
              <p className="tabular font-display text-5xl leading-none">{s.metric.value}</p>
              <p className={`${label} mt-2`}>{s.metric.label}</p>
            </div>
          </div>
          <dl className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {(
              [
                ["problem", "The problem", s.problem],
                ["decision", "What I did", s.decision],
                ["outcome", "What happened", s.outcome],
              ] as const
            ).map(([icon, heading, text]) => (
              <div key={icon}>
                <dt className="flex items-center gap-2.5 text-[15px] font-medium">
                  <Icon name={icon} className="h-[18px] w-[18px] text-fg/70" />
                  {heading}
                </dt>
                <dd className="mt-3 text-[15px] leading-[1.7] text-muted">{text}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

export function Results({
  lead,
  items,
}: {
  lead: { value: string; label: string; note: string };
  items: readonly { value: string; label: string }[];
}) {
  return (
    <>
      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
        <p className="tabular font-display text-[7rem] leading-[0.85] sm:text-[10rem]">{lead.value}</p>
        <div className="max-w-[48ch]">
          <p className="text-xl leading-snug">{lead.label}</p>
          <p className="mt-4 text-[15px] leading-[1.7] text-muted">{lead.note}</p>
        </div>
      </div>
      <dl className="mt-16 grid gap-x-10 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((r) => (
          <div key={r.label} className="flex flex-col-reverse justify-end">
            <dt className="mt-3 text-sm leading-relaxed text-muted">{r.label}</dt>
            <dd className="tabular font-display text-4xl leading-none">{r.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function StackList({ stack }: { stack: readonly { group: string; items: readonly string[] }[] }) {
  return (
    <dl className="border-t border-line">
      {stack.map((s) => (
        <div key={s.group} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
          <dt className="text-[15px] font-medium">{s.group}</dt>
          <dd className="flex flex-wrap gap-2">
            {s.items.map((it) => (
              <span key={it} className="rounded-full bg-surface px-3 py-1 text-[13px] text-fg/80">
                {it}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Reflection({ takeaway, paragraphs }: { takeaway: string; paragraphs: readonly string[] }) {
  return (
    <>
      <blockquote className="max-w-[30ch] border-l-2 border-fg pl-8 font-display text-[2rem] leading-[1.25] sm:text-[2.5rem]">
        {takeaway}
      </blockquote>
      <div className="mt-10 max-w-[62ch] space-y-5 text-[17px] leading-[1.7] text-muted">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </>
  );
}
