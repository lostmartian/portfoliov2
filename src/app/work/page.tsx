import { projects } from "@/data/projects";
import PageHeader from "@/components/ui/PageHeader";
import CaseStack from "@/components/case/CaseStack";
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader mr="काम" label="Work" title={<>Client systems, <span className="serif text-accent">built to hold.</span></>}>
        Two systems, two very different problems. Each one is told as a story: who it was for, what was at stake, and what I built.
      </PageHeader>

      <CaseStack projects={projects} />
    </div>
  );
}
