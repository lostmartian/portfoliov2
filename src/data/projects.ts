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
  /*
  {
    slug: "ipo-allotment-engine",
    title: "IPO Allotment Engine",
    category: "Financial Engineering / SEBI Compliance / FinTech",
    year: "2025",
    duration: "Mar 2026 - Present",
    description: "Developing high-precision algorithms for IPO allotment processing, ensuring absolute regulatory integrity and transparency.",
    fullDescription: "A mission-critical system built to handle the complex mathematical logic of IPO share allotment according to SEBI's strict regulatory frameworks. The system processes millions of bids in seconds while maintaining 100% accuracy and auditability.",
    challenge: "Processing massive volumes of heterogeneous bid data while strictly adhering to varying allotment categories and proportional representation rules, all within a high-pressure timeframe.",
    solution: "A custom-engineered allotment engine built with high-performance logic that automates the verification, sorting, and basis of allotment generation, providing a transparent and immutable audit trail.",
    type: "CODE",
    image: "/projects/ipo-datagrid.png",
    clients: [
      { name: "JRat's Studio", link: "https://jrats.studio" }
    ],
    stack: ["Go", "Python", "PostgreSQL", "AWS", "NextJS"]
  },
  */
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
