// The /uses page. Engineering sections come from the site's toolkit config;
// add your own setup below (desk, editor, paints, kitchen) and it appears on the page.
export interface UsesGroup {
  title: string;
  mr: string;
  glyph: "desk" | "brush" | "pot" | "code";
  items: { name: string; note?: string }[];
}

export const PERSONAL_USES: UsesGroup[] = [
  // { title: "Desk", mr: "मेज", glyph: "desk", items: [{ name: "Your laptop", note: "why you like it" }] },
  // { title: "Studio", mr: "चित्र", glyph: "brush", items: [{ name: "Acrylics", note: "brand / colours" }] },
  // { title: "Kitchen", mr: "स्वयंपाक", glyph: "pot", items: [{ name: "Cast-iron tawa" }] },
];

/** Verified from package.json: what this website is built with. */
export const SITE_STACK = [
  { name: "Next.js 16", note: "App Router, static export" },
  { name: "React 19" },
  { name: "Tailwind CSS 4" },
  { name: "Lenis", note: "smooth scroll for the scroll stories" },
  { name: "Instrument Serif · Inter · Tiro Devanagari Marathi", note: "type" },
  { name: "Hand-written SVG", note: "every Warli drawing is code" },
];
