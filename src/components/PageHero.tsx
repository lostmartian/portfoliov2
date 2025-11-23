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
                    <h1 className="text-5xl md:text-7xl font-elegant font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white mb-6 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl font-body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
