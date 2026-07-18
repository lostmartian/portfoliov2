import { githubProjects } from "@/data/github-projects";
import { Star } from "lucide-react";

export const metadata = {
  title: "Projects",
  description: "A collection of my technical projects and open-source contributions.",
};

export default function ProjectsPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
          Technical Projects
        </h1>
        <p className="text-sm text-foreground/50 leading-relaxed font-sans font-light">
          An archive of experimental systems, open-source modules, and technical research.
        </p>
      </header>
      
      <div className="space-y-5 text-sm text-foreground/80 font-sans">
        {githubProjects.map((project, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-xs font-mono text-foreground/30 mt-1">•</span>
            <div className="flex-grow space-y-1">
              {/* Line 1: Title and Year */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:underline">
                  {project.name} ↗
                </a>
                <span className="text-xs text-foreground/40 font-mono">
                  {new Date(project.created_at).getFullYear()}
                </span>
              </div>

              {/* Line 2: Description */}
              {project.description && (
                <p className="text-foreground/70 font-light text-sm leading-relaxed">
                  {project.description}
                </p>
              )}

              {/* Line 3: Language and Stars */}
              {(project.language || project.stargazers_count > 0) && (
                <div className="flex items-center gap-4 text-xs font-mono pt-1">
                  {project.language && (
                    <span className="text-foreground/50 uppercase tracking-wider bg-foreground/[0.04] px-2 py-0.5 border border-border/10 rounded">
                      {project.language}
                    </span>
                  )}
                  {project.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-foreground/50">
                      <Star className="w-3.5 h-3.5 text-foreground/40" />
                      <span>{project.stargazers_count}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
