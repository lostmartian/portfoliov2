import { formatDate, getPost, posts } from "@/lib/posts";
import { NAME, abs } from "@/lib/site";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

// Each post as plain Markdown at /blogs/md/<slug>.md, a real file in the static export,
// for AI agents and anyone who wants the text without the page around it.
export function generateStaticParams() {
  return posts.map((p) => ({ file: `${p.slug}.md` }));
}

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const post = getPost((await params).file.replace(/\.md$/, ""));
  if (!post) return new Response("Not found", { status: 404 });
  const md = [
    `# ${post.title}`,
    "",
    `By ${NAME} · ${formatDate(post.date)} · ${post.category} · ${post.minutes} min read`,
    `Source: ${abs(post.href)}`,
    "",
    `> ${post.description}`,
    "",
    post.body.trim(),
    "",
  ].join("\n");
  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
