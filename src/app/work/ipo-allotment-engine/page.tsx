import Image from "next/image";
import BackButton from "@/components/Work/BackButton";
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
  { title: "Vectorized 3-Way Joins", tag: "POLARS_JOIN", desc: "Reconciled raw exchange CSV logs, sponsor bank confirmations, and NPCI UPI transactions in-memory using Polars LazyFrames, matching 10M+ records under 3GB of RAM." },
  { title: "O(n) Demat Validation", tag: "RE2_ENGINE", desc: "Transitioned Demat format validations to Google's re2 engine, eliminating ReDoS vulnerabilities during heavy application surges." },
  { title: "Deduplication Strategy", tag: "DEDUP_STREAM", desc: "Implemented Polars Streaming to aggregate and flag duplicate PAN applications in parallel, shifting workloads from database index locks to CPU-bound execution." },
  { title: "Reproducible Lottery CSPRNG", tag: "CSPRNG_SEED", desc: "Integrated a cryptographically secure random number generator (CSPRNG) seeded for absolute reproducibility during tiebreaker lotteries, providing perfect audit trails." },
];

const solverScenarios = [
  { id: "01", label: "Scenario_A", tag: "Under-Subscription", title: "100% Demand Allotment", desc: "When total bids are less than or equal to offered capacity. All valid applications are granted 100% of their applied shares.", footer: "Demand ≤ Capacity", status: "100%_ALLOTTED", accent: "text-foreground/80" },
  { id: "02", label: "Scenario_B", tag: "Proportionate", title: "Highest Remainder Method", desc: "Guarantees a minimum lot to all valid unique bidders, then distributes remaining shares proportionally. Colliding remainders resolved via seed-reproducible Draw of Lots.", footer: "Algorithm: HRM Proportional", status: "PRO_RATA", accent: "text-foreground/60" },
  { id: "03", label: "Scenario_C", tag: "Buffer-Aided", title: "SME Buffer Optimization", desc: "Automatically leverages an overallotment buffer (up to α% of Net Offer) to guarantee minimum lots to all bidders and avoid a lottery, primarily for SME public offerings.", footer: "Buffer Constraint: ≤ α%", status: "BUFFER_ACTIVE", accent: "text-foreground/60" },
  { id: "04", label: "Scenario_D", tag: "Lottery Draw", title: "Seeded CSPRNG Lottery", desc: "Triggered when demand vastly exceeds capacity plus the overallotment buffer. Runs a computerized draw using a CSPRNG seeded for absolute reproducibility and audit.", footer: "Demand > Cap + Buffer", status: "LOTTERY_TRIGGERED", accent: "text-foreground/40" },
];

const consoleDetails = [
  { title: "Low-Latency Go Backend", desc: "High-throughput API gateway in Go using Gin with structured logging via Uber Zap. Authenticated via OAuth2/OIDC from AWS Cognito, supporting granular role-based access control distinguishing operations staff from allotment approvers." },
  { title: "Next.js Stage Orchestration", desc: "Operations interface built with TypeScript and shadcn/ui. Visual timeline for tracking ingestion, monitoring validation anomalies, resolving PAN and depository conflicts, and signing off on stage gates." },
  { title: "Compliance & Audit Ledger", desc: "Every administrative override, stage gate unlock, or parameter change triggers a structured audit record stored with cryptographic checksums in a dedicated audit database partition." },
];

const stackItems = [
  { label: "Backend API", value: "Go (Gin / Zap)" },
  { label: "Database", value: "Amazon Aurora PostgreSQL" },
  { label: "Frontend", value: "Next.js 15 / shadcn" },
  { label: "IAM Identity", value: "AWS Cognito OIDC" },
];

const infraItems = [
  { id: "01", label: "Egress Isolation", desc: "Routed private ECS and AWS Batch worker traffic through static NAT Gateways with Elastic IPs, ensuring predictable outbound addresses for exchanges (BSE/NSE) that require strict IP allowlisting." },
  { id: "02", label: "Parent-Child States", desc: "Orchestrated heavy parse/validate/reconcile operations inside parent AWS Step Functions, passing S3 and database resource keys rather than raw data payloads across child workflows to eliminate container memory limitations." },
  { id: "03", label: "Flyway Migrations", desc: "Maintained schemas dynamically using Flyway SQL migrations executed securely inside CodeBuild pipelines. Isolated database topologies inside private subnets of Amazon Aurora PostgreSQL (v15.8)." },
];

