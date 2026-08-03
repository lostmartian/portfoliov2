import Image from "next/image";
import { TECHNICAL_TOOLKIT, VALIDATION_STATS } from "@/config/about";
import experiencesData from "@/data/experience.json";
import { CONTACT_DATA } from "@/config/contact";

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
    <div className="space-y-10 font-sans">
      {/* 1. Profile Section */}
      <section className="space-y-6">
        {/* Open to Opportunities Badge */}
        {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400 dark:bg-amber-400/10 border border-amber-500 dark:border-amber-400/40 text-black dark:text-amber-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-amber-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-amber-300" />
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
            Open to Opportunities &mdash; Applied AI &bull; RAG &bull; Agentic Systems &bull; Backend Roles
          </span>
        </div> */}
        <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-accent">
          Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-4 text-sm text-foreground leading-relaxed text-justify">
            <p>
              With <strong className="font-semibold text-foreground">2+ years of professional experience</strong>, I build scale-elastic backend infrastructure, concurrent task distribution systems, and agentic AI pipelines. My work is defined by designing systems where precision and absolute integrity are central from engineering <strong className="font-semibold text-foreground">deterministic IPO allotment engines</strong> processing millions of records under SEBI compliance guidelines, to orchestrating complex legal and compliance <strong className="font-semibold text-foreground">Knowledge Graphs</strong> using Neo4j and LLMs.
            </p>
            <p>
              I hold a <strong className="font-semibold text-foreground">B.Tech & M.Tech in Information Technology</strong> from IIIT Gwalior (2019-2024). Grounded in strong theoretical foundations, I specialize in combining high-throughput Go/Python backend architectures with intelligent AI orchestration, building reliable systems for regulated and high-stakes industries.
            </p>
            <p>
              I also run <a href="https://latentchronicle.online/" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">The Latent Chronicle ↗</a>, a small, auto-generated newspaper for computer science updates.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="text-xs font-sans font-medium text-foreground/65">
                Applied AI • RAG &amp; GraphRAG • Agentic Systems
              </span>
            </div>
          </div>
          <div className="md:col-span-1 flex justify-center md:justify-end w-full">
            <div className="relative w-full max-w-[280px] p-3 bg-[#fdfbf7] border border-border shadow-sm rounded-sm rotate-[-3.5deg]">
              {/* Crimson Drawing Board Push Pin */}
              <div
                className="absolute top-1.5 left-[47%] -translate-x-1/2 w-4 h-4 rounded-full z-20 border border-stone-850/10 shadow-[1.5px_2.5px_4px_rgba(0,0,0,0.5)] bg-[radial-gradient(circle_at_30%_30%,#ff8fa3_0%,#d9383a_50%,#800f1c_100%)]"
              />
              <div className="relative aspect-square w-full overflow-hidden bg-foreground/[0.02] border border-border/10">
                <Image
                  src="/me/profile-photo.png"
                  alt="Sahil Gangurde"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Iridescent light leak / prism shader overlays */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-95 bg-gradient-to-tr from-transparent via-accent/40 via-pink-500/30 to-yellow-400/80"
                />
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-color-burn opacity-40 bg-gradient-to-br from-indigo-500/30 via-transparent to-black"
                />
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 bg-gradient-to-bl from-cyan-400/30 to-transparent"
                />
              </div>
              {/* Polaroid Bottom Margin Caption */}
              <div className="pt-4 pb-2 flex items-center justify-center">
                <p className="text-xs font-sans font-semibold text-stone-900 text-center leading-relaxed px-1">
                  Chasing sunsets and debugging threads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* 2. Toolkit Section */}
      <section className="space-y-4">
        <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-accent">
          Technical Toolkit
        </h2>
        <div className="space-y-2 text-sm text-foreground">
          {TECHNICAL_TOOLKIT.map((item) => (
            <div key={item.index} className="flex items-start gap-2">
              <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>
              <div className="flex-grow space-y-1">
                <span className="font-semibold text-foreground">{item.title}:</span>{" "}
                <span className="text-foreground/80">{item.list.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border" />

      {/* 4. Experience Section */}
      <section className="space-y-4">
        <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-accent">
          Experience
        </h2>
        <div className="space-y-3 text-sm text-foreground">
          {experiences.map((exp) => {
            const empType = getEmploymentType(exp.role);
            const roleName = cleanRole(exp.role);
            return (
              <div key={exp.id} className="flex items-start gap-2">
                <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>
                <div className="flex-grow space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="text-foreground">
                      <span className="font-semibold text-foreground">
                        {exp.link ? (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                            {exp.company} ↗
                          </a>
                        ) : (
                          exp.company
                        )}
                      </span>
                      <span className="text-foreground/50 mx-2">|</span>
                      <span>{roleName}</span>
                      <span className="text-[10px] font-sans font-semibold text-accent bg-accent/5 border border-accent/15 px-1.5 py-0.5 rounded ml-2 uppercase">
                        {empType}
                      </span>
                    </div>
                    <div className="text-xs text-foreground/40 font-mono">
                      {exp.duration}
                    </div>
                  </div>

                  {/* Summary one-liner */}
                  {exp.summary && (
                    <p className="text-xs text-foreground/80 leading-relaxed font-sans max-w-2xl text-justify">
                      {exp.summary}
                    </p>
                  )}

                  {/* Client Info (if present) */}
                  {exp.client && (
                    <div className="pl-4 text-xs space-y-1 text-foreground/90">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-foreground/90">Client:</span>
                        <a href={exp.client.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">
                          {exp.client.name} ↗
                        </a>
                      </div>
                      <p className="text-foreground/80 leading-relaxed max-w-xl text-justify">
                        {exp.client.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <hr className="border-border" />

      {/* 5. Contact Section */}
      <section id="contact" className="space-y-4">
        <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-accent">
          Contact
        </h2>
        <div className="space-y-3 text-sm text-foreground">
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
        </div>
      </section>
    </div>
  );
}
