"use client";

import { useEffect, useState, useMemo } from "react";
import { GitPullRequest, GitMerge, ExternalLink, Globe, Lock, Cpu } from "lucide-react";
import stats from "@/data/github-stats.json";
import Link from "next/link";

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

const PR_CACHE_KEY = "gh_external_prs_2026_only_v19";
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

// Detailed database for highlights. We merge this into the PR list based on repo & number.
const PR_DETAILS_MAP: Record<string, { problem: string; solution: string; tech: string[] }> = {
  "BerriAI/litellm#36660": {
    problem: "When proxying requests to OpenAI's passthrough embeddings endpoint (/v1/embeddings), LiteLLM did not log billing/spend metrics. This created a security loophole where client API keys could consume unlimited embeddings tokens without being charged or constrained by global proxy budgets.",
    solution: "Intercepted raw passthrough embeddings response payloads to parse token consumption metrics, dynamically updating the database spend tables to enforce key/team billing boundaries.",
    tech: ["Python", "LiteLLM Proxy", "OpenAI API", "Database Triggers"]
  },
  "BerriAI/litellm#36953": {
    problem: "Resetting global proxy budgets caused cached billing limits to temporarily conflict, triggering false BudgetExceededError events and blocking legitimate user requests.",
    solution: "Cleared cached balance indices and global budget contexts on reset, ensuring immediate local recalculation of billing limits.",
    tech: ["Python", "Cache Invalidation", "Concurrency Control"]
  },
  "BerriAI/litellm#36542": {
    problem: "The dashboard UI was missing the option to configure Meta Model API endpoints from the provider dropdown, requiring developers to configure them manually in config files.",
    solution: "Appended Meta Model API into the React configuration forms and mapped it to the backend provider route configurations.",
    tech: ["TypeScript", "React", "Next.js UI"]
  }
};

// Hardcoded fallback list in case GitHub API limit is hit or for absolute offline reliability
const BACKUP_PRS: PullRequest[] = [
  {
    id: 36953,
    title: "fix(proxy): prevent false BudgetExceededError after global proxy budget reset",
    url: "https://github.com/BerriAI/litellm/pull/36953",
    repo: "BerriAI/litellm",
    repoUrl: "https://github.com/BerriAI/litellm",
    state: "open",
    createdAt: "2026-08-14T12:00:00Z",
    number: 36953
  },
  {
    id: 36660,
    title: "fix(proxy): track spend for OpenAI passthrough /v1/embeddings",
    url: "https://github.com/BerriAI/litellm/pull/36660",
    repo: "BerriAI/litellm",
    repoUrl: "https://github.com/BerriAI/litellm",
    state: "merged",
    createdAt: "2026-08-12T10:00:00Z",
    number: 36660
  },
  {
    id: 36542,
    title: "fix(ui): add Meta Model API to the Add Model provider dropdown",
    url: "https://github.com/BerriAI/litellm/pull/36542",
    repo: "BerriAI/litellm",
    repoUrl: "https://github.com/BerriAI/litellm",
    state: "open",
    createdAt: "2026-08-08T15:00:00Z",
    number: 36542
  }
];

