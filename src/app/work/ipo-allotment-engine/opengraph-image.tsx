import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Case study: IPO Allotment Engine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({ label: "Case study", title: "One day to get every share right.", rest: "No room for error.", summary: "IPO Allotment Engine \u00b7 Niche Technologies" });
}
