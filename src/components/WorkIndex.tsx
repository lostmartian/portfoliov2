// Homepage list of case studies: big titles with a short plain-spoken note beside each.
// Each row has an arrow button so it reads as a link; hovering (or focusing) one dims the
// others and fills its arrow.

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";

export function WorkIndex() {
  return (
    <ul className="group/list -my-[clamp(4px,0.9svh,10px)]">
      {caseStudies.map((c) => (
        <li
          key={c.href}
          className="transition-opacity duration-500 group-hover/list:opacity-30 hover:opacity-100! has-[:focus-visible]:opacity-100!"
        >
          <Link
            href={c.href}
            className="group flex items-center gap-4 py-[clamp(4px,0.9svh,10px)] outline-none"
          >
            <span className="flex min-w-0 flex-1 flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-focus-visible:translate-x-2">
              <span className="font-display text-[clamp(1.5rem,min(3.2vw,4.6svh),2.6rem)] leading-[1.1] tracking-[-0.04em]">
                {c.title}
              </span>
              <span className="mt-0.5 truncate text-[13px] text-muted max-sm:text-[12px] [@media(max-height:600px)]:hidden">
                <span className="font-medium text-fg/70">{c.company}</span>
                {/* on short phones only the company fits */}
                <span className="max-sm:[@media(max-height:700px)]:hidden">
                  <span aria-hidden className="mx-1.5 text-fg/25">·</span>
                  {c.note}
                </span>
                {c.status && <span className="text-fg/35"> · {c.status.toLowerCase()}</span>}
              </span>
            </span>
            {/* always visible, so each row reads as a link; it fills in on hover */}
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-fg/45 ring-1 ring-fg/15 transition-[background-color,color,box-shadow] duration-300 group-hover:bg-fg group-hover:text-ink group-hover:ring-fg group-focus-visible:bg-fg group-focus-visible:text-ink max-sm:h-8 max-sm:w-8"
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
  );
}
