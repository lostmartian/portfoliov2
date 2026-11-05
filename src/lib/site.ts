// Who Sahil is, in one place: page metadata, the JSON-LD graph, the sitemap and the
// llms.txt files all read from here, so search engines and AI assistants get the same story
// the pages tell. Claims match the case studies (see the *-case-study-context.md files).

import { EMAIL } from "@/lib/data";

export const SITE_URL = "https://lostmartian.in";
export const NAME = "Sahil Gangurde";
export const HANDLE = "lostmartian";

export const TITLE = "Sahil Gangurde | AI & Backend Engineer, Founder of KerrShift and AgentDiff";
export const TAGLINE = "AI and backend engineer who builds software that has to be right.";

export const DESCRIPTION =
  "Sahil Gangurde (lostmartian) is a freelance AI and backend engineer in Pune, India, and the founder of KerrShift and AgentDiff. He builds products end to end, from architecture and backend to AI and interface: IPO allotment for a SEBI-registered registrar, ground-truth platforms for AI, the AI layer of a UK health app, and a Rust compiler for Next.js. Available for freelance, contract and full-time work worldwide.";

export const sameAs = [
  "https://github.com/lostmartian",
  "https://linkedin.com/in/lostmartian",
  "https://twitter.com/lost_martian_",
  "https://www.youtube.com/@sahilgangurdetech",
  "https://www.youtube.com/channel/UCtaWm5UMqhiBtgHzKzkOabw",
  "https://agentdiff.app",
  "https://kerrshift.com",
  "https://latentchronicle.online/",
];

export const YOUTUBE = "https://www.youtube.com/@sahilgangurdetech";

/** Ventures Sahil founded. */
export const ventures = [
  {
    name: "KerrShift",
    url: "https://kerrshift.com",
    description:
      "AI and software development studio founded by Sahil Gangurde. It builds autonomous AI systems, developer tooling and production applications, and is the parent studio of AgentDiff.",
  },
  {
    name: "AgentDiff",
    url: "https://agentdiff.app",
    description:
      "Open-source tool that shows what an AI coding agent did and what it cost, and catches AI agents that loop, drift or get more expensive before they ship. Runs locally; MIT licensed.",
    code: "https://github.com/kerrshift/agentdiff",
  },
];

/** What a client can hire him for: an end-to-end engineer, not one layer of the stack. */
export const services = [
  {
    name: "AI engineering",
    description:
      "LLM features, autonomous agents, GraphRAG and document intelligence, evaluation and cost control, built for production rather than demos.",
  },
  {
    name: "Backend and data systems",
    description:
      "High-throughput Go and Python services, data pipelines, PostgreSQL and AWS infrastructure, with audit trails and tests against ground truth.",
  },
  {
    name: "Fintech and regulated systems",
    description:
      "Capital-markets software for registrars: IPO validation, reconciliation and allotment, shareholder registers, KYC and corporate actions.",
  },
  {
    name: "Product builds, zero to one",
    description:
      "Taking a product from idea to launch alone or with a small team: architecture, backend, AI, frontend and deployment.",
  },
  {
    name: "Developer tooling and performance",
    description: "Compilers, CI checks and tools that make engineering teams faster, such as AgentDiff and tsx2rs.",
  },
];

export const expertise = [
  "AI engineering",
  "Large language models",
  "AI agents",
  "Agent evaluation and regression testing",
  "GraphRAG and knowledge graphs",
  "Retrieval and search",
  "Backend engineering",
  "Distributed systems",
  "Go",
  "Python",
  "Rust",
  "TypeScript",
  "Next.js and React",
  "PostgreSQL",
  "AWS",
  "Fintech",
  "Capital markets and IPO allotment",
  "SEBI-regulated systems",
  "Healthcare AI",
  "Compilers",
  "System design",
];

export const keywords = [
  "Sahil Gangurde",
  "lostmartian",
  "AI engineer",
  "backend engineer",
  "freelance AI engineer",
  "freelance backend engineer",
  "hire AI engineer",
  "hire backend developer",
  "AI engineer India",
  "AI engineer Pune",
  "backend engineer Pune",
  "full-stack AI engineer",
  "founding engineer",
  "AI consultant",
  "fintech engineer",
  "IPO allotment software",
  "RTA software",
  "SEBI registrar software",
  "healthcare AI engineer",
  "LLM engineer",
  "AI agents developer",
  "GraphRAG engineer",
  "Go developer",
  "Python developer",
  "Rust developer",
  "Next.js developer",
  "KerrShift",
  "AgentDiff",
  "AI agent regression testing",
  "tsx2rs",
  "Next.js Rust compiler",
  "Sahil Gangurde YouTube",
];

export const contact = { email: EMAIL, location: "Pune, Maharashtra, India", availability: "Freelance, contract and full-time, remote worldwide" };

export const abs = (path = "/") => new URL(path, SITE_URL).toString();
