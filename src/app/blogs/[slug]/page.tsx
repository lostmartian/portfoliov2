import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogPostContent from "./BlogPostContent";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  return {
    title: post ? post.title : "Blog Post",
    description: post ? post.description : "Blog Post",
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
