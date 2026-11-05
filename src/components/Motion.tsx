"use client";

// Site-wide motion: Lenis smooth scrolling, plus scroll reveals for anything marked
// data-reveal. Both stay off for people who ask for reduced motion.

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });

    // In-page links (TOC, "Scroll to read"): cancel the browser's instant jump, which would
    // otherwise fight Lenis, and glide there instead. scrollTo honours scroll-margin-top.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const id = link ? decodeURIComponent(link.getAttribute("href")!.slice(1)) : "";
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
      history.pushState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

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
