'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Heart, Terminal, Coffee } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);

  useEffect(() => {
    fetch('https://official-joke-api.appspot.com/jokes/programming/random')
      .then(res => res.json())
      .then(data => setJoke(data[0]))
      .catch(err => console.error('Failed to fetch joke:', err));
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/lostmartian', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/lostmartian/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:sahilgangurde08@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden bg-[var(--bg-deep)] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20">

          {/* Brand Section (Left) */}
          <div className="md:col-span-12 lg:col-span-5 space-y-8">
            <Link href="/" className="text-2xl font-black font-elegant tracking-tight text-[var(--text-primary)] flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="tracking-[-0.03em]">lostmartian<span className="text-white/20">.in</span></span>
            </Link>
            <p className="text-slate-400 leading-relaxed font-body text-base max-w-sm">
              An elite development shop merging deep AI research with
              production-grade software engineering to build the next generation of products.
            </p>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Navigation (Center) */}
          <div className="md:col-span-6 lg:col-span-3 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Projects'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-slate-300 hover:text-cyan-400 transition-colors font-body text-sm flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-cyan-400 group-hover:w-4 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect (Right) */}
          <div className="md:col-span-6 lg:col-span-3 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Connect</h3>
            <div className="flex flex-col gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group"
                  aria-label={social.label}
                >
                  <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 transition-all">
                    <social.icon size={14} />
                  </div>
                  <span className="text-sm font-body">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Daily Bit (Subtle) */}
        {joke && (
          <div className="mb-12 py-4 text-center">
            <p className="text-xs text-slate-500 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <span className="flex items-center gap-2 text-cyan-500/60 font-black uppercase tracking-[0.2em]">
                <Coffee size={14} /> Daily Bit
              </span>
              <span className="italic font-medium text-slate-500/80">"{joke.setup}"</span>
              <span className="text-cyan-400/80 font-bold">— {joke.punchline}</span>
            </p>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
              © {currentYear} Sahil Gangurde
            </p>
          </div>

          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            Built with <Heart size={10} className="text-rose-500 fill-rose-500 animate-pulse" /> on the Edge
          </p>
        </div>
      </div>
    </footer>
  );
}
