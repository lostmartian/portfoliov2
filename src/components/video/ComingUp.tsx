import { ArrowUpRight } from "lucide-react";
import { UPCOMING_TOPICS } from "@/data/video-chapters";
import type { YouTubeChannel } from "@/lib/youtube";

/** Channel strip: what's coming next (as announced on the channel) and a subscribe CTA. */
export default function ComingUp({ channel }: { channel: YouTubeChannel }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border border border-border">
      <div className="lg:col-span-7 bg-background p-8 sm:p-12">
        <p className="label mb-8">Coming up on the channel</p>
        <ol className="space-y-4">
          {UPCOMING_TOPICS.map((t) => (
            <li key={t} className="group flex items-center gap-5 border-b border-border pb-4 last:border-b-0">
              <span className="h-2 w-2 shrink-0 rounded-full border border-accent transition-colors group-hover:bg-accent" aria-hidden="true" />
              <span className="font-display text-3xl sm:text-4xl leading-tight transition-colors group-hover:text-accent">{t}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="lg:col-span-5 bg-accent text-accent-foreground p-8 sm:p-12 flex flex-col justify-between gap-10">
        <div className="space-y-4">
          <p className="label !text-accent-foreground/90">{channel.handle}</p>
          <p className="font-display text-4xl leading-tight">{channel.name}</p>
          <p className="text-[15px] leading-relaxed opacity-85">{channel.description}</p>
        </div>
        <a
          href={channel.subscribeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flourish group inline-flex w-fit items-center gap-3 h-14 pl-7 pr-2.5 rounded-full bg-accent-foreground text-accent text-[15px] hover:bg-foreground hover:text-background transition-colors"
        >
          Subscribe for the next one
          <span className="grid place-items-center h-9 w-9 rounded-full bg-accent text-accent-foreground transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </a>
      </div>
    </section>
  );
}
