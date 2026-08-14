import Image from "next/image";
import { TECHNICAL_TOOLKIT, VALIDATION_STATS } from "@/config/about";
import experiencesData from "@/data/experience.json";
import { CONTACT_DATA } from "@/config/contact";
import ExternalContributions from "@/components/ExternalContributions";

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
              I am a <strong className="font-semibold text-foreground">Backend &amp; AI Engineer</strong> specializing in scale-elastic backend infrastructure, high-throughput Go/Python architectures, and agentic AI systems. With 2+ years of experience, I build reliable software for high-stakes, regulated industries.
            </p>
            <p>
              My work spans engineering <strong className="font-semibold text-foreground">deterministic financial engines</strong> processing millions of records under strict compliance, to orchestrating legal <strong className="font-semibold text-foreground">Knowledge Graphs </strong> using Neo4j and LLMs. I hold an Integrated B.Tech &amp; M.Tech in IT from IIIT Gwalior.
            </p>
            <p>
              I also build and run <a href="https://latentchronicle.online/" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">The Latent Chronicle ↗</a>, an automated computer science newspaper, and spend my free time contributing to <strong className="font-semibold text-foreground">open source</strong> as a newfound hobby.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="text-xs font-sans font-medium text-foreground/65">
                Applied AI • RAG &amp; GraphRAG • Agentic Systems
              </span>
            </div>
          </div>
          <div className="md:col-span-1 flex justify-center md:justify-end w-full">
            <div className="relative w-full max-w-[240px] p-3 bg-[#fdfbf7] border border-border shadow-sm rounded-sm rotate-[-3.5deg]">
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
              {/* Polaroid Bottom Margin Caption with hand-drawn animated colorful doodles */}
              <div className="relative pt-5 pb-2 flex items-center justify-center">
                {/* Colorful Smiling Starfish Doodle (Left - Daytime, Animated) */}
                <svg className="absolute left-0.5 bottom-1 w-9 h-9 pointer-events-none animate-starfish-wiggle doodle-transition transform opacity-100 scale-100 translate-y-0 dark:opacity-0 dark:scale-75 dark:translate-y-6" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 12 3 Q 13.5 7.5 14.5 9.5 Q 18 9.5 21 10 Q 18 12.5 16.5 14.5 Q 17.25 18 18 21 Q 14.5 19 12 17.5 Q 9.5 19 6 21 Q 6.75 18 7.5 14.5 Q 6 12.5 3 10 Q 6 9.5 9.5 9.5 Q 10.5 7.5 12 3 Z" stroke="#ea580c" fill="#ffedd5" />
                  <circle cx="10" cy="12" r="0.6" fill="#ea580c" />
                  <circle cx="14" cy="12" r="0.6" fill="#ea580c" />
                  <path d="M 11 14 Q 12 15 13 14" stroke="#ea580c" />
                </svg>

                {/* Sleeping Starfish Doodle (Left - Nighttime, Animated) */}
                <svg className="absolute left-0.5 bottom-1 w-9 h-9 pointer-events-none animate-starfish-sleep doodle-transition transform opacity-0 scale-75 translate-y-6 dark:opacity-100 dark:scale-100 dark:translate-y-0" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 12 3 Q 13.5 7.5 14.5 9.5 Q 18 9.5 21 10 Q 18 12.5 16.5 14.5 Q 17.25 18 18 21 Q 14.5 19 12 17.5 Q 9.5 19 6 21 Q 6.75 18 7.5 14.5 Q 6 12.5 3 10 Q 6 9.5 9.5 9.5 Q 10.5 7.5 12 3 Z" stroke="#6366f1" fill="#c7d2fe" />
                  <path d="M 9.5 12 Q 10 13 10.5 12" stroke="#4f46e5" />
                  <path d="M 13.5 12 Q 14 13 14.5 12" stroke="#4f46e5" />
                  <path d="M 11.5 14 Q 12 14.7 12.5 14" stroke="#4f46e5" />
                  <text x="16" y="8" className="text-[6px] font-sans font-extrabold fill-indigo-500 select-none animate-pulse">z</text>
                  <text x="18" y="5" className="text-[8px] font-sans font-extrabold fill-indigo-400 select-none animate-pulse delay-100">Z</text>
                </svg>

                {/* Text container in normal flow holding the absolute paragraphs */}
                <div className="relative w-full h-9 flex items-center justify-center">
                  {/* Day Mode Caption Text */}
                  <p className="text-xs font-sans font-semibold text-stone-900 text-center leading-normal px-10 select-none doodle-transition opacity-100 dark:opacity-0 absolute inset-0 flex items-center justify-center">
                    Chasing sunsets and debugging threads.
                  </p>

                  {/* Night Mode Caption Text */}
                  <p className="text-xs font-sans font-semibold text-stone-900 text-center leading-normal px-10 select-none doodle-transition opacity-0 dark:opacity-100 absolute inset-0 flex items-center justify-center">
                    Catching stars and debugging threads.
                  </p>
                </div>

                {/* Colorful Sun Doodle (Right - Daytime, Animated) */}
                <svg className="absolute right-0.5 bottom-1 w-9 h-9 pointer-events-none animate-sun-spin doodle-transition transform opacity-100 scale-100 translate-y-0 rotate-0 dark:opacity-0 dark:scale-75 dark:translate-y-8 dark:rotate-[-45deg]" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5" stroke="#f59e0b" fill="#fef08a" />
                  <path d="M 12 3 L 12 5" stroke="#f59e0b" />
                  <path d="M 12 19 L 12 21" stroke="#f59e0b" />
                  <path d="M 3 12 L 5 12" stroke="#f59e0b" />
                  <path d="M 19 12 L 21 12" stroke="#f59e0b" />
                  <path d="M 5.6 5.6 L 7.1 7.1" stroke="#f59e0b" />
                  <path d="M 16.9 16.9 L 18.4 18.4" stroke="#f59e0b" />
                  <path d="M 5.6 18.4 L 7.1 16.9" stroke="#f59e0b" />
                  <path d="M 16.9 7.1 L 18.4 5.6" stroke="#f59e0b" />
                </svg>

                {/* Colorful Crescent Moon Doodle (Right - Nighttime, Animated) */}
                <svg className="absolute right-0.5 bottom-1 w-9 h-9 pointer-events-none animate-moon-sway doodle-transition transform opacity-0 scale-75 translate-y-8 rotate-[45deg] dark:opacity-100 dark:scale-100 dark:translate-y-0 dark:rotate-0" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 12 3 A 9 9 0 1 0 21 12 A 6 6 0 0 1 12 3 Z" stroke="#64748b" fill="#e2e8f0" />
                  <path d="M 9.5 10.5 Q 10 11.5 10.5 10.5" stroke="#475569" />
                  <path d="M 10 13 Q 10.75 14 11.5 13" stroke="#475569" />
                  <path d="M 17 5 L 17.3 6 M 19 3 L 19.5 4.5 M 15 8 L 15.5 9" stroke="#94a3b8" strokeWidth="1.2" />
                </svg>
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

      {/* 3. Open Source Contributions Section */}
      <ExternalContributions />

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
