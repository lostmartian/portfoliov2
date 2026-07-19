"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Briefcase, 
  Cpu, 
  Database, 
  Server, 
  Shield, 
  Cloud, 
  Award, 
  Code,
  Activity,
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  ArrowLeft
} from "lucide-react";
import Mermaid from "@/components/Mermaid";

// Technology Stack mapping
const techStack = {
  frontend: [
    { name: "Next.js", desc: "App Router framework for administrative interface" },
    { name: "Tailwind CSS", desc: "Sleek utility styling for responsive operations control console" },
    { name: "AWS Amplify", desc: "Automated Git-integrated CI/CD and managed SSL hosting" },
    { name: "AWS Cognito SDK", desc: "Client-side JWT session validation and credential flows" }
  ],
  backend: [
    { name: "Go (Golang)", desc: "High-performance administrative control plane API gateway" },
    { name: "Gin Framework", desc: "Router and middleware pipeline engine for RESTful commands" },
    { name: "pgx Connection Pool", desc: "Low-overhead direct PostgreSQL connection pooling & queries" },
    { name: "Structured JSON Logger", desc: "High-speed structured JSON output for CloudWatch parsing" }
  ],
  algorithms: [
    { name: "Python", desc: "Core computing platform for data-heavy batch processes" },
    { name: "Polars Engine", desc: "Rust-backed Apache Arrow memory framing (GIL bypass)" },
    { name: "Google-RE2", desc: "Linear-time O(N) regular expressions protecting against ReDoS" },
    { name: "Pydantic", desc: "Strict schema and type enforcement on rule inputs" }
  ],
  database: [
    { name: "Aurora PostgreSQL", desc: "High-availability primary relational storage clusters" },
    { name: "Flyway", desc: "SQL-first declarative schema migrations inside AWS pipelines" }
  ],
  infrastructure: [
    { name: "OpenTofu / Terraform", desc: "Open-source IaC tool for cloud state provisioning" },
    { name: "AWS Step Functions", desc: "DAG workflow orchestrator for ingest and compliance runs" },
    { name: "AWS Batch & ECS Fargate", desc: "Containerized elastic execution scaling to zero when idle" },
    { name: "AWS Secrets Manager / KMS", desc: "Hardware key encryption and runtime secrets injection" }
  ]
};

// Generalized conceptual Mermaid Chart definition
const mermaidChart = `graph TD
    subgraph Data Sources
        Exchanges[Stock Exchanges BSE/NSE]
        Bank[Clearing Banks]
        UPI[NPCI UPI Network]
    end

    subgraph Storage & Ingestion
        Ingest[Secure SFTP Connector]
        RawS3[(Raw Storage S3)]
    end

    subgraph Batch Compute Engine
        Pipeline[Orchestrated Compute Pipeline]
        Validation[Validation & ReDoS checks]
        Reconciliation[3-Way Data Matching]
        Allotment[Basis of Allotment Engine]
    end

    subgraph Relational Database
        DB[(Relational DB Cluster)]
    end

    subgraph Operations Control Plane
        Portal[Administrative Web Portal]
        Gateway[Secure REST API Gateway]
    end

    Exchanges -->|Bid Files| Ingest
    Ingest --> RawS3
    RawS3 --> Pipeline
    Pipeline --> Validation
    Pipeline --> Reconciliation
    Pipeline --> Allotment
    Validation & Reconciliation & Allotment --> DB
    Portal -->|JWT Auth Requests| Gateway
    Gateway -->|DB Queries & overrides| DB`;