export default function OSSContributionsPage() {
  const [prs, setPrs] = useState<PullRequest[]>([]);
  const [loadingPrs, setLoadingPrs] = useState(true);
  const [filter, setFilter] = useState<"all" | "merged" | "open" | "draft" | "closed">("all");

  // Fetch 2026 Public PRs Only
  useEffect(() => {
    async function fetchPRs() {
      try {
        const cached = sessionStorage.getItem(PR_CACHE_KEY) || localStorage.getItem(PR_CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL && Array.isArray(data) && data.length > 0) {
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
            const isDraft = Boolean(item.draft) && item.state === "open";
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

        // Ensure we always merge or prepend our key backup PRs if not already present
        const mergedList = [...formatted];
        BACKUP_PRS.forEach((backup) => {
          if (!mergedList.some((p) => p.repo === backup.repo && p.number === backup.number)) {
            mergedList.push(backup);
          }
        });
        // Sort descending by date
        mergedList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setPrs(mergedList);

        try {
          const payload = JSON.stringify({ data: mergedList, timestamp: Date.now() });
          sessionStorage.setItem(PR_CACHE_KEY, payload);
          localStorage.setItem(PR_CACHE_KEY, payload);
        } catch {}
      } catch (err) {
        console.error("Failed to load 2026 PRs, using backup database:", err);
        setPrs(BACKUP_PRS);
      } finally {
        setLoadingPrs(false);
      }
    }

    fetchPRs();
  }, []);

  // Filter public PR list based on selected filter
  const filteredPrs = useMemo(() => {
    const list = prs.length > 0 ? prs : BACKUP_PRS;
    if (filter === "all") return list;
    return list.filter((p) => p.state === filter);
  }, [prs, filter]);

  // Count items for each filter state
  const counts = useMemo(() => {
    const list = prs.length > 0 ? prs : BACKUP_PRS;
    return {
      all: list.length,
      merged: list.filter((p) => p.state === "merged").length,
      open: list.filter((p) => p.state === "open").length,
      draft: list.filter((p) => p.state === "draft").length,
      closed: list.filter((p) => p.state === "closed").length,
    };
  }, [prs]);

  const privatePrs = stats.prs.externalClientOrgs;

  return (
    <main className="space-y-6">
      {/* 1. Header */}
      <header className="space-y-1">
        <h1 className="text-[1.75rem] sm:text-[2.4rem] font-bold tracking-tight leading-tight text-foreground">
          Open source, in public.
        </h1>
        <p className="text-[15px] text-foreground/75 leading-relaxed max-w-xl">
          A unified timeline tracking upstream open-source code upgrades, core features, and verified enterprise integrations.
        </p>
      </header>

      {/* 2. Unified Overview Metrics */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm text-foreground/80 font-sans py-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-bold text-accent text-lg sm:text-xl leading-none tabular-nums">{stats.summary.publicContributions}</span>
          <span>open source commits</span>
        </div>
        <span className="hidden sm:inline text-foreground/25">·</span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-bold text-accent text-lg sm:text-xl leading-none tabular-nums">{privatePrs.merged}</span>
          <span>enterprise PRs merged</span>
        </div>
        <span className="hidden sm:inline text-foreground/25">·</span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-bold text-accent text-lg sm:text-xl leading-none tabular-nums">{privatePrs.clientOrgsCount}</span>
          <span>partner organizations</span>
        </div>
      </div>

      <hr className="border-border" />

      {/* 3. Unified Activity Timeline */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-accent">
            Upstream Pull Requests (2026)
          </h2>

          <div className="flex items-center gap-1 border border-border/60 rounded-full p-0.5 overflow-x-auto max-w-full scrollbar-none">
            {(["all", "merged", "open", "draft", "closed"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-3 py-1 text-xs font-sans uppercase tracking-wide rounded-full transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  filter === mode
                    ? "bg-accent text-accent-foreground font-semibold shadow-xs"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
                }`}
              >
                <span>{mode}</span>
                <span
                  className={`text-[10px] font-sans font-semibold px-1.5 rounded-full ${
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

        {loadingPrs ? (
          <div className="space-y-6 animate-pulse pl-4 border-l-2 border-border/40 py-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 relative">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-border" />
                <div className="h-4 bg-foreground/5 rounded w-1/3" />
                <div className="h-3.5 bg-foreground/5 rounded w-4/5" />
              </div>
            ))}
          </div>
        ) : filteredPrs.length === 0 ? (
          <div className="text-sm text-foreground/60 py-10 text-center italic font-sans border-y border-border/60">
            No pull requests found matching the &quot;{filter}&quot; filter.
          </div>
        ) : (
          <div className="relative border-l border-border/70 pl-4 sm:pl-6 ml-1.5 sm:ml-2.5 space-y-8 py-2">
            {filteredPrs.map((pr) => {
              const detailsKey = `${pr.repo}#${pr.number}`;
              const prDetails = PR_DETAILS_MAP[detailsKey];
              const owner = pr.repo.split("/")[0];

              // Colors based on state
              const dotColorClass =
                pr.state === "merged"
                  ? "bg-[#8250df] ring-4 ring-[#8250df]/10"
                  : pr.state === "open"
                  ? "bg-[#1a7f37] ring-4 ring-[#1a7f37]/10"
                  : pr.state === "draft"
                  ? "bg-[#656d76] ring-4 ring-[#656d76]/10"
                  : "bg-[#cf222e] ring-4 ring-[#cf222e]/10";

              return (
                <div key={pr.id} className="relative group transition-colors">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[20.5px] sm:-left-[30.5px] top-1.5 w-2 h-2 rounded-full transition-all ${dotColorClass}`} />

                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="w-5 h-5 rounded-full border border-border/30 overflow-hidden bg-foreground/[0.04] shrink-0 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://github.com/${owner}.png?size=32`}
                          alt={owner}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <a
                        href={pr.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-accent hover:underline"
                      >
                        {pr.repo}
                      </a>
                      <span className="text-foreground/45 text-xs">#{pr.number}</span>
                      
                      <span
                        className={`inline-flex items-center text-[10px] font-sans font-bold uppercase tracking-wider select-none ${
                          pr.state === "merged"
                            ? "text-[#8250df]"
                            : pr.state === "open"
                            ? "text-[#1a7f37]"
                            : pr.state === "draft"
                            ? "text-[#656d76]"
                            : "text-[#cf222e]"
                        }`}
                      >
                        {pr.state}
                      </span>
                    </div>

                    <div className="text-sm text-foreground/55 tabular-nums sm:text-right">
                      {new Date(pr.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Title & Link */}
                  <h3 className="text-sm font-semibold text-foreground leading-snug mt-1.5">
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent inline-flex items-baseline gap-1 group/link transition-colors"
                    >
                      <span>{pr.title}</span>
                      <ExternalLink className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shrink-0 self-center" />
                    </a>
                  </h3>

                  {/* Problem & Solution detailed breakdowns nested inside the timeline node (No box/card style) */}
                  {prDetails && (
                    <div className="mt-3.5 space-y-3.5 max-w-4xl pl-4 py-0.5">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-sans text-foreground/50 uppercase tracking-wider font-bold block">The Problem</span>
                        <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                          {prDetails.problem}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-sans text-accent/80 uppercase tracking-wider font-bold block">The Solution</span>
                        <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                          {prDetails.solution}
                        </p>
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {prDetails.tech.map((t, i) => (
                          <span key={t} className="text-[13px] text-foreground/55">
                            {t}{i < prDetails.tech.length - 1 && <span className="text-foreground/25"> ·</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
