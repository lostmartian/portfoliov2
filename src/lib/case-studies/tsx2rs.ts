// tsx2rs case study: a personal, in-progress project. Figures come from the project's own
// benchmark write-ups (Google Cloud c3-standard-8 runs are the reference numbers), its
// decision log and its public repository. Prototype numbers are labelled as prototype numbers.

export const REPO_URL = "https://github.com/lostmartian/tsx2rs";

export const meta = {
  title: "tsx2rs",
  summary:
    "A Next.js Deployment Adapter that compiles React server component templates into programs for a native Rust engine. Client components come from an HTML cache, and anything it can't compile falls back to Next.js. Turning it on takes one line of config.",
  description:
    "Case study: tsx2rs, a personal project that makes self-hosted Next.js cheaper to run by compiling server component templates to Rust, with output identical to Next.js.",
  facts: [
    ["Role", "Solo, personal project"],
    ["Status", "In progress, Phase 1"],
    ["Started", "October 2026"],
    ["Licence", "Open source, Apache-2.0"],
  ] as [string, string][],
};

// Hero visual: the real app on 8 processes, Google Cloud (requests per second).
export const throughput = [
  { name: "next start", value: 618, latency: "402 ms median" },
  { name: "tsx2rs prototype", value: 10218, latency: "23 ms median", lead: true },
];

export const pressures = [
  {
    icon: "layers",
    title: "Every page rendered twice",
    text: "Profiling showed Next.js renders a page to the RSC (Flight) format, decodes it and renders it again to HTML. HTML itself is only about 13% of its CPU; the rest is framework work.",
  },
  {
    icon: "coins",
    title: "Self-hosters pay the bill",
    text: "Teams that run Next.js on their own Docker, Kubernetes or VMs pay for every one of those CPU cycles. On Vercel's platform this is someone else's problem; off it, it's yours.",
  },
  {
    icon: "alert",
    title: "No one gives up features",
    text: "A faster server that drops streaming, metadata, server actions or client components won't be adopted. It has to be exactly Next.js, with no code changes.",
  },
];

export const premise =
  "The win isn't Rust on its own. It comes from skipping Next.js's request pipeline for the parts that can be compiled, and handing everything else back to Next.js unchanged.";

export const flow = [
  { icon: "engine", step: "Compile", text: "At build time, each page's JSX templates become template programs" },
  { icon: "api", step: "Run setup", text: "The app's own data-fetching code still runs in Node, unchanged" },
  { icon: "ingest", step: "Encode", text: "A generated encoder hands the values to Rust in one call, as compact bytes" },
  { icon: "publish", step: "Render", text: "The Rust engine writes HTML and Flight in a single pass" },
  { icon: "layers", step: "Cache islands", text: "Client components come from an HTML cache; React renders only on a miss" },
  { icon: "route", step: "Fall back", text: "Anything it can't compile goes to Next.js's own handler" },
];

export const stats = [
  { value: "10", label: "experiments before product code" },
  { value: "35", label: "logged decisions" },
  { value: "11", label: "architecture records" },
  { value: "29", label: "pull requests" },
  { value: "10k", label: "lines of Rust" },
];

