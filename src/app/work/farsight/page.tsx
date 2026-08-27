import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farsight — AI Governance & Intelligence Portal | Sahil Gangurde",
  description:
    "The central governance and intelligence portal orchestrating an enterprise-grade AI data ecosystem by Sahil Gangurde.",
  alternates: {
    canonical: "https://lostmartian.in/work/farsight",
  },
  openGraph: {
    title: "Farsight — AI Governance & Intelligence Portal | Sahil Gangurde",
    description:
      "The central governance and intelligence portal orchestrating an enterprise-grade AI data ecosystem.",
    url: "https://lostmartian.in/work/farsight",
    siteName: "Sahil Gangurde | lostmartian",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "https://lostmartian.in/work/farsight/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Farsight | Sahil Gangurde",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farsight — AI Governance & Intelligence Portal | Sahil Gangurde",
    description:
      "The central governance and intelligence portal orchestrating an enterprise-grade AI data ecosystem.",
    creator: "@lost_martian_",
    site: "@lost_martian_",
    images: ["https://lostmartian.in/work/farsight/opengraph-image"],
  },
};

export default function FarsightPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Farsight — AI Governance & Intelligence Portal",
    description:
      "The central governance and intelligence portal orchestrating an enterprise-grade AI data ecosystem.",
    url: "https://lostmartian.in/work/farsight",
    author: {
      "@type": "Person",
      name: "Sahil Gangurde",
      url: "https://lostmartian.in",
    },
  };

  return (
    <div className="space-y-8 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header Block */}
      <div className="space-y-4">
        <Link 
          href="/work" 
          className="text-sm text-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1.5"
        >
          ← Return to Work
        </Link>

        <header className="space-y-1">
          <span className="text-sm text-accent font-semibold block">
            Omara Technologies
          </span>
          <h1 className="text-[1.75rem] sm:text-[2.4rem] font-bold tracking-tight leading-tight text-foreground">
            Farsight
          </h1>
          <p className="text-[15px] text-foreground/70 leading-relaxed max-w-xl">
            The central governance and intelligence portal orchestrating an enterprise-grade AI data ecosystem.
          </p>
        </header>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-border/60 divide-x divide-border/40 [&>div]:px-4 [&>div:first-child]:pl-0">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-foreground/45 block">Timeline</span>
            <span className="text-sm text-foreground/85 font-medium">Oct 2024 — Jan 2025</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-foreground/45 block">Role</span>
            <span className="text-sm text-foreground/85 font-medium">Fullstack AI Engineer</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-foreground/45 block">Core Stack</span>
            <span className="text-sm text-foreground/85 font-medium">Go / Python / Next.js</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-foreground/45 block">Infrastructure</span>
            <span className="text-sm text-foreground/85 font-medium">AWS / Neo4j / LangGraph</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="space-y-2">
        <div className="relative w-full aspect-[16/9] rounded border border-border overflow-hidden bg-foreground/[0.02]">
          <Image
            src="/projects/farsight-score.png"
            alt="Farsight GT Scoring Intelligence Dashboard"
            fill
            className="object-cover"
            priority
          />
        </div>
        <p className="text-xs text-foreground/45 text-center">
          Fig 01. // GT Scoring Intelligence Dashboard
        </p>
      </div>

      {/* Content Flow */}
      <div className="space-y-8">
        {/* Section 01: The Thesis */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
            The Thesis
          </h2>
          <p className="text-lg leading-relaxed text-foreground italic border-l-2 border-border pl-4">
            Transforming <span className="text-foreground/50 italic">dark data</span> into actionable intelligence through systematic governance.
          </p>
          <div className="text-[15px] text-foreground/85 leading-relaxed space-y-3 pt-1">
            <p>
              At Omara Technologies, I spearheaded the development of high-impact platforms designed to bridge the gap between LLM-driven automation and robust enterprise infrastructure.
            </p>
            <p>
              Farsight acts as the central brain—orchestrating Knowledge Graph generation (DocuNexus) and highly scalable human-in-the-loop (HITL) workflows through a unified documentation and management portal.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* Section 02: DocuNexus */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
            DocuNexus
          </h2>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">The "Brain" of Document Intelligence</h3>
            <p className="text-[15px] text-foreground/85 leading-relaxed">
              DocuNexus is a platform designed to extract, analyze, and visualize relationships within massive PDF repositories by converting them into structured Knowledge Graphs using Gemini 1.5 Pro and Neo4j.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 text-[15px]">
            <div className="flex items-start gap-2">
              <span className="text-xs text-accent/60 mt-1">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground">Agentic Search Workflows:</span>{" "}
                <span className="text-foreground/75">Implemented complex search agents using LangGraph for multi-step reasoning and deep document retrieval.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs text-accent/60 mt-1">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground">NL-to-Cypher Engine:</span>{" "}
                <span className="text-foreground/75">Engineered a Natural Language to Cypher query engine to query complex graph data using plain English.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs text-accent/60 mt-1">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground">Relational Discovery:</span>{" "}
                <span className="text-foreground/75">Automated extraction of relationships, discovering hidden links across disparate legal and financial document sets.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs text-accent/60 mt-1">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground">Cloud-Native Sync:</span>{" "}
                <span className="text-foreground/75">Built ingestion pipelines for AWS S3 and Google Drive for seamless document synchronization.</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Section 03: Labeling Platform */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
            Labeling Platform
          </h2>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">The Infrastructure for High-Precision Data</h3>
            <p className="text-[15px] text-foreground/85 leading-relaxed">
              To power high-stakes AI models, I built the Enterprise Labelling Platform—a comprehensive system for managing large-scale document annotation tasks with a focus on consensus, accuracy, and throughput.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 text-[15px]">
            <div className="flex items-start gap-2">
              <span className="text-xs text-accent/60 mt-1">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground">Scalable Task Distribution:</span>{" "}
                <span className="text-foreground/75">Developed custom Go backend engine supporting Parallel and Series tasks for sequential consensus reviews.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs text-accent/60 mt-1">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground">Consensus &amp; Arbitration:</span>{" "}
                <span className="text-foreground/75">Implemented automated consensus layer identifying agreement using distance metrics with an SME Arbitration Hub.</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Section 04: Reliability Engineering */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
            Reliability Engineering
          </h2>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">Data-Centric over Model-Centric</h3>
            <p className="text-[15px] text-foreground/85 leading-relaxed">
              I pioneered a Data-Centric approach, recognizing that the biggest gains in AI performance came from improving training data quality via our proprietary Ground Truth (GT) Scoring Framework.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 text-[15px]">
            <div className="flex items-start gap-2">
              <span className="text-xs text-accent/60 mt-1">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground">Reliability:</span>{" "}
                <span className="text-foreground/75">Utilized statistical methods like Cohen's Kappa to ensure scientifically rigorous annotator agreement.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs text-accent/60 mt-1">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground">Precision:</span>{" "}
                <span className="text-foreground/75">Calculated field-level precision and recall, securing near-zero error rates on mission-critical legal financials.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs text-accent/60 mt-1">•</span>
              <div className="flex-1">
                <span className="font-semibold text-foreground">Loops:</span>{" "}
                <span className="text-foreground/75">Developed closed-loop feedback systems where review-stage model edge cases fed back into training sets.</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Section 05: Ending Notes */}
        <section className="space-y-4">
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
              Ending Notes
            </h2>
            <h3 className="text-base font-semibold text-foreground">Beyond Engineering: The AI-First Mandate</h3>
            <p className="text-[15px] text-foreground/85 leading-relaxed">
              In most organizations, AI is a layer added at the end. For me, Farsight was the proof that AI must be the foundation. This "AI-First" approach meant that every line of Go in the backend and every Neo4j schema was architected specifically to be consumed and enhanced by autonomous agents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 border border-border rounded bg-card-bg text-sm">
              <span className="text-xs uppercase tracking-wider text-accent font-semibold block">Philosophy // 01</span>
              <p className="italic text-foreground/80 mt-1">"Don't build features for users; build intelligence engines that empower them."</p>
            </div>
            <div className="p-4 border border-border rounded bg-card-bg text-sm">
              <span className="text-xs uppercase tracking-wider text-accent font-semibold block">Philosophy // 02</span>
              <p className="italic text-foreground/80 mt-1">"Data is noise until it's governed by Ground Truth."</p>
            </div>
          </div>

          <p className="text-[15px] italic border-t border-border/60 pt-4 text-center text-foreground/75">
            Farsight stands as a testament to what happens when you stop treating AI as a tool and start treating it as the architect of the system itself.
          </p>
        </section>
      </div>
    </div>
  );
}
