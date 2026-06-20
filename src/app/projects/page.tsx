import { githubProjects } from "@/data/github-projects";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Projects",
  description: "A collection of my technical projects and open-source contributions.",
};

export default function ProjectsPage() {
  return (
    <div className="w-full">
      <PageHeader 
        title="Technical Projects"
        subtitle="Repository / Archive"
        description="An archive of experimental systems, open-source modules, and technical research."
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-16">
        <div className="space-y-12 sm:space-y-16">
          {githubProjects.map((project, i) => (
            <div key={i} className="group relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold tracking-tight uppercase group-hover:text-shine transition-all duration-300">
                    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                      {project.name}
                    </a>
                  </h2>
                <span className="font-mono text-[10px] text-foreground/50 font-medium">
                  {new Date(project.created_at).getFullYear()}
                </span>
              </div>

              <p className="text-grey-300 text-sm leading-relaxed max-w-2xl">
                {project.description}
              </p>

              <div className="flex items-center gap-6 pt-2">
                {project.language && (
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                      {project.language}
                    </span>
                  </div>
                )}
                {project.stargazers_count > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-foreground/40">★</span>
                    <span className="font-mono text-[10px] text-foreground/40">{project.stargazers_count}</span>
                  </div>
                )}
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors border-b border-transparent hover:border-foreground/20 pb-0.5"
                >
                  Source ↗
                </a>
              </div>
            </div>

            {/* Minimalist Divider */}
            <div className="absolute -bottom-8 left-0 w-full h-px bg-border/50 group-last:hidden" />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
