"use client";

// A/B listening test: one play button and one timeline for two recordings. Switching keeps
// the playhead, so you hear the same moment in the original and the compressed version.
// The files are large WAVs, so nothing downloads until play is pressed.

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Track = { src: string; title: string; desc: string };

const clock = (s: number) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

export function AudioCompare({ a, b }: { a: Track; b: Track }) {
  const tracks = [a, b];
  const refs = [useRef<HTMLAudioElement>(null), useRef<HTMLAudioElement>(null)];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const current = () => refs[active].current!;

  useEffect(() => {
    const el = refs[active].current!;
    const onTime = () => setTime(el.currentTime);
    const onMeta = () => setDuration(el.duration);
    const onEnd = () => setPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
    };
    // refs are stable; re-bind only when the active track changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const toggle = async () => {
    const el = current();
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      await el.play();
      setPlaying(true);
    }
  };

  const select = async (i: number) => {
    if (i === active) return;
    const from = current();
    const to = refs[i].current!;
    to.currentTime = from.currentTime;
    from.pause();
    setActive(i);
    if (playing) await to.play();
  };

  const seek = (value: number) => {
    current().currentTime = value;
    setTime(value);
  };

  return (
    <figure className="not-prose my-10 rounded-xl bg-surface p-5 ring-1 ring-line sm:p-6">
      {tracks.map((t, i) => (
        <audio key={t.src} ref={refs[i]} src={t.src} preload="none" />
      ))}

      <div role="radiogroup" aria-label="Recording" className="grid gap-2 sm:grid-cols-2">
        {tracks.map((t, i) => (
          <button
            key={t.src}
            type="button"
            role="radio"
            aria-checked={i === active}
            onClick={() => select(i)}
            className={`rounded-lg px-4 py-3 text-left transition-colors ${
              i === active ? "bg-card ring-1 ring-fg/20" : "hover:bg-fg/[0.04]"
            }`}
          >
            <span className="flex items-center gap-2 text-[15px] font-medium">
              <span className={`h-1.5 w-1.5 rounded-full ${i === active ? "bg-fg" : "bg-fg/25"}`} />
              {t.title}
            </span>
            <span className="mt-1 block text-[13px] leading-snug text-muted">{t.desc}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-fg text-ink transition-transform active:scale-95"
        >
          {playing ? <Pause className="h-4 w-4 fill-current" strokeWidth={0} /> : <Play className="ml-0.5 h-4 w-4 fill-current" strokeWidth={0} />}
        </button>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.01}
          value={time}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Position"
          className="h-1 flex-1 cursor-pointer accent-[var(--fg)]"
        />
        <span className="tabular w-[9ch] shrink-0 text-right text-[12px] text-muted">
          {clock(time)} / {clock(duration)}
        </span>
      </div>
      <figcaption className="mt-4 text-[12px] text-muted">Switch while it plays to hear the same moment in both. Large WAV files load on first play.</figcaption>
    </figure>
  );
}
