import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Cat-astrophic Failure | Sahil Gangurde",
  description: "This page wandered off. Probably chasing a laser pointer.",
  robots: { index: false, follow: false },
};

const CAT_FACTS = [
  "A cat was probably sitting on the server and pressed this route out of existence.",
  "Our code has nine lives. This page used all of them.",
  "The page you're looking for was knocked off the table. Deliberately.",
  "We asked the cat to deploy this page. It walked away mid-standup.",
  "This URL is in a cardboard box now. The cat claimed it.",
  "404: The cat pushed this page off the production shelf right in front of us.",
];

function getCatFact() {
  const seed = new Date().getDate() + new Date().getHours();
  return CAT_FACTS[seed % CAT_FACTS.length];
}

export default function NotFound() {
  return (
    <main className="font-sans">
      <section className="py-14 md:py-20 text-center space-y-8">
        {/* Terminal cats intro */}
        <p className="text-sm font-mono uppercase tracking-[0.25em] text-accent">
          $ cat ./this-page
        </p>

        <div className="space-y-3">
          <h1 className="text-[4rem] sm:text-[6rem] font-bold tracking-tight leading-none text-foreground flex items-center justify-center gap-4 flex-wrap">
            <span className="inline-block animate-bounce [animation-duration:2.5s]">🐱</span>
            404
            <span className="inline-block animate-bounce [animation-duration:2s] [animation-delay:0.3s]">🐾</span>
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-foreground/85">
            Cat-astrophic failure.
          </p>
        </div>

        <p className="max-w-md mx-auto text-[15px] text-foreground/70 leading-relaxed">
          {getCatFact()}
        </p>

        {/* Cat parade */}
        <div className="flex items-center justify-center gap-5 text-4xl select-none" aria-hidden="true">
          <span>🐈‍⬛</span>
          <span>🐈</span>
          <span className="text-lg text-foreground/30 font-mono px-2">{"while(true) { ignoreHuman }"}</span>
          <span>🐈</span>
          <span>🐈‍⬛</span>
        </div>

        {/* Cat-titude error report */}
        <div className="max-w-md mx-auto mt-10 text-left rounded-xl border border-border bg-card-bg overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-100 dark:bg-[#151a20] border-b border-border">
            <span className="text-xs text-foreground/55 uppercase tracking-wide font-medium">
              error-report.log
            </span>
            <span className="text-xs text-foreground/55">meow 🐾</span>
          </div>
          <div className="px-4 py-4 text-[13px] [font-family:var(--font-geist-mono)] leading-relaxed text-foreground/80 bg-[#f7f9fa] dark:bg-[#101318]">
            <p><span className="text-accent font-semibold">Error</span>: PageNotFoundError</p>
            <p><span className="text-accent font-semibold">Culprit</span>: A cat (unnamed, unrepentant)</p>
            <p><span className="text-accent font-semibold">Status</span>: Napping on the keyboard</p>
            <p><span className="text-accent font-semibold">Fix ETA</span>: After the 3rd nap</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-flex items-center h-10 px-6 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:opacity-90 transition-all"
          >
            Herd me home 🏠
          </Link>
          <Link
            href="/blogs"
            className="inline-flex items-center h-10 px-6 border border-border rounded-full text-sm font-medium text-foreground/80 hover:border-accent hover:text-accent transition-colors"
          >
            Read something else
          </Link>
        </div>

        <p className="text-xs text-foreground/45 pt-2">
          No developers were harmed. Several were ignored by cats.
        </p>
      </section>
    </main>
  );
}
