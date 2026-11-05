// llms.txt (https://llmstxt.org): a plain Markdown profile for AI assistants and agents, built
// from the same data as the pages so it never drifts. llms-full.txt adds every case study's
// results and every blog post in full.

import * as agentdiff from "@/lib/case-studies/agentdiff";
import * as ayuva from "@/lib/case-studies/ayuva";
import * as farsight from "@/lib/case-studies/farsight";
import { caseStudies } from "@/lib/case-studies";
import * as ipo from "@/lib/case-studies/ipo";
import * as tsx2rs from "@/lib/case-studies/tsx2rs";
import { path as career, openSource } from "@/lib/about";
import { formatDate, posts } from "@/lib/posts";
import { videos, watch } from "@/lib/videos";
import { DESCRIPTION, HANDLE, NAME, SITE_URL, YOUTUBE, abs, contact, expertise, sameAs, services, ventures } from "@/lib/site";

const studies = [
  { href: "/work/ipo-allotment-engine", m: ipo },
  { href: "/work/farsight", m: farsight },
  { href: "/work/ayuva", m: ayuva },
  { href: "/work/agentdiff", m: agentdiff },
  { href: "/work/tsx2rs", m: tsx2rs },
];

function profile() {
  return [
    `# ${NAME} (${HANDLE})`,
    "",
    `> ${DESCRIPTION}`,
    "",
    "## Contact",
    "",
    `- Website: ${SITE_URL}`,
    `- Email: ${contact.email}`,
    `- Location: ${contact.location}`,
    `- Available for: ${contact.availability}`,
    ...sameAs.slice(0, 4).map((u) => `- ${new URL(u).hostname.replace("www.", "")}: ${u}`),
    "",
    "## What to hire him for",
    "",
    `How he works and how to engage: ${abs("/services")}`,
    "",
    ...services.map((s) => `- **${s.name}**: ${s.description}`),
    "",
    "## Ventures",
    "",
    ...ventures.map((v) => `- [${v.name}](${v.url}): ${v.description}`),
    "",
    "## Case studies",
    "",
    ...caseStudies.map((c) => {
      const s = studies.find((x) => x.href === c.href)!;
      return `- [${c.title}](${abs(c.href)}) (${c.company}${c.status ? `, ${c.status.toLowerCase()}` : ""}): ${s.m.meta.summary}`;
    }),
    "",
    "## Career",
    "",
    ...career.map((p) => `- ${p.when}: ${p.title}. ${p.detail}`),
    "",
    "## Open source",
    "",
    ...openSource.map((o) => `- [${o.name}](${o.href}) (${o.lang}): ${o.text}`),
    "",
    "## Writing and video",
    "",
    ...posts.map((p) => `- [${p.title}](${abs(p.href)}) (${formatDate(p.date)}, Markdown: ${abs(p.markdown)}): ${p.description}`),
    `- YouTube, technical breakdowns of how AI systems work: ${YOUTUBE}`,
    ...videos.map((v) => `  - [${v.title}](${watch(v.id)})`),
    `- All videos: ${abs("/videos")} · RSS feed of posts: ${abs("/feed.xml")}`,
    "",
    "## Expertise",
    "",
    expertise.join(", "),
  ];
}

export function llmsTxt() {
  return [...profile(), "", "## More", "", `- Everything above in full, with case study results and every post: ${abs("/llms-full.txt")}`, ""].join("\n");
}

export function llmsFullTxt() {
  const work = studies.flatMap(({ href, m }) => [
    `## ${m.meta.title}`,
    "",
    `Source: ${abs(href)}`,
    "",
    m.meta.summary,
    "",
    ...m.meta.facts.map(([k, v]) => `- ${k}: ${v}`),
    "",
    `**${m.leadResult.value}**: ${m.leadResult.label}. ${m.leadResult.note}`,
    "",
    ...m.results.map((r) => `- ${r.value}: ${r.label}`),
    "",
    `Stack: ${m.stack.flatMap((s) => s.items).join(", ")}.`,
    "",
    `Takeaway: ${m.takeaway}`,
    "",
  ]);
  const writing = posts.flatMap((p) => [`## ${p.title}`, "", `Source: ${abs(p.href)} · ${formatDate(p.date)} · ${p.category}`, "", p.body.trim(), ""]);
  return [...profile(), "", "# Case studies in detail", "", ...work, "# Blog posts", "", ...writing].join("\n");
}
