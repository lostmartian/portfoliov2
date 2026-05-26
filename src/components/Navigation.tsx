"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "WORK", href: "/work" },
  { name: "ABOUT", href: "/about" },
  { name: "BLOGS", href: "/blogs" },
  { name: "PROJECTS", href: "/projects" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full h-20 bg-navbar backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full px-8 sm:px-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col justify-center group">
          <span className="text-xl sm:text-2xl font-serif sm:tracking-[0.15em] font-medium text-foreground leading-none uppercase">
            Sahil Gangurde
          </span>
          {pathname === "/" && (
            <span className="text-[9px] sm:text-[10px] font-mono text-foreground/30 normal-case tracking-[0.2em] mt-1 leading-none">
              aka lostmartian
            </span>
          )}
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-foreground relative ${isActive ? "text-foreground" : "text-grey-500"
                  }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-foreground rounded-full transition-all duration-300" />
                )}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

