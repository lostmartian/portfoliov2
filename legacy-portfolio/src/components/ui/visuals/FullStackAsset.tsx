'use client';

import { motion } from 'framer-motion';

export default function FullStackAsset() {
    return (
        <div className="relative w-full h-[240px] bg-[var(--bg-card)] rounded-xl overflow-hidden border border-[var(--glass-border)] shadow-2xl backdrop-blur-sm">
            {/* Browser Bar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-[var(--glass-highlight)] flex items-center px-4 gap-2 z-20 border-b border-[var(--glass-border)]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 max-w-[200px] h-4 bg-[var(--bg-deep)]/50 border border-[var(--glass-border)] rounded-md mx-auto" />
            </div>

            {/* Editor Surface */}
            <div className="absolute inset-0 pt-8 flex">
                {/* Sidebar */}
                <div className="w-16 h-full bg-[var(--glass-highlight)]/50 border-r border-[var(--glass-border)] flex flex-col items-center py-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-lg bg-[var(--glass-highlight)] border border-[var(--glass-border)] animate-pulse" />
                    ))}
                </div>

                {/* Code Content */}
                <div className="flex-1 p-6 font-mono text-xs overflow-hidden">
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <span className="text-purple-500">export</span>
                            <span className="text-blue-500">default</span>
                            <span className="text-purple-500">function</span>
                            <span className="text-yellow-600 dark:text-yellow-400">App</span>
                            <span className="text-[var(--text-primary)]">() {'{'}</span>
                        </div>
                        <div className="pl-4 flex gap-2">
                            <span className="text-purple-500">return</span>
                            <span className="text-[var(--text-primary)]">(</span>
                        </div>
                        <div className="pl-8 space-y-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '80%' }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                                className="h-1.5 bg-cyan-500/30 rounded"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '60%' }}
                                transition={{ duration: 1, delay: 0.2, repeat: Infinity, repeatType: 'reverse' }}
                                className="h-1.5 bg-purple-500/30 rounded"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '70%' }}
                                transition={{ duration: 1, delay: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                                className="h-1.5 bg-blue-500/30 rounded"
                            />
                        </div>
                        <div className="pl-4 text-[var(--text-primary)]">);</div>
                        <div className="text-[var(--text-primary)]">{'}'}</div>
                    </div>
                </div>

                {/* Visual Result Overlay */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute right-4 bottom-4 w-48 h-32 bg-[var(--glass-highlight)] backdrop-blur-xl border border-[var(--glass-border)] rounded-lg shadow-2xl p-4 overflow-hidden"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500" />
                        <div className="h-2 w-16 bg-[var(--text-muted)]/20 rounded" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-full bg-[var(--text-muted)]/10 rounded" />
                        <div className="h-2 w-[80%] bg-[var(--text-muted)]/10 rounded" />
                        <div className="h-2 w-[90%] bg-[var(--text-muted)]/10 rounded" />
                    </div>
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -right-4 -bottom-4 w-24 h-24 bg-cyan-500/20 blur-2xl rounded-full"
                    />
                </motion.div>
            </div>
        </div>
    );
}
