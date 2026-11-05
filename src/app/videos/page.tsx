import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Row } from "@/components/Row";
import { pageMeta } from "@/lib/meta";
import { breadcrumbs, ids } from "@/lib/schema";
import { YOUTUBE, abs } from "@/lib/site";
import { duration, isoDuration, series, thumb, videos, watch } from "@/lib/videos";

export const metadata: Metadata = pageMeta({
  title: "Videos",
  description:
    "Technical breakdowns by Sahil Gangurde on YouTube: how LLMs work from the GPU up (attention, KV cache, RoPE, MLA), retrieval and search from scratch, and system design.",
  path: "/videos",
  keywords: ["Sahil Gangurde YouTube", "LLM internals", "KV cache explained", "attention explained", "RoPE", "retrieval", "information retrieval", "system design"],
});

const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const structured = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${abs("/videos")}#page`,
    url: abs("/videos"),
    name: "Videos by Sahil Gangurde",
    author: { "@id": ids.person },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: videos.map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoObject",
          "@id": `${watch(v.id)}#video`,
          name: v.title,
          description: v.description,
          thumbnailUrl: thumb(v.id),
          uploadDate: v.date,
          duration: isoDuration(v.seconds),
          contentUrl: watch(v.id),
          embedUrl: `https://www.youtube.com/embed/${v.id}`,
          author: { "@id": ids.person },
          publisher: { "@id": ids.channel },
        },
      })),
    },
  },
  breadcrumbs([{ name: "Videos", path: "/videos" }]),
];

export default function VideosPage() {
  return (
    <PageShell
      active="/videos"
      eyebrow="Videos"
      title={
        <>
          How AI systems actually work. <span className="text-fg/40">From the GPU up.</span>
        </>
      }
      intro={
        <p>
          I post technical breakdowns on{" "}
          <a href={YOUTUBE} className="font-semibold text-fg transition-opacity hover:opacity-60">
            YouTube
          </a>
          : how language models run, how search works from scratch, and how real systems are designed.
        </p>
      }
    >
      <JsonLd data={structured} />
      {series.map((s) => (
        <Row key={s.name} name={s.name} note={`${s.videos.length} ${s.videos.length === 1 ? "video" : "videos"}`}>
          <p className="max-w-[60ch] text-[15px] leading-[1.7] text-muted">{s.blurb}</p>
          <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {s.videos.map((v) => (
              <li key={v.id}>
                <a href={watch(v.id)} className="group block outline-none">
                  <span className="relative block aspect-video overflow-hidden rounded-xl bg-surface ring-1 ring-line">
                    <Image
                      src={thumb(v.id)}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 340px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="tabular absolute bottom-2 right-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] font-medium text-white">
                      {duration(v.seconds)}
                    </span>
                  </span>
                  <span className="mt-3 flex items-start justify-between gap-3">
                    <span className="text-[15px] font-medium leading-snug transition-opacity group-hover:opacity-60">{v.title}</span>
                    <ArrowUpRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-fg/40" strokeWidth={1.75} />
                  </span>
                  <span className="tabular mt-1 block text-[13px] text-muted">{date.format(new Date(v.date))}</span>
                </a>
              </li>
            ))}
          </ul>
        </Row>
      ))}
    </PageShell>
  );
}
