import Link from "next/link";
import { PuneClock } from "@/components/PuneClock";
import { SiteNav, type NavPath } from "@/components/SiteNav";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { TintBackdrop, TintDot, TintGlow, tintVars } from "@/components/Tint";
import { socials } from "@/lib/data";
import { tintFor } from "@/lib/palette";

export { container } from "@/lib/layout";
import { container } from "@/lib/layout";
import { reveal } from "@/lib/reveal";
export const label = "text-[13px] font-medium text-muted";

/** Frame for the scrolling pages (About, Blogs): top bar, page header, content, footer. */
export function PageShell({
  active,
  eyebrow,
  title,
  intro,
  compact = false,
  children,
}: {
  active: NavPath;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** a shorter header, for pages whose content should start above the fold (Writeups) */
  compact?: boolean;
  children: React.ReactNode;
}) {
  const tint = tintFor(active);
  // At least one screen tall, so on short pages the footer sits at the bottom rather than
  // right under the content.
  return (
    <div className="relative isolate flex min-h-svh flex-col" style={tintVars(tint)}>
      <TintBackdrop tint={tint} />
      <div className="graphite-fade relative isolate z-20">
        <TintGlow tint={tint} />
        <header className={`${container} relative z-30 flex items-center justify-between py-6 text-sm`}>
          <Link href="/" className="font-medium tracking-tight">
            Sahil<span className="max-sm:hidden"> Gangurde</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-5">
            <SiteNav active={active} />
            <ThemeSwitcher />
          </div>
        </header>
        <div className={`${container} relative z-10 ${compact ? "pb-6 pt-4 sm:pb-10 sm:pt-10" : "pb-10 pt-8 sm:pb-20 sm:pt-24"}`}>
          <p {...reveal(60)} className={label}>
            <TintDot tint={tint} />
            {eyebrow}
          </p>
          <h1 {...reveal(140)} className={`mt-3 max-w-4xl font-display leading-[1.06] ${compact ? "text-[1.85rem] sm:text-5xl" : "text-[2.1rem] sm:mt-5 sm:text-6xl lg:text-7xl"}`}>{title}</h1>
          {intro && <div {...reveal(260)} className={`max-w-[62ch] space-y-4 text-base leading-[1.65] text-muted ${compact ? "mt-3 sm:mt-4" : "mt-5 sm:mt-8 sm:text-lg sm:leading-[1.7]"}`}>{intro}</div>}
        </div>
      </div>

      <main className={`${container} flex-1 pb-24`}>{children}</main>

      <footer className={container}>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-6 text-[13px] text-muted">
          <span className="tabular">
            Pune · <PuneClock /> IST
          </span>
          <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-5 gap-y-1">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="transition-colors hover:text-fg">
                {s.label.replace(" / Twitter", "")}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

/** Section with a small numbered label on the left and content on the right. */
export function PageSection({
  index,
  name,
  title,
  aside,
  children,
}: {
  index: number;
  name: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-16 sm:py-20">
      <div {...reveal()} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={`flex items-center gap-3 ${label}`}>
            <span className="tabular text-fg">{String(index).padStart(2, "0")}</span>
            <span aria-hidden className="h-px w-8 bg-fg/20" />
            {name}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
        </div>
        {aside}
      </div>
      <div {...reveal(120)} className="mt-10">
        {children}
      </div>
    </section>
  );
}
