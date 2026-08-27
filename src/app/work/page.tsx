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
    <main className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-1">
        <h1 className="text-[1.75rem] sm:text-[2.4rem] font-bold tracking-tight leading-tight text-foreground">
          Client systems, built to hold.
        </h1>
        <p className="text-[15px] text-foreground/75 leading-relaxed">
          A curation of high-throughput systems and distributed architectures built for global clients.
        </p>
      </header>

      <div className="divide-y divide-border/60 border-y border-border/60">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group block py-5 transition-colors"
          >
            {/* Line 1: Index + Title and Duration */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="flex items-baseline gap-3 min-w-0">
                <span className="text-xs font-semibold text-accent/70 tabular-nums shrink-0 group-hover:text-accent transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[17px] font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                  {project.title} ↗
                </span>
              </span>
              <span className="text-sm text-foreground/55 tabular-nums shrink-0">
                {project.duration}
              </span>
            </div>

            {/* Line 2: Description */}
            {project.description && (
              <p className="text-[15px] text-foreground/80 leading-relaxed mt-1 sm:pl-8">
                {project.description}
              </p>
            )}

            {/* Line 3: Tech Stack tags */}
            {project.stack && project.stack.length > 0 && (
              <div className="flex flex-wrap gap-x-3 gap-y-1 pt-2 sm:pl-8">
                <span className="text-[13px] text-foreground/45">
                  {project.stack.join(" · ")}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
