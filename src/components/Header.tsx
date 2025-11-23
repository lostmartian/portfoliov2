'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon, Home, User, Briefcase, FolderKanban, Palette, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });



  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About Me', icon: User },
    { href: '/experience', label: 'Experience', icon: Briefcase },
    { href: '/projects', label: 'Projects', icon: FolderKanban },
    { href: '/hobbies', label: 'Hobbies', icon: Palette }
  ];

  const normalizedPathname = pathname?.replace(/\/$/, '') || '/';

  const isActiveRoute = (href: string) => {
    if (href === '/') return normalizedPathname === '/';
    return normalizedPathname === href;
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="hidden md:flex fixed top-6 left-0 right-0 z-[100] justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-3 p-3 rounded-full glass-vision-os backdrop-blur-sm">


          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 px-2" onMouseLeave={() => setHoveredTab(null)}>
            {menuItems.map((item) => {
              const isActive = isActiveRoute(item.href);
              const isHovered = hoveredTab === item.href;
              const showBubble = hoveredTab ? isHovered : isActive;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredTab(item.href)}
                  className={cn(
                    "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    showBubble
                      ? "text-[var(--text-primary)] scale-110"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {showBubble && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 glass-bubble rounded-full"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                    />
                  )}
                  <span className={cn(
                    "relative z-10 flex items-center gap-2 transition-all duration-300",
                    showBubble && "font-bold"
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-[var(--glass-highlight)] text-[var(--text-secondary)] transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden"
          >
            <div className="glass-panel rounded-2xl p-4 flex flex-col gap-2">
              {menuItems.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                      isActive
                        ? "bg-[var(--glass-highlight)] text-[var(--text-primary)] border border-[var(--glass-border)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-highlight)]"
                    )}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
