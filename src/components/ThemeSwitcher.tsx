"use client";

// A small day/night switch: a sunny sky with a sun knob in light mode, a starry night with a
// moon knob in dark mode (drawn in CSS, see .theme-toggle in globals.css). The site follows the system setting
// until it is clicked; picking the theme the system already uses goes back to following it.
// The inline script in layout.tsx applies the saved choice before paint.

import { useEffect } from "react";
import { THEME_KEY } from "@/lib/theme";

const darkQuery = () => matchMedia("(prefers-color-scheme: dark)");

function apply(dark: boolean) {
  const root = document.documentElement;
  root.setAttribute("data-theme", dark ? "dark" : "light");
  root.style.colorScheme = dark ? "dark" : "light";
}

function saved() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  // While nothing is saved, track the OS, and pick up choices made in other tabs.
  useEffect(() => {
    const mq = darkQuery();
    const sync = () => {
      const pref = saved();
      apply(pref === "dark" || (pref !== "light" && mq.matches));
    };
    mq.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = () => {
    const dark = document.documentElement.getAttribute("data-theme") !== "dark";
    try {
      if (dark === darkQuery().matches) localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {}
    apply(dark);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={`theme-toggle ${className}`}
    >
      {/* everything below is CSS-driven by data-theme, so it is right before hydration */}
      <span aria-hidden className="theme-toggle-cloud" />
      <span aria-hidden className="theme-toggle-stars">
        <i />
        <i />
        <i />
      </span>
      <span aria-hidden className="theme-toggle-knob">
        <i />
        <i />
      </span>
    </button>
  );
}
