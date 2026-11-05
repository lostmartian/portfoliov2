/** Heading text → URL fragment. Used both when listing a post's sections and when
 *  rendering its headings, so the two always agree. */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");

/** Short label for the section index: drops a leading "3. " and keeps the part before a
 *  colon or a wide gap ("The Spark: Cross-Domain…" → "The Spark"). */
export const sectionLabel = (text: string) =>
  text
    .replace(/^\d+\.\s+/, "")
    .split(/:\s|\s{2,}/)[0]
    .trim();
