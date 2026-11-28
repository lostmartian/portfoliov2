import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { Row, SmartLink } from "@/components/Row";
import { ArrowUpRight } from "lucide-react";
import { PastelIcon, type PastelIconName } from "@/components/PastelIcon";
import { ColourDot } from "@/components/Tint";
import { CtaCard } from "@/components/CtaCard";
import { palette, type Tint } from "@/lib/palette";
import { PageShell, label } from "@/components/PageShell";
import { GITHUB, beyond, elsewhere, facts, intro, now, openSource, path, principle, story } from "@/lib/about";
import { reveal } from "@/lib/reveal";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "About Sahil Gangurde (lostmartian): AI and backend engineer in Pune, founder of KerrShift and AgentDiff, IIIT Gwalior graduate. Founding engineer at Omara; fintech, AI and healthcare systems since.",
  path: "/about",
  type: "profile",
});

// Colour follows the work: timeline dots take the pair of the case study each role led to
// (Omara is Farsight's cyan, JRat's Studio IPO's cobalt, First500days AYUVA's green, KerrShift
// AgentDiff's violet); the rest borrow from the same palette.
const pathTints: Tint[] = [palette.indigo, palette.cyan, palette.violet, palette.cobalt, palette.green, palette.violet];
const beyondIcons: Record<string, PastelIconName> = {
  Writing: "writing",
  Teaching: "teaching",
  "The Latent Chronicle": "newsletter",
  "Off the clock": "coffee",
};
// GitHub-style language dots
const langColour: Record<string, string> = { Python: "#3572A5", TypeScript: "#3178c6", Go: "#00ADD8", Rust: "#dea584", JavaScript: "#f1e05a" };

export default function AboutPage() {
  return (
    <PageShell
      active="/about"
      eyebrow="About"
      title={
        <>
          Hi, I&apos;m Sahil. <span className="accent-text">I build systems that have to hold.</span>
        </>
      }
      intro={<p>{intro}</p>}
    >
      {/* Quick facts */}
      <dl {...reveal(340)} className="grid grid-cols-2 gap-x-10 gap-y-6 pb-16 lg:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt className={label}>{k}</dt>
            <dd className="mt-1.5 text-[15px] font-medium leading-snug">{v}</dd>
          </div>
        ))}
      </dl>

      <Row name="The short version">
        <div className="max-w-[62ch] space-y-5 text-[17px] leading-[1.75] text-fg/80">
          {story.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <p style={{ borderImage: `linear-gradient(${palette.cobalt.cool}, ${palette.cobalt.warm}) 1` }} className="mt-10 max-w-[30ch] border-l-[3px] pl-6 font-display text-2xl leading-snug sm:text-[1.75rem]">
          {principle}
        </p>
      </Row>

      <Row name="The path so far">
        <ol className="relative">
          <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-fg/15" />
          {path.map((p, i) => (
            <li key={p.title} className="relative pb-10 pl-9 last:pb-0">
              <ColourDot
                tint={pathTints[i % pathTints.length]}
                className={`absolute left-0 top-[7px] h-[11px] w-[11px] ${p.current ? "ring-[5px] ring-fg/10" : "ring-[3px] ring-ink"}`}
              />
              <p className="tabular text-sm text-muted">{p.when}</p>
              <p className="mt-1 text-lg font-medium leading-snug">{p.title}</p>
              <p className="mt-1.5 max-w-[60ch] text-[15px] leading-[1.7] text-muted">{p.detail}</p>
              {p.link && (
                <p className="mt-2 text-sm">
                  <SmartLink href={p.link.href}>{p.link.label}</SmartLink>
                </p>
              )}
            </li>
          ))}
        </ol>
      </Row>

      <Row name="Now" note={`Updated ${now.updated}`}>
        <dl className="space-y-6">
          {now.items.map((n) => (
            <div key={n.label} className="grid gap-1 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6">
              <dt className="text-[15px] font-medium">{n.label}</dt>
              <dd className="max-w-[60ch] text-[15px] leading-[1.7] text-muted">{n.text}</dd>
            </div>
          ))}
        </dl>
      </Row>

      <Row name="Beyond the code">
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {beyond.map((b) => (
            <div key={b.title}>
              <h3 className="flex items-center gap-3 text-lg font-medium">
                {beyondIcons[b.title] && <PastelIcon name={beyondIcons[b.title]} size={36} />}
                {b.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.7] text-muted">{b.text}</p>
              {b.link && (
                <p className="mt-3 text-sm">
                  <SmartLink href={b.link.href}>{b.link.label}</SmartLink>
                </p>
              )}
            </div>
          ))}
        </div>
      </Row>

      <Row name="Open source" note="Selected repositories">
        <ul className="divide-y divide-line border-y border-line">
          {openSource.map((r) => (
            <li key={r.name}>
              <a href={r.href} className="group -mx-3 flex items-start justify-between gap-6 rounded-lg px-3 py-5 transition-colors hover:bg-fg/[0.03]">
                <span>
                  <span className="flex items-baseline gap-3">
                    <span className="text-lg font-medium">{r.name}</span>
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-muted">
                      <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: langColour[r.lang] ?? "var(--muted)" }} />
                      {r.lang}
                    </span>
                  </span>
                  <span className="mt-1 block max-w-[60ch] text-[15px] leading-[1.7] text-muted">{r.text}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="mt-1.5 h-4 w-4 shrink-0 text-fg/65 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  strokeWidth={1.75}
                />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <SmartLink href={GITHUB}>All 38 repositories on GitHub</SmartLink>
        </p>
      </Row>

      <div className="border-t border-line pt-16 sm:pt-20">
        <CtaCard
          tint={palette.cobalt}
          title="Building something that has to hold?"
          accent="Let's talk."
          subject="Hello"
          links={elsewhere}
        />
      </div>
    </PageShell>
  );
}
