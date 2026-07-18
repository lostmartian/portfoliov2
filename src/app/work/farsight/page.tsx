import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farsight",
  description: "The central governance and intelligence portal orchestrating an enterprise-grade AI data ecosystem.",
};

export default function FarsightPage() {
  return (
    <div className="space-y-8 font-sans">
      {/* Header Block */}
      <div className="space-y-4">
        <Link 
          href="/work" 
          className="text-xs font-mono text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          ← Return to Work
        </Link>

        <header className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold block">
            Omara Technologies
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Farsight
          </h1>
          <p className="text-sm text-foreground/50 leading-relaxed font-sans font-light">
            The central governance and intelligence portal orchestrating an enterprise-grade AI data ecosystem.
          </p>
        </header>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-border/40 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Timeline</span>
            <span className="text-foreground/80 font-medium">Oct 2024 — Jan 2025</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Role</span>
            <span className="text-foreground/80 font-medium">Fullstack AI Engineer</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Core Stack</span>
            <span className="text-foreground/80 font-medium">Go / Python / Next.js</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Infrastructure</span>
            <span className="text-foreground/80 font-medium">AWS / Neo4j / LangGraph</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="space-y-2">
        <div className="relative w-full aspect-[16/9] rounded border border-border/40 overflow-hidden bg-foreground/[0.02]">
          <Image
            src="/projects/farsight-score.png"
            alt="Farsight GT Scoring Intelligence Dashboard"
            fill
            className="object-cover"
            priority
          />
        </div>
        <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider text-center">
          Fig 01. // GT Scoring Intelligence Dashboard
        </p>
      </div>

      {/* Content Flow */}
      <div className="space-y-8">
        {/* Section 01: The Thesis */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
            The Thesis
          </h2>
          <p className="text-base font-light leading-relaxed text-foreground italic border-l-2 border-border/40 pl-4">
            Transforming <span className="text-foreground/50 italic">dark data</span> into actionable intelligence through systematic governance.
          </p>
          <div className="text-sm text-foreground/80 leading-relaxed text-justify space-y-3 pt-1">
            <p>
              At Omara Technologies, I spearheaded the development of high-impact platforms designed to bridge the gap between LLM-driven automation and robust enterprise infrastructure.
            </p>
            <p>
              Farsight acts as the central brain—orchestrating Knowledge Graph generation (DocuNexus) and highly scalable human-in-the-loop (HITL) workflows through a unified documentation and management portal.
            </p>
          </div>
        </section>

        <hr className="border-border/40" />

        {/* Section 02: DocuNexus */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
            DocuNexus
          </h2>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">The "Brain" of Document Intelligence</h3>
            <p className="text-sm text-foreground/80 leading-relaxed text-justify">
              DocuNexus is a platform designed to extract, analyze, and visualize relationships within massive PDF repositories by converting them into structured Knowledge Graphs using Gemini 1.5 Pro and Neo4j.
            </p>
          </div>

          <div className="space-y-2 pt-2 text-sm text-foreground/80">
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground/80">Agentic Search Workflows:</span>{" "}
                <span className="text-foreground/60">Implemented complex search agents using LangGraph for multi-step reasoning and deep document retrieval.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground/80">NL-to-Cypher Engine:</span>{" "}
                <span className="text-foreground/60">Engineered a Natural Language to Cypher query engine to query complex graph data using plain English.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground/80">Relational Discovery:</span>{" "}
                <span className="text-foreground/60">Automated extraction of relationships, discovering hidden links across disparate legal and financial document sets.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground/80">Cloud-Native Sync:</span>{" "}
                <span className="text-foreground/60">Built ingestion pipelines for AWS S3 and Google Drive for seamless document synchronization.</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border/40" />

        {/* Section 03: Labeling Platform */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
            Labeling Platform
          </h2>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">The Infrastructure for High-Precision Data</h3>
            <p className="text-sm text-foreground/80 leading-relaxed text-justify">
              To power high-stakes AI models, I built the Enterprise Labelling Platform—a comprehensive system for managing large-scale document annotation tasks with a focus on consensus, accuracy, and throughput.
            </p>
          </div>

          <div className="space-y-2 pt-2 text-sm text-foreground/80">
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground/80">Scalable Task Distribution:</span>{" "}
                <span className="text-foreground/60">Developed custom Go backend engine supporting Parallel and Series tasks for sequential consensus reviews.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground/80">Consensus &amp; Arbitration:</span>{" "}
                <span className="text-foreground/60">Implemented automated consensus layer identifying agreement using distance metrics with an SME Arbitration Hub.</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border/40" />

        {/* Section 04: Reliability Engineering */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
            Reliability Engineering
          </h2>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">Data-Centric over Model-Centric</h3>
            <p className="text-sm text-foreground/80 leading-relaxed text-justify">
              I pioneered a Data-Centric approach, recognizing that the biggest gains in AI performance came from improving training data quality via our proprietary Ground Truth (GT) Scoring Framework.
            </p>
          </div>

          <div className="space-y-2 pt-2 text-sm text-foreground/80">
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground/80">Reliability:</span>{" "}
                <span className="text-foreground/60">Utilized statistical methods like Cohen's Kappa to ensure scientifically rigorous annotator agreement.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground/80">Precision:</span>{" "}
                <span className="text-foreground/60">Calculated field-level precision and recall, securing near-zero error rates on mission-critical legal financials.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground/80">Loops:</span>{" "}
                <span className="text-foreground/60">Developed closed-loop feedback systems where review-stage model edge cases fed back into training sets.</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border/40" />

        {/* Section 05: Ending Notes */}
        <section className="space-y-4">
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
              Ending Notes
            </h2>
            <h3 className="text-sm font-semibold text-foreground">Beyond Engineering: The AI-First Mandate</h3>
            <p className="text-sm text-foreground/80 leading-relaxed text-justify">
              In most organizations, AI is a layer added at the end. For me, Farsight was the proof that AI must be the foundation. This "AI-First" approach meant that every line of Go in the backend and every Neo4j schema was architected specifically to be consumed and enhanced by autonomous agents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 border border-border/40 rounded bg-foreground/[0.02] text-xs">
              <span className="font-mono text-foreground/40 uppercase block">Philosophy // 01</span>
              <p className="italic text-foreground/70 mt-1">"Don't build features for users; build intelligence engines that empower them."</p>
            </div>
            <div className="p-4 border border-border/40 rounded bg-foreground/[0.02] text-xs">
              <span className="font-mono text-foreground/40 uppercase block">Philosophy // 02</span>
              <p className="italic text-foreground/70 mt-1">"Data is noise until it's governed by Ground Truth."</p>
            </div>
          </div>

          <p className="text-sm font-light italic border-t border-border/40 pt-4 text-center text-foreground/60">
            Farsight stands as a testament to what happens when you stop treating AI as a tool and start treating it as the architect of the system itself.
          </p>
        </section>
      </div>
    </div>
  );
}
