'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import TableOfContents from '@/components/TableOfContents';
import { ExternalLink, Brain, Code, Cloud, Server, Globe, Database } from 'lucide-react';
import Image from 'next/image';

const skillsWithIcons = [
    {
        category: "Generative AI",
        icon: Brain,
        items: [
            "Google Gemini API",
            "LangGraph",
            "Large Language Models (LLMs)",
            "Prompt Engineering",
            "Human-in-the-Loop (HITL) Systems"
        ]
    },
    {
        category: "Programming",
        icon: Code,
        items: [
            "Go (Golang)",
            "Python",
            "JavaScript/TypeScript",
            "SQL",
            "C++"
        ]
    },
    {
        category: "Cloud & DevOps",
        icon: Cloud,
        items: [
            "AWS (ECS, SQS, Lambda, S3, CodePipeline, Cognito, Amplify, RDS)",
            "CI/CD",
            "Docker"
        ]
    },
    {
        category: "Backend Development",
        icon: Server,
        items: [
            "Microservices",
            "Distributed Systems",
            "Event-Driven Architecture",
            "Serverless",
            "SAGA Pattern",
            "Concurrent Programming",
            "Gin (Golang)",
            "Next.js"
        ]
    },
    {
        category: "Frontend Development",
        icon: Globe,
        items: [
            "Next.js",
            "React",
            "ShadCN",
            "HTML",
            "CSS",
            "JavaScript"
        ]
    },
    {
        category: "Databases",
        icon: Database,
        items: [
            "PostgreSQL",
            "MongoDB",
            "Neo4j"
        ]
    }
];

const codingProfiles = [
    {
        platform: "LeetCode",
        rating: "600+ Problems",
        link: "https://leetcode.com/sahilgangurde/",
        description: "Regular problem solving and algorithm practice"
    },
    {
        platform: "CodeChef",
        rating: "5 Stars",
        link: "https://www.codechef.com/users/lost_martian",
        description: "Competitive programming and contests"
    }
];

export default function AboutClient() {
    return (
        <div className="min-h-screen bg-[var(--bg-deep)] transition-colors duration-300">
            <Header />
            <TableOfContents />

            <main className="flex-1 pt-4 md:pt-24 lg:pl-64 xl:pr-80">
                {/* Hero Section */}
                <PageHero
                    title="Sahil Gangurde | AI Engineering"
                    subtitle="Bridging the gap between advanced research and production-grade systems."
                />

                {/* Bio Section (Split Layout) */}
                <section id="bio" data-toc-title="Bio" className="pt-8 pb-16 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            {/* Profile Picture (Left) */}
                            <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-xl">
                                    <Image
                                        src="/images/Screenshot 2025-11-23 at 7.43.08 PM.png"
                                        alt="Sahil Gangurde - Full-Stack AI Engineer"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Bio Text (Right) */}
                            <div className="w-full md:w-2/3">
                                <h2 className="text-3xl md:text-4xl font-elegant font-bold text-[var(--text-primary)] mb-6">
                                    Hello, I'm Sahil.
                                </h2>
                                <div className="space-y-4 text-lg font-body text-[var(--text-secondary)] leading-relaxed">
                                    <p>
                                        I hold a <span className="font-semibold text-[var(--text-primary)]">B.Tech & M.Tech in Information Technology</span> from IIIT Gwalior (2019-2024).
                                        Currently, I work as a <span className="font-semibold text-[var(--text-primary)]">Founding Full-Stack AI Engineer</span> at a stealth startup, building AI-powered solutions from scratch.
                                    </p>
                                    <p>
                                        My expertise lies in <span className="font-semibold text-[var(--neon-blue)]">Generative AI</span>, <span className="font-semibold text-[var(--neon-blue)]">Python</span>, <span className="font-semibold text-[var(--neon-blue)]">Backend Development</span>, and building scalable systems.
                                        I specialize in crafting seamless <span className="font-semibold">Frontend</span> experiences, robust <span className="font-semibold">Backend</span> architectures, and integrating cutting-edge <span className="font-semibold">AI models</span>.
                                    </p>
                                    <p>
                                        Beyond coding, <span className="font-semibold text-[var(--text-primary)]">I love to teach</span> and mentor others in their tech journey.
                                    </p>
                                    <p>
                                        I am open to freelance opportunities across the full stack—whether it's building a modern web app, designing a complex backend, or implementing AI features.
                                        Let's build something amazing together.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Skills Section */}
                <section id="technical-skills" data-toc-title="Technical Skills" className="py-12 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-elegant font-bold text-[var(--text-primary)] mb-4">
                                Technical Skills
                            </h2>
                            <p className="text-lg font-body text-[var(--text-secondary)] max-w-2xl mx-auto">
                                My technical toolkit for building scalable and intelligent applications.
                            </p>
                        </div>

                        {/* Skills Grid - Clean & Minimal */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skillsWithIcons.map((category, idx) => {
                                const CategoryIcon = category.icon;
                                return (
                                    <div key={idx} className="bg-[var(--glass-highlight)] border border-[var(--glass-border)] rounded-2xl p-6 hover:border-blue-500/30 transition-colors duration-300">
                                        {/* Category Header */}
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                <CategoryIcon className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-lg font-elegant font-semibold text-[var(--text-primary)]">
                                                {category.category}
                                            </h3>
                                        </div>

                                        {/* Skills List */}
                                        <div className="flex flex-wrap gap-2">
                                            {category.items.map((item, itemIdx) => (
                                                <span
                                                    key={itemIdx}
                                                    className="py-1 px-3 rounded-md bg-[var(--glass-highlight)] text-sm font-body text-[var(--text-secondary)] border border-[var(--glass-border)] hover:border-blue-500/30 transition-colors"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Coding Profiles Section */}
                <section id="coding-profiles" data-toc-title="Coding Profiles" className="py-12 pb-24 relative">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-elegant font-bold text-[var(--text-primary)] mb-8 text-center">
                            Coding Profiles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {codingProfiles.map((profile) => (
                                <a
                                    key={profile.platform}
                                    href={profile.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block bg-[var(--glass-highlight)] border border-[var(--glass-border)] rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-elegant font-semibold text-[var(--text-primary)] mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {profile.platform}
                                            </h3>
                                            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">
                                                {profile.rating}
                                            </p>
                                            <p className="text-[var(--text-secondary)] text-sm">
                                                {profile.description}
                                            </p>
                                        </div>
                                        <ExternalLink className="w-5 h-5 text-[var(--text-muted)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
