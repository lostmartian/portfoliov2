'use client';

import { motion } from 'framer-motion';
import { PhoneIncoming, Mic, Brain, Database, MessageSquare, Headphones, ChevronRight } from 'lucide-react';

export default function AutomationAsset() {
    const nodes = [
        { id: 'start', x: 10, y: 50, icon: PhoneIncoming, label: 'Incoming', color: 'text-green-500', bg: 'bg-green-500/20' },
        { id: 'stt', x: 30, y: 50, icon: Mic, label: 'Whisper STT', color: 'text-blue-500', bg: 'bg-blue-500/20' },
        { id: 'intent', x: 50, y: 35, icon: Brain, label: 'Intent AI', color: 'text-purple-500', bg: 'bg-purple-500/20' },
        { id: 'crm', x: 70, y: 35, icon: Database, label: 'CRM Sync', color: 'text-orange-500', bg: 'bg-orange-500/20' },
        { id: 'agent', x: 90, y: 50, icon: Headphones, label: 'Support', color: 'text-cyan-500', bg: 'bg-cyan-500/20' },
        { id: 'reply', x: 70, y: 65, icon: MessageSquare, label: 'Auto-Reply', color: 'text-pink-500', bg: 'bg-pink-500/20' },
    ];

    const connections = [
        { from: 'start', to: 'stt' },
        { from: 'stt', to: 'intent' },
        { from: 'intent', to: 'crm' },
        { from: 'crm', to: 'agent' },
        { from: 'intent', to: 'reply' },
    ];

    const getPath = (fromId: string, toId: string) => {
        const from = nodes.find(n => n.id === fromId)!;
        const to = nodes.find(n => n.id === toId)!;
        const midX = (from.x + to.x) / 2;
        // Map 0-100 to 0-400 for a consistent SVG space
        const fX = from.x * 4;
        const fY = from.y * 2.6; // based on h-[260px]
        const tX = to.x * 4;
        const tY = to.y * 2.6;
        const mX = midX * 4;
        return `M ${fX} ${fY} C ${mX} ${fY}, ${mX} ${tY}, ${tX} ${tY}`;
    };

    return (
        <div className="relative w-full h-[260px] bg-slate-950 rounded-xl overflow-hidden border border-[var(--glass-border)] shadow-2xl p-6">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Flowing Data Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 260">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {connections.map((conn, i) => {
                    const path = getPath(conn.from, conn.to);
                    return (
                        <g key={i}>
                            <path
                                d={path}
                                stroke="rgba(255,255,255,0.15)"
                                strokeWidth="2"
                                fill="none"
                            />
                            <motion.path
                                d={path}
                                stroke="rgba(64,224,208,0.4)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="4 12"
                                animate={{ strokeDashoffset: [0, -32] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Animated Data Packet */}
                            <motion.circle
                                r="3"
                                fill="#40e0d0"
                                filter="url(#glow)"
                                initial={{ offsetDistance: "0%" }}
                                animate={{ offsetDistance: "100%" }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.7,
                                    ease: "easeInOut"
                                }}
                                style={{
                                    offsetPath: `path('${path}')`,
                                    offsetRotate: "auto"
                                }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                >
                    <div className="group relative flex flex-col items-center">
                        {/* Connection Node */}
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-2 shadow-2xl group-hover:border-cyan-500/50 transition-colors duration-300">
                            <node.icon className={`w-5 h-5 ${node.color}`} />
                            <div className={`absolute inset-0 rounded-xl ${node.bg} opacity-0 group-hover:opacity-100 blur-sm transition-opacity`} />
                        </div>

                        {/* Label */}
                        <div className="absolute -bottom-6 whitespace-nowrap opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                {node.label}
                            </span>
                        </div>

                        {/* Pulsing Status */}
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full ${node.bg.split('/')[0]}`}
                        />
                    </div>
                </motion.div>
            ))}

            {/* Mini Breadcrumb/Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] font-bold text-green-400/80 uppercase tracking-widest">System Active</span>
            </div>
        </div>
    );
}
