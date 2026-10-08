import type { Metadata } from "next";
import FarsightStory from "./FarsightStory";

export const metadata: Metadata = {
  title: "Farsight — AI Governance & Intelligence Portal | Omara Technologies | Sahil Gangurde",
  description:
    "The central AI governance and intelligence portal architected by Sahil Gangurde as Founding Full-Stack AI Engineer at Omara Technologies. Features Ground Truth (GT) scoring, Kuhn-Munkres alignment, and Neo4j GraphRAG.",
  alternates: {
    canonical: "https://lostmartian.in/work/farsight",
  },
  keywords: [
    "Sahil Gangurde",
    "Omara Technologies",
    "Omara Technology",
    "Founding Engineer Omara Technologies",
    "Farsight",
    "AI Governance",
    "GraphRAG Neo4j",
    "AI Freelancer",
    "Full-Stack AI Engineer",
    "DocuNexus"
  ],
  openGraph: {
    title: "Farsight — AI Governance Portal | Omara Technologies | Sahil Gangurde",
    description:
      "Architected by Sahil Gangurde as Founding AI Engineer at Omara Technologies.",
    url: "https://lostmartian.in/work/farsight",
    siteName: "Sahil Gangurde Portfolio",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "https://lostmartian.in/work/farsight/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Farsight at Omara Technologies by Sahil Gangurde",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farsight — AI Governance & Intelligence Portal | Sahil Gangurde",
    description:
      "The central governance and intelligence portal orchestrating an enterprise-grade AI data ecosystem.",
    creator: "@lost_martian_",
    site: "@lost_martian_",
    images: ["https://lostmartian.in/work/farsight/opengraph-image"],
  },
};

export default function FarsightPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Farsight — AI Governance & Intelligence Portal",
    description:
      "The central governance and intelligence portal orchestrating an enterprise-grade AI data ecosystem.",
    url: "https://lostmartian.in/work/farsight",
    author: {
      "@type": "Person",
      name: "Sahil Gangurde",
      url: "https://lostmartian.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FarsightStory />
    </>
  );
}
