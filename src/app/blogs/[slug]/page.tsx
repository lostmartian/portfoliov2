import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/blog/Markdown";
import { label } from "@/components/PageShell";
import { MobileToc, ReadingProgress, Toc } from "@/components/case-study/Toc";
import { SiteNav } from "@/components/SiteNav";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { socials } from "@/lib/data";
import { container } from "@/lib/layout";
import { pageMeta } from "@/lib/meta";
import { formatDate, getPost, posts } from "@/lib/posts";
import { relatedWork } from "@/lib/related";
import { breadcrumbs, ids } from "@/lib/schema";
import { abs } from "@/lib/site";

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

// The frame (nav, footer) doesn't depend on the URL, so it stays in the shared App Shell.
// The post itself reads `params`, so it renders inside Suspense; every post is still
// prerendered at build time from generateStaticParams.
export default function BlogPost({ params }: PageProps<"/blogs/[slug]">) {
  return (
    <>
      <header className={`${container} absolute inset-x-0 top-0 z-20 flex items-center justify-between py-6 text-sm`}>
        <Link href="/" className="font-medium tracking-tight">
          Sahil<span className="max-sm:hidden"> Gangurde</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <SiteNav active="/blogs" />
          <ThemeSwitcher />
        </div>
      </header>

      <Suspense fallback={<PostSkeleton />}>
        <PostFromParams params={params} />
      </Suspense>

      <footer className={container}>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-6 text-[13px] text-muted">
          <span>© 2026 Sahil Gangurde · Pune</span>
          <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-5 gap-y-1">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="transition-colors hover:text-fg">
                {s.label.replace(" / Twitter", "")}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}

async function PostFromParams({ params }: Pick<PageProps<"/blogs/[slug]">, "params">) {
  const { slug } = await params;
  return <PostView slug={slug} />;
}

// Same frame as the case studies: the title starts at the container edge, then a 200px
// section index on the left (desktop) beside the reading column.
const hero = "graphite-fade relative isolate";
const grid = `${container} grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20`;
const heroInner = `${grid} relative z-10 pb-14 pt-32 sm:pb-16 sm:pt-40`;
const column = "min-w-0 max-w-[46rem]";

async function PostView({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) notFound();
  const next = posts[posts.indexOf(post) + 1] ?? posts[0];

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${abs(post.href)}#post`,
      url: abs(post.href),
      mainEntityOfPage: abs(post.href),
      headline: post.title,
      description: post.description,
      image: abs(`${post.href}/opengraph-image`),
      datePublished: post.date,
      dateModified: post.date,
      articleSection: post.category,
      wordCount: post.body.split(/\s+/).length,
      timeRequired: `PT${post.minutes}M`,
      inLanguage: "en",
      author: { "@id": ids.person },
      publisher: { "@id": ids.person },
      isPartOf: { "@id": `${abs("/blogs")}#blog` },
    },
    breadcrumbs([
      { name: "Blog", path: "/blogs" },
      { name: post.title, path: post.href },
    ]),
  ];

  return (
    <>
      <JsonLd data={structured} />
      <ReadingProgress />
      <div className={hero}>
        <div className={heroInner}>
          <div className="max-w-4xl lg:col-span-2">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.75} />
              All posts
            </Link>
            <h1 className="mt-8 font-display text-[2.25rem] leading-[1.06] sm:text-[3.5rem]">
              {post.title}
            </h1>
            <p className={`${label} mt-6 flex flex-wrap items-center gap-x-2 gap-y-1`}>
              <time dateTime={post.date} className="tabular">
                {formatDate(post.date)}
              </time>
              <span aria-hidden className="text-fg/25">·</span>
              {post.category}
              <span aria-hidden className="text-fg/25">·</span>
              {post.minutes} min read
            </p>
          </div>
        </div>
      </div>

      {post.sections.length > 1 && <MobileToc items={post.sections} />}

      <main className={`${grid} pb-24`}>
        <aside className="hidden lg:block">
          {post.sections.length > 1 && <Toc items={post.sections} />}
        </aside>
        <div className={column}>
          <article>
            {post.headerImage && (
              <figure className="mb-12">
                <Image
                  src={post.headerImage.src}
                  width={post.headerImage.width}
                  height={post.headerImage.height}
                  alt={post.headerImageCaption ?? ""}
                  sizes="(min-width: 1024px) 736px, 100vw"
                  priority
                  className="h-auto w-full rounded-2xl ring-1 ring-line"
                />
                {post.headerImageCaption && (
                  <figcaption className="mt-4 text-[13px] leading-relaxed text-muted">{post.headerImageCaption}</figcaption>
                )}
              </figure>
            )}
            <Markdown source={post.body} />
          </article>

          {/* Related work, then a way to hire: every post links back into the site */}
          <aside className="mt-20 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
            {relatedWork(post.slug).map((c) => (
              <div key={c.href}>
                <p className={label}>Related work</p>
                <Link href={c.href} className="group mt-2 inline-flex items-start gap-2 text-lg font-medium leading-snug">
                  <span className="transition-opacity group-hover:opacity-60">{c.title} case study</span>
                  <ArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-fg/40 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                </Link>
              </div>
            ))}
            <div>
              <p className={label}>Work with me</p>
              <Link href="/services" className="group mt-2 inline-flex items-start gap-2 text-lg font-medium leading-snug">
                <span className="transition-opacity group-hover:opacity-60">AI and backend engineering, end to end</span>
                <ArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-fg/40 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </Link>
            </div>
          </aside>

          {next.slug !== post.slug && (
            <nav aria-label="Next post" className="mt-16 border-t border-line pt-10">
              <p className={label}>Read next</p>
              <Link href={next.href} className="group mt-3 flex items-start justify-between gap-6">
                <span className="font-display text-2xl leading-snug sm:text-3xl">
                  {next.title}
                </span>
                <ArrowRight
                  aria-hidden
                  className="mt-2 h-5 w-5 shrink-0 text-fg/40 transition-transform group-hover:translate-x-0.5 group-hover:text-fg"
                  strokeWidth={1.75}
                />
              </Link>
            </nav>
          )}
        </div>
      </main>
    </>
  );
}

/** Shown only while a post streams in after a client-side navigation. */
function PostSkeleton() {
  const bar = "rounded-md bg-fg/[0.06]";
  return (
    <>
      <div className={hero}>
        <div className={heroInner}>
          <div className="max-w-4xl lg:col-span-2" aria-hidden>
            <div className={`${bar} h-4 w-20`} />
            <div className={`${bar} mt-8 h-10 w-full`} />
            <div className={`${bar} mt-3 h-10 w-2/3`} />
            <div className={`${bar} mt-6 h-4 w-48`} />
          </div>
        </div>
      </div>
      <main className={`${grid} min-h-[60svh] pb-24`}>
        <div className="hidden lg:block" />
        <div className={`${column} space-y-3`} aria-hidden>
          {[100, 96, 92, 98, 70].map((w) => (
            <div key={w} className={`${bar} h-4`} style={{ width: `${w}%` }} />
          ))}
        </div>
      </main>
    </>
  );
}