const philosophyQuotes = [
  { id: "01", quote: "Don't let your database do what a CPU can do in-memory." },
  { id: "02", quote: "A platform is only as secure as its egress boundaries. Hardening the NAT gateways and isolating database networks is what keeps data safe — not just API access controls." },
];

function SectionDivider({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <span className="text-[9px] font-mono text-foreground/30 tracking-widest uppercase border border-foreground/10 px-2 py-0.5 shrink-0">
        {num}
      </span>
      <div className="flex-1 h-px bg-foreground/5" />
      <span className="text-[9px] font-mono text-foreground/20 uppercase tracking-widest shrink-0">{label}</span>
    </div>
  );
}

export default function IPOAllotmentPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background transition-colors duration-300 overflow-x-hidden">

      <main className="max-w-7xl mx-auto px-4 pt-28 sm:pt-44 pb-32 sm:px-16">

        {/* ── Header ── */}
        <div className="relative mb-12 sm:mb-24">
          <BackButton label="Back to System" fallback="/work" />

          {/* Context strip */}
          <div className="mt-8 sm:mt-14 mb-6 sm:mb-10 flex flex-wrap items-center gap-x-4 gap-y-1.5 py-2.5 border-y border-foreground/5">
            <span className="text-[9px] font-mono text-foreground/80 uppercase tracking-widest font-bold">JRATS.STUDIO</span>
            <span className="text-foreground/20 hidden sm:block">│</span>
            <span className="text-[9px] font-mono text-foreground/55 uppercase tracking-widest">SEBI-Reg. Category I RTA</span>
            <span className="text-foreground/20 hidden sm:block">│</span>
            <span className="text-[9px] font-mono text-foreground/55 uppercase tracking-widest">Mar 2026 — Present</span>
            <span className="text-foreground/20 hidden sm:block">│</span>
            <span className="text-[9px] font-mono text-foreground/55 uppercase tracking-widest">Developer</span>
            <span className="ml-auto flex items-center gap-1.5 text-[9px] font-mono text-foreground/70 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-pulse inline-block" />
              In Progress
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end">
            {/* Title */}
            <div className="space-y-5">
              <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.6em]">
                IPO Allotment Engine
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[0.88]">
                Deterministic<br />
                <span className="text-foreground/70">Settlement</span><br />
                at Scale
              </h1>
              <p className="text-foreground/40 text-base leading-relaxed max-w-sm">
                A scale-elastic processing platform for high-stakes IPO settlement and SEBI compliance.
              </p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 overflow-hidden">
              {[
                { label: "Peak Throughput", value: "10M+", sub: "Applications / run" },
                { label: "Processing Time", value: "<7s", sub: "End-to-end allotment" },
                { label: "Memory Ceiling", value: "<3GB", sub: "RAM for 10M records" },
                { label: "Settlement Cycle", value: "T+4", sub: "SEBI mandated window" },
              ].map((kpi) => (
                <div key={kpi.label} className="p-6 bg-background space-y-1.5 hover:bg-foreground/[0.03] transition-colors group">
                  <p className="text-[9px] font-mono text-foreground/50 uppercase tracking-widest group-hover:text-foreground/70 transition-colors">
                    {kpi.label}
                  </p>
                  <p className="text-3xl font-black tabular-nums">{kpi.value}</p>
                  <p className="text-[10px] text-foreground/45 font-mono">{kpi.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack chips */}
          <div className="mt-10 flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono text-foreground/40 border border-foreground/10 px-3 py-1 hover:border-foreground/20 hover:text-foreground/60 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Single Hero Image ── */}
        <div className="relative w-full aspect-[21/9] overflow-hidden mb-16 sm:mb-32 group border border-foreground/5">
          <Image
            src="/projects/ipo-datagrid.png"
            alt="Jrats Allotment Engine — Basis of Allotment Grid"
            fill
            className="object-cover opacity-60 scale-105 group-hover:scale-100 transition-all duration-[2000ms] ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">
              Fig 01. // Basis of Allotment Grid &amp; Processing Flow
            </p>
          </div>
        </div>

        <div className="space-y-20 sm:space-y-36 md:space-y-56">

          {/* ── 01: The Engagement ── */}
          <section>
            <SectionDivider num="01" label="The Engagement" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-24">
              <div className="lg:col-span-2 space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  High-stakes settlement infrastructure for India&apos;s securities market.
                </h2>
                {/* Client badge */}
                <div className="flex items-start gap-3 border border-foreground/10 bg-foreground/[0.02] px-4 py-3">
                  <div className="w-1 h-1 rounded-full bg-foreground/40 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[8px] font-mono text-foreground/30 uppercase tracking-widest mb-1">Client</p>
                    <p className="text-xs text-foreground/70 font-medium leading-relaxed">
                      SEBI-Registered Category I Registrar &amp; Share Transfer Agent — 30+ yrs in India&apos;s securities market
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 space-y-5 text-foreground/50 leading-relaxed">
                <p>
                  Jrats Studio was engaged by a{" "}
                  <span className="text-foreground/80 font-medium">
                    SEBI-registered Category I Registrar to Issue and Share Transfer Agent (RTA)
                  </span>{" "}
                  with over three decades of experience in India&apos;s securities market to re-architect their IPO processing infrastructure from the ground up.
                </p>
                <p>
                  In the traditional registry space, processing an IPO is notoriously fragile — the platform must reconcile, validate, and compute the{" "}
                  <span className="text-foreground/80 font-mono text-sm">Basis of Allotment (BoA)</span> for anywhere between 50,000 to over 10 million investor applications within a rigid{" "}
                  <span className="text-foreground/80 font-mono text-sm">T+4 settlement cycle</span>. A single delay or calculation mismatch risks regulatory penalties, compliance failures, and reputational damage.
                </p>
                <p>
                  The goal was to transform legacy file-ingestion workflows into a fully automated, deterministic, and elastically scaling state machine — processing data in-memory rather than through slow relational aggregations.
                </p>
              </div>
            </div>
          </section>

          {/* ── 02: Core Processing Engine ── */}
          <section>
            <SectionDivider num="02" label="Core Processing Engine" />
            <div className="space-y-8 sm:space-y-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-3 sm:mb-5">
                  Reconciliation &amp; Allotment Engine
                </h2>
                <p className="text-foreground/40 max-w-2xl leading-relaxed">
                  A high-performance, vectorized batch processor written in Python, optimized with Rust-under-the-hood via{" "}
                  <span className="text-foreground/70 font-mono">Polars LazyFrames</span>. Three heterogeneous data sources. One reconciled truth set. Under 7 seconds.
                </p>
              </div>

              {/* Pipeline Diagram */}
              <div className="border border-foreground/5 bg-foreground/[0.01] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-3 border-b border-foreground/5 bg-foreground/[0.015]">
                  <span className="text-[9px] font-mono text-foreground/25 uppercase tracking-widest">
                    PIPELINE_EXECUTION_TELEMETRY // 0x_RECON
                  </span>
                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-foreground/40 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-pulse inline-block" />
                    Live
                  </span>
                </div>
                <div className="p-6 md:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
                    {/* Inputs */}
                    <div className="lg:col-span-4 space-y-3">
                      {pipelineInputs.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 border border-foreground/5 hover:border-foreground/10 transition-colors relative group bg-background"
                        >
                          <div className="absolute right-3 top-3 text-[9px] font-mono text-foreground/15 group-hover:text-foreground/30 transition-colors">
                            [{item.id}]
                          </div>
                          <p className="text-foreground/70 font-mono font-bold text-[10px] uppercase tracking-wider">{item.title}</p>
                          <p className="text-[10px] text-foreground/30 mt-1">{item.sub}</p>
                        </div>
                      ))}
                    </div>

                    <div className="lg:col-span-1 flex lg:flex-col justify-center items-center py-4">
                      <span className="hidden lg:block text-foreground/20 font-mono text-sm">──►</span>
                      <span className="lg:hidden text-foreground/20">▼</span>
                    </div>

                    {/* Processor */}
                    <div className="lg:col-span-3 p-6 border border-foreground/10 flex flex-col justify-center items-center text-center space-y-3 min-h-[170px] bg-foreground/[0.03]">
                      <div className="text-foreground/20 text-3xl select-none">⚙</div>
                      <div>
                        <p className="text-foreground/70 font-mono font-bold text-[10px] uppercase tracking-widest">Polars Join</p>
                        <p className="text-[9px] text-foreground/30 mt-1.5 font-mono leading-relaxed">SIMD Hash Join on Apache Arrow memory structures</p>
                      </div>
                      <div className="text-[8px] font-mono text-foreground/15 uppercase">MODULE_EXE</div>
                    </div>

                    <div className="lg:col-span-1 flex lg:flex-col justify-center items-center py-4">
                      <span className="hidden lg:block text-foreground/20 font-mono text-sm">──►</span>
                      <span className="lg:hidden text-foreground/20">▼</span>
                    </div>

                    {/* Output */}
                    <div className="lg:col-span-3 p-5 border border-foreground/5 min-h-[170px] flex flex-col justify-between hover:border-foreground/10 transition-colors bg-background">
                      <div>
                        <div className="text-[9px] text-foreground/20 font-mono font-bold mb-2">OUTPUT_BUFFER</div>
                        <p className="text-foreground/70 font-bold font-mono text-[10px] uppercase tracking-wider">Reconciled Set</p>
                        <p className="text-[10px] text-foreground/35 mt-2 leading-relaxed">
                          Deduplicated clients, flagged PAN violations, audited accounts ready for solver routing.
                        </p>
                      </div>
                      <div className="border-t border-foreground/5 pt-2 mt-4 text-[9px] font-mono flex items-center justify-between text-foreground/30">
                        <span>RAM: &lt;3GB</span>
                        <span>Time: &lt;7s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 border border-foreground/5 divide-y divide-x divide-foreground/5">
                {engineFeatures.map((f) => (
                  <div
                    key={f.tag}
                    className="p-8 bg-background hover:bg-foreground/[0.02] transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-sm font-bold uppercase tracking-tight">{f.title}</h4>
                      <span className="text-[8px] font-mono text-foreground/20 group-hover:text-foreground/40 transition-colors ml-4 shrink-0">
                        {f.tag}
                      </span>
                    </div>
                    <p className="text-foreground/40 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 03: SEBI BoA Solver ── */}
          <section>
            <SectionDivider num="03" label="SEBI BoA Solver" />
            <div className="space-y-6 sm:space-y-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Basis of Allotment Solver
                </h2>
                <p className="text-foreground/40 max-w-2xl leading-relaxed">
                  A mathematically strict solver implementing four distinct SEBI-mandated allotment scenarios, applied dynamically based on subscription coverage and buffer thresholds.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5">
                {solverScenarios.map((s) => (
                  <div
                    key={s.id}
                    className="p-6 sm:p-8 bg-background hover:bg-foreground/[0.02] transition-colors group space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono text-foreground/25 uppercase tracking-widest">
                        {s.label} // {s.id}
                      </span>
                      <span className="text-[8px] font-mono text-foreground/30 border border-foreground/10 px-2 py-0.5">
                        {s.tag}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-bold tracking-tight">{s.title}</h4>
                      <p className="text-sm text-foreground/40 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-foreground/5 flex items-center justify-between text-[9px] font-mono">
                      <span className="text-foreground/25">{s.footer}</span>
                      <span className={`font-bold uppercase ${s.accent}`}>{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 04: Admin Control Plane ── */}
          <section>
            <SectionDivider num="04" label="Admin Control Plane" />
            <div className="space-y-8 sm:space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-24">
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                    Decoupled Operations Console
                  </h2>
                  <p className="text-[10px] font-mono text-foreground/25 uppercase tracking-widest leading-loose">
                    Go Admin API Backend<br />Next.js Operations Portal
                  </p>
                </div>
                <div className="lg:col-span-3 text-foreground/50 leading-relaxed">
                  Designed a secure, multi-tenant administrative interface for registry operators to orchestrate phases, inspect exceptions, and sign off on lifecycle stage gates.
                </div>
              </div>

              {/* Topology Diagram */}
              <div className="border border-foreground/5 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-3 border-b border-foreground/5 bg-foreground/[0.015]">
                  <span className="text-[9px] font-mono text-foreground/25 uppercase tracking-widest">
                    CONTROL_PLANE_TOPOLOGY // 0x_ADMIN
                  </span>
                  <span className="text-[8px] font-mono text-foreground/25 border border-foreground/10 px-2 py-0.5 uppercase">
                    Decoupled
                  </span>
                </div>
                <div className="p-8 md:p-12 bg-foreground/[0.01]">
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                    {[
                      { layer: "FRONTEND", title: "Next.js Panel", sub: "TypeScript / shadcn", highlight: false },
                      null,
                      { layer: "SECURITY", title: "AWS Cognito", sub: "OIDC / Fine-grained RBAC", highlight: true },
                      null,
                      { layer: "BACKEND API", title: "Go Gin Backend", sub: "Gin / Zap Logging", highlight: false },
                      null,
                      { layer: "COMPLIANCE", title: "Audit Ledger", sub: "Postgres / Checksums", highlight: false },
                    ].map((node, i) =>
                      node === null ? (
                        <div key={i} className="hidden lg:flex items-center justify-center shrink-0 px-1">
                          <span className="text-foreground/15 font-mono text-sm">──►</span>
                        </div>
                      ) : (
                        <div
                          key={i}
                          className={`flex-1 p-4 border text-center transition-colors hover:border-foreground/15 ${node.highlight
                            ? "border-foreground/15 bg-foreground/[0.04]"
                            : "border-foreground/5 bg-background"
                            }`}
                        >
                          <div className="text-[7px] font-mono text-foreground/20 uppercase mb-2 tracking-widest">{node.layer}</div>
                          <p className="text-foreground/70 font-mono font-bold text-[10px] uppercase tracking-wider">{node.title}</p>
                          <p className="text-[9px] text-foreground/30 mt-1 font-mono">{node.sub}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 border border-foreground/5 divide-y md:divide-y-0 md:divide-x divide-foreground/5">
                {consoleDetails.map((d) => (
                  <div key={d.title} className="p-6 sm:p-8 bg-background hover:bg-foreground/[0.02] transition-colors space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-tight">{d.title}</h4>
                    <p className="text-foreground/40 text-sm leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/5 border border-foreground/5">
                {stackItems.map((item) => (
                  <div key={item.label} className="p-5 bg-background">
                    <p className="text-[9px] font-mono text-foreground/20 uppercase tracking-widest mb-2">{item.label}</p>
                    <p className="text-xs font-mono text-foreground/60">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 05: Infrastructure ── */}
          <section>
            <SectionDivider num="05" label="Elastic Infrastructure" />
            <div className="space-y-8 sm:space-y-14">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-3 sm:mb-5">
                  Scale-to-Zero<br />
                  <span className="text-foreground/10">with Hardened Egress</span>
                </h2>
                <p className="text-foreground/40 max-w-2xl leading-relaxed">
                  Provisioned via OpenTofu (Terraform), the infrastructure scales dynamically during massive allotment windows and collapses to zero otherwise — with zero security compromise.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 border border-foreground/5 divide-y md:divide-y-0 md:divide-x divide-foreground/5">
                {infraItems.map((item) => (
                  <div key={item.id} className="p-6 sm:p-8 bg-background hover:bg-foreground/[0.02] transition-colors space-y-4">
                    <p className="text-[9px] font-mono text-foreground/25 uppercase tracking-widest font-bold">
                      {item.id} // {item.label}
                    </p>
                    <p className="text-foreground/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 06: Engineering Philosophy ── */}
          <section className="pb-16">
            <SectionDivider num="06" label="Engineering Philosophy" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
              <div className="space-y-4 sm:space-y-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05]">
                  Determinism<br />as an Absolute<br />
                  <span className="text-foreground/10">Requirement.</span>
                </h2>
                <div className="space-y-5 text-foreground/50 leading-relaxed">
                  <p>
                    My work at Jrats Studio was built around one core tenet:{" "}
                    <span className="text-foreground/80 font-medium">
                      Determinism is not an optimization — it is a regulatory requirement.
                    </span>
                  </p>
                  <p>
                    In high-volume financial operations, you cannot afford &ldquo;mostly correct&rdquo; outcomes. If an allotment runs three times, it must yield the exact same allottee profile down to the single lot and the single currency unit.
                  </p>
                  <p>
                    By building this platform around deterministic, file-first lazy execution, and leveraging modern memory architectures (Polars and Apache Arrow), we proved that enterprise-grade registry workflows can be scalable, secure, and bulletproof under regulatory audit loops.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {philosophyQuotes.map((p) => (
                  <div
                    key={p.id}
                    className="p-6 border border-foreground/5 bg-foreground/[0.02] space-y-3 hover:border-foreground/10 transition-colors"
                  >
                    <p className="text-[9px] font-mono text-foreground/25 uppercase tracking-widest">
                      Philosophy // {p.id}
                    </p>
                    <p className="text-foreground/60 italic leading-relaxed text-sm">&ldquo;{p.quote}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing line */}
            <div className="mt-12 sm:mt-24 pt-6 sm:pt-12 border-t border-foreground/5">
              <p className="text-2xl md:text-3xl text-foreground/30 italic font-light text-center leading-relaxed">
                <span className="text-foreground/70">Determinism</span> is the only currency that matters
                when executing at scale.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
