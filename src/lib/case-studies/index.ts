// Case studies shown as bento cards on the homepage. `company`, `note` and `tags` are all a
// card says; the full story and its numbers live on the case study's own page.

export const caseStudies: {
  href: string;
  title: string;
  company: string;
  note: string;
  tags: string[];
  status?: string;
}[] = [
  {
    href: "/work/ipo-allotment-engine",
    title: "IPO Allotment Engine",
    company: "Niche Technologies",
    note: "who gets shares, decided in a day",
    tags: ["Fintech", "Backend"],
  },
  {
    href: "/work/farsight",
    title: "Farsight",
    company: "Omara Technologies",
    note: "ground truth for AI, built solo",
    tags: ["AI data", "Full stack"],
  },
  {
    href: "/work/ayuva",
    title: "AYUVA",
    company: "First500days",
    note: "the AI inside a UK health app",
    tags: ["Healthcare", "AI"],
  },
  {
    href: "/work/agentdiff",
    title: "AgentDiff",
    company: "KerrShift",
    note: "what AI coding agents cost, and why",
    tags: ["Developer tools", "AI"],
  },
  {
    href: "/work/tsx2rs",
    title: "tsx2rs",
    company: "Personal",
    note: "Next.js, compiled to Rust",
    status: "In progress",
    tags: ["Compilers", "Rust"],
  },
];
