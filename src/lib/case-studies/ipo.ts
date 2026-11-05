// IPO Allotment Engine case study. Figures come from git history (Sahil's commits,
// merges excluded) and internal test reports. The real IPO used for parity checks is
// deliberately unnamed, and the architecture is kept high-level.

export const meta = {
  title: "IPO Allotment Engine",
  headline: "One day to get every share right.",
  summary:
    "How I helped a SEBI-registered registrar go from a licence to a working IPO platform. My work ran from the algorithms that decide who gets shares to the portal where investors check what they got.",
  description:
    "Case study: building an IPO processing and allotment platform for a SEBI-registered registrar, under India's T+3 listing timeline.",
  facts: [
    ["Role", "Software Engineer, freelance"],
    ["Client", "Niche Technologies, via JRat's Studio"],
    ["Timeline", "Mar – Oct 2026"],
    ["Team", "Four engineers"],
  ] as [string, string][],
};

// The T+3 timeline drawn in the problem section. `crunch` marks the day it all happens.
export const listingTimeline = [
  { day: "T", time: "6:00 PM", text: "Bidding closes" },
  { day: "T+1", time: "by 9:30 PM", text: "Validate, reconcile, allot, get exchange approval", crunch: true },
  { day: "T+2", time: "by 11:00 AM", text: "Shares credited, refunds released" },
  { day: "T+3", time: "10:00 AM", text: "Trading begins" },
];

export const pressures = [
  {
    icon: "clock",
    title: "One working day",
    text: "Once bidding closes, every bid has to be validated, reconciled and allotted, and the exchange has to approve, all before 9:30 PM the next day.",
  },
  {
    icon: "layers",
    title: "Millions of bids, many sources",
    text: "Exchanges, depositories, banks and UPI each send their own files in their own formats. All of them have to reconcile with each other.",
  },
  {
    icon: "alert",
    title: "No room for error",
    text: "A single share allotted wrongly is a regulatory event. The output has to match the registrar's sheet exactly.",
  },
];

export const market =
  "Two incumbents handle most Indian IPOs, on systems built over decades. Our client held a SEBI Category I registrar licence but had no platform to process an IPO. The goal was to build one, so a new registrar could compete, starting with SME issues.";

export const pipeline = [
  { icon: "ingest", step: "Ingest", text: "Exchange bid files, bank and UPI confirmations" },
  { icon: "validate", step: "Validate", text: "20+ checks, each with a stable rejection code" },
  { icon: "reconcile", step: "Reconcile", text: "Bids matched against blocked funds and depositories" },
  { icon: "allot", step: "Allot", text: "Category quotas, spillover and lotteries" },
  { icon: "approve", step: "Approve", text: "Operators review, accept and finalise, all audited" },
  { icon: "publish", step: "Publish", text: "Settlement outputs and investor status lookup" },
];

export const stats = [
  { value: "8", label: "repositories" },
  { value: "233", label: "commits" },
  { value: "81", label: "working days" },
  { value: "122k", label: "lines of code added" },
  { value: "5", label: "languages" },
];

export type Layer = {
  icon: string;
  name: string;
  role: "Led" | "Built" | "Contributed";
  impact: string;
  stack: string[];
  points: string[];
};

