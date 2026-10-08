import { githubProjects } from "@/data/github-projects";
import RepoRegister from "@/components/register/RepoRegister";
import PageHeader, { PageBody } from "@/components/ui/PageHeader";
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader mr="प्रकल्प" label="Projects" title={<>Open source, <span className="serif text-accent">experiments</span> and research.</>}>
        An archive of experimental systems, open-source modules, and technical research.
      </PageHeader>

      <PageBody>
        <RepoRegister repos={githubProjects} />
      </PageBody>
    </div>
  );
}
