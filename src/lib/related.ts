// Links between case studies and the posts that tell the same story, so each page sends
// readers (and search engines) to the other.

import { caseStudies } from "@/lib/case-studies";
import { posts } from "@/lib/posts";

const pairs: [string, string][] = [
  ["/work/ipo-allotment-engine", "software-where-being-wrong-has-a-name"],
  ["/work/agentdiff", "agentdiff-building-the-git-for-ai-agents"],
];

export const relatedWork = (slug: string) =>
  pairs.filter(([, s]) => s === slug).map(([href]) => caseStudies.find((c) => c.href === href)!);

export const relatedPosts = (href: string) =>
  pairs.filter(([h]) => h === href).flatMap(([, s]) => posts.filter((p) => p.slug === s));
