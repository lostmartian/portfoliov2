'use client';

import { motion } from 'framer-motion';

export default function FullStackAsset() {
    return (
        <div className="relative w-full h-[240px] bg-slate-950 rounded-xl overflow-hidden border border-[var(--glass-border)] shadow-2xl">
            {/* Browser Bar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-slate-900 flex items-center px-4 gap-2 z-20">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 max-w-[200px] h-4 bg-slate-800 rounded-md mx-auto" />
            </div>

            {/* Editor Surface */}
            <div className="absolute inset-0 pt-8 flex">
                {/* Sidebar */}
                <div className="w-16 h-full bg-slate-900/50 border-r border-slate-800 flex flex-col items-center py-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-lg bg-slate-800/50 animate-pulse" />
                    ))}
                </div>

                {/* Code Content */}
                <div className="flex-1 p-6 font-mono text-xs overflow-hidden">
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <span className="text-purple-400">export</span>
                            <span className="text-blue-400">default</span>
                            <span className="text-purple-400">function</span>
                            <span className="text-yellow-400">App</span>
                            <span className="text-white">() {'{'}</span>
                        </div>
                        <div className="pl-4 flex gap-2">
                            <span className="text-purple-400">return</span>
                            <span className="text-white">(</span>
                        </div>
                        <div className="pl-8 space-y-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '80%' }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                                className="h-1.5 bg-cyan-400/30 rounded"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '60%' }}
                                transition={{ duration: 1, delay: 0.2, repeat: Infinity, repeatType: 'reverse' }}
                                className="h-1.5 bg-purple-400/30 rounded"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '70%' }}
                                transition={{ duration: 1, delay: 0.4, repeat: Infinity, repeatType: 'reverse' }}
                                className="h-1.5 bg-blue-400/30 rounded"
                            />
                        </div>
                        <div className="pl-4 text-white">);</div>
                        <div className="text-white">{'}'}</div>
                    </div>
                </div>

                {/* Visual Result Overlay */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute right-4 bottom-4 w-48 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-4 overflow-hidden"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500" />
                        <div className="h-2 w-16 bg-white/20 rounded" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-full bg-white/10 rounded" />
                        <div className="h-2 w-[80%] bg-white/10 rounded" />
                        <div className="h-2 w-[90%] bg-white/10 rounded" />
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
