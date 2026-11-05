import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { Row, SmartLink } from "@/components/Row";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageShell, label } from "@/components/PageShell";
import { CopyEmail } from "@/components/CopyEmail";
import { GITHUB, beyond, elsewhere, facts, intro, now, openSource, path, principle, story } from "@/lib/about";
import { EMAIL } from "@/lib/data";
import { reveal } from "@/lib/reveal";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "About Sahil Gangurde (lostmartian): AI and backend engineer in Pune, founder of KerrShift and AgentDiff, IIIT Gwalior graduate. Founding engineer at Omara; fintech, AI and healthcare systems since.",
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  return (
    <PageShell
      active="/about"
      eyebrow="About"
      title={
        <>
          Hi, I&apos;m Sahil. <span className="text-fg/40">I build systems that have to hold.</span>
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
        <p className="mt-10 max-w-[30ch] border-l-2 border-fg pl-6 font-display text-2xl leading-snug sm:text-[1.75rem]">
          {principle}
        </p>
      </Row>

      <Row name="The path so far">
        <ol className="relative">
          <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-fg/15" />
          {path.map((p) => (
            <li key={p.title} className="relative pb-10 pl-9 last:pb-0">
              <span
                aria-hidden
                className={`absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full ${
                  p.current ? "bg-fg ring-[5px] ring-fg/10" : "border-[1.5px] border-fg/60 bg-ink"
                }`}
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
              <h3 className="text-lg font-medium">{b.title}</h3>
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
                    <span className="text-[13px] text-muted">{r.lang}</span>
                  </span>
                  <span className="mt-1 block max-w-[60ch] text-[15px] leading-[1.7] text-muted">{r.text}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="mt-1.5 h-4 w-4 shrink-0 text-fg/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
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

      <Row name="Get in touch">
        <p className="max-w-[24ch] font-display text-3xl leading-tight sm:text-4xl">
          Building something that has to hold? <span className="text-fg/40">Let&apos;s talk.</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6 text-[15px]">
          <a href={`mailto:${EMAIL}?subject=Hello`} className="rounded-full bg-fg px-5 py-2.5 font-medium text-ink transition-colors hover:bg-fg/85">
            Say hello
          </a>
          <CopyEmail className="text-muted transition-colors hover:text-fg" />
        </div>
        <p className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {elsewhere.map((l) => (
            <SmartLink key={l.href} href={l.href}>
              {l.label}
            </SmartLink>
          ))}
        </p>
      </Row>
    </PageShell>
  );
}
