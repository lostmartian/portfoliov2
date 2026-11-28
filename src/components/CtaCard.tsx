import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { CopyEmail } from "@/components/CopyEmail";
import { PastelIcon } from "@/components/PastelIcon";
import { EMAIL } from "@/lib/data";
import type { Tint } from "@/lib/palette";
import { reveal } from "@/lib/reveal";

/** The closing call to action: a big card in the page's colour pair, in the same style as the
 *  homepage work cards (the .fade wash and grain), with white type, a solid white "Say hello"
 *  pill and a little rocket floating in the corner. */
export function CtaCard({
  tint,
  title,
  accent,
  links = [],
  subject = "Project enquiry",
}: {
  tint: Tint;
  title: string;
  /** the second, lighter half of the headline */
  accent?: string;
  links?: { label: string; href: string }[];
  subject?: string;
}) {
  const vars = { "--cool": tint.cool, "--warm": tint.warm, "--x": "85%", "--y": "15%" } as CSSProperties;
  return (
    <section {...reveal()} className="relative isolate overflow-hidden rounded-[2rem] px-7 py-12 text-white sm:px-14 sm:py-16">
      <span aria-hidden style={vars} className="fade" />
      <PastelIcon name="rocket" size={84} className="cta-float absolute right-6 top-6 hidden opacity-95 sm:block sm:right-12 sm:top-10" />

      <div className="relative">
        <p className="text-[13px] font-semibold text-white/80">Let&apos;s work together</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-[2.1rem] leading-[1.06] tracking-[-0.035em] sm:text-[3.25rem]">
          {title} {accent && <span className="text-white/75">{accent}</span>}
        </h2>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 text-[15px]">
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-[#0c0c0d] shadow-[0_8px_24px_-10px_rgb(0_0_0/0.35)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Say hello
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
          <CopyEmail withIcon className="inline-flex items-center gap-2 font-medium text-white/90 transition-colors hover:text-white" />
          {links.map((l) => {
            const external = l.href.startsWith("http");
            const cls = "font-medium text-white/80 underline-offset-4 transition-colors hover:text-white";
            return external ? (
              <a key={l.href} href={l.href} className={cls}>
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} className={cls}>
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
