"use client";

import React, { useMemo } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.MeshGradient),
  { ssr: false }
);

interface MonotoneShaderBackgroundProps {
  speed?: number;
  grainMixer?: number;
  grainOverlay?: number;
}

export default function MonotoneShaderBackground({
  speed: speedProp,
  grainMixer: grainMixerProp,
  grainOverlay: grainOverlayProp,
}: MonotoneShaderBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const colors = useMemo(() => {
    if (!mounted) {
      return ["#0b0c10", "#c5c6c7", "#0b0c10", "#c5c6c7"];
    }

    const isDark = resolvedTheme === "dark";

    if (isDark) {
      // Darks: close to background, light highlights
      const getRandomDark = () => {
        const val = Math.floor(Math.random() * 15) + 6; // 6 to 21
        return `rgb(${val}, ${val + 1}, ${val + 4})`;  // Subtle cool blue-grey dark tint
      };
      const getRandomLight = () => {
        const val = Math.floor(Math.random() * 60) + 160; // 160 to 220
        return `rgb(${val}, ${val}, ${val})`;
      };
      // Return 2 darks and 2 lights shuffled
      const arr = [getRandomDark(), getRandomLight(), getRandomDark(), getRandomLight()];
      return arr.sort(() => Math.random() - 0.5);
    } else {
      const getRandomLight = () => {
        const val = Math.floor(Math.random() * 20) + 225; // 225 to 245
        return `rgb(${val}, ${val}, ${val + 5})`;        // Subtle light tint
      };
      const getRandomDark = () => {
        const val = Math.floor(Math.random() * 45) + 15;  // 15 to 60
        return `rgb(${val}, ${val + 5}, ${val + 15})`;    // Deep slate tint
      };
      // Return 2 darks and 2 lights shuffled
      const arr = [getRandomDark(), getRandomLight(), getRandomDark(), getRandomLight()];
      return arr.sort(() => Math.random() - 0.5);
    }
  }, [resolvedTheme, mounted]);

  const shaderParams = useMemo(() => {
    if (!mounted) {
      return {
        distortion: 0.20,
        swirl: 0.15,
        grainMixer: grainMixerProp !== undefined ? grainMixerProp : 0.15,
        grainOverlay: grainOverlayProp !== undefined ? grainOverlayProp : 0.05,
      };
    }
    // Randomize static parameters to create a unique static pattern per mount
    return {
      distortion: Math.random() * 0.80 + 0.10,   // 0.10 to 0.90 (wide range for high shape variance)
      swirl: Math.random() * 0.85 + 0.05,        // 0.05 to 0.90 (wide range for swirl paths)
      grainMixer: grainMixerProp !== undefined ? grainMixerProp : Math.random() * 0.15 + 0.15,
      grainOverlay: grainOverlayProp !== undefined ? grainOverlayProp : Math.random() * 0.05 + 0.05,
    };
  }, [mounted, grainMixerProp, grainOverlayProp]);

  if (!mounted) {
    return <div className="absolute inset-0 -z-10 bg-background" />;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      <MeshGradient
        colors={colors}
        speed={speedProp !== undefined ? speedProp : 0} // Purely static layout with no movement animation
        distortion={shaderParams.distortion}
        swirl={shaderParams.swirl}
        grainMixer={shaderParams.grainMixer}
        grainOverlay={shaderParams.grainOverlay}
        className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-80 transition-opacity duration-1000"
      />

      {/* Soft radial overlay to vignette the edges and focus the center text */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-50 dark:opacity-60"
        style={{
          background: resolvedTheme === "dark"
            ? "radial-gradient(circle at center, transparent 30%, rgba(10,10,10,0.8) 100%)"
            : "radial-gradient(circle at center, transparent 30%, rgba(250,250,250,0.8) 100%)"
        }}
      />
    </div>
  );
}
