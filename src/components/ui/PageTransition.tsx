"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** The Marathi word shown on the curtain for each section of the site. */
const WORDS: [string, string, string][] = [
  ["/work", "काम", "Work"],
  ["/projects", "प्रकल्प", "Projects"],
  ["/blogs", "लेखन", "Writing"],
  ["/videos", "चलचित्र", "Videos"],
  ["/art", "चित्र", "Canvas"],
  ["/kitchen", "स्वयंपाक", "Kitchen"],
  ["/readlist", "वाचन", "Readlist"],
  ["/oss-contributions", "मुक्त स्रोत", "Open source"],
  ["/now", "सध्या", "Now"],
  ["/uses", "वापर", "Uses"],
  ["/resume", "परिचय", "Résumé"],
];

function wordFor(path: string): [string, string] {
  if (path === "/") return ["नमस्कार", "Home"];
  const hit = WORDS.find(([p]) => path === p || path.startsWith(p + "/"));
  return hit ? [hit[1], hit[2]] : ["पुढे", "Onward"];
}

/**
 * Internal navigation goes behind a geru curtain: it rises with the destination's
 * Marathi word, the route changes underneath, then it lifts away.
 * Exposed as window.__navigate for the command palette.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const [word, setWord] = useState<[string, string]>(["", ""]);
  const pending = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const go = (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname) {
        router.push(url.pathname + url.search + url.hash);
        return;
      }
      if (reduce) {
        router.push(url.pathname + url.search + url.hash);
        return;
      }
      setWord(wordFor(url.pathname));
      setPhase("cover");
      pending.current = true;
      setTimeout(() => router.push(url.pathname + url.search + url.hash), 460);
      // Safety net: never leave the curtain down if a navigation stalls or fails.
      setTimeout(() => {
        if (pending.current) {
          pending.current = false;
          setPhase("reveal");
          setTimeout(() => setPhase("idle"), 700);
        }
      }, 4000);
    };
    (window as unknown as { __navigate?: (h: string) => void }).__navigate = go;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page (e.g. /#contact): let Lenis handle it
      e.preventDefault();
      e.stopPropagation();
      go(url.href);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // New route rendered: lift the curtain.
  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    const t1 = setTimeout(() => setPhase("reveal"), 60);
    const t2 = setTimeout(() => setPhase("idle"), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return (
    <div className="curtain" data-phase={phase} aria-hidden="true">
      <div className="curtain-word text-center">
        <p className="deva text-6xl sm:text-8xl leading-none">{word[0]}</p>
        <p className="label !text-accent-foreground/90 mt-4">{word[1]}</p>
      </div>
    </div>
  );
}
