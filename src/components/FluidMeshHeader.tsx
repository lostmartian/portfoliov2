"use client";

import React, { useMemo } from "react";
import { getFluidGradientData } from "@/lib/blog-gradients";

interface FluidMeshHeaderProps {
  title: string;
  className?: string;
}

export default function FluidMeshHeader({ title, className = "" }: FluidMeshHeaderProps) {
  const data = useMemo(() => getFluidGradientData(title), [title]);

  const uniqueId = useMemo(() => {
    // Generate a simple alphanumeric prefix to keep SVG gradient IDs scoped locally
    return title.toLowerCase().replace(/[^a-z0-9]/g, "-");
  }, [title]);

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-t-lg bg-background ${className}`}>
      <svg
        viewBox="0 0 800 450"
        className="w-full h-full object-cover block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`base-bg-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={data.baseColor} />
            <stop offset="100%" stopColor={data.linearGradientEnd} />
          </linearGradient>
          {data.blobs.map((blob) => (
            <radialGradient
              key={blob.id}
              id={`${blob.id}-${uniqueId}`}
              cx={blob.cx}
              cy={blob.cy}
              r={blob.r}
              fx={blob.fx}
              fy={blob.fy}
              gradientTransform={blob.transform}
            >
              <stop offset="0%" stopColor={blob.color} stopOpacity="0.85" />
              <stop offset="100%" stopColor={blob.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* Base Background Solid/Linear */}
        <rect width="100%" height="100%" fill={`url(#base-bg-${uniqueId})`} />

        {/* Layered radial blobs */}
        {data.blobs.map((blob) => (
          <rect key={blob.id} width="100%" height="100%" fill={`url(#${blob.id}-${uniqueId})`} />
        ))}
      </svg>
    </div>
  );
}
