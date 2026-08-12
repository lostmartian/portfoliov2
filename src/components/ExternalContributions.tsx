"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { GitPullRequest, GitMerge, ExternalLink, Globe, Lock } from "lucide-react";
import stats from "@/data/github-stats.json";

interface PullRequest {
  id: number;
  title: string;
  url: string;
  repo: string;
  repoUrl: string;
  state: "merged" | "open" | "closed";
  createdAt: string;
  number: number;
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

interface WeekPoint {
  index: number;
  label: string;
  startDate: string;
  endDate: string;
  count: number;
  xPercent: number;
  yPercent: number;
}

interface MonthMarker {
  name: string;
  shortName: string;
  xPercent: number;
  isQuarterly: boolean;
}

const PR_CACHE_KEY = "gh_external_prs_2026_only_v19";
const CONTRIBS_CACHE_KEY = "gh_contribs_2026_only_v19";
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

function getSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return path;
}

export default function ExternalContributions() {
  const [prs, setPrs] = useState<PullRequest[]>([]);
  const [contribData, setContribData] = useState<ContributionData | null>(null);
  const [loadingPrs, setLoadingPrs] = useState(true);
  const [loadingContribs, setLoadingContribs] = useState(true);
  const [activePoint, setActivePoint] = useState<WeekPoint | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
          .filter((item: any) => {
            const repoPath = item.repository_url?.replace("https://api.github.com/repos/", "") || "";
            const is2026 = new Date(item.created_at).getFullYear() === 2026;
            const isExternal = repoPath && !repoPath.toLowerCase().startsWith(`${username.toLowerCase()}/`);
            return isExternal && is2026;
          })
          .map((item: any) => {
            const repo = item.repository_url.replace("https://api.github.com/repos/", "");
            const isMerged = Boolean(item.pull_request?.merged_at);
            return {
              id: item.id,
              title: item.title,
              url: item.html_url,
              number: item.number,
              repo,
              repoUrl: `https://github.com/${repo}`,
              state: isMerged ? "merged" : item.state === "open" ? "open" : "closed",
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

  // Filter contributions and compute line graph for 2026 (Jan 1, 2026 onwards)
  const { linePath, areaPath, points, monthMarkers, baselineY, viewBoxHeight, total2026Contributions } = useMemo(() => {
    if (!contribData?.contributions || contribData.contributions.length === 0) {
      return {
        linePath: "",
        areaPath: "",
        points: [],
        monthMarkers: [],
        baselineY: 76,
        viewBoxHeight: 90,
        total2026Contributions: 0,
      };
    }

    const daily2026 = contribData.contributions.filter((d) => d.date >= "2026-01-01");
    const sum2026 = daily2026.reduce((acc, curr) => acc + curr.count, 0);

    const weeklyBuckets: { startDate: string; endDate: string; count: number; month: string }[] = [];

    for (let i = 0; i < daily2026.length; i += 7) {
      const chunk = daily2026.slice(i, i + 7);
      const sum = chunk.reduce((acc, curr) => acc + curr.count, 0);
      const start = chunk[0]?.date || "";
      const end = chunk[chunk.length - 1]?.date || start;
      const month = new Date(start).toLocaleDateString("en-US", { month: "short" });
      weeklyBuckets.push({ startDate: start, endDate: end, count: sum, month });
    }

    const viewBoxWidth = 1000;
    const vbHeight = 90;
    const paddingTop = 6;
    const baseLine = 76;
    const usableHeight = baseLine - paddingTop;

    const maxCount = Math.max(...weeklyBuckets.map((w) => w.count), 4);

    const calculatedPoints: WeekPoint[] = weeklyBuckets.map((w, idx) => {
      const xPercent = (idx / Math.max(1, weeklyBuckets.length - 1)) * 100;
      const x = (idx / Math.max(1, weeklyBuckets.length - 1)) * viewBoxWidth;
      const y = baseLine - (w.count / maxCount) * usableHeight;
      const yPercent = (y / vbHeight) * 100;

      return {
        index: idx,
        label: w.month,
        startDate: w.startDate,
        endDate: w.endDate,
        count: w.count,
        xPercent,
        yPercent,
      };
    });

    const svgPoints = calculatedPoints.map((p) => ({
      x: (p.xPercent / 100) * viewBoxWidth,
      y: (p.yPercent / 100) * vbHeight,
    }));

    const smoothLine = getSmoothPath(svgPoints);
    const smoothArea = `${smoothLine} L ${viewBoxWidth} ${baseLine} L 0 ${baseLine} Z`;

    const markers: MonthMarker[] = [];
    let lastSeenMonth = "";

    daily2026.forEach((day, index) => {
      const monthName = new Date(day.date).toLocaleDateString("en-US", { month: "short" });
      if (monthName !== lastSeenMonth) {
        lastSeenMonth = monthName;
        const xPercent = (index / Math.max(1, daily2026.length - 1)) * 100;
        markers.push({
          name: monthName,
          shortName: monthName.slice(0, 1),
          xPercent,
          isQuarterly: markers.length % 2 === 0,
        });
      }
    });

    return {
      linePath: smoothLine,
      areaPath: smoothArea,
      points: calculatedPoints,
      monthMarkers: markers,
      baselineY: baseLine,
      viewBoxHeight: vbHeight,
      total2026Contributions: sum2026 > 0 ? sum2026 : stats.totalContributions,
    };
  }, [contribData]);

  // Touch and Mouse tracking
  const updateActivePointFromClientX = (clientXCoord: number) => {
    if (!containerRef.current || points.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(rect.width, clientXCoord - rect.left));
    const ratio = relativeX / rect.width;
    const targetIndex = Math.min(
      points.length - 1,
      Math.max(0, Math.round(ratio * (points.length - 1)))
    );
    setActivePoint(points[targetIndex]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateActivePointFromClientX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateActivePointFromClientX(e.touches[0].clientX);
    }
  };

  // Live 2026 counts
  const liveMerged2026 = prs.filter((p) => p.state === "merged").length;
  const liveOpen2026 = prs.filter((p) => p.state === "open").length;

  const privatePrs = stats.prs.externalClientOrgs;

  return (
    <section className="space-y-4">
      {/* 1. Section Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-accent">
            2026 Open Source &amp; Engineering Activity
          </h2>
          <span className="flex h-1.5 w-1.5 shrink-0 relative" title="Live GitHub Sync Active">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
        </div>

        <a
          href="https://github.com/pulls?q=is%3Apr+author%3Alostmartian+-user%3Alostmartian+is%3Apublic+created%3A%3E%3D2026-01-01"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-foreground/50 hover:text-accent font-mono transition-colors group shrink-0"
        >
          <span>2026 Upstream PRs</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* 2. 2026 Stats Breakdown */}
      <div className="space-y-1.5 text-xs text-foreground font-mono">
        <div className="flex items-start gap-2">
          <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>
          <div className="flex-grow space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="text-foreground/90">
                <strong className="text-foreground font-semibold">
                  {total2026Contributions.toLocaleString()}
                </strong>{" "}
                total contributions across public &amp; private repositories (2026 YTD)
              </span>

              <span className="text-[11px] text-foreground/50 shrink-0">
                {activePoint ? (
                  <span className="text-foreground">
                    <strong className="text-accent font-semibold">{activePoint.count}</strong> contributions on week of{" "}
                    {new Date(activePoint.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                ) : (
                  <span className="italic">Hover 2026 curve for cadence</span>
                )}
              </span>
            </div>

            {/* Breakdown Chips for 2026 */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-foreground/75 pt-0.5">
              {/* 2026 Public PRs */}
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-accent shrink-0" />
                <span className="font-semibold text-foreground">Public Upstream (2026):</span>
                {liveMerged2026 > 0 && (
                  <span className="text-purple-600 dark:text-purple-400 font-medium">{liveMerged2026} merged</span>
                )}
                {liveMerged2026 > 0 && liveOpen2026 > 0 && <span>/</span>}
                {liveOpen2026 > 0 && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">{liveOpen2026} open</span>
                )}
                {liveMerged2026 === 0 && liveOpen2026 === 0 && (
                  <span>{prs.length} active</span>
                )}
              </div>

              <span className="text-foreground/30 hidden sm:inline">•</span>

              {/* 2026 Private Repos & Client Orgs */}
              <div className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-foreground/60 shrink-0" />
                <span className="font-semibold text-foreground">Private Repos &amp; Client Orgs (2026):</span>
                {privatePrs && privatePrs.total > 0 ? (
                  <span>
                    <span className="text-purple-600 dark:text-purple-400 font-medium">{privatePrs.merged} merged</span>
                    {privatePrs.open > 0 && (
                      <>
                        {" "}
                        / <span className="text-emerald-600 dark:text-emerald-400 font-medium">{privatePrs.open} open</span>
                      </>
                    )}{" "}
                    PRs
                  </span>
                ) : (
                  <span>Active contributions across private repositories</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 2026 Free-Flow Activity Graph (Jan 2026 -> Present) */}
      <div className="space-y-1 pt-1">
        {loadingContribs ? (
          <div className="h-20 w-full animate-pulse bg-foreground/5 rounded-sm" />
        ) : (
          <div className="space-y-1">
            <div
              ref={containerRef}
              className="w-full relative h-16 sm:h-20 cursor-crosshair select-none touch-pan-y"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setActivePoint(null)}
              onTouchStart={handleTouchMove}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setActivePoint(null)}
            >
              <svg
                viewBox={`0 0 1000 ${viewBoxHeight}`}
                preserveAspectRatio="none"
                className="w-full h-full block overflow-visible"
              >
                <defs>
                  <linearGradient id="freeFlowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                    <stop offset="85%" stopColor="var(--accent)" stopOpacity="0.02" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line
                  x1="0"
                  y1={baselineY}
                  x2="1000"
                  y2={baselineY}
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  strokeDasharray="3 3"
                />

                {areaPath && <path d={areaPath} fill="url(#freeFlowGradient)" />}

                {linePath && (
                  <path
                    d={linePath}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>

              {activePoint && (
                <div
                  className="absolute top-0 bottom-0 pointer-events-none -translate-x-1/2"
                  style={{ left: `${activePoint.xPercent}%` }}
                >
                  <div
                    className="w-[1px] border-l border-dashed border-accent/50 mx-auto"
                    style={{ height: `${(baselineY / viewBoxHeight) * 100}%` }}
                  />
                  <div
                    className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                    style={{ top: `${activePoint.yPercent}%`, left: "50%" }}
                  >
                    <span className="absolute w-3 h-3 rounded-full bg-accent/30 animate-ping" />
                    <span className="w-2 h-2 rounded-full bg-accent ring-2 ring-background" />
                  </div>
                </div>
              )}
            </div>

            {/* 2026 Month Axis (Jan '26 to Aug '26) */}
            <div className="relative w-full h-4 select-none pointer-events-none overflow-hidden pt-0.5">
              {monthMarkers.map((m, idx) => (
                <span
                  key={idx}
                  className="absolute top-0 font-mono text-[9px] uppercase tracking-wider text-foreground/50 -translate-x-1/2 whitespace-nowrap"
                  style={{
                    left: `${Math.max(2, Math.min(98, m.xPercent))}%`,
                  }}
                >
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. 2026 Pull Requests List */}
      <div className="pt-2">
        <div className="max-h-[290px] overflow-y-auto pr-2 space-y-3 divide-y divide-border/30 scrollbar-thin scrollbar-thumb-foreground/15 scrollbar-track-transparent">
          {loadingPrs ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2 pt-2 first:pt-0">
                  <span className="text-xs font-sans text-accent/40 mt-0.5">•</span>
                  <div className="w-full space-y-1.5">
                    <div className="h-3.5 bg-foreground/5 rounded w-1/3" />
                    <div className="h-3 bg-foreground/5 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : prs.length === 0 ? (
            <div className="text-xs text-foreground/50 py-2 italic font-sans flex items-start gap-2">
              <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>
              <span>
                No 2026 public PRs found right now.{" "}
                <a
                  href="https://github.com/pulls?q=is%3Apr+author%3Alostmartian+-user%3Alostmartian+is%3Apublic+created%3A%3E%3D2026-01-01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline font-medium"
                >
                  View on GitHub ↗
                </a>
              </span>
            </div>
          ) : (
            prs.map((pr) => (
              <div key={pr.id} className="flex items-start gap-2 pt-3 first:pt-0 group">
                <span className="text-xs font-sans text-accent/60 mt-0.5">•</span>

                <div className="flex-grow space-y-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center flex-wrap gap-2 min-w-0">
                      <a
                        href={pr.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-accent font-semibold hover:underline truncate max-w-[220px] sm:max-w-none"
                      >
                        {pr.repo}
                      </a>

                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/40 hover:text-foreground/75 text-xs font-mono transition-colors"
                      >
                        #{pr.number}
                      </a>

                      <span
                        className={`inline-flex items-center gap-1 text-[9px] font-sans font-bold px-1.5 py-0.2 rounded uppercase tracking-wider ${
                          pr.state === "merged"
                            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                            : pr.state === "open"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-stone-500/10 text-stone-500 border border-stone-500/20"
                        }`}
                      >
                        {pr.state === "merged" ? (
                          <GitMerge className="w-2.5 h-2.5" />
                        ) : (
                          <GitPullRequest className="w-2.5 h-2.5" />
                        )}
                        <span>{pr.state}</span>
                      </span>
                    </div>

                    <div className="text-[11px] text-foreground/40 font-mono shrink-0">
                      {new Date(pr.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <p className="text-xs text-foreground/85 leading-relaxed font-sans break-words">
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors inline-flex items-baseline gap-1"
                    >
                      <span>{pr.title}</span>
                      <span className="text-accent text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                        ↗
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
