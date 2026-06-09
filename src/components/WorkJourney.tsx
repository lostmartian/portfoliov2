"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Discovery & Audit",
    description: "Analyzing project goals and identifying technical requirements.",
    protocol: "Analysis_Protocol_V1",
    status: "Initial_Review",
    content: [
      "The process begins with a thorough discovery phase. I work closely with you to understand the core business objectives and identify the exact technical requirements needed to achieve them.",
      "By auditing your existing systems or ideas, I surface potential risks and hidden opportunities. This ensures we have a clear, realistic roadmap before writing a single line of code.",
      "The result is a comprehensive strategy that translates your high-level vision into actionable technical tasks, ensuring every stakeholder is aligned on the final project goals."
    ]
  },
  {
    id: "02",
    title: "Architecture & Design",
    description: "Designing a robust technical blueprint for the entire system.",
    protocol: "Design_Standard_V2",
    status: "Blueprint_Stage",
    content: [
      "With the requirements clear, I move into the architecture phase. I design a detailed technical blueprint that focuses on long-term scalability, security, and maintainability.",
      "I map out data structures, API interfaces, and system integrations to ensure every component works together seamlessly. This stage is about building a foundation that can grow with your business.",
      "The architectural design serves as a mission-critical guide for the build phase, minimizing technical debt and ensuring the final product is both robust and future-proof."
    ]
  },
  {
    id: "03",
    title: "Engineering & Build",
    description: "Executing the technical build with high-quality, clean code.",
    protocol: "Build_Protocol_V4",
    status: "In_Development",
    content: [
      "The engineering phase is where the blueprint comes to life. I write high-quality, production-grade code that prioritizes performance and clarity, using modern frameworks and best practices.",
      "I focus on iterative development, delivering functional features while maintaining constant communication. This allows us to refine the product based on real-world feedback as we build.",
      "My development process includes continuous testing and integration, ensuring that the codebase remains stable and secure throughout the entire implementation journey."
    ]
  },
  {
    id: "04",
    title: "Testing & Optimization",
    description: "Refining the product for peak performance and global scale.",
    protocol: "Scale_Audit_V1",
    status: "Final_Validation",
    content: [
      "The final phase focuses on hardening and optimizing the system. I subject the product to rigorous testing to ensure it can handle heavy user loads with sub-millisecond latency.",
      "I refine resource usage, tune database performance, and implement advanced caching to make the system as fast and efficient as possible for your global audience.",
      "The journey ends with a fully optimized, production-ready product. I ensure the system is stable, secure, and ready to scale effortlessly as your user base grows."
    ]
  }
];

export default function WorkJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const duration = 15000; // 15 seconds
    const startTime = Date.now();
    
    // Recursive tick function ensures no overlapping executions
    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const currentProgress = (elapsed / duration) * 100;

      if (elapsed >= duration) {
        // Complete the progress and move to the next step
        setProgress(100);
        setActiveStep((current) => (current + 1) % steps.length);
      } else {
        // Update progress and schedule the next tick
        setProgress(currentProgress);
        timeoutId = setTimeout(tick, 50);
      }
    };

    // Initial reset and start
    setProgress(0);
    timeoutId = setTimeout(tick, 50);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeStep]);

  const handleManualSwitch = (index: number) => {
    // Only switch if the user target is different to prevent state flutter
    if (activeStep !== index) {
      setActiveStep(index);
    }
  };


  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        <div className="w-full h-px bg-border/40 mb-10 md:mb-16" />
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-foreground/40 rounded-full" />
            <p className="text-technical tracking-[0.2em]">Methodology / Work_Process</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-foreground/30 uppercase tracking-[0.2em]">
            <span>Cycle_Status: Active</span>
            <span className="w-px h-3 bg-border" />
            <span>Ref: 0x_JOURNEY</span>
          </div>
        </div>

        {/* Section Heading & Copy */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-foreground leading-[1.1]">
            Methodology
          </h2>
          <p className="mt-4 text-foreground/50 font-light text-base sm:text-lg leading-relaxed">
            A structured, engineering-first approach to analyzing requirements, designing scale-ready blueprints, and executing high-performance code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24">
          
          {/* Mobile/Tablet Accordion Layout (visible < lg) */}
          <div className="block lg:hidden w-full space-y-4 col-span-1">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                onClick={() => handleManualSwitch(idx)}
                className={`group relative p-5 sm:p-6 cursor-pointer border transition-all duration-500 rounded-lg ${
                  activeStep === idx ? 'bg-foreground/[0.03] border-border/60' : 'border-border/10 bg-transparent hover:bg-foreground/[0.01]'
                }`}
              >
                {/* Progress Bar for active step */}
                {activeStep === idx && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-foreground/30 rounded-b-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                )}
                
                <div className="flex items-start gap-4">
                  <span className={`text-xs font-mono transition-colors duration-500 mt-0.5 ${
                    activeStep === idx ? 'text-foreground/80' : 'text-foreground/20'
                  }`}>
                    {step.id}
                  </span>
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-500 ${
                      activeStep === idx ? 'text-foreground' : 'text-foreground/40 group-hover:text-foreground/60'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-[11px] mt-1 transition-colors duration-500 ${
                      activeStep === idx ? 'text-foreground/70' : 'text-foreground/30'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Inline Content Accordion */}
                <AnimatePresence initial={false}>
                  {activeStep === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pb-2 space-y-4 border-t border-border/10 mt-5">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-6xl font-serif italic text-foreground/5 leading-none">{step.id}</span>
                          <div className="flex-grow h-px bg-border/20" />
                        </div>
                        {step.content.map((para, i) => (
                          <p 
                            key={i} 
                            className="text-sm sm:text-base font-normal text-foreground/75 leading-relaxed tracking-tight"
                          >
                            {para}
                          </p>
                        ))}
                        
                        {/* Accordion Card Metadata */}
                        <div className="pt-4 border-t border-border/20 flex flex-wrap gap-x-8 gap-y-4">
                          <div className="space-y-0.5">
                            <p className="text-[8px] font-mono text-foreground/20 uppercase tracking-widest">Phase_Key</p>
                            <p className="text-[10px] font-medium text-foreground/60">0x_{step.title.split(' ')[0].toUpperCase()}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[8px] font-mono text-foreground/20 uppercase tracking-widest">Protocol</p>
                            <p className="text-[10px] font-medium text-foreground/60">{step.protocol}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[8px] font-mono text-foreground/20 uppercase tracking-widest">Status</p>
                            <p className="text-[10px] font-medium text-foreground/60">{step.status}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Sidebar (visible >= lg) */}
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                onMouseEnter={() => handleManualSwitch(idx)}
                onClick={() => handleManualSwitch(idx)}
                className={`group relative p-6 cursor-pointer border transition-all duration-500 ${
                  activeStep === idx ? 'bg-foreground/[0.03] border-border/60' : 'border-transparent hover:bg-foreground/[0.01]'
                }`}
              >
                {/* Progress Bar for active step */}
                {activeStep === idx && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-foreground/30"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                )}
                
                <div className="flex items-start gap-4">
                  <span className={`text-xs font-mono transition-colors duration-500 ${
                    activeStep === idx ? 'text-foreground/80' : 'text-foreground/20'
                  }`}>
                    {step.id}
                  </span>
                  <div>
                    <h3 className={`text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-500 ${
                      activeStep === idx ? 'text-foreground' : 'text-foreground/40 group-hover:text-foreground/60'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-[11px] mt-1 transition-colors duration-500 ${
                      activeStep === idx ? 'text-foreground/70' : 'text-foreground/30'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Manifesto Content Area (visible >= lg) */}
          <div className="hidden lg:flex lg:col-span-8 min-h-[650px] flex-col justify-between">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-6 mb-12">
                    <span className="text-8xl font-serif italic text-foreground/5 leading-none">{steps[activeStep].id}</span>
                    <h2 className="text-4xl sm:text-5xl font-serif text-foreground tracking-tight leading-tight">
                      {steps[activeStep].title}
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {steps[activeStep].content.map((para, i) => (
                      <p 
                        key={i} 
                        className="text-lg sm:text-xl font-normal text-foreground/70 leading-relaxed tracking-tight"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Static Metadata Footer - Pinned to bottom using justify-between */}
            <div className="pt-8 border-t border-border/20">
              <div className="flex flex-wrap items-center gap-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Phase_Key</p>
                  <p className="text-xs font-medium text-foreground/60">0x_{steps[activeStep].title.split(' ')[0].toUpperCase()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Protocol</p>
                  <p className="text-xs font-medium text-foreground/60">{steps[activeStep].protocol}</p>
                </div>
                <div className="hidden sm:block space-y-1">
                  <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Status</p>
                  <p className="text-xs font-medium text-foreground/60">{steps[activeStep].status}</p>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </section>
  );
}
