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
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
          Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-4 text-sm text-foreground/80 leading-relaxed text-justify">
            <p>
              With <strong className="font-semibold text-foreground">2+ years of professional experience</strong>, I build scale-elastic backend infrastructure, concurrent task distribution systems, and agentic AI pipelines. My work is defined by designing systems where precision and absolute integrity are central from engineering <strong className="font-semibold text-foreground">deterministic IPO allotment engines</strong> processing millions of records under SEBI compliance guidelines, to orchestrating complex legal and compliance <strong className="font-semibold text-foreground">Knowledge Graphs</strong> using Neo4j and LLMs.
            </p>
            <p>
              I hold a <strong className="font-semibold text-foreground">B.Tech & M.Tech in Information Technology</strong> from IIIT Gwalior (2019-2024). Grounded in strong theoretical foundations, I specialize in combining high-throughput Go/Python backend architectures with intelligent AI orchestration, building reliable systems for regulated and high-stakes industries.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-foreground/60">
                Applied AI • RAG &amp; GraphRAG • Agentic Systems
              </span>
            </div>
          </div>
          <div className="md:col-span-1 flex justify-center md:justify-end w-full">
            <div className="relative aspect-square w-full max-w-[210px] rounded overflow-hidden bg-foreground/[0.02]">
              <Image
                src="/me/profile-photo.png"
                alt="Sahil Gangurde"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border/40" />

      {/* 2. Toolkit Section */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
          Technical Toolkit
        </h2>
        <div className="space-y-2 text-sm text-foreground/80">
          {TECHNICAL_TOOLKIT.map((item) => (
            <div key={item.index} className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground/80">{item.title}:</span>{" "}
                <span className="text-foreground/60">{item.list.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border/40" />

      {/* 4. Experience Section */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
          Experience
        </h2>
        <div className="space-y-3 text-sm text-foreground/80">
          {experiences.map((exp) => {
            const empType = getEmploymentType(exp.role);
            const roleName = cleanRole(exp.role);
            return (
              <div key={exp.id} className="flex items-start gap-2">
                <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
                <div className="flex-grow space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="text-foreground/80">
                      <span className="font-semibold text-foreground">
                        {exp.link ? (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {exp.company} ↗
                          </a>
                        ) : (
                          exp.company
                        )}
                      </span>
                      <span className="text-foreground/30 mx-2">|</span>
                      <span>{roleName}</span>
                      <span className="text-[10px] font-mono text-foreground/45 bg-foreground/[0.04] px-1.5 py-0.5 rounded ml-2 uppercase">
                        {empType}
                      </span>
                    </div>
                    <div className="text-xs text-foreground/40 font-mono">
                      {exp.duration}
                    </div>
                  </div>

                  {/* Summary one-liner */}
                  {exp.summary && (
                    <p className="text-xs text-foreground/60 leading-relaxed font-light font-sans max-w-2xl text-justify">
                      {exp.summary}
                    </p>
                  )}

                  {/* Client Info (if present) */}
                  {exp.client && (
                    <div className="pl-4 text-xs space-y-1 text-foreground/75">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-foreground/80">Client:</span>
                        <a href={exp.client.link} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-foreground">
                          {exp.client.name} ↗
                        </a>
                      </div>
                      <p className="font-light text-foreground/60 leading-relaxed max-w-xl text-justify">
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

      <hr className="border-border/40" />

      {/* 5. Contact Section */}
      <section id="contact" className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
          Contact
        </h2>
        <div className="space-y-3 text-sm text-foreground/80">
          {/* Email */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
            <div className="flex-1">
              <span className="font-semibold text-foreground/80">Email:</span>{" "}
              <a href={`mailto:${CONTACT_DATA.email}`} className="hover:underline">
                {CONTACT_DATA.displayEmail}
              </a>
            </div>
          </div>

          {/* Network */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
            <div className="flex-1 flex flex-wrap gap-x-4">
              <span className="font-semibold text-foreground/80 mr-2">Network:</span>
              <a href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn ↗
              </a>
              <a href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub ↗
              </a>
              <a href={CONTACT_DATA.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">
                X / Twitter ↗
              </a>
            </div>
          </div>

          {/* Status & Location */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
            <div className="flex-1">
              <span className="font-semibold text-foreground/80">Status &amp; Location:</span>{" "}
              <span className="text-foreground/70">{CONTACT_DATA.status}</span> in <span className="text-foreground/70">{CONTACT_DATA.location}</span>
            </div>
          </div>

          {/* Operational Focus */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
            <div className="flex-1">
              <span className="font-semibold text-foreground/80">Operational Focus:</span>{" "}
              <span className="text-foreground/70">
                Collaborating with founders and enterprise teams to architect robust digital products, intelligent AI workflows, and scalable systems.
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
            <div className="flex-1">
              <span className="font-semibold text-foreground/80">Services Offered:</span>{" "}
              <span className="text-foreground/70">
                High-Throughput Backends (Go / Python), Intelligent AI &amp; GraphRAG Agents, Scale-Elastic Infrastructure (AWS / IaC), Secure Multi-Tenant SaaS Architectures
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
