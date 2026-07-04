import { getBlogPosts } from "@/lib/blogs";
import { projects } from "@/data/projects";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lostmartian.in"; // Production base URL

  // Dynamic blog routes
  const posts = getBlogPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  // Dynamic work routes
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  // Static routes
  const routes = ["", "/about", "/contact", "/blogs", "/projects", "/work"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogUrls, ...projectUrls];
}
