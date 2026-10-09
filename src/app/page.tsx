import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import experiencesData from "@/data/experience.json";
import { CONTACT_DATA } from "@/config/contact";
import { projects } from "@/data/projects";
import AboutCollage from "@/components/about/AboutCollage";
import ServicesExplorer from "@/components/home/ServicesExplorer";
import ToolShelf from "@/components/home/ToolShelf";
import WorkIndex from "@/components/WorkIndex";
import YouTubeSection from "@/components/YouTubeSection";
import Section from "@/components/ui/Section";
import CopyEmail from "@/components/ui/CopyEmail";
import Magnetic from "@/components/ui/Magnetic";
import { devaNum } from "@/components/ui/deva";
import { Border, DanceCircle } from "@/components/warli/Warli";
import HeroLandscape from "@/components/warli/HeroLandscape";
import VillageGrowth from "@/components/warli/VillageGrowth";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  location: string;
  duration: string;
  summary: string;
  current?: boolean;
  link?: string;
  homeDisplay?: boolean;
  client?: { name: string; description: string; link: string };
}

function getEmploymentType(role: string): string {
  const r = role.toLowerCase();
  if (r.includes("freelance") || r.includes("consultant") || r.includes("instructor")) return "Freelance";
  if (r.includes("writer") || r.includes("setter")) return "Contract";
  return "Full-time";
}

