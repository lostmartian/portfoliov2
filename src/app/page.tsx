'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/ui/AnimatedText';
import MagneticButton from '@/components/ui/MagneticButton';
import GameOfLife from '@/components/ui/GameOfLife';
import GradientDescent from '@/components/ui/GradientDescent';
import GradientControls from '@/components/ui/GradientControls';
import NeuralSearch from '@/components/ui/NeuralSearch';
import BackgroundSwitcher from '@/components/ui/BackgroundSwitcher';
import SimulationLegend from '@/components/ui/SimulationLegend';
import { ArrowRight, Code, Zap, Globe, Cpu, Database, Layout, Server, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const skills = [
  { icon: Layout, title: 'Frontend Architecture', description: 'React, Next.js, Tailwind CSS, Framer Motion' },
  { icon: Server, title: 'Backend Systems', description: 'Node.js, Python, Go, PostgreSQL, Redis' },
  { icon: Cpu, title: 'AI Integration', description: 'LLMs, RAG, LangChain, Vector Databases' },
  { icon: Globe, title: 'Cloud Infrastructure', description: 'AWS, Docker, Kubernetes, Terraform' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [bgMode, setBgMode] = useState<'life' | 'gradient' | 'neural'>('life');
  const [learningRate, setLearningRate] = useState(0.05);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary)] overflow-x-hidden selection:bg-[var(--neon-cyan)] selection:text-black">
      <Header />
      <BackgroundSwitcher currentMode={bgMode} onSwitch={setBgMode} />
      <AnimatePresence>
        {bgMode === 'gradient' && (
          <GradientControls learningRate={learningRate} onChange={setLearningRate} />
        )}
      </AnimatePresence>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Background Elements */}
          <div className="hidden md:block absolute inset-0">
            <AnimatePresence mode="wait">
              {bgMode === 'life' ? (
                <motion.div
                  key="life"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <GameOfLife />
                </motion.div>
              ) : bgMode === 'gradient' ? (
                <motion.div
                  key="gradient"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <GradientDescent learningRate={learningRate} />
                </motion.div>
              ) : (
                <motion.div
                  key="neural"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <NeuralSearch />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          {/* Hero Content - Conditionally Rendered */}
          <AnimatePresence mode="wait">
            {bgMode === 'life' ? (
              <motion.div
                key="hero-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center px-4 max-w-4xl mx-auto"
              >
                <div className="mb-6 inline-block">
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--glass-highlight)] border border-[var(--glass-border)] text-[var(--neon-cyan)] shadow-[0_0_20px_rgba(0,180,216,0.2)] flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Open to Opportunities
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-center leading-tight">
                  <AnimatedText text="Full-Stack Engineer" className="block text-[var(--text-primary)] drop-shadow-lg mx-auto mb-2" />
                  <AnimatedText text="& AI Architect" className="block bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-purple)] animate-gradient mx-auto" delay={0.1} />
                </h1>

                <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-3xl mx-auto leading-relaxed">
                  Building intelligent systems that blend{' '}
                  <span className="text-[var(--neon-cyan)] font-semibold">cutting-edge AI</span>,{' '}
                  <span className="text-[var(--neon-purple)] font-semibold">scalable architecture</span>, and{' '}
                  <span className="text-[var(--neon-pink)] font-semibold">elegant design</span>
                  {' '}to solve complex problems at scale.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <MagneticButton>
                    <a href="#projects" className="px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-deep)] rounded-full font-bold hover:bg-[var(--neon-cyan)] transition-colors flex items-center gap-2">
                      View Projects <ArrowRight size={20} />
                    </a>
                  </MagneticButton>

                  <MagneticButton>
                    <a href="mailto:sahilgangurde73@gmail.com" className="px-8 py-4 glass-panel border border-[var(--glass-border)] rounded-full font-bold hover:border-[var(--neon-purple)] hover:text-[var(--neon-purple)] transition-all flex items-center gap-2">
                      <Mail size={18} /> Get in Touch
                    </a>
                  </MagneticButton>
                </div>
              </motion.div>
            ) : (
              <SimulationLegend key="legend" mode={bgMode as 'gradient' | 'neural'} />
            )}
          </AnimatePresence>
        </section>

        {/* Skills Section - What I Build */}
        <section className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold font-elegant mb-6 text-[var(--text-primary)]">
                What I Build
              </h2>
              <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                From intelligent AI systems to scalable cloud architectures, I craft solutions that push the boundaries of what's possible.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card group p-8 rounded-3xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--neon-cyan)]/10 to-[var(--neon-purple)]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <skill.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--neon-cyan)] transition-colors">
                          {skill.title}
                        </h3>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                          {skill.description}
                        </p>
                      </div>
                    </div>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {index === 0 && ['React', 'Next.js', 'Tailwind', 'WebGL'].map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--glass-highlight)] text-[var(--neon-cyan)] border border-[var(--glass-border)]">
                          {tech}
                        </span>
                      ))}
                      {index === 1 && ['LLMs', 'RAG', 'LangChain', 'OpenCV'].map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--glass-highlight)] text-[var(--neon-purple)] border border-[var(--glass-border)]">
                          {tech}
                        </span>
                      ))}
                      {index === 2 && ['AWS', 'Docker', 'Microservices', 'CI/CD'].map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--glass-highlight)] text-[var(--neon-blue)] border border-[var(--glass-border)]">
                          {tech}
                        </span>
                      ))}
                      {index === 3 && ['Go', 'Python', 'PostgreSQL', 'MongoDB'].map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--glass-highlight)] text-[var(--neon-pink)] border border-[var(--glass-border)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 px-6 bg-gradient-to-b from-transparent to-[var(--glass-highlight)]">
          <div className="max-w-4xl mx-auto text-center glass-card p-16 rounded-3xl">
            <h2 className="text-4xl md:text-6xl font-bold font-elegant mb-6 text-[var(--text-primary)]">
              Ready to Collaborate?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
              Let's create something extraordinary together.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <MagneticButton>
                <a
                  href="mailto:sahilgangurde08@gmail.com"
                  className="inline-flex items-center px-10 py-5 bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] font-bold rounded-full hover:bg-[var(--glass-highlight)] hover:border-[var(--neon-purple)] transition-all shadow-lg backdrop-blur-md"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Get in Touch
                </a>
              </MagneticButton>
            </div>
          </div>
        </section >
      </main >

      <Footer />
    </div >
  );
}