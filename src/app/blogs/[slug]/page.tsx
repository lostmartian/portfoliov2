import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogPostContent from "./BlogPostContent";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested article does not exist.",
    };
  }

  const postUrl = `https://lostmartian.in/blogs/${slug}`;
  const ogImageUrl = `https://lostmartian.in/blogs/${slug}/opengraph-image`;
  const publishedTime = new Date(post.date).toISOString();

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: postUrl,
    },
    keywords: [
      ...post.categories,
      "Sahil Gangurde",
      "lostmartian",
      "Software Engineering",
      "Backend Architecture",
      "AI Engineering",
      "System Design",
    ],
    authors: [
      {
        name: "Sahil Gangurde",
        url: "https://lostmartian.in",
      },
    ],
    creator: "Sahil Gangurde",
    publisher: "Sahil Gangurde",
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: "Sahil Gangurde | lostmartian",
      locale: "en_US",
      type: "article",
      publishedTime,
      modifiedTime: publishedTime,
      authors: ["https://lostmartian.in", "https://linkedin.com/in/lostmartian"],
      tags: post.categories,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@lost_martian_",
      site: "@lost_martian_",
      images: [ogImageUrl],
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
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://lostmartian.in/blogs/${slug}`;
  const ogImageUrl = `https://lostmartian.in/blogs/${slug}/opengraph-image`;
  const publishedDateIso = new Date(post.date).toISOString();

  // JSON-LD Structured Data for Google Rich Snippets (BlogPosting Schema)
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: publishedDateIso,
    dateModified: publishedDateIso,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    image: ogImageUrl,
    author: {
      "@type": "Person",
      name: "Sahil Gangurde",
      url: "https://lostmartian.in",
      sameAs: [
        "https://github.com/lostmartian",
        "https://linkedin.com/in/lostmartian",
        "https://twitter.com/lost_martian_",
      ],
      jobTitle: "Freelance Full-Stack AI & Backend Engineer",
    },
    publisher: {
      "@type": "Person",
      name: "Sahil Gangurde",
      url: "https://lostmartian.in",
    },
    keywords: post.categories.join(", "),
    articleSection: post.categories[0] || "Technology",
  };

  // BreadcrumbList Structured Data for Google Search Hierarchy
  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://lostmartian.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://lostmartian.in/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  // Find other posts in the same series
  let seriesPosts: { slug: string; title: string; part?: number }[] = [];
  if (post.seriesName) {
    seriesPosts = getBlogPosts()
      .filter((p) => p.seriesName === post.seriesName)
      .sort((a, b) => (a.seriesPart || 0) - (b.seriesPart || 0))
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        part: p.seriesPart,
      }));
  }

  return (
    <main className="space-y-6 font-sans">
      {/* Google Structured Data / JSON-LD Script Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      <div className="space-y-4">
        <Link
          href="/blogs"
          className="text-xs font-mono text-foreground/70 hover:text-accent transition-colors flex items-center gap-1.5"
        >
          ← Return to Blogs
        </Link>
      </div>

      <article className="pt-4">
        <BlogPostContent
          content={post.content}
          title={post.title}
          description={post.description}
          date={post.date}
          readTime={post.readTime}
          categories={post.categories}
          slug={slug}
          seriesName={post.seriesName}
          seriesPosts={seriesPosts}
          headerImage={post.headerImage}
          headerImageCaption={post.headerImageCaption}
        />
      </article>
    </main>
  );
}
