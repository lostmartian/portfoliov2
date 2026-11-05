import type { Metadata } from "next";
import { HANDLE, NAME } from "@/lib/site";

/** Per-page metadata. A page's `openGraph` replaces the root one rather than merging, so the
 *  shared fields are repeated here; the title template adds " | Sahil Gangurde". */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  keywords,
  markdown,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  keywords?: string[];
  /** a plain-text twin of the page, e.g. a post's Markdown */
  markdown?: string;
}): Metadata {
  const full = `${title} | ${NAME}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: path,
      // repeated from the root layout, since a page's alternates replace the root's
      types: {
        "text/plain": [{ url: "/llms.txt", title: "Profile for AI assistants (llms.txt)" }],
        "application/rss+xml": [{ url: "/feed.xml", title: `${NAME}'s blog` }],
        ...(markdown ? { "text/markdown": markdown } : {}),
      },
    },
    openGraph: {
      type,
      siteName: `${NAME} (${HANDLE})`,
      locale: "en_IN",
      url: path,
      title: full,
      description,
      ...(type === "article" ? { authors: [NAME], ...(publishedTime ? { publishedTime } : {}) } : {}),
    },
    twitter: { card: "summary_large_image", creator: "@lost_martian_", title: full, description },
  };
}
