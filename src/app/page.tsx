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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      <Header />
      
      <main className="flex-1">
        {/* Full-Screen Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-[#0f0f17] dark:via-[#12121c] dark:to-[#151520]">
          {/* Background Pattern */}
          {/* <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-32 h-32 border border-gray-300 dark:border-gray-700 rounded-full"></div>
            <div className="absolute top-40 right-32 w-24 h-24 border border-gray-300 dark:border-gray-700 rounded-full"></div>
            <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-gray-300 dark:border-gray-700 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 border border-gray-300 dark:border-gray-700 rounded-full"></div>
          </div> */}

          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-elegant font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100">
                AI & Web
                <br />
                <span className="text-blue-600">Solutions</span>
              </h1>
            </div>

            <div className="mb-12">
              <p className="text-xl md:text-2xl lg:text-3xl font-body max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
                Hi, I'm <span className="text-blue-600 font-semibold">Sahil Gangurde</span> from Pune, India
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-body max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
                Founding Full-Stack AI Engineer specializing in 
                <span className="text-blue-600 font-semibold"> AI/LLMs</span>, 
                <span className="text-blue-600 font-semibold"> web development</span>, and 
                <span className="text-blue-600 font-semibold"> cloud-native solutions</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:sahilgangurde08@gmail.com"
                className="px-10 py-4 bg-blue-600 text-white font-body font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Contact Me
              </a>
              
              <a
                href="/projects"
                className="px-10 py-4 border-2 border-blue-600 text-blue-600 font-body font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                View My Work
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 bg-white dark:bg-[#0d0d14]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
                  className="group bg-white dark:bg-[#14141c] rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-black/50"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/50 rounded-xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/70 transition-colors duration-300">
                      <skill.icon className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    {skill.title}
                  </h3>
                  <p className="font-body leading-relaxed text-gray-600 dark:text-gray-300">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-[#08080c] dark:to-black text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6">
                Let's Build Something
                <br />
                <span className="text-blue-400">Amazing</span>
              </h2>
              <p className="text-xl font-body mb-12 text-gray-300 max-w-2xl mx-auto">
                Ready to transform your ideas into reality? Let's discuss how we can work together 
                to create innovative AI and web solutions.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="mailto:sahilgangurde08@gmail.com"
                  className="inline-flex items-center px-10 py-4 bg-blue-600 text-white font-body font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                </a>
                <a
                  href="/about"
                  className="inline-block px-10 py-4 border-2 border-blue-600 text-blue-600 font-body font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
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