"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
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
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  };

  const formatAchievement = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
  };

  // Grid layout helper mapping experience IDs to responsive grid spans
  const getGridSpan = (id: number) => {
    switch (id) {
      case 1:
        return "col-span-12 lg:col-span-8 md:col-span-6";
      case 2:
        return "col-span-12 lg:col-span-4 md:col-span-6";
      case 3:
        return "col-span-12 lg:col-span-7 md:col-span-7";
      case 4:
        return "col-span-12 lg:col-span-5 md:col-span-5";
      default:
        return "col-span-12 md:col-span-6";
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        <div className="w-full h-px bg-border/40 mb-8 md:mb-12" />
        {/* Section Metadata Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-foreground/40 rounded-full" />
            <p className="text-technical tracking-[0.2em]">Record_Archive / Experience_History</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-foreground/30 uppercase tracking-[0.2em]">
            <span>Ref: 0x_EXPERIENCE</span>
          </div>
        </div>

        {/* Section Heading & Copy */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-foreground leading-[1.1]">
            Professional History
          </h2>
          <p className="mt-4 text-foreground/50 font-light text-base sm:text-lg leading-relaxed">
            An overview of structural backend engineering, cloud computing, and advanced AI integration built across organizations and brands.
          </p>
        </div>

        {/* Bento Grid layout of cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {experiences.map((exp, index) => {
            const spanClass = getGridSpan(exp.id);
            const isExpanded = expandedIds.includes(exp.id);

            return (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => toggleExpand(exp.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleExpand(exp.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                aria-label={`Experience details for ${exp.company}`}
                className={`group relative ${spanClass} flex flex-col justify-between p-6 sm:p-8 bg-foreground/[0.01] hover:bg-foreground/[0.015] border rounded-2xl transition-all duration-300 cursor-pointer min-h-[280px] select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20
                  ${isExpanded ? "border-border/25 bg-foreground/[0.015]" : "border-border/10 hover:border-border/20"}
                `}
              >

                <AnimatePresence mode="wait" initial={false}>
                  {!isExpanded ? (
                    <motion.div
                      key="front"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-full justify-between flex-grow"
                    >
                      <div className="space-y-4">
                        {/* Card Header: Brand, Role & Active badge */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                          <div>
                            <h3 className="text-lg sm:text-xl font-sans font-semibold text-foreground tracking-tight flex items-center gap-2">
                              {exp.link ? (
                                <a
                                  href={exp.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 hover:text-foreground/80 transition-colors"
                                >
                                  <span>{exp.company}</span>
                                  <ExternalLink className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 transition-colors" />
                                </a>
                              ) : (
                                <span>{exp.company}</span>
                              )}
                            </h3>
                            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-foreground/45 mt-1.5">
                              {exp.role}
                            </p>
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-mono text-foreground/45 uppercase tracking-wider sm:mt-1.5">
                            <Calendar className="w-3.5 h-3.5 text-foreground/30" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>

                        {/* Summary / Impact Statement */}
                        <p className="text-sm font-light text-foreground/70 leading-relaxed pt-1">
                          {exp.summary}
                        </p>
                      </div>

                      {/* Card Footer: Tech stack & click CTA */}
                      <div className="mt-8 pt-4 border-t border-border/5 flex items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded bg-foreground/[0.02] text-foreground/50 border border-border/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-foreground/35 group-hover:text-foreground/70 transition-colors">
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-full justify-between flex-grow"
                    >
                      <div className="space-y-4">
                        {/* Overlay Header */}
                        <div className="flex items-center justify-between border-b border-border/5 pb-3">
                          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-foreground/40">
                            Details // {exp.company}
                          </span>
                          <span className="text-[9px] font-mono text-foreground/35">
                            {exp.duration}
                          </span>
                        </div>

                        {/* Achievements Bullet Points (max 3 for density/sizing) */}
                        <ul className="space-y-3.5 pt-1">
                          {exp.achievements.slice(0, 3).map((achievement, idx) => (
                            <li key={idx} className="flex gap-2.5 text-[11px] sm:text-xs text-foreground/75 leading-relaxed font-light">
                              <span className="mt-2 w-1 h-1 rounded-full bg-foreground/30 shrink-0" />
                              <span dangerouslySetInnerHTML={{ __html: formatAchievement(achievement) }} />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Overlay Footer: Back Button */}
                      <div className="mt-8 pt-4 border-t border-border/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-foreground/40 font-mono">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{exp.location}</span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-foreground/35 group-hover:text-foreground/70 transition-colors">
                          <ArrowRight className="w-3 h-3 rotate-180" />
                          <span>Back</span>
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
