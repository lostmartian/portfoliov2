import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { WriteupIndex } from "@/components/blog/WriteupIndex";
import { pageMeta } from "@/lib/meta";
import { formatDate, writeups } from "@/lib/posts";
import { reveal } from "@/lib/reveal";
import { breadcrumbs, ids } from "@/lib/schema";
import { abs } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Technical writeups",
  description:
    "Tutorials and explanations by Sahil Gangurde: how systems, AI and backend tools work, step by step, with code, diagrams and real numbers.",
  path: "/writeups",
  keywords: ["technical writeups", "tutorials", "system design", "AI engineering", "backend engineering", "Sahil Gangurde"],
});

const structured = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${abs("/writeups")}#writeups`,
    url: abs("/writeups"),
    name: "Technical writeups by Sahil Gangurde",
    author: { "@id": ids.person },
    publisher: { "@id": ids.person },
    blogPost: writeups.map((p) => ({ "@type": "TechArticle", headline: p.title, url: abs(p.href), datePublished: p.date })),
  },
  breadcrumbs([{ name: "Writeups", path: "/writeups" }]),
];

// Tutorials and explanations, kept apart from the blog's launches and essays.
export default function WriteupsPage() {
  return (
    <PageShell
      active="/writeups"
      compact
      eyebrow="Writeups"
      title={
        <>
          Technical writeups. <span className="text-fg/40 max-sm:hidden">How things actually work.</span>
        </>
      }
      intro={
        <p>
          Tutorials and explanations with code and real numbers. For launches and essays, see the{" "}
          <Link href="/blogs" className="font-semibold text-fg transition-opacity hover:opacity-60">
            blog
          </Link>
          .
        </p>
      }
    >
      <JsonLd data={structured} />
      <div {...reveal(200)}>
        <WriteupIndex
          items={writeups.map((p) => ({
            href: p.href,
            title: p.title,
            description: p.description,
            category: p.category,
            tags: p.tags,
            date: p.date,
            dateLabel: formatDate(p.date),
            minutes: p.minutes,
          }))}
        />
      </div>
    </PageShell>
  );
}
