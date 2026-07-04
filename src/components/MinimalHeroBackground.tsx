"use client";

import React from "react";

export default function MinimalHeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
      {/* Soft ambient radial glow to guide attention to the center */}
      <div 
        className="absolute inset-0 opacity-70 dark:opacity-50"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(var(--foreground-rgb), 0.08) 0%, transparent 65%)"
        }}
      />

      {/* Elegant, clean dot matrix grid */}
      <div 
        className="absolute inset-0 opacity-[0.12] dark:opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* Textured Matte Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
