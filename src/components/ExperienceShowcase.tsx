"use client";

import experiencesData from "@/data/experience.json";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  location: string;
  duration: string;
  current?: boolean;
  link?: string;
  technologies: string[];
  achievements: string[];
  summary: string;
}

export default function ExperienceShowcase() {
  const experiences = experiencesData as ExperienceItem[];

  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
        Professional History
      </h2>
      <p className="text-sm text-foreground/50 mb-8">
        An overview of backend engineering, cloud computing, and AI integration built across organizations.
      </p>

      <div className="space-y-10">
        {experiences.map((exp) => (
          <div key={exp.id} className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-lg font-semibold">
                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {exp.company} ↗
                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
                <p className="text-xs text-foreground/50 uppercase font-mono tracking-wider">
                  {exp.role}
                </p>
              </div>
              <div className="text-xs text-foreground/50 font-mono">
                {exp.duration} | {exp.location}
              </div>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">
              {exp.summary}
            </p>

            <ul className="space-y-1.5 list-disc pl-4 text-sm text-foreground/75">
              {exp.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  dangerouslySetInnerHTML={{
                    __html: achievement.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-foreground font-semibold">$1</strong>'
                    ),
                  }}
                />
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-foreground/[0.04] text-foreground/60 border border-border/5 uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
