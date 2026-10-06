"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { YouTubeVideo } from "@/lib/youtube";

interface VideoListItemProps {
  video: YouTubeVideo;
  index: number;
  defaultOpen?: boolean;
}

const ATTENTION_CHAPTERS = [
  { time: "0:00", seconds: 0, title: "Recurrent architectures failure & parallel matrix ops" },
  { time: "9:46", seconds: 586, title: "Tokenization, embeddings, and sinusoidal positional encodings" },
  { time: "20:23", seconds: 1223, title: "Query, Key, and Value: search intent decoupling" },
  { time: "26:50", seconds: 1610, title: "Variance scaling & softmax gradient preservation" },
  { time: "39:15", seconds: 2355, title: "Multi-Head parallel representation subspaces" },
  { time: "45:21", seconds: 2721, title: "Causal masking for autoregressive token generation" },
  { time: "49:32", seconds: 2972, title: "Hardware limits: O(N²) scaling, memory bandwidth, and KV Cache" },
];

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function VideoListItem({ video, index, defaultOpen = false }: VideoListItemProps) {
  const [isPlaying, setIsPlaying] = useState(defaultOpen);
  const [activeSeconds, setActiveSeconds] = useState<number | null>(null);

  const hasChapters = video.id === "kBvLpoYivDs";

  const handleSeek = (seconds: number) => {
    setActiveSeconds(seconds);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const getEmbedSrc = () => {
    const base = video.embedUrl;
    const delimiter = base.includes("?") ? "&" : "?";
    if (activeSeconds !== null && activeSeconds > 0) {
      return `${base}${delimiter}start=${activeSeconds}&autoplay=1`;
    }
    return `${base}${delimiter}autoplay=1`;
  };

  return (
    <div className="py-5 group">
      {/* Horizontal row: Thumbnail on left, Content on right */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
        {/* Left: Compact Tidy Thumbnail */}
        <div
          onClick={() => {
            setIsPlaying((prev) => !prev);
            setActiveSeconds(null);
          }}
          className="relative w-full sm:w-44 md:w-52 aspect-video shrink-0 rounded overflow-hidden bg-foreground/[0.02] border border-border/70 group-hover:border-accent/50 transition-colors cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-background/90 text-foreground flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              {isPlaying ? (
                <X className="w-4 h-4 text-accent" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-foreground" />
              )}
            </div>
          </div>
        </div>

        {/* Right: Content with Title, Meta, Description, Tags */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Line 1: Index + Tag + Date */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2.5 min-w-0">
              <span className="text-xs font-semibold text-accent/70 tabular-nums shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-semibold text-accent/90 uppercase tracking-wider truncate">
                {video.tags[0] || "Architecture"} · Video
              </span>
            </div>
            <span className="text-xs text-foreground/50 tabular-nums shrink-0">
              {formatDate(video.publishedAt)}
            </span>
          </div>

          {/* Line 2: Title */}
          <h3 className="text-[16px] sm:text-[17px] font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {video.title} ↗
            </a>
          </h3>

          {/* Line 3: Description */}
          <p className="text-[14px] text-foreground/75 leading-relaxed line-clamp-2">
            {video.description.split("\n\n")[0]}
          </p>

          {/* Line 4: Tags & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4 pt-1 text-xs">
            <div className="flex flex-wrap gap-x-2 text-[12px] text-foreground/45">
              {video.tags.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsPlaying((prev) => !prev);
                  setActiveSeconds(null);
                }}
                className="text-xs font-medium text-accent hover:underline flex items-center gap-1 cursor-pointer"
              >
                {isPlaying ? "Close player" : "Watch inline"}
              </button>
              <span className="text-foreground/25">·</span>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/55 hover:text-foreground text-xs inline-flex items-center gap-0.5"
              >
                YouTube ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Inline Player */}
      {isPlaying && (
        <div className="pt-4 sm:pl-[12.5rem] md:pl-[14.5rem] space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="relative w-full aspect-video rounded overflow-hidden border border-border/80 bg-black/95 shadow-sm">
            <iframe
              className="w-full h-full border-0"
              src={getEmbedSrc()}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Interactive Chapter Timelines for Attention Breakdown */}
      {hasChapters && (
        <div className="mt-4 sm:ml-[12.5rem] md:ml-[14.5rem] pt-3 border-t border-border/40 space-y-2">
          <div className="text-[11px] uppercase tracking-wider text-accent font-semibold flex items-center justify-between">
            <span>Video Chapters &middot; Timestamps</span>
            <span className="text-foreground/40 font-mono normal-case">Jump to topic</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] text-foreground/80">
            {ATTENTION_CHAPTERS.map((ch) => (
              <a
                key={ch.time}
                href={`https://www.youtube.com/watch?v=${video.id}&t=${ch.seconds}s`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                  e.preventDefault();
                  handleSeek(ch.seconds);
                }}
                className={`text-left py-1 px-1.5 rounded transition-colors flex items-start gap-2 group/ch cursor-pointer ${
                  activeSeconds === ch.seconds
                    ? "bg-accent/10 text-accent font-medium"
                    : "hover:bg-foreground/[0.03] text-foreground/75 hover:text-foreground"
                }`}
                title={`Jump to ${ch.time}: ${ch.title}`}
              >
                <span className="font-mono text-xs text-accent/80 shrink-0 group-hover/ch:text-accent underline decoration-accent/30 underline-offset-2">
                  {ch.time}
                </span>
                <span className="truncate leading-snug">{ch.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
