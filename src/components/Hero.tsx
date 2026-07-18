import { CONTACT_DATA } from "@/config/contact";

export default function Hero() {
  return (
    <section className="py-12 md:py-16 space-y-6">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
        Full-Stack AI &amp; Backend Engineer
      </h1>

      <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
        I am a software engineer with <strong className="font-semibold text-foreground">2+ years of professional experience</strong>.
        I build robust backend engines and intelligent AI systems, specializing in financial settlement systems,
        intelligent knowledge graphs, enterprise AI governance portals, and multi-tenant SaaS infrastructures
        where precision and systemic integrity are absolute requirements.
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-foreground/50 uppercase tracking-wider font-mono">
        <div>
          <span className="font-bold text-foreground/40 mr-1">Location:</span> Pune, India
        </div>
        <div>
          <span className="font-bold text-foreground/40 mr-1">Focus:</span> AI / Backend / Cloud
        </div>
      </div>

      <div className="pt-2 flex flex-wrap gap-4 text-sm">
        <a
          href={CONTACT_DATA.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-foreground text-background rounded font-medium hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </a>
        <a
          href="https://www.omaratechnologies.com/en"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-border rounded hover:bg-foreground/5 transition-colors"
        >
          Omara Technologies ↗
        </a>
        <a
          href="https://blimze.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-border rounded hover:bg-foreground/5 transition-colors"
        >
          Blimze ↗
        </a>
      </div>
    </section>
  );
}
