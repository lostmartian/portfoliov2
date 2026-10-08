"use client";

import { useEffect, useState, useMemo } from "react";
import PageHeader, { PageBody } from "@/components/ui/PageHeader";
import stats from "@/data/github-stats.json";

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

  const STAMP: Record<PullRequest["state"], string> = {
    merged: "border-leaf text-leaf",
    open: "border-accent text-accent",
    draft: "border-muted text-muted",
    closed: "border-foreground/40 text-muted",
  };
  const mono = { fontFamily: "var(--font-geist-mono)" };

  return (
    <main>
      <PageHeader mr="मुक्त स्रोत" label="Open source" title={<>Open source, <span className="serif text-accent">in public.</span></>}>
        Upstream pull requests to the tools I depend on, alongside the private work merged for client organisations.
      </PageHeader>

      <PageBody>
        {/* Ledger head */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 border-y border-foreground/70">
          {[
            [stats.summary.publicContributions, "Open-source commits", stats.year],
            [counts.all, "Upstream pull requests", stats.year],
            [privatePrs.merged, "Client PRs merged", "private repos"],
            [privatePrs.clientOrgsCount, "Partner organisations", `${privatePrs.privateReposCount} repositories`],
          ].map(([v, k, sub], i) => (
            <div key={k as string} className={`py-6 ${i % 2 ? "pl-6 border-l border-border" : "lg:pr-6"} ${i === 2 ? "lg:pl-6 lg:border-l" : ""} ${i >= 2 ? "max-lg:border-t max-lg:border-border" : ""}`}>
              <dt className="font-display text-5xl sm:text-6xl leading-none tabular-nums">{v}</dt>
              <dd className="mt-2 text-sm">{k}</dd>
              <dd className="label mt-1">{sub}</dd>
            </div>
          ))}
        </dl>

        {/* Register */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <h2 className="text-4xl sm:text-5xl leading-none">
              Upstream, <span className="serif text-accent">{stats.year}.</span>
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2" role="tablist" aria-label="Filter pull requests">
              {(["all", "merged", "open", "draft", "closed"] as const).map((mode) => (
                <button
                  key={mode}
                  role="tab"
                  aria-selected={filter === mode}
                  onClick={() => setFilter(mode)}
                  className={`relative pb-1.5 text-[14px] capitalize cursor-pointer transition-colors ${filter === mode ? "text-foreground" : "text-muted hover:text-foreground"}`}
                >
                  {mode} <span className="tabular-nums text-muted">{counts[mode]}</span>
                  <span className={`absolute left-0 right-0 -bottom-px h-[2px] bg-accent transition-transform duration-500 origin-left ${filter === mode ? "scale-x-100" : "scale-x-0"}`} />
                </button>
              ))}
            </div>
          </div>

          {loadingPrs ? (
            <div className="border-t border-foreground/70">
              {[1, 2, 3].map((i) => (
                <div key={i} className="py-8 border-b border-border animate-pulse space-y-3">
                  <div className="h-4 bg-foreground/5 w-1/4" />
                  <div className="h-6 bg-foreground/5 w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredPrs.length === 0 ? (
            <p className="py-14 text-center font-display italic text-2xl text-muted border-y border-border">Nothing {filter} right now.</p>
          ) : (
            <ol className="border-t border-foreground/70">
              {filteredPrs.map((pr) => {
                const prDetails = PR_DETAILS_MAP[`${pr.repo}#${pr.number}`];
                return (
                  <li key={pr.id} className="group ink-row grid grid-cols-1 md:grid-cols-[150px_1fr_auto] gap-x-8 gap-y-3 py-8 border-b border-border">
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[13px] text-muted tabular-nums" style={mono}>
                        {new Date(pr.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                      <a href={pr.repoUrl} target="_blank" rel="noopener noreferrer" className="block text-[14px] link-u w-fit">{pr.repo}</a>
                      <p className="text-[12px] text-muted" style={mono}>#{pr.number}</p>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl sm:text-[1.7rem] leading-snug">
                        <a href={pr.url} target="_blank" rel="noopener noreferrer" className="transition-colors group-hover:text-accent">
                          {pr.title}
                        </a>
                      </h3>
                      {prDetails && (
                        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5">
                          <div>
                            <p className="label mb-2">The problem</p>
                            <p className="text-[15px] text-muted leading-relaxed">{prDetails.problem}</p>
                          </div>
                          <div>
                            <p className="label mb-2 !text-accent">The fix</p>
                            <p className="text-[15px] text-muted leading-relaxed">{prDetails.solution}</p>
                          </div>
                          <p className="lg:col-span-2 text-[13px] text-muted">{prDetails.tech.join("  ·  ")}</p>
                        </div>
                      )}
                    </div>
                    <div className="md:pt-1">
                      <span className={`inline-block -rotate-6 border-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-transform duration-500 group-hover:rotate-0 ${STAMP[pr.state]}`}>
                        {pr.state}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      </PageBody>
    </main>
  );
}
