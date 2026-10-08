/** Shared slug rule so the contents rail and the rendered headings agree on ids. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** ## and ### headings from markdown, skipping fenced code blocks. */
export function extractHeadings(md: string): Heading[] {
  const out: Heading[] = [];
  let fence = false;
  for (const line of md.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    if (fence) continue;
    const m = line.match(/^(##|###)\s+(.+?)\s*#*\s*$/);
    if (m) {
      const text = m[2].replace(/[`*_~]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
      // The id keeps the raw text (it must match the rendered heading); the label drops
      // markdown escapes and any manual "1." numbering, since the rail numbers sections itself.
      const label = text.replace(/\\(.)/g, "$1").replace(/^\d+[.)]\s+/, "");
      out.push({ id: slugify(text), text: label, level: m[1].length as 2 | 3 });
    }
  }
  return out;
}
