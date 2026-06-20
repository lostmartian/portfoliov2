import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogs";
import { notFound } from "next/navigation";
import SteelBackground from "@/components/SteelBackground";
import AbstractFlowBackground from "@/components/AbstractFlowBackground";
import Link from "next/link";
import BlogPostContent from "./BlogPostContent";

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
    <main className="min-h-screen bg-background pb-32">
      <SteelBackground />

      <div className="relative pt-28 sm:pt-44 pb-6 sm:pb-12 border-b border-border/20 mb-6 sm:mb-12 overflow-hidden">
        <AbstractFlowBackground title={post.title} description={post.description} categories={post.categories} speed={0} />
        <div className="absolute inset-0 bg-background/10 dark:bg-background/10 backdrop-blur-[1px] z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-16 relative z-10">
          <Link 
            href="/blogs" 
            className="text-[10px] font-mono text-foreground/70 font-bold uppercase tracking-[0.3em] hover:text-foreground transition-colors flex items-center gap-3 mb-6 sm:mb-12"
          >
            ← Return_To_Archive
          </Link>

          <div className="flex flex-col gap-4 sm:gap-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-12 sm:gap-y-6 text-[10px] font-mono border-b border-border/10 pb-4 sm:pb-8 mb-2 sm:mb-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-foreground/50 uppercase tracking-[0.2em] font-bold">Categories</span>
                <div className="flex gap-2">
                  {post.categories.map((cat, i) => (
                    <span key={cat} className="text-foreground/90 font-bold">
                      {cat}{i < post.categories.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-foreground/50 uppercase tracking-[0.2em] font-bold">Read Time</span>
                <span className="text-foreground/90 font-bold">{post.readTime}</span>
              </div>
              <div className="flex flex-col gap-1.5 ml-auto text-right">
                <span className="text-foreground/50 uppercase tracking-[0.2em] font-bold">Archived On</span>
                <span className="text-foreground/90 uppercase font-bold">{post.date}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif text-foreground tracking-tight leading-[1.05] max-w-5xl">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl leading-relaxed font-normal font-sans">
              {post.description}
            </p>
          </div>
        </div>
      </div>

      {/* Post Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-16">
        <BlogPostContent content={post.content} />
      </section>
    </main>
  );
}
