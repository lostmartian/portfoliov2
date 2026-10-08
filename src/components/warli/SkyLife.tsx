"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Flock from "./Flock";
import Fireflies from "./Fireflies";

/** Day (light theme): a flock crosses the sky. Night (dark theme): no birds, fireflies in the groves. */
export default function SkyLife() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);
  if (!mounted) return null;

  return resolvedTheme === "dark" ? (
    <Fireflies className="absolute inset-0 w-full h-full" />
  ) : (
    <Flock className="absolute inset-x-0 top-0 w-full h-[10svh]" />
  );
}
