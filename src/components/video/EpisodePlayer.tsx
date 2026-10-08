"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import type { YouTubeVideo } from "@/lib/youtube";
import { VIDEO_THUMBNAILS, type Chapter } from "@/data/video-chapters";
import { devaNum } from "@/components/ui/deva";

const mono = { fontFamily: "var(--font-geist-mono)" };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

/** First paragraph of a YouTube description, without the boilerplate. */
export function summary(description: string) {
  return description.split("\n\n")[0].trim();
}

/** Bullet lines ("• …") from the description, used as "what's covered". */
export function covered(description: string) {
  return description
    .split("\n")
    .filter((l) => l.trim().startsWith("•"))
    .map((l) => l.replace(/^\s*•\s*/, "").trim());
}

/**
 * Featured episode: a mounted thumbnail that plays in place, a chapter timeline
 * you can scrub, and (on the full page) a clickable chapter list.
 */
export default function EpisodePlayer({
  video,
  chapters = [],
  episode = 1,
  variant = "page",
}: {
  video: YouTubeVideo;
  chapters?: Chapter[];
  episode?: number;
  variant?: "page" | "compact";
}) {
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  // Largest first. A missing size comes back as a 120×90 grey placeholder (not a 404), so each
  // candidate is checked by its natural width and we step down until one is real.
  const candidates = VIDEO_THUMBNAILS[video.id]
    ? [VIDEO_THUMBNAILS[video.id]]
    : ["maxresdefault", "hq720", "sddefault"].map((n) => `https://i.ytimg.com/vi/${video.id}/${n}.jpg`).concat(video.thumbnailUrl);
  const [ti, setTi] = useState(0);
  const thumb = candidates[Math.min(ti, candidates.length - 1)];
  const img = useRef<HTMLImageElement>(null);
  const nextIfPlaceholder = (el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth > 0 && el.naturalWidth <= 120 && ti < candidates.length - 1) setTi((i) => i + 1);
  };

  // The image can finish loading before hydration, so also check after each source change.
  useEffect(() => {
    nextIfPlaceholder(img.current);
  });

  const play = (s = 0) => {
    setStart(s);
    setPlaying(true);
  };

  // Chapter segment widths: gap to the next chapter; the last one gets the average.
  const spans = chapters.map((c, i) => (i < chapters.length - 1 ? chapters[i + 1].seconds - c.seconds : 0));
  const avg = spans.length > 1 ? spans.slice(0, -1).reduce((a, b) => a + b, 0) / (spans.length - 1) : 1;
  if (spans.length) spans[spans.length - 1] = avg;
  const active = chapters.reduce((acc, c, i) => (c.seconds <= start ? i : acc), 0);
  const src = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&start=${start}`;

  const player = (
    <div>
      <div className="border border-border p-1.5 bg-card-bg">
        <div className="group relative aspect-video overflow-hidden bg-foreground">
          {playing ? (
            <iframe
              key={start}
              className="absolute inset-0 w-full h-full border-0"
              src={src}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button onClick={() => play(0)} className="absolute inset-0 w-full h-full cursor-pointer" aria-label={`Play: ${video.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={img}
                src={thumb}
                onError={() => setTi((i) => Math.min(i + 1, candidates.length - 1))}
                onLoad={(e) => nextIfPlaceholder(e.currentTarget)}
                alt=""
                className="photo absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute left-5 bottom-4 sm:left-7 sm:bottom-6 text-left text-white">
                <span className="label !text-white/75">
                  Episode <span className="deva normal-case tracking-normal text-[13px]">{devaNum(String(episode).padStart(2, "0"))}</span>
                </span>
              </span>
              <span className="absolute right-4 bottom-4 sm:right-6 sm:bottom-5 inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground pl-2 pr-5 py-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                <span className="relative grid place-items-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-accent-foreground text-accent">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                </span>
                <span className="text-sm sm:text-[15px]">Play episode</span>
              </span>
            </button>
          )}
        </div>
      </div>

      {chapters.length > 0 && (
        <div className="mt-5">
          <div className="flex items-baseline justify-between mb-2">
            <span className="label">Chapters</span>
            <span className="text-[12px] text-muted min-h-[1rem] text-right truncate max-w-[70%]" aria-live="polite">
              {hover !== null ? `${chapters[hover].time} · ${chapters[hover].title}` : playing ? `Playing from ${chapters[active].time}` : "Hover to preview, click to jump"}
            </span>
          </div>
          <div className="flex gap-1 h-9 items-end" onMouseLeave={() => setHover(null)}>
            {chapters.map((c, i) => {
              const on = playing && i === active;
              return (
                <button
                  key={c.time}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onClick={() => play(c.seconds)}
                  className="group/seg relative h-full cursor-pointer"
                  style={{ flexGrow: spans[i], flexBasis: 0 }}
                  aria-label={`Jump to ${c.time}: ${c.title}`}
                >
                  <span
                    className={`absolute inset-x-0 bottom-0 transition-all duration-300 ${
                      on ? "h-full bg-accent" : hover === i ? "h-full bg-accent/70" : "h-2 bg-foreground/20 group-hover/seg:bg-accent/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <div className="flex gap-1 mt-1.5">
            {chapters.map((c, i) => (
              <span key={c.time} className="text-[10px] text-muted tabular-nums truncate" style={{ flexGrow: spans[i], flexBasis: 0, ...mono }}>
                {c.time}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const meta = (
    <div className="space-y-6">
      <p className="label">
        {formatDate(video.publishedAt)}
        {chapters.length > 0 && <> · {chapters.length} chapters</>}
      </p>
      <h3 className="text-4xl sm:text-5xl leading-[1.02]">{video.title}</h3>
      <p className="text-[16px] sm:text-[17px] text-muted leading-relaxed">{summary(video.description)}</p>
      <ul className="flex flex-wrap gap-2">
        {video.tags.slice(0, 4).map((t) => (
          <li key={t} className="border border-border px-3 py-1 text-[13px] text-foreground/75">{t}</li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
        <button
          onClick={() => play(playing ? start : 0)}
          className="flourish group inline-flex items-center gap-2 h-12 pl-6 pr-5 rounded-full bg-foreground text-background text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          {playing ? "Playing" : "Watch here"}
        </button>
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm">
          <span className="link-u">Open on YouTube</span>
          <ArrowUpRight className="nudge w-4 h-4" />
        </a>
      </div>
    </div>
  );

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12 items-start">
        <div className="xl:col-span-7">{player}</div>
        <div className="xl:col-span-5">{meta}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <div className="lg:col-span-8 space-y-12">
        {player}
        <div className="max-w-2xl">{meta}</div>
      </div>
      {chapters.length > 0 && (
        <aside className="lg:col-span-4 lg:sticky lg:top-28">
          <p className="label mb-4">In this episode</p>
          <ol className="border-t border-border">
            {chapters.map((c, i) => {
              const on = playing && i === active;
              return (
                <li key={c.time}>
                  <button
                    onClick={() => play(c.seconds)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    className={`group w-full grid grid-cols-[28px_52px_1fr] gap-2 items-baseline text-left py-4 border-b border-border transition-all duration-300 cursor-pointer ${on ? "text-accent" : "hover:pl-2"}`}
                  >
                    <span className="deva text-accent">{devaNum(i + 1)}</span>
                    <span className="text-[12px] text-muted tabular-nums" style={mono}>{c.time}</span>
                    <span className={`text-[15px] leading-snug transition-colors ${on ? "" : "group-hover:text-accent"}`}>{c.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>
      )}
    </div>
  );
}
