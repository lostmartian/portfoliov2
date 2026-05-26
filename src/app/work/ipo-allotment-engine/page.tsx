import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/Work/BackButton";

export default function IPOAllotmentPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-8 pt-32 pb-64 sm:px-16">
        {/* Master Header */}
        <div className="relative mb-32">
          <BackButton label="Back to System" fallback="/work" />

          <div className="space-y-6">
            <p className="text-[11px] text-foreground/40 uppercase tracking-[0.8em] font-mono font-bold">
              Institutional / SEBI Compliance
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.8] break-words">
              Allotment<span className="text-foreground/10">Engine</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/40 font-light max-w-2xl tracking-tight leading-tight">
              A high-precision processing core for automated IPO basis of allotment and regulatory auditing.
            </p>
          </div>

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 py-12 border-y border-foreground/5">
            <div className="space-y-2">
              <p className="text-[9px] text-foreground/20 uppercase tracking-widest font-bold">Timeline</p>
              <p className="font-mono text-sm">2023 — 2024</p>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] text-foreground/20 uppercase tracking-widest font-bold">Role</p>
              <p className="font-mono text-sm">Full Stack Engineer</p>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] text-foreground/20 uppercase tracking-widest font-bold">Precision</p>
              <p className="font-mono text-sm">100.00% Audit-ready</p>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] text-foreground/20 uppercase tracking-widest font-bold">Infrastructure</p>
              <p className="font-mono text-sm">PostgreSQL / Node.js / TS</p>
            </div>
          </div>
        </div>

        {/* Master Hero */}
        <div className="relative w-full aspect-[21/9] rounded-sm overflow-hidden mb-64 group bg-grey-900">
          <Image
            src="/projects/ipo-datagrid.png"
            alt="IPO Allotment Engine"
            fill
            className="object-cover opacity-60 scale-105 group-hover:scale-100 transition-all duration-300 duration-[2000ms] ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12">
            <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">Fig 01. // Basis of Allotment Grid Interface</p>
          </div>
        </div>

        {/* Narrative Chapters */}
        <div className="space-y-80">

          {/* Chapter 01: The Regulatory Problem */}
          <section className="relative">
            <div className="absolute left-0 -top-32 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none">01</div>
            <div className="flex flex-col md:flex-row gap-24 items-start relative z-10">
              <div className="w-full md:w-1/3 pt-4">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] border-l-4 border-foreground pl-6">The Mandate</h2>
              </div>
              <div className="w-full md:w-2/3 space-y-12">
                <p className="text-4xl md:text-6xl font-light leading-[1.05] tracking-tighter text-foreground">
                  Engineering <span className="text-foreground/30 italic">absolute precision</span> in a world of massive data surges.
                </p>
                <div className="space-y-8 max-w-xl">
                  <p className="text-xl text-foreground/70 leading-relaxed font-light">
                    Processing IPO bid data at scale is a mission-critical operation where even a 0.01% error margin is unacceptable under SEBI ICDR regulations.
                  </p>
                  <p className="text-lg text-foreground/40 leading-relaxed">
                    The challenge was to replace manual, error-prone verification with an automated, high-performance engine capable of handling millions of bids while generating an immutable audit trail for the exchanges.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 02: Technical Ledger */}
          <section className="relative">
            <div className="absolute right-0 -top-32 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none">02</div>
            <div className="space-y-24 relative z-10">
              <div className="flex flex-col md:flex-row gap-24">
                <div className="w-full md:w-1/3">
                  <h2 className="text-sm font-black uppercase tracking-[0.4em] border-l-4 border-foreground pl-6">Infrastructure</h2>
                  <p className="mt-8 text-[10px] font-mono text-foreground/30 uppercase leading-relaxed tracking-widest">
                    Scalable Data Processing<br />Regulatory Auditing
                  </p>
                </div>
                <div className="w-full md:w-2/3 space-y-12">
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tight">The Ledger Architecture</h3>
                  <p className="text-xl text-foreground/60 leading-relaxed">
                    We architected a high-concurrency pipeline that automates the entire Basis of Allotment lifecycle—from raw bid ingestion to final document generation.
                  </p>
                </div>
              </div>

              {/* Technical Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="p-12 border border-foreground/5 bg-foreground/[0.01] space-y-6 hover:bg-foreground/[0.03] transition-colors group">
                  <h4 className="text-lg font-bold uppercase tracking-tight group-hover:italic transition-all duration-300">Precision Allotment Logic</h4>
                  <p className="text-foreground/40 leading-relaxed text-sm">
                    Engineered complex proportional allotment algorithms that strictly follow SEBI mandates, ensuring fair distribution across all categories (Retail, QIB, NII).
                  </p>
                </div>
                <div className="p-12 border border-foreground/5 bg-foreground/[0.01] space-y-6 hover:bg-foreground/[0.03] transition-colors group">
                  <h4 className="text-lg font-bold uppercase tracking-tight group-hover:italic transition-all duration-300">PAN-level Verification</h4>
                  <p className="text-foreground/40 leading-relaxed text-sm">
                    Implemented high-speed filtering to detect and eliminate duplicate applications based on PAN and DPID records, maintaining 100% data integrity.
                  </p>
                </div>
                <div className="p-12 border border-foreground/5 bg-foreground/[0.01] space-y-6 hover:bg-foreground/[0.03] transition-colors group">
                  <h4 className="text-lg font-bold uppercase tracking-tight group-hover:italic transition-all duration-300">Immutable Audit Vault</h4>
                  <p className="text-foreground/40 leading-relaxed text-sm">
                    Developed a specialized logging layer in PostgreSQL that captures every decision point, providing a complete, transparent audit trail for regulatory inspection.
                  </p>
                </div>
                <div className="p-12 border border-foreground/5 bg-foreground/[0.01] space-y-6 hover:bg-foreground/[0.03] transition-colors group">
                  <h4 className="text-lg font-bold uppercase tracking-tight group-hover:italic transition-all duration-300">Automated Document Generation</h4>
                  <p className="text-foreground/40 leading-relaxed text-sm">
                    Built an automated 'Basis of Allotment' generation engine, reducing a traditionally manual multi-day process to just seconds of processing time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 03: The AI-First Mandate in Finance */}
          <section className="relative">
            <div className="absolute left-0 -top-32 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none">03</div>
            <div className="max-w-4xl mx-auto space-y-24 relative z-10 text-center md:text-left">
              <div className="space-y-8">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] border-l-4 border-foreground pl-6 md:mx-0 mx-auto w-fit">Philosophy</h2>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                  Beyond Code: <br /> The <span className="text-foreground/20 italic font-light">AI-First</span> Integrity.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
                <div className="space-y-8">
                  <p className="text-xl text-foreground/80 leading-relaxed font-light">
                    In financial engineering, my philosophy is that <span className="text-foreground font-medium">Compliance must be automated to be absolute.</span>
                  </p>
                  <p className="text-lg text-foreground/40 leading-relaxed">
                    I apply an AI-first lens even to purely logical systems by treating every regulatory rule as a data-constraint that can be optimized and verified. This ensures that the system doesn't just "calculate"—it "governs" the data it touches.
                  </p>
                </div>
                <div className="space-y-8 pt-4">
                  <div className="p-8 border border-foreground/5 bg-foreground/[0.02] rounded-2xl space-y-4">
                    <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Philosophy // 01</p>
                    <p className="text-sm italic text-foreground/60">"Manual oversight is a bug; automated integrity is the feature."</p>
                  </div>
                  <div className="p-8 border border-foreground/5 bg-foreground/[0.02] rounded-2xl space-y-4">
                    <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Philosophy // 02</p>
                    <p className="text-sm italic text-foreground/60">"Absolute precision is the only currency that matters in finance."</p>
                  </div>
                </div>
              </div>

              <p className="text-2xl text-foreground/90 leading-relaxed italic border-t border-foreground/10 pt-16 text-center">
                The Allotment Engine is a testament to how architectural rigor and an AI-first mindset can transform high-stakes regulatory hurdles into seamless, scalable infrastructure.
              </p>
            </div>
          </section>

        </div>

        {/* Master Project Navigation (Minimalist) */}
        <div className="mt-80 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between py-12 group/nav">
          <Link
            href="/work/stellar-interface"
            className="flex flex-col md:items-start group py-8"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/20 mb-2 group-hover:text-foreground/40 transition-colors">Previous</span>
            <span className="text-sm font-mono text-foreground/40 group-hover:text-foreground transition-colors flex items-center gap-2">
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Stellar Interface
            </span>
          </Link>

          <Link
            href="/#work"
            className="py-8 text-[9px] uppercase tracking-[0.8em] text-foreground/10 hover:text-foreground transition-colors"
          >
            Index
          </Link>

          <Link
            href="/work/farsight"
            className="flex flex-col md:items-end group py-8"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/20 mb-2 group-hover:text-foreground/40 transition-colors">Next</span>
            <span className="text-sm font-mono text-foreground/40 group-hover:text-foreground transition-colors flex items-center gap-2">
              Farsight
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
