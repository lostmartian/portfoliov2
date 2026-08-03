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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Technical Projects
        </h1>
        <p className="text-sm text-foreground/75 leading-relaxed font-sans">
          An archive of experimental systems, open-source modules, and technical research.
        </p>
      </header>
      
      <div className="space-y-5 text-sm text-foreground/80 font-sans">
        {githubProjects.map((project, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-xs font-sans text-accent/60 mt-1">•</span>
            <div className="flex-grow space-y-1">
              {/* Line 1: Title and Year */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-accent hover:underline">
                  {project.name} ↗
                </a>
                <span className="text-xs text-foreground/40 font-mono">
                  {new Date(project.created_at).getFullYear()}
                </span>
              </div>

              {/* Line 2: Description */}
              {project.description && (
                <p className="text-foreground/90 text-sm leading-relaxed">
                  {project.description}
                </p>
              )}

              {/* Line 3: Language and Stars */}
              {(project.language || project.stargazers_count > 0) && (
                <div className="flex items-center gap-4 text-[10px] font-sans font-semibold pt-1">
                  {project.language && (
                    <span className="text-accent uppercase tracking-wider bg-accent/5 px-2 py-0.5 border border-accent/15 rounded">
                      {project.language}
                    </span>
                  )}
                  {project.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-accent">
                      <Star className="w-3.5 h-3.5 text-accent/80 fill-accent/10" />
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
