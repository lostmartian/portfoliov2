"use client";

import React from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface AudioMetadata {
  size: string;
  format: string;
  bitrate: string;
  sampleRate: string;
  channels: string;
}

interface AudioComparisonPlayerProps {
  original: string;
  originalTitle?: string;
  originalDesc?: string;
  compressed: string;
  compressedTitle?: string;
  compressedDesc?: string;
  fidelity?: string; // Optional fidelity string
}

// Generate smooth, deterministic wave peaks based on the filename seed
// to avoid downloading massive 50MB+ audio files just to draw a visual waveform.
const generateDeterministicPeaks = (seedString: string, count: number): number[] => {
  let seed = 0;
  for (let i = 0; i < seedString.length; i++) {
    seed = (seed << 5) - seed + seedString.charCodeAt(i);
    seed |= 0;
  }

  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const peaks: number[] = [];
  let current = 0.3 + random() * 0.4;
  for (let i = 0; i < count; i++) {
    const target = 0.15 + random() * 0.7;
    current = current * 0.65 + target * 0.35;
    peaks.push(current);
  }
  return peaks;
};

export default function AudioComparisonPlayer({
  original,
  originalTitle = "Original Audio",
  originalDesc = "Uncompressed source",
  compressed,
  compressedTitle = "Compressed Audio",
  compressedDesc = "Compressed representation",
  fidelity,
}: AudioComparisonPlayerProps) {
  const originalRef = React.useRef<HTMLAudioElement>(null);
  const compressedRef = React.useRef<HTMLAudioElement>(null);

  const [mounted, setMounted] = React.useState(false);
  const [activeSource, setActiveSource] = React.useState<"original" | "compressed">("compressed");
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const [originalPeaks, setOriginalPeaks] = React.useState<number[]>([]);
  const [compressedPeaks, setCompressedPeaks] = React.useState<number[]>([]);

  // Metadata extracted dynamically from WAV header bytes
  const [originalMeta, setOriginalMeta] = React.useState<AudioMetadata | null>(null);
  const [compressedMeta, setCompressedMeta] = React.useState<AudioMetadata | null>(null);

  // Set mounted on client to prevent SSR hydration mismatches
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch only the first 44 bytes to parse WAV header metadata and load waveforms
  React.useEffect(() => {
    if (!mounted) return;
    let isMounted = true;

    const loadMetaFromHeader = async (
      url: string,
      setMeta: React.Dispatch<React.SetStateAction<AudioMetadata | null>>,
      isCompressed: boolean
    ) => {
      try {
        // Fetch only first 44 bytes using standard HTTP Range Request
        const response = await fetch(url, {
          headers: { Range: "bytes=0-43" },
        });
        const arrayBuffer = await response.arrayBuffer();

        if (arrayBuffer.byteLength < 44) {
          throw new Error("Invalid WAV header size");
        }

        const view = new DataView(arrayBuffer);
        
        // RIFF WAV Header verification
        const isRiff = view.getUint32(0, false) === 0x52494646; // "RIFF"
        const isWave = view.getUint32(8, false) === 0x57415645; // "WAVE"

        if (isRiff && isWave) {
          const riffChunkSize = view.getUint32(4, true);
          const fileSize = riffChunkSize + 8;
          const channels = view.getUint16(22, true);
          const sampleRate = view.getUint32(24, true);
          const byteRate = view.getUint32(28, true);
          const bitsPerSample = view.getUint16(34, true);

          const sizeMB = (fileSize / (1024 * 1024)).toFixed(2) + " MB";
          const kbps = Math.round((byteRate * 8) / 1000) + " kbps";
          const khz = (sampleRate / 1000).toFixed(1) + " kHz";
          const channelStr = channels === 1 ? "Mono" : "Stereo";
          const format = isCompressed ? "AudioTQ (6+1b)" : `WAV PCM (${bitsPerSample}-bit)`;

          if (isMounted) {
            setMeta({
              size: sizeMB,
              format,
              bitrate: kbps,
              sampleRate: khz,
              channels: channelStr,
            });
          }
        } else {
          throw new Error("Not a standard RIFF-WAVE format");
        }
      } catch (err) {
        console.error("Range header fetch failed or not WAV, using fallback calculation:", err);
        // Fallback metadata mapped to the project files profile
        if (isMounted) {
          setMeta({
            size: isCompressed ? "17.64 MB" : "52.93 MB",
            format: isCompressed ? "AudioTQ (6+1b)" : "WAV PCM (24-bit)",
            bitrate: isCompressed ? "471 kbps" : "1411 kbps",
            sampleRate: "44.1 kHz",
            channels: "Stereo",
          });
        }
      }
    };

    loadMetaFromHeader(original, setOriginalMeta, false);
    loadMetaFromHeader(compressed, setCompressedMeta, true);

    // Generate waveforms deterministically to avoid downloading 70MB+ data
    setOriginalPeaks(generateDeterministicPeaks(original, 70));
    setCompressedPeaks(generateDeterministicPeaks(compressed, 70));

    return () => {
      isMounted = false;
    };
  }, [original, compressed, mounted]);

  React.useEffect(() => {
    if (!mounted) return;
    const orig = originalRef.current;
    const comp = compressedRef.current;
    if (!orig || !comp) return;

    // Sync initial mute state
    orig.muted = activeSource !== "original";
    comp.muted = activeSource !== "compressed";

    // Set duration if already loaded
    if (orig.duration) setDuration(orig.duration);
    else if (comp.duration) setDuration(comp.duration);

    const handleTimeUpdate = () => {
      const active = activeSource === "original" ? orig : comp;
      const inactive = activeSource === "original" ? comp : orig;

      setCurrentTime(active.currentTime);

      // Actively prevent drift (keep within 50ms)
      if (Math.abs(orig.currentTime - comp.currentTime) > 0.05) {
        inactive.currentTime = active.currentTime;
      }
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
  }, [activeSource, mounted]);

  const togglePlay = () => {
    const orig = originalRef.current;
    const comp = compressedRef.current;
    if (!orig || !comp) return;

    if (isPlaying) {
      orig.pause();
      comp.pause();
      setIsPlaying(false);
    } else {
      const active = activeSource === "original" ? orig : comp;
      const inactive = activeSource === "original" ? comp : orig;
      
      // Align timestamps before starting
      inactive.currentTime = active.currentTime;
      orig.muted = activeSource !== "original";
      comp.muted = activeSource !== "compressed";

      Promise.all([orig.play(), comp.play()])
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Dual-play failed, attempting active stream only:", err);
          active.play().then(() => setIsPlaying(true)).catch(console.error);
        });
    }
  };

  const handleListenClick = (source: "original" | "compressed") => {
    const orig = originalRef.current;
    const comp = compressedRef.current;
    if (!orig || !comp) return;

    if (source === activeSource) {
      togglePlay();
    } else {
      const currentActive = activeSource === "original" ? orig : comp;
      const newActive = source === "original" ? orig : comp;

      // Swap timestamps & mute configuration
      newActive.currentTime = currentActive.currentTime;
      orig.muted = source !== "original";
      comp.muted = source !== "compressed";
      setActiveSource(source);

      // Play if not playing yet
      if (!isPlaying) {
        Promise.all([orig.play(), comp.play()])
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Playback transition failed:", err);
            newActive.play().then(() => setIsPlaying(true)).catch(console.error);
          });
      }
    }
  };

  const handleSeekPercent = (percent: number) => {
    const newTime = percent * duration;
    setCurrentTime(newTime);
    if (originalRef.current) originalRef.current.currentTime = newTime;
    if (compressedRef.current) compressedRef.current.currentTime = newTime;
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const renderWaveform = (peaks: number[], source: "original" | "compressed") => {
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
    const isActive = activeSource === source;

    return (
      <div
        className={`relative h-14 w-full flex items-end gap-[2px] transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-40 hover:opacity-60"
        }`}
      >
        {peaks.length === 0 ? (
          // Static loading placeholder that is hydration-safe (no math/dynamic animation delays)
          <div className="w-full h-full flex items-end justify-between gap-[2px]">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="flex-grow bg-foreground/10 rounded-sm"
                style={{
                  height: "15%",
                }}
              />
            ))}
          </div>
        ) : (
          peaks.map((peak, index) => {
            const barPercent = (index / peaks.length) * 100;
            const isPlayed = barPercent <= progressPercent;

            return (
              <div
                key={index}
                className={`flex-grow rounded-sm transition-colors duration-150`}
                style={{
                  height: `${peak * 100}%`,
                  backgroundColor: isPlayed
                    ? isActive
                      ? "var(--color-foreground)" // Bright active theme color
                      : "rgba(var(--foreground-rgb), 0.4)" // Grayed out active
                    : "rgba(var(--foreground-rgb), 0.1)", // Unplayed
                }}
              />
            );
          })
        )}

        {/* Floating progress marker */}
        {peaks.length > 0 && (
          <div
            className="absolute top-0 bottom-0 w-[1.5px] bg-foreground pointer-events-none transition-all duration-75"
            style={{ left: `${progressPercent}%` }}
          />
        )}
      </div>
    );
  };

  // Static shell to match server-side HTML and client-side initial render (hydration safety)
  if (!mounted) {
    return (
      <div className="my-10 p-6 bg-foreground/[0.02] border border-border/20 rounded-xl w-full max-w-full overflow-hidden font-mono">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Static Original Card */}
          <div className="flex flex-col justify-between p-5 border border-border/10 bg-foreground/[0.005] rounded-lg opacity-80">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[9px] uppercase tracking-widest text-foreground/40 font-bold">SOURCE_01</span>
                <span className="text-[10px] text-foreground/30">--:-- / --:--</span>
              </div>
              <h4 className="text-sm font-semibold text-foreground tracking-tight leading-snug">{originalTitle}</h4>
              <p className="text-[11px] text-foreground/50 mt-1 mb-6 leading-relaxed">{originalDesc}</p>
            </div>
            <div className="space-y-4">
              <div className="h-14 w-full flex items-end gap-[2px] opacity-20">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div key={i} className="flex-grow bg-foreground/10 rounded-sm" style={{ height: "15%" }} />
                ))}
              </div>
              <div className="w-full py-2.5 rounded border border-border/15 text-[10px] uppercase tracking-wider font-semibold text-foreground/30 flex items-center justify-center">
                LOADING...
              </div>
            </div>
          </div>
          {/* Static Compressed Card */}
          <div className="flex flex-col justify-between p-5 border border-border/10 bg-foreground/[0.005] rounded-lg opacity-80">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[9px] uppercase tracking-widest text-foreground/40 font-bold">SOURCE_02</span>
                <span className="text-[10px] text-foreground/30">--:-- / --:--</span>
              </div>
              <h4 className="text-sm font-semibold text-foreground tracking-tight leading-snug">{compressedTitle}</h4>
              <p className="text-[11px] text-foreground/50 mt-1 mb-6 leading-relaxed">{compressedDesc}</p>
            </div>
            <div className="space-y-4">
              <div className="h-14 w-full flex items-end gap-[2px] opacity-20">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div key={i} className="flex-grow bg-foreground/10 rounded-sm" style={{ height: "15%" }} />
                ))}
              </div>
              <div className="w-full py-2.5 rounded border border-border/15 text-[10px] uppercase tracking-wider font-semibold text-foreground/30 flex items-center justify-center">
                LOADING...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 p-6 bg-foreground/[0.02] border border-border/20 rounded-xl w-full max-w-full overflow-hidden font-mono">
      <audio ref={originalRef} src={original} preload="auto" />
      <audio ref={compressedRef} src={compressed} preload="auto" />

      {/* Side-by-side blocks: columns on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Original Audio Block */}
        <div
          className={`flex flex-col justify-between p-5 border rounded-lg transition-all duration-300 ${
            activeSource === "original"
              ? "bg-foreground/[0.03] border-foreground/25 shadow-sm"
              : "bg-foreground/[0.005] border-border/10 opacity-80"
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-[9px] uppercase tracking-widest text-foreground/40 font-bold">
                SOURCE_01
              </span>
              <span className="text-[10px] text-foreground/50">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-foreground tracking-tight leading-snug">
              {originalTitle}
            </h4>
            <p className="text-[11px] text-foreground/50 mt-1 mb-6 leading-relaxed">
              {originalDesc}
            </p>
          </div>

          <div className="space-y-4">
            {/* Waveform container with click-to-seek */}
            <div 
              onClick={(e) => {
                if (duration === 0) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPercent = (e.clientX - rect.left) / rect.width;
                handleSeekPercent(clickPercent);
              }}
              className="cursor-pointer"
            >
              {renderWaveform(originalPeaks, "original")}
            </div>

            <button
              onClick={() => handleListenClick("original")}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded text-[10px] uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                activeSource === "original"
                  ? isPlaying
                    ? "bg-foreground text-background border-foreground hover:bg-foreground/90"
                    : "bg-foreground/5 border-foreground/30 text-foreground hover:bg-foreground/10"
                  : "bg-transparent border-border/15 text-foreground/50 hover:text-foreground hover:border-border/30"
              }`}
            >
              {activeSource === "original" && isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PAUSE_</span>
                </>
              ) : activeSource === "original" ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>PLAY_</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>LISTEN_</span>
                </>
              )}
            </button>

            {/* Dynamic Metadata Footer */}
            {originalMeta && (
              <div className="mt-5 pt-4 border-t border-border/10 grid grid-cols-2 gap-y-3 gap-x-2 sm:grid-cols-5 text-[9px] uppercase tracking-wider text-foreground/40 text-left">
                <div>
                  <div className="text-[8px] text-foreground/30 mb-0.5">FORMAT</div>
                  <div className="font-semibold text-foreground/60 truncate">{originalMeta.format}</div>
                </div>
                <div>
                  <div className="text-[8px] text-foreground/30 mb-0.5">SIZE</div>
                  <div className="font-semibold text-foreground/60 truncate">{originalMeta.size}</div>
                </div>
                <div>
                  <div className="text-[8px] text-foreground/30 mb-0.5">BITRATE</div>
                  <div className="font-semibold text-foreground/60 truncate">{originalMeta.bitrate}</div>
                </div>
                <div>
                  <div className="text-[8px] text-foreground/30 mb-0.5">RATE</div>
                  <div className="font-semibold text-foreground/60 truncate">{originalMeta.sampleRate}</div>
                </div>
                <div>
                  <div className="text-[8px] text-foreground/30 mb-0.5">CHANNELS</div>
                  <div className="font-semibold text-foreground/60 truncate">{originalMeta.channels}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compressed Audio Block */}
        <div
          className={`flex flex-col justify-between p-5 border rounded-lg transition-all duration-300 ${
            activeSource === "compressed"
              ? "bg-foreground/[0.03] border-foreground/25 shadow-sm"
              : "bg-foreground/[0.005] border-border/10 opacity-80"
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-[9px] uppercase tracking-widest text-foreground/40 font-bold">
                SOURCE_02
              </span>
              <span className="text-[10px] text-foreground/50">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-foreground tracking-tight leading-snug">
              {compressedTitle}
            </h4>
            <p className="text-[11px] text-foreground/50 mt-1 mb-6 leading-relaxed">
              {compressedDesc}
            </p>
          </div>

          <div className="space-y-4">
            {/* Waveform container with click-to-seek */}
            <div 
              onClick={(e) => {
                if (duration === 0) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPercent = (e.clientX - rect.left) / rect.width;
                handleSeekPercent(clickPercent);
              }}
              className="cursor-pointer"
            >
              {renderWaveform(compressedPeaks, "compressed")}
            </div>

            <button
              onClick={() => handleListenClick("compressed")}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded text-[10px] uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                activeSource === "compressed"
                  ? isPlaying
                    ? "bg-foreground text-background border-foreground hover:bg-foreground/90"
                    : "bg-foreground/5 border-foreground/30 text-foreground hover:bg-foreground/10"
                  : "bg-transparent border-border/15 text-foreground/50 hover:text-foreground hover:border-border/30"
              }`}
            >
              {activeSource === "compressed" && isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PAUSE_</span>
                </>
              ) : activeSource === "compressed" ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>PLAY_</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>LISTEN_</span>
                </>
              )}
            </button>

            {/* Dynamic Metadata Footer */}
            {compressedMeta && (
              <div className="mt-5 pt-4 border-t border-border/10 grid grid-cols-2 gap-y-3 gap-x-2 sm:grid-cols-5 text-[9px] uppercase tracking-wider text-foreground/40 text-left">
                <div>
                  <div className="text-[8px] text-foreground/30 mb-0.5">FORMAT</div>
                  <div className="font-semibold text-foreground/60 truncate">{compressedMeta.format}</div>
                </div>
                <div>
                  <div className="text-[8px] text-foreground/30 mb-0.5">SIZE</div>
                  <div className="font-semibold text-foreground/60 truncate">{compressedMeta.size}</div>
                </div>
                <div>
                  <div className="text-[8px] text-foreground/30 mb-0.5">BITRATE</div>
                  <div className="font-semibold text-foreground/60 truncate">{compressedMeta.bitrate}</div>
                </div>
                <div>
                  <div className="text-[8px] text-foreground/30 mb-0.5">RATE</div>
                  <div className="font-semibold text-foreground/60 truncate">{compressedMeta.sampleRate}</div>
                </div>
                <div>
                  <div className="text-[8px] text-foreground/30 mb-0.5">CHANNELS</div>
                  <div className="font-semibold text-foreground/60 truncate">{compressedMeta.channels}</div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
