import { ArrowRight } from "lucide-react";
import { CopyEmail } from "@/components/CopyEmail";
import { JsonLd } from "@/components/JsonLd";
import { SiteNav } from "@/components/SiteNav";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { WorkIndex } from "@/components/WorkIndex";
import { highlights } from "@/lib/case-studies";
import { EMAIL, socials } from "@/lib/data";
import { container } from "@/lib/layout";
import { reveal } from "@/lib/reveal";
import { homeGraph } from "@/lib/schema";

// The homepage is a single screen that never scrolls. Sizes scale with viewport height
// (svh) and width so the same composition fits a 1920×1080 monitor and a 360×640 phone.

const label = "text-[13px] font-medium text-muted";
const YOUTUBE = socials.find((s) => s.label === "YouTube")!.href;

export default function Home() {
  return (
    <div className="graphite-fade relative isolate flex h-svh flex-col overflow-hidden">
      <JsonLd data={homeGraph} />
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0 -z-10" />

      {/* Top bar */}
      <header className={`${container} relative z-10 flex shrink-0 items-center justify-between gap-3 py-[clamp(14px,2.8svh,24px)] text-sm sm:gap-6`}>
        <span className="inline-flex items-center gap-2.5 text-[13px] font-medium text-fg/80">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="max-sm:sr-only">
            Available<span className="max-sm:hidden"> for work</span>
          </span>
        </span>
        <div className="flex items-center gap-3 sm:gap-5">
          <SiteNav active="/" />
          <ThemeSwitcher />
        </div>
      </header>

      {/* Statement and work index */}
      <main
        className={`${container} relative z-10 grid min-h-0 flex-1 content-center gap-[clamp(24px,5svh,56px)] max-sm:gap-[clamp(16px,3.5svh,32px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-[clamp(48px,7vw,128px)]`}
      >
        <section>
          <h1
            {...reveal(60)}
            className="max-w-[15ch] font-display leading-[1.03] tracking-[-0.04em]"
            style={{ ...reveal(60).style, fontSize: "clamp(2.1rem, min(4.6vw, 7.4svh), 4.75rem)" }}
          >
            I&apos;m Sahil.
          </h1>
          <p
            {...reveal(140)}
            className="mt-[clamp(10px,2.2svh,22px)] max-w-[46ch] leading-[1.55] text-muted"
            style={{ ...reveal(140).style, fontSize: "clamp(15px, 2.1svh, 18px)" }}
          >
            Backend and AI engineer in Pune.{" "}
            {/* the shortest phones keep only the first sentence */}
            <span className="max-sm:[@media(max-height:700px)]:hidden">
              I&apos;ve built IPO allotment for a stock registrar, ground-truth tools for AI teams and the AI inside a UK
              health app. On the side, I&apos;m compiling Next.js to Rust. I also post technical breakdowns on{" "}
              <a href={YOUTUBE} className="font-semibold text-fg transition-opacity hover:opacity-60">
                YouTube
              </a>
              .
            </span>
          </p>

          <div {...reveal(220)} className="mt-[clamp(18px,4svh,36px)] flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${EMAIL}?subject=Project%20enquiry`}
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-[15px] font-medium text-ink transition-transform active:scale-[0.98] max-sm:px-4 max-sm:text-[14px]"
            >
              Say hello
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} />
            </a>
            <CopyEmail
              withIcon
              className="inline-flex items-center gap-2 text-[15px] font-medium text-muted transition-colors hover:text-fg max-sm:text-[14px] [@media(max-width:340px)]:hidden"
            />
          </div>

          {/* Facts about Sahil */}
          <dl
            {...reveal(300)}
            className="mt-[clamp(28px,6svh,64px)] hidden max-w-md grid-cols-3 gap-6 border-t border-fg/10 pt-[clamp(14px,2.4svh,22px)] lg:grid [@media(max-height:759px)]:hidden"
          >
            {highlights.map((h) => (
              <div key={h.label} className="relative flex flex-col-reverse justify-end">
                <dt className="mt-1.5 text-[13px] leading-snug text-muted">
                  {h.href ? (
                    // the whole cell is the link; the stretched ::after covers the number too
                    <a href={h.href} className="transition-colors after:absolute after:inset-0 hover:text-fg">
                      {h.label}
                    </a>
                  ) : (
                    h.label
                  )}
                </dt>
                <dd className="tabular font-display text-[clamp(1.5rem,3.3svh,2rem)] leading-none tracking-[-0.035em]">{h.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="work-heading" {...reveal(320)}>
          <p id="work-heading" className={`${label} mb-[clamp(8px,1.6svh,14px)]`}>
            Things I&apos;ve built
          </p>
          <WorkIndex />
        </section>
      </main>

      {/* One quiet line under a hairline, both at container width like every other page */}
      <footer {...reveal(400)} className={`${container} relative z-10 shrink-0`}>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-line py-[clamp(12px,2.4svh,22px)] text-[13px] text-muted">
          <span className="max-sm:hidden">© 2026 Sahil Gangurde</span>
          <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-5 gap-y-1 max-sm:w-full max-sm:justify-between">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="transition-colors hover:text-fg">
                {s.label.replace(" / Twitter", "")}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
