import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/Work/BackButton";

export default function FarsightPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background transition-colors duration-300 overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-8 pt-32 pb-16 sm:px-16 md:pb-24">
        {/* Bespoke Header */}
        <div className="relative mb-32">
          <BackButton label="Back to System" fallback="/work" />

          <div className="space-y-6">
            <p className="text-[11px] text-foreground/40 uppercase tracking-[0.8em] font-mono font-bold">
              Omara Technologies
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.8] break-words">
              Far<span className="text-foreground/10">sight</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/40 font-light max-w-2xl tracking-tight leading-tight">
              The central governance and intelligence portal orchestrating an enterprise-grade AI data ecosystem.
            </p>
          </div>

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 py-12 border-y border-foreground/5">
            <div className="space-y-2">
              <p className="text-[9px] text-foreground/20 uppercase tracking-widest font-bold">Timeline</p>
              <p className="font-mono text-sm">Oct 2024 — Jan 2025</p>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] text-foreground/20 uppercase tracking-widest font-bold">Role</p>
              <p className="font-mono text-sm">Fullstack AI Software Engineer</p>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] text-foreground/20 uppercase tracking-widest font-bold">Core Stack</p>
              <p className="font-mono text-sm">Go / Python / Next.js</p>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] text-foreground/20 uppercase tracking-widest font-bold">Infrastructure</p>
              <p className="font-mono text-sm">AWS / Neo4j / LangGraph</p>
            </div>
          </div>
        </div>

        {/* Cinematic Hero */}
        <div className="relative w-full aspect-[21/9] rounded-sm overflow-hidden mb-64 group bg-grey-900">
          <Image
            src="/projects/farsight-score.png"
            alt="Farsight"
            fill
            className="object-cover opacity-60 scale-105 group-hover:scale-100 transition-all duration-[2000ms] ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12">
            <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">Fig 01. // GT Scoring Intelligence Dashboard</p>
          </div>
        </div>

        {/* Manual Content Flow */}
        <div className="space-y-80">

          {/* Section 01: The Core Thesis */}
          <section className="relative">
            <div className="absolute left-0 -top-32 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none">01</div>
            <div className="flex flex-col md:flex-row gap-24 items-start relative z-10">
              <div className="w-full md:w-1/3 pt-4">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] border-l-4 border-foreground pl-6">The Thesis</h2>
              </div>
              <div className="w-full md:w-2/3 space-y-12">
                <p className="text-4xl md:text-6xl font-light leading-[1.05] tracking-tighter text-foreground">
                  Transforming <span className="text-foreground/30 italic">dark data</span> into actionable intelligence through systematic governance.
                </p>
                <div className="space-y-8 max-w-xl">
                  <p className="text-xl text-foreground/70 leading-relaxed font-light">
                    At Omara Technologies, I spearheaded the development of high-impact platforms designed to bridge the gap between LLM-driven automation and robust enterprise infrastructure.
                  </p>
                  <p className="text-lg text-foreground/40 leading-relaxed">
                    Farsight acts as the central brain—orchestrating Knowledge Graph generation (DocuNexus) and highly scalable human-in-the-loop (HITL) workflows through a unified documentation and management portal.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 02: DocuNexus - The Knowledge Brain */}
          <section className="relative">
            <div className="absolute right-0 -top-32 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none">02</div>
            <div className="space-y-24 relative z-10">
              <div className="flex flex-col md:flex-row gap-24">
                <div className="w-full md:w-1/3">
                  <h2 className="text-sm font-black uppercase tracking-[0.4em] border-l-4 border-foreground pl-6">DocuNexus</h2>
                  <p className="mt-8 text-[10px] font-mono text-foreground/30 uppercase leading-relaxed tracking-widest">
                    Knowledge Graph Generation<br />Agentic AI Workflows
                  </p>
                </div>
                <div className="w-full md:w-2/3 space-y-12">
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tight">The "Brain" of Document Intelligence</h3>
                  <p className="text-xl text-foreground/60 leading-relaxed">
                    DocuNexus is a powerful platform designed to extract, analyze, and visualize relationships within massive PDF repositories by converting them into structured Knowledge Graphs using Gemini 1.5 Pro and Neo4j.
                  </p>
                </div>
              </div>

              {/* Technical Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="p-12 border border-foreground/5 bg-foreground/[0.01] space-y-6 hover:bg-foreground/[0.03] transition-colors group">
                  <h4 className="text-lg font-bold uppercase tracking-tight group-hover:italic transition-all">Agentic Search Workflows</h4>
                  <p className="text-foreground/40 leading-relaxed text-sm">
                    Implemented complex search agents using <span className="text-foreground/80">LangGraph</span>, allowing for multi-step reasoning and deep document retrieval that moves beyond simple semantic search.
                  </p>
                </div>
                <div className="p-12 border border-foreground/5 bg-foreground/[0.01] space-y-6 hover:bg-foreground/[0.03] transition-colors group">
                  <h4 className="text-lg font-bold uppercase tracking-tight group-hover:italic transition-all">NL-to-Cypher Engine</h4>
                  <p className="text-foreground/40 leading-relaxed text-sm">
                    Engineered a Natural Language to Cypher query engine, enabling users to query complex graph data using plain English by bridging LLM intent with Neo4j schema awareness.
                  </p>
                </div>
                <div className="p-12 border border-foreground/5 bg-foreground/[0.01] space-y-6 hover:bg-foreground/[0.03] transition-colors group">
                  <h4 className="text-lg font-bold uppercase tracking-tight group-hover:italic transition-all">Relational Discovery</h4>
                  <p className="text-foreground/40 leading-relaxed text-sm">
                    Automated the extraction of "first-class relationships," making it possible to discover hidden links across disparate document sets (Legal, Insurance, Healthcare).
                  </p>
                </div>
                <div className="p-12 border border-foreground/5 bg-foreground/[0.01] space-y-6 hover:bg-foreground/[0.03] transition-colors group">
                  <h4 className="text-lg font-bold uppercase tracking-tight group-hover:italic transition-all">Cloud-Native Sync</h4>
                  <p className="text-foreground/40 leading-relaxed text-sm">
                    Built robust ingestion pipelines for AWS S3 and Google Drive, ensuring seamless, scalable document synchronization for enterprise clients.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 03: The Enterprise Labelling Platform */}
          <section className="relative">
            <div className="absolute left-0 -top-32 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none">03</div>
            <div className="space-y-24 relative z-10">
              <div className="flex flex-col md:flex-row gap-24">
                <div className="w-full md:w-1/3">
                  <h2 className="text-sm font-black uppercase tracking-[0.4em] border-l-4 border-foreground pl-6">Labeling Platform</h2>
                  <p className="mt-8 text-[10px] font-mono text-foreground/30 uppercase leading-relaxed tracking-widest">
                    High-Concurrency Go Backend<br />Enterprise Workflow Orchestration
                  </p>
                </div>
                <div className="w-full md:w-2/3 space-y-12">
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tight">The Infrastructure for High-Precision Data</h3>
                  <p className="text-xl text-foreground/60 leading-relaxed">
                    To power high-stakes AI models, I built the Enterprise Labelling Platform—a comprehensive system for managing large-scale document annotation tasks with a focus on consensus, accuracy, and throughput.
                  </p>
                </div>
              </div>

              {/* Technical Architecture Block */}
              <div className="p-12 md:p-24 bg-foreground/[0.02] border border-foreground/10 rounded-3xl space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold italic tracking-tighter">Scalable Task Distribution</h4>
                    <p className="text-foreground/50 text-sm leading-relaxed">
                      Developed a custom Go-based engine supporting <span className="text-foreground font-bold italic">Parallel</span> and <span className="text-foreground font-bold italic">Series</span> distribution strategies. This allows for both high-throughput parallel cycles and strict sequential consensus reviews.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold italic tracking-tighter">Consensus & Arbitration</h4>
                    <p className="text-foreground/50 text-sm leading-relaxed">
                      Implemented an automated consensus layer that identifies agreement using distance metrics, with a specialized <span className="text-foreground font-bold italic">Arbitration Hub</span> for Subject Matter Expert (SME) conflict resolution.
                    </p>
                  </div>
                </div>

                <div className="pt-16 border-t border-foreground/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <p className="text-[10px] text-foreground/20 uppercase tracking-widest font-bold mb-2">Backend</p>
                    <p className="text-xs font-mono text-foreground/70">Go (Gin / GORM)</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground/20 uppercase tracking-widest font-bold mb-2">Database</p>
                    <p className="text-xs font-mono text-foreground/70">PostgreSQL JSONB</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground/20 uppercase tracking-widest font-bold mb-2">Frontend</p>
                    <p className="text-xs font-mono text-foreground/70">Next.js 15 / shadcn</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground/20 uppercase tracking-widest font-bold mb-2">Auth</p>
                    <p className="text-xs font-mono text-foreground/70">AWS Cognito RBAC</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 04: Data-Centric AI & GT Scoring */}
          <section className="relative">
            <div className="absolute right-0 -top-32 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none">04</div>
            <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
              <div className="space-y-6">
                <h2 className="text-xs uppercase tracking-[0.8em] text-foreground/20 font-bold">Reliability Engineering</h2>
                <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                  Data-Centric <br /> <span className="text-foreground/20 italic">over</span> Model-Centric
                </h3>
              </div>

              <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto">
                I pioneered a "Data-Centric" approach at Omara, realizing that the biggest gains in AI performance came from improving the quality of the training data through the proprietary **Ground Truth (GT) Scoring Framework**.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left pt-12">
                <div className="space-y-4">
                  <p className="text-xs font-mono text-foreground/20 uppercase tracking-widest font-bold">01 // Reliability</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Utilized statistical methods like **Cohen’s Kappa** to ensure that annotator agreement was scientifically rigorous, not accidental.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-mono text-foreground/20 uppercase tracking-widest font-bold">02 // Precision</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Built systems to calculate field-level precision and recall, ensuring mission-critical data (Financials/Legal) had near-zero error rates.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-mono text-foreground/20 uppercase tracking-widest font-bold">03 // Loops</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Developed "closed-loop" feedback systems where model edge cases identified in review were fed back into training sets.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 05: Ending Notes & Philosophy */}
          <section className="relative">
            <div className="absolute left-0 -top-32 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none">05</div>
            <div className="max-w-4xl mx-auto space-y-24 relative z-10">
              <div className="space-y-8">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] border-l-4 border-foreground pl-6">Ending Notes</h2>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                  Beyond Engineering: <br /> The <span className="text-foreground/20 italic font-light">AI-First</span> Mandate.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <p className="text-xl text-foreground/80 leading-relaxed font-light">
                    My time at Omara was defined by a single, uncompromising philosophy: <span className="text-foreground font-medium">Intelligence is the primary citizen.</span>
                  </p>
                  <p className="text-lg text-foreground/40 leading-relaxed">
                    In most organizations, AI is a layer added at the end. For me, Farsight was the proof that AI must be the foundation. This "AI-First" approach meant that every line of Go in the backend and every Neo4j schema was architected specifically to be consumed and enhanced by autonomous agents.
                  </p>
                </div>
                <div className="space-y-8 pt-4">
                  <div className="p-8 border border-foreground/5 bg-foreground/[0.02] rounded-2xl space-y-4">
                    <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Philosophy // 01</p>
                    <p className="text-sm italic text-foreground/60">"Don't build features for users; build intelligence engines that empower them."</p>
                  </div>
                  <div className="p-8 border border-foreground/5 bg-foreground/[0.02] rounded-2xl space-y-4">
                    <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Philosophy // 02</p>
                    <p className="text-sm italic text-foreground/60">"Data is noise until it's governed by Ground Truth."</p>
                  </div>
                </div>
              </div>

              <p className="text-2xl text-foreground/90 leading-relaxed italic border-t border-foreground/10 pt-16 text-center">
                Farsight stands as a testament to what happens when you stop treating AI as a tool and start treating it as the architect of the system itself.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
