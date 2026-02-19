'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import TableOfContents from '@/components/TableOfContents';
import { Github, Code, Palette, Database, Globe, FileText, Brain, ExternalLink, ArrowRight, Cpu, Layers, Network, Zap, Shield, Bot, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

const featuredProjects = [
    {
        id: "wasm-quant",
        title: "WASM Quant: High-Performance In-Browser Backtesting",
        type: "code",
        date: "Ongoing",
        technologies: ["C++", "WebAssembly", "React", "TypeScript", "Workers"],
        icon: Gauge,
        points: [
            "Architected a **bare-metal C++ backtesting engine** compiled to **WebAssembly**, achieving extreme throughput of **~18M rows/sec** for millisecond-latency simulations in the browser.",
            "Optimized processing of millions of financial data rows using **zero-infrastructure local execution**, ensuring data privacy and 'Black Box' security by keeping IP on the client-side.",
            "Developed a **responsive React dashboard** with dynamic **Web Worker** integration to perform heavy C++ computations asynchronously without blocking the main thread.",
            "Implemented a custom **SVG-based branding system** and high-performance financial charting to visualize equity curves and performance metrics in real-time."
        ]
    },
    {
        id: "mudra-flow",
        title: "Mudra-Flow: Autonomous AI ERP & Agentic RAG System",
        type: "code",
        date: "January 2026",
        technologies: ["n8n", "Google Gemini 3.0", "Node.js", "Telegram Bot API", "Google Sheets API"],
        icon: Bot,
        points: [
            "Architected a high-intensity **Autonomous AI Agent** for the jewelry sector, leveraging **Agentic RAG** to process complex **Hinglish** natural language inquiries via a **Telegram Bot** interface.",
            "Implemented a **deterministic financial engine** in JavaScript that eliminates LLM math hallucinations by cross-referencing live market data (XAU/INR) with 18k/22k/24k purity factors and dynamic making charges.",
            "Engineered a **NoSQL-style implementation using Google Sheets API** as the primary database, featuring a **fuzzy-logic matching algorithm** to recommend multiple inventory options from a 60+ item ledger.",
            "Deployed an automated **CRM lead-capture pipeline** that asynchronously logs customer intent and data directly into a cloud-based ledger from the Telegram bot, bridging generative AI with rigid business logic."
        ]
    },
    {
        id: "velocitylob",
        title: "VelocityLOB: High-Performance C++ Order Book",
        type: "code",
        date: "December 2025",
        technologies: ["C++17", "CMake", "GDB", "Data Structures"],
        icon: Zap,
        githubUrl: "https://github.com/lostmartian/VelocityLOB",
        points: [
            "Developed a **C++ matching engine** capable of processing orders with Price-Time Priority (FIFO), ensuring fair and precise execution for market participants.",
            "Optimized for **O(1) Order Cancellation** using a Dual-Mapping architecture (std::map + std::unordered_map) for constant-time lookup and cancellation.",
            "Leveraged **C++ Templates** to build a type-agnostic engine that handles both Buy and Sell sides without code duplication, bypassing strict STL constraints.",
            "Utilized a nested architecture of **Linked Lists within Red-Black Trees** to maintain strict price ordering while allowing for rapid insertion/removal."
        ]
    },
    {
        id: "docunexus",
        title: "Docunexus: Knowledge Graph Platform",
        type: "code",
        date: "June 2024",
        technologies: ["Neo4j", "Google Gemini", "GraphRAG", "LangGraph", "Go"],
        icon: Network,
        points: [
            "Orchestrated an end-to-end **GraphRAG pipeline** using **Google Gemini 1.5 Pro** for structured extraction and **Neo4j** for entity-relationship mapping, enabling deep discovery across unstructured legal document collections.",
            "Architected an advanced hybrid search system using a **7-node LangGraph workflow** that executes parallel semantic vector searches and NL-to-Cypher conversions.",
            "Engineered an **Intelligent Context Caching system** for Gemini that reduced LLM API operational costs by **70%** by prioritizing system instructions and managing token limits."
        ]
    }
];

const archivedProjects = [
    {
        id: "lostdb",
        title: "lostdb: Fast & Persistent Key-Value Store",
        description: "A disk-based key-value store in Python featuring B-Tree indexing and persistent slotted-page storage for high-efficiency data recovery.",
        technologies: ["Python", "B-Tree", "Database Systems"],
        githubUrl: "https://github.com/lostmartian/lostdb",
        date: "2024"
    },
    {
        id: 2,
        title: "Building and Road Segmentation",
        description: "Developed a novel EffUNet architecture combining EfficientNetV2 with a UNet decoder, achieving benchmark mIOU scores of 0.8365 and 0.9153.",
        technologies: ["PyTorch", "Deep Learning", "UNet"],
        githubUrl: "https://github.com/lostmartian/Building-and-Road-Segmentation-from-Aerial-Images",
        date: "2022"
    },
    {
        id: 3,
        title: "LSB Steganography with AES",
        description: "Published an advanced steganography technique using Pixel Locator Sequence (PLS) and AES encryption, enhancing data security through random distribution.",
        technologies: ["Python", "OpenCV", "Cryptography"],
        paperUrl: "https://ieeexplore.ieee.org/abstract/document/9478162",
        date: "2021"
    },
    {
        id: 4,
        title: "Saathi: AI Agriculture Platform",
        description: "AI-powered agriculture platform achieving 99%+ accuracy in crop recommendation and disease detection using TensorFlow and Scikit-learn.",
        technologies: ["Tensorflow", "Flask", "Docker", "Nginx"],
        githubUrl: "https://github.com/lostmartian/Saathi",
        date: "2022"
    },
    {
        id: 5,
        title: "Image Quilting - Texture Synthesis",
        description: "Implementation of texture generation and transfer algorithms from SIGGRAPH'01 using NumPy and OpenCV.",
        technologies: ["Python", "NumPy", "OpenCV"],
        githubUrl: "https://github.com/lostmartian/image-quilting-texture-synthesis",
        date: "2021"
    },
    {
        id: 6,
        title: "bWall: Anonymous BBS",
        description: "A secure, anonymous image-based bulletin board platform with comprehensive backend unit testing.",
        technologies: ["Flask", "SQL", "Docker"],
        githubUrl: "https://github.com/lostmartian/ITIT-3103-Software-Engineering",
        date: "2021"
    },
    {
        id: 7,
        title: "Postgres - Auto Indexing",
        description: "Automated indexing for secondary columns using HypoPG for virtual indexing, optimizing scan-heavy workloads.",
        technologies: ["C", "PostgreSQL", "HypoPG"],
        date: "2021"
    },
    {
        id: 8,
        title: "Game of Life",
        description: "High-performance simulator of Conway's Game of Life implemented using functional programming paradigms in C++.",
        technologies: ["C++", "Simulation"],
        githubUrl: "https://github.com/lostmartian/Game-of-Life-CPP-Simulator",
        date: "2021"
    },
    {
        id: 9,
        title: "CovidRecognizer",
        description: "Biomedical image classification pipeline utilizing UNet segmentation with CLAHE and advanced binarization techniques.",
        technologies: ["Deep Learning", "UNet", "OpenCV"],
        githubUrl: "https://github.com/lostmartian/CovidRecognizer",
        date: "2020"
    },
    {
        id: 10,
        title: "Covid19 Tracker",
        description: "Real-time state-wise tracker for India using Chart.js to visualize infection and recovery trends via public APIs.",
        technologies: ["JavaScript", "Chart.Js", "API"],
        githubUrl: "https://github.com/lostmartian/Covid-19-Tracker",
        date: "2020"
    }
];

export default function ProjectsClient() {
    return (
        <div className="min-h-screen bg-[var(--bg-deep)] transition-colors duration-300 font-body">
            <Header />
            <TableOfContents />

            <main className="flex-1 lg:pl-64 xl:pr-80">
                {/* Hero Section */}
                <PageHero
                    title="Engineering & AI Systems"
                    subtitle="Architecting high-concurrency platforms, Knowledge Graphs, and intelligent agents."
                />

                {/* Featured Projects Tier */}
                <section id="featured-projects" className="pb-24 relative">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="flex items-center gap-4 mb-16">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-80">
                                Featured Work
                            </h2>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--neon-cyan)]/30 to-transparent" />
                        </div>

                        <div className="space-y-32">
                            {featuredProjects.map((project, index) => {
                                const projectId = `project-${project.id}`;
                                const isEven = index % 2 === 0;

                                return (
                                    <motion.div
                                        key={project.id}
                                        id={projectId}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5 }}
                                        className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}
                                    >
                                        {/* Visual/Icon Side */}
                                        <div className={`lg:col-span-5 ${!isEven ? 'lg:order-2' : ''}`}>
                                            <div className="relative group">
                                                <div className="absolute inset-x-0 -bottom-8 h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/20 to-transparent blur-sm" />
                                                <div className="aspect-square glass-card rounded-3xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]/50 backdrop-blur-sm flex items-center justify-center relative z-10 group-hover:border-[var(--neon-cyan)]/30 transition-all duration-700">
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--neon-cyan)]/5 to-[var(--neon-purple)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                                    <project.icon className="w-24 h-24 text-[var(--text-muted)] group-hover:text-[var(--neon-cyan)] group-hover:scale-110 transition-all duration-700 relative z-10" />

                                                    {/* Decorative Elements */}
                                                    <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-[var(--neon-cyan)] opacity-20 group-hover:animate-pulse" />
                                                    <div className="absolute bottom-8 left-8 w-1 h-1 rounded-full bg-[var(--neon-purple)] opacity-20" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className={`lg:col-span-7 ${!isEven ? 'lg:order-1' : ''}`}>
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/20 rounded-full">
                                                            {project.date}
                                                        </span>
                                                        <div className="h-px w-8 bg-[var(--glass-border)]" />
                                                    </div>

                                                    <h3 className="text-3xl md:text-5xl font-elegant font-bold text-[var(--text-primary)] leading-[1.1]">
                                                        {project.title}
                                                    </h3>

                                                    <div className="flex flex-wrap gap-2 pt-2">
                                                        {project.technologies.map((tech, idx) => (
                                                            <span key={idx} className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] px-3 py-1.5 rounded-md bg-[var(--glass-highlight)] border border-[var(--glass-border)] hover:border-[var(--neon-cyan)]/30 transition-colors">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <ul className="space-y-6">
                                                    {project.points.map((point, pointIndex) => (
                                                        <li key={pointIndex} className="flex gap-4 text-[var(--text-secondary)] leading-relaxed group/item">
                                                            <div className="mt-2.5 w-1 h-1 rounded-full bg-[var(--neon-cyan)] flex-shrink-0 group-hover/item:scale-150 transition-transform shadow-[0_0_8px_var(--neon-cyan)]" />
                                                            <span className="text-lg opacity-90" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text-primary)] font-semibold">$1</strong>') }} />
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="flex flex-wrap gap-4 pt-4">
                                                    {project.githubUrl && (
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--text-primary)] text-[var(--bg-deep)] font-bold hover:bg-[var(--neon-cyan)] transition-all duration-300 group/btn"
                                                        >
                                                            <Github className="w-5 h-5" />
                                                            <span>Repository</span>
                                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Archive Tier */}
                <section id="project-archive" className="py-24 border-t border-[var(--glass-border)]/30 bg-[var(--bg-deep)]/10">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex flex-col items-center text-center mb-16">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-4">
                                Project Archive
                            </h2>
                            <p className="text-[var(--text-secondary)] max-w-xl font-light">
                                Earlier explorations in computer vision, security, and web development.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {archivedProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group relative p-8 rounded-3xl glass-card border border-[var(--glass-border)] hover:border-[var(--neon-cyan)]/20 transition-all duration-500 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="text-[10px] font-black tracking-widest text-[var(--text-muted)] opacity-50">
                                                {project.date}
                                            </span>
                                            <div className="flex gap-3">
                                                {project.githubUrl && (
                                                    <a href={project.githubUrl} className="text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors">
                                                        <Github size={18} />
                                                    </a>
                                                )}
                                                {project.paperUrl && (
                                                    <a href={project.paperUrl} className="text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors">
                                                        <FileText size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-elegant font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--neon-cyan)] transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, idx) => (
                                                <span key={idx} className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--glass-highlight)] px-2 py-1 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-[var(--glass-border)] opacity-0 group-hover:opacity-100 transition-opacity">
                                        {project.githubUrl ? (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-[var(--neon-cyan)] flex items-center gap-2 hover:underline">
                                                VIEW REPOSITORY <ArrowRight size={10} />
                                            </a>
                                        ) : project.paperUrl ? (
                                            <a href={project.paperUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-[var(--neon-cyan)] flex items-center gap-2 hover:underline">
                                                READ PAPER <ArrowRight size={10} />
                                            </a>
                                        ) : (
                                            <span className="text-[10px] font-bold text-[var(--text-muted)] flex items-center gap-2">
                                                ARCHIVED PROJECT
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
