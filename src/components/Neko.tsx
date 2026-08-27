"use client";

import { useEffect } from "react";

/**
 * Neko.js — the classic desktop cat, ported to the web.
 * Chases the cursor, naps when idle. Click it to change behavior.
 * https://louisabraham.github.io/nekojs/
 */
export default function Neko() {
  useEffect(() => {
    // Respect reduced-motion and touch-only devices
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isCoarsePointer) return;

    // Init only once per full page load; survives React Strict Mode remounts
    const w = window as any;
    if (w.__nekoInit) return;
    w.__nekoInit = true;

    const boot = () => {
      try {
        if (!w.createNeko) return false;
        if (!w.nekoInstance) {
          w.nekoInstance = w.createNeko({ allowBehaviorChange: true });
        }
        return true;
      } catch {
        return false;
      }
    };

    if (!boot()) {
      const script = document.createElement("script");
      script.src = "https://louisabraham.github.io/nekojs/neko.js";
      script.async = true;
      script.onload = () => boot();
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
