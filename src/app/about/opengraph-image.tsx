import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "About Sahil Gangurde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({ label: "About", title: "Hi, I'm Sahil.", rest: "I build systems that have to hold.", summary: "Backend and AI engineer in Pune" });
}
