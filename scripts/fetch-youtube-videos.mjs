/**
 * Sync script to fetch public YouTube channel videos without needing an API key.
 * Uses YouTube's official public XML Atom/RSS feed and oEmbed metadata.
 * Run locally with:
 *   node scripts/fetch-youtube-videos.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANNEL_ID = "UCtaWm5UMqhiBtgHzKzkOabw";
const CHANNEL_HANDLE = "@sahilgangurdetech";
const CHANNEL_URL = `https://www.youtube.com/${CHANNEL_HANDLE}`;
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUT_FILE = path.join(__dirname, "../src/data/youtube-videos.json");

function parseXmlField(entryXml, tag) {
  const match = entryXml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? match[1].trim() : "";
}

function parseXmlAttr(entryXml, tag, attr) {
  const match = entryXml.match(new RegExp(`<${tag}[^>]*\\b${attr}=["']([^"']*)["']`, "i"));
  return match ? match[1].trim() : "";
}

function extractTags(title, description) {
  const tags = new Set();
  const text = `${title} ${description}`.toLowerCase();

  const keywords = [
    { tag: "Attention", match: /attention|transformer/ },
    { tag: "GPU Systems", match: /gpu|cuda|memory bandwidth|kv cache/ },
    { tag: "Deep Learning", match: /deep learning|machine learning|linear algebra/ },
    { tag: "AgentDiff", match: /agentdiff|trajectory/ },
    { tag: "AI Agents", match: /agent|evals|rag/ },
    { tag: "Python", match: /python|pip/ },
    { tag: "Golang", match: /golang|go / },
    { tag: "Architecture", match: /architecture|systems|bottleneck/ },
  ];

  for (const { tag, match } of keywords) {
    if (match.test(text)) {
      tags.add(tag);
    }
  }

  // Also extract any explicit #hashtags
  const hashMatches = description.match(/#(\w+)/g);
  if (hashMatches) {
    hashMatches.forEach((h) => tags.add(h.replace("#", "")));
  }

  return Array.from(tags).slice(0, 5);
}

async function main() {
  console.log(`Fetching public YouTube videos for ${CHANNEL_HANDLE} (${CHANNEL_ID})...`);

  try {
    const res = await fetch(FEED_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch RSS feed: HTTP ${res.status}`);
    }

    const xml = await res.text();

    // Match all <entry> blocks
    const entryMatches = xml.match(/<entry>[\s\S]*?<\/entry>/gi) || [];

    const videos = entryMatches.map((entryXml, idx) => {
      const videoId = parseXmlField(entryXml, "yt:videoId");
      const title = parseXmlField(entryXml, "title")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
      const published = parseXmlField(entryXml, "published");
      const updated = parseXmlField(entryXml, "updated");
      const description = parseXmlField(entryXml, "media:description")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
      const views = parseInt(parseXmlAttr(entryXml, "media:statistics", "views") || "0", 10);
      const thumbnail =
        parseXmlAttr(entryXml, "media:thumbnail", "url") ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      const tags = extractTags(title, description);

      return {
        id: videoId,
        title,
        description,
        publishedAt: published,
        updatedAt: updated,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: videoId === "kBvLpoYivDs"
          ? `https://www.youtube.com/embed/${videoId}?si=lNIyEmuuEj8ESe7K`
          : `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl: thumbnail,
        views,
        tags: tags.length > 0 ? tags : ["AI Engineering", "Systems"],
        featured: idx === 0, // Latest video is featured by default
      };
    }).filter((video) => new Date(video.publishedAt) >= new Date("2026-10-06T00:00:00Z"));

    const dataset = {
      channel: {
        id: CHANNEL_ID,
        name: "Sahil Gangurde Tech",
        handle: CHANNEL_HANDLE,
        url: CHANNEL_URL,
        subscribeUrl: `${CHANNEL_URL}?sub_confirmation=1`,
        description:
          "First-principles deep dives into Autonomous AI Agents, Production LLM Systems, High-Throughput Backends (Go & Python), and GPU Memory Systems.",
        bannerTagline: "Deep Dives into AI Engineering, Agentic Trajectories & Scaled Systems",
        lastSynced: new Date().toISOString(),
        videoCount: videos.length,
      },
      videos,
    };

    fs.writeFileSync(OUT_FILE, JSON.stringify(dataset, null, 2), "utf8");
    console.log(`Successfully synced ${videos.length} YouTube videos to ${OUT_FILE}`);
  } catch (error) {
    console.error("Error syncing YouTube videos:", error);
  }
}

main();
