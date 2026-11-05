// Case studies listed on the homepage. `company` and `note` make up the short line under
// each title; the full story and its numbers live on the case study's own page.

export const caseStudies: {
  href: string;
  title: string;
  company: string;
  note: string;
  status?: string;
}[] = [
  {
    href: "/work/ipo-allotment-engine",
    title: "IPO Allotment Engine",
    company: "Niche Technologies",
    note: "who gets shares, decided in a day",
  },
  {
    href: "/work/farsight",
    title: "Farsight",
    company: "Omara Technologies",
    note: "ground truth for AI, built solo",
  },
  {
    href: "/work/ayuva",
    title: "AYUVA",
    company: "First500days",
    note: "the AI inside a UK health app",
  },
  {
    href: "/work/agentdiff",
    title: "AgentDiff",
    company: "KerrShift",
    note: "what AI coding agents cost, and why",
  },
  {
    href: "/work/tsx2rs",
    title: "tsx2rs",
    company: "Personal",
    note: "Next.js, compiled to Rust",
    status: "In progress",
  },
];

// Homepage strip: facts about Sahil rather than any one product. Sources: founding engineer
// at Omara and its two products built solo (Farsight), and the three case studies' fields
// (fintech, AI data, healthcare).
export const highlights = [
  { value: "0→1", label: "Founding engineer", href: "/about" },
  { value: "2", label: "Products built solo", href: "/work/farsight" },
  { value: "3", label: "Industries", href: undefined },
];
