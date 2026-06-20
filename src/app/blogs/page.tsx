import { getBlogPosts } from "@/lib/blogs";
import PageHeader from "@/components/PageHeader";
import SteelBackground from "@/components/SteelBackground";
import BlogList from "@/app/blogs/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "A collection of thoughts, tutorials, and deep-dives into software engineering and design.",
};

export default function BlogsPage() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen bg-background pb-32">
      <SteelBackground />
      
      <PageHeader 
        title="Blogs" 
        subtitle="Journal"
        description="A collection of thoughts, tutorials, and deep-dives into software engineering and design."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-16">
        <BlogList initialPosts={posts} />
      </section>
    </main>
  );
}
