import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Case study: Farsight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({ label: "Case study", title: "Trusted answers from messy documents.", rest: "Even when people disagree.", summary: "Farsight \u00b7 Omara Technologies" });
}
