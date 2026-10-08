import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Figure, Ground, Tree } from "@/components/warli/Warli";
import OpenPalette from "@/components/lost/OpenPalette";

export const metadata: Metadata = {
  title: "404 · Lost in the village | Sahil Gangurde",
  description: "This path doesn't exist yet.",
  robots: { index: false, follow: false },
};

const STARS = Array.from({ length: 40 }, (_, i) => [((i * 263) % 1180) + 10, ((i * 97) % 170) + 10, (i % 3) * 0.4 + 0.7]);

export default function NotFound() {
  return (
    <main>
      <section data-nav="dark" className="bleed relative overflow-hidden bg-[#15141c] text-[#efe6d6]">
        <svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" className="block w-full h-[62svh] min-h-[380px]" aria-hidden="true">
          {STARS.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#efe6d6" className="twinkle" style={{ animationDelay: `${-(i % 9) * 0.45}s` }} />
          ))}
          <g transform="translate(1010 150)">
            <circle r="26" fill="#efe6d6" />
            <circle r="26" cx="12" cy="-8" fill="#15141c" />
          </g>
          <g className="text-[#e08a6b]">
            <Tree x={120} y={400} h={170} branches={10} />
            <Tree x={200} y={400} h={110} branches={7} delay={200} />
            <Tree x={1090} y={400} h={140} branches={9} delay={300} />
            {/* the lost one, looking around, with question marks */}
            <Figure x={600} y={400} s={2.6} pose="raise" delay={500} />
            <text x="640" y="268" fontSize="34" fill="currentColor" fontFamily="var(--font-serif-face), serif" className="ink-in" style={{ animationDelay: "1400ms" }}>?</text>
            <text x="548" y="250" fontSize="24" fill="currentColor" fontFamily="var(--font-serif-face), serif" className="ink-in" style={{ animationDelay: "1700ms" }}>?</text>
            {/* footprints wandering off */}
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse key={i} cx={680 + i * 46} cy={i % 2 ? 404 : 410} rx="5" ry="2.5" fill="currentColor" opacity={0.7 - i * 0.12} />
            ))}
            <Ground y={400} w={1200} />
          </g>
        </svg>
      </section>

      <section className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
        <div className="lg:col-span-2">
          <p className="deva text-accent text-3xl leading-none">हरवलो</p>
          <p className="label mt-2">Error 404</p>
        </div>
        <div className="lg:col-span-7 space-y-8">
          <h1 className="text-5xl sm:text-7xl leading-[0.95]">
            This path doesn&apos;t <span className="serif text-accent">exist yet.</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-xl">
            Maybe it moved, maybe it was never built. The village is still here, though.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/" className="flourish group inline-flex items-center gap-2 h-12 pl-6 pr-5 rounded-full bg-foreground text-background text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
              Back home
              <ArrowUpRight className="nudge w-4 h-4" />
            </Link>
            <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm">
              <span className="link-u">See the work</span>
              <ArrowUpRight className="nudge w-3.5 h-3.5" />
            </Link>
            <OpenPalette className="group inline-flex items-center gap-2 text-sm cursor-pointer">
              <kbd className="border border-border px-1.5 py-0.5 text-[12px] text-muted">⌘K</kbd>
              <span className="link-u">Search the site</span>
            </OpenPalette>
          </div>
        </div>
      </section>
    </main>
  );
}
