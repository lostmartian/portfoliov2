"use client";

import { useEffect, useRef, useState } from "react";

export type TocItem = { id: string; label: string };

/** The active section is the last one whose start has scrolled above 40% of the screen.
 *  Measured on scroll rather than with an observer, so fast scrolls never skip a section. */
function useActiveSection(items: TocItem[]) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.4;
        let current = items[0]?.id;
        for (const { id } of items) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return active;
}

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent" aria-hidden>
      <div className="h-full origin-left bg-fg" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

export function Toc({ items }: { items: TocItem[] }) {
  const active = useActiveSection(items);

  return (
    <nav aria-label="On this page" className="sticky top-12 hidden lg:block">
      <p className="mb-5 text-[13px] font-medium text-muted">On this page</p>
      <ol className="space-y-1 border-l border-line">
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`-ml-px flex gap-3 border-l py-2 pl-4 text-sm transition-colors ${
                  isActive ? "border-fg font-medium text-fg" : "border-transparent text-muted hover:text-fg"
                }`}
              >
                <span className="tabular w-5 text-[13px] leading-5 opacity-50">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function MobileToc({ items }: { items: TocItem[] }) {
  const active = useActiveSection(items);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    el?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [active]);

  return (
    <nav aria-label="On this page" className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur lg:hidden">
      <div ref={listRef} className="flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none]">
        {items.map((item) => (
          <a
            key={item.id}
            data-id={item.id}
            href={`#${item.id}`}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              item.id === active ? "border-fg bg-fg text-ink" : "border-line text-muted"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
