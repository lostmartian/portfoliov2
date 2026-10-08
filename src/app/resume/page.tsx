import type { Metadata } from "next";
import type { ReactNode } from "react";
import PrintButton from "@/components/ui/PrintButton";
import { CONTACT_DATA } from "@/config/contact";
import { EDUCATION, TECHNICAL_TOOLKIT, VALIDATION_STATS } from "@/config/about";
import experience from "@/data/experience.json";
import { projects } from "@/data/projects";
import stats from "@/data/github-stats.json";

export const metadata: Metadata = {
  title: "Résumé | Sahil Gangurde",
  description: "One-page résumé of Sahil Gangurde, AI & backend engineer in Pune. Printable.",
  alternates: { canonical: "https://lostmartian.in/resume" },
};

interface Exp {
  company: string;
  role: string;
  location: string;
  duration: string;
  summary: string;
  homeDisplay?: boolean;
  client?: { name: string; description: string };
}

const strip = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "");

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="resume-block grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-x-6 gap-y-2 pt-5 mt-5 border-t border-foreground/30">
      <h2 className="font-display text-xl leading-none text-accent">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const all = experience as Exp[];
  const main = all.filter((e) => e.homeDisplay !== false);
  const earlier = all.filter((e) => e.homeDisplay === false);

  return (
    <div className="pt-12 pb-10">
      <div className="no-print flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <p className="deva text-accent text-3xl leading-none">परिचय</p>
          <p className="label mt-2">Résumé · one page</p>
        </div>
        <PrintButton />
      </div>

      <article className="resume-sheet mx-auto max-w-[860px] bg-card-bg border border-foreground/30 px-8 sm:px-14 py-12 shadow-[0_30px_60px_-40px_rgba(40,20,10,0.4)] text-[14px] leading-relaxed">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl sm:text-6xl leading-none">Sahil Gangurde</h1>
            <p className="mt-2 font-display italic text-xl text-accent">AI &amp; Backend Engineer</p>
          </div>
          <ul className="text-[13px] sm:text-right space-y-0.5">
            <li>Pune, India · {CONTACT_DATA.location.split("(")[0].trim()}</li>
            <li><a href={`mailto:${CONTACT_DATA.email}`} className="ink-link">{CONTACT_DATA.email}</a></li>
            <li><a href="https://lostmartian.in" className="ink-link">lostmartian.in</a> · <a href={CONTACT_DATA.github} className="ink-link">{strip(CONTACT_DATA.github)}</a></li>
            <li><a href={CONTACT_DATA.linkedin} className="ink-link">{strip(CONTACT_DATA.linkedin)}</a></li>
          </ul>
        </header>

        <Block title="Profile">
          <p>
            Independent AI &amp; backend engineer building high-throughput Go/Python backends, scale-elastic AWS
            infrastructure and agentic AI workflows. Founder of AgentDiff and KerrShift; contributor to LiteLLM and
            DeepEval.
          </p>
        </Block>

        <Block title="Experience">
          <ol className="space-y-3.5">
            {main.map((e) => (
              <li key={e.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p><span className="font-semibold">{e.company}</span> · {e.role.replace(/,\s*Freelance/i, " (freelance)")}</p>
                  <p className="text-[12px] text-muted tabular-nums">{e.duration} · {e.location}</p>
                </div>
                <p className="text-muted">{e.summary}</p>
              </li>
            ))}
          </ol>
          {earlier.length > 0 && (
            <p className="mt-3 text-[13px] text-muted">
              <span className="text-foreground">Earlier:</span>{" "}
              {earlier.map((e) => `${e.role.split(",")[0]}, ${e.company} (${e.duration})`).join(" · ")}
            </p>
          )}
        </Block>

        <Block title="Selected work">
          <ul className="space-y-2.5">
            {projects.map((p) => (
              <li key={p.slug}>
                <span className="font-semibold">{p.title}</span>
                {p.story && <span className="text-muted"> · for {p.story.client}. {p.story.outcome}</span>}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Open source">
          <p>
            Upstream contributor to <span className="font-semibold">LiteLLM</span> and{" "}
            <span className="font-semibold">DeepEval</span>. {stats.summary.publicContributions} public commits in {stats.year};{" "}
            {stats.prs.externalClientOrgs.merged} pull requests merged across {stats.prs.externalClientOrgs.clientOrgsCount} client organisations.
          </p>
        </Block>

        <Block title="Education">
          {EDUCATION.map((e) => (
            <div key={e.degree} className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p><span className="font-semibold">{e.school}</span> · {e.degree}</p>
              <p className="text-[12px] text-muted tabular-nums">{e.years}</p>
            </div>
          ))}
        </Block>

        <Block title="Skills">
          <dl className="space-y-1">
            {TECHNICAL_TOOLKIT.map((g) => (
              <div key={g.index} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-x-4">
                <dt className="text-muted">{g.title}</dt>
                <dd>{g.list.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Recognition">
          <p>{VALIDATION_STATS.map((v) => `${v.title}: ${v.metric}`).join(" · ")}</p>
        </Block>
      </article>
    </div>
  );
}
