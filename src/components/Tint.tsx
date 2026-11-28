import type { CSSProperties } from "react";
import type { Tint } from "@/lib/palette";

/** A soft colour glow in the top-right corner of a page header, fading out well before the
 *  content. Goes inside a `relative isolate` header; see .tint in globals.css. */
export function TintGlow({ tint }: { tint?: Tint }) {
  if (!tint) return null;
  return <span aria-hidden className="tint" style={{ "--tint-cool": tint.cool, "--tint-warm": tint.warm } as CSSProperties} />;
}

/** A small dot in the page's colour, set before its label. */
export function TintDot({ tint }: { tint?: Tint }) {
  if (!tint) return null;
  return (
    <span
      aria-hidden
      className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
      style={{ background: `linear-gradient(135deg, ${tint.cool}, ${tint.warm})` }}
    />
  );
}

/** One steady glow in the page's colours down the left side of the screen, fixed while the page
 *  scrolls. Goes inside the page wrapper; see .tint-page in globals.css. */
export function TintBackdrop({ tint }: { tint?: Tint }) {
  if (!tint) return null;
  return <span aria-hidden className="tint-page" style={{ "--tint-cool": tint.cool, "--tint-warm": tint.warm } as CSSProperties} />;
}

/** The page's colour pair as CSS variables, for its wrapper: used by .accent-text and the glows. */
export const tintVars = (tint?: Tint) =>
  (tint ? { "--tint-cool": tint.cool, "--tint-warm": tint.warm } : {}) as CSSProperties;

/** A small round dot in a pair's colours, for markers such as timeline points. */
export function ColourDot({ tint, className = "" }: { tint: Tint; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block rounded-full ${className}`}
      style={{ background: `linear-gradient(135deg, ${tint.cool}, ${tint.warm})` }}
    />
  );
}
