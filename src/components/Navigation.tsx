"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Magnetic from "./ui/Magnetic";
import { devaNum } from "./ui/deva";

const links = [
  { name: "Work", href: "/work" },
  { name: "Projects", href: "/projects" },
  { name: "Writing", href: "/blogs" },
  { name: "Videos", href: "/videos" },
];

const more = [
  { name: "Open Source", href: "/oss-contributions" },
  { name: "Readlist", href: "/readlist" },
  { name: "Now", href: "/now" },
  { name: "Uses", href: "/uses" },
  { name: "Résumé", href: "/resume" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    // Night sections (Farsight, the 404 sky) mark themselves data-nav="dark"; the bar flips to match.
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const y = 36;
      setOverDark(
        [...document.querySelectorAll<HTMLElement>('[data-nav="dark"]')].some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= y && r.bottom >= y;
        })
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-50 bleed transition-colors duration-500 ${overDark && !open ? "nav-dark text-foreground" : ""} ${
        scrolled || open ? "bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className={`w-full px-5 sm:px-8 lg:px-12 2xl:px-20 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center h-[72px] border-b transition-colors duration-500 ${scrolled ? "border-border" : "border-transparent"}`}>
        <Link href="/" className="group flex items-baseline gap-2.5 w-fit" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl leading-none">Sahil Gangurde</span>
          <span className="deva text-accent text-sm leading-none -translate-x-1 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">साहिल</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[14px]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative py-1 transition-colors ${isActive(l.href) ? "text-accent" : "text-foreground/70 hover:text-foreground"}`}
            >
              <span className={isActive(l.href) ? "" : "link-u"}>{l.name}</span>
              {isActive(l.href) && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent" aria-hidden="true" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            className="group h-8 px-2.5 inline-flex items-center gap-1.5 border border-border-strong text-[12px] text-muted hover:text-accent hover:border-accent transition-colors cursor-pointer"
            aria-label="Open command palette"
          >
            <span className="deva text-[13px] leading-none">शोध</span>
            <kbd className="hidden sm:inline font-sans">⌘K</kbd>
          </button>
          <ThemeToggle />
          <Magnetic className="hidden sm:inline-block">
            <Link
              href="/#contact"
              className="flourish group inline-flex items-center gap-1.5 h-10 pl-5 pr-4 rounded-full border border-foreground text-[13px] hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Let&apos;s talk
              <ArrowUpRight className="nudge w-3.5 h-3.5" />
            </Link>
          </Magnetic>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden relative h-10 w-10 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`absolute left-2.5 right-2.5 h-px bg-foreground transition-all duration-300 ${open ? "top-1/2 rotate-45" : "top-[16px]"}`} />
            <span className={`absolute left-2.5 right-2.5 h-px bg-foreground transition-all duration-300 ${open ? "top-1/2 -rotate-45" : "top-[24px]"}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-background px-6 pt-6 overflow-y-auto lg:hidden">
          <ul>
            {[...links, ...more].map((l, i) => (
              <li key={l.href} className="rise border-b border-border" style={{ "--d": `${i * 40}ms` } as React.CSSProperties}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between py-4 font-display text-4xl ${isActive(l.href) ? "text-accent" : ""}`}
                >
                  {l.name}
                  <span className="deva text-muted text-base">{devaNum(i + 1)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
