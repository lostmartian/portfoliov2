import { getBlogPosts } from "@/lib/blogs";
import { projects } from "@/data/projects";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lostmartian.in";

  // Dynamic blog post routes
  const posts = getBlogPosts();
  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic work detail routes
  const workUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Static routes (no /about or /contact — those pages were removed)
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: baseUrl,                   priority: 1.0,  changeFrequency: "weekly" },
      { url: `${baseUrl}/blogs`,        priority: 0.9,  changeFrequency: "weekly" },
      { url: `${baseUrl}/work`,         priority: 0.8,  changeFrequency: "monthly" },
      { url: `${baseUrl}/projects`,     priority: 0.8,  changeFrequency: "monthly" },
    ] as const
  ).map((r) => ({ ...r, lastModified: new Date() }));

  return [...staticRoutes, ...blogUrls, ...workUrls];
}
