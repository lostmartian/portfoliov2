'use client';

import { motion } from 'framer-motion';
import { Grid, Activity, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackgroundSwitcherProps {
    currentMode: 'life' | 'gradient' | 'neural';
    onSwitch: (mode: 'life' | 'gradient' | 'neural') => void;
}

export default function BackgroundSwitcher({ currentMode, onSwitch }: BackgroundSwitcherProps) {
    return (
        <div className="hidden md:flex absolute bottom-8 right-8 z-50 items-center gap-2 p-1 rounded-full glass-panel">
            <button
                onClick={() => onSwitch('life')}
                className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2",
                    currentMode === 'life' ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
            >
                {currentMode === 'life' && (
                    <motion.div
                        layoutId="bg-switch"
                        className="absolute inset-0 bg-[var(--glass-highlight)] rounded-full border border-[var(--glass-border)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-2">
                    <Grid size={16} />
                    <span className="hidden sm:inline">Game of Life</span>
                </span>
            </button>

            <button
                onClick={() => onSwitch('gradient')}
                className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2",
                    currentMode === 'gradient' ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
            >
                {currentMode === 'gradient' && (
                    <motion.div
                        layoutId="bg-switch"
                        className="absolute inset-0 bg-[var(--glass-highlight)] rounded-full border border-[var(--glass-border)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-2">
                    <Activity size={16} />
                    <span className="hidden sm:inline">Gradient Descent</span>
                </span>
            </button>

            <button
                onClick={() => onSwitch('neural')}
                className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2",
                    currentMode === 'neural' ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
            >
                {currentMode === 'neural' && (
                    <motion.div
                        layoutId="bg-switch"
                        className="absolute inset-0 bg-[var(--glass-highlight)] rounded-full border border-[var(--glass-border)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-2">
                    <Brain size={16} />
                    <span className="hidden sm:inline">Neural Search</span>
                </span>
            </button>
        </div>
    );
}
