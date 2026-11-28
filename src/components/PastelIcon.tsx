// Small hand-drawn 2D icons in soft pastels, one per idea, drawn for this site rather than taken
// from an icon set. Each uses its section's colour pair (lib/palette.ts) in light, flat tones.
// Used sparingly, beside a heading.

const icons = {
  // AI: a cluster of sparkles (violet and pink)
  ai: (
    <>
      <path d="M17 5c1.4 8.4 3 10 11.4 11.4C20 17.8 18.4 19.4 17 27.8 15.6 19.4 14 17.8 5.6 16.4 14 15 15.6 13.4 17 5Z" fill="#cbbcff" />
      <path d="M17 9.5c.9 4.6 2 5.8 6.9 6.9-4.9 1-6 2.2-6.9 6.9-1-4.7-2.1-5.9-6.9-6.9 4.8-1.1 5.9-2.3 6.9-6.9Z" fill="#a993ff" />
      <path d="M30.5 5c.6 3.2 1.3 3.9 4.5 4.5-3.2.6-3.9 1.3-4.5 4.5-.6-3.2-1.3-3.9-4.5-4.5 3.2-.6 3.9-1.3 4.5-4.5Z" fill="#ffb3d1" />
      <circle cx="30" cy="30" r="3.2" fill="#ffd3e6" />
    </>
  ),
  // Backend and data: stacked cylinders (cyan, coral)
  data: (
    <>
      <path d="M8 11v18c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V11" fill="#a9e7ef" />
      <ellipse cx="20" cy="11" rx="12" ry="4.5" fill="#d6f6fa" />
      <path d="M8 17.5c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5M8 23.5c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5" fill="none" stroke="#6fd0dc" strokeWidth="1.6" />
      <circle cx="31" cy="31" r="4.2" fill="#ffb7a4" />
    </>
  ),
  // Fintech: rising bars and a coin (cobalt, amber)
  fintech: (
    <>
      <rect x="6" y="20" width="6" height="13" rx="2" fill="#c3d2ff" />
      <rect x="14" y="13" width="6" height="20" rx="2" fill="#9fb6ff" />
      <circle cx="28" cy="24" r="8.5" fill="#ffd9ab" />
      <circle cx="28" cy="24" r="5.2" fill="none" stroke="#f5ac62" strokeWidth="1.6" />
      <path d="M8 11l6-4 5 3 7-5" fill="none" stroke="#7d9bff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // Zero to one: a little rocket (green, yellow)
  rocket: (
    <>
      <path d="M14 21.5 8.5 28H14ZM26 21.5l5.5 6.5H26Z" fill="#92dfb1" />
      <path d="M20 4.5c7.2 5 8.2 14 6.2 23.5H13.8C11.8 18.5 12.8 9.5 20 4.5Z" fill="#c2f0d4" />
      <circle cx="20" cy="15" r="3.6" fill="#fff" stroke="#59c486" strokeWidth="1.6" />
      <path d="M15.5 29.5Q20 38.5 24.5 29.5Z" fill="#ffe28a" />
    </>
  ),
  // Developer tooling: a terminal window (indigo, rust)
  tooling: (
    <>
      <rect x="5" y="8" width="30" height="24" rx="5" fill="#cdd3ff" />
      <path d="M5 13a5 5 0 0 1 5-5h20a5 5 0 0 1 5 5v1H5Z" fill="#aab4ff" />
      <circle cx="9.5" cy="11" r="1.2" fill="#fff" />
      <circle cx="13" cy="11" r="1.2" fill="#fff" />
      <path d="m11 19 4.5 3.5L11 26" fill="none" stroke="#5b6cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="18.5" y="24.5" width="8.5" height="2.4" rx="1.2" fill="#ff9f7a" />
    </>
  ),
  // Writing: a notebook and pencil (cyan, coral)
  writing: (
    <>
      <rect x="7" y="6" width="20" height="28" rx="3.5" fill="#d3f4f8" />
      <path d="M11 13h12M11 18h12M11 23h8" stroke="#86d6e0" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m24 30 9-13 3 2-9 13-3.6 1.2Z" fill="#ffc4b3" />
      <path d="m33 17 1.4-2 3 2-1.4 2Z" fill="#ff9f86" />
    </>
  ),
  // Teaching: a board with a chart (cobalt, amber)
  teaching: (
    <>
      <rect x="5" y="6" width="30" height="21" rx="3.5" fill="#cdd9ff" />
      <path d="M10 21l5-6 4 3 7-8" fill="none" stroke="#6f8fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="29" cy="10" r="2.6" fill="#ffd29e" />
      <path d="M14 27l-3 7M26 27l3 7" stroke="#a6b8ff" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  // Newsletter: a folded paper (indigo, rust)
  newsletter: (
    <>
      <rect x="6" y="7" width="28" height="26" rx="3.5" fill="#d6daff" />
      <rect x="10" y="11" width="20" height="4" rx="2" fill="#ffb093" />
      <path d="M10 20h9M10 24h9M10 28h9" stroke="#a3acff" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="22" y="19" width="8" height="10" rx="2" fill="#b4bcff" />
    </>
  ),
  // Off the clock: a coffee mug (green, yellow)
  coffee: (
    <>
      <path d="M8 15h20v10a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8Z" fill="#c6f1d6" />
      <path d="M28 18h2.5a4 4 0 0 1 0 8H28" fill="none" stroke="#8fdcae" strokeWidth="2.4" />
      <path d="M14 5c-1.5 2 1.5 3 0 5M20 4c-1.5 2 1.5 3 0 5" fill="none" stroke="#ffd96a" strokeWidth="2" strokeLinecap="round" />
      <rect x="8" y="15" width="20" height="3.5" rx="1.75" fill="#9fe2bb" />
    </>
  ),
} as const;

export type PastelIconName = keyof typeof icons;

export function PastelIcon({ name, size = 40, className = "" }: { name: PastelIconName; size?: number; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" width={size} height={size} className={`shrink-0 ${className}`}>
      {icons[name]}
    </svg>
  );
}
