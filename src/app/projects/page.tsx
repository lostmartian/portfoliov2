import { githubProjects } from "@/data/github-projects";
import { Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source & Technical Projects | Sahil Gangurde",
  description:
    "An archive of experimental systems, open-source modules, and technical research in AI engineering, backend pipelines, and distributed systems by Sahil Gangurde.",
  alternates: {
    canonical: "https://lostmartian.in/projects",
  },
  keywords: [
    "Open Source Projects",
    "GitHub Projects",
    "AI Engineering",
    "Backend Systems",
    "Software Architecture",
    "Sahil Gangurde",
    "lostmartian",
  ],
  openGraph: {
    title: "Open Source & Technical Projects | Sahil Gangurde",
    description:
      "An archive of experimental systems, open-source modules, and technical research in AI engineering, backend pipelines, and distributed systems by Sahil Gangurde.",
    url: "https://lostmartian.in/projects",
    siteName: "Sahil Gangurde | lostmartian",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://lostmartian.in/projects/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Projects | Sahil Gangurde",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source & Technical Projects | Sahil Gangurde",
    description:
      "An archive of experimental systems, open-source modules, and technical research by Sahil Gangurde.",
    creator: "@lost_martian_",
    site: "@lost_martian_",
    images: ["https://lostmartian.in/projects/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Open Source & Technical Projects | Sahil Gangurde",
    description:
      "An archive of experimental systems, open-source modules, and technical research by Sahil Gangurde.",
    url: "https://lostmartian.in/projects",
    author: {
      "@type": "Person",
      name: "Sahil Gangurde",
      url: "https://lostmartian.in",
    },
  };

  return (
    <main className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-1">
        <h1 className="text-[1.75rem] sm:text-[2.4rem] font-bold tracking-tight leading-tight text-foreground">
          Open source, experiments and research.
        </h1>
        <p className="text-[15px] text-foreground/75 leading-relaxed">
          An archive of experimental systems, open-source modules, and technical research.
        </p>
      </header>

      <div className="divide-y divide-border/60 border-y border-border/60">
        {githubProjects.map((project, i) => (
          <div key={i} className="py-5 group">
            {/* Line 1: Title and Year */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] font-semibold text-foreground group-hover:text-accent transition-colors"
              >
                {project.name} ↗
              </a>
              <span className="text-sm text-foreground/55 tabular-nums">
                {new Date(project.created_at).getFullYear()}
              </span>
            </div>

            {/* Line 2: Description */}
            {project.description && (
              <p className="text-[15px] text-foreground/80 leading-relaxed mt-1">
                {project.description}
              </p>
            )}

            {/* Line 3: Language and Stars */}
            {(project.language || project.stargazers_count > 0) && (
              <div className="flex items-center gap-4 pt-2">
                {project.language && (
                  <span className="text-[13px] text-foreground/55">
                    {project.language}
                  </span>
                )}
                {project.stargazers_count > 0 && (
                  <span className="flex items-center gap-1.5 text-sm text-accent">
                    <Star className="w-3.5 h-3.5 fill-accent/20" />
                    <span>{project.stargazers_count}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
