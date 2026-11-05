import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Case study: AYUVA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({ label: "Case study", title: "Medical reports, in words patients understand.", rest: "Without playing doctor.", summary: "AYUVA \u00b7 First500days" });
}
