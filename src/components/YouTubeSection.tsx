import Link from "next/link";
import { getLatestVideos } from "@/lib/youtube";
import VideoListItem from "@/components/VideoListItem";

export default function YouTubeSection() {
  const latestVideos = getLatestVideos(3);

  if (!latestVideos || latestVideos.length === 0) {
    return null;
  }

  return (
    <section id="technical-breakdown" className="pt-2 pb-10 md:pb-14 space-y-6 font-sans">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-accent">
          Technical Videos
        </h2>
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/videos"
            className="text-foreground/70 hover:text-accent transition-colors"
          >
            View all ({latestVideos.length}) &rarr;
          </Link>
          <span className="text-foreground/25">·</span>
          <a
            href="https://www.youtube.com/@sahilgangurdetech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-accent transition-colors"
          >
            @sahilgangurdetech ↗
          </a>
        </div>
      </div>

      {/* Tidy List of latest 3 videos */}
      <div className="divide-y divide-border/60 border-y border-border/60">
        {latestVideos.map((video, index) => (
          <VideoListItem
            key={video.id}
            video={video}
            index={index}
            defaultOpen={false}
          />
        ))}
      </div>
    </section>
  );
}
