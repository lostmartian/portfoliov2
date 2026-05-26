import { CONTACT_DATA } from "@/config/contact";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader 
        title="Get in Touch"
        subtitle="Inquiries / Network"
        description="Currently accepting new inquiries and technical collaborations for mission-critical systems."
      />

      <main className="max-w-7xl mx-auto w-full px-8 sm:px-16 space-y-16 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div className="group">
              <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-[0.3em] mb-3">Electronic Mail</p>
              <a href={`mailto:${CONTACT_DATA.email}`} className="text-xl font-light text-foreground/70 hover:text-foreground transition-colors border-b border-foreground/5 hover:border-foreground/20 pb-1">
                {CONTACT_DATA.displayEmail}
              </a>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-[0.3em]">Network</p>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <a href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-light text-foreground/50 hover:text-foreground transition-colors">
                    LinkedIn ↗
                  </a>
                  <a href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer" className="text-sm font-light text-foreground/50 hover:text-foreground transition-colors">
                    GitHub ↗
                  </a>
                  <a href={CONTACT_DATA.twitter} target="_blank" rel="noopener noreferrer" className="text-sm font-light text-foreground/50 hover:text-foreground transition-colors">
                    X / Twitter ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-3">
              <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-[0.3em]">Operational Focus</p>
              <p className="text-sm font-light text-foreground/50 leading-relaxed max-w-sm">
                Collaborating with founders and enterprise teams to architect <span className="text-foreground/80">robust digital products</span>, intelligent AI workflows, and scalable systems. Currently open to select freelance engagements and strategic consulting.
              </p>
            </div>

            <div className="flex gap-16">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-[0.3em]">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                  <p className="text-sm font-light text-foreground/50">{CONTACT_DATA.status}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-[0.3em]">Location</p>
                <p className="text-sm font-light text-foreground/50">{CONTACT_DATA.location}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
