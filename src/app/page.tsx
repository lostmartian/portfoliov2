'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/ui/AnimatedText';
import MagneticButton from '@/components/ui/MagneticButton';
import LogoBand from '@/components/ui/LogoBand';
import ExpertiseSection from '@/components/ui/ExpertiseSection';
import { ArrowRight, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary)] overflow-x-hidden selection:bg-[var(--neon-cyan)] selection:text-black">
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen md:h-screen flex flex-col justify-between overflow-hidden pb-8">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] animate-grid-drift" />
          <div className="scanning-beam" />

          <div className="flex-1"></div>

          <div className="flex-shrink-0 flex items-center justify-center relative z-10 w-full py-12 md:py-16">
            <AnimatePresence mode="wait">
              <motion.div
                key="hero-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center px-4 max-w-5xl mx-auto"
              >
                <div className="mb-6 inline-block">
                  <span className="px-5 py-2 rounded-full text-sm font-semibold bg-[var(--glass-highlight)] border border-[var(--glass-border)] text-[var(--neon-cyan)] shadow-[0_0_20px_rgba(0,180,216,0.15)] flex items-center gap-2.5 backdrop-blur-md">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    Available for New Projects
                  </span>
                </div>

                <h1 className="h1 mb-6 tracking-tight text-center leading-[1.05]">
                  <AnimatedText text="Engineering the Future" className="block text-[var(--text-primary)] drop-shadow-xl mx-auto mb-2" />
                  <AnimatedText text="with AI & Scale" className="block bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-purple)] animate-gradient mx-auto" delay={0.1} />
                </h1>

                <p className="text-body-large text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
                  We are <span className="text-[var(--text-primary)] font-bold">lostmartian</span>. A high-stakes development shop that blends{' '}
                  <span className="text-[var(--neon-cyan)] font-semibold">elite AI engineering</span> with{' '}
                  <span className="text-[var(--neon-purple)] font-semibold">robust architecture</span>
                  {' '}to turn complex visions into market-ready products.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <MagneticButton>
                    <a href="/projects" className="px-10 py-4 bg-[var(--text-primary)] text-[var(--bg-deep)] rounded-full font-bold hover:bg-[var(--neon-cyan)] transition-shadow hover:shadow-[0_0_30px_rgba(64,224,208,0.4)] flex items-center gap-2">
                      View Projects <ArrowRight size={20} />
                    </a>
                  </MagneticButton>

                  <MagneticButton>
                    <a href="mailto:sahilgangurde73@gmail.com" className="px-10 py-4 glass-panel border border-[var(--glass-border)] rounded-full font-bold hover:border-[var(--neon-purple)] hover:text-[var(--neon-purple)] transition-all flex items-center gap-2">
                      <Mail size={18} /> Get in Touch
                    </a>
                  </MagneticButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex-1"></div>

          <div className="relative z-10 w-full flex-shrink-0">
            <LogoBand />
          </div>
        </section>

        {/* Expertise Section */}
        <ExpertiseSection />

        {/* CTA Section */}
        <section className="relative py-32 px-6">
          <div className="max-w-4xl mx-auto relative group">
            {/* Background Orbs */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative text-center p-12 md:p-20 border border-white/5 bg-white/[0.01] rounded-[2rem] backdrop-blur-sm overflow-hidden">
              {/* Internal Scanning Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-1/2 animate-scan" style={{ animation: 'scan 4s linear infinite' }} />
              </div>

              <div className="relative z-10">
                <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-8">
                  Collaboration
                </div>

                <h2 className="text-4xl md:text-6xl font-elegant text-white mb-8 tracking-tight">
                  Ready to build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">something extraordinary?</span>
                </h2>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-body leading-relaxed">
                  Whether you have a fully-fleshed idea or just a spark of inspiration,
                  we combine technical excellence with strategic vision to bring it to life.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <MagneticButton>
                    <a
                      href="mailto:sahilgangurde08@gmail.com"
                      className="group relative inline-flex items-center px-12 py-5 bg-white text-black font-bold rounded-full transition-all hover:pr-14 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Mail className="w-5 h-5" />
                        Start a Project
                      </span>
                      <ArrowRight className="absolute right-6 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}