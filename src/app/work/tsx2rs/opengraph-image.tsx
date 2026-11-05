import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Case study: tsx2rs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({ label: "Case study \u00b7 In progress", title: "Next.js, compiled to Rust.", rest: "Same output.", summary: "tsx2rs \u00b7 Personal, open source" });
}
