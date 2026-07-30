"use client";

import React, { useMemo } from "react";
import { getFluidGradientStyle } from "@/lib/blog-gradients";

interface FluidMeshHeaderProps {
  title: string;
  className?: string;
}

export default function FluidMeshHeader({ title, className = "" }: FluidMeshHeaderProps) {
  const gradientStyle = useMemo(() => getFluidGradientStyle(title), [title]);

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden rounded-t-lg bg-background ${className}`}
      style={{
        backgroundImage: gradientStyle,
      }}
    />
  );
}
