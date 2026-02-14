'use client';

import { LucideIcon } from 'lucide-react';

interface ServiceRevealItemProps {
    icon: LucideIcon;
    title: string;
    description: string;
    tech: string[];
    visual: React.ReactNode;
    index: number;
}

export default function ServiceRevealItem({
    icon: Icon,
    title,
    description,
    tech,
    visual,
    index
}: ServiceRevealItemProps) {
    const isEven = index % 2 === 0;

    return (
        <div
            className="w-full flex items-center justify-center py-12 lg:py-20"
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                {/* Visual Content Block */}
                <div className={`relative flex justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative w-full max-w-[480px] aspect-video">
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <div className="w-full h-full transform scale-100 lg:scale-110">
                                {visual}
                            </div>
                        </div>
                        {/* Subtle Glow behind assets */}
                        <div className="absolute -inset-20 bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
                    </div>
                </div>

                {/* Text Content Block */}
                <div className={`space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-4">
                        <h3 className="text-4xl lg:text-5xl font-elegant text-white leading-tight">
                            {title}
                        </h3>
                    </div>

                    <p className="text-lg lg:text-xl text-slate-400 leading-relaxed font-body max-w-xl">
                        {description}
                    </p>

                    <div className="space-y-5 pt-8">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-cyan-500/50" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Core Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-4 py-1.5 text-[11px] font-bold bg-white/5 border border-white/10 rounded-full text-slate-300 backdrop-blur-md hover:border-cyan-500/30 transition-colors"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
