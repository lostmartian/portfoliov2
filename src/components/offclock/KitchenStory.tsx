"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import type { Dish } from "@/data/kitchen";
import ScrollScene from "@/components/story/ScrollScene";
import GenerativeTile from "@/components/ui/GenerativeTile";
import { devaNum } from "@/components/ui/deva";

/** A Warli pot on three stones. It fills as you scroll through the dishes; steam builds. */
function Pot({ fill }: { fill: number }) {
  const level = 236 - fill * 92; // pot interior spans y≈144..236
  return (
    <svg viewBox="0 0 300 320" className="w-full h-auto max-h-[56svh] text-accent">
      <defs>
        <clipPath id="pot-inside">
          <path d="M70 150 Q 60 236 150 246 Q 240 236 230 150 Z" />
        </clipPath>
      </defs>
      {/* steam */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${128 + i * 22} 120 q-8 -14 0 -28 q8 -14 0 -28 q-8 -14 0 -28`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          pathLength={1}
          className="steam"
          style={{ opacity: 0.2 + fill * 0.8, animationDelay: `${-i * 0.7}s` }}
        />
      ))}
      {/* contents, with a wavy surface */}
      <g clipPath="url(#pot-inside)">
        <path
          d={`M50 ${level} q 25 -7 50 0 t 50 0 t 50 0 t 50 0 t 50 0 V 260 H 50 Z`}
          fill="currentColor"
          opacity="0.85"
          style={{ transition: "d 300ms" }}
        />
      </g>
      {/* the pot */}
      <path d="M70 150 Q 60 236 150 246 Q 240 236 230 150 Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M62 150 H 238" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {Array.from({ length: 8 }, (_, i) => (
        <polygon key={i} points={`${86 + i * 18},162 ${92 + i * 18},154 ${98 + i * 18},162`} fill="currentColor" opacity="0.5" />
      ))}
      {/* fire and three stones */}
      {[0, 1, 2, 3].map((i) => (
        <polygon key={i} points={`${118 + i * 18},282 ${126 + i * 18},${256 - (i % 2) * 8} ${134 + i * 18},282`} fill="var(--accent)" style={{ animation: `twinkle ${0.7 + i * 0.13}s ease-in-out infinite` }} />
      ))}
      <circle cx="100" cy="286" r="12" fill="var(--foreground)" opacity="0.8" />
      <circle cx="150" cy="290" r="11" fill="var(--foreground)" opacity="0.8" />
      <circle cx="200" cy="286" r="12" fill="var(--foreground)" opacity="0.8" />
      <line x1="10" x2="290" y1="300" y2="300" stroke="currentColor" />
    </svg>
  );
}

export default function KitchenStory({ dishes }: { dishes: Dish[] }) {
  const n = dishes.length;
  if (!n) return null;
  return (
    <ScrollScene length={n * 0.8 + 0.6}>
      {(p) => {
        const idx = Math.min(n - 1, Math.floor(p * n));
        const d = dishes[idx];
        return (
          <div className="h-full grid grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center pt-24 pb-8 lg:py-0">
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[220px] lg:max-w-[380px]">
                <Pot fill={Math.min(1, p * 1.05)} />
              </div>
              <p className="label mt-3">
                Course <span className="deva normal-case tracking-normal text-[13px] text-accent">{devaNum(idx + 1)}</span> of {n}
              </p>
            </div>
            <div key={d.slug} className="lg:col-span-7 rise min-h-0 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6 lg:gap-10 items-center">
              <div className="border border-foreground/30 p-2 bg-card-bg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {d.image ? (
                    <Image src={d.image} alt={d.title} fill sizes="40vw" className="object-cover" />
                  ) : (
                    <GenerativeTile seed={d.slug} className="absolute inset-0" />
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <p className="label">{d.cuisine}</p>
                <h2 className="text-4xl sm:text-5xl leading-[1]">{d.title}</h2>
                <p className="text-[16px] text-muted leading-relaxed">{d.note}</p>
                <p className="flex items-center gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{d.time}</span>
                  <span>{d.tags.map((t) => `#${t}`).join("  ")}</span>
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </ScrollScene>
  );
}
