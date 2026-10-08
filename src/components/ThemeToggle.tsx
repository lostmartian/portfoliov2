"use client";

import * as React from "react";
import { useTheme } from "next-themes";

/** Sun / moon drawn as a single circle that fills for night. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" aria-hidden="true" />;
  }

  const dark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="group w-8 h-8 grid place-items-center text-muted hover:text-accent transition-colors cursor-pointer"
      aria-label={dark ? "Switch to day theme" : "Switch to night theme"}
    >
      <svg viewBox="0 0 20 20" className="w-[18px] h-[18px] transition-transform duration-700 group-hover:rotate-90">
        <circle cx="10" cy="10" r="5" fill={dark ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2" />
        {!dark &&
          Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <line key={i} x1={10 + Math.cos(a) * 7} y1={10 + Math.sin(a) * 7} x2={10 + Math.cos(a) * 8.6} y2={10 + Math.sin(a) * 8.6} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            );
          })}
      </svg>
    </button>
  );
}
