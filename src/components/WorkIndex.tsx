"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { devaNum } from "@/components/ui/deva";
import { CaseCover } from "@/components/case/Covers";

export interface WorkItem {
  href: string;
  title: string;
  meta: string;
  year: string;
  description?: string;
  /** slug of a case study with bespoke cover art */
  cover?: string;
  stack?: string[];
}

/** Split a string into letter spans (grouped per word so lines only break between words). */
function Lift({ text }: { text: string }) {
  let i = 0;
  return (
    <span className="lift-words" aria-label={text}>
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden="true">
          <span className="lift inline-block whitespace-nowrap">
            {Array.from(word).map((c) => (
              <span key={i} style={{ "--i": i++ } as React.CSSProperties}>{c}</span>
            ))}
          </span>{" "}
        </span>
      ))}
    </span>
  );
}

/**
 * Large index rows. On desktop, hovering a row floats its screenshot next to
 * the cursor; on touch screens the image sits inline above the text.
 */
export default function WorkIndex({ items, showDescription = true }: { items: WorkItem[]; showDescription?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const w = wrap.current, p = preview.current;
    if (!w || !p) return;
    const r = w.getBoundingClientRect();
    p.style.transform = `translate3d(${e.clientX - r.left + 28}px, ${e.clientY - r.top - 120}px, 0)`;
  };

  const current = active !== null ? items[active] : null;

  return (
    <div ref={wrap} className="relative" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <ul className="border-t border-border">
        {items.map((it, i) => (
          <li key={it.href} onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}>
            <Link href={it.href} className="group ink-row block border-b border-border py-8 md:py-10">
              {it.cover && (
                <div className="md:hidden mb-5 overflow-hidden border border-border">
                  <CaseCover slug={it.cover} className="block w-full h-auto" />
                </div>
              )}
              <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[60px_1fr_220px_auto] items-baseline gap-x-6 gap-y-2">
                <span className="deva text-accent text-2xl leading-none">{devaNum(i + 1)}</span>
                <h3 className="text-[2rem] sm:text-5xl lg:text-6xl leading-[1.02]">
                  <Lift text={it.title} />
                </h3>
                <span className="hidden md:block label">{it.meta}</span>
                <span className="flex items-center gap-3">
                  <span className="label hidden sm:inline">{it.year}</span>
                  <span className="grid place-items-center h-10 w-10 rounded-full border border-border transition-all duration-500 group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </span>
                {showDescription && it.description && (
                  <p className="col-start-2 col-span-2 max-w-2xl text-[15px] text-muted leading-relaxed mt-2">{it.description}</p>
                )}
                {it.stack && (
                  <p className="col-start-2 col-span-2 text-[13px] text-muted">{it.stack.slice(0, 6).join("  ·  ")}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        className="hidden md:block pointer-events-none absolute left-0 top-0 z-20 w-[340px] transition-opacity duration-300"
        style={{ opacity: current?.cover ? 1 : 0 }}
        aria-hidden="true"
      >
        <div className="border border-border bg-background p-1.5 rotate-[-2deg] shadow-[0_20px_40px_-20px_rgba(60,30,10,0.35)]">
          <div className="relative aspect-[16/10] overflow-hidden">
            {items.map((it, i) =>
              it.cover ? (
                <div
                  key={it.href}
                  className="absolute inset-0 transition-all duration-500"
                  style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(1.06)" }}
                >
                  <CaseCover slug={it.cover} animate={false} className="block w-full h-full" />
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
