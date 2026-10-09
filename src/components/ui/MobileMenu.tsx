"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import type Lenis from "lenis";
import { ThemeToggle } from "../ThemeToggle";
import { DanceCircle } from "../warli/Warli";
import { CONTACT_DATA } from "@/config/contact";
import LocalTime from "./LocalTime";
import { devaNum } from "./deva";

type NavLink = { name: string; href: string };

const SOCIAL = [
  { name: "GitHub", href: CONTACT_DATA.github },
  { name: "LinkedIn", href: CONTACT_DATA.linkedin },
  { name: "X", href: CONTACT_DATA.twitter },
  { name: "YouTube", href: CONTACT_DATA.youtube },
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The phone menu: a full sheet that unrolls from the top like a cloth banner.
 * Rendered into <body> so no ancestor's backdrop-filter or transform can trap it
 * (a `fixed` element inside a blurred header is sized to the header, not the screen).
 */
export default function MobileMenu({
  open,
  onClose,
  links,
  more,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  more: NavLink[];
  isActive: (href: string) => boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  // While open: hold the page still, listen for Escape, and put focus inside the sheet.
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const focus = setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(focus);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      data-open={open}
      className="mobile-menu fixed inset-0 z-[80] lg:hidden flex flex-col bg-background text-foreground overflow-y-auto overscroll-contain"
      data-lenis-prevent
    >
      <DanceCircle className="pointer-events-none absolute -right-28 bottom-24 w-[340px] text-accent/10" />

      {/* the same bar as the header, so opening feels like the page folding down */}
      <div className="relative flex items-center justify-between h-[72px] px-5 sm:px-8 border-b border-border shrink-0">
        <Link href="/" onClick={onClose} className="flex items-baseline gap-2.5">
          <span className="font-display text-2xl leading-none">Sahil Gangurde</span>
          <span className="deva text-accent text-sm leading-none">साहिल</span>
        </Link>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              onClose();
              setTimeout(() => window.dispatchEvent(new Event("open-palette")), 350);
            }}
            className="h-8 px-2.5 mr-1 inline-flex items-center border border-border-strong text-muted cursor-pointer"
            aria-label="Search the site"
          >
            <span className="deva text-[13px] leading-none">शोध</span>
          </button>
          <ThemeToggle />
          <button
            ref={closeRef}
            onClick={onClose}
            className="relative h-10 w-10 grid place-items-center cursor-pointer"
            aria-label="Close menu"
          >
            <span className="absolute h-px w-5 bg-foreground rotate-45" />
            <span className="absolute h-px w-5 bg-foreground -rotate-45" />
          </button>
        </div>
      </div>

      <nav className="relative flex-1 px-5 sm:px-8 pt-6" aria-label="Main">
        <p className="menu-in label" style={d(60)}>
          Pages
        </p>
        <ul className="mt-2">
          {links.map((l, i) => {
            const active = isActive(l.href);
            return (
              <li key={l.href} className="menu-in border-b border-border" style={d(100 + i * 55)}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-center gap-4 py-3.5 active:text-accent"
                >
                  <span className="deva w-6 text-base text-accent/80">{devaNum(i + 1)}</span>
                  <span className={`font-display text-[2.6rem] leading-none tracking-[-0.02em] ${active ? "text-accent" : ""}`}>{l.name}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                  <ArrowUpRight className="ml-auto w-5 h-5 text-muted transition-transform duration-300 group-active:rotate-45" />
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="menu-in label mt-9" style={d(360)}>
          More
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-x-6">
          {more.map((l, i) => (
            <li key={l.href} className="menu-in" style={d(400 + i * 40)}>
              <Link
                href={l.href}
                onClick={onClose}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`block py-2.5 text-[17px] ${isActive(l.href) ? "text-accent" : "text-foreground/80"}`}
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="menu-in relative px-5 sm:px-8 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-5" style={d(600)}>
        <Link
          href="/#contact"
          onClick={onClose}
          className="flex items-center justify-between h-14 pl-6 pr-2 rounded-full bg-foreground text-background text-base"
        >
          Let&apos;s talk
          <span className="grid place-items-center h-10 w-10 rounded-full bg-background text-foreground">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
          {SOCIAL.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="link-u text-foreground/80">
              {s.name}
            </a>
          ))}
        </div>
        <p className="flex items-center gap-2.5 text-[13px] text-muted">
          <span className="pulse-dot h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
          Available for new work · <LocalTime />
        </p>
      </div>
    </div>,
    document.body
  );
}
