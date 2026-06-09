export interface Client {
  name: string;
  link?: string;
}

export interface Section {
  title: string;
  subtitle?: string;
  content: string;
  type: 'text' | 'technical' | 'design' | 'impact';
  points?: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  type: 'AI' | 'CODE' | 'WEB';
  image?: string;
  duration: string;
  clients: Client[];
  stack?: string[];
  sections?: Section[];
}

export const projects: Project[] = [
  {
    slug: "ipo-allotment-engine",
    title: "IPO Allotment Engine",
    category: "Financial Engineering / SEBI Compliance / FinTech",
    year: "2026",
    duration: "Mar 2026 - Present",
    description: "A deterministic, scale-elastic processing platform for high-stakes IPO settlement and SEBI compliance. Engineered a high-throughput engine matching 10M+ records in under 7 seconds.",
    fullDescription: "A mission-critical system built to handle the complex mathematical logic of IPO share allotment according to SEBI's strict regulatory frameworks. The system processes millions of bids in seconds while maintaining 100% accuracy and auditability.",
    challenge: "Ingesting, deduplicating, and reconciling millions of heterogeneous bid records within a rigid T+4 SEBI cycle, while avoiding DB write-lock contentions.",
    solution: "Separated the control plane (AWS Step Functions) from the vectorized data plane (Polars on AWS Batch) to achieve sub-10 second processing times with 100% deterministic reproducibility.",
    type: "CODE",
    image: "/projects/ipo-datagrid.png",
    clients: [
      { name: "JRat's Studio", link: "https://www.jrats.studio/" }
    ],
    stack: ["Go", "Python", "PostgreSQL", "AWS", "Terraform", "NextJS"],
    sections: [
      {
        title: "Deterministic Engine",
        subtitle: "Vectorized 3-Way Reconciliation & Solvers",
        type: "technical",
        content: "Engineered a file-first data plane utilizing memory-mapped datasets and vectorized Polars LazyFrames to achieve SIMD-accelerated joins. Transitioned regex logic to google-re2 to ensure O(n) safety.",
        points: [
          "Vectorized 3-Way Hash Reconciliation",
          "SEBI Basis of Allotment Scenario Solvers",
          "Seed-Reproducible CSPRNG Lottery Draw"
        ]
      },
      {
        title: "Admin Control Plane",
        subtitle: "Decoupled Management Console & Auditing",
        type: "design",
        content: "Built a secure operations portal with Next.js and shadcn/ui. The Go (Gin) administrative API backend integrates fine-grained Cognito OIDC RBAC and an immutable audit logging system.",
        points: [
          "Low-Latency Go REST API (Gin / Zap)",
          "Stage Gate & Consensus Arbitration Hub",
          "Immutable DB Audit Ledger with Cryptographic Checksums"
        ]
      },
      {
        title: "Scale-Elastic Infra",
        subtitle: "Zero-Trust Dual-Region Cloud Topology",
        type: "impact",
        content: "Provisioned a scale-to-zero architecture using AWS Batch on Fargate and Step Functions. Hardened network boundaries with dedicated NAT IP allowlisting for stock exchanges.",
        points: [
          "AWS Step Functions Parent-Child Workflows",
          "Static NAT Egress for Exchange Allowlisting",
          "Isolated Private Aurora DB Subnets with Flyway Migrations"
        ]
      }
    ]
  },
  {
    slug: "farsight",
    title: "Farsight",
    category: "Intelligence Governance / Enterprise Infrastructure",
    year: "2024-2026",
    duration: "Oct 2024 - Jan 2026",
    description: "The central governance and intelligence portal for the Omara ecosystem. Architected an enterprise-grade management hub that orchestrates multi-tenant workspace security and Ground Truth (GT) AI evaluation frameworks.",
    fullDescription: "Farsight serves as the unified documentation and management portal for the entire Omara ecosystem. It centralizes system documentation, workspace governance, and proprietary AI evaluation frameworks to maintain high-fidelity model performance across enterprise clients.",
    challenge: "Fragmented documentation and a lack of centralized oversight for complex AI evaluation metrics across multiple multi-tenant workspaces and products.",
    solution: "Developed a comprehensive portal that integrates custom Python scoring engines for 'Ground Truth' benchmarking, automated infrastructure management, and granular permission systems to ensure system integrity.",
    type: "CODE",
    image: "/projects/farsight-score.png",
    clients: [
      { name: "Omara Technologies", link: "https://www.omaratechnologies.com/en" }
    ],
    stack: ["Python", "Go", "NextJS", "Langchain", "Langgraph", "AWS", "IaC"],
    sections: [
      {
        title: "The Governance Framework",
        subtitle: "Multi-Tenant Security & Infrastructure",
        type: "technical",
        content: "I architected Farsight's core security layer using AWS Cognito and a custom role-based access control (RBAC) system. This allowed for granular permissions across different organizational workspaces, ensuring that sensitive data and AI model results remained strictly partitioned.",
        points: [
          "Enterprise SSO & Role-Based Access Control",
          "Automated AWS Infrastructure Orchestration",
          "Workspace Governance & Permission Guardrails"
        ]
      },
      {
        title: "Intelligence Reliability",
        subtitle: "The Ground Truth (GT) Scoring Engine",
        type: "impact",
        content: "To bridge the gap between AI performance and enterprise reliability, I developed the Ground Truth (GT) Scoring Engine. This proprietary framework measures the precision and recall of AI document extractions against verified human 'Gold Standards'.",
        points: [
          "Field-level Precision & Recall Tracking",
          "Scientific Reliability Scores (Cohen’s Kappa)",
          "Automated Feedback Loops for Model Drift"
        ]
      },
      {
        title: "Ecosystem Orchestration",
        subtitle: "DocuNexus & Labelling Platform Integration",
        type: "design",
        content: "Farsight wasn't just a site; it was the orchestrator. I built the documentation and evaluation leaderboards for DocuNexus (Knowledge Graphs) and the Enterprise Labelling Platform, providing project managers with a unified view of throughput and accuracy.",
        points: [
          "Centralized Knowledge Graph Documentation",
          "Annotator Performance Leaderboards",
          "Real-time Consistency & Consensus Analytics"
        ]
      }
    ]
  },
];
