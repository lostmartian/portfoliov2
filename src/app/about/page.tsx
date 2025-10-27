'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExternalLink, Brain, Code, Cloud, Server, Globe, Database } from 'lucide-react';

export default function About() {
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


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-[#0d0d14] dark:via-[#0f0f17] dark:to-[#12121c]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-6">
                About Me
              </h1>
              <p className="text-xl md:text-2xl font-body text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Founding Full-Stack AI Engineer passionate about building innovative solutions 
                that combine cutting-edge AI technology with robust engineering practices.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="py-24 bg-white dark:bg-[#08080c]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-6">
                Technical Skills
              </h2>
              <p className="text-xl font-body text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive expertise across AI/ML, full-stack development, and cloud technologies
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsWithIcons.map((category, idx) => {
                const CategoryIcon = category.icon;
                return (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-[#12121c] dark:to-[#0f0f17] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Category Header */}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                        <CategoryIcon className="w-6 h-6 text-blue-600 dark:text-blue-300 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                        {category.category}
                      </h3>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-2 mt-1">
                      {category.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="py-2 px-3 rounded-lg bg-white dark:bg-[#1a1a24] hover:shadow-sm transition-all duration-200"
                        >
                          <span className="text-sm font-body text-gray-700 dark:text-gray-200">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Coding Profiles Section */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-[#0d0d14] dark:to-[#0a0a0f]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Coding Profiles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {codingProfiles.map((profile) => (
                <a
                  key={profile.platform}
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-[#14141c] rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-gray-700 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {profile.platform}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-body font-medium text-sm mb-2">
                        {profile.rating}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 font-body text-sm">
                        {profile.description}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* My Journey Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a0f] dark:to-[#08080c]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-8">
                My Journey
              </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg font-body text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                My journey began at the Indian Institute of Information Technology, Gwalior, where I pursued 
                an integrated B.Tech & M.Tech in Information Technology. During my studies, I developed a deep 
                passion for artificial intelligence and machine learning, particularly in computer vision applications.
              </p>
              
              <p className="text-lg font-body text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                As a Founding Full-Stack AI Engineer at a stealth-mode startup, I've had the unique opportunity 
                to build AI-powered solutions from the ground up. I specialize in LLMs, computer vision with OpenCV, 
                and cloud-native architectures using AWS services like Lambda, SQS, and EC2.
              </p>
              
              <p className="text-lg font-body text-gray-600 dark:text-gray-300 leading-relaxed">
                My research background includes published work on steganography and computer vision, with papers 
                presented at IEEE conferences. I'm passionate about solving complex problems through innovative 
                technology solutions and continuous learning in the rapidly evolving field of AI.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-[#08080c] to-black text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6">
                Let's Work Together
              </h2>
              <p className="text-xl font-body mb-12 text-gray-300 max-w-2xl mx-auto">
                I'm always excited to take on new challenges and collaborate on 
                innovative AI-powered projects that push the boundaries of what's possible.
              </p>
              <a
                href="/projects"
                className="inline-block px-10 py-4 bg-blue-600 text-white font-body font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
