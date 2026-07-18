import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IPO Allotment Engine",
  description: "A scale-elastic processing platform for high-stakes IPO settlement and SEBI compliance.",
};

const techStack = [
  "Go", "Python", "Next.js 15", "Polars", "AWS Step Functions",
  "AWS Batch", "Aurora PostgreSQL", "OpenTofu", "AWS Cognito",
];

const pipelineInputs = [
  { id: "DATA_01", title: "Exchange CSV Bids", sub: "Bid Logs & Application ID Mapping" },
  { id: "DATA_02", title: "Sponsor Bank CSV", sub: "Clearing confirmations & timestamps" },
  { id: "DATA_03", title: "NPCI UPI Mandates", sub: "Payment blocking status & locks" },
];

const engineFeatures = [
  { title: "Vectorized 3-Way Joins", desc: "Reconciled raw exchange CSV logs, sponsor bank confirmations, and NPCI UPI transactions in-memory using Polars LazyFrames, matching 10M+ records under 3GB of RAM." },
  { title: "O(n) Demat Validation", desc: "Transitioned Demat format validations to Google's re2 engine, eliminating ReDoS vulnerabilities during heavy application surges." },
  { title: "Deduplication Strategy", desc: "Implemented Polars Streaming to aggregate and flag duplicate PAN applications in parallel, shifting workloads from database index locks to CPU-bound execution." },
  { title: "Reproducible Lottery CSPRNG", desc: "Integrated a cryptographically secure random number generator (CSPRNG) seeded for absolute reproducibility during tiebreaker lotteries, providing perfect audit trails." },
];

const solverScenarios = [
  { title: "Scenario A: Under-Subscription (100% Demand Allotment)", desc: "When total bids are less than or equal to offered capacity. All valid applications are granted 100% of their applied shares." },
  { title: "Scenario B: Proportionate (Highest Remainder Method)", desc: "Guarantees a minimum lot to all valid unique bidders, then distributes remaining shares proportionally. Colliding remainders resolved via seed-reproducible Draw of Lots." },
  { title: "Scenario C: Buffer-Aided (SME Buffer Optimization)", desc: "Automatically leverages an overallotment buffer (up to α% of Net Offer) to guarantee minimum lots to all bidders and avoid a lottery, primarily for SME public offerings." },
  { title: "Scenario D: Lottery Draw (Seeded CSPRNG Lottery)", desc: "Triggered when demand vastly exceeds capacity plus the overallotment buffer. Runs a computerized draw using a CSPRNG seeded for absolute reproducibility and audit." },
];

const consoleDetails = [
  { title: "Low-Latency Go Backend", desc: "High-throughput API gateway in Go using Gin with structured logging via Uber Zap. Authenticated via OAuth2/OIDC from AWS Cognito, supporting granular role-based access control distinguishing operations staff from allotment approvers." },
  { title: "Next.js Stage Orchestration", desc: "Operations interface built with TypeScript and shadcn/ui. Visual timeline for tracking ingestion, monitoring validation anomalies, resolving PAN and depository conflicts, and signing off on stage gates." },
  { title: "Compliance & Audit Ledger", desc: "Every administrative override, stage gate unlock, or parameter change triggers a structured audit record stored with cryptographic checksums in a dedicated audit database partition." },
];

const infraItems = [
  { label: "Egress Isolation", desc: "Routed private ECS and AWS Batch worker traffic through static NAT Gateways with Elastic IPs, ensuring predictable outbound addresses for exchanges (BSE/NSE) that require strict IP allowlisting." },
  { label: "Parent-Child States", desc: "Orchestrated heavy parse/validate/reconcile operations inside parent AWS Step Functions, passing S3 and database resource keys rather than raw data payloads across child workflows to eliminate container memory limitations." },
  { label: "Flyway Migrations", desc: "Maintained schemas dynamically using Flyway SQL migrations executed securely inside CodeBuild pipelines. Isolated database topologies inside private subnets of Amazon Aurora PostgreSQL (v15.8)." },
];

const philosophyQuotes = [
  { id: "01", quote: "Don't let your database do what a CPU can do in-memory." },
  { id: "02", quote: "A platform is only as secure as its egress boundaries. Hardening the NAT gateways and isolating database networks is what keeps data safe — not just API access controls." },
];

export default function IPOAllotmentPage() {
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
            JRat’s Studio // SEBI-Reg. Category I RTA
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            IPO Allotment Engine
          </h1>
          <p className="text-sm text-foreground/50 leading-relaxed font-sans font-light">
            A scale-elastic processing platform for high-stakes IPO settlement and SEBI compliance.
          </p>
        </header>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-border/40 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Timeline</span>
            <span className="text-foreground/80 font-medium">Mar 2026 — Present</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Role</span>
            <span className="text-foreground/80 font-medium">Software Engineer</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Peak Ingestion</span>
            <span className="text-foreground/80 font-medium">10M+ Applications</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Reconciliation</span>
            <span className="text-foreground/80 font-medium">&lt; 7 Seconds</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="space-y-2">
        <div className="relative w-full aspect-[16/9] rounded border border-border/40 overflow-hidden bg-foreground/[0.02]">
          <Image
            src="/projects/ipo-datagrid.png"
            alt="Jrats Allotment Engine — Basis of Allotment Grid"
            fill
            className="object-cover"
            priority
          />
        </div>
        <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider text-center">
          Fig 01. // Basis of Allotment Grid &amp; Processing Flow
        </p>
      </div>

      {/* Tech Stack Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-[10px] font-mono rounded bg-foreground/[0.04] text-foreground/50 border border-border/10 uppercase"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Content Flow */}
      <div className="space-y-8">
        {/* Section 01: The Engagement */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
            The Engagement
          </h2>
          <p className="text-base font-light leading-relaxed text-foreground italic border-l-2 border-border/40 pl-4">
            High-stakes settlement infrastructure for India&apos;s securities market.
          </p>
          <div className="text-sm text-foreground/80 leading-relaxed text-justify space-y-3 pt-1">
            <p>
              Jrats Studio was engaged by a SEBI-registered Category I Registrar to Issue and Share Transfer Agent (RTA) with over three decades of experience in India&apos;s securities market to re-architect their IPO processing infrastructure from the ground up.
            </p>
            <p>
              In the traditional registry space, processing an IPO is notoriously fragile — the platform must reconcile, validate, and compute the Basis of Allotment (BoA) for anywhere between 50,000 to over 10 million investor applications within a rigid T+4 settlement cycle. A single delay or calculation mismatch risks regulatory penalties, compliance failures, and reputational damage.
            </p>
            <p>
              The goal was to transform legacy file-ingestion workflows into a fully automated, deterministic, and elastically scaling state machine — processing data in-memory rather than through slow relational aggregations.
            </p>
          </div>
        </section>

        <hr className="border-border/40" />

        {/* Section 02: Core Processing Engine */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
            Core Processing Engine
          </h2>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">Reconciliation &amp; Allotment Engine</h3>
            <p className="text-sm text-foreground/80 leading-relaxed text-justify">
              A high-performance, vectorized batch processor written in Python, optimized with Rust-under-the-hood via Polars LazyFrames. Reconciles raw exchange CSV logs, sponsor bank confirmations, and NPCI UPI transactions in-memory.
            </p>
          </div>

          <div className="space-y-2 pt-2 text-sm text-foreground/80">
            {pipelineInputs.map((input) => (
              <div key={input.id} className="flex items-start gap-2">
                <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
                <div className="flex-grow">
                  <span className="font-semibold text-foreground/80">{input.title}:</span>{" "}
                  <span className="text-foreground/60">{input.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 text-sm text-foreground/80 border-t border-border/20">
            {engineFeatures.map((feat) => (
              <div key={feat.title} className="flex items-start gap-2">
                <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
                <div className="flex-grow">
                  <span className="font-semibold text-foreground/80">{feat.title}:</span>{" "}
                  <span className="text-foreground/60">{feat.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border/40" />

        {/* Section 03: SEBI BoA Solver */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
            Basis of Allotment Solver
          </h2>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">Four Mandated SEBI Scenarios</h3>
            <p className="text-sm text-foreground/80 leading-relaxed text-justify">
              A mathematically strict solver implementing four distinct SEBI-mandated allotment scenarios, applied dynamically based on subscription coverage and buffer thresholds.
            </p>
          </div>

          <div className="space-y-2 pt-2 text-sm text-foreground/80">
            {solverScenarios.map((scenario) => (
              <div key={scenario.title} className="flex items-start gap-2">
                <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
                <div className="flex-grow">
                  <span className="font-semibold text-foreground/80">{scenario.title}:</span>{" "}
                  <span className="text-foreground/60">{scenario.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border/40" />

        {/* Section 04: Admin Control Plane */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
            Admin Control Plane
          </h2>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">Decoupled Operations Console</h3>
            <p className="text-sm text-foreground/80 leading-relaxed text-justify">
              Designed a secure, multi-tenant administrative interface for registry operators to orchestrate phases, inspect exceptions, and sign off on lifecycle stage gates.
            </p>
          </div>

          <div className="space-y-2 pt-2 text-sm text-foreground/80">
            {consoleDetails.map((detail) => (
              <div key={detail.title} className="flex items-start gap-2">
                <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
                <div className="flex-grow">
                  <span className="font-semibold text-foreground/80">{detail.title}:</span>{" "}
                  <span className="text-foreground/60">{detail.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border/40" />

        {/* Section 05: Elastic Infrastructure */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
            Elastic Infrastructure
          </h2>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">Scale-to-Zero with Hardened Egress</h3>
            <p className="text-sm text-foreground/80 leading-relaxed text-justify">
              Provisioned via OpenTofu (Terraform), the infrastructure scales dynamically during massive allotment windows and collapses to zero otherwise — with zero security compromise.
            </p>
          </div>

          <div className="space-y-2 pt-2 text-sm text-foreground/80">
            {infraItems.map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <span className="text-xs font-mono text-foreground/30 mt-0.5">•</span>
                <div className="flex-grow">
                  <span className="font-semibold text-foreground/80">{item.label}:</span>{" "}
                  <span className="text-foreground/60">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border/40" />

        {/* Section 06: Engineering Philosophy */}
        <section className="space-y-4">
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
              Engineering Philosophy
            </h2>
            <h3 className="text-sm font-semibold text-foreground">Determinism as an Absolute Requirement</h3>
            <p className="text-sm text-foreground/80 leading-relaxed text-justify">
              In high-volume financial operations, you cannot afford &ldquo;mostly correct&rdquo; outcomes. If an allotment runs three times, it must yield the exact same allottee profile down to the single lot and the single currency unit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {philosophyQuotes.map((p) => (
              <div key={p.id} className="p-4 border border-border/40 rounded bg-foreground/[0.02] text-xs">
                <span className="font-mono text-foreground/40 uppercase block">Philosophy // {p.id}</span>
                <p className="italic text-foreground/70 mt-1">&ldquo;{p.quote}&rdquo;</p>
              </div>
            ))}
          </div>

          <p className="text-sm font-light italic border-t border-border/40 pt-4 text-center text-foreground/60">
            Determinism is the only currency that matters when executing at scale.
          </p>
        </section>
      </div>
    </div>
  );
}
