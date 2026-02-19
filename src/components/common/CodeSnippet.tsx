'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CodeSnippetProps {
    children: React.ReactNode;
    language?: string;
    className?: string;
}

export default function CodeSnippet({ children, language, className }: CodeSnippetProps) {
    return (
        <div className={cn("not-prose my-10 group relative", className)}>
            {/* Minimal Language Tag (Improved Visibility) */}
            {language && (
                <div className="absolute top-3 right-3 z-20 pointer-events-none">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--neon-purple)] bg-[var(--bg-card)] border border-[var(--glass-border)] px-2 py-1 rounded-md shadow-md opacity-70 group-hover:opacity-100 transition-all duration-500 select-none font-mono">
                        {language}
                    </span>
                </div>
            )}

            {/* Content Area with Subtle Theme-Aware Background */}
            <div className="relative overflow-hidden rounded-xl bg-[var(--text-primary)]/[0.03] border border-[var(--glass-border)]/20 transition-colors duration-500 group-hover:border-[var(--neon-purple)]/20">
                <pre className="!bg-transparent !border-none !shadow-none p-6 overflow-x-auto selection:bg-[var(--neon-purple)]/20 scrollbar-none text-sm leading-relaxed font-mono text-[var(--text-primary)] transition-colors duration-500">
                    {children}
                </pre>
            </div>
        </div>
    );
}
