// The reading page shared by blog posts and technical writeups: top bar, title block,
// section index, the Markdown body, related links and the next post. Each collection
// differs only in the words and links in `kinds`.

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { TintBackdrop, TintGlow, tintVars } from "@/components/Tint";
import { tintFor } from "@/lib/palette";
import { Markdown } from "@/components/blog/Markdown";
import { label } from "@/components/PageShell";
import { MobileToc, ReadingProgress, Toc } from "@/components/case-study/Toc";
import { SiteNav } from "@/components/SiteNav";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { socials } from "@/lib/data";
import { container } from "@/lib/layout";
import { type Collection, type Post, formatDate, posts, writeups } from "@/lib/posts";
import { relatedWork } from "@/lib/related";
import { breadcrumbs, ids } from "@/lib/schema";
import { abs } from "@/lib/site";
import { isoDuration, thumb, videoFor, watch } from "@/lib/videos";

export const kinds = {
  blogs: { list: posts, name: "Blog", path: "/blogs", back: "All posts", schema: "BlogPosting", collection: "Blog" },
  writeups: { list: writeups, name: "Writeups", path: "/writeups", back: "All writeups", schema: "TechArticle", collection: "Writeups" },
} as const;

/** Top bar and footer around a post. The post itself goes in `children`. */
export function ArticleChrome({ collection, children }: { collection: Collection; children: React.ReactNode }) {
  return (
    <div className="relative isolate" style={tintVars(tintFor(kinds[collection].path))}>
      <TintBackdrop tint={tintFor(kinds[collection].path)} />
      <header className={`${container} absolute inset-x-0 top-0 z-30 flex items-center justify-between py-6 text-sm`}>
        <Link href="/" className="font-medium tracking-tight">
          Sahil<span className="max-sm:hidden"> Gangurde</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-5">
          <SiteNav active={kinds[collection].path} />
          <ThemeSwitcher />
        </div>
      </header>

      {children}

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
    </div>
  );
}

// Same frame as the case studies: the title starts at the container edge, then a 200px
// section index on the left (desktop) beside the reading column.
const hero = "graphite-fade relative isolate";
const grid = `${container} grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20`;
const heroInner = `${grid} relative z-10 pb-14 pt-32 sm:pb-16 sm:pt-40`;
const column = "min-w-0 max-w-[46rem]";

export function ArticleView({ post }: { post: Post | undefined }) {
  if (!post) notFound();
  const kind = kinds[post.collection];
  const list: readonly Post[] = kind.list;
  const next = list[list.indexOf(post) + 1] ?? list[0];

  const video = videoFor(post.href);
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": kind.schema,
      "@id": `${abs(post.href)}#post`,
      url: abs(post.href),
      mainEntityOfPage: abs(post.href),
      headline: post.title,
      description: post.description,
      image: abs(`${post.href}/opengraph-image`),
      datePublished: post.date,
      dateModified: post.date,
      articleSection: post.category,
      ...(post.tags.length ? { keywords: post.tags } : {}),
      wordCount: post.body.split(/\s+/).length,
      timeRequired: `PT${post.minutes}M`,
      inLanguage: "en",
      author: { "@id": ids.person },
      publisher: { "@id": ids.person },
      isPartOf: { "@id": `${abs(kind.path)}#${post.collection}` },
      // a companion video on the same topic (lib/videos.ts)
      ...(video
        ? {
            video: {
              "@type": "VideoObject",
              name: video.title,
              description: video.description,
              thumbnailUrl: thumb(video.id),
              uploadDate: video.date,
              duration: isoDuration(video.seconds),
              contentUrl: watch(video.id),
              embedUrl: `https://www.youtube.com/embed/${video.id}`,
            },
          }
        : {}),
    },
    breadcrumbs([
      { name: kind.name, path: kind.path },
      { name: post.title, path: post.href },
    ]),
  ];

  return (
    <>
      <JsonLd data={structured} />
      <ReadingProgress />
      <div className={hero}>
        <TintGlow tint={tintFor(kind.path)} />
        <div className={heroInner}>
          <div className="max-w-6xl lg:col-span-2">
            <Link
              href={kind.path}
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.75} />
              {kind.back}
            </Link>
            <h1 className="mt-8 font-display text-[2.25rem] leading-[1.06] sm:text-[3.5rem]">{post.title}</h1>
            <p className={`${label} mt-6 flex flex-wrap items-center gap-x-2 gap-y-1`}>
              <time dateTime={post.date} className="tabular">
                {formatDate(post.date)}
              </time>
              <span aria-hidden className="text-fg/45">·</span>
              {post.category}
              <span aria-hidden className="text-fg/45">·</span>
              {post.minutes} min read
            </p>
            {post.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <li key={t} className="rounded-full bg-fg/[0.05] px-2.5 py-0.5 text-[12px] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {post.sections.length > 1 && <MobileToc items={post.sections} />}

      <main className={`${grid} pb-24 max-lg:pt-8`}>
        <aside className="hidden lg:block">{post.sections.length > 1 && <Toc items={post.sections} />}</aside>
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
                  <ArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-fg/65 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                </Link>
              </div>
            ))}
            <div>
              <p className={label}>Work with me</p>
              <Link href="/services" className="group mt-2 inline-flex items-start gap-2 text-lg font-medium leading-snug">
                <span className="transition-opacity group-hover:opacity-60">AI and backend engineering, end to end</span>
                <ArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-fg/65 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </Link>
            </div>
          </aside>

          {next.slug !== post.slug && (
            <nav aria-label="Next" className="mt-16 border-t border-line pt-10">
              <p className={label}>Read next</p>
              <Link href={next.href} className="group mt-3 flex items-start justify-between gap-6">
                <span className="font-display text-2xl leading-snug sm:text-3xl">{next.title}</span>
                <ArrowRight
                  aria-hidden
                  className="mt-2 h-5 w-5 shrink-0 text-fg/65 transition-transform group-hover:translate-x-0.5 group-hover:text-fg"
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
export function ArticleSkeleton() {
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
