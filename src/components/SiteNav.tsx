"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/writeups", label: "Writeups" },
  { href: "/videos", label: "Videos" },
  { href: "/cooking", label: "Cooking" },
];

export type NavPath = "/" | "/services" | "/about" | "/blogs" | "/writeups" | "/videos" | "/cooking";

/** Top-level navigation shared by every page with a top bar. From sm up every link sits in the
 *  bar; phones get a menu icon that opens the same links in a small panel. */
export function SiteNav({ active }: { active: NavPath }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on navigation, a tap outside, or Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const link = (l: (typeof LINKS)[number], extra = "") => (
    <Link
      key={l.href}
      href={l.href}
      aria-current={l.href === active ? "page" : undefined}
      onClick={() => setOpen(false)}
      className={`transition-colors ${l.href === active ? "text-fg" : "text-muted hover:text-fg"} ${extra}`}
    >
      {l.label}
    </Link>
  );

  return (
    <div ref={ref} className="relative">
      <nav aria-label="Main" className="flex items-center gap-5 text-sm max-sm:hidden">
        {LINKS.map((l) => link(l))}
      </nav>

      {/* Same size and look as the theme toggle beside it: two thin lines that cross into an X. */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className={`relative grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-fg/[0.06] hover:text-fg sm:hidden ${
          open ? "bg-fg/[0.06] text-fg" : "text-muted"
        }`}
      >
        <span aria-hidden className="relative block h-3 w-4">
          <span
            className={`absolute inset-x-0 h-[1.5px] rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
            }`}
          />
          <span
            className={`absolute inset-x-0 h-[1.5px] rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"
            }`}
          />
        </span>
      </button>

      {open && (
        <nav
          id="site-menu"
          aria-label="Main"
          className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl bg-card p-2 shadow-[0_12px_40px_-12px_rgb(var(--shadow)/0.35)] ring-1 ring-line sm:hidden"
        >
          {LINKS.map((l) =>
            link(l, `block rounded-xl px-3 py-2.5 text-[15px] ${l.href === active ? "bg-fg/[0.06] font-medium" : "hover:bg-fg/[0.04]"}`),
          )}
        </nav>
      )}
    </div>
  );
}
