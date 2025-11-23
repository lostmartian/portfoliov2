'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import GameOfLife from '@/components/ui/GameOfLife';
import GradientDescent from '@/components/ui/GradientDescent';
import NeuralSearch from '@/components/ui/NeuralSearch';

const components = {
    GameOfLife: () => <div className="relative h-[400px] w-full my-8 rounded-xl overflow-hidden border border-[var(--glass-border)]"><GameOfLife /></div>,
    GradientDescent: () => <div className="relative h-[400px] w-full my-8 rounded-xl overflow-hidden border border-[var(--glass-border)]"><GradientDescent learningRate={0.01} /></div>,
    NeuralSearch: () => <div className="relative h-[400px] w-full my-8 rounded-xl overflow-hidden border border-[var(--glass-border)]"><NeuralSearch /></div>,
    // Add more custom components here
};

interface MDXContentProps {
    source: MDXRemoteSerializeResult;
}

export default function MDXContent({ source }: MDXContentProps) {
    return (
        <div className="prose prose-invert max-w-none prose-headings:font-elegant prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-a:text-[var(--neon-cyan)] prose-strong:text-[var(--text-primary)] prose-code:text-[var(--neon-pink)]">
            <MDXRemote {...source} components={components} />
        </div>
    );
}
