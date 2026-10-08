import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import PageHeader, { PageBody } from "@/components/ui/PageHeader";
import { devaNum } from "@/components/ui/deva";
import LocalTime from "@/components/ui/LocalTime";
import { Figure, Ground, Tree } from "@/components/warli/Warli";
import experience from "@/data/experience.json";
import readlist from "@/data/readlist.json";
import { projects } from "@/data/projects";
import { getBlogPosts } from "@/lib/blogs";
import { getYouTubeData } from "@/lib/youtube";
import { UPCOMING_TOPICS } from "@/data/video-chapters";
import { NOW } from "@/data/now";

export const metadata: Metadata = {
  title: "Now | Sahil Gangurde",
  description: "What Sahil Gangurde is building, writing, reading and making right now.",
  alternates: { canonical: "https://lostmartian.in/now" },
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Row({ n, verb, children }: { n: number; verb: string; children: ReactNode }) {
  return (
    <li className="group grid grid-cols-[40px_1fr] md:grid-cols-[40px_220px_1fr] gap-x-6 gap-y-2 py-8 border-b border-border">
      <span className="deva text-accent text-2xl leading-none pt-1">{devaNum(n)}</span>
      <p className="font-display italic text-3xl leading-none text-foreground/80 transition-colors group-hover:text-accent">{verb}</p>
      <div className="col-start-2 md:col-start-3 text-[17px] leading-relaxed space-y-2">{children}</div>
    </li>
  );
}

function Go({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls = "group inline-flex items-center gap-1 text-[14px] text-muted hover:text-accent";
  const inner = (
    <>
      <span className="link-u">{children}</span>
      <ArrowUpRight className="nudge w-3.5 h-3.5" />
    </>
  );
  return external ? <a href={href} {...ext} className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}

export default function NowPage() {
  const agentdiff = projects.find((p) => p.slug === "agentdiff");
  const current = (experience as { company: string; role: string; summary: string; current?: boolean; link?: string }[]).filter((e) => e.current);
  const post = getBlogPosts().find((p) => !p.hidden);
  const { videos } = getYouTubeData();
  const video = videos[0];
  const reading = (readlist as { date: string; title: string; link: string; type: string }[]).slice(0, 2);
  const updated = new Date(NOW.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  let n = 0;

  return (
    <div>
      <PageHeader mr="सध्या" label="Now" title={<>What I&apos;m doing <span className="serif text-accent">now.</span></>}>
        A snapshot of the month, the way a /now page should be. Updated {updated}, from Pune (<LocalTime />).
      </PageHeader>

      <PageBody>
        <svg viewBox="0 0 900 120" className="w-full h-auto text-accent -mb-2" aria-hidden="true">
          <Tree x={60} y={112} h={96} branches={7} />
          <Figure x={300} y={112} s={1.5} pose="walk" delay={300} />
          <Figure x={520} y={112} s={1.5} pose="hold" delay={450} flip />
          <Tree x={840} y={112} h={70} branches={5} delay={200} />
          <Ground y={112} w={900} />
        </svg>

        {NOW.note && <p className="font-display text-3xl leading-snug max-w-3xl">{NOW.note}</p>}

        <ol className="border-t border-foreground/70">
          {agentdiff?.story && (
            <Row n={++n} verb="Building">
              <p>
                <span className="font-display text-2xl">AgentDiff</span>, now in pre-release.{" "}
                <span className="text-muted">{agentdiff.story.problem}</span>
              </p>
              <p className="flex flex-wrap gap-x-5"><Go href="/work/agentdiff">The story</Go><Go href="https://agentdiff.app" external>agentdiff.app</Go></p>
            </Row>
          )}
          {current.length > 0 && (
            <Row n={++n} verb="Working on">
              {current.map((c) => (
                <p key={c.company}>
                  <span className="font-display text-2xl">{c.company}</span>{" "}
                  <span className="text-muted">· {c.role.replace(/,\s*Freelance/i, " (freelance)")}. {c.summary.split(". ")[0]}.</span>
                </p>
              ))}
            </Row>
          )}
          {post && (
            <Row n={++n} verb="Writing">
              <p>
                Latest: <span className="font-display text-2xl">{post.title}</span>
              </p>
              <p><Go href={`/blogs/${post.slug}`}>Read it</Go></p>
            </Row>
          )}
          {video && (
            <Row n={++n} verb="Recording">
              <p>
                Out now: <span className="font-display text-2xl">{video.title}</span>
              </p>
              <p className="text-muted">Next up: {UPCOMING_TOPICS.join(", ")}.</p>
              <p><Go href="/videos">Watch</Go></p>
            </Row>
          )}
          {reading.length > 0 && (
            <Row n={++n} verb="Reading">
              {reading.map((r) => (
                <p key={r.link}>
                  <a href={r.link} {...ext} className="ink-link">{r.title}</a> <span className="text-muted text-[14px]">· {r.type}</span>
                </p>
              ))}
              <p><Go href="/readlist">Full readlist</Go></p>
            </Row>
          )}
          <Row n={++n} verb="Off the clock">
            <p className="text-muted">{NOW.offClock}</p>
          </Row>
        </ol>

        <p className="text-[14px] text-muted">
          Inspired by the <a href="https://nownownow.com/about" {...ext} className="ink-link">/now page movement</a>. Want to work
          together on what&apos;s next? <Link href="/#contact" className="ink-link">Say hello.</Link>
        </p>
      </PageBody>
    </div>
  );
}
