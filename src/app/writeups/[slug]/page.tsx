import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleChrome, ArticleSkeleton, ArticleView } from "@/components/blog/Article";
import { pageMeta } from "@/lib/meta";
import { getWriteup, writeups } from "@/lib/posts";

export function generateStaticParams() {
  return writeups.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writeups/[slug]">): Promise<Metadata> {
  const post = getWriteup((await params).slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: post.href,
    type: "article",
    publishedTime: post.date,
    markdown: post.markdown,
    keywords: [post.category, ...post.tags, "Sahil Gangurde", ...post.sections.map((x) => x.label).slice(0, 6)],
  });
}

export default function Writeup({ params }: PageProps<"/writeups/[slug]">) {
  return (
    <ArticleChrome collection="writeups">
      <Suspense fallback={<ArticleSkeleton />}>
        <PostFromParams params={params} />
      </Suspense>
    </ArticleChrome>
  );
}

async function PostFromParams({ params }: Pick<PageProps<"/writeups/[slug]">, "params">) {
  return <ArticleView post={getWriteup((await params).slug)} />;
}
