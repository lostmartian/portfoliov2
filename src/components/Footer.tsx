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
    <footer className="relative pt-16 pb-8 overflow-hidden border-t border-[var(--glass-border)] bg-[var(--bg-deep)] mt-auto">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Main Columns */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

          {/* Brand Section (Left) */}
          <div className="max-w-sm space-y-4">
            <Link href="/" className="text-2xl font-bold font-elegant text-[var(--text-primary)] flex items-center gap-2">
              <Terminal className="text-[var(--neon-cyan)]" />
              <span>lostmartian<span className="text-[var(--text-muted)]">.in</span></span>
            </Link>
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
              Crafting digital experiences at the intersection of design, engineering, and artificial intelligence.
            </p>
          </div>

          {/* Navigation (Center) */}
          <div className="space-y-4 md:text-center">
            <h3 className="font-bold text-[var(--text-primary)]">Navigate</h3>
            <ul className="space-y-2 text-[var(--text-muted)] text-sm">
              <li><Link href="/" className="hover:text-[var(--neon-cyan)] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[var(--neon-cyan)] transition-colors">About</Link></li>
              <li><Link href="/projects" className="hover:text-[var(--neon-cyan)] transition-colors">Projects</Link></li>
            </ul>
          </div>

          {/* Connect (Right) */}
          <div className="space-y-4 md:text-right">
            <h3 className="font-bold text-[var(--text-primary)]">Connect</h3>
            <div className="flex flex-col md:items-end gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors text-sm group"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="group-hover:scale-110 transition-transform" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Daily Bit (Subtle) */}
        {joke && (
          <div className="mb-8 pt-8 border-t border-[var(--glass-border)]/50 text-center">
            <p className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <Coffee size={12} className="text-[var(--neon-pink)]" />
              <span className="font-medium">Daily Bit:</span>
              <span>"{joke.setup}"</span>
              <span className="text-[var(--neon-cyan)] italic">{joke.punchline}</span>
            </p>
          </div>
        )}

        {/* Bottom Bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${!joke ? 'border-t border-[var(--glass-border)] pt-8' : ''}`}>
          <p className="text-[var(--text-muted)] text-xs">
            © {currentYear} Sahil Gangurde. All rights reserved.
          </p>

          <p className="text-[var(--text-muted)] text-xs flex items-center gap-1">
            Made with <Heart size={10} className="text-red-500 fill-red-500" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
