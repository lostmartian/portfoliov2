import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleChrome, ArticleSkeleton, ArticleView } from "@/components/blog/Article";
import { pageMeta } from "@/lib/meta";
import { getPost, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: post.href,
    type: "article",
    publishedTime: post.date,
    markdown: post.markdown,
    keywords: [post.category, "Sahil Gangurde", ...post.sections.map((x) => x.label).slice(0, 6)],
  });
}

export default function BlogPost({ params }: PageProps<"/blogs/[slug]">) {
  return (
    <ArticleChrome collection="blogs">
      <Suspense fallback={<ArticleSkeleton />}>
        <PostFromParams params={params} />
      </Suspense>
    </ArticleChrome>
  );
}

async function PostFromParams({ params }: Pick<PageProps<"/blogs/[slug]">, "params">) {
  return <ArticleView post={getPost((await params).slug)} />;
}
