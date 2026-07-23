"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square } from "lucide-react";

interface BlogAudioPlayerProps {
  content: string;
  title: string;
  onActiveIndexChange?: (index: number | null) => void;
  activeIndex: number | null;
  onPlayingStateChange?: (isPlaying: boolean) => void;
}

// Clean markdown content to produce readable text blocks
export function extractSpeechBlocks(markdown: string): string[] {
  if (!markdown) return [];

  // Split by blank lines to find paragraphs/blocks
  const rawBlocks = markdown.split(/\n\s*\n/);
  const blocks: string[] = [];

  let inCodeBlock = false;

  for (let block of rawBlocks) {
    block = block.trim();
    if (!block) continue;

    // Toggle code block state
    if (block.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    // Ignore other code blocks, custom tags, or tables
    if (
      block.startsWith("<audio-comparison") ||
      block.startsWith("<Mermaid") ||
      block.startsWith("|") // tables
    ) {
      continue;
    }

    // Clean up inline formatting:
    // 1. Remove headings markup
    let clean = block.replace(/^#+\s+/, "");
    // 2. Remove list items symbols
    clean = clean.replace(/^[-*+]\s+/, "");
    clean = clean.replace(/^\d+\.\s+/, "");
    // 3. Remove images
    clean = clean.replace(/!\[.*?\]\(.*?\)/g, "");
    // 4. Remove links keep text
    clean = clean.replace(/\[(.*?)\]\(.*?\)/g, "$1");
    // 5. Remove bold/italic markup
    clean = clean.replace(/[\*_~`]+/g, "");
    // 6. Strip HTML tags
    clean = clean.replace(/<[^>]*>/g, "");

    clean = clean.trim();
    if (clean && clean.length > 5) {
      blocks.push(clean);
    }
  }

  return blocks;
}

export default function BlogAudioPlayer({
  content,
  title,
  onActiveIndexChange,
  activeIndex,
  onPlayingStateChange,
}: BlogAudioPlayerProps) {
  const [blocks, setBlocks] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [progress, setProgress] = useState(0);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);
  const spokenIndexRef = useRef<number | null>(null);
  const rateRef = useRef(1);
  const selectedVoiceRef = useRef("");

  // Report playing state change to parent
  useEffect(() => {
    if (onPlayingStateChange) {
      onPlayingStateChange(isPlaying);
    }
  }, [isPlaying, onPlayingStateChange]);

  // Initialize speech blocks
  useEffect(() => {
    setBlocks(extractSpeechBlocks(content));
  }, [content]);

  // Keep ref in sync
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Trigger play when activeIndex changes externally (e.g., user clicks paragraph)
  useEffect(() => {
    if (activeIndex !== null && activeIndex !== spokenIndexRef.current) {
      playBlock(activeIndex);
    }
  }, [activeIndex]);

  // Initialize SpeechSynthesis and voices
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
      
      const updateVoices = () => {
        if (!synthRef.current) return;
        const allVoices = synthRef.current.getVoices();
        
        // Filter for English voices that match common, high-quality system names
        let displayVoices = allVoices.filter((v) => {
          if (!v.lang.startsWith("en")) return false;
          const nameLower = v.name.toLowerCase();
          return (
            nameLower.includes("samantha") ||
            nameLower.includes("google us") ||
            nameLower.includes("siri") ||
            nameLower.includes("zira") ||
            nameLower.includes("david") ||
            nameLower.includes("natural")
          );
        });

        // Fallback to all English voices if our curated list is empty on this device
        if (displayVoices.length === 0) {
          displayVoices = allVoices.filter((v) => v.lang.startsWith("en"));
        }
        
        // Final fallback to all voices if no English voices found
        if (displayVoices.length === 0) {
          displayVoices = allVoices;
        }

        setVoices(displayVoices);
        
        // Select default/best voice
        if (displayVoices.length > 0) {
          const natural = displayVoices.find((v) => v.name.includes("Natural"));
          const google = displayVoices.find((v) => v.name.includes("Google"));
          const samantha = displayVoices.find((v) => v.name.includes("Samantha"));
          const first = displayVoices[0];
          const defaultVoice = (natural || google || samantha || first).name;
          setSelectedVoice(defaultVoice);
          selectedVoiceRef.current = defaultVoice;
        }
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Update progress bar
  useEffect(() => {
    if (blocks.length > 0 && activeIndex !== null) {
      setProgress(Math.round(((activeIndex + 1) / blocks.length) * 100));
    } else {
      setProgress(0);
    }
  }, [activeIndex, blocks]);

  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
    setIsPaused(false);
    spokenIndexRef.current = null;
    if (onActiveIndexChange) {
      onActiveIndexChange(null);
    }
  };

  const playBlock = (index: number) => {
    if (!synthRef.current || blocks.length === 0 || index >= blocks.length || index < 0) {
      stopSpeech();
      return;
    }

    synthRef.current.cancel();
    spokenIndexRef.current = index;

    if (onActiveIndexChange) {
      onActiveIndexChange(index);
    }

    const textToSpeak = blocks[index];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    // Set voice
    if (selectedVoiceRef.current) {
      const voice = voices.find((v) => v.name === selectedVoiceRef.current);
      if (voice) utterance.voice = voice;
    }

    // Set speed rate
    utterance.rate = rateRef.current;

    utterance.onend = () => {
      // Move to next block if we are still playing the current index
      if (activeIndexRef.current === index && isPlayingRef.current) {
        if (index + 1 < blocks.length) {
          playBlock(index + 1);
        } else {
          stopSpeech();
        }
      }
    };

    utterance.onerror = (e) => {
      // "interrupted" and "canceled" are standard control-flow states (e.g. when changing paragraphs or pausing)
      if (e.error !== "interrupted" && e.error !== "canceled") {
        console.error("Speech Synthesis Error:", e);
        stopSpeech();
      }
    };

    setIsPlaying(true);
    isPlayingRef.current = true;
    setIsPaused(false);
    synthRef.current.speak(utterance);
  };

  const handlePlayPause = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      if (isPaused) {
        synthRef.current.resume();
        setIsPaused(false);
      } else {
        synthRef.current.pause();
        setIsPaused(true);
      }
    } else {
      // Start playing from the beginning or active index
      playBlock(activeIndex !== null ? activeIndex : 0);
    }
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    rateRef.current = newRate;
    if (isPlayingRef.current && activeIndexRef.current !== null) {
      // Restart current block immediately with new rate
      playBlock(activeIndexRef.current);
    }
  };

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoice(voiceName);
    selectedVoiceRef.current = voiceName;
    if (isPlayingRef.current && activeIndexRef.current !== null) {
      // Restart current block immediately with new voice
      playBlock(activeIndexRef.current);
    }
  };

  if (blocks.length === 0) return null;

  return (
    <div className="relative flex items-center gap-1.5 select-none w-full text-foreground/80 font-mono text-[10px] sm:text-xs">
      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        className="flex items-center gap-1 hover:text-foreground text-foreground font-semibold cursor-pointer transition-colors"
      >
        {isPlaying && !isPaused ? (
          <Pause className="h-3 w-3 fill-current text-foreground" />
        ) : (
          <Play className="h-3 w-3 fill-current text-foreground" />
        )}
        <span className="text-[10px] sm:text-xs tracking-tight">{isPlaying && !isPaused ? "PAUSE" : isPaused ? "RESUME" : "PLAY"}</span>
      </button>

      {isPlaying && (
        <button
          onClick={stopSpeech}
          className="hover:text-red-500 cursor-pointer transition-colors p-0.5 flex items-center"
          title="Stop"
        >
          <Square className="h-2.5 w-2.5 fill-current text-red-500/80" />
        </button>
      )}

      <span className="text-[10px] text-foreground/20 hidden sm:inline">|</span>

      {/* Speed Dropdown */}
      <select
        value={rate}
        onChange={(e) => handleRateChange(parseFloat(e.target.value))}
        className="bg-transparent border-none text-foreground/50 hover:text-foreground outline-none font-mono cursor-pointer text-[9px] sm:text-[10px] hidden sm:inline-block"
      >
        <option value="1" className="bg-background text-foreground text-[10px]">1.0x</option>
        <option value="1.25" className="bg-background text-foreground text-[10px]">1.25x</option>
        <option value="1.5" className="bg-background text-foreground text-[10px]">1.5x</option>
        <option value="2" className="bg-background text-foreground text-[10px]">2.0x</option>
      </select>

      {/* Very thin bottom progress indicator pinned below */}
      {isPlaying && (
        <div className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-foreground/[0.04] rounded overflow-hidden">
          <div
            className="h-full bg-foreground/30 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