export const layers: Layer[] = [
  {
    icon: "engine",
    name: "Allotment & validation engine",
    role: "Led",
    impact: "The core of the product: it decides which bids are valid and who receives shares.",
    stack: ["Python", "Polars", "RE2", "Pydantic"],
    points: [
      "Created the repository and wrote most of its algorithms: validators, reconciliation, category quotas with spillover, and allotment for every investor category.",
      "Wrote a deterministic lottery allocator: a run fails outright if the winners or shares don't add up exactly.",
      "Wrote the container entrypoint that every batch job runs on.",
      "Designed a rejection-policy framework that makes re-runs during an IPO reproducible.",
    ],
  },
  {
    icon: "api",
    name: "Control-plane API",
    role: "Built",
    impact: "The backbone operators rely on: configuration, access control, and an audit trail regulators can trust.",
    stack: ["Go", "Gin", "PostgreSQL"],
    points: [
      "Wrote the service from its first commit, including auth, role-based access and the deploy pipeline.",
      "Added a tamper-proof audit trail that hashes every change and that the database itself won't let anyone edit.",
      "Built IPO configuration and 8 counterparty registries, with all-or-nothing CSV import.",
    ],
  },
  {
    icon: "portal",
    name: "Operator portal",
    role: "Built",
    impact: "Where the registrar's team sets up an IPO and watches it run.",
    stack: ["Next.js", "React", "Tailwind"],
    points: [
      "MFA login, session handling, and logout that applies across every open tab.",
      "A Create-IPO form that checks SEBI's allocation limits as operators type.",
      "Live monitors for incoming bid files and running jobs.",
    ],
  },
  {
    icon: "globe",
    name: "Public status portal",
    role: "Built",
    impact: "The only part investors see, and it has to survive result-day traffic.",
    stack: ["Go", "Next.js", "DynamoDB", "OpenTofu"],
    points: [
      "Sole author of the backend, the frontend and the infrastructure module.",
      "Kept separate from the operational database, so investor traffic never reaches the core system.",
      "Built it end to end in four days, then wired it into a two-region production setup.",
    ],
  },
  {
    icon: "lab",
    name: "Synthetic data & test oracle",
    role: "Led",
    impact: "Real IPO data is confidential, so this is how the whole pipeline got tested.",
    stack: ["Python", "Polars", "pytest"],
    points: [
      "Generates a complete, realistic IPO from a single config: exchange, depository and bank files.",
      "Injects known errors and predicts what each check should reject, so the pipeline is tested against ground truth.",
      "Scales to full-size IPOs with 400k+ applications.",
    ],
  },
  {
    icon: "database",
    name: "Database schema",
    role: "Contributed",
    impact: "Encodes the domain and enforces the rules that keep decisions safe.",
    stack: ["PostgreSQL", "Flyway"],
    points: [
      "Tables for IPO domain entities and their intermediaries.",
      "Governance tables for reviewed decisions; the database allows only one accepted version per IPO.",
    ],
  },
];

export const journey = [
  {
    when: "March",
    title: "Foundations",
    text: "Set up the control API with auth and an immutable audit trail, plus the operator portal's MFA login. Ran the first validation prototypes and benchmarks on 10 million rows.",
  },
  {
    when: "April – May",
    title: "From prototype to engine",
    text: "Switched to a linear-time regex engine and prototyped reconciliation. Containerised the engine for batch jobs, wrote about 15 tested validators, and the first version of the test-data generator.",
  },
  {
    when: "June",
    title: "Rebuilt to match the registrar",
    text: "Deleted the first allotment engine and rebuilt it to mirror the registrar's sheets. Shipped 8 counterparty registries across the API, the portal and the schema.",
  },
  {
    when: "July",
    title: "Quotas, lotteries, honest test data",
    text: "Built a category-quota engine verified on 11 public IPOs and a lottery allocator with audit checks. Added SEBI limit checks to the portal and found the root causes behind the misleading test data.",
  },
  {
    when: "August",
    title: "Facing investors",
    text: "Built the public status portal in four days. Fixed allotment edge cases, including deficit winners and anchor exclusion, and added allotment for institutional investors.",
  },
  {
    when: "September",
    title: "Real data",
    text: "The readiness exercise on 530k real bids matched the registrar, with mutual-fund allotment identical row for row. Shipped the rejection-policy framework.",
  },
  {
    when: "October",
    title: "Hardening",
    text: "Took depository matching from 0 to 99.97% agreement, behind a propose-only, audited apply step. Wired the status portal into production.",
  },
];

export type Story = {
  tag: string;
  title: string;
  problem: string;
  decision: string;
  outcome: string;
  metric: { value: string; label: string };
};

