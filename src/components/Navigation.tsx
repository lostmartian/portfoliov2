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

  const isHomeActive = pathname === "/";

  return (
    <header className="relative py-2 border-b border-border">
      <div className="flex justify-between items-center w-full">
        {/* Logo / Title */}
        <Link 
          href="/" 
          className="text-base font-semibold hover:opacity-85 transition-colors"
        >
          Sahil Gangurde
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Desktop Nav Links */}
          <nav className="hidden sm:flex items-center gap-6 text-sm font-sans font-medium">
            {navLinks.map((link) => {
              const isActive =
                link.href !== "#" &&
                (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative pb-1.5 transition-all hover:text-accent flex items-center gap-1.5 ${
                    isActive ? "text-accent font-semibold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-accent" : "text-foreground/85"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <ThemeToggle />

          {/* Mobile Menu Icon Toggle */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex sm:hidden p-1 text-foreground/80 hover:text-foreground cursor-pointer focus:outline-none"
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
                className={`text-sm font-sans font-medium py-1.5 border-b border-border/10 transition-all flex items-center justify-between ${
                  isActive ? "text-accent font-semibold" : "text-foreground/85 hover:text-accent"
                }`}
              >
                <span className={`relative pb-1 ${isActive ? "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-accent" : ""}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
