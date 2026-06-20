"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "WORK", href: "/work" },
  { name: "ABOUT", href: "/about" },
  { name: "BLOGS", href: "/blogs" },
  { name: "PROJECTS", href: "/projects" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile navigation on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll listener to update nav background opacity once hero is scrolled past
  useEffect(() => {
    if (pathname !== "/") {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full pt-4 pointer-events-none flex justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-16 mx-auto">
          <nav className="w-full h-20 transition-all duration-300 pointer-events-auto rounded-2xl border border-border bg-background/60 backdrop-blur-sm relative overflow-hidden px-6">
            {/* Subtle theme noise/grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 h-full flex items-center justify-between">
              <Link href="/" className="flex flex-col justify-center group z-50">
                <span className="text-xl sm:text-2xl font-serif sm:tracking-[0.15em] font-medium text-foreground leading-none uppercase">
                  Sahil Gangurde
                </span>
                {pathname === "/" && (
                  <span className="text-[9px] sm:text-[10px] font-mono text-foreground/30 normal-case tracking-[0.2em] mt-1 leading-none">
                    aka lostmartian
                  </span>
                )}
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`transition-colors hover:text-foreground relative ${isActive ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground"
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

              {/* Mobile Navigation Toggle */}
              <div className="flex md:hidden items-center gap-4 z-50">
                <ThemeToggle />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 text-foreground/80 hover:text-foreground focus:outline-none transition-colors"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-[100] flex flex-col justify-between pointer-events-auto overflow-hidden bg-background"
          >
            {/* Subtle theme noise/grain overlay for mobile drawer */}
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Unified Header inside Drawer to prevent visual jump and transparency bleed */}
            <div className="relative z-10 pt-4 px-4 sm:px-16 border-b border-border/10">
              <div className="max-w-7xl w-full mx-auto h-20 px-6 flex items-center justify-between">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex flex-col justify-center">
                  <span className="text-xl sm:text-2xl font-serif sm:tracking-[0.15em] font-medium text-foreground leading-none uppercase">
                    Sahil Gangurde
                  </span>
                  {pathname === "/" && (
                    <span className="text-[9px] sm:text-[10px] font-mono text-foreground/30 normal-case tracking-[0.2em] mt-1 leading-none">
                      aka lostmartian
                    </span>
                  )}
                </Link>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-foreground/80 hover:text-foreground focus:outline-none transition-colors"
                    aria-label="Close Menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Links with Staggered Animations */}
            <div className="relative z-10 px-4 sm:px-16 flex-grow flex flex-col justify-center">
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
                }}
                className="px-6 py-10 flex flex-col gap-6 text-xl font-serif tracking-widest uppercase"
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.href}
                      variants={{
                        open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
                        closed: { y: 15, opacity: 0, transition: { y: { stiffness: 1000 } } }
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`relative flex items-center justify-between py-3 border-b border-border/10 transition-colors ${isActive ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground"
                          }`}
                      >
                        <span>{link.name}</span>
                        <span className="text-[10px] font-mono opacity-30">
                          {isActive ? "[ ACTIVE ]" : ""}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Mobile menu status footer */}
            <div className="relative z-10 px-4 sm:px-16 border-t border-border/20">
              <div
                className="px-6 py-6 flex justify-between items-center text-[9px] font-mono text-foreground/40 uppercase tracking-widest"
                style={{ backgroundColor: "var(--background)" }}
              >
                <span>Status: Active</span>
                <span>Ref: 0x_LOSTPARTIAN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


