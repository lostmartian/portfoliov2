'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';
import { Github, Code, Palette, Database, Globe, FileText, Brain, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "lostdb - A fast and persistent key value store",
      type: "code",
      date: "July - Ongoing, 2024",
      technologies: ["Python", "Database Systems"],
      icon: Database,
      githubUrl: "https://github.com/lostmartian/lostdb",
      points: [
        "Designed a key value database from scratch in Python with a **disk-based persistence layer**, enabling **100%** data **recovery** and **consistency** between restarts.",
        "Implemented a **B-Tree indexing** structure, **reducing disk reads** by 50% and improving query performance.",
        "Developed **serialization** and **deserialization** methods for database nodes, converting data to and from the **slotted page format** for minimal overhead and efficient access."
      ]
    },
    {
      id: 2,
      title: "Building and Road Segmentation using UNet and Transfer Learning Approach",
      type: "code",
      date: "September, 2022",
      technologies: ["Deep Learning", "PyTorch", "Numpy", "Matplotlib"],
      icon: Code,
      githubUrl: "https://github.com/lostmartian/Building-and-Road-Segmentation-from-Aerial-Images",
      points: [
        "Developed a novel **EffUNet** architecture combining **EfficientNetV2** as an **encoder** with a UNet decoder for segmenting buildings and roads from aerial images, achieving **benchmark** mIOU scores of **0.8365** and **0.9153**.",
        "Utilized **PyTorch**, **Numpy**, and **Matplotlib** to implement and evaluate the model, demonstrating superior performance with **V2L+UNet** architecture, achieving **high precision and recall rates**.",
        "Conducted comprehensive model evaluations, **optimizing** for metrics such as **Dice Loss**, **F1 Score**, and **accuracy**, contributing valuable data for **urban planning** and **policy-making**."
      ]
    },
    {
      id: 3,
      title: "LSB Steganography Using Pixel Locator Sequence with AES",
      type: "paper",
      date: "May 2021",
      technologies: ["Python", "Pillow", "OpenCV", "Cryptography"],
      icon: FileText,
      paperUrl: "https://ieeexplore.ieee.org/abstract/document/9478162",
      authors: "Sahil Gangurde & Krishnakant Tiwari",
      venue: "Presented at ICSCCC'21, NITJ",
      points: [
        "**Developed** and **published** an advanced LSB steganography technique using a **Pixel Locator Sequence (PLS)** and **AES encryption**, enhancing data security by randomly distributing pixel modifications.",
        "Implemented and evaluated the technique with Python, **Pillow**, **OpenCV**, and **Cryptography** libraries, achieving **robust** steganalysis results, such as **0.0365 (Primary Sets)** and **0.0203 (Chi-Square)**.",
        "Published findings in **IEEE ICSCCC'21**, showcasing significant **improvements** in steganography security and practical applications in confidential data embedding and transmission."
      ]
    },
    {
      id: 4,
      title: "Saathi | AI based agriculture utility website",
      type: "code",
      date: "January, 2022",
      technologies: ["Web Development", "ML", "Tensorflow", "Keras", "Flask", "Bootstrap", "SQL", "Docker", "Nginx"],
      icon: Globe,
      githubUrl: "https://github.com/lostmartian/Saathi",
      points: [
        "Developed and deployed an AI-powered agriculture platform using **TensorFlow**, **Keras**, and **Scikit-learn**, achieving up to **99.31%** accuracy in crop recommendation and over **95%** accuracy in plant disease detection.",
        "Built a user-friendly **web interface** with **Flask** and **Bootstrap**, providing comprehensive crop information and tailored recommendations based on soil quality and environmental factors.",
        "**Containerized** the application environment with **Docker** and implemented **Nginx** for **load balancing**, enhancing deployment consistency, scalability, and website performance under **high traffic** conditions."
      ]
    },
    {
      id: 5,
      title: "Image Quilting - Texture generation",
      type: "code",
      date: "December, 2021",
      technologies: ["Digital Image Processing", "Python"],
      icon: Palette,
      githubUrl: "https://github.com/lostmartian/image-quilting-texture-synthesis",
      points: [
        "Implemented the paper of **Alexei A. Efros & William T. Freeman** on image quilting texture generation and transfer from **SIGGRAPH'01**.",
        "Replicated the results by implementing it in Python using **Numpy, OpenCV and Matplotlib** libraries."
      ]
    },
    {
      id: 6,
      title: "bWall | Anonymous Image-based bulletin board",
      type: "code",
      date: "October, 2021",
      technologies: ["Web Development", "Flask", "Bootstrap", "SQL", "Docker"],
      icon: Globe,
      githubUrl: "https://github.com/lostmartian/ITIT-3103-Software-Engineering",
      points: [
        "Developed an anonymous image-based bulletin board platform where users can upload images, comment and share content.",
        "Implemented backend with Flask and performed comprehensive backend unit tests."
      ]
    },
    {
      id: 7,
      title: "Postgres - Auto Indexing",
      type: "code",
      date: "Summer'21",
      technologies: ["Database Systems", "C", "Python"],
      icon: Database,
      githubUrl: "",
      points: [
        "**Automated the indexing** for secondary columns with large scan read requests by Postgres to increase efficiency.",
        "Studied workings of Postgres, used **HypoPG** for **virtual indexing** to avoid overhead by parsing the query information to a log file."
      ]
    },
    {
      id: 8,
      title: "Game of Life",
      type: "code",
      date: "May 2021 - June 2021",
      technologies: ["Theory of Automation", "C++"],
      icon: Code,
      githubUrl: "https://github.com/lostmartian/Game-of-Life-CPP-Simulator",
      points: [
        "Created a 'Game of Life' simulator in C++ which is a cellular automaton devised by John Conway.",
        "Implemented this simulation system in C++ using functional programming paradigm."
      ]
    },
    {
      id: 9,
      title: "CovidRecognizer",
      type: "code",
      date: "December, 2020",
      technologies: ["Image processing", "Deep Learning", "OpenCV", "NumPy", "Pillow"],
      icon: Brain,
      githubUrl: "https://github.com/lostmartian/CovidRecognizer",
      points: [
        "Created an **image processing pipeline** for **biomedical image classification** and **segmentation**.",
        "Used image processing techniques such as **CLAHE**, **binarization**, **dilation**, etc.",
        "Implemented UNet for segmentation and achieved an accuracy of 82%."
      ]
    },
    {
      id: 10,
      title: "Covid19 Tracker",
      type: "code",
      date: "May, 2020",
      technologies: ["Web Development", "HTML", "CSS", "Bootstrap", "JavaScript"],
      icon: Globe,
      githubUrl: "https://github.com/lostmartian/Covid-19-Tracker",
      points: [
        "Displayed the covid infection, recoveries and deaths of every state in India.",
        "Fetched data through **API** and displayed the results in a bar format using **Chart.Js**."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#0a0a0f] dark:via-[#0f0f17] dark:to-[#12121c] mesh-gradient">
      <Header />
      <TableOfContents />

      <main className="flex-1 pt-4 md:pt-24 lg:pl-64 xl:pr-80">
        {/* Hero Section */}
        <section className="pt-4 md:pt-24 pb-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-elegant font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white mb-6 tracking-tight">
                Selected Works
              </h1>
              <p className="text-xl md:text-2xl font-body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A collection of experiments, tools, and research.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="pb-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="space-y-32">
              {projects.map((project, index) => {
                const projectId = `project-${project.id}`;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={project.id}
                    id={projectId}
                    initial={{ opacity: 0, y: 50 }}
                    animate={index < 2 ? { opacity: 1, y: 0 } : undefined}
                    whileInView={index >= 2 ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}
                  >
                    {/* Visual/Icon Side */}
                    <div className={`lg:col-span-5 ${!isEven ? 'lg:order-2' : ''}`}>
                      <div className="relative group">
                        {/* Glow Behind */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-3xl opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500" />

                        <div className="aspect-square md:aspect-video lg:aspect-square glass-card rounded-3xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-deep)]/50 backdrop-blur-sm flex items-center justify-center relative z-10 group-hover:border-[var(--neon-cyan)]/30 transition-colors duration-500">
                          <div className="absolute inset-0 bg-[var(--glass-highlight)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <project.icon className="w-32 h-32 text-[var(--text-muted)] group-hover:text-[var(--neon-cyan)] group-hover:scale-110 transition-all duration-500 relative z-10" />
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className={`lg:col-span-7 ${!isEven ? 'lg:order-1' : ''}`}>
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-sm font-medium text-[var(--neon-cyan)]">
                            <span className="px-3 py-1 rounded-full bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/20">
                              {project.date}
                            </span>
                            {project.type === 'paper' && (
                              <span className="px-3 py-1 rounded-full bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/20 text-[var(--neon-purple)]">
                                Research Paper
                              </span>
                            )}
                          </div>

                          <h3 className="text-3xl md:text-4xl font-elegant font-bold text-[var(--text-primary)] leading-tight">
                            {project.title}
                          </h3>

                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              // Handle comma separated strings if any, though array is cleaner
                              tech.split(',').map((t, i) => (
                                <span key={`${idx}-${i}`} className="text-sm text-[var(--text-muted)] font-medium px-2 py-1 rounded-md bg-[var(--glass-highlight)] border border-[var(--glass-border)]">
                                  {t.trim()}
                                </span>
                              ))
                            ))}
                          </div>
                        </div>

                        <div className="relative pl-2">
                          <ul className="space-y-4">
                            {project.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex gap-3 text-[var(--text-secondary)] leading-relaxed group/item">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                                <span dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text-primary)] font-semibold">$1</strong>') }} />
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-4 pt-6 mt-2">
                            {project.type === "code" && project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--glass-highlight)] text-[var(--text-primary)] font-medium border border-[var(--glass-border)] hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-all duration-300 group/btn"
                              >
                                <Github className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                <span>View Code</span>
                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                              </a>
                            )}
                            {project.type === "paper" && project.paperUrl && (
                              <a
                                href={project.paperUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--neon-cyan)] text-black font-bold hover:bg-[var(--neon-cyan)]/90 transition-all duration-300 shadow-[0_0_20px_-5px_var(--neon-cyan)] hover:shadow-[0_0_30px_-5px_var(--neon-cyan)] group/btn"
                              >
                                <FileText className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                <span>Read Paper</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            {project.venue && (
                              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] italic ml-auto">
                                <span>{project.venue}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
