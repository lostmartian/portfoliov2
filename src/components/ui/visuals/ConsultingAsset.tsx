'use client';

import { motion } from 'framer-motion';
import { Server, Database, Globe, Layers, Shield, Cpu } from 'lucide-react';

export default function ConsultingAsset() {
    return (
        <div className="relative w-full h-[240px] bg-slate-950 rounded-xl overflow-hidden border border-[var(--glass-border)] shadow-2xl p-4 font-mono">
            {/* Infrastructure Grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative h-full w-full flex items-center justify-between px-2">

                {/* Client / Internet Node */}
                <div className="flex flex-col items-center gap-2">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shadow-xl">
                        <Globe className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Clients</span>
                </div>

                {/* Connection 1 */}
                <div className="flex-1 flex items-center justify-center relative h-1">
                    <div className="w-full h-[1px] bg-slate-800" />
                    <motion.div
                        animate={{ x: ['-50%', '150%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-2 h-2 rounded-full bg-cyan-400/40 blur-[2px]"
                    />
                </div>

                {/* Load Balancer / WAF */}
                <div className="flex flex-col items-center gap-2">
                    <div className="px-4 py-3 rounded-md bg-slate-900 border-2 border-slate-700 shadow-2xl flex flex-col items-center gap-1.5">
                        <Shield className="w-4 h-4 text-green-400" />
                        <div className="h-0.5 w-6 bg-slate-800 rounded-full" />
                        <div className="h-0.5 w-4 bg-slate-800 rounded-full" />
                    </div>
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">Load Balancer</span>
                </div>

                {/* Multi-Path Connections */}
                <div className="flex-1 relative h-20">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <path d="M 0 40 Q 20 40, 40 10" stroke="rgba(255,255,255,0.1)" fill="none" />
                        <path d="M 0 40 Q 20 40, 40 70" stroke="rgba(255,255,255,0.1)" fill="none" />
                        <motion.circle r="2" fill="#40e0d0" animate={{ offsetDistance: "100%" }} style={{ offsetPath: "path('M 0 40 Q 20 40, 40 10')" }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <motion.circle r="2" fill="#40e0d0" animate={{ offsetDistance: "100%" }} style={{ offsetPath: "path('M 0 40 Q 20 40, 40 70')" }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }} />
                    </svg>
                </div>

                {/* Clusters */}
                <div className="flex flex-col gap-8">
                    {/* App Cluster */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                            <div className="absolute top-1 left-1 w-12 h-10 bg-slate-800 rounded-md border border-slate-700 -z-10" />
                            <div className="w-12 h-10 bg-slate-900 border border-slate-600 rounded-md flex items-center justify-center p-2">
                                <Cpu className="w-4 h-4 text-purple-400" />
                            </div>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase whitespace-nowrap">App Cluster</span>
                    </div>

                    {/* Cache Layer */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-10 bg-slate-900 border border-slate-700 rounded-md flex items-center justify-center p-2">
                            <Layers className="w-4 h-4 text-pink-400" />
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase whitespace-nowrap">Redis Cache</span>
                    </div>
                </div>

                {/* Connection 2 */}
                <div className="flex-1 flex flex-col justify-center gap-8 h-full px-2">
                    <div className="h-[1px] bg-slate-800 w-full relative">
                        <motion.div animate={{ x: ['0%', '100%'] }} transition={{ duration: 1, repeat: Infinity }} className="absolute h-full w-4 bg-cyan-400/20 blur-sm" />
                    </div>
                    <div className="h-[1px] bg-slate-800 w-full relative">
                        <motion.div animate={{ x: ['0%', '100%'] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }} className="absolute h-full w-4 bg-cyan-400/20 blur-sm" />
                    </div>
                </div>

                {/* Database */}
                <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                        <div className="w-12 h-14 bg-slate-900 border-2 border-slate-700 flex flex-col items-center justify-center gap-1 rounded-sm">
                            <div className="w-8 h-1.5 bg-slate-800 rounded-full mb-1" />
                            <Database className="w-5 h-5 text-blue-500" />
                        </div>
                        {/* Read Replicas */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500/20 rounded-full border border-blue-500/40 animate-pulse" />
                    </div>
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">RDS Cluster</span>
                </div>

            </div>

            {/* Strategy Indicator Overlay */}
            <div className="absolute top-2 right-4 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[8px] font-black text-slate-500 uppercase">99.99% Availability</span>
                </div>
            </div>
        </div>
    );
}
