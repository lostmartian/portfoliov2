"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import type { GithubRepo } from "@/data/github-projects";
import { devaNum } from "@/components/ui/deva";

const LANG_COLOURS = ["var(--accent)", "var(--leaf)", "var(--foreground)", "var(--muted)", "var(--haldi)"];
const mono = { fontFamily: "var(--font-geist-mono)" };

/**
 * Projects as a register: a ledger header (repos, languages, stars) with a
 * language bar you can filter by, then entries grouped by the year they began.
 */
export default function RepoRegister({ repos }: { repos: GithubRepo[] }) {
  const [lang, setLang] = useState<string | null>(null);

  const langs = useMemo(() => {
    const m = new Map<string, number>();
    repos.forEach((r) => m.set(r.language ?? "Other", (m.get(r.language ?? "Other") ?? 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [repos]);

  const shown = lang ? repos.filter((r) => (r.language ?? "Other") === lang) : repos;
  const years = useMemo(() => {
    const m = new Map<number, GithubRepo[]>();
    [...shown]
      .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
      .forEach((r) => {
        const y = new Date(r.created_at).getFullYear();
        m.set(y, [...(m.get(y) ?? []), r]);
      });
    return [...m.entries()];
  }, [shown]);

  const stars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  let n = 0;

  return (
    <div>
      {/* Ledger head */}
      <div className="grid grid-cols-3 border-y border-foreground/70">
        {[
          [repos.length, "Repositories"],
          [langs.length, "Languages"],
          [stars, "Stars"],
        ].map(([v, k], i) => (
          <div key={k as string} className={`py-6 ${i ? "pl-6 border-l border-border" : ""}`}>
            <p className="font-display text-5xl sm:text-6xl leading-none">{v}</p>
            <p className="label mt-2">{k}</p>
          </div>
        ))}
      </div>

      {/* Language bar = filter */}
      <div className="mt-8">
        <div className="flex h-3 gap-[2px]" role="group" aria-label="Filter by language">
          {langs.map(([l, c], i) => (
            <button
              key={l}
              onClick={() => setLang(lang === l ? null : l)}
              className="h-full transition-opacity cursor-pointer"
              style={{ flexGrow: c, background: LANG_COLOURS[i % LANG_COLOURS.length], opacity: !lang || lang === l ? 1 : 0.2 }}
              aria-label={`${l}: ${c}`}
              aria-pressed={lang === l}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
          {langs.map(([l, c], i) => (
            <button
              key={l}
              onClick={() => setLang(lang === l ? null : l)}
              className={`inline-flex items-center gap-2 cursor-pointer transition-colors ${!lang || lang === l ? "text-foreground" : "text-muted"}`}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: LANG_COLOURS[i % LANG_COLOURS.length] }} />
              {l} <span className="text-muted tabular-nums">{c}</span>
            </button>
          ))}
          {lang && (
            <button onClick={() => setLang(null)} className="text-accent link-u cursor-pointer">Show all</button>
          )}
        </div>
      </div>

      {/* Entries by year */}
      <div className="mt-16 space-y-16">
        {years.map(([y, list]) => (
          <section key={y} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-x-8">
            <div className="md:sticky md:top-28 self-start mb-4 md:mb-0">
              <p className="font-display text-5xl text-accent leading-none">{y}</p>
              <p className="label mt-2">{list.length} {list.length === 1 ? "entry" : "entries"}</p>
            </div>
            <ol className="border-t border-foreground/70">
              {list.map((r) => {
                n += 1;
                return (
                  <li key={r.html_url}>
                    <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="group ink-row grid grid-cols-[36px_1fr_auto] gap-x-4 gap-y-2 py-6 border-b border-border">
                      <span className="deva text-accent text-lg pt-1">{devaNum(n)}</span>
                      <div className="min-w-0 space-y-2">
                        <h2 className="text-2xl sm:text-3xl leading-tight transition-colors group-hover:text-accent">{r.name}</h2>
                        {r.description && <p className="text-[15px] text-muted leading-relaxed max-w-3xl">{r.description}</p>}
                        {r.topics && r.topics.length > 0 && (
                          <p className="text-[12px] text-muted" style={mono}>{r.topics.slice(0, 5).map((t) => `#${t}`).join("  ")}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 pt-1.5 text-[13px]">
                        <span className="text-muted">{r.language ?? ""}</span>
                        {r.stargazers_count > 0 && (
                          <span className="inline-flex items-center gap-1 text-accent"><Star className="w-3.5 h-3.5" />{r.stargazers_count}</span>
                        )}
                        <ArrowUpRight className="nudge w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                      </div>
                    </a>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
