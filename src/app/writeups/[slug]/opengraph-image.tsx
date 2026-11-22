import { ogCard } from "@/lib/og";
import { formatDate, getWriteup, writeups } from "@/lib/posts";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Technical writeup by Sahil Gangurde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return writeups.map((p) => ({ slug: p.slug }));
}

// One card per post: its title, category, date and reading time.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getWriteup((await params).slug);
  if (!post) return ogCard({ label: "Writeups", title: "Technical writeups." });
  return ogCard({
    label: `Writeup · ${post.category}`,
    title: post.title,
    summary: `${formatDate(post.date)} · ${post.minutes} min read`,
  });
}
