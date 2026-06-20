import MonotoneShaderBackground from "./MonotoneShaderBackground";
import { CONTACT_DATA } from "@/config/contact";
import { MessageSquare } from "lucide-react";

const getCurrentQuarter = () => {
  const now = new Date();
  const quarter = Math.floor(now.getMonth() / 3) + 1;
  return `Q${quarter}_${now.getFullYear()}`;
};

export default function Hero() {
  const availability = getCurrentQuarter();

  return (
    <div className="relative flex flex-col min-h-[100dvh] overflow-hidden justify-center">
      <MonotoneShaderBackground />

      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-16 pt-32 pb-16 flex flex-col justify-center">
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">

          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-foreground/[0.04] border border-border/30 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/30 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground/80"></span>
            </span>
            <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-foreground/80 leading-none font-bold">
              PUNE, IN // STATUS: ACTIVE
            </p>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight leading-[1.02] text-foreground max-w-3xl">
            Full-Stack AI &amp; <br className="hidden sm:inline" />
            Backend Engineer.
          </h1>

          <p className="max-w-2xl text-foreground/90 text-base sm:text-lg md:text-xl font-normal leading-relaxed tracking-tight">
            I am a software engineer with <strong className="font-semibold text-foreground border-b border-foreground/35 pb-0.5">2+ years of professional experience</strong>. I build robust backend engines and intelligent AI systems where precision and systemic integrity are absolute requirements.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-mono text-foreground/50 uppercase tracking-widest pt-2 border-t border-border/10">
            <div className="space-y-1">
              <p className="text-foreground/45 font-bold">Core Focus</p>
              <p className="text-foreground font-semibold normal-case tracking-tight text-xs sm:text-sm">AI / Backend &amp; Cloud / UI</p>
            </div>
            <div className="h-8 w-px bg-border/10 hidden sm:block" />
            <div className="space-y-1">
              <p className="text-foreground/45 font-bold">Availability</p>
              <p className="text-foreground font-semibold normal-case tracking-tight text-xs sm:text-sm">{availability} / Available</p>
            </div>
          </div>

          {/* Companies worked with */}
          <div className="space-y-3 pt-6 border-t border-border/10">
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-foreground/40 font-bold">
              Collaboration history
            </p>
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs font-mono text-foreground/80 font-medium">
              <a
                href="https://www.omaratechnologies.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground border-b border-transparent hover:border-foreground/30 pb-0.5 transition-all duration-300"
              >
                Omara Technologies ↗
              </a>
              <span className="text-foreground/20">/</span>
              <a
                href="https://blimze.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground border-b border-transparent hover:border-foreground/30 pb-0.5 transition-all duration-300"
              >
                Blimze ↗
              </a>
              <span className="text-foreground/20">/</span>
              <a
                href="https://www.jrats.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground border-b border-transparent hover:border-foreground/30 pb-0.5 transition-all duration-300"
              >
                Jrats Studio ↗
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <a
              href={CONTACT_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
            >
              <span>Get in Touch</span>
              <MessageSquare className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
