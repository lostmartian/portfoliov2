import type { MetadataRoute } from "next";
import { SITE_URL, abs } from "@/lib/site";

// Written to a file at build time; the site is a static export.
export const dynamic = "force-static";

// Open to every crawler, and named explicitly for AI search and assistant crawlers so the
// profile, case studies and llms.txt can be read and cited.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: abs("/sitemap.xml"),
    host: SITE_URL,
  };
}
