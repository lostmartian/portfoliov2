'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Brain, TrendingDown, Network } from 'lucide-react';

interface TechnicalSpecsProps {
    mode: 'gradient' | 'neural';
    isOpen: boolean;
    onClose: () => void;
}

export default function TechnicalSpecs({ mode, isOpen, onClose }: TechnicalSpecsProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[80vh] overflow-y-auto bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl shadow-2xl z-50 p-6 md:p-8"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                            <X size={20} />
                        </button>

                        <div className="space-y-6">
                            {mode === 'gradient' ? <GradientContent /> : <NeuralContent />}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function GradientContent() {
    return (
        <div className="text-[var(--text-primary)]">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)]">
                    <TrendingDown size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Gradient Descent</h2>
                    <p className="text-[var(--text-muted)]">Optimization Algorithm</p>
                </div>
            </div>

            <div className="space-y-6 text-sm md:text-base leading-relaxed opacity-90">
                <section>
                    <h3 className="text-lg font-semibold text-[var(--neon-cyan)] mb-2">The Loss Landscape</h3>
                    <p>
                        The 2D terrain you see represents the <strong className="text-[var(--neon-purple)]">Loss Function</strong> (or Cost Function), denoted as <code className="bg-black/30 px-1 rounded font-mono">J(θ)</code>.
                        It visualizes the error of a machine learning model for every possible combination of parameters (X and Z coordinates).
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-2 text-[var(--text-secondary)]">
                        <li><strong className="text-red-400">Red Peaks:</strong> High error (bad model performance).</li>
                        <li><strong className="text-blue-400">Blue Valleys:</strong> Low error (good model performance).</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-[var(--neon-cyan)] mb-2">The Ball (Parameters)</h3>
                    <p>
                        The glowing ball represents the current state of the model's parameters <code className="bg-black/30 px-1 rounded font-mono">θ</code>.
                        The goal is to roll the ball to the deepest valley (Global Minimum), where the error is lowest.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-[var(--neon-cyan)] mb-2">The Math</h3>
                    <p>
                        At each step, we calculate the <strong className="text-[var(--neon-purple)]">Gradient</strong> (<code className="bg-black/30 px-1 rounded font-mono">∇J(θ)</code>), which is the vector of partial derivatives pointing in the direction of the steepest ascent.
                        To minimize error, we move in the opposite direction.
                    </p>
                    <div className="my-4 p-4 bg-black/40 rounded-lg font-mono text-center border border-[var(--glass-border)]">
                        θ_new = θ_old - α · ∇J(θ)
                    </div>
                    <p>
                        Here, <code className="bg-black/30 px-1 rounded font-mono">α</code> (Alpha) is the <strong className="text-[var(--neon-purple)]">Learning Rate</strong>.
                        You can adjust this slider to see how it affects the descent:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-2 text-[var(--text-secondary)]">
                        <li><strong>Low α:</strong> Slow, steady convergence.</li>
                        <li><strong>High α:</strong> Fast, but might overshoot the minimum.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

function NeuralContent() {
    return (
        <div className="text-[var(--text-primary)]">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[var(--neon-purple)]/20 text-[var(--neon-purple)]">
                    <Network size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Semantic Vector Search</h2>
                    <p className="text-[var(--text-muted)]">High-Dimensional Embeddings</p>
                </div>
            </div>

            <div className="space-y-6 text-sm md:text-base leading-relaxed opacity-90">
                <section>
                    <h3 className="text-lg font-semibold text-[var(--neon-purple)] mb-2">Latent Space</h3>
                    <p>
                        This simulation visualizes a <strong className="text-[var(--neon-cyan)]">High-Dimensional Vector Space</strong>.
                        In modern AI (like LLMs), concepts are converted into lists of numbers called <strong className="text-[var(--neon-cyan)]">Embeddings</strong>.
                        For example, "King" might be <code className="bg-black/30 px-1 rounded font-mono">[0.2, -0.5, 0.9, ...]</code>.
                    </p>
                    <p className="mt-2">
                        We project these 768+ dimensions down to 3D so we can see them. Concepts with similar meanings end up physically closer together.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-[var(--neon-purple)] mb-2">Euclidean Distance</h3>
                    <p>
                        To find related concepts, we calculate the distance between the <strong className="text-[var(--neon-cyan)]">Query Vector</strong> (what you type) and every other point in the database.
                    </p>
                    <div className="my-4 p-4 bg-black/40 rounded-lg font-mono text-center border border-[var(--glass-border)]">
                        d(p, q) = √ Σ (p_i - q_i)²
                    </div>
                    <p>
                        A smaller distance (<code className="bg-black/30 px-1 rounded font-mono">d ≈ 0</code>) means high semantic similarity.
                        A larger distance means the concepts are unrelated.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-[var(--neon-purple)] mb-2">k-Nearest Neighbors (k-NN)</h3>
                    <p>
                        The search engine performs a <strong className="text-[var(--neon-cyan)]">k-NN Search</strong>.
                        It sorts all points by distance and returns the top <code className="bg-black/30 px-1 rounded font-mono">k</code> results (in this demo, k=5).
                    </p>
                    <p className="mt-2">
                        This is the core technology behind RAG (Retrieval-Augmented Generation), Recommendation Systems, and Semantic Search engines.
                    </p>
                </section>
            </div>
        </div>
    );
}
