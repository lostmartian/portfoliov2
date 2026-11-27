import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Cooking by Sahil Gangurde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    label: "Cooking",
    title: "Things I've cooked.",
    rest: "From my kitchen.",
    summary: "Home cooking, in photos",
  });
}