export default function IPOAllotmentClient() {
  return (
    <div className="space-y-16 font-sans py-4">
      {/* Navigation & Header */}
      <div className="space-y-6">
        <Link 
          href="/work" 
          className="text-xs font-mono text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3 shrink-0" /> Return to Work
        </Link>

        <header className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold block">
            Case Study — SEBI-Reg. Category I RTA
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            IPO Allotment Engine
          </h1>
          <p className="text-lg text-foreground/60 leading-relaxed font-sans font-light max-w-2xl">
            A scale-elastic processing platform for high-stakes IPO settlement, data reconciliation, and SEBI compliance.
          </p>
        </header>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-border/20 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Timeline</span>
            <span className="text-foreground/80 font-medium">Mar 2026 — Present</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Role</span>
            <span className="text-foreground/80 font-medium">Software Engineer, Freelance</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Peak Ingestion</span>
            <span className="text-foreground/80 font-medium">10M+ Applications</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Core Stack</span>
            <span className="text-foreground/80 font-medium">Go / Python / Polars</span>
          </div>
        </div>


      </div>

      {/* Hero Graphic */}
      <div className="space-y-2">
        <div className="relative w-full aspect-[16/9] rounded border border-border/20 overflow-hidden bg-foreground/[0.01]">
          <Image
            src="/projects/ipo-datagrid.png"
            alt="Basis of Allotment Grid & Processing Flow"
            fill
            className="object-cover"
            priority
          />
        </div>
        <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider text-center">
          Fig 01. — Basis of Allotment Grid &amp; Processing Flow
        </p>
      </div>

      {/* Case Study Section 1: Business Domain */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-bold border-b border-border/20 pb-2">
          01. Business Domain &amp; Core Challenge
        </h2>
        
        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed text-justify">
          <p>
            When a company decides to go public through an Initial Public Offering (IPO) in the Indian capital markets, it needs a neutral, regulated intermediary to manage the transaction. This intermediary is the <strong>Registrar and Transfer Agent (RTA)</strong>.
          </p>
          <p>
            This system was engineered for <strong><a href="https://nichetechpl.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-foreground">Niche Technologies Pvt. Ltd.</a></strong> (via <a href="https://www.jrats.studio/" target="_blank" rel="noopener noreferrer" className="hover:underline text-foreground">JRat’s Studio</a>), a SEBI-registered Category I RTA with over three decades of experience in India’s securities market, to modernize their core public issues processing infrastructure.
          </p>
          <p>
            The RTA serves as the vital bridge connecting multiple key financial players:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="p-4 rounded border border-border/10 bg-foreground/[0.01]">
              <span className="text-xs font-mono font-bold text-foreground/70 block uppercase">The Issuer &amp; Exchanges</span>
              <p className="text-xs text-foreground/50 mt-1">
                Bridges the company seeking to list shares with the Stock Exchanges (BSE &amp; NSE) where broker networks submit customer orders.
              </p>
            </div>
            <div className="p-4 rounded border border-border/10 bg-foreground/[0.01]">
              <span className="text-xs font-mono font-bold text-foreground/70 block uppercase">Payment &amp; Depositories</span>
              <p className="text-xs text-foreground/50 mt-1">
                Interfaces with Depositories (NSDL &amp; CDSL) holding demat vaults and Payment Networks (SCSB Banks &amp; NPCI UPI) holding bid capital.
              </p>
            </div>
          </div>

          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">The Engineering Problem</h3>
          <p>
            During an IPO bidding window, RTAs face massive spikes where millions of bids arrive on the evening of the bidding close. With India&apos;s shift towards a strict <strong>T+3 listing timeline</strong>, the RTA has an extremely narrow window (typically overnight) to ingest, validate format structure, deduplicate duplicate PAN bids, perform three-way payment reconciliations, and execute the Basis of Allotment (BOA).
          </p>
          <p>
            Because any financial allocation error, share mismatch, or delayed bank release triggers immediate regulatory penalties and audits, there is <strong>zero error tolerance</strong>.
          </p>

          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">Regulatory Constraints</h3>
          <ul className="space-y-3 text-xs text-foreground/70 pl-4 list-disc">
            <li>
              <strong>ASBA (Applications Supported by Blocked Amount):</strong> Bidders funds are blocked at SCSBs or NPCI. Post-allotment, the platform triggers debit signals for successful lots and release signals for unallotted funds.
            </li>
            <li>
              <strong>Third-Party Payment Ban:</strong> Enforces that the PAN on the Demat account matches the bank account owner PAN blocking the funds.
            </li>
            <li>
              <strong>Basis of Allotment:</strong> Mandates mathematical equity where over-subscribed portions are allotted via seeded, audit-compliant lotteries.
            </li>
          </ul>
        </div>
      </section>

      {/* Case Study Section 2: Architecture */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-bold border-b border-border/20 pb-2">
          02. System Architecture &amp; Execution Flows
        </h2>
        
        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed text-justify">
          <p>
            The platform adopts a hybrid design: a containerized, event-driven batch processing pipeline (Data Plane) handles heavy calculations and file transformations, while a low-latency microservice (Control Plane) manages configurations, overrides, and administrative stage sign-offs.
          </p>

          <div className="space-y-2 py-4">
            <h3 className="text-xs font-mono text-foreground/40 uppercase tracking-wider text-center">
              Fig 02. — End-to-End System Ingestion &amp; Settlement Flow
            </h3>
            <Mermaid chart={mermaidChart} />
          </div>

          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold">The Ingest &amp; Processing Pipeline Flow</h3>
          <p>
            Every business day during an active IPO, the batch execution executes sequentially:
          </p>
          <ol className="space-y-3 text-xs text-foreground/70 pl-4 list-decimal">
            <li>
              <strong>Trigger &amp; Dispatch:</strong> A cron-based orchestration system fires daily at set timeframes (interim and final close), querying active IPO statuses and invoking the compute pipeline.
            </li>
            <li>
              <strong>SFTP Connector Ingest:</strong> Secure file-transfer connectors log into exchange SFTP directories using secure keys, download CSV bid files, and transfer them to raw storage.
            </li>
            <li>
              <strong>Validation Batch Processing:</strong> Containerized compute tasks execute parsing, verify PAN/Demat structures, and run multi-way in-memory joins against Bank confirmations and UPI Mandate logs.
            </li>
            <li>
              <strong>Lottery &amp; Exchange Handover:</strong> The allotment engine performs category adjustments, resolves over-subscription lotteries, verifies math checksums, and dispatches acknowledgment files back to exchange SFTP directories.
            </li>
          </ol>

          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">The Administrative Control Path</h3>
          <p>
            To manage configurations or execute manual overrides, administrative staff authenticate via the Admin Portal utilizing Multi-Factor Authentication. Requests hit the secure API Gateway, which validates JWT claims before forwarding traffic to the containerized backend.
          </p>
        </div>
      </section>

      {/* Case Study Section 3: Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-bold border-b border-border/20 pb-2">
          03. Technology Stack Mapping
        </h2>
        <div className="space-y-6 pt-2">
          {Object.entries(techStack).map(([layerName, items]) => (
            <div key={layerName} className="space-y-1.5">
              <h3 className="text-xs font-mono uppercase text-foreground/40 font-bold tracking-wider">
                {layerName} Layer
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs text-foreground/70 pl-4 list-disc">
                {items.map((item) => (
                  <li key={item.name} className="leading-relaxed">
                    <span className="font-semibold text-foreground/80">{item.name}</span>: <span className="text-foreground/50">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


      </section>

      {/* Case Study Section 4: Go Backend */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-bold border-b border-border/20 pb-2">
          04. Backend Microservices Architecture
        </h2>
        
        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed text-justify">
          <p>
            The backend control plane service is written in Go to maximize concurrency and ensure low memory footprint. By adopting Clean Architecture patterns, database, HTTP routing, and core domain logics remain decoupled:
          </p>
          <ul className="space-y-2 text-xs text-foreground/75 pl-4 list-disc">
            <li><strong>API Presentation Layer</strong> handles HTTP routing, JSON serialization, and request binding.</li>
            <li><strong>Middleware Interceptors</strong> validate JSON Web Tokens, evaluate user roles (Admin vs. Standard Operator), and capture before/after snapshots for audits.</li>
            <li><strong>Business Service Layer</strong> handles allotment state gates, parameter updates, and coordinates multi-table mutations inside single database transactions.</li>
            <li><strong>Repository Layer</strong> executes raw parameterized SQL statements directly to connection pools, avoiding the overhead of heavy Object-Relational Mappers (ORMs).</li>
          </ul>

          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">Transactional Safety</h3>
          <p>
            Multi-row database operations execute within explicit transaction boundaries. If a write fails or audit-trail logging encounters an error, database transactions roll back automatically to maintain state consistency.
          </p>
        </div>
      </section>

      {/* Case Study Section 5: Python Algorithms */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-bold border-b border-border/20 pb-2">
          05. High-Throughput Data Engine Design
        </h2>
        
        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed text-justify">
          <p>
            The computing engine uses Polars (compiled with Rust on Apache Arrow memory layouts) to achieve vectorization. Parallel hashing and joins process millions of files in seconds, bypassing Python&apos;s Global Interpreter Lock (GIL).
          </p>

          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">Linear-Time Format Checks</h3>
          <p>
            Standard regular expression engines risk CPU execution halts if input files contains maliciously crafted strings (Regular Expression Denial of Service, or ReDoS). We mitigate this by using <strong>Google-RE2</strong>, which guarantees linear-time $O(N)$ execution bounds during heavy application surges.
          </p>

          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">Deduplication &amp; Multiplicity Audits</h3>
          <p>
            Window functions partition bids over Permanent Account Number (PAN) profiles. If an investor submits bids under restricted categories (such as Retail or Employees) across multiple applications or broker accounts, the engine group-wise flags all associated bids for rejection to enforce SEBI mandates.
          </p>

          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">Deterministic Basis of Allotment Solver</h3>
          <p>
            To prevent pseudo-random seed manipulation, the solver reverses application ID digits to shuffle rows uniformly before sorting. Cycle indices match pre-configured magic numbers to distribute shares cyclically, ensuring absolute lottery reproducibility during tiebreaker draws.
          </p>
        </div>
      </section>

      {/* Case Study Section 6: Database */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-bold border-b border-border/20 pb-2">
          06. Database Schema Design &amp; Indexing
        </h2>
        
        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed text-justify">
          <p>
            The relational database layer runs on Amazon Aurora PostgreSQL. The schema uses SQL-first migration scripts versioned chronologically.
          </p>
          
          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">Index Lock Mitigation</h3>
          <p>
            Standard indexing operations on large tables block database writes. In production environments, we require all migration index creation scripts to execute concurrently with strict statement timeouts, preventing database locks during high-volume intake periods.
          </p>

          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">Storage Optimizations</h3>
          <ul className="space-y-1.5 text-xs text-foreground/70 pl-4 list-disc">
            <li>
              <strong>Custom Enum Types:</strong> Fields like category flags or classification rules store enums (occupying only 4 bytes), reducing disk/RAM sizing footprint by gigabytes compared to raw string columns across millions of transaction rows.
            </li>
            <li>
              <strong>JSONB Audit Archiving:</strong> Audit events log mutations into structured binary `jsonb` fields, allowing fast indexing and key lookup operations.
            </li>
          </ul>
        </div>
      </section>

      {/* Case Study Section 7: IaC */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-bold border-b border-border/20 pb-2">
          07. Infrastructure as Code &amp; Cloud Topography
        </h2>
        
        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed text-justify">
          <p>
            Provisioned via OpenTofu / Terraform, the cloud topography isolates the primary database cluster, backend services, and execution tasks inside secure private subnets. All outbound calls route through isolated NAT Gateways with static Elastic IPs allowlisted by external exchange APIs.
          </p>

          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">Cognito User Sync Lambda Flow</h3>
          <p>
            To prevent credential synchronization discrepancies, user provisioning triggers a sync task to register user records inside the relational database, resolving DB connection details dynamically from Secrets Manager using secure KMS keys.
          </p>


          <h3 className="text-xs font-mono uppercase text-foreground/60 font-semibold pt-2">Batch Orchestration</h3>
          <p>
            A workflow state machine coordinates the lifecycle: triggering exchange ingestion connectors, running parallel batch verification tasks, evaluating ingestion statuses, and executing the Basis of Allotment scripts.
          </p>
        </div>
      </section>

      {/* Case Study Section 8: Ending Notes */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-bold border-b border-border/20 pb-2">
          08. Key Accomplishments &amp; Metrics
        </h2>
        
        <div className="space-y-6 pt-2">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-foreground/80 uppercase">In-Memory Engine Throughput</span>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Engineered a vectorized 3-way data reconciliation engine in Python utilizing <strong>Polars</strong> (Rust-backed multi-threaded engine) and <strong>Apache Arrow</strong>, achieving a throughput of <strong>1.6M+ records/second</strong> (reconciling 10M records in <strong>6.34 seconds</strong>) and bypassing Python’s GIL to meet strict T+3 regulatory timelines.
              </p>
            </div>
          </div>

          <div className="flex gap-3 border-t border-border/10 pt-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-foreground/80 uppercase">ReDoS Risk Mitigation</span>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Mitigated Regular Expression Denial of Service (ReDoS) vulnerability risks during high-volume data validation by integrating <strong>Google-RE2</strong>, guaranteeing linear-time $O(N)$ execution bounds for pattern matching across millions of investor identifiers.
              </p>
            </div>
          </div>

          <div className="flex gap-3 border-t border-border/10 pt-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-foreground/80 uppercase">Database Contention Minimization</span>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Designed and optimized system-wide duplicate PAN detection routines using a multi-strategy architecture (including out-of-core <strong>External Merge Sort</strong> for RAM-constrained environments and <strong>Polars Streaming</strong>), reducing database lock contention by <strong>80%</strong> on high-frequency transactions.
              </p>
            </div>
          </div>

          <div className="flex gap-3 border-t border-border/10 pt-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-foreground/80 uppercase">Zero-Lock Live Database Indexing</span>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Reduced database index-creation query lock times to zero by establishing schema governance policies requiring `CREATE INDEX CONCURRENTLY` for Flyway migrations on large live transaction tables.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border border-border/20 rounded bg-foreground/[0.01] space-y-2 mt-6">
          <span className="text-xs font-mono font-bold text-foreground/70">KEY TECHNOLOGIES</span>
          <p className="text-[11px] font-mono text-foreground/40 leading-relaxed">
            Go (Golang), Python, Next.js, Polars, PostgreSQL, AWS Amplify, AWS Cognito, AWS Batch, AWS Step Functions, SQL Parameters (pgx), Google-RE2, Apache Arrow, Vectorized Operations, REST APIs, System Design, Role-Based Access Control (RBAC), Data Reconciliation, Flyway Migrations, Concurrent Indexing, Multithreading, SIMD Parallelism.
          </p>
        </div>
      </section>
    </div>
  );
}

