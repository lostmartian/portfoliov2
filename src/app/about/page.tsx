'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#0a0a0f] dark:via-[#0f0f17] dark:to-[#12121c] mesh-gradient">
      <Header />
      <TableOfContents />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="pt-24 pb-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-2">
              <h1 className="text-5xl md:text-6xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-6">
                About Me
              </h1>
            </div>
          </div>
        </section>

        {/* My Journey Section */}
        <section id="my-journey" className="pt-8 pb-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-8">
              My Journey
            </h2>
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg md:text-xl font-body text-gray-700 dark:text-gray-200 leading-relaxed text-justify">
                  My journey in technology began at the{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Indian Institute of Information Technology, Gwalior
                  </span>
                  , where I pursued an integrated{" "}
                  <span className="font-semibold">
                    B.Tech & M.Tech in Information Technology
                  </span>{" "}
                  from{" "}
                  <span className="font-semibold">July 2019 to July 2024</span>.
                  During my five years of study, I developed a deep passion for
                  artificial intelligence, machine learning, and computer vision
                  applications.
                </p>

                <p className="text-lg md:text-xl font-body text-gray-700 dark:text-gray-200 leading-relaxed text-justify">
                  My academic research focused on cutting-edge computer vision
                  and machine learning techniques. For my{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Master's Thesis
                  </span>
                  , I worked on{" "}
                  <span className="font-semibold">
                    "Enhancing Design Parameters and Efficient Mode Recognition
                    of Cylindrical DRA using ML"
                  </span>
                  , exploring the intersection of machine learning and antenna
                  design. My{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Bachelor's Thesis
                  </span>{" "}
                  involved developing a novel{" "}
                  <span className="font-semibold">
                    "Building and Road Segmentation using EffUNet and Transfer
                    Learning Approach"
                  </span>
                  , where I created an innovative architecture combining
                  EfficientNetV2 as an encoder with a UNet decoder, achieving
                  benchmark mIOU scores of 0.8365 and 0.9153.
                </p>

                <p className="text-lg md:text-xl font-body text-gray-700 dark:text-gray-200 leading-relaxed text-justify">
                  Since <span className="font-semibold">October 2024</span>,
                  I've been working as a{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Founding Full-Stack AI Engineer
                  </span>{" "}
                  at a{" "}
                  <span className="font-semibold">
                    stealth-mode AI tech startup
                  </span>
                  , where I've had the unique opportunity to build AI-powered
                  solutions from the ground up. As the sole engineer for this
                  function, I independently engineer and deploy solutions
                  leveraging <span className="font-semibold">LLMs</span>,
                  computer vision with{" "}
                  <span className="font-semibold">OpenCV</span>, and{" "}
                  <span className="font-semibold">AWS cloud services</span>{" "}
                  (Lambda, SQS, EC2). I've developed proprietary multi-role data
                  labeling platforms, engineered full-stack applications using
                  Next.js, Go, Python, PostgreSQL, and MongoDB, and built
                  complex ML pipelines for image digitization.
                </p>

                <p className="text-lg md:text-xl font-body text-gray-700 dark:text-gray-200 leading-relaxed text-justify">
                  My research contributions include published work on
                  steganography and computer vision. I co-authored a paper on{" "}
                  <span className="font-semibold">
                    "LSB Steganography Using Pixel Locator Sequence with AES"
                  </span>{" "}
                  which was presented at{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    IEEE ICSCCC'21, NITJ
                  </span>
                  , showcasing significant improvements in steganography
                  security through innovative techniques using Pixel Locator
                  Sequences and AES encryption.
                </p>

                <p className="text-lg md:text-xl font-body text-gray-700 dark:text-gray-200 leading-relaxed text-justify">
                  I'm passionate about solving complex problems through
                  innovative technology solutions and continuous learning in the
                  rapidly evolving field of AI. My expertise spans from
                  low-level system design to high-level AI/ML applications, and
                  I'm always excited to push the boundaries of what's possible
                  with cutting-edge technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Coding Profiles Section */}
        <section id="coding-profiles" className="py-12 relative">
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
                  className="block glass-card rounded-2xl p-6 group"
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex-1">
                      <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {profile.platform}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-body font-medium text-sm mb-2">
                        {profile.rating}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-body text-sm">
                        {profile.description}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 transition-all shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section id="technical-skills" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900 dark:text-gray-100 mb-6">
                Technical Skills
              </h2>
              <p className="text-xl font-body text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive expertise across AI/ML, full-stack development,
                and cloud technologies
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsWithIcons.map((category, idx) => {
                const CategoryIcon = category.icon;
                return (
                  <div key={idx} className="glass-card rounded-3xl p-6 group">
                    {/* Category Header */}
                    <div className="flex items-center space-x-3 mb-6 relative z-10">
                      <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 edge-glow">
                        <CategoryIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-gray-100">
                        {category.category}
                      </h3>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-2 mt-1 relative z-10">
                      {category.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="py-2 px-3 rounded-lg glass hover:scale-105 transition-all duration-200"
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

        {/* CTA Section */}
        <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900">
          <div className="absolute inset-0 mesh-gradient opacity-30"></div>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="frosted-glass rounded-3xl p-12 md:p-16 edge-glow">
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-gray-900 dark:text-white">
                Let's Work Together
              </h2>
              <p className="text-xl font-body mb-12 text-gray-700 dark:text-white/90 max-w-2xl mx-auto">
                I'm always excited to take on new challenges and collaborate on
                innovative AI-powered projects that push the boundaries of
                what's possible.
              </p>
              <a
                href="/projects"
                className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-body font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/50 hover:from-indigo-600 hover:to-purple-600"
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
