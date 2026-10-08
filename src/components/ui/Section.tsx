import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { devaNum } from "./deva";

/**
 * Editorial section: a sticky label column on the left (Devanagari numeral,
 * Marathi word, English caption) and the headline + content on the right.
 */
export default function Section({
  index,
  mr,
  label,
  title,
  href,
  hrefLabel,
  id,
  children,
}: {
  index: number;
  mr: string;
  label: string;
  title: ReactNode;
  href?: string;
  hrefLabel?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} data-village={label} data-village-mr={mr} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-x-10 scroll-mt-24">
      <aside className="lg:col-span-2 mb-8 lg:mb-0">
        <div className="lg:sticky lg:top-28 flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-2">
          <span className="deva text-accent text-3xl lg:text-5xl leading-none">{devaNum(index)}</span>
          <span className="deva text-foreground/80 text-lg leading-none">{mr}</span>
          <span className="label lg:mt-2">{label}</span>
          {href && (
            <Link href={href} className="group hidden lg:inline-flex items-center gap-1 mt-6 text-sm text-muted hover:text-accent transition-colors">
              <span className="link-u">{hrefLabel ?? "View all"}</span>
              <ArrowUpRight className="nudge w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </aside>
      <div className="lg:col-start-3 lg:col-span-9 min-w-0">
        <h2 className="text-[2.6rem] sm:text-6xl lg:text-7xl leading-[1] mb-12 lg:mb-16">{title}</h2>
        {children}
        {href && (
          <Link href={href} className="group lg:hidden inline-flex items-center gap-1 mt-8 text-sm text-muted hover:text-accent">
            <span className="link-u">{hrefLabel ?? "View all"}</span>
            <ArrowUpRight className="nudge w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </section>
  );
}
