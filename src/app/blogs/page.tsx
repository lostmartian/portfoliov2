import { getBlogPosts } from "@/lib/blogs";
import BlogList from "@/app/blogs/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Essays & Deep Dives | Sahil Gangurde",
  description:
    "Engineering essays, system architecture breakdowns, and reflections on distributed systems, AI pipelines, GraphRAG, and database internals by Sahil Gangurde.",
  alternates: {
    canonical: "https://lostmartian.in/blogs",
  },
  keywords: [
    "Software Engineering Blog",
    "AI Architecture",
    "Distributed Systems",
    "GraphRAG",
    "Database Internals",
    "Go Backend",
    "Python",
    "Sahil Gangurde",
    "lostmartian",
  ],
  openGraph: {
    title: "Technical Essays & Deep Dives | Sahil Gangurde",
    description:
      "Engineering essays, system architecture breakdowns, and reflections on distributed systems, AI pipelines, GraphRAG, and database internals by Sahil Gangurde.",
    url: "https://lostmartian.in/blogs",
    siteName: "Sahil Gangurde | lostmartian",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://lostmartian.in/blogs/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Blogs | Sahil Gangurde",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Essays & Deep Dives | Sahil Gangurde",
    description:
      "Engineering essays, system architecture breakdowns, and reflections on distributed systems, AI pipelines, GraphRAG, and database internals by Sahil Gangurde.",
    creator: "@lost_martian_",
    site: "@lost_martian_",
    images: ["https://lostmartian.in/blogs/opengraph-image"],
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

export default function BlogsPage() {
  const posts = getBlogPosts();

  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Technical Essays & Deep Dives | Sahil Gangurde",
    description:
      "Engineering essays, system architecture breakdowns, and reflections on distributed systems, AI pipelines, GraphRAG, and database internals by Sahil Gangurde.",
    url: "https://lostmartian.in/blogs",
    author: {
      "@type": "Person",
      name: "Sahil Gangurde",
      url: "https://lostmartian.in",
    },
    hasPart: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `https://lostmartian.in/blogs/${p.slug}`,
      datePublished: new Date(p.date).toISOString(),
    })),
  };

  return (
    <main className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <header className="space-y-1">
        <h1 className="text-[1.75rem] sm:text-[2.4rem] font-bold tracking-tight leading-tight text-foreground">
          Writing on systems and craft.
        </h1>
        <p className="text-[15px] text-foreground/75 leading-relaxed">
          A collection of essays, deep-dives, and reflections on technology, design, and society.
        </p>
      </header>

      <section>
        <BlogList initialPosts={posts} />
      </section>
    </main>
  );
}