function cleanRole(role: string): string {
  return role.replace(/,\s*Freelance/gi, "").trim();
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
  const experiences = (experiencesData as ExperienceItem[]).filter((e) => e.homeDisplay !== false);

  return (
    <div className="space-y-40 md:space-y-56">
      {/* ============ HERO ============ */}
      <section id="hero" className="relative isolate min-h-[calc(100svh-72px)] flex flex-col">
        <HeroLandscape />

        <div className="relative flex-1 flex flex-col items-center justify-center text-center pt-[5svh] pb-[clamp(120px,20svh,240px)]">
          <a href="#about-me" className="rise group inline-flex items-center gap-3 rounded-full border border-border bg-card-bg/80 pl-1.5 pr-5 py-1.5 transition-colors hover:border-accent" style={d(80)}>
            <span className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-full bg-[#f7f1e6] ring-2 ring-background">
              <Image src="/me/headshot.jpg" alt="Sahil Gangurde" fill sizes="44px" priority className="object-cover object-[50%_30%] scale-125 mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.35]" />
            </span>
            <span className="deva text-accent text-xl sm:text-2xl leading-none">नमस्कार!</span>
            <span className="text-base sm:text-lg">I&apos;m Sahil.</span>
            <span className="hidden sm:inline text-sm text-muted transition-colors group-hover:text-accent">about me ↓</span>
          </a>

          <h1 className="mt-5 sm:mt-6 text-[clamp(3rem,min(9.6vw,14svh),11.5rem)] leading-[0.9] tracking-[-0.035em]">
            <span className="mask-line">
              <span className="mask-inner justify-center" style={d(160)}>
                <span className="whitespace-nowrap">Full-stack</span> software,
              </span>
            </span>
            <span className="mask-line">
              <span className="mask-inner justify-center" style={d(260)}>
                AI where it
                <span className="relative serif text-accent">
                  counts.
                  <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="scribble absolute left-[2%] -bottom-[0.04em] w-[96%] h-[0.12em] overflow-visible" aria-hidden="true">
                    <path d="M2 12 C 40 4, 70 18, 110 10 S 180 4, 220 11 S 280 14, 298 7" pathLength={1} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                </span>
              </span>
            </span>
          </h1>

          <p className="rise mt-6 2xl:mt-9 max-w-[38rem] text-[17px] sm:text-lg leading-relaxed text-foreground/85" style={d(480)}>
            An engineer from Pune. By day I build backends and AI agents for founders and teams, and right now I&apos;m
            building <a href="https://agentdiff.app/" {...ext} className="ink-link">AgentDiff</a>. By weekend I paint, cook, and explain how AI works on{" "}
            <a href={CONTACT_DATA.youtube} {...ext} className="ink-link">YouTube</a>.
          </p>

          <div className="rise mt-6 2xl:mt-9 flex flex-col items-center gap-3.5" style={d(580)}>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
              <Magnetic>
                <a
                  href={`mailto:${CONTACT_DATA.email}?subject=${encodeURIComponent("Project enquiry")}`}
                  className="flourish group inline-flex items-center gap-3 h-14 pl-7 pr-2.5 rounded-full bg-foreground text-background text-base hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                >
                  Start a project
                  <span className="grid place-items-center h-10 w-10 rounded-full bg-background text-foreground transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </Magnetic>
              <CopyEmail email={CONTACT_DATA.email} />
            </div>
            <p className="flex items-center gap-2.5 text-sm text-muted">
              <span className="pulse-dot h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
              Available for new work · I reply within a day
            </p>
          </div>
        </div>
      </section>

      <div className="relative space-y-40 md:space-y-56">
        <VillageGrowth className="hidden lg:block absolute left-0 top-0 bottom-0 w-[calc((100%-27.5rem)/6+2.5rem)] max-w-[230px] !mt-0" />

      {/* ============ ABOUT ============ */}
      <Section id="about-me" index={1} mr="ओळख" label="About" title={<>Hi, I&apos;m <span className="serif text-accent">Sahil.</span></>}>
        <div className="grid grid-cols-1 xl:grid-cols-9 gap-x-14 gap-y-16 items-start">
          <div className="xl:col-span-4 space-y-6 text-[17px] sm:text-lg leading-[1.8] text-foreground/85 max-w-2xl">
            <p>
              I&apos;m an engineer from Pune. I did a five-year dual degree in Information Technology at IIIT Gwalior, and I&apos;ve
              spent the years since building systems that have to hold: share allotments that can&apos;t be wrong, AI that
              enterprises have to trust.
            </p>
            <p>
              These days I freelance for founders and teams, and I&apos;m building{" "}
              <a href="https://agentdiff.app/" {...ext} className="ink-link text-foreground">AgentDiff</a>, a tool that catches AI
              agents quietly getting worse.
            </p>
            <p className="text-muted">
              I care about how things feel to use, not just whether they pass the tests. Away from the keyboard I paint, cook, and explain AI internals on{" "}
              <a href="https://www.youtube.com/@sahilgangurdetech" {...ext} className="ink-link text-foreground">YouTube</a>.
            </p>
            <p className="font-display italic text-2xl text-foreground pt-2">
              Say hi: <a href="#contact" className="ink-link">let&apos;s talk</a>.
            </p>
          </div>
          <div className="xl:col-span-5">
            <AboutCollage />
          </div>
        </div>
      </Section>

      {/* ============ SELECTED WORK ============ */}
      <Section index={2} mr="काम" label="Selected work" title={<>Built for <span className="serif text-accent">production.</span></>} href="/work" hrefLabel="All case studies">
        <WorkIndex
          items={projects.slice(0, 4).map((p) => ({
            href: `/work/${p.slug}`,
            title: p.title,
            meta: p.category.split("/")[0].trim(),
            year: p.year,
            description: p.description,
            cover: p.slug,
            stack: p.stack,
          }))}
        />
      </Section>

      {/* ============ SERVICES ============ */}
      <Section index={3} mr="सेवा" label="Services" title={<>How I can <span className="serif text-accent">help.</span></>}>
        <ServicesExplorer />
      </Section>

      {/* ============ EXPERIENCE ============ */}
      <Section index={4} mr="अनुभव" label="Experience" title={<>Where I&apos;ve <span className="serif text-accent">shipped.</span></>}>
        <ol className="border-t border-border">
          {experiences.map((exp) => {
            const Row = exp.link ? "a" : "div";
            return (
              <li key={exp.id}>
                <Row
                  {...(exp.link ? { href: exp.link, ...ext } : {})}
                  className="group ink-row grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-x-8 gap-y-3 py-10 border-b border-border"
                >
                  <div className="space-y-2 pt-2">
                    <p className="label flex items-center gap-2">
                      {exp.current && <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden="true" />}
                      {exp.duration}
                    </p>
                    <p className="label">{getEmploymentType(exp.role)}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl sm:text-4xl leading-tight transition-colors duration-300 group-hover:text-accent">
                      {exp.company}
                    </h3>
                    <p className="serif text-xl text-foreground/70">{cleanRole(exp.role)}</p>
                    {exp.summary && <p className="text-[16px] text-muted leading-relaxed max-w-2xl">{exp.summary}</p>}
                    {exp.client && (
                      <p className="text-sm text-muted max-w-2xl">
                        Building for <span className="text-foreground">{exp.client.name}</span>: {exp.client.description}
                      </p>
                    )}
                  </div>
                  {exp.link && (
                    <span className="hidden md:grid place-items-center h-11 w-11 rounded-full border border-border transition-all duration-500 group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  )}
                </Row>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* ============ TOOLKIT ============ */}
      <Section index={5} mr="साधनं" label="Toolkit" title={<>Tools of the <span className="serif text-accent">trade.</span></>} href="/uses" hrefLabel="Everything I use">
        <ToolShelf />
      </Section>

      {/* ============ VIDEOS ============ */}
      <YouTubeSection index={6} />

      </div>

      {/* ============ CONTACT ============ */}
      <section id="contact" data-village="Contact" data-village-mr="संपर्क" className="bleed relative overflow-hidden bg-accent text-accent-foreground">
        <Border className="text-accent-foreground/30" />
        <div className="w-full px-5 sm:px-8 lg:px-12 2xl:px-20 py-24 md:py-36 relative">
          <DanceCircle className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[620px] text-accent-foreground/20 pointer-events-none hidden md:block" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-x-10">
            <div className="lg:col-span-2 flex lg:flex-col items-baseline gap-3 lg:gap-2 mb-8">
              <span className="deva text-3xl lg:text-5xl leading-none">{devaNum(8)}</span>
              <span className="deva text-lg leading-none opacity-85">संपर्क</span>
              <span className="label !text-accent-foreground/90 lg:mt-2">Contact</span>
            </div>
            <div className="lg:col-start-3 lg:col-span-8 space-y-10">
              <h2 className="text-[3.2rem] sm:text-7xl lg:text-8xl leading-[0.95]">
                Have a hard problem? <span className="serif">Let&apos;s talk.</span>
              </h2>
              <p className="text-lg text-accent-foreground/80 leading-relaxed max-w-xl">
                Open to freelance &amp; project-basis AI engineering, full-time &amp; contract SDE roles, senior AI consulting
                and 1-on-1 mentorship. Remote, or onsite across India.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={`mailto:${CONTACT_DATA.email}`}
                    className="flourish group inline-flex items-center gap-2 h-14 px-7 rounded-full bg-accent-foreground text-accent text-[15px] hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    {CONTACT_DATA.displayEmail}
                    <ArrowUpRight className="nudge w-4 h-4" />
                  </a>
                </Magnetic>
                <div className="[&_button]:h-14 [&_button]:px-6 [&_button]:border-accent-foreground/40 [&_button]:text-accent-foreground [&_button:hover]:border-accent-foreground">
                  <CopyEmail email={CONTACT_DATA.email} />
                </div>
              </div>
              <p className="flex flex-wrap gap-x-7 gap-y-2 text-[15px] text-accent-foreground/85 pt-4">
                {[
                  ["LinkedIn", CONTACT_DATA.linkedin],
                  ["GitHub", CONTACT_DATA.github],
                  ["X / Twitter", CONTACT_DATA.twitter],
                  ["YouTube", CONTACT_DATA.youtube],
                ].map(([name, href]) => (
                  <a key={name} href={href} {...ext} className="link-u">{name} ↗</a>
                ))}
                <Link href="/oss-contributions" className="link-u">Open source →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
