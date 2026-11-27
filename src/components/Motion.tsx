"use client";

// Scroll reveals for anything marked data-reveal (off for people who ask for reduced motion,
// see globals.css). Scrolling itself is the browser's own: no smooth-scroll library.

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Motion() {
  const pathname = usePathname();

  // Re-scan on every route change: client navigations bring in new elements to reveal.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = "";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    // Anything already on screen shows at once; the margin above would otherwise hold back
    // elements sitting at the very bottom of a page that cannot scroll (the homepage).
    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.dataset.in = "";
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
