/** Small Warli-style glyphs, drawn from the same triangles, circles and lines as the rest of the site. */
export type GlyphKind = "ai" | "lang" | "db" | "cloud" | "ui" | "site" | "desk" | "brush" | "pot" | "code" | "lens" | "diya";

export default function Glyph({ kind, className = "w-12 h-12 text-accent" }: { kind: GlyphKind; className?: string }) {
  const c = "currentColor";
  const common = { fill: "none", stroke: c, strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {kind === "ai" && (<><circle cx="24" cy="12" r="5" fill={c} /><polygon points="15,20 33,20 24,32" fill={c} /><polygon points="24,32 15,44 33,44" fill={c} /><path d="M8 10 l4 4 M40 10 l-4 4 M6 24 h5 M42 24 h-5" {...common} /></>)}
      {kind === "lang" && (<><path d="M14 14 L6 24 L14 34 M34 14 L42 24 L34 34" {...common} /><polygon points="21,34 24,14 27,34" fill={c} /></>)}
      {kind === "db" && (<><ellipse cx="24" cy="12" rx="14" ry="5" {...common} /><path d="M10 12 v24 c0 3 6 5 14 5 s14 -2 14 -5 v-24 M10 24 c0 3 6 5 14 5 s14 -2 14 -5" {...common} /></>)}
      {kind === "cloud" && (<><circle cx="24" cy="18" r="7" fill={c} />{Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <line key={i} x1={24 + Math.cos(a) * 10} y1={18 + Math.sin(a) * 10} x2={24 + Math.cos(a) * 14} y2={18 + Math.sin(a) * 14} {...common} />; })}<path d="M6 40 h36" {...common} /><path d="M10 40 l6 -6 l6 6 l6 -6 l6 6 l6 -6" {...common} /></>)}
      {kind === "ui" && (<><rect x="7" y="9" width="34" height="26" {...common} /><polygon points="14,30 20,20 26,30" fill={c} /><circle cx="32" cy="17" r="3" fill={c} /><path d="M18 41 h12 M24 35 v6" {...common} /></>)}
      {kind === "site" && (<><polygon points="8,24 24,10 40,24" {...common} /><rect x="12" y="24" width="24" height="16" {...common} /><rect x="21" y="30" width="6" height="10" fill={c} /><path d="M16 22 l4 -6 M24 18 l0 -6 M32 22 l-4 -6" {...common} /></>)}
      {kind === "desk" && (<><rect x="8" y="12" width="32" height="20" {...common} /><path d="M4 38 h40 M18 32 l-2 6 M30 32 l2 6" {...common} /></>)}
      {kind === "brush" && (<><path d="M34 8 L18 30" {...common} strokeWidth={2.4} /><polygon points="12,40 18,30 22,34" fill={c} /></>)}
      {kind === "pot" && (<><path d="M10 20 Q8 38 24 40 Q40 38 38 20 Z" {...common} /><path d="M8 20 h32" {...common} /><path d="M20 14 q-3 -4 0 -8 M28 14 q-3 -4 0 -8" {...common} /></>)}
      {kind === "lens" && (<><circle cx="20" cy="20" r="11" {...common} /><path d="M28 28 L41 41" {...common} strokeWidth={2.6} /><polygon points="15,24 20,15 25,24" fill={c} /></>)}
      {kind === "diya" && (<><path d="M8 30 Q24 44 40 30 Z" fill={c} /><path d="M24 26 q5 -7 0 -14 q-5 7 0 14 z" fill="var(--haldi)" /><path d="M6 30 h36" {...common} /><path d="M14 8 l2 4 M34 8 l-2 4 M24 4 v4" {...common} /></>)}
      {kind === "code" && (<><path d="M16 16 L8 24 L16 32 M32 16 L40 24 L32 32" {...common} /></>)}
    </svg>
  );
}

