'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Briefcase, Calendar, MapPin, ExternalLink, Code, Brain, Cloud, Database, Layers, GraduationCap, Users, Puzzle } from 'lucide-react';

export default function Experience() {
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-[#0d0d14] dark:via-[#0f0f17] dark:to-[#12121c]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-950/50 rounded-2xl mb-6">
                <Briefcase className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-5xl md:text-6xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-6">
                Professional Experience
              </h1>
              <p className="text-xl md:text-2xl font-body text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Building innovative AI-powered solutions and contributing to the tech community 
                through education and hands-on development
              </p>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-24 bg-white dark:bg-[#08080c]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="space-y-16">
              {experiences.map((exp, index) => {
                const IconComponent = exp.icon;
                return (
                  <div key={exp.id} className="relative">
                    {/* Timeline line */}
                    {index !== experiences.length - 1 && (
                      <div className="absolute left-0 md:left-1/2 top-24 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-200 dark:from-blue-400 dark:to-blue-900 transform -translate-x-1/2 hidden md:block"></div>
                    )}
                    
                    <div className={`flex flex-col md:flex-row gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                      {/* Timeline Dot */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full items-center justify-center z-10 shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Content Card */}
                      <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#12121c] dark:to-[#0f0f17] rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl group">
                          {/* Header */}
                          <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3 md:hidden">
                              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-xl flex items-center justify-center">
                                <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                              </div>
                              {exp.current && (
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            
                            <div className={`flex items-center gap-3 mb-2 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                              <h3 className="text-2xl md:text-3xl font-elegant font-bold text-gray-900 dark:text-gray-100">
                                {exp.role}
                              </h3>
                              {exp.current && (
                                <span className="hidden md:inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            
                            <h4 className="text-xl font-serif font-semibold text-blue-600 dark:text-blue-400 mb-4">
                              {exp.company}
                            </h4>
                            
                            <div className={`flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 text-sm ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-body">{exp.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span className="font-body">{exp.location} • {exp.type}</span>
                              </div>
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="mb-6">
                            <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                              {exp.technologies.map((tech, idx) => (
                                <span 
                                  key={idx}
                                  className="px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-xs font-body font-semibold rounded-lg"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Achievements */}
                          <div className="space-y-4">
                            {exp.achievements.map((achievement, idx) => (
                              <div key={idx} className={`flex items-start gap-3 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                                <p 
                                  className={`font-body text-gray-700 dark:text-gray-300 leading-relaxed ${index % 2 === 1 ? 'md:text-right' : ''}`}
                                  dangerouslySetInnerHTML={{ 
                                    __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-gray-100">$1</strong>') 
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skills Highlight Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-[#0d0d14] dark:to-[#0a0a0f]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-6">
                Core Competencies
              </h2>
              <p className="text-xl font-body text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Expertise across the full stack of modern software development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Brain, title: "AI & ML", desc: "LLMs, Computer Vision, ML Pipelines" },
                { icon: Cloud, title: "Cloud Native", desc: "AWS, Lambda, Docker, Microservices" },
                { icon: Code, title: "Full-Stack Dev", desc: "Next.js, Go, Python, TypeScript" },
                { icon: Database, title: "Data Systems", desc: "PostgreSQL, MongoDB, Neo4j" }
              ].map((skill, idx) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-[#14141c] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl group text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <skill.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-sm font-body text-gray-600 dark:text-gray-300">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-[#08080c] to-black text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl font-body mb-12 text-gray-300 max-w-2xl mx-auto">
              Interested in collaborating on innovative AI and full-stack projects? 
              Let's connect and build something amazing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:sahilgangurde08@gmail.com"
                className="inline-block px-10 py-4 bg-blue-600 text-white font-body font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </a>
              <a
                href="/projects"
                className="inline-block px-10 py-4 border-2 border-blue-600 text-blue-600 font-body font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                View Projects
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

