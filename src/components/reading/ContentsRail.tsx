"use client";

import { useEffect, useMemo, useState } from "react";
import type { Heading } from "./headings";
import { devaNum } from "@/components/ui/deva";

/**
 * Sticky contents for long reads: Devanagari-numbered sections that light up as
 * you read, beside a geru thread that fills with your progress through the article.
 */
export default function ContentsRail({ headings, articleId }: { headings: Heading[]; articleId: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const art = document.getElementById(articleId);
      if (!art) return;
      const r = art.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      setProgress(Math.min(1, Math.max(0, (window.innerHeight * 0.3 - r.top) / Math.max(1, total))));
      let cur: string | null = null;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.3) cur = h.id;
      }
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings, articleId]);

  const numbers = useMemo(() => {
    let n = 0;
    return headings.map((h) => (h.level === 2 ? ++n : 0));
  }, [headings]);

  return (
    <nav aria-label="Contents" className="relative pl-5">
      <span className="absolute left-0 top-1 bottom-1 w-px bg-border" aria-hidden="true" />
      <span className="absolute left-0 top-1 w-px bg-accent transition-[height] duration-200" style={{ height: `calc((100% - 0.5rem) * ${progress})` }} aria-hidden="true" />
      <p className="label mb-5 flex items-center justify-between">
        <span>Contents</span>
        <span className="tabular-nums">{Math.round(progress * 100)}%</span>
      </p>
      <ol className="space-y-2.5">
        {headings.map((h, i) => {
          const on = h.id === active;
          return (
            <li key={h.id} className={h.level === 3 ? "pl-7" : ""}>
              <a href={`#${h.id}`} className={`group flex items-baseline gap-2.5 text-[14px] leading-snug transition-colors ${on ? "text-accent" : "text-muted hover:text-foreground"}`}>
                {h.level === 2 && <span className="deva text-accent w-5 shrink-0">{devaNum(numbers[i])}</span>}
                <span className={on ? "" : "link-u"}>{h.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
