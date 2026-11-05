import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { posts } from "@/lib/posts";
import { abs } from "@/lib/site";
import { videos } from "@/lib/videos";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = posts[0]?.date;
  return [
    { url: abs("/"), changeFrequency: "weekly", priority: 1 },
    { url: abs("/about"), changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/services"), changeFrequency: "monthly", priority: 0.9 },
    ...caseStudies.map((c) => ({ url: abs(c.href), changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: abs("/blogs"), lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/videos"), lastModified: videos[0]?.date.slice(0, 10), changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({ url: abs(p.href), lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
