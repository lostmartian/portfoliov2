'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowDown, Code, Database, Zap, Globe, Smartphone, Mail } from 'lucide-react';

export default function Home() {
  const skills = [
    { icon: Code, title: "AI & Machine Learning", description: "Building AI-powered solutions with LLMs and ML pipelines for intelligent automation" },
    { icon: Database, title: "Full-Stack Development", description: "Developing robust applications with Next.js, Go, Python, and modern databases" },
    { icon: Zap, title: "Cloud & DevOps", description: "Deploying scalable solutions on AWS with CI/CD pipelines and containerization" },
    { icon: Globe, title: "Web Solutions", description: "Creating modern, responsive web applications with cutting-edge frameworks" },
    { icon: Smartphone, title: "System Architecture", description: "Building distributed systems with microservices and event-driven architecture" },
    { icon: Mail, title: "Client Services", description: "Delivering end-to-end solutions from concept to deployment" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#0a0a0f] dark:via-[#0f0f17] dark:to-[#12121c] mesh-gradient">
      <Header />
      
      <main className="flex-1">
        {/* Full-Screen Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Animated Glass Orbs Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="glass-orb w-96 h-96 top-20 -left-48 float-animation opacity-60" style={{ animationDelay: '0s' }}></div>
            <div className="glass-orb w-80 h-80 top-1/3 right-10 float-animation opacity-50" style={{ animationDelay: '2s' }}></div>
            <div className="glass-orb w-72 h-72 bottom-32 left-1/4 float-animation opacity-70" style={{ animationDelay: '4s' }}></div>
            <div className="glass-orb w-64 h-64 bottom-10 right-1/3 float-animation opacity-60" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-elegant font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100">
                AI & Web
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>
            </div>

            <div className="mb-12">
              <p className="text-xl md:text-2xl lg:text-3xl font-body max-w-4xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200 mb-6">
                Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">Sahil Gangurde</span> from Pune, India
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-body max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
                Founding Full-Stack AI Engineer specializing in 
                <span className="text-blue-600 dark:text-blue-400 font-semibold"> AI/LLMs</span>, 
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> web development</span>, and 
                <span className="text-purple-600 dark:text-purple-400 font-semibold"> cloud-native solutions</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:sahilgangurde08@gmail.com"
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-body font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/50 relative overflow-hidden group"
              >
                <span className="relative z-10">Contact Me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </a>
              
              <a
                href="/projects"
                className="glass-button px-10 py-5 border-2 border-blue-600/50 text-blue-700 dark:text-blue-300 font-body font-semibold rounded-2xl transition-all duration-300 hover:border-blue-600"
              >
                View My Work
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="glass-orb w-72 h-72 top-10 right-20 float-animation opacity-40" style={{ animationDelay: '1.5s' }}></div>
            <div className="glass-orb w-56 h-56 bottom-20 left-10 float-animation opacity-50" style={{ animationDelay: '3s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-gray-900 dark:text-gray-100">
                Technical Expertise
              </h2>
              <p className="text-xl font-body max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                Specializing in AI/ML, full-stack development, and cloud architecture
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={skill.title}
                  className="group glass-card rounded-3xl p-8"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 edge-glow">
                      <skill.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-4 text-gray-900 dark:text-gray-100 relative z-10">
                    {skill.title}
                  </h3>
                  <p className="font-body leading-relaxed text-gray-700 dark:text-gray-300 relative z-10">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900">
          {/* Animated background */}
          <div className="absolute inset-0 mesh-gradient opacity-30"></div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="glass-orb w-96 h-96 top-10 left-10 float-animation opacity-30" style={{ animationDelay: '0s' }}></div>
            <div className="glass-orb w-80 h-80 bottom-10 right-10 float-animation opacity-40" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="frosted-glass rounded-3xl p-12 md:p-16 edge-glow">
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-gray-900 dark:text-white">
                Let's Build Something
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:text-yellow-400">
                  Amazing
                </span>
              </h2>
              <p className="text-xl font-body mb-12 text-gray-700 dark:text-white/90 max-w-2xl mx-auto">
                Ready to transform your ideas into reality? Let's discuss how we can work together 
                to create innovative AI and web solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="mailto:sahilgangurde08@gmail.com"
                  className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-body font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/50 hover:from-indigo-600 hover:to-purple-600"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  <span>Contact Me</span>
                </a>
                <a
                  href="/about"
                  className="inline-block px-10 py-5 border-2 border-blue-600 text-blue-600 dark:border-white dark:text-white font-body font-semibold rounded-2xl transition-all duration-300 hover:bg-blue-600 hover:text-white dark:hover:bg-white dark:hover:text-blue-600"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}