const steps = [
  {
    id: "01",
    title: "Discovery & Audit",
    description: "Analyzing project goals and identifying technical requirements.",
    content: "The process begins with a thorough discovery phase. I work closely with you to understand the core business objectives and identify the exact technical requirements needed to achieve them. By auditing your existing systems or ideas, I surface potential risks and hidden opportunities."
  },
  {
    id: "02",
    title: "Architecture & Design",
    description: "Designing a robust technical blueprint for the entire system.",
    content: "With the requirements clear, I move into the architecture phase. I design a detailed technical blueprint that focuses on long-term scalability, security, and maintainability. I map out data structures, API interfaces, and system integrations."
  },
  {
    id: "03",
    title: "Engineering & Build",
    description: "Executing the technical build with high-quality, clean code.",
    content: "The engineering phase is where the blueprint comes to life. I write high-quality, production-grade code that prioritizes performance and clarity, using modern frameworks and best practices. I focus on iterative development, delivering functional features."
  },
  {
    id: "04",
    title: "Testing & Optimization",
    description: "Refining the product for peak performance and global scale.",
    content: "The final phase focuses on hardening and optimizing the system. I subject the product to rigorous testing to ensure it can handle heavy user loads with sub-millisecond latency, refining resource usage and tuning database performance."
  }
];

export default function WorkJourney() {
  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
        Methodology
      </h2>
      <p className="text-sm text-foreground/50 mb-8">
        A structured, engineering-first approach to analyzing requirements, designing scale-ready blueprints, and executing high-performance code.
      </p>

      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.id} className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-xs font-mono text-foreground/45">{step.id}</span>
              {step.title}
            </h3>
            <p className="text-sm font-medium text-foreground/75">
              {step.description}
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed">
              {step.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
