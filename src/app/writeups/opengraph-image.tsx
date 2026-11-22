import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Technical writeups by Sahil Gangurde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    label: "Writeups",
    title: "Technical writeups.",
    rest: "How things actually work.",
    summary: "Tutorials and explanations with code and real numbers",
  });
}
