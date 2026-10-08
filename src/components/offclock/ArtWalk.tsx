"use client";

import Image from "next/image";
import type { ArtPiece } from "@/data/art";
import ScrollScene from "@/components/story/ScrollScene";
import GenerativeTile from "@/components/ui/GenerativeTile";
import { devaNum } from "@/components/ui/deva";

/**
 * A gallery walk: each piece rises to fill the wall as you scroll, then makes
 * way for the next. Captions stay small, like a museum label.
 */
export default function ArtWalk({ pieces }: { pieces: ArtPiece[] }) {
  const n = pieces.length;
  if (!n) return null;
  return (
    <ScrollScene length={n * 0.85 + 0.6}>
      {(p) => {
        const cur = p * n;
        const idx = Math.min(n - 1, Math.floor(cur));
        const piece = pieces[idx];
        return (
          <div className="h-full grid grid-rows-[1fr_auto] pt-24 pb-8">
            <div className="relative min-h-0">
              {pieces.map((pc, i) => {
                const v = Math.max(0, 1 - Math.abs(cur - (i + 0.5)) * 1.7);
                if (v <= 0) return null;
                const aspect = pc.size === "wide" ? "aspect-[4/3]" : pc.size === "tall" ? "aspect-[3/4]" : "aspect-square";
                return (
                  <div
                    key={pc.slug}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: v, transform: `translateY(${(i + 0.5 - cur) * 60}px) scale(${0.92 + 0.08 * v})` }}
                  >
                    <div className="h-full max-h-full max-w-full flex items-center">
                      <div className="border border-foreground/30 bg-card-bg p-3 sm:p-4 shadow-[0_30px_60px_-40px_rgba(40,20,10,0.45)] h-full max-h-full">
                        <div className={`relative h-full ${aspect} max-w-[80vw] overflow-hidden`}>
                          {pc.image ? (
                            <Image src={pc.image} alt={`${pc.title}, ${pc.medium}`} fill sizes="80vw" className="object-cover" />
                          ) : (
                            <GenerativeTile seed={pc.slug} className="absolute inset-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-end justify-between gap-6 pt-6">
              <div key={piece.slug} className="rise">
                <p className="font-display text-3xl sm:text-4xl leading-none">{piece.title}</p>
                <p className="label mt-2">{piece.medium} · {piece.year}</p>
                {piece.note && <p className="text-[14px] text-muted mt-2 max-w-md">{piece.note}</p>}
              </div>
              <p className="deva text-accent text-3xl sm:text-5xl leading-none shrink-0">
                {devaNum(String(idx + 1).padStart(2, "0"))}
                <span className="text-muted text-lg sm:text-2xl"> / {devaNum(String(n).padStart(2, "0"))}</span>
              </p>
            </div>
          </div>
        );
      }}
    </ScrollScene>
  );
}
