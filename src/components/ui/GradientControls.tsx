'use client';

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface GradientControlsProps {
    learningRate: number;
    onChange: (value: number) => void;
}

export default function GradientControls({ learningRate, onChange }: GradientControlsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 right-8 z-50 glass-panel p-4 rounded-2xl w-64"
        >
            <div className="flex items-center gap-2 mb-3 text-[var(--text-primary)]">
                <Activity size={16} className="text-[var(--neon-cyan)]" />
                <span className="text-sm font-medium">Learning Rate (η)</span>
                <span className="ml-auto text-xs font-mono text-[var(--neon-purple)]">{learningRate.toFixed(3)}</span>
            </div>

            <input
                type="range"
                min="0.001"
                max="0.5"
                step="0.001"
                value={learningRate}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-[var(--glass-border)] rounded-lg appearance-none cursor-pointer accent-[var(--neon-cyan)]"
            />

            <div className="flex justify-between mt-2 text-[10px] text-[var(--text-muted)]">
                <span>Stable</span>
                <span>Chaotic</span>
            </div>
        </motion.div>
    );
}
