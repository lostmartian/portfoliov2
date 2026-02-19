'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';
import { Briefcase, Calendar, MapPin, Code, Brain, Cloud, Database, GraduationCap, Puzzle, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import PageHero from '@/components/PageHero';

const experiences = [
    {
        id: 1,
        company: "Stealth-Mode AI Tech Startup",
        role: "Founding Full-Stack AI Engineer",
        type: "Remote",
        location: "India",
        duration: "October 2024 - Present",
        current: true,
        icon: Brain,
        technologies: ["Go", "Python", "Next.js", "PostgreSQL", "Neo4j", "AWS (EKS, Cognito, S3)", "Docker", "LLMs (Gemini)", "GraphRAG", "LangChain/LangGraph"],
        achievements: [
            "**Architected and Deployed a Cloud-Native PDF Annotation Platform**: Built a scalable, enterprise-grade system using **Go (Golang)** and **PostgreSQL**, leveraging **AWS Cognito** for secure, role-based access control (RBAC) and **AWS S3** for persistent document storage",
            "**Developed a High-Concurrency Task Engine**: Managed **100+ RESTful endpoints** with a task distribution system supporting parallel and series strategies, utilizing **Docker** for containerization and optimized for deployment on **AWS ECS/EKS** with **CloudWatch** monitoring",
            "**Engineered a Non-Deterministic Bipartite Instance Alignment & 4-Tier Consensus Framework**: Resolved inter-annotator discrepancies by formulating a global optimization problem using the **Hungarian Algorithm (Kuhn-Munkres)**; implemented order-independent matching for multi-instance entities by minimizing a cost matrix derived from **Value Similarity (60%)**, **Spatial Proximity/IoU (30%)**, and **Labeler Agreement (10%)**",
            "**Built Knowledge Graph Platform (Docunexus)**: Orchestrated an end-to-end **GraphRAG pipeline** using **Google Gemini 1.5 Pro** for structured extraction and **Neo4j** for entity-relationship mapping, enabling deep discovery across unstructured legal document collections",
            "**Architected an Advanced Hybrid Search & GraphRAG System**: Implemented a **7-node LangGraph workflow** that executes parallel semantic vector searches and NL-to-Cypher conversions, providing conversation-aware responses with automated source citations",
            "**Optimized AI Infrastructure & Costs**: Reduced LLM API operational costs by **70%** by engineering an **Intelligent Context Caching system** for Gemini that prioritized system instructions and managed token limits for batch processing"
        ]
    },
    {
        id: 2,
        company: "Independent Tutoring",
        role: "DSA & Machine Learning Instructor",
        type: "Remote",
        location: "India",
        duration: "January 2024 - September 2024",
        current: false,
        icon: GraduationCap,
        technologies: ["Data Structures", "Algorithms", "Machine Learning", "Python", "Problem Solving", "Mentoring"],
        achievements: [
            "Mentored and taught **Data Structures & Algorithms (DSA)** and **Machine Learning** concepts to diverse students, ranging from beginners to advanced learners preparing for technical interviews",
            "Designed and delivered **personalized curriculum** tailored to individual student needs, covering topics from fundamental data structures (arrays, trees, graphs) to advanced algorithmic paradigms (dynamic programming, greedy algorithms)",
            "Guided students through **practical ML projects** including supervised learning, neural networks, and model optimization, helping them build real-world applications and portfolios",
            "Achieved **high student success rate** with multiple students securing placements at top tech companies after intensive coaching sessions",
            "Developed custom **problem sets and practice materials** focusing on competitive programming platforms like LeetCode and Codeforces, significantly improving students' problem-solving speed and accuracy"
        ]
    },
    {
        id: 3,
        company: "GeekforGeeks",
        role: "Remote Content Writer",
        type: "Remote",
        location: "India",
        duration: "October 2022 - March 2024",
        current: false,
        icon: Code,
        technologies: ["Technical Writing", "Data Structures", "Algorithms", "Computer Vision", "Data Science"],
        achievements: [
            "Contributed **DSA problems and editorials** for the GeekforGeeks platform, helping thousands of learners understand complex algorithmic concepts",
            "Wrote **technical blogs** on various cutting-edge technologies including computer vision, data science, and advanced algorithms",
            "Created educational content that simplified complex technical topics, making them accessible to learners at different skill levels"
        ]
    },
    {
        id: 4,
        company: "HackerEarth",
        role: "Remote Problem Setter",
        type: "Remote",
        location: "India",
        duration: "April 2021 - August 2021",
        current: false,
        icon: Puzzle,
        technologies: ["Algorithm Design", "Problem Setting", "Competitive Programming", "Test Case Generation"],
        achievements: [
            "Designed and created **original algorithmic problems** for HackerEarth's problem library, used by thousands of developers for practice and skill assessment",
            "Developed **comprehensive test cases** and edge cases to ensure problem robustness, covering various difficulty levels from easy to advanced",
            "Crafted problems specifically tailored for **company recruitment drives** and **coding contests**, helping companies evaluate candidates' problem-solving abilities effectively",
            "Collaborated with the editorial team to write **detailed editorials and solutions** explaining optimal approaches, time complexity analysis, and implementation strategies",
            "Contributed to the platform's growing repository of high-quality competitive programming challenges, enhancing the learning experience for the developer community"
        ]
    }
];

export default function ExperienceClient() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div className="min-h-screen bg-[var(--bg-deep)] transition-colors duration-300">
            <Header />
            <TableOfContents />

            <main className="flex-1 lg:pl-64 xl:pr-80" ref={containerRef}>
                {/* Hero Section */}
                <PageHero
                    title="Professional Odyssey & Experience"
                    subtitle="A timeline of engineering complex AI systems and architectural innovation."
                />

                <section id="experience" className="pb-32 relative">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="space-y-12">
                            {experiences.map((exp, index) => {
                                const IconComponent = exp.icon;

                                return (
                                    <motion.div
                                        key={exp.id}
                                        id={`experience-${exp.id}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={index < 2 ? { opacity: 1, y: 0 } : undefined}
                                        whileInView={index >= 2 ? { opacity: 1, y: 0 } : undefined}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="relative py-12 border-b border-[var(--glass-border)] last:border-0">
                                            <div className="relative z-10">
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                                    <div className="space-y-2">
                                                        <h3 className="text-3xl md:text-4xl font-bold font-elegant text-[var(--text-primary)] transition-colors">
                                                            {exp.role}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-x-3 text-xl text-[var(--text-secondary)] font-body">
                                                            <span className="font-semibold text-[var(--text-primary)]">{exp.company}</span>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] opacity-30" />
                                                            <span className="text-[var(--text-muted)]">{exp.location}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                                                        {exp.current && (
                                                            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-400/10 border border-green-400/20 rounded-full">
                                                                Active
                                                            </span>
                                                        )}
                                                        <span className="text-base font-medium text-[var(--text-muted)]">
                                                            {exp.duration}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {exp.technologies.map((tech, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-md bg-[var(--glass-highlight)] text-[var(--text-muted)] border border-[var(--glass-border)]"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                <ul className="grid grid-cols-1 gap-6">
                                                    {exp.achievements.map((achievement, idx) => (
                                                        <li key={idx} className="flex gap-5 text-lg text-[var(--text-secondary)] leading-relaxed group/item">
                                                            <span className="mt-3 w-2 h-2 rounded-full bg-[var(--neon-cyan)]/30 group-hover/item:bg-[var(--neon-cyan)] transition-all flex-shrink-0" />
                                                            <span dangerouslySetInnerHTML={{
                                                                __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text-primary)] font-semibold">$1</strong>')
                                                            }} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Core Competencies - Bento Grid Style */}
                <section id="core-competencies" className="py-24 relative overflow-hidden border-t border-[var(--glass-border)]/30">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="h2 font-elegant text-[var(--text-primary)] mb-6">
                                Core Competencies
                            </h2>
                            <p className="text-body-large font-body text-[var(--text-muted)] max-w-2xl mx-auto">
                                A holistic skillset bridging advanced AI research with robust software engineering.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: Brain, title: "AI & ML", desc: "LLMs, Computer Vision, ML Pipelines", color: "from-purple-500 to-pink-500" },
                                { icon: Cloud, title: "Cloud Native", desc: "AWS, Lambda, Docker, Microservices", color: "from-blue-500 to-cyan-500" },
                                { icon: Code, title: "Full-Stack", desc: "Next.js, Go, Python, TypeScript", color: "from-green-500 to-emerald-500" },
                                { icon: Database, title: "Data Systems", desc: "PostgreSQL, MongoDB, Neo4j", color: "from-orange-500 to-red-500" }
                            ].map((skill, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="group relative overflow-hidden rounded-3xl glass-card p-8 border border-[var(--glass-border)]"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${skill.color} opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity duration-500`} />

                                    <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${skill.color} p-0.5 mb-6`}>
                                            <div className="w-full h-full bg-[var(--bg-deep)] rounded-[14px] flex items-center justify-center">
                                                <skill.icon size={20} className="text-[var(--text-primary)]" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold font-elegant text-[var(--text-primary)] mb-2">
                                            {skill.title}
                                        </h3>
                                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                                            {skill.desc}
                                        </p>
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
