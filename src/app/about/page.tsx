"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DitherPortrait from "@/components/Work/DitherPortrait";
import { useTheme } from "next-themes";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";
import { TECHNICAL_TOOLKIT, VALIDATION_STATS } from "@/config/about";

const ManifestRow = ({ index, title, skills, delay = 0 }: { index: string; title: string; skills: string[]; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="group py-12 border-b border-foreground/5 flex flex-col md:flex-row gap-8 md:gap-24 items-start relative overflow-hidden"
  >
    <div className="w-full md:w-1/4 flex items-center gap-6 shrink-0">
      <span className="text-[10px] font-mono text-foreground/20 font-bold">{index}</span>
      <h3 className="text-xs font-black uppercase tracking-[0.4em] text-foreground/40 group-hover:text-foreground transition-colors">
        {title}
      </h3>
    </div>

    <div className="flex-1 flex flex-wrap gap-x-12 gap-y-6">
      {skills.map((skill, i) => (
        <div key={i} className="flex items-center gap-3">
          <Plus className="w-2 h-2 text-foreground/10 group-hover:text-foreground/30 transition-colors" />
          <span className="text-sm md:text-lg font-light tracking-tight text-foreground/60 group-hover:text-foreground transition-colors">
            {skill}
          </span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function AboutPage() {
  const { theme } = useTheme();
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background transition-colors duration-300">
      <PageHeader
        title="About"
        subtitle="Engineering // Intelligence"
        description="Hello, I'm Sahil (lostmartian). A Full-Stack AI Engineer building systems for high-stakes intelligence."
      />

      <main className="max-w-7xl mx-auto px-8 sm:px-16 pb-32 relative">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start py-12 border-b border-foreground/5 mb-32">
          {/* Left Column: Portrait */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="w-full aspect-square opacity-100 dark:opacity-80 rounded-sm overflow-hidden relative">
              <AnimatePresence mode="wait">
                {!showEasterEgg ? (
                  <motion.div
                    key="portrait"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowEasterEgg(true)}
                    className="w-full h-full cursor-crosshair bg-foreground/5"
                  >
                    <DitherPortrait
                      imagePath="/me/20220325_113134-01.jpeg"
                      color1={theme === 'dark' ? "#020617" : "#f8fafc"}
                      color2={theme === 'dark' ? "#f8fafc" : "#020617"}
                      neonColor={theme === 'dark' ? "#00f2ff" : "#ff00ff"}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="egg"
                    initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img 
                      src="/easteregg/cat-oiiaoiia-cat.gif"
                      alt="Oiiaoiia"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            <p className="text-xl md:text-2xl text-foreground/50 leading-relaxed font-light">
              I hold a B.Tech & M.Tech in Information Technology from <span className="text-foreground/80 font-medium">IIIT Gwalior</span> (2019-2024). With <span className="text-foreground/80 font-medium">2+ years of professional experience</span>, my journey is defined by bridging the gap between robust backend systems and intelligent AI orchestration in high-stakes fields like <span className="text-foreground/80 font-medium">Government Infrastructure</span> and <span className="text-foreground/80 font-medium">Regulated Industries</span>.
            </p>
            <p className="text-xl md:text-2xl text-foreground/50 leading-relaxed font-light">
              Specializing in <span className="text-foreground/80 font-medium">Generative AI</span> and high-performance Backend architectures, I build systems where precision is not an option—it’s the architecture. From automating SEBI compliance to orchestrating enterprise-grade Knowledge Graphs, my work is centered on <span className="text-foreground/80">absolute systemic integrity</span>.
            </p>
          </div>
        </div>

        {/* Technical Manifesto */}
        <section className="relative z-10 w-full space-y-12 mb-64">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <div className="space-y-4">
              <h2 className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.5em]">The Manifest</h2>
              <p className="text-4xl font-black uppercase tracking-tighter">Technical Toolkit</p>
            </div>
            <p className="text-foreground/20 text-xs font-mono uppercase tracking-[0.2em] max-w-xs text-left md:text-right">
              System architecture requiring a highly orchestrated stack of technologies for scalable intelligence.
            </p>
          </div>

          <div className="border-t border-foreground/10">
            {TECHNICAL_TOOLKIT.map((item, i) => (
              <ManifestRow
                key={i}
                index={item.index}
                title={item.title}
                skills={item.list}
                delay={i * 0.1}
              />
            ))}
          </div>
        </section>

        {/* Validation Section */}
        <section className="relative z-10 w-full space-y-24 mb-32">
          <div className="flex items-center gap-8 mb-16">
            <h2 className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.5em] shrink-0">Validation</h2>
            <div className="h-px w-full bg-foreground/10" />
          </div>

          <div className="space-y-16">
            {VALIDATION_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group py-8 border-b border-foreground/5"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-widest group-hover:italic transition-all">{stat.title}</h3>
                  <p className="text-xs text-foreground/30 uppercase tracking-widest font-mono">{stat.metric}</p>
                </div>
                <p className="text-foreground/40 text-sm max-w-sm font-light">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
