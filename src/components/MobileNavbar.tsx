'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Home, User, Briefcase, FolderKanban, Palette, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function MobileNavbar() {
    const [hidden, setHidden] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();
    const { scrollY } = useScroll();
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 50) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const menuItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/about', label: 'About', icon: User },
        { href: '/experience', label: 'Exp', icon: Briefcase },
        { href: '/projects', label: 'Work', icon: FolderKanban },
        { href: '/hobbies', label: 'Hobbies', icon: Palette }
    ];

    const normalizedPathname = pathname?.replace(/\/$/, '') || '/';

    const isActiveRoute = (href: string) => {
        if (href === '/') return normalizedPathname === '/';
        return normalizedPathname === href;
    };

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: 100, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
        >
            <div className="flex items-center gap-1 p-2 rounded-full glass-panel bg-opacity-90 dark:bg-opacity-80 border border-white/10 shadow-2xl backdrop-blur-xl">
                {menuItems.map((item) => {
                    const isActive = isActiveRoute(item.href);
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                                isActive
                                    ? "text-[var(--text-primary)]"
                                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeMobileTab"
                                    className="absolute inset-0 bg-[var(--glass-highlight)] rounded-full border border-[var(--glass-border)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">
                                <item.icon size={20} />
                            </span>
                        </Link>
                    );
                })}

                <div className="w-px h-6 bg-[var(--glass-border)] mx-1 opacity-50" />

                <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="relative flex items-center justify-center w-12 h-12 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-300"
                    aria-label="Toggle theme"
                >
                    {mounted && (
                        resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />
                    )}
                    {!mounted && <div className="w-5 h-5" />}
                </button>
            </div>
        </motion.nav>
    );
}
