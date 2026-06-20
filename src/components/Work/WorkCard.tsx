import { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface WorkCardProps {
  project: Project;
  i: number;
}

export default function WorkCard({ project, i }: WorkCardProps) {
  return (
    <div id={project.slug} className="group relative w-full py-8 md:py-12 border-b border-border/10 hover:bg-foreground/[0.01] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* 1. Archive Identity (Index & Thumbnail) */}
        <div className="lg:col-span-3 flex items-start gap-8">
          <div className="text-[10px] font-mono text-foreground/20 font-black pt-1">
            0{i + 1}
          </div>
          <div className="flex-1 aspect-[16/10] bg-grey-900 overflow-hidden border border-border/20 group-hover:border-foreground/20 transition-all duration-700 relative rounded-sm">
            {project.image ? (
              <Image 
                src={project.image} 
                alt={project.title}
                fill
                className="object-cover opacity-40 group-hover:opacity-80 transition-all duration-700 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center bg-background/50">
                <div className="text-[8px] font-mono opacity-20 uppercase tracking-widest text-center px-4">Null_Media_Asset</div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Narrative Engine (Title, Description, Stack) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <Link 
              href={`/work/${project.slug}`}
              className="group/title inline-flex items-center gap-4 text-3xl md:text-4xl font-medium tracking-tight text-foreground hover:text-foreground/80 transition-all duration-300"
            >
              {project.title}
              <ArrowUpRight className="w-5 h-5 opacity-10 group-hover/title:opacity-100 group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all duration-500" />
            </Link>
            <div className="text-[9px] font-mono text-foreground/30 uppercase tracking-[0.3em]">
              Category // {project.category}
            </div>
          </div>
          
          <p className="text-foreground/50 text-sm font-light leading-relaxed max-w-xl tracking-tight">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack?.map((tech) => (
              <span key={tech} className="text-[9px] font-mono text-foreground/40 bg-foreground/[0.02] px-2 py-1 border border-border/10 rounded-xs uppercase tracking-tighter">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Registry Meta (Timeline & Partner) */}
        <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-10 pt-1 text-left lg:text-right">
          <div className="space-y-2">
            <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.2em] font-bold">Timeline</p>
            <p className="text-sm font-mono text-foreground/70 uppercase tracking-tighter">{project.duration}</p>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.2em] font-bold">Collaboration</p>
            {project.clients && project.clients[0] ? (
              <div className="flex items-center lg:justify-end gap-1.5">
                {project.clients[0].link ? (
                  <a 
                    href={project.clients[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/org flex items-center gap-1 text-sm font-black text-foreground/80 hover:text-foreground transition-colors uppercase tracking-tight"
                  >
                    <span>{project.clients[0].name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-30 group-hover/org:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <span className="text-sm font-black text-foreground/80 uppercase tracking-tight">{project.clients[0].name}</span>
                )}
              </div>
            ) : (
              <span className="text-sm font-black text-foreground/30 uppercase tracking-tight italic">Independent_R&D</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
