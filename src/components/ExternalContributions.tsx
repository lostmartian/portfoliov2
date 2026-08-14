"use client";

import { useEffect, useState, useMemo } from "react";
import { GitPullRequest, GitMerge, ExternalLink, Lock, GitBranch, Activity } from "lucide-react";
import stats from "@/data/github-stats.json";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface PullRequest {
  id: number;
  title: string;
  url: string;
  repo: string;
  repoUrl: string;
  state: "merged" | "open" | "closed" | "draft";
  createdAt: string;
  number: number;
}

interface GitHubSearchItem {
  id: number;
  title: string;
  html_url: string;
  number: number;
  repository_url: string;
  state: string;
  draft?: boolean;
  created_at: string;
  pull_request?: {
    merged_at?: string;
  };
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionData {
  total: {
    lastYear: number;
  };
  contributions: ContributionDay[];
}

interface ChartPoint {
  week: string;
  count: number;
  startDate: string;
}

const PR_CACHE_KEY = "gh_external_prs_2026_only_v19";
const CONTRIBS_CACHE_KEY = "gh_contribs_2026_only_v19";
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

export default function ExternalContributions() {
  const [prs, setPrs] = useState<PullRequest[]>([]);
  const [contribData, setContribData] = useState<ContributionData | null>(null);
  const [loadingPrs, setLoadingPrs] = useState(true);
  const [loadingContribs, setLoadingContribs] = useState(true);
  const [filter, setFilter] = useState<"all" | "merged" | "open" | "draft" | "closed">("all");

  // Fetch 2026 Public PRs Only
  useEffect(() => {
    async function fetchPRs() {
      try {
        const cached = sessionStorage.getItem(PR_CACHE_KEY) || localStorage.getItem(PR_CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL && Array.isArray(data)) {
            setPrs(data);
            setLoadingPrs(false);
            return;
          }
        }
      } catch {
        // Fallback to fetch
      }

      try {
        const username = "lostmartian";
        const query = `is:pr author:${username} -user:${username} is:public created:>=2026-01-01`;
        const res = await fetch(
          `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=30`
        );

        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);

        const json = await res.json();
        const items = json.items || [];

        const formatted: PullRequest[] = items
          .filter((item: GitHubSearchItem) => {
            const repoPath = item.repository_url?.replace("https://api.github.com/repos/", "") || "";
            const is2026 = new Date(item.created_at).getFullYear() === 2026;
            const isExternal = repoPath && !repoPath.toLowerCase().startsWith(`${username.toLowerCase()}/`);
            return isExternal && is2026;
          })
          .map((item: GitHubSearchItem) => {
            const repo = item.repository_url.replace("https://api.github.com/repos/", "");
            const isMerged = Boolean(item.pull_request?.merged_at);
            const isDraft = Boolean(item.draft);
            return {
              id: item.id,
              title: item.title,
              url: item.html_url,
              number: item.number,
              repo,
              repoUrl: `https://github.com/${repo}`,
              state: isMerged ? "merged" : isDraft ? "draft" : item.state === "open" ? "open" : "closed",
              createdAt: item.created_at,
            };
          });

        setPrs(formatted);

        try {
          const payload = JSON.stringify({ data: formatted, timestamp: Date.now() });
          sessionStorage.setItem(PR_CACHE_KEY, payload);
          localStorage.setItem(PR_CACHE_KEY, payload);
        } catch {}
      } catch (err) {
        console.error("Failed to load 2026 PRs:", err);
      } finally {
        setLoadingPrs(false);
      }
    }

    fetchPRs();
  }, []);

  // Fetch Contribution Data
  useEffect(() => {
    async function fetchContributions() {
      try {
        const cached = sessionStorage.getItem(CONTRIBS_CACHE_KEY) || localStorage.getItem(CONTRIBS_CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL && data?.contributions) {
            setContribData(data);
            setLoadingContribs(false);
            return;
          }
        }
      } catch {
        // Fallback to fetch
      }

      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/lostmartian?y=last");
        if (!res.ok) throw new Error(`Contrib API returned ${res.status}`);

        const data: ContributionData = await res.json();
        setContribData(data);

        try {
          const payload = JSON.stringify({ data, timestamp: Date.now() });
          sessionStorage.setItem(CONTRIBS_CACHE_KEY, payload);
          localStorage.setItem(CONTRIBS_CACHE_KEY, payload);
        } catch {}
      } catch (err) {
        console.error("Failed to load contribution graph:", err);
      } finally {
        setLoadingContribs(false);
      }
    }

    fetchContributions();
  }, []);

  // Build chart data for 2026 (Jan 1, 2026 onwards) — weekly buckets
  const { chartData, total2026Contributions } = useMemo(() => {
    if (!contribData?.contributions || contribData.contributions.length === 0) {
      return { chartData: [] as ChartPoint[], total2026Contributions: stats.totalContributions };
    }

    const daily2026 = contribData.contributions.filter((d) => d.date >= "2026-01-01");
    const sum2026 = daily2026.reduce((acc, curr) => acc + curr.count, 0);

    const buckets: ChartPoint[] = [];
    for (let i = 0; i < daily2026.length; i += 7) {
      const chunk = daily2026.slice(i, i + 7);
      const sum = chunk.reduce((acc, curr) => acc + curr.count, 0);
      const start = chunk[0]?.date || "";
      const label = new Date(start).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      buckets.push({ week: label, count: sum, startDate: start });
    }

    return {
      chartData: buckets,
      total2026Contributions: sum2026 > 0 ? sum2026 : stats.totalContributions,
    };
  }, [contribData]);

  // Filter public PR list based on selected filter
  const filteredPrs = useMemo(() => {
    if (filter === "all") return prs;
    return prs.filter((p) => p.state === filter);
  }, [prs, filter]);

  // Count items for each filter state
  const counts = useMemo(() => {
    return {
      all: prs.length,
      merged: prs.filter((p) => p.state === "merged").length,
      open: prs.filter((p) => p.state === "open").length,
      draft: prs.filter((p) => p.state === "draft").length,
      closed: prs.filter((p) => p.state === "closed").length,
    };
  }, [prs]);

  // Private PR details from static config JSON
  const privatePrs = stats.prs.externalClientOrgs;

  return (
    <section className="space-y-6">
      {/* 1. Header Area with Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-accent">
            Open Source Activity
          </h2>
        </div>

        <a
          href="https://github.com/pulls?q=is%3Apr+author%3Alostmartian+-user%3Alostmartian+is%3Apublic+created%3A%3E%3D2026-01-01"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-foreground/70 hover:text-accent font-sans transition-colors group shrink-0"
        >
          <span>Upstream Activity</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* 2. Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Bento Card 1: Interactive Contribution Graph (2/3 width) */}
        <div className="md:col-span-2 border border-border bg-card-bg rounded-xs p-5 flex flex-col justify-between relative group shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-sans uppercase tracking-wider text-foreground/60 block font-bold">Cadence Visualization</span>
              <h3 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-accent" />
                <span>Weekly Contribution Graph (2026 YTD)</span>
              </h3>
            </div>
            <span className="text-[10px] font-sans text-foreground/65 italic hidden sm:inline">
              Hover for weekly count
            </span>
          </div>

          {loadingContribs ? (
            <div className="h-36 w-full animate-pulse bg-foreground/5 rounded-xs" />
          ) : (
            <ResponsiveContainer width="100%" height={144}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
                <defs>
                  <linearGradient id="contribGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.22} />
                    <stop offset="90%" stopColor="var(--accent)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="2 2"
                  stroke="currentColor"
                  strokeOpacity={0.1}
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 9, fill: "currentColor", opacity: 0.55, fontFamily: "var(--font-sans)" }}
                  tickLine={false}
                  axisLine={{ stroke: "currentColor", strokeOpacity: 0.15 }}
                  interval="preserveStartEnd"
                />
                <Tooltip
                  cursor={{ stroke: "var(--accent)", strokeWidth: 1, strokeDasharray: "3 3", strokeOpacity: 0.5 }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as ChartPoint;
                    return (
                      <div className="bg-background/95 backdrop-blur-sm border border-border/80 px-2.5 py-1.5 rounded shadow-md text-[10px] font-mono text-foreground min-w-[110px]">
                        <div className="font-bold text-accent">{d.count} contributions</div>
                        <div className="text-[9px] text-foreground/55 mt-0.5 uppercase tracking-tight">Wk of {d.week}</div>
                      </div>
                    );
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  fill="url(#contribGradient)"
                  dot={false}
                  activeDot={{ r: 4, fill: "var(--accent)", strokeWidth: 2, stroke: "var(--background)" }}
                  isAnimationActive={true}
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bento Card 2: Main metrics panel (1/3 width) */}
        <div className="md:col-span-1 border border-border bg-card-bg rounded-xs p-5 flex flex-col justify-between group shadow-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] font-sans uppercase tracking-wider text-foreground/60 block font-bold">Contributions YTD</span>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Engineering Aggregates
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3.5 my-5">
            <div className="border border-border/40 p-3 bg-foreground/[0.03] dark:bg-foreground/[0.04] rounded-xs flex flex-col justify-center transition-colors hover:border-accent/30">
              <span className="text-[9px] font-sans uppercase tracking-wider text-foreground/65 font-bold">Total Work</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-accent mt-0.5 leading-none">
                {total2026Contributions.toLocaleString()}
              </span>
              <span className="text-[8px] font-sans text-foreground/70 mt-0.5 uppercase tracking-wide">Contributions YTD</span>
            </div>
            <div className="border border-border/40 p-3 bg-foreground/[0.03] dark:bg-foreground/[0.04] rounded-xs flex flex-col justify-center transition-colors hover:border-accent/30">
              <span className="text-[9px] font-sans uppercase tracking-wider text-foreground/65 font-bold">Commits</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-0.5 leading-none">
                {stats.summary.totalCommits}
              </span>
              <span className="text-[8px] font-sans text-foreground/70 mt-0.5 uppercase tracking-wide">Commits Pushed</span>
            </div>
            <div className="border border-border/40 p-3 bg-foreground/[0.03] dark:bg-foreground/[0.04] rounded-xs flex flex-col justify-center transition-colors hover:border-accent/30">
              <span className="text-[9px] font-sans uppercase tracking-wider text-foreground/65 font-bold">PRs Created</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-0.5 leading-none">
                {stats.summary.totalPRs}
              </span>
              <span className="text-[8px] font-sans text-foreground/70 mt-0.5 uppercase tracking-wide">Pull Requests</span>
            </div>
            <div className="border border-border/40 p-3 bg-foreground/[0.03] dark:bg-foreground/[0.04] rounded-xs flex flex-col justify-center transition-colors hover:border-accent/30">
              <span className="text-[9px] font-sans uppercase tracking-wider text-foreground/65 font-bold">Codebases</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-foreground mt-0.5 leading-none">
                {stats.summary.totalRepositories}
              </span>
              <span className="text-[8px] font-sans text-foreground/70 mt-0.5 uppercase tracking-wide">Active Repos</span>
            </div>
          </div>

          <p className="text-[9px] text-foreground/60 leading-relaxed font-sans">
            Metrics combine public open-source and restricted enterprise commits. Updated daily.
          </p>
        </div>

        {/* Bento Card 3: Private Enterprise Showcase (1/3 width) */}
        <div className="md:col-span-1 border border-border bg-card-bg rounded-xs p-5 flex flex-col justify-between relative overflow-hidden group shadow-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-wider text-foreground/60 font-bold">
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span>Proprietary Work</span>
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Enterprise Contributions
            </h3>
          </div>

          <div className="space-y-3 my-5 z-10">
            <div className="flex justify-between items-baseline border-b border-border/10 pb-1.5">
              <span className="text-xs text-foreground/90 font-sans">Merged PRs</span>
              <span className="font-mono text-xs font-bold text-accent">
                {privatePrs.merged} merged
              </span>
            </div>
            <div className="flex justify-between items-baseline border-b border-border/10 pb-1.5">
              <span className="text-xs text-foreground/90 font-sans">Enterprise Repositories</span>
              <span className="font-mono text-xs font-bold text-foreground">
                {privatePrs.privateReposCount} repos
              </span>
            </div>
            <div className="flex justify-between items-baseline border-b border-border/10 pb-1.5">
              <span className="text-xs text-foreground/90 font-sans">Client Organizations</span>
              <span className="font-mono text-xs font-bold text-foreground">
                {privatePrs.clientOrgsCount} orgs
              </span>
            </div>
          </div>

          <p className="text-[9px] text-foreground/60 leading-relaxed z-10 font-sans">
            Restricted systems and proprietary client repositories subject to NDA. Verified via local commit parity.
          </p>

          {/* Connected Mesh Graphic in background */}
          <span className="absolute right-4 bottom-4 w-20 h-20 opacity-45 pointer-events-none hidden sm:block">
            <svg viewBox="0 0 100 100" className="w-full h-full text-accent" stroke="currentColor" fill="currentColor">
              <circle cx="20" cy="30" r="2" />
              <circle cx="50" cy="20" r="2" />
              <circle cx="85" cy="35" r="2" />
              <circle cx="35" cy="75" r="2" />
              <circle cx="75" cy="70" r="2" />
              <line x1="20" y1="30" x2="50" y2="20" strokeWidth="0.5" />
              <line x1="50" y1="20" x2="85" y2="35" strokeWidth="0.5" />
              <line x1="20" y1="30" x2="35" y2="75" strokeWidth="0.5" />
              <line x1="35" y1="75" x2="75" y2="70" strokeWidth="0.5" />
              <line x1="85" y1="35" x2="75" y2="70" strokeWidth="0.5" />
              <line x1="50" y1="20" x2="35" y2="75" strokeWidth="0.5" />
              <line x1="50" y1="20" x2="75" y2="70" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
            </svg>
          </span>
        </div>

        {/* Bento Card 4: PR Activity Feed & Tabs (2/3 width) */}
        <div className="md:col-span-2 border border-border bg-card-bg rounded-xs p-5 space-y-4 flex flex-col justify-between group shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-sans uppercase tracking-wider text-foreground/60 block font-semibold">Upstream Submissions</span>
              <h3 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-accent" />
                <span>Pull Request Activity Feed (2026)</span>
              </h3>
            </div>

            {/* Sliding-Pill Filter controls */}
            <div className="flex items-center gap-1 bg-foreground/[0.03] border border-border/30 rounded-xs p-0.5 self-start sm:self-center overflow-x-auto max-w-full scrollbar-none">
              {(["all", "merged", "open", "draft", "closed"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilter(mode)}
                  className={`px-2 py-0.5 text-[9px] font-sans uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                    filter === mode
                      ? "bg-accent text-accent-foreground font-semibold shadow-xs"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
                  }`}
                >
                  <span>{mode}</span>
                  <span
                    className={`text-[8px] font-sans font-semibold px-1 rounded-full ${
                      filter === mode
                        ? "bg-accent-foreground/20 text-accent-foreground"
                        : "bg-foreground/[0.08] text-foreground/60"
                    }`}
                  >
                    {counts[mode]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2.5 scrollbar-thin scrollbar-thumb-foreground/15 scrollbar-track-transparent pt-1">
            {loadingPrs ? (
              <div className="space-y-3.5 animate-pulse pt-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2 pt-3 first:pt-0">
                    <div className="flex justify-between items-center">
                      <div className="h-3.5 bg-foreground/5 rounded-xs w-1/3" />
                      <div className="h-3 bg-foreground/5 rounded-xs w-1/6" />
                    </div>
                    <div className="h-3 bg-foreground/5 rounded-xs w-4/5" />
                  </div>
                ))}
              </div>
            ) : filteredPrs.length === 0 ? (
              <div className="text-xs text-foreground/70 py-6 italic font-sans flex items-start gap-2 justify-center">
                <span>No upstream PRs match the &quot;{filter}&quot; filter.</span>
              </div>
            ) : (
              filteredPrs.map((pr, index) => {
                const owner = pr.repo.split("/")[0];
                return (
                  <div
                    key={pr.id}
                    className={`pt-3 first:pt-0 group/pr flex gap-3 transition-all ${
                      index > 0 ? "border-t border-border/10" : ""
                    }`}
                  >
                    {/* Org Avatar */}
                    <div className="w-8 h-8 rounded-full border border-border/30 overflow-hidden bg-foreground/[0.04] shrink-0 mt-0.5 relative group-hover/pr:border-accent/40 transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://github.com/${owner}.png?size=40`}
                        alt={owner}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* PR Info */}
                    <div className="flex-grow space-y-1.5 min-w-0">
                      {/* PR Title/Description (Main focus on top) */}
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors inline-flex items-baseline gap-1 group/link"
                        >
                          <span className="line-clamp-2">{pr.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-accent opacity-0 group-hover/pr:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shrink-0 self-center" />
                        </a>
                      </p>

                      {/* PR Meta Block (Status, org/repo, PR number, date grouped below) */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-0.5">
                        {/* State badge */}
                        <span
                          className={`inline-flex items-center gap-1 text-[8px] font-sans font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider border select-none ${
                            pr.state === "merged"
                              ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20 dark:border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.1)]"
                              : pr.state === "open"
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.1)]"
                              : pr.state === "draft"
                              ? "bg-stone-500/10 text-stone-600 dark:text-stone-400 border-stone-500/25 dark:border-stone-500/30 shadow-[0_0_8px_rgba(120,113,108,0.05)]"
                              : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20 dark:border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.1)]"
                          }`}
                        >
                          {pr.state === "merged" ? (
                            <GitMerge className="w-2.5 h-2.5 shrink-0" />
                          ) : pr.state === "open" ? (
                            <>
                              <GitPullRequest className="w-2.5 h-2.5 shrink-0" />
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                              </span>
                            </>
                          ) : pr.state === "draft" ? (
                            <>
                              <GitPullRequest className="w-2.5 h-2.5 shrink-0 opacity-60" />
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-500 shrink-0" />
                            </>
                          ) : (
                            <>
                              <GitPullRequest className="w-2.5 h-2.5 shrink-0" />
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            </>
                          )}
                          <span>{pr.state}</span>
                        </span>

                        {/* Repository and Number */}
                        <div className="flex items-center gap-1.5 min-w-0 text-xs font-mono">
                          <a
                            href={pr.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent/90 hover:text-accent font-semibold hover:underline truncate max-w-[200px] sm:max-w-none"
                          >
                            {pr.repo}
                          </a>
                          <a
                            href={pr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/65 hover:text-foreground/90 transition-colors"
                          >
                            #{pr.number}
                          </a>
                        </div>

                        <span className="text-foreground/35 text-[10px]">&bull;</span>

                        {/* Date */}
                        <span className="text-[10px] text-foreground/60 font-mono">
                          {new Date(pr.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
