import { projects } from "@/data/projects";
import WorkCard from "@/components/Work/WorkCard";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Work | Sahil Gangurde",
  description: "A showcase of my professional experience and client projects.",
};

export default function WorkPage() {
  return (
    <section id="work" className="relative w-full transition-colors duration-300">
      <PageHeader 
        title="Professional Work"
        subtitle="Professional / Records"
        description="A curation of mission-critical systems and high-fidelity interfaces built for global clients."
      />

      <div className="relative flex flex-col">
        {projects.map((project, i) => (
          <WorkCard key={project.slug} project={project} i={i} />
        ))}
      </div>
    </section>
  );
}
