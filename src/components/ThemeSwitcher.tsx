"use client";

// One quiet button that flips between light and dark. The site follows the system setting
// until it is clicked; picking the theme the system already uses goes back to following it.
// The inline script in layout.tsx applies the saved choice before paint.

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
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
      className={`grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg ${className}`}
    >
      {/* The icon shows what a click switches to; CSS picks it, so it is right before hydration. */}
      <Moon aria-hidden className="h-4 w-4 dark:hidden" strokeWidth={1.75} />
      <Sun aria-hidden className="hidden h-4 w-4 dark:block" strokeWidth={1.75} />
    </button>
  );
}
