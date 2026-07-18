import { projects } from "@/data/projects";
import Link from "next/link";

export const metadata = {
  title: "Work",
  description: "A showcase of my professional experience and client projects.",
};

export default function WorkPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
          Work
        </h1>
        <p className="text-sm text-foreground/50 leading-relaxed font-sans font-light">
          A curation of systems built for global clients.
        </p>
      </header>

      <div className="space-y-5 text-sm text-foreground/80 font-sans">
        {projects.map((project, i) => (
          <div key={project.slug} className="flex items-start gap-2">
            <span className="text-xs font-mono text-foreground/30 mt-1">•</span>
            <div className="flex-grow space-y-1">
              {/* Line 1: Title and Duration */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <Link href={`/work/${project.slug}`} className="font-semibold text-foreground hover:underline">
                  {project.title} ↗
                </Link>
                <span className="text-xs text-foreground/40 font-mono">
                  {project.duration}
                </span>
              </div>

              {/* Line 2: Description */}
              {project.description && (
                <p className="text-foreground/70 font-light text-sm leading-relaxed">
                  {project.description}
                </p>
              )}

              {/* Line 3: Tech Stack tags */}
              {project.stack && project.stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-foreground/[0.04] text-foreground/50 border border-border/10 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