// Phase 0: each experiment and the pivot it caused.
export const journey = [
  {
    when: "Proposal",
    title: "Start from a doubt",
    text: "The first idea was \"zero V8\": compile server components to Rust, drop Node and leave client components as empty placeholders. It would have lost Next.js features, so I set one rule: compile what we can and fall back for the rest.",
  },
  {
    when: "Speed",
    title: "Is the idea real?",
    text: "A hand-written Rust renderer produced output byte-identical to React, about 10x faster, with a 20 ms cold start instead of 1.6 s. Byte-identical became the correctness rule.",
  },
  {
    when: "Profile",
    title: "Find where the time goes",
    text: "Replacing only the HTML step inside Next.js would gain 1.15x. The real ceiling was in bypassing its request handling, which pointed to Next.js 16's new Deployment Adapter API.",
  },
  {
    when: "Real apps",
    title: "Study 606 routes in 13 apps",
    text: "Only 8% of routes compile as written, because pages fetch data inside components. Compiling just the returned JSX, and lifting awkward calls out of it, raises that to 92%.",
  },
  {
    when: "Handoff",
    title: "Measure the boundary",
    text: "Passing data from JS to Rust as JSON cost five times the render itself. A compiler-generated binary encoder kept Rust 7.3x faster than React end to end.",
  },
  {
    when: "Cloud",
    title: "Prove it on clean machines",
    text: "A hand-compiled Vercel Commerce product page, streaming and multi-core runs on Google Cloud: identical output, working in a real browser, 12–17x the throughput of next start.",
  },
  {
    when: "Now",
    title: "Build the product",
    text: "The real compiler and engine, in their own open-source repository with CI, differential tests and decision records. The engine side of the current step is done; the compiler side is next.",
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
    tag: "Scope",
    title: "Compile templates, not components",
    problem:
      "Real pages fetch their data inside the component. A compiler that needs the whole component to be compilable would cover almost nothing.",
    decision:
      "Split every component in two: its setup code stays JavaScript and runs as normal, and only the JSX it returns is compiled. Calls that don't belong in a template are lifted out, keeping their original conditions.",
    outcome: "On the 13-app corpus, coverage went from 8% of routes to 92% (optimistic), without asking anyone to rewrite a page.",
    metric: { value: "8 → 92%", label: "routes that can compile" },
  },
  {
    tag: "Islands",
    title: "Empty placeholders were never an option",
    problem:
      "Every route in the study had client components, a median of 10. Across 12 production pages they made up about 74% of the elements.",
    decision:
      "Serve client-component HTML from a cache keyed by component, props and the contexts it reads, and let React render it only on a miss. Their props repeated 94–100% between requests.",
    outcome: "Pages keep their full server-rendered HTML. Even with a 0% cache hit rate the real app stays about 4–5x faster.",
    metric: { value: "74%", label: "of elements are client components" },
  },
  {
    tag: "Boundary",
    title: "Bytes, not JSON",
    problem:
      "Moving data from JS to Rust as JSON cost about five times the render. The obvious conclusion was to drop Rust in the first stage and generate JS templates instead.",
    decision:
      "I pushed back and tested one more option: since the compiler knows each template's fields, it can generate a binary encoder that sends only those, with no JSON at all.",
    outcome: "Rust stayed 7.3–7.5x faster than React end to end, and 2.6x the best JS template. Rust stayed in.",
    metric: { value: "7.3x", label: "React, with the generated encoder" },
  },
  {
    tag: "Correctness",
    title: "Identical, or fall back",
    problem:
      "A faster server that changes a single byte of HTML, or one node of the Flight tree, can break hydration in ways nobody notices until production.",
    decision:
      "The output must match React and Next.js exactly, using them as test oracles. Differential tests generate random trees, and planted bugs check that the tests would actually catch a mistake.",
    outcome: "20,000 generated trees render identically to React, and every planted bug was caught. When the compiler can't guarantee a match, the request goes to Next.js.",
    metric: { value: "15 / 15", label: "planted bugs caught" },
  },
  {
    tag: "Honesty",
    title: "Correct the claim, not the data",
    problem:
      "Laptop runs showed about 4x less memory than Next.js. On clean cloud machines under full load, each process used about as much memory as Next.js.",
    decision:
      "Keep the clean-machine run as the reference for every claim, and restate memory per unit of throughput instead of per process.",
    outcome: "The published claim is 14–19x less memory per request served, not a per-process number that doesn't hold under load.",
    metric: { value: "14–19x", label: "less memory per request served" },
  },
];

export const leadResult = {
  value: "16.5x",
  label: "the throughput of next start on a real app, with every core in use",
  note: "Vercel Commerce's product page, compiled by hand as a stand-in for compiler output, on two Google Cloud c3-standard-8 machines: 10,218 vs 618 requests per second. HTML and Flight were identical to Next.js on all 9 pages tested.",
};

export const results = [
  { value: "23 ms", label: "median latency at full load, against 402 ms for next start" },
  { value: "31 ms", label: "first byte when streaming Suspense, against 268–883 ms" },
  { value: "9 / 9", label: "pages identical to Next.js on Linux, HTML and Flight" },
  { value: "20,000", label: "generated trees identical to React in the product's engine" },
  { value: "123%+", label: "of the hand-written prototype's speed, from the real engine" },
];

export const stack = [
  { icon: "engine", group: "Compiler & engine", items: ["Rust", "oxc", "napi-rs", "criterion"] },
  { icon: "portal", group: "Runtime & adapter", items: ["TypeScript", "Node.js", "Next.js 16", "React 19"] },
  { icon: "lab", group: "Testing", items: ["Differential tests", "Mutation checks", "Vitest", "Instruction counts in CI"] },
  { icon: "globe", group: "Benchmarks", items: ["Google Cloud", "oha", "node:cluster"] },
];

export const takeaway = "Prove the idea is worth building before writing the product.";

export const reflection = [
  "tsx2rs is not usable yet. The engine reproduces React's output for everything the current milestone needs; the compiler that turns a real page into a program is being built now. The milestone ends when it reproduces the Commerce page by itself, at 90% or more of the hand-written speed.",
  "The headline numbers come from a hand-compiled prototype, and I say so wherever they appear. Every pivot so far came from a measurement rather than a hunch, and each one is written down with its reasoning, so the project can explain itself.",
];
