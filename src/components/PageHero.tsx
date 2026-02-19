'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
    title: string;
    subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
    return (
        <section className="pt-32 md:pt-48 pb-16 relative overflow-hidden">
            {/* Standard Hero Background (Full Bleed to Navbar) */}
            <div className="absolute inset-x-0 top-0 h-full z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--neon-purple)]/5 via-transparent to-transparent opacity-20 dark:opacity-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-radial-gradient from-[var(--neon-purple)]/10 via-transparent to-transparent blur-3xl opacity-30 animate-pulse-slow" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="h1 font-elegant text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--neon-purple)] to-[var(--text-primary)] mb-6 animate-gradient bg-[length:200%_auto]">
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl font-body text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed">
                        {subtitle}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
