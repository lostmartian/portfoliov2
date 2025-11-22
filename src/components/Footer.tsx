'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/lostmartian', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/lostmartian/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:sahilgangurde08@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative py-20 overflow-hidden border-t border-[var(--glass-border)] bg-[var(--bg-deep)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-elegant mb-6 text-[var(--text-primary)]">
              Let's Build the Future
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-8">
              Open to new opportunities and collaborations.
            </p>
          </motion.div>

          <div className="flex gap-4 mb-16"> {/* Added mb-16 back for spacing */}
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full glass-panel hover:bg-[var(--glass-highlight)] transition-all duration-300 hover:scale-110 group"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Sahil Gangurde. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link href="/experience" className="hover:text-white transition-colors">Experience</Link>
          </div>

          <p className="text-gray-600 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> and Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
