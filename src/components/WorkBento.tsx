// Homepage case studies as a bento that fills the rest of the screen. Desktop: a 12-column,
// two-row grid with the lead project as a tall card on the left and the other four in mixed
// widths beside it. Tablets get two columns, phones one.

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { palette, tintFor } from "@/lib/palette";
import type { CSSProperties } from "react";
import { reveal } from "@/lib/reveal";

// Row 1: 5 (tall) + 4 + 3. Row 2: 4 + 3 beside the tall card.
const layout = [
  "sm:col-span-2 lg:col-span-5 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-3",
];

// Card backgrounds (the .fade style in globals.css): each card's colour pair comes from
// lib/palette.ts (shared with its case study page); only the warm bloom's position varies.
const bloom = [
  { x: "78%", y: "22%" },
  { x: "20%", y: "25%" },
  { x: "75%", y: "70%" },
  { x: "25%", y: "75%" },
  { x: "80%", y: "30%" },
];
const fade = (href: string, i: number) => {
  const t = tintFor(href) ?? palette.cobalt;
  const b = bloom[i % bloom.length];
  return { "--cool": t.cool, "--warm": t.warm, "--x": b.x, "--y": b.y } as CSSProperties;
};

export function WorkBento({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-12 lg:grid-rows-2 ${className}`}>
      {caseStudies.map((c, i) => {
        const lead = i === 0;
        return (
          <li key={c.href} {...reveal(80 + i * 50)} className={layout[i]}>
            <Link
              href={c.href}
              className={`group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-card p-5 ring-1 ring-black/5 outline-none focus-visible:ring-white/60 dark:ring-white/10 sm:p-6 ${
                lead ? "min-h-[13rem]" : "min-h-[9rem] lg:min-h-[10.5rem]"
              }`}
            >
              <span aria-hidden style={fade(c.href, i)} className="fade" />

              <span className="relative flex items-start justify-between gap-4">
                <span className="text-[13px] font-semibold text-white/85 sm:text-[14px]">
                  {c.company}
                  {c.status && <span className="font-medium text-white/70"> · {c.status}</span>}
                </span>
                <span
                  aria-hidden
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25"
                >
                  <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
              </span>

              <span className="relative block">
                <span
                  className={`block font-display leading-[1.05] tracking-[-0.04em] text-white ${
                    lead ? "max-w-[12ch] text-[2.5rem] sm:text-[3.5rem]" : "text-[1.875rem] sm:text-[2.25rem]"
                  }`}
                >
                  {c.title}
                </span>
                <span className={`mt-1.5 block font-medium text-white/85 ${lead ? "text-[17px] sm:text-[19px]" : "text-[15px] sm:text-[16px]"}`}>
                  {c.note.charAt(0).toUpperCase() + c.note.slice(1)}
                </span>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white/15 px-2.5 py-0.5 text-[12px] font-medium text-white sm:text-[13px]">
                      {t}
                    </span>
                  ))}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
