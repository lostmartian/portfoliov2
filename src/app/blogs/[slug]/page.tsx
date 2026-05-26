import { getBlogPostBySlug, getBlogPosts } from "@/lib/blogs";
import { notFound } from "next/navigation";
import SteelBackground from "@/components/SteelBackground";
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

      {/* Post Header */}
      <div className="relative pt-32 pb-12 border-b border-border/20 mb-12">
        <div className="max-w-7xl mx-auto px-8 sm:px-16">
          <Link 
            href="/blogs" 
            className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.3em] hover:text-foreground transition-colors flex items-center gap-3 mb-12"
          >
            ← Return_To_Archive
          </Link>

          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-[10px] font-mono border-b border-border/10 pb-8 mb-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-foreground/30 uppercase tracking-[0.2em]">Categories</span>
                <div className="flex gap-2">
                  {post.categories.map((cat, i) => (
                    <span key={cat} className="text-foreground/70 font-medium">
                      {cat}{i < post.categories.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-foreground/30 uppercase tracking-[0.2em]">Read Time</span>
                <span className="text-foreground/70 font-medium">{post.readTime}</span>
              </div>
              <div className="flex flex-col gap-1.5 ml-auto">
                <span className="text-foreground/30 uppercase tracking-[0.2em]">Archived On</span>
                <span className="text-foreground/70 uppercase font-medium">{post.date}</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground tracking-tight leading-[0.95] max-w-5xl">
              {post.title}
            </h1>

            <p className="text-xl sm:text-2xl text-foreground/60 max-w-3xl leading-relaxed font-light italic">
              {post.description}
            </p>
          </div>
        </div>
      </div>

      {/* Post Body */}
      <section className="max-w-7xl mx-auto px-8 sm:px-16">
        <BlogPostContent content={post.content} />
      </section>
    </main>
  );
}
