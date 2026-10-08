"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ArtPiece } from "@/data/art";
import GenerativeTile from "@/components/ui/GenerativeTile";

const ASPECT: Record<NonNullable<ArtPiece["size"]>, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

function Piece({ piece, className = "" }: { piece: ArtPiece; className?: string }) {
  return piece.image ? (
    <Image src={piece.image} alt={`${piece.title} — ${piece.medium}`} fill sizes="(max-width: 768px) 100vw, 33vw" className={`object-cover ${className}`} />
  ) : (
    <GenerativeTile seed={piece.slug} className={`absolute inset-0 ${className}`} />
  );
}

export default function ArtGallery({ pieces }: { pieces: ArtPiece[] }) {
  const [active, setActive] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + pieces.length) % pieces.length)),
    [pieces.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, step]);

  const current = active !== null ? pieces[active] : null;

  return (
    <>
      <div className="columns-1 sm:columns-2 gap-5 [&>*]:mb-5">
        {pieces.map((piece, i) => (
          <button
            key={piece.slug}
            onClick={() => setActive(i)}
            className="group relative block w-full break-inside-avoid text-left cursor-zoom-in"
            aria-label={`Open ${piece.title}`}
          >
            <div className="surface p-1.5 group-hover:border-accent"><div className={`relative overflow-hidden ${ASPECT[piece.size ?? "square"]}`}>
              <Piece piece={piece} className="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-display text-xl leading-tight">{piece.title}</p>
                <p className="label !text-white/70 mt-1">{piece.medium} · {piece.year}</p>
              </div>
            </div></div>
          </button>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setActive(null)}
        >
          <button className="absolute top-5 right-5 p-2 text-white/80 hover:bg-white/10 cursor-pointer" onClick={() => setActive(null)} aria-label="Close">
            <X className="w-6 h-6" />
          </button>
          <button className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:bg-white/10 cursor-pointer" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:bg-white/10 cursor-pointer" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">
            <ChevronRight className="w-7 h-7" />
          </button>

          <div className="relative w-full max-w-3xl aspect-[4/5] sm:aspect-[4/3] max-h-[70vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <Piece piece={current} className="!object-contain" />
          </div>
          <div className="mt-5 text-center text-white" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-3xl">{current.title}</p>
            <p className="label !text-white/60 mt-1">{current.medium} · {current.year}</p>
            {current.note && <p className="mt-3 text-sm text-white/70 max-w-md mx-auto">{current.note}</p>}
          </div>
        </div>
      )}
    </>
  );
}
