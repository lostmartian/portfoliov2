import { projects } from "@/data/projects";
import WorkCard from "./WorkCard";

export default function SelectedWork() {
  return (
    <section id="work" className="relative w-full py-24 transition-colors duration-300">
      {/* Structural Background */}
      <div className="absolute inset-0 grid-subtle opacity-[0.15] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />

      {/* Ledger Headers */}
      <div className="max-w-7xl mx-auto mb-12 space-y-4 px-8 sm:px-16">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse" />
          <p className="text-technical">System / Selected_Outputs</p>
        </div>
        <h2 className="text-5xl font-bold tracking-tighter uppercase sm:text-7xl">
          Selected <span className="text-shine">Work</span>
        </h2>
        <p className="text-grey-300 text-sm font-mono uppercase tracking-widest">
          2024 — PRESENT
        </p>
      </div>


      {/* The Grid / Ledger */}
      <div className="relative flex flex-col">
        {projects.map((project, i) => (
          <div key={i} className="relative group">
            <div className="ledger-line opacity-40 group-first:hidden" />
            <WorkCard project={project} i={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
