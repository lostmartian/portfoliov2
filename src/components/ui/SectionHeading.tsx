import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { devaNum } from "./deva";

/**
 * Section opener: Devanagari numeral + Marathi word on a ruled line, English
 * caption on the right, then the serif headline.
 */
export default function SectionHeading({
  index,
  mr,
  label,
  title,
  href,
  hrefLabel,
}: {
  index: number;
  mr: string;
  label: string;
  title: ReactNode;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-7">
        <span className="deva text-accent text-xl leading-none">{devaNum(index)}</span>
        <span className="deva text-muted text-[15px] leading-none">{mr}</span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        <span className="label">{label}</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-[2.25rem] sm:text-5xl leading-[1.05]">{title}</h2>
        {href && (
          <Link href={href} className="group hidden sm:inline-flex shrink-0 items-center gap-1 text-sm text-muted hover:text-accent transition-colors pb-1.5">
            <span className="link-u">{hrefLabel ?? "View all"}</span>
            <ArrowUpRight className="nudge w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
