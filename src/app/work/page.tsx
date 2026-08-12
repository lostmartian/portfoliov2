import { projects } from "@/data/projects";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Systems & Architecture Portfolio | Sahil Gangurde",
  description:
    "A curation of high-throughput financial settlement engines, GraphRAG platforms, and distributed systems built for global clients by Sahil Gangurde.",
  alternates: {
    canonical: "https://lostmartian.in/work",
  },
  keywords: [
    "Software Portfolio",
    "Client Engineering",
    "High Throughput Systems",
    "Financial Settlement",
    "GraphRAG",
    "Sahil Gangurde",
    "lostmartian",
  ],
  openGraph: {
    title: "Client Systems & Architecture Portfolio | Sahil Gangurde",
    description:
      "A curation of high-throughput financial settlement engines, GraphRAG platforms, and distributed systems built for global clients by Sahil Gangurde.",
    url: "https://lostmartian.in/work",
    siteName: "Sahil Gangurde | lostmartian",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://lostmartian.in/work/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Work | Sahil Gangurde",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Systems & Architecture Portfolio | Sahil Gangurde",
    description:
      "A curation of high-throughput systems and distributed architectures built for global clients by Sahil Gangurde.",
    creator: "@lost_martian_",
    site: "@lost_martian_",
    images: ["https://lostmartian.in/work/opengraph-image"],
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

export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Client Systems & Architecture Portfolio | Sahil Gangurde",
    description:
      "A curation of high-throughput systems and distributed architectures built for global clients by Sahil Gangurde.",
    url: "https://lostmartian.in/work",
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Work
        </h1>
        <p className="text-sm text-foreground/75 leading-relaxed font-sans">
          A curation of systems built for global clients.
        </p>
      </header>

      <div className="space-y-5 text-sm text-foreground/80 font-sans">
        {projects.map((project) => (
          <div key={project.slug} className="flex items-start gap-2">
            <span className="text-xs font-sans text-accent/60 mt-1">•</span>
            <div className="flex-grow space-y-1">
              {/* Line 1: Title and Duration */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <Link
                  href={`/work/${project.slug}`}
                  className="font-semibold text-foreground hover:text-accent hover:underline"
                >
                  {project.title} ↗
                </Link>
                <span className="text-xs text-foreground/40 font-mono">
                  {project.duration}
                </span>
              </div>

              {/* Line 2: Description */}
              {project.description && (
                <p className="text-foreground/90 text-sm leading-relaxed">
                  {project.description}
                </p>
              )}

              {/* Line 3: Tech Stack tags */}
              {project.stack && project.stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[9px] font-sans font-semibold rounded bg-accent/5 text-accent border border-accent/15 uppercase"
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
