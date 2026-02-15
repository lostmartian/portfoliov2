'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
    title: string;
    subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
    return (
        <section className="pt-4 md:pt-24 pb-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="h1 font-elegant text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-blue-600 to-[var(--text-primary)] mb-6">
                        {title}
                    </h1>
                    <p className="text-body-large font-body text-[var(--text-secondary)] max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
