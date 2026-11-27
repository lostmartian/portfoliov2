// Cooking: one folder per dish under public/cooking/, read at build time. No other setup.
//
//   public/cooking/<dish-slug>/
//     1.jpg, 2.jpg, ...    photos of the finished dish, in filename order; 1 is the lead photo
//     dish.json            optional: { "name": "...", "date": "2026-11-20", "note": "..." }
//
// Any image size or shape works. Without dish.json, the name comes from the folder name
// ("paneer-butter-masala" becomes "Paneer butter masala"). Phone photos carry GPS data: strip it
// (and resize) before adding them, e.g. magick in.jpg -auto-orient -resize 1600x1600> -strip out.jpg

import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export type Photo = { src: string; width: number; height: number };

export type Dish = {
  slug: string;
  name: string;
  /** ISO date, when given in dish.json */
  date?: string;
  note?: string;
  photos: Photo[];
};

const ROOT = path.join(process.cwd(), "public", "cooking");
const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;

const titleCase = (slug: string) => {
  const words = slug.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

function load(): Dish[] {
  if (!fs.existsSync(ROOT)) return [];
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("."))
    .map((d): Dish | null => {
      const slug = d.name;
      const dir = path.join(ROOT, slug);
      const files = fs
        .readdirSync(dir)
        .filter((f) => IMAGE.test(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      if (!files.length) return null;

      const metaPath = path.join(dir, "dish.json");
      const meta: { name?: string; date?: string; note?: string } = fs.existsSync(metaPath)
        ? JSON.parse(fs.readFileSync(metaPath, "utf8"))
        : {};

      return {
        slug,
        name: meta.name ?? titleCase(slug),
        date: meta.date,
        note: meta.note,
        photos: files.map((f) => {
          const { width = 1200, height = 900 } = imageSize(fs.readFileSync(path.join(dir, f)));
          return { src: `/cooking/${slug}/${encodeURIComponent(f)}`, width, height };
        }),
      };
    })
    .filter((d): d is Dish => d !== null)
    // newest first when dated, then by name
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.name.localeCompare(b.name));
}

export const dishes = load();
