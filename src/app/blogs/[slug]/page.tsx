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

  return (
    <main className="space-y-6 font-sans">
      <div className="space-y-4">
        <Link 
          href="/blogs" 
          className="text-xs font-mono text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          ← Return to Blogs
        </Link>

        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>
          <p className="text-sm text-foreground/50 leading-relaxed font-sans font-light">
            {post.description}
          </p>
        </header>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-border/40 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Published</span>
            <span className="text-foreground/80 font-medium">{post.date}</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Read Time</span>
            <span className="text-foreground/80 font-medium">{post.readTime}</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/40 uppercase tracking-wider block">Categories</span>
            <span className="text-foreground/80 font-medium">{post.categories.join(", ")}</span>
          </div>
        </div>
      </div>

      <article className="pt-4">
        <BlogPostContent content={post.content} />
      </article>
    </main>
  );
}
