import { ogCard } from "@/lib/og";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

export const alt = "Case study: AgentDiff";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    label: "Case study",
    title: "Where your agent's money went.",
    rest: "And what was avoidable.",
    summary: "AgentDiff · KerrShift · Open source",
  });
}
