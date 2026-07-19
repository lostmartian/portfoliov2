import { getBlogPosts } from "@/lib/blogs";
import BlogList from "@/app/blogs/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "A collection of essays, deep-dives, and reflections on technology, design, and society.",
};

export default function BlogsPage() {
  const posts = getBlogPosts();

  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
          Blogs
        </h1>
        <p className="text-sm text-foreground/50 leading-relaxed font-sans font-light">
          A collection of essays, deep-dives, and reflections on technology, design, and society.
        </p>
      </header>
      
      <section>
        <BlogList initialPosts={posts} />
      </section>
    </main>
  );
}
