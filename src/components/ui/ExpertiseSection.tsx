'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layout, Cpu, Server, BarChart } from 'lucide-react';
import ServiceRevealItem from './ServiceRevealItem';
import AIAsset from './visuals/AIAsset';
import FullStackAsset from './visuals/FullStackAsset';
import AutomationAsset from './visuals/AutomationAsset';
import ConsultingAsset from './visuals/ConsultingAsset';

const services = [
    {
        icon: Cpu,
        title: 'AI & Intelligent Agents',
        description: 'We build production-grade AI systems that go beyond simple chat. From custom RAG pipelines to autonomous agent swarms that handle complex business logic without human intervention.',
        tech: ['Gemini API', 'LangGraph', 'OpenAI', 'LangChain', 'Python'],
        color: 'from-purple-500 to-indigo-600',
        visual: <AIAsset />
    },
    {
        icon: Layout,
        title: 'Full-Stack Product Engineering',
        description: 'Bespoke web applications built for scale and speed. We focus on high-performance architectures and premium user experiences that convert. Pixel-perfect, responsive, and robust.',
        tech: ['Next.js', 'Go', 'TypeScript', 'React', 'Supabase'],
        color: 'from-cyan-400 to-blue-600',
        visual: <FullStackAsset />
    },
    {
        icon: Server,
        title: 'Workflows & Automation',
        description: 'Automate away the boring stuff with sophisticated node-based workflows. We integrate your existing tools into a seamless, self-healing ecosystem that runs 24/7.',
        tech: ['n8n', 'Python', 'AWS Lambda', 'Zapier', 'Node.js'],
        color: 'from-green-400 to-emerald-600',
        visual: <AutomationAsset />
    },
    {
        icon: BarChart,
        title: 'Strategic Architecture & Consulting',
        description: 'Technical leadership for high-growth startups. We conduct deep architectural audits, plan scalable roadmaps, and provide the fractional CTO guidance needed to reach the next level.',
        tech: ['System Design', 'AWS', 'Microservices', 'Distributed Systems'],
        color: 'from-orange-400 to-rose-600',
        visual: <ConsultingAsset />
    }
];

export default function ExpertiseSection() {
    return (
        <section className="relative py-24 lg:py-40 bg-[var(--bg-deep)]">
            {/* Smooth transition gradient from top */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6">
                {/* Section Heading */}
                <div className="text-center mb-20 lg:mb-32">
                    <h2 className="text-sm font-elegant text-white/40 uppercase tracking-[0.6em] mb-4">
                        Expertise & Performance
                    </h2>
                    <h3 className="h2 font-elegant text-white mb-6">
                        Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Solutions</span>
                    </h3>
                    <p className="text-body-large text-slate-400 max-w-2xl mx-auto font-body leading-relaxed">
                        We combine deep technical engineering with strategic product thinking to build
                        systems that aren't just robust, but transformational.
                    </p>
                </div>

                {/* Main Content Area */}
                <div className="space-y-16 lg:space-y-24">
                    {services.map((service, index) => (
                        <ServiceRevealItem
                            key={service.title}
                            {...service}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
