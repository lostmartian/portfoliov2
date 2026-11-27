import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactPill } from "@/components/ContactPill";
import { JsonLd } from "@/components/JsonLd";
import { Row, SmartLink } from "@/components/Row";
import { SiteNav } from "@/components/SiteNav";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { WorkBento } from "@/components/WorkBento";
import { facts, intro, story } from "@/lib/about";
import { socials } from "@/lib/data";
import { container } from "@/lib/layout";
import { formatDate, posts, writeups } from "@/lib/posts";
import { reveal } from "@/lib/reveal";
import { homeGraph } from "@/lib/schema";
import { duration, videos, watch } from "@/lib/videos";

// The homepage reads top to bottom: a short hello, the work, a bit about me, then everything
// else (writing, videos, services) and a way to get in touch. Colour lives only in the work
// cards; everything around them stays quiet.

const YOUTUBE = socials.find((s) => s.label === "YouTube")!.href;

// The portrait is public/sahil.jpg. Until that file exists, a monogram stands in.
const PHOTO = "/sahil.jpg";
const hasPhoto = existsSync(join(process.cwd(), "public", PHOTO));

const latestWriting = [...posts, ...writeups].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
const latestVideos = [...videos].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** A quiet list row: title on the left, a small note on the right. Rows rest slightly soft and
 *  come up to full strength on hover. */
function ListRow({ href, title, note, external = false }: { href: string; title: string; note: string; external?: boolean }) {
  const inner = (
    <>
      <span className="min-w-0 text-[16px] font-medium leading-snug text-fg/70 transition-colors duration-300 group-hover:text-fg">{title}</span>
      <span className="tabular shrink-0 text-[13px] text-muted transition-colors duration-300 group-hover:text-fg/80">{note}</span>
    </>
  );
  const cls = "group flex items-baseline justify-between gap-6 border-b border-line py-4";
  return (
    <li>
      {external ? (
        <a href={href} className={cls}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </li>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph} />

      <div className="graphite-fade relative isolate">
        <div aria-hidden className="spotlight pointer-events-none absolute inset-0 -z-10" />

        {/* Top bar */}
        <header className={`${container} relative z-30 flex items-center justify-between gap-3 py-6 text-sm sm:gap-6`}>
          <span className="inline-flex items-center gap-2.5 text-[13px] font-medium text-fg/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="max-sm:sr-only">Available for work</span>
          </span>
          <div className="flex items-center gap-1 sm:gap-5">
            <SiteNav active="/" />
            <ThemeSwitcher />
          </div>
        </header>

        {/* Hello */}
        <section className={`${container} relative z-10 pb-12 pt-14 sm:pb-16 sm:pt-24`}>
          <h1
            {...reveal(60)}
            className="group/hi max-w-[24ch] font-display text-[2.5rem] leading-[1.04] tracking-[-0.04em] sm:text-[3.5rem] lg:text-[4.25rem]"
          >
            {/* waves once after the page loads, and again on hover (globals.css) */}
            Hi{" "}
            <span role="img" aria-label="waving hand" className="wave">
              👋
            </span>
            , I&apos;m Sahil Gangurde.
          </h1>
          <p {...reveal(140)} className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-muted sm:text-[19px]">
            Backend and AI engineer in Pune. I build software that has to be right: share allotments, ground-truth data and AI
            that people trust.
          </p>
          <div {...reveal(220)} className="mt-8">
            <ContactPill />
          </div>
        </section>
      </div>

      <main className={container}>
        {/* Work first */}
        <section aria-labelledby="work-heading" className="pb-16 sm:pb-20">
          <h2 id="work-heading" {...reveal(40)} className="mb-5 text-[15px] font-medium">
            Selected work
          </h2>
          <WorkBento />
        </section>

        {/* About */}
        <Row name="About" note="Engineer, Pune">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            {hasPhoto && (
              <Image
                src={PHOTO}
                alt="Sahil Gangurde"
                width={320}
                height={320}
                className="h-28 w-28 shrink-0 rounded-2xl object-cover ring-1 ring-line sm:h-40 sm:w-40"
              />
            )}
            <div className="min-w-0 max-w-[62ch]">
              <p className="text-[19px] leading-[1.55] text-fg sm:text-[21px]">{intro}</p>
              {story.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 text-[16px] leading-[1.7] text-muted">
                  {p}
                </p>
              ))}
              <p className="mt-5 text-[16px] leading-[1.7] text-muted">
                I also post technical breakdowns on{" "}
                <a href={YOUTUBE} className="font-semibold text-fg transition-opacity hover:opacity-60">
                  YouTube
                </a>
                .
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[13px] text-muted">{k}</dt>
                    <dd className="mt-1 text-[14px] font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <SmartLink href="/about">More about me</SmartLink>
              </div>
            </div>
          </div>
        </Row>

        {/* Everything else */}
        <Row name="Writing" note="Blog posts and writeups">
          <ul className="-mt-4">
            {latestWriting.map((p) => (
              <ListRow key={p.href} href={p.href} title={p.title} note={formatDate(p.date)} />
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <SmartLink href="/blogs">All posts</SmartLink>
            <SmartLink href="/writeups">All writeups</SmartLink>
          </div>
        </Row>

        <Row name="Videos" note="Technical breakdowns">
          <ul className="-mt-4">
            {latestVideos.map((v) => (
              <ListRow
                key={v.id}
                href={watch(v.id)}
                external
                title={v.title}
                note={`${date.format(new Date(v.date))} · ${duration(v.seconds)}`}
              />
            ))}
          </ul>
          <div className="mt-6">
            <SmartLink href="/videos">All videos</SmartLink>
          </div>
        </Row>

        <Row name="Services" note="Work with me">
          <p className="max-w-[60ch] text-[17px] leading-[1.6]">
            AI and backend engineering, end to end: LLM systems, data platforms, fintech and regulated software, and developer
            tools. From architecture to launch.
          </p>
          <div className="mt-6">
            <SmartLink href="/services">How I can help</SmartLink>
          </div>
        </Row>

        {/* Get in touch */}
        <section className="border-t border-line py-20 sm:py-28">
          <h2 {...reveal()} className="max-w-[18ch] font-display text-[2rem] leading-[1.08] tracking-[-0.035em] sm:text-[2.75rem]">
            Have something that has to be right?
          </h2>
          <div {...reveal(120)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ContactPill />
            <Link
              href="/services"
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-muted transition-colors hover:text-fg"
            >
              See services
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
            </Link>
          </div>
        </section>
      </main>

      <footer className={container}>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-6 text-[13px] text-muted">
          <span>© 2026 Sahil Gangurde · Pune</span>
          <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-5 gap-y-1">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="transition-colors hover:text-fg">
                {s.label.replace(" / Twitter", "")}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
