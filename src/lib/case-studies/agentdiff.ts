// AgentDiff case study: Sahil's own open-source product under KerrShift. Figures come from the
// repository (github.com/kerrshift/agentdiff): README, CHANGELOG and git history. The spend
// example is the README's "real week from the author's own logs".

export const REPO_URL = "https://github.com/kerrshift/agentdiff";
export const SITE = "https://agentdiff.app";

export const meta = {
  title: "AgentDiff",
  summary:
    "An open-source tool that reads the session logs Claude Code and the OpenAI Codex CLI already keep, and shows where an AI coding agent's money went and what was avoidable. No config, no API key, no account, and nothing leaves your machine.",
  description:
    "Case study: AgentDiff, an open-source tool by Sahil Gangurde that shows what AI coding agents cost and why, and catches agent regressions in CI.",
  facts: [
    ["Role", "Founder and sole engineer"],
    ["Studio", "KerrShift"],
    ["Started", "August 2026"],
    ["Licence", "Open source, MIT"],
  ] as [string, string][],
};

// Hero visual: one real week, from the README.
export const week = {
  label: "12 sessions · 7 projects · $314.61",
  rows: [
    { name: "Re-reading context", value: 162.64, share: 52 },
    { name: "Writing context to cache", value: 93.33, share: 30 },
    { name: "Model output", value: 51.34, share: 16 },
    { name: "Background calls", value: 7.28, share: 2 },
  ],
  avoidable: "Avoidable ≈ $132.08, 42% of spend",
};

export const pressures = [
  {
    icon: "coins",
    title: "A bill without a reason",
    text: "Agent invoices show a total. They don't say which session, which habit or which file made it expensive, so nobody can change anything.",
  },
  {
    icon: "layers",
    title: "Most spend isn't writing code",
    text: "On real usage, most of the money goes to re-reading a growing conversation every turn and rebuilding the prompt cache after a break.",
  },
  {
    icon: "alert",
    title: "Logs hold your source code",
    text: "Session logs contain the code you work on. A tool that uploads them to analyse costs is a tool many teams can't use.",
  },
];

export const flow = [
  { icon: "ingest", step: "Read", text: "Claude Code and Codex session logs already on your machine, subagents included" },
  { icon: "validate", step: "Count once", text: "Each billed request exactly once, even across resumed and forked sessions" },
  { icon: "coins", step: "Price", text: "Per model at list prices: input, output, cache reads and both cache-write tiers" },
  { icon: "target", step: "Find", text: "Long context, cache rebuilds, stuck retries, repeated reads and costly subagents" },
  { icon: "publish", step: "Report", text: "Where the money went, what was avoidable, and what to do about it" },
];

export const stats = [
  { value: "0.7", label: "releases, latest version" },
  { value: "99", label: "commits, all by me" },
  { value: "463", label: "tests" },
  { value: "2", label: "agents read: Claude Code, Codex" },
  { value: "4", label: "ways to install" },
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
    tag: "Focus",
    title: "Follow the money, not the trace",
    problem:
      "AgentDiff began as a CI gate that compares an agent's execution path to a baseline. It worked, but the question developers actually asked was simpler: why is my agent bill so high?",
    decision:
      "Lead with the spend report for the coding agents people already run, and keep the regression gate as a maintained second feature for teams building their own agents.",
    outcome: "One command answers the question people have, and the original gate still ships for LangGraph, CrewAI and OpenAI Agents SDK users.",
    metric: { value: "1", label: "command, no config" },
  },
  {
    tag: "Accuracy",
    title: "Count every request exactly once",
    problem:
      "Claude Code repeats usage on every content block of a request, and resumed or forked sessions copy their parent's history. Naive totals count the same tokens several times.",
    decision:
      "De-duplicate billed requests across blocks, resumes and forks, and cross-check against Claude Code's own cost counter where a session has one.",
    outcome: "Totals match the agent's own numbers, and the gap that remains is shown honestly as background calls not in the transcript.",
    metric: { value: "1×", label: "each billed request" },
  },
  {
    tag: "Trust",
    title: "Nothing leaves the machine",
    problem: "Session logs contain source code. Uploading them for analysis would rule out most companies.",
    decision: "Run entirely locally: no network calls, no telemetry, no account and no API key.",
    outcome: "Anyone can run it on real work logs without asking security for permission.",
    metric: { value: "0", label: "network calls" },
  },
  {
    tag: "Reach",
    title: "Install it however you already work",
    problem: "A Python tool is a hurdle for JavaScript developers, and a CLI is a hurdle inside an agent session.",
    decision:
      "Ship the same CLI through PyPI, npm (a small launcher), uv and pipx, plus a Claude Code plugin so the agent can run the report and explain it.",
    outcome: "npx, uvx, pip or /agentdiff:report all run the same version of the same tool.",
    metric: { value: "4", label: "install paths, one CLI" },
  },
];

export const leadResult = {
  value: "42%",
  label: "of one real week's agent spend found avoidable, with a fix named for each item",
  note: "From the author's own Claude Code logs: $314.61 across 12 sessions, $132.08 of it avoidable, mostly long context re-sent every turn and caches rebuilt after breaks. Estimates are deliberately conservative.",
};

export const results = [
  { value: "MIT", label: "open source, on GitHub, PyPI and npm" },
  { value: "2", label: "agents supported today: Claude Code and OpenAI Codex CLI" },
  { value: "7", label: "kinds of avoidable spend detected and explained" },
  { value: "6+", label: "agent frameworks the CI regression gate reads" },
  { value: "0", label: "telemetry, accounts or API keys" },
];

export const stack = [
  { icon: "engine", group: "Core", items: ["Python", "Pydantic", "NetworkX", "Typer", "Rich"] },
  { icon: "publish", group: "Distribution", items: ["PyPI", "npm launcher", "uv", "pipx", "Claude Code plugin"] },
  { icon: "lab", group: "Quality", items: ["pytest", "GitHub Actions", "Benchmarks"] },
  { icon: "globe", group: "Web", items: ["agentdiff.app", "Documentation site"] },
];

export const takeaway = "Developers don't need more dashboards. They need the one number that changes a habit.";

export const reflection = [
  "AgentDiff is in pre-release and moving quickly: Codex support landed in 0.7, and Gemini CLI and Cursor are next. It's the first product from KerrShift, my studio.",
  "The lesson from building it: start from the question people already ask, keep their data on their machine, and make every number something they can check.",
];
