import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Videos by Sahil Gangurde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    label: "Videos",
    title: "How AI systems actually work.",
    rest: "From the GPU up.",
    summary: "LLM internals, retrieval and system design on YouTube",
  });
}
