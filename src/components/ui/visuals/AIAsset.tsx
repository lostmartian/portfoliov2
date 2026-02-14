'use client';

import { motion } from 'framer-motion';
import { Send, User, Bot, FileText, Search, Sparkles } from 'lucide-react';

export default function AIAsset() {
    return (
        <div className="relative w-full h-[240px] bg-slate-950 rounded-xl overflow-hidden border border-[var(--glass-border)] shadow-2xl flex flex-col font-sans">
            {/* Header / Context Bar */}
            <div className="h-8 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center px-3 justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">AI Agent Active</span>
                </div>
                <div className="flex items-center gap-1.5 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    <FileText className="w-3 h-3 text-purple-400" />
                    <span className="text-[8px] font-bold text-purple-400 uppercase">contract_audit.pdf</span>
                </div>
            </div>

            {/* Chat Space */}
            <div className="flex-1 p-3 flex flex-col gap-3 overflow-hidden">

                {/* User Message */}
                <div className="flex items-start gap-2 max-w-[80%]">
                    <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center shrink-0">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg rounded-tl-none">
                        <p className="text-[10px] text-slate-300 leading-tight italic">"Summarize the liability clauses in this document."</p>
                    </div>
                </div>

                {/* RAG Logic Indicator (Permanent) */}
                <div className="flex items-center gap-2 py-1">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-cyan-500/5 rounded-full border border-cyan-500/10">
                        <Search className="w-2.5 h-2.5 text-cyan-400" />
                        <span className="text-[7px] font-black text-cyan-500/60 uppercase tracking-tighter">Scanning 1,240 chunks...</span>
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-2 self-end max-w-[85%]">
                    <div className="flex flex-col items-end gap-1.5 flex-1">
                        <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-purple-500/30 p-2.5 rounded-lg rounded-tr-none shadow-xl relative">
                            <Sparkles className="absolute -top-1.5 -left-1.5 w-3 h-3 text-purple-400" />
                            <div className="space-y-1">
                                <p className="text-[8px] text-white/90 leading-tight">
                                    <span className="font-bold text-purple-300 underline">Section 4.2</span>: Liability is capped at $50k or 1x fees paid in the trailing 12 months.
                                </p>
                                <p className="text-[8px] text-white/70 leading-tight">
                                    <span className="font-bold text-blue-300">Exclusions</span>: Gross negligence and data breaches are uncapped.
                                </p>
                            </div>
                        </div>
                        <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mr-1">Generated Response</span>
                    </div>
                    <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shrink-0">
                        <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                </div>

            </div>

            {/* Mock Input Area */}
            <div className="h-10 bg-slate-900/50 border-t border-slate-800 flex items-center px-3 gap-3">
                <div className="flex-1 h-5 bg-slate-950 border border-slate-800 rounded-md px-2 flex items-center">
                    <div className="w-[1px] h-3 bg-cyan-400 animate-pulse" />
                </div>
                <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center">
                    <Send className="w-3 h-3 text-slate-500" />
                </div>
            </div>
        </div>
    );
}
