'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Github, ArrowRight, Code, Palette, Database, Globe, FileText, Brain } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "lostdb - A fast and persistent key value store",
      type: "code",
      date: "July - Ongoing, 2024",
      technologies: ["Python, Database Systems"],
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
      technologies: ["Deep Learning | PyTorch, Numpy, Matplotlib"],
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
      technologies: ["Python, Pillow, OpenCV, Cryptography"],
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
      technologies: ["Web Development & ML | Tensorflow, Keras, Flask, Bootstrap, SQL, Docker, Nginx"],
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
      technologies: ["Digital Image Processing | Python"],
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
      technologies: ["Web Development | Flask, Bootstrap, SQL, Docker"],
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
      technologies: ["Database Systems | C, Python"],
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
      technologies: ["Theory of Automation | C++"],
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
      technologies: ["Image processing, Deep Learning | OpenCV, NumPy, Pillow"],
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
      technologies: ["Web Development | HTML, CSS, Bootstrap, JavaScript"],
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
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Glass orbs background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="glass-orb w-96 h-96 top-10 right-10 float-animation opacity-50" style={{ animationDelay: '0s' }}></div>
            <div className="glass-orb w-72 h-72 bottom-20 left-20 float-animation opacity-60" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="frosted-glass rounded-3xl p-12 md:p-16 edge-glow inline-block">
                <h1 className="text-5xl md:text-6xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-6">
                  My Work
                </h1>
                <p className="text-xl md:text-2xl font-body text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed">
                  A showcase of my projects in AI/ML, database systems, and full-stack development, 
                  featuring innovative solutions and research contributions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="glass-orb w-64 h-64 top-20 right-10 float-animation opacity-40" style={{ animationDelay: '1s' }}></div>
            <div className="glass-orb w-56 h-56 bottom-20 left-10 float-animation opacity-50" style={{ animationDelay: '3s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="space-y-24">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative group">
                      <div className="aspect-video glass-card rounded-3xl overflow-hidden edge-glow">
                        <div className="w-full h-full flex items-center justify-center relative z-10">
                          <project.icon className="w-24 h-24 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="space-y-6 glass-card rounded-3xl p-8">
                      <div className="space-y-2 relative z-10">
                        <div className="text-blue-600 dark:text-blue-400 font-body font-medium text-sm">
                          {project.date}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 dark:text-gray-100">
                          {project.title}
                        </h3>
                        <div className="text-gray-700 dark:text-gray-300 font-body">
                          {project.technologies}
                        </div>
                      </div>

                      <ul className="space-y-3 relative z-10">
                        {project.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start text-gray-700 dark:text-gray-300 font-body leading-relaxed">
                            <span className="mr-3 text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">•</span>
                            <span dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-4 pt-4 relative z-10">
                        {project.type === "code" && project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-button flex items-center space-x-2 px-6 py-3 border-2 border-blue-600/50 text-blue-700 dark:text-blue-300 font-body font-semibold rounded-xl hover:border-blue-600 transition-all duration-300 hover:scale-105"
                          >
                            <Github className="w-5 h-5" />
                            <span>Code</span>
                          </a>
                        )}
                        {project.type === "paper" && project.paperUrl && (
                          <a
                            href={project.paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-body font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/50"
                          >
                            <FileText className="w-5 h-5" />
                            <span>Paper</span>
                          </a>
                        )}
                        {project.venue && (
                          <div className="text-sm text-gray-700 dark:text-gray-300 font-body italic pt-3 w-full">
                            {project.venue}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900">
          <div className="absolute inset-0 mesh-gradient opacity-30"></div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="glass-orb w-80 h-80 top-10 left-10 float-animation opacity-30" style={{ animationDelay: '0s' }}></div>
            <div className="glass-orb w-72 h-72 bottom-10 right-10 float-animation opacity-40" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="frosted-glass rounded-3xl p-12 md:p-16 edge-glow">
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-gray-900 dark:text-white">
                Interested in Working Together?
              </h2>
              <p className="text-xl font-body mb-12 text-gray-700 dark:text-white/90 max-w-2xl mx-auto">
                I'm always excited to take on new challenges and collaborate on 
                innovative AI-powered projects that push the boundaries of what's possible.
              </p>
              <a
                href="/about"
                className="inline-flex items-center space-x-2 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-body font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/50 hover:from-indigo-600 hover:to-purple-600"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
