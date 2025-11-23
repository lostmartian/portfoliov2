'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';
import { Briefcase, Calendar, MapPin, Code, Brain, Cloud, Database, GraduationCap, Puzzle, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

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
      technologies: ["LLMs", "OpenCV", "AWS Lambda", "SQS", "EC2", "Next.js", "Go", "Python", "PostgreSQL", "MongoDB"],
      achievements: [
        "As the **sole engineer** for this function, independently engineered and deployed **AI-powered solutions** leveraging **LLMs**, computer vision (**OpenCV**), and **AWS cloud services** (Lambda, SQS, EC2) to automate image processing and data extraction workflows",
        "Leveraged **rapid prototyping skills** to design, build, and deploy the core **Minimum Viable Product (MVP)** of the AI solution, enabling rapid validation of the end-to-end **data extraction** and **automation workflow**",
        "Developed a proprietary, **multi-role data labeling platform** for images and PDF documents, significantly increasing the velocity and quality of internal dataset generation for ML model training",
        "Engineered and optimized **full-stack applications** (Next.js, Go, Python, PostgreSQL/MongoDB), implementing **AWS Cognito** for secure, multi-role user authentication and authorization, and deploying the frontend via **AWS Amplify** for scalable hosting",
        "Built and deployed complex **ML pipelines** for image digitization, integrating **prompt engineering**, **multi-LLM workflows**, and data validation techniques to achieve high accuracy extraction"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#0a0a0f] dark:via-[#0f0f17] dark:to-[#12121c] mesh-gradient">
      <Header />
      <TableOfContents />

      <main className="flex-1 pt-4 md:pt-24 lg:pl-64 xl:pr-80" ref={containerRef}>
        {/* Hero Section */}
        <section className="pt-4 md:pt-24 pb-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-elegant font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white mb-6 tracking-tight">
                Professional Odyssey
              </h1>
              <p className="text-xl md:text-2xl font-body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A timeline of building, teaching, and innovating.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="pb-32 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

            {/* Central Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--neon-cyan)] to-transparent opacity-30 md:-translate-x-1/2" />

            <div className="space-y-24">
              {experiences.map((exp, index) => {
                const IconComponent = exp.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={exp.id}
                    id={`experience-${exp.id}`} // Added ID for TableOfContents
                    initial={{ opacity: 0, y: 50 }}
                    animate={index < 2 ? { opacity: 1, y: 0 } : undefined}
                    whileInView={index >= 2 ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[var(--bg-deep)] border-2 border-[var(--neon-cyan)] rounded-full transform -translate-x-1/2 z-20 shadow-[0_0_10px_var(--neon-cyan)]">
                      <div className="absolute inset-0 bg-[var(--neon-cyan)] opacity-50 blur-sm rounded-full animate-pulse" />
                    </div>

                    {/* Date Label (Desktop) */}
                    <div className={`hidden md:block w-1/2 text-right ${!isEven ? 'text-left' : ''} px-8`}>
                      <span className="text-4xl font-bold font-elegant text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] to-transparent opacity-20">
                        {exp.duration.split(' - ')[0].split(' ')[1]}
                      </span>
                    </div>

                    {/* Card */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0">
                      <div className="group relative">
                        <div className="relative glass-card rounded-3xl p-8 border border-[var(--glass-border)] bg-[var(--bg-deep)]/80 backdrop-blur-xl overflow-hidden transition-all duration-500 group-hover:border-[var(--neon-cyan)]/50 group-hover:shadow-[0_0_20px_-5px_var(--neon-cyan)]">
                          {/* Background Decoration */}
                          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--neon-cyan)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                          {/* Header */}
                          <div className="relative z-10 mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <div className="p-3 rounded-xl bg-[var(--glass-highlight)] border border-[var(--glass-border)] text-[var(--neon-cyan)]">
                                <IconComponent size={24} />
                              </div>
                              {exp.current && (
                                <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase text-green-400 bg-green-400/10 border border-green-400/20 rounded-full animate-pulse">
                                  Current
                                </span>
                              )}
                            </div>

                            <h3 className="text-2xl font-bold font-elegant text-[var(--text-primary)] mb-1 group-hover:text-[var(--neon-cyan)] transition-colors">
                              {exp.role}
                            </h3>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--text-secondary)] mb-4">
                              <span className="font-semibold text-[var(--text-primary)]">{exp.company}</span>
                              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                              <span>{exp.duration}</span>
                              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                              <span>{exp.location}</span>
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                            {exp.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 text-xs font-medium rounded-md bg-[var(--glass-highlight)] text-[var(--text-muted)] border border-[var(--glass-border)] hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-colors cursor-default"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Achievements */}
                          <ul className="space-y-3 relative z-10">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed group/item">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)]/50 group-hover/item:bg-[var(--neon-cyan)] transition-colors flex-shrink-0" />
                                <span dangerouslySetInnerHTML={{
                                  __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text-primary)] font-semibold">$1</strong>')
                                }} />
                              </li>
                            ))}
                          </ul>
                        </div>
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
              <h2 className="text-4xl md:text-5xl font-elegant font-bold text-[var(--text-primary)] mb-6">
                Core Competencies
              </h2>
              <p className="text-xl font-body text-[var(--text-muted)] max-w-2xl mx-auto">
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
