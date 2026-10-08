"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Glyph, { type GlyphKind } from "@/components/warli/Glyph";
import { TECHNICAL_TOOLKIT } from "@/config/about";
import { projects } from "@/data/projects";

const GLYPHS: GlyphKind[] = ["ai", "lang", "db", "cloud", "ui"];
const MR = ["बुद्धी", "भाषा", "माहिती", "ढग", "रूप"];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const tokens = (s: string) => new Set([norm(s), ...s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)]);

/** Which case studies list this tool in their stack. */
function usedIn(tool: string) {
  const t = tokens(tool);
  return projects.filter((p) => (p.stack ?? []).some((s) => t.has(norm(s))));
}

/**
 * The toolkit as a shelf: every category on its own row, and every tool that
 * shipped in a case study carries a geru dot. Hover (or focus) a tool to light
 * it up and see exactly where it went to production.
 */
export default function ToolShelf() {
  const [tool, setTool] = useState<string | null>(null);
  const map = useMemo(() => {
    const m: Record<string, ReturnType<typeof usedIn>> = {};
    TECHNICAL_TOOLKIT.forEach((g) => g.list.forEach((t) => (m[t] = usedIn(t))));
    return m;
  }, []);
  const proven = Object.values(map).filter((v) => v.length).length;
  const where = tool ? map[tool] : [];

  return (
    <div onMouseLeave={() => setTool(null)}>
      <div className="border-t border-foreground/70">
        {TECHNICAL_TOOLKIT.map((g, gi) => (
          <div key={g.index} className="group/row grid grid-cols-1 md:grid-cols-[230px_1fr] gap-x-10 gap-y-4 py-7 border-b border-border">
            <div className="flex items-center gap-4">
              <Glyph kind={GLYPHS[gi] ?? "code"} className="w-11 h-11 shrink-0 text-accent transition-transform duration-500 group-hover/row:-rotate-6" />
              <div>
                <p className="deva text-accent text-sm leading-none">{MR[gi]}</p>
                <p className="font-display text-2xl leading-tight mt-1">{g.title}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 content-center">
              {g.list.map((t) => {
                const shipped = map[t].length > 0;
                const on = tool === t;
                const dim = tool !== null && !on;
                return (
                  <li key={t}>
                    <button
                      onMouseEnter={() => setTool(t)}
                      onFocus={() => setTool(t)}
                      onBlur={() => setTool(null)}
                      className={`relative inline-flex items-center gap-2 border px-3.5 py-2 text-[14px] transition-all duration-300 cursor-default ${
                        on ? "border-accent bg-accent text-accent-foreground -translate-y-0.5" : "border-border-strong/60 bg-card-bg/60"
                      } ${dim ? "opacity-40" : "opacity-100"}`}
                    >
                      {shipped && <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-accent-foreground" : "bg-accent"}`} aria-hidden="true" />}
                      {t}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* readout */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 min-h-[2.75rem] text-[15px]" aria-live="polite">
        {!tool && (
          <p className="text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent mr-2 align-middle" aria-hidden="true" />
            {proven} of these shipped in the case studies. Hover one to see where.
          </p>
        )}
        {tool && where.length > 0 && (
          <>
            <span className="font-display text-2xl">{tool}</span>
            <span className="text-muted">shipped in</span>
            {where.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="ink-link">{p.title}</Link>
            ))}
          </>
        )}
        {tool && where.length === 0 && (
          <>
            <span className="font-display text-2xl">{tool}</span>
            <span className="text-muted">in my everyday kit, beyond the featured case studies.</span>
          </>
        )}
      </div>
    </div>
  );
}
