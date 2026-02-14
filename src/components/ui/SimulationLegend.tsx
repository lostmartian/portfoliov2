'use client';

import { motion } from 'framer-motion';
import { Brain, MousePointer, Activity, Info } from 'lucide-react';
import { useState } from 'react';
import TechnicalSpecs from './TechnicalSpecs';

const LEGEND_CONFIG = {
    game: {
        title: "Game of Life",
        icon: Activity,
        description: "A cellular automaton simulating complex patterns from simple rules.",
        instructions: [
            "Click & Drag to paint cells.",
            "Watch patterns emerge and evolve.",
            "Cells live or die based on neighbors."
        ]
    },
    gradient: {
        title: "Gradient Descent",
        icon: MousePointer,
        description: "Visualizing how neural networks learn by minimizing error.",
        instructions: [
            "Click to place the 'ball' (parameters).",
            "Watch it roll down the loss landscape.",
            "Adjust Learning Rate to see stability vs. chaos."
        ]
    },
    neural: {
        title: "Semantic Knowledge Graph",
        icon: Brain,
        description: "Explore the neural connections between concepts.",
        instructions: [
            "Use buttons to Rotate and Zoom.",
            "Search to see semantic distances.",
            "Closer points = Higher relevance."
        ]
    }
};

interface SimulationLegendProps {
    mode: 'game' | 'gradient' | 'neural';
}

export default function SimulationLegend({ mode }: SimulationLegendProps) {
    const [showSpecs, setShowSpecs] = useState(false);
    const config = LEGEND_CONFIG[mode];
    const Icon = config.icon;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-8 left-8 z-40 max-w-xs"
            >
                <div className="glass-card p-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-3 mb-3 border-b border-[var(--glass-border)] pb-3">
                        <div className="p-2 rounded-lg bg-[var(--glass-highlight)] text-[var(--neon-purple)]">
                            <Icon size={20} />
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)]">{config.title}</h3>

                        {mode !== 'game' && (
                            <button
                                onClick={() => setShowSpecs(true)}
                                className="ml-auto p-1.5 rounded-full hover:bg-[var(--glass-highlight)] text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
                                title="Technical Details"
                            >
                                <Info size={16} />
                            </button>
                        )}
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                        {config.description}
                    </p>

                    <div className="space-y-2">
                        {config.instructions.map((instruction, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                                <span className="mt-1 w-1 h-1 rounded-full bg-[var(--neon-cyan)] shrink-0" />
                                <span>{instruction}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {mode !== 'game' && (
                <TechnicalSpecs
                    mode={mode as 'gradient' | 'neural'}
                    isOpen={showSpecs}
                    onClose={() => setShowSpecs(false)}
                />
            )}
        </>
    );
}
