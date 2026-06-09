"use client";

import React from "react";
import { Play, Pause } from "lucide-react";

interface AudioComparisonPlayerProps {
  original: string;
  compressed: string;
}

export default function AudioComparisonPlayer({ original, compressed }: AudioComparisonPlayerProps) {
  const originalRef = React.useRef<HTMLAudioElement>(null);
  const compressedRef = React.useRef<HTMLAudioElement>(null);

  const [activeSource, setActiveSource] = React.useState<"original" | "compressed">("compressed");
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const activeAudioRef = activeSource === "original" ? originalRef : compressedRef;
  const inactiveAudioRef = activeSource === "original" ? compressedRef : originalRef;

  React.useEffect(() => {
    const orig = originalRef.current;
    const comp = compressedRef.current;
    if (!orig || !comp) return;

    const handleTimeUpdate = () => {
      const active = activeSource === "original" ? orig : comp;
      setCurrentTime(active.currentTime);
    };

    const handleLoadedMetadata = () => {
      const active = activeSource === "original" ? orig : comp;
      setDuration(active.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      orig.currentTime = 0;
      comp.currentTime = 0;
    };

    orig.addEventListener("timeupdate", handleTimeUpdate);
    comp.addEventListener("timeupdate", handleTimeUpdate);
    orig.addEventListener("loadedmetadata", handleLoadedMetadata);
    comp.addEventListener("loadedmetadata", handleLoadedMetadata);
    orig.addEventListener("ended", handleEnded);
    comp.addEventListener("ended", handleEnded);

    return () => {
      orig.removeEventListener("timeupdate", handleTimeUpdate);
      comp.removeEventListener("timeupdate", handleTimeUpdate);
      orig.removeEventListener("loadedmetadata", handleLoadedMetadata);
      comp.removeEventListener("loadedmetadata", handleLoadedMetadata);
      orig.removeEventListener("ended", handleEnded);
      comp.removeEventListener("ended", handleEnded);
    };
  }, [activeSource]);

  const togglePlay = () => {
    const active = activeAudioRef.current;
    const inactive = inactiveAudioRef.current;
    if (!active || !inactive) return;

    if (isPlaying) {
      active.pause();
      inactive.pause();
    } else {
      active.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const switchSource = (source: "original" | "compressed") => {
    if (source === activeSource) return;

    const currentAudio = activeAudioRef.current;
    const targetAudio = source === "original" ? originalRef.current : compressedRef.current;

    if (!currentAudio || !targetAudio) return;

    const time = currentAudio.currentTime;
    
    currentAudio.pause();
    targetAudio.currentTime = time;

    if (isPlaying) {
      targetAudio.play().catch(console.error);
    }

    setActiveSource(source);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (originalRef.current) originalRef.current.currentTime = val;
    if (compressedRef.current) compressedRef.current.currentTime = val;
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="my-8 py-4 px-2 border-y border-border/10 w-full max-w-full overflow-hidden font-mono">
      <audio ref={originalRef} src={original} preload="metadata" />
      <audio ref={compressedRef} src={compressed} preload="metadata" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        {/* Play & Time controls */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-3 py-1 bg-foreground/[0.04] border border-border/20 hover:bg-foreground/[0.08] hover:border-foreground/30 transition-all rounded text-[10px] uppercase tracking-wider cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-foreground" />
                <span>PAUSE_</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-foreground ml-0.5" />
                <span>PLAY_</span>
              </>
            )}
          </button>
          <span className="text-[10px] text-foreground/50">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex-grow min-w-0 px-2 flex items-center">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-[2px] bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-foreground/60 hover:accent-foreground transition-all focus:outline-none"
          />
        </div>

        {/* Source Selector */}
        <div className="flex items-center gap-2 flex-shrink-0 text-[10px] uppercase tracking-wider font-semibold">
          <button
            onClick={() => switchSource("original")}
            className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
              activeSource === "original"
                ? "bg-foreground/10 border-foreground/30 text-foreground"
                : "border-transparent text-foreground/40 hover:text-foreground/60"
            }`}
          >
            ORIGINAL
          </button>
          <span className="text-foreground/20">/</span>
          <button
            onClick={() => switchSource("compressed")}
            className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
              activeSource === "compressed"
                ? "bg-foreground/10 border-foreground/30 text-foreground"
                : "border-transparent text-foreground/40 hover:text-foreground/60"
            }`}
          >
            COMPRESSED
          </button>
        </div>
      </div>
    </div>
  );
}
