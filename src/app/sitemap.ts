import { getBlogPosts } from "@/lib/blogs";
import { projects } from "@/data/projects";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lostmartian.in";

  // Dynamic blog post routes (all weekly)
  const posts = getBlogPosts();
  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic work detail routes (all weekly)
  const workUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Core static routes (all weekly)
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: baseUrl,               priority: 1.0,  changeFrequency: "weekly" },
      { url: `${baseUrl}/blogs`,    priority: 0.9,  changeFrequency: "weekly" },
      { url: `${baseUrl}/work`,     priority: 0.8,  changeFrequency: "weekly" },
      { url: `${baseUrl}/projects`, priority: 0.8,  changeFrequency: "weekly" },
      { url: `${baseUrl}/readlist`, priority: 0.7,  changeFrequency: "weekly" },
    ] as const
  ).map((r) => ({ ...r, lastModified: new Date() }));

  return [...staticRoutes, ...blogUrls, ...workUrls];
}
