"use client";

// Searchable, filterable list of writeups. Search matches the title, summary, category and
// tags; the category row narrows the list further. Everything runs in the browser, so it
// works on the static site.

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";

export type WriteupItem = {
  href: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  dateLabel: string;
  minutes: number;
};

const ALL = "All";

export function WriteupIndex({ items }: { items: WriteupItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of items) counts.set(i.category, (counts.get(i.category) ?? 0) + 1);
    return [[ALL, items.length] as const, ...[...counts].sort((a, b) => a[0].localeCompare(b[0]))];
  }, [items]);

  const shown = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((i) => {
      if (category !== ALL && i.category !== category) return false;
      const hay = [i.title, i.description, i.category, ...i.tags].join(" ").toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [items, query, category]);

  const filtered = query !== "" || category !== ALL;

  return (
    <div>
      <div className="flex flex-col gap-4 border-t border-line pt-5 sm:pt-6 md:flex-row md:items-center md:justify-between">
        <label className="relative block w-full md:max-w-sm">
          <span className="sr-only">Search writeups</span>
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, topic or tag"
            className="w-full rounded-full bg-fg/[0.04] py-2.5 pl-11 pr-4 text-[15px] outline-none ring-1 ring-inset ring-line transition placeholder:text-muted focus:bg-transparent focus:ring-fg/40"
          />
        </label>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
            {categories.map(([name, count]) => {
              const on = name === category;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCategory(name)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    on ? "bg-fg text-ink" : "text-muted ring-1 ring-inset ring-line hover:text-fg"
                  }`}
                >
                  {name}
                  <span className={`tabular ml-1.5 ${on ? "text-ink/70" : "text-fg/60"}`}>{count}</span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="whitespace-nowrap text-[13px] text-muted">
            {shown.length} {shown.length === 1 ? "writeup" : "writeups"}
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory(ALL);
                }}
                className="ml-3 inline-flex items-center gap-1 font-medium text-fg transition-opacity hover:opacity-60"
              >
                <X aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
                Clear
              </button>
            )}
          </p>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 border-y border-line py-16 text-[15px] text-muted">
          Nothing matches that yet. Try a broader word, or another category.
        </p>
      ) : (
        <ul className="group/list mt-5 border-t border-line">
          {shown.map((i) => (
            <li
              key={i.href}
              className="border-b border-line transition-opacity duration-500 group-hover/list:opacity-35 hover:opacity-100! has-[:focus-visible]:opacity-100!"
            >
              <Link
                href={i.href}
                className="group grid items-center gap-x-10 gap-y-1 py-4 outline-none sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:py-5"
              >
                {/* Tags stay searchable but aren't listed here, so more writeups fit on screen */}
                <span className="text-[13px] text-muted">
                  <time dateTime={i.date} className="tabular">
                    {i.dateLabel}
                  </time>
                  <span className="text-muted before:mx-2 before:content-['·'] sm:block sm:before:hidden">{i.minutes} min read</span>
                </span>
                <span className="min-w-0">
                  <span className="block max-w-3xl font-display text-[1.1rem] leading-[1.3] sm:text-[1.4rem]">{i.title}</span>
                  <span className="mt-1 line-clamp-1 max-w-[72ch] text-[13px] leading-[1.55] text-muted sm:text-[14px]">
                    <span className="font-medium text-fg/70">{i.category}</span>
                    <span aria-hidden className="mx-1.5 text-fg/45">·</span>
                    {i.description}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="hidden h-9 w-9 place-items-center rounded-full text-fg/70 ring-1 ring-fg/20 transition-[background-color,color,box-shadow] duration-300 group-hover:bg-fg group-hover:text-ink group-hover:ring-fg group-focus-visible:bg-fg group-focus-visible:text-ink sm:grid"
                >
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 group-focus-visible:rotate-45"
                    strokeWidth={1.75}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