export const stories: Story[] = [
  {
    tag: "Allotment",
    title: "Match the registrar, not the textbook",
    problem:
      "My first allotment engine followed SEBI's rules as written, with a seeded lottery and a tidy proportional model. An allotment that disagrees with the registrar by a single share is still wrong.",
    decision:
      "I deleted it and rebuilt it to reproduce the registrar's own sheets column by column. That meant spreadsheet-style rounding, a deterministic fix for rounding drift, and winners chosen by exchange-supplied numbers.",
    outcome:
      "Every run has to add up exactly to the shares on offer, or it stops. Mutual-fund allotment matched the registrar's sheet row for row.",
    metric: { value: "3,191", label: "lines deleted to get it right" },
  },
  {
    tag: "Performance",
    title: "Measure before choosing",
    problem: "Duplicate detection and reconciliation had to finish overnight on IPOs with up to 10 million rows.",
    decision:
      "I benchmarked four duplicate-detection strategies on 10M rows instead of picking the fashionable one, and replaced a regex timeout workaround with a linear-time engine.",
    outcome:
      "The dataframe option came last and a plain external sort won. A vectorised reconciliation prototype handled 10M records in about 5 seconds.",
    metric: { value: "10M", label: "rows per benchmark" },
  },
  {
    tag: "Safety",
    title: "Make the dangerous path impossible",
    problem:
      "Moving an investor into the wrong category changes who gets shares, and operators re-run checks many times during an IPO.",
    decision:
      "Recategorisation only demotes and only proposes; ambiguous cases go to a person. Changes are applied through a reviewed, audited step, and every re-run starts from a frozen snapshot of earlier rejections.",
    outcome: "The database allows only one accepted version per IPO, and the same inputs always give the same result.",
    metric: { value: "0", label: "automatic promotions, by design" },
  },
  {
    tag: "Quality",
    title: "When the test data lied",
    problem: "Bids we generated as invalid were passing the real pipeline as valid.",
    decision:
      "I traced five root causes. Some errors were recorded only inside the generator, IDs collided once an IPO passed 130k applications, and replayed random numbers drifted between files. I rebuilt the generator around a single source of truth.",
    outcome: "Its predictions were compared check by check with the real pipeline, and they matched exactly on the core checks.",
    metric: { value: "5", label: "root causes found and fixed" },
  },
  {
    tag: "Collaboration",
    title: "Review as a safety net",
    problem:
      "On real data, depository matching found zero rows at first. Later, a fallback rule wrongly demoted institutional investors.",
    decision:
      "I fixed the join. When a teammate's review flagged the fallback, I reproduced it on real data, reverted it, and rebuilt the mapping from the depository's official circular.",
    outcome: "Category agreement reached 99.97%, with no institutional investors wrongly demoted.",
    metric: { value: "99.97%", label: "category agreement" },
  },
];

export const leadResult = {
  value: "530k",
  label: "real IPO bids run through the platform in a production readiness exercise",
  note: "The data came from a recent mainboard IPO and is kept anonymous. Matching totals alone was never the bar: every difference from the registrar's independent results had to be explained.",
};

export const results = [
  { value: "Exact", label: "match with the registrar on every validation check exercised" },
  { value: "99.97%", label: "agreement on final investor category" },
  { value: "38 / 38", label: "mutual-fund allotment rows identical to the registrar's sheet" },
  { value: "0", label: "institutional investors wrongly demoted after the review fix" },
  { value: "11", label: "public IPOs used to verify the quota engine" },
];

export const stack = [
  { icon: "engine", group: "Data & algorithms", items: ["Python", "Polars", "Pydantic", "google-re2", "pytest"] },
  { icon: "api", group: "Services", items: ["Go", "Gin", "AWS Lambda", "AWS Batch"] },
  { icon: "portal", group: "Frontend", items: ["Next.js", "React", "Tailwind", "Amplify"] },
  { icon: "database", group: "Data stores", items: ["PostgreSQL", "DynamoDB", "Flyway"] },
  { icon: "globe", group: "Infrastructure", items: ["AWS", "OpenTofu", "Docker", "CodeBuild"] },
];

export const takeaway = "In regulated systems, correctness comes more from structure than from clever code.";

export const reflection = [
  "The real-data exercise proved the validation and allotment logic against an independent registrar. Certification of the full live workflow, including bank execution and some re-run edge cases, is still in progress.",
  "Three things made the difference: reproducing the source of truth exactly, making unsafe actions impossible rather than unlikely, and testing against an oracle that already knows the right answer.",
];
