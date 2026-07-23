"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { name: "Work", href: "/work" },
  { name: "Blogs", href: "/blogs" },
  { name: "Projects", href: "/projects" },
  { name: "Readlist", href: "/readlist" },
  { name: "Resume", href: "#" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative py-2 border-b border-border">
      <div className="flex justify-between items-center w-full">
        {/* Logo / Title */}
        <Link href="/" className="text-base font-semibold tracking-tight uppercase hover:opacity-85">
          Sahil Gangurde
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Desktop Nav Links */}
          <nav className="hidden sm:flex items-center gap-6 text-xs font-mono uppercase tracking-wider">
            {navLinks.map((link) => {
              const isActive =
                link.href !== "#" &&
                (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors hover:text-foreground ${
                    isActive ? "text-foreground font-semibold border-b border-foreground pb-0.5" : "text-foreground/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />

          {/* Mobile Menu Icon Toggle */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex sm:hidden p-1 text-foreground/60 hover:text-foreground cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Overlay Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full mt-1.5 z-50 p-4 border border-border/40 rounded bg-background shadow-lg flex flex-col gap-3 sm:hidden animate-in fade-in slide-in-from-top-1 duration-100"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href !== "#" &&
              (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-xs font-mono uppercase tracking-wider py-1 border-b border-transparent transition-all ${
                  isActive ? "text-foreground font-semibold border-border" : "text-foreground/60"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
