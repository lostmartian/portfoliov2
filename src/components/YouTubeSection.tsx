import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getYouTubeData } from "@/lib/youtube";
import { UPCOMING_TOPICS, VIDEO_CHAPTERS } from "@/data/video-chapters";
import EpisodePlayer from "@/components/video/EpisodePlayer";
import Section from "@/components/ui/Section";

export default function YouTubeSection({ index = 7 }: { index?: number }) {
  const { channel, videos } = getYouTubeData();
  const latest = videos[0];
  if (!latest) return null;

  return (
    <Section id="technical-breakdown" index={index} mr="चलचित्र" label="Videos" title={<>First principles, <span className="serif text-accent">on video.</span></>} href="/videos" hrefLabel="All videos">
      <EpisodePlayer video={latest} chapters={VIDEO_CHAPTERS[latest.id]} episode={videos.length} variant="compact" />

      <div className="mt-14 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-border pt-6">
        <p className="text-[15px] text-muted">
          <span className="label mr-3">Next up</span>
          {UPCOMING_TOPICS.join(" · ")}
        </p>
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/videos" className="group inline-flex items-center gap-1.5 text-sm">
            <span className="link-u">All episodes</span>
            <ArrowUpRight className="nudge w-3.5 h-3.5" />
          </Link>
          <a href={channel.subscribeUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-accent">
            <span className="link-u">Subscribe</span>
            <ArrowUpRight className="nudge w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </Section>
  );
}
