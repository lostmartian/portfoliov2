import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Hire Sahil Gangurde, AI and backend engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    label: "Services",
    title: "Work with me.",
    rest: "From the first idea to production.",
    summary: "AI, backend, fintech and developer tooling · Remote, worldwide",
  });
}
