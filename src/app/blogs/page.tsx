import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { breadcrumbs, ids } from "@/lib/schema";
import { abs } from "@/lib/site";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { formatDate, posts } from "@/lib/posts";
import { reveal } from "@/lib/reveal";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description:
    "Writing by Sahil Gangurde: product launches like AgentDiff, engineering deep dives on AI and audio compression, fintech, and essays.",
  path: "/blogs",
});

const structured = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${abs("/blogs")}#blog`,
    url: abs("/blogs"),
    name: "Sahil Gangurde's blog",
    author: { "@id": ids.person },
    publisher: { "@id": ids.person },
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: abs(p.href), datePublished: p.date })),
  },
  breadcrumbs([{ name: "Blog", path: "/blogs" }]),
];

// One quiet list, newest first: date, title and a one-line summary. Hovering a post dims
// the others, as on the homepage.
export default function BlogsPage() {
  return (
    <PageShell
      active="/blogs"
      eyebrow="Blogs"
      title={
        <>
          Writing. <span className="text-fg/40">Now and then.</span>
        </>
      }
      intro={<p>Product launches, engineering deep dives, and the odd essay on people and politics.</p>}
    >
      <JsonLd data={structured} />
      <ul {...reveal(320)} className="group/list border-t border-line">
        {posts.map((p) => (
          <li
            key={p.href}
            className="border-b border-line transition-opacity duration-500 group-hover/list:opacity-35 hover:opacity-100! has-[:focus-visible]:opacity-100!"
          >
            <Link
              href={p.href}
              className="group grid gap-x-10 gap-y-2 py-9 outline-none sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:py-11"
            >
              <span className="tabular text-sm text-muted sm:pt-2">
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                <span className="mt-1 block text-fg/40 max-sm:inline max-sm:before:mx-2 max-sm:before:content-['·']">{p.category}</span>
              </span>
              <span className="min-w-0">
                <span className="block max-w-3xl font-display text-[1.6rem] leading-[1.2] sm:text-[2rem]">
                  {p.title}
                </span>
                <span className="mt-3 line-clamp-2 block max-w-[62ch] text-[15px] leading-[1.65] text-muted">{p.description}</span>
              </span>
              <span
                aria-hidden
                className="hidden h-10 w-10 place-items-center rounded-full text-fg/45 ring-1 ring-fg/15 transition-[background-color,color,box-shadow] duration-300 group-hover:bg-fg group-hover:text-ink group-hover:ring-fg group-focus-visible:bg-fg group-focus-visible:text-ink sm:mt-1 sm:grid"
              >
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 group-focus-visible:rotate-45" strokeWidth={1.75} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
