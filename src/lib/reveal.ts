import type { CSSProperties } from "react";

/** Props that mark an element for the scroll reveal in globals.css (see Motion.tsx).
 *  `delay` staggers siblings; "rise" goes on an overflow-hidden wrapper and slides its child up.
 *  Motion.tsx adds data-in to these elements, sometimes before the page has hydrated (the
 *  layout hydrates first), so React is told to expect that one attribute to differ. */
export function reveal(delay = 0, kind: "" | "rise" = "") {
  return { "data-reveal": kind, style: { "--d": `${delay}ms` } as CSSProperties, suppressHydrationWarning: true };
}
