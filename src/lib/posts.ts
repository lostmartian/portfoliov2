// Blog posts and technical writeups, read from src/content/{blogs,writeups}/*.md at build
// time. Frontmatter keeps the format of the old site (dates like "AUG 24, 2026", category as a
// string or a list), so files can be copied over unchanged. Writeups may also list `tags`.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";
import { sectionLabel, slugify } from "@/lib/slug";

export type Collection = "blogs" | "writeups";

export type Post = {
  collection: Collection;
  slug: string;
  href: string;
  title: string;
  /** ISO date, for sorting and <time> */
  date: string;
  category: string;
  tags: string[];
  description: string;
  headerImage?: { src: string; width: number; height: number };
  headerImageCaption?: string;
  body: string;
  minutes: number;
  /** The post's ## headings, for the section index */
  sections: { id: string; label: string }[];
  /** the post as plain Markdown (src/app/<collection>/md/[file]/route.ts) */
  markdown: string;
};


const titleCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

/** The posts were written for MathJax running after Markdown, so math escapes `_` as `\_`
 *  and puts display math on one line. KaTeX reads math raw, so undo the escapes and give
 *  each one-line `$$…$$` its own block. Fenced code is left alone. */
function prepareMath(md: string) {
  return md
    .split(/(^```[\s\S]*?^```)/m)
    .map((part, i) => {
      if (i % 2 === 1) return part;
      return part
        .replace(/^(\s*)\$\$(.+?)\$\$\s*$/gm, (_, indent, tex) => `${indent}$$\n${indent}${tex.trim()}\n${indent}$$`)
        .replace(/\$\$[\s\S]+?\$\$|\$[^$\n]+?\$/g, (m) => m.replace(/\\_/g, "_"));
    })
    .join("");
}

/** `## ` headings outside fenced code, with inline Markdown stripped. */
function sections(md: string) {
  return md
    .split(/^```[\s\S]*?^```/m)
    .flatMap((part) => [...part.matchAll(/^## (.+)$/gm)].map((m) => m[1]))
    .map((raw) => raw.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "").trim())
    .map((text) => ({ id: slugify(text), label: sectionLabel(text) }));
}

/** Local header images with their real size, so next/image reserves the right space. */
function header(src: string) {
  const { width = 1600, height = 900 } = imageSize(fs.readFileSync(path.join(process.cwd(), "public", src)));
  return { src, width, height };
}

function load(collection: Collection, file: string): Post & { hidden: boolean } {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(dir(collection), file), "utf-8"));
  const category = Array.isArray(data.category) ? data.category[0] : data.category;
  const parsed = new Date(`${data.date} UTC`);
  return {
    collection,
    slug,
    href: `/${collection}/${slug}`,
    title: data.title,
    date: parsed.toISOString().slice(0, 10),
    category: titleCase(String(category ?? "Writing")),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    description: data.description ?? "",
    headerImage: data.headerImage ? header(data.headerImage) : undefined,
    headerImageCaption: data.headerImageCaption,
    body: prepareMath(content),
    minutes: Math.max(1, Math.round(content.split(/\s+/).length / 230)),
    sections: sections(content),
    markdown: `/${collection}/md/${slug}.md`,
    hidden: data.hidden === true,
  };
}

const dir = (collection: Collection) => path.join(process.cwd(), "src/content", collection);

/** Every visible post in a folder, newest first. */
function loadCollection(collection: Collection): Post[] {
  if (!fs.existsSync(dir(collection))) return [];
  return fs
    .readdirSync(dir(collection))
    .filter((f) => f.endsWith(".md"))
    .map((f) => load(collection, f))
    .filter((p) => !p.hidden)
    .sort((a, b) => b.date.localeCompare(a.date));
}

// Read once at module scope: the files don't change between requests.
export const posts = loadCollection("blogs");
export const writeups = loadCollection("writeups");

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const getWriteup = (slug: string) => writeups.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
