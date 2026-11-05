import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Blog by Sahil Gangurde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({ label: "Blog", title: "Writing.", rest: "Now and then.", summary: "Product launches, engineering deep dives and the odd essay" });
}
