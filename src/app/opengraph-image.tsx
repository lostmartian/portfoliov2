import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Sahil Gangurde, backend and AI engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({ label: "Portfolio", title: "I'm Sahil.", rest: "Backend and AI engineer in Pune.", summary: "IPO allotment, AI ground truth and patient-facing AI" });
}
