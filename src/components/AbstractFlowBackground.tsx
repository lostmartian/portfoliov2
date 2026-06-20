"use client";

import React, { useMemo } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// Dynamically import MeshGradient with SSR disabled to prevent WebGL/Canvas server-side build issues
const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.MeshGradient),
  { ssr: false }
);

interface AbstractFlowBackgroundProps {
  title: string;
  description: string;
  categories?: string[];
  speed?: number;
}

// Helper to convert HSL values to RGBA format (required for transparency support in WebGL)
function hslToRgba(h: number, s: number, l: number, a: number): string {
  l /= 100;
  const k = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const kVal = (n + h / 30) % 12;
    const color = l - k * Math.max(Math.min(kVal - 3, 9 - kVal, 1), -1);
    return Math.round(255 * color);
  };
  return `rgba(${f(0)}, ${f(8)}, ${f(4)}, ${a})`;
}

export default function AbstractFlowBackground({ title, description, categories, speed: speedProp }: AbstractFlowBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const meshStyle = useMemo(() => {
    const text = `${title} ${description}`;

    // Deterministic hash function
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    // Determine category configuration and base color
    const primaryCategory = (categories || []).map(c => c.toLowerCase()).join(" ");
    
    let category: "design" | "engineering" | "philosophy" = "engineering";
    if (primaryCategory.includes("design")) {
      category = "design";
    } else if (
      primaryCategory.includes("engineer") || 
      primaryCategory.includes("tech") || 
      primaryCategory.includes("code") ||
      primaryCategory.includes("quant")
    ) {
      category = "engineering";
    } else {
      category = "philosophy"; // Default to philosophy
    }

    // Configure distinct WebGL parameter ranges for each category (widened for maximum variety)
    const ranges = {
      // Design (Creative/Dynamic): Wide range of speed and extreme organic distortion / swirl configurations
      design: {
        speedMin: 0.50, speedMax: 0.90,
        distortionMin: 0.30, distortionMax: 1.00,
        swirlMin: 0.20, swirlMax: 1.00,
        grainMixerMin: 0.10, grainMixerMax: 0.35,
        grainOverlayMin: 0.04, grainOverlayMax: 0.16,
      },
      // Engineering (Tech/Structured): Ranging from straight/sleek digital lines to moderate flowing curtains
      engineering: {
        speedMin: 0.30, speedMax: 0.60,
        distortionMin: 0.15, distortionMax: 0.80,
        swirlMin: 0.05, swirlMax: 0.70,
        grainMixerMin: 0.00, grainMixerMax: 0.15,
        grainOverlayMin: 0.00, grainOverlayMax: 0.08,
      },
      // Philosophy (Contemplative/Cosmic): Ranging from deep cosmic static pools to slow drifting spirals
      philosophy: {
        speedMin: 0.15, speedMax: 0.35,
        distortionMin: 0.20, distortionMax: 0.75,
        swirlMin: 0.10, swirlMax: 0.60,
        grainMixerMin: 0.15, grainMixerMax: 0.40,
        grainOverlayMin: 0.08, grainOverlayMax: 0.25,
      }
    }[category];

    // Interpolate config values deterministically based on hash to give each card unique dynamics
    const speed = speedProp !== undefined ? speedProp : ranges.speedMin + ((hash % 100) / 100) * (ranges.speedMax - ranges.speedMin);
    const distortion = ranges.distortionMin + (((hash >> 2) % 100) / 100) * (ranges.distortionMax - ranges.distortionMin);
    const swirl = ranges.swirlMin + (((hash >> 4) % 100) / 100) * (ranges.swirlMax - ranges.swirlMin);
    const grainMixer = ranges.grainMixerMin + (((hash >> 6) % 100) / 100) * (ranges.grainMixerMax - ranges.grainMixerMin);
    const grainOverlay = ranges.grainOverlayMin + (((hash >> 8) % 100) / 100) * (ranges.grainOverlayMax - ranges.grainOverlayMin);

    // Calculate dynamic hues inside the category's distinct aurora color theme
    let baseHue = 210;
    let h1 = 0, h2 = 0, h3 = 0, h4 = 0;

    if (category === "design") {
      baseHue = 240 + (hash % 60); // Base purple/magenta family
      h1 = (baseHue - 35 + (hash % 20) + 360) % 360;       // Indigo/Violet
      h2 = (baseHue - 10 + ((hash >> 2) % 20) + 360) % 360; // Violet/Purple
      h3 = (baseHue + 15 + ((hash >> 4) % 20) + 360) % 360; // Orchid/Magenta
      h4 = (baseHue + 40 + ((hash >> 6) % 20) + 360) % 360; // Hot Pink/Rose
    } else if (category === "engineering") {
      baseHue = 185 + (hash % 30); // Base cyan/blue family
      h1 = (baseHue - 45 + (hash % 15) + 360) % 360;       // Aurora Green/Teal
      h2 = (baseHue - 15 + ((hash >> 2) % 15) + 360) % 360; // Teal/Cyan
      h3 = (baseHue + 15 + ((hash >> 4) % 15) + 360) % 360; // Sky/Royal Blue
      h4 = (baseHue + 45 + ((hash >> 6) % 15) + 360) % 360; // Indigo/Purple
    } else {
      baseHue = 25 + (hash % 30); // Base orange/gold family
      h1 = (baseHue - 35 + (hash % 15) + 360) % 360;       // Crimson Red
      h2 = (baseHue - 10 + ((hash >> 2) % 15) + 360) % 360;  // Orange-Red
      h3 = (baseHue + 15 + ((hash >> 4) % 15) + 360) % 360;  // Warm Gold/Amber
      h4 = (baseHue + 35 + ((hash >> 6) % 15) + 360) % 360;  // Sunny Yellow/Gold
    }

    const isDark = !mounted || resolvedTheme === "dark";

    // 2 Lights (high lightness, transparent) and 2 Brights (medium-lightness, slightly opaque)
    // Light Color 1: high lightness, low alpha (0.35 - 0.49)
    const s1 = isDark ? 70 + (hash % 10) : 60 + (hash % 15);
    const l1 = isDark ? 75 + (hash % 6) : 85 + (hash % 6);
    const a1 = 0.35 + ((hash % 15) / 100);

    // Light Color 2: high lightness, low alpha (0.35 - 0.49)
    const s2 = isDark ? 65 + ((hash >> 2) % 10) : 55 + ((hash >> 2) % 15);
    const l2 = isDark ? 77 + ((hash >> 2) % 6) : 87 + ((hash >> 2) % 6);
    const a2 = 0.35 + (((hash >> 2) % 15) / 100);

    // Bright Color 3: rich/saturated, very bright and nearly opaque (0.90 - 0.99)
    const s3 = isDark ? 95 + ((hash >> 4) % 6) : 90 + ((hash >> 4) % 10);
    const l3 = isDark ? 52 + ((hash >> 4) % 6) : 62 + ((hash >> 4) % 6);
    const a3 = 0.90 + (((hash >> 4) % 10) / 100);

    // Bright Color 4: rich/saturated, very bright and nearly opaque (0.90 - 0.99)
    const s4 = isDark ? 95 + ((hash >> 6) % 6) : 90 + ((hash >> 6) % 10);
    const l4 = isDark ? 54 + ((hash >> 6) % 6) : 64 + ((hash >> 6) % 6);
    const a4 = 0.90 + (((hash >> 6) % 10) / 100);

    // Convert category HSL values to standard RGBA strings for WebGL compat
    const rgba1 = hslToRgba(h1, s1, l1, a1);
    const rgba2 = hslToRgba(h2, s2, l2, a2);
    const rgba3 = hslToRgba(h3, s3, l3, a3);
    const rgba4 = hslToRgba(h4, s4, l4, a4);

    return {
      colors: [rgba1, rgba2, rgba3, rgba4],
      speed,
      distortion,
      swirl,
      grainMixer,
      grainOverlay
    };
  }, [title, description, resolvedTheme, mounted, speedProp, categories]);

  // Render a clean matching fallback during SSR hydration
  if (!mounted) {
    return <div className="absolute inset-0 w-full h-full z-0 bg-slate-100 dark:bg-[#0b0c10]" />;
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Container scales up slightly on card hover for dynamic movement */}
      <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
        <MeshGradient
          colors={meshStyle.colors}
          distortion={meshStyle.distortion}
          swirl={meshStyle.swirl}
          speed={meshStyle.speed}
          grainMixer={meshStyle.grainMixer}
          grainOverlay={meshStyle.grainOverlay}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
