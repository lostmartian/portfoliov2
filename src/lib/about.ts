// About page content, carried over from the previous version of this site (about and /now,
// updated 8 Oct 2026) and github.com/lostmartian.

export const GITHUB = "https://github.com/lostmartian";

export const intro =
  "I'm an engineer from Pune. I build backends and AI systems for founders and teams, and I care about how things feel to use, not just whether they pass the tests.";

export const story = [
  "I did a five-year dual degree in Information Technology at IIIT Gwalior. Since then I've built systems that have to hold: share allotments that can't be wrong, ground-truth data that AI is measured against, and AI that patients have to trust.",
  "I started as the founding engineer at Omara Technologies, where I built two products on my own. Today I freelance with teams like First500days and JRat's Studio, and I run KerrShift, my AI and software studio, where I'm building AgentDiff, a tool that catches AI agents quietly getting worse.",
];

export const principle = "Correctness comes from structure, not clever code.";

export const facts = [
  ["Based in", "Pune, India"],
  ["Focus", "AI and backend systems"],
  ["Education", "IIIT Gwalior, B.Tech + M.Tech"],
  ["Open to", "Freelance, contract and full-time roles"],
] as const;

/** One timeline: education, roles and the current venture, oldest to newest. */
export const path = [
  {
    when: "2019 – 2024",
    title: "IIIT Gwalior",
    detail: "Dual degree (B.Tech + M.Tech) in Information Technology.",
  },
  {
    when: "Oct 2024 – Jan 2026",
    title: "Founding Full-Stack AI Engineer, Omara Technologies",
    detail: "Built a ground-truth labelling platform and a document knowledge graph, solo.",
    link: { label: "Farsight case study", href: "/work/farsight" },
  },
  {
    when: "Feb – May 2026",
    title: "Design Consultant, Blimze",
    detail: "Visual strategy, high-fidelity UI/UX mockups and interactive web flows.",
  },
  {
    when: "Mar 2026 – now",
    title: "Software Engineer, JRat's Studio",
    detail: "The IPO processing and allotment platform for a SEBI-registered registrar.",
    link: { label: "IPO case study", href: "/work/ipo-allotment-engine" },
  },
  {
    when: "Aug 2026 – now",
    title: "AI Engineer, First500days",
    detail: "The AI layer of AYUVA, a UK healthcare navigation app.",
    link: { label: "AYUVA case study", href: "/work/ayuva" },
  },
  {
    when: "Now",
    title: "Founder, KerrShift",
    detail: "My AI and software studio. Building AgentDiff, regression testing for AI agents, in pre-release.",
    link: { label: "agentdiff.app", href: "https://agentdiff.app/" },
    current: true,
  },
];

export const now = {
  updated: "8 October 2026",
  items: [
    {
      label: "Building",
      text: "AgentDiff, which catches agents that loop, waste tokens or cost more after a prompt or model change, even when the final answer still looks fine.",
    },
    { label: "Working on", text: "The AI layer for AYUVA, and SEBI-compliant fintech systems." },
    { label: "Recording", text: "Next on YouTube: FlashAttention, KV caching and systems-level LLM optimisation." },
    { label: "Reading", text: "Attention Is All You Need, and the Amazon Aurora paper on cloud-native databases." },
  ],
};

export const beyond = [
  {
    title: "Writing",
    text: "Essays and deep dives on systems, AI and design, including a five-part series on Amazon Aurora.",
    link: { label: "Read the blog", href: "/blogs" },
  },
  {
    title: "Teaching",
    text: "AI internals from first principles on YouTube, starting with how attention really works.",
    link: { label: "Watch the videos", href: "/videos" },
  },
  {
    title: "The Latent Chronicle",
    text: "A self-updating AI and tech newspaper I built to run for $0 a month.",
    link: { label: "Read it", href: "https://latentchronicle.online/" },
  },
  {
    title: "Off the clock",
    text: "Painting and cooking, mostly on weekends.",
  },
];

export const openSource = [
  {
    name: "AgentDiff",
    text: "Compares AI agent runs side by side and fails CI when the path drifts, loops or costs more.",
    href: "https://github.com/kerrshift/agentdiff",
    lang: "Python",
  },
  {
    name: "audioTQ",
    text: "Ports LLM weight-quantization techniques to local audio compression on the CPU.",
    href: "https://github.com/lostmartian/audioTQ",
    lang: "Python",
  },
  {
    name: "Ephemera",
    text: "A paper-styled UI design system for React, compatible with shadcn/ui.",
    href: "https://github.com/kerrshift/ephemera",
    lang: "TypeScript",
  },
];

export const elsewhere = [
  { label: "GitHub", href: GITHUB },
  { label: "LinkedIn", href: "https://linkedin.com/in/lostmartian" },
  { label: "YouTube", href: "https://www.youtube.com/@sahilgangurdetech" },
  { label: "X", href: "https://twitter.com/lost_martian_" },
];
