"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

export default function PixelArtPortrait() {
  const [points, setPoints] = useState<{ x: number; y: number; r: number; opacity: number }[]>([]);
  const { theme } = useTheme();
  const imagePath = "/me/20220325_113134-01.jpeg";
  const resolution = 60; // Reduced frequency (60x60 grid)

  useEffect(() => {
    const img = new Image();
    img.src = imagePath;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = resolution;
      canvas.height = resolution;
      ctx.drawImage(img, 0, 0, resolution, resolution);

      const imageData = ctx.getImageData(0, 0, resolution, resolution).data;
      const newPoints = [];

      for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
          const i = (y * resolution + x) * 4;
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];

          let brightness = (r + g + b) / 3 / 255;

          // Apply contrast curve to make features pop
          brightness = Math.pow(brightness, 1.2);

          if (theme === 'light') {
            brightness = 1 - brightness;
          }

          newPoints.push({
            x: (x / resolution) * 100,
            y: (y / resolution) * 100,
            r: 0.45,
            opacity: Math.max(0.1, brightness)
          });
        }
      }
      setPoints(newPoints);
    };
  }, [imagePath, theme]);

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full fill-foreground/50 dark:fill-foreground/70"
      >
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            style={{ opacity: p.opacity * (theme === 'light' ? 0.6 : 1) }}
          />
        ))}
      </svg>
    </div>
  );
}
