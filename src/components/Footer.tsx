"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { CONTACT_DATA } from "@/config/contact";

const NavLink = ({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) => (
  <Link
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="group flex items-center gap-1 text-foreground/60 hover:text-foreground font-bold transition-colors py-1"
  >
    <span className="text-xs font-mono uppercase tracking-widest">{children}</span>
    {external && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />}
  </Link>
);

const FOOTER_CONTENT = {
  "/work": {
    mandate: "The Archive Protocol",
    quote: "“Systems are built to evolve, not just to exist.”",
    text: "Every project in this archive represents a specific milestone in technical evolution. I focus on building software that remains maintainable and precise as requirements shift.",
  },
  "/blogs": {
    mandate: "The Knowledge Graph",
    quote: "“Documentation is the highest form of engineering integrity.”",
    text: "My logs are a real-time stream of technical insights. I document my process to ensure that knowledge is preserved and refined through continuous writing.",
  },
  "default": {
    mandate: "Personal Mandate",
    quote: "“Architecture is governance, data is integrity, and intelligence is the foundation of everything I build.”",
    text: "My journey is about finding the convergence point where deep engineering meets high-fidelity design. I build mission-critical systems that feel human and precise.",
  }
};

export default function Footer() {
  const [time, setTime] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isContactPage = pathname === "/contact";

  // Dynamic content logic with prefix matching
  let content = FOOTER_CONTENT.default;
  if (pathname?.startsWith("/work")) {
    content = FOOTER_CONTENT["/work"];
  } else if (pathname?.startsWith("/blogs")) {
    content = FOOTER_CONTENT["/blogs"];
  }

  return (
    <footer className="w-full">
      {/* Philosophy Section - Dynamic */}
      {!isContactPage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-16 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 border-t border-foreground/10 flex flex-col items-center text-center">
          <div className="space-y-8 md:space-y-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
              <span className="text-[10px] font-mono text-foreground/50 uppercase tracking-[0.4em] font-bold">{content.mandate}</span>
            </div>

            <div className="space-y-6 md:space-y-12 max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight leading-[1.6] text-foreground/95 italic px-2">
                {content.quote}
              </h2>
              <p className="text-sm sm:text-base md:text-xl text-foreground/60 font-semibold tracking-tight leading-relaxed mx-auto max-w-3xl px-4">
                {content.text}
              </p>
            </div>

            <a
              href={`mailto:${CONTACT_DATA.email}`}
              className="group inline-flex items-center gap-6 px-10 md:px-12 py-4 md:py-5 bg-foreground text-background rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 active:scale-95 transition-all"
            >
              Initiate Contact
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      )}

      {/* Links & Legal Section with Background */}
      <div className={`relative w-full overflow-hidden bg-background ${
        isContactPage
          ? "border-t border-foreground/10 pt-16 md:pt-24 pb-8"
          : "border-t border-foreground/5 pt-16 md:pt-24 pb-8"
      }`}>
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-16 space-y-16 md:space-y-24 relative z-10 flex flex-col items-center text-center">
          {/* Detailed Links Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="space-y-6 flex flex-col items-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50">Navigation</h4>
              <div className="flex flex-col gap-2 items-center">
                <NavLink href="/work">Work</NavLink>
                <NavLink href="/blogs">Blogs</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </div>
            </div>

            <div className="space-y-6 flex flex-col items-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50">Systems</h4>
              <div className="flex flex-col gap-2 items-center">
                {/* <NavLink href="/work/ipo-allotment-engine">IPO Allotment Engine</NavLink> */}
                <NavLink href="/work/farsight">Farsight</NavLink>
              </div>
            </div>

            <div className="space-y-6 flex flex-col items-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50">Socials</h4>
              <div className="flex flex-col gap-2 items-center">
                <NavLink href={CONTACT_DATA.github} external>GitHub</NavLink>
                <NavLink href={CONTACT_DATA.linkedin} external>LinkedIn</NavLink>
                <NavLink href={CONTACT_DATA.twitter} external>X / Twitter</NavLink>
              </div>
            </div>

            <div className="space-y-6 flex flex-col items-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50">Status</h4>
              <div className="space-y-4 flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">Active</span>
                </div>
                <div className="text-[10px] font-mono text-foreground/50 space-y-1 uppercase tracking-tighter font-semibold">
                  <p>Location: {CONTACT_DATA.location}</p>
                  <p>Time: {time || "00:00:00 UTC"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal / Final Note */}
          <div className="w-full pt-8 border-t border-foreground/5 flex flex-col items-center gap-6">
            <div className="space-y-2 flex flex-col items-center">
              <p className="text-[10px] text-foreground/50 font-mono tracking-widest uppercase text-center font-bold">
                © 2026 SAHIL GANGURDE — Built for high-fidelity intelligence.
              </p>
            </div>
            <div className="flex items-center gap-8 text-[10px] font-black tracking-[0.4em] text-foreground/30 hover:text-foreground/60 transition-colors uppercase">
              End of Line
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
