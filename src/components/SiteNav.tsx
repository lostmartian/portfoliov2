import Link from "next/link";

const LINKS = [
  { href: "/", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/videos", label: "Videos", wide: true },
];

export type NavPath = "/" | "/services" | "/about" | "/blogs" | "/videos";

/** Top-level navigation shared by every page with a top bar. */
export function SiteNav({ active }: { active: NavPath }) {
  // Phones have room for three links: "Videos" goes, and so does "Work" away from the
  // homepage, where the name in the corner already links home.
  const hidePhone = (l: (typeof LINKS)[number]) => ("wide" in l && l.wide) || (l.href === "/" && active !== "/");
  return (
    <nav aria-label="Main" className="flex items-center gap-3.5 text-sm sm:gap-5">
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          aria-current={l.href === active ? "page" : undefined}
          className={`transition-colors ${hidePhone(l) ? "max-sm:hidden" : ""} ${l.href === active ? "text-fg" : "text-muted hover:text-fg"}`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
