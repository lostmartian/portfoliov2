"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Portrait with a personality: the real photo (contrast-boosted) sits
 * calmly in its frame — until you hover, and the sus dog takes over.
 * Tap works on touch devices. Reverts when the cursor leaves.
 */
export default function PortraitWithSus() {
  const [sus, setSus] = useState(false);

  return (
    <figure className="group relative w-full max-w-[280px] select-none">
      <div
        className="relative aspect-[4/5] overflow-hidden border border-border bg-card-bg shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35)] cursor-pointer"
        onMouseEnter={() => setSus(true)}
        onMouseLeave={() => setSus(false)}
        onClick={() => setSus((v) => !v)}
        role="button"
        aria-pressed={sus}
        aria-label={sus ? "Show portrait" : "Show the sus dog"}
      >
        {/* Real photo — contrast lifted */}
        <Image
          src="/me/profile-photo.png"
          alt="Sahil Gangurde"
          fill
          sizes="(max-width: 768px) 70vw, 280px"
          className="object-cover transition-opacity duration-200"
          style={{
            opacity: sus ? 0 : 1,
            filter: "contrast(1.18) saturate(1.08) brightness(1.02)",
          }}
          priority
        />
        {/* The sus dog */}
        <Image
          src="/me/susdog.jpg"
          alt="The sus dog"
          fill
          sizes="(max-width: 768px) 70vw, 280px"
          className="object-cover transition-all duration-200"
          style={{
            opacity: sus ? 1 : 0,
            filter: "saturate(1.15)",
          }}
        />
      </div>

      {/* Caption strip */}
      <figcaption className="mt-4 text-center">
        <span className="text-sm text-foreground/60">
          {sus ? "Wait. That's not me." : "Chasing sunsets, debugging threads."}
        </span>
      </figcaption>
    </figure>
  );
}
