import Image from "next/image";
import { TECHNICAL_TOOLKIT, VALIDATION_STATS } from "@/config/about";
import experiencesData from "@/data/experience.json";
import { CONTACT_DATA } from "@/config/contact";
import Link from "next/link";

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
  client?: {
    name: string;
    description: string;
    link: string;
  };
}

function getEmploymentType(role: string): string {
  const r = role.toLowerCase();
  if (r.includes("freelance")) return "Freelance";
  if (r.includes("consultant")) return "Freelance";
  if (r.includes("instructor")) return "Freelance";
  if (r.includes("writer")) return "Contract";
  if (r.includes("setter")) return "Contract";
  return "Full-time";
}

function cleanRole(role: string): string {
  return role.replace(/,\s*Freelance/gi, "").trim();
}

export default function Home() {
  const experiences = (experiencesData as ExperienceItem[]).filter(exp => exp.homeDisplay !== false);

  return (
    <div className="font-sans">
      {/* ============ HERO ============ */}
      <section className="pt-10 pb-14 md:pt-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* Left: Identity */}
          <div className="md:col-span-8 space-y-7">
            {/* Headline - single sentence */}
            <h1 className="text-[1.75rem] sm:text-[2.4rem] lg:text-[2.9rem] font-bold tracking-tight leading-tight text-foreground">
              Backend &amp; AI Engineer building systems that hold.
            </h1>

            {/* Bio */}
            <div className="max-w-xl space-y-4 text-[15px] sm:text-base text-foreground/85 leading-relaxed">
              <p>
                I specialize in scale-elastic backend infrastructure, high-throughput Go/Python
                architectures, and agentic AI systems. With 2+ years of experience, I build reliable
                software for high-stakes, regulated industries.
              </p>
              <p>
                My work spans engineering{" "}
                <strong className="font-semibold text-foreground">deterministic financial engines</strong>{" "}
                processing millions of records under strict compliance, to orchestrating legal{" "}
                <strong className="font-semibold text-foreground">Knowledge Graphs</strong> using Neo4j
                and LLMs. I hold an Integrated B.Tech &amp; M.Tech in IT from IIIT Gwalior.
              </p>
              <p>
                I also build and run{" "}
                <a href="https://latentchronicle.online/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent hover:text-accent transition-colors">The Latent Chronicle ↗</a>, an automated computer science newspaper, and contribute to{" "}
                <a href="https://github.com/BerriAI/litellm" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent hover:text-accent transition-colors">LiteLLM ↗</a>{" "}
                and{" "}
                <a href="https://github.com/confident-ai/deepeval" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent hover:text-accent transition-colors">DeepEval ↗</a>. Recently shipped{" "}
                <a href="https://agentdiff.lostmartian.in/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent hover:text-accent transition-colors">agentdiff ↗</a>, a tool to compare AI agent execution trajectories in CI/CD.
              </p>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/70">
              <div><span className="text-foreground/45 mr-1.5">Loc</span> Pune, India</div>
              <div><span className="text-foreground/45 mr-1.5">Focus</span> AI / Backend / Cloud</div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`mailto:${CONTACT_DATA.email}`}
                className="inline-flex items-center h-10 px-6 bg-foreground text-background rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors duration-300"
              >
                Get in touch
              </a>
              <Link
                href="/work"
                className="inline-flex items-center h-10 px-6 border border-border rounded-full text-sm font-medium text-foreground/80 hover:border-accent/50 hover:text-accent transition-colors duration-300"
              >
                View work
              </Link>
            </div>
          </div>

          {/* Right: Portrait, minimal studio frame */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <figure className="group relative w-full max-w-[280px]">
              {/* Frame */}
              <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card-bg shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35)]">
                <Image
                  src="/me/profile-photo.png"
                  alt="Sahil Gangurde"
                  fill
                  sizes="(max-width: 768px) 70vw, 280px"
                  className="object-cover grayscale-[0.35] contrast-[1.02] transition-all duration-700 group-hover:grayscale-0"
                  priority
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </div>

              {/* Caption strip */}
              <figcaption className="mt-4">
                <span className="text-sm text-foreground/60">
                  Chasing sunsets, debugging threads.
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>


      {/* ============ TOOLKIT ============ */}
      <section className="pt-2 pb-10 md:pb-14 space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-accent">
            Technical Toolkit
          </h2>
        </div>
        <div className="divide-y divide-border/60 border-y border-border/60">
          {TECHNICAL_TOOLKIT.map((item) => (
            <div key={item.index} className="flex items-start gap-5 py-4 group">
              <span className="text-xs text-foreground/40 mt-1 w-6 shrink-0 group-hover:text-accent transition-colors">
                {item.index}
              </span>
              <div className="flex-grow grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 items-start">
                <span className="text-[15px] font-semibold text-foreground">{item.title}</span>
                <span className="text-[15px] text-foreground/75 leading-relaxed">{item.list.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ============ EXPERIENCE ============ */}
      <section className="pt-2 pb-10 md:pb-14 space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-accent">
            Experience
          </h2>
        </div>
        <div>
          {experiences.map((exp) => {
            const empType = getEmploymentType(exp.role);
            const roleName = cleanRole(exp.role);
            return (
              <div
                key={exp.id}
                className={`pl-5 py-5 border-l transition-colors relative ${
                  exp.current
                    ? "border-accent"
                    : "border-border hover:border-accent/40"
                }`}
              >
                {exp.current && (
                  <span className="absolute -left-[3.5px] top-7 w-[7px] h-[7px] rounded-full bg-accent ring-4 ring-background" />
                )}
                {/* Top row: company + badge | duration */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 min-w-0">
                    <span className="font-semibold text-foreground leading-tight">
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          {exp.company} ↗
                        </a>
                      ) : (
                        exp.company
                      )}
                    </span>
                    <span className="text-[10px] font-sans font-bold text-accent bg-accent/5 border border-accent/15 px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                      {empType}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {exp.current && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                      </span>
                    )}
                    <span className="text-sm text-foreground/70">
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Role subtitle */}
                <p className="text-[15px] text-foreground/75 mt-0.5 mb-2">
                  {roleName}
                </p>

                {/* Summary */}
                {exp.summary && (
                  <p className="text-[15px] text-foreground/85 leading-relaxed max-w-none">
                    {exp.summary}
                  </p>
                )}

                {/* Client callout */}
                {exp.client && (
                  <div className="mt-3 pl-3 border-l border-border/60 space-y-0.5">
                    <div className="flex flex-wrap items-baseline gap-1.5">
                      <span className="text-xs text-foreground/65 uppercase tracking-wider font-bold">Client</span>
                      <a
                        href={exp.client.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] text-accent hover:underline font-medium"
                      >
                        {exp.client.name} ↗
                      </a>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed max-w-none">
                      {exp.client.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* ============ CONTACT ============ */}
      <section id="contact" className="pt-2 pb-10 md:pb-14 space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-accent">
            Contact
          </h2>
        </div>
        <div className="space-y-3 text-[15px] text-foreground">
          {/* Email */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>
            <div className="flex-1">
              <span className="font-semibold text-foreground">Email:</span>{" "}
              <a href={`mailto:${CONTACT_DATA.email}`} className="text-accent hover:underline">
                {CONTACT_DATA.displayEmail}
              </a>
            </div>
          </div>

          {/* Network */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>
            <div className="flex-1 flex flex-wrap gap-x-4">
              <span className="font-semibold text-foreground mr-2">Network:</span>
              <a href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                LinkedIn ↗
              </a>
              <a href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                GitHub ↗
              </a>
              <a href={CONTACT_DATA.twitter} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                X / Twitter ↗
              </a>
            </div>
          </div>

          {/* Status & Location */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>
            <div className="flex-1">
              <span className="font-semibold text-foreground">Status &amp; Location:</span>{" "}
              <span className="text-foreground/90">{CONTACT_DATA.status}</span> in <span className="text-foreground/90">{CONTACT_DATA.location}</span>
            </div>
          </div>

          {/* Operational Focus */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>
            <div className="flex-1">
              <span className="font-semibold text-foreground">Operational Focus:</span>{" "}
              <span className="text-foreground/85">
                Collaborating with founders and enterprise teams to architect robust digital products, intelligent AI workflows, and scalable systems.
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>
            <div className="flex-1">
              <span className="font-semibold text-foreground">Services Offered:</span>{" "}
              <span className="text-foreground/85">
                High-Throughput Backends (Go / Python), Intelligent AI &amp; GraphRAG Agents, Scale-Elastic Infrastructure (AWS / IaC), Secure Multi-Tenant SaaS Architectures
              </span>
            </div>
          </div>

          {/* OSS Contributions */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>
            <div className="flex-1">
              <span className="font-semibold text-foreground">OSS Contributions:</span>{" "}
              <Link href="/oss-contributions" className="text-accent hover:underline">
                View GitHub contributions, public PRs &amp; live stats →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
