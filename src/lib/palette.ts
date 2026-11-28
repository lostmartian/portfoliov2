// The site's five colour pairs, first used on the homepage work cards. Each case study keeps its
// card's pair, and every other section borrows one, so colour shows up as a hint (a glow in the
// page header, a dot by its label) rather than painting whole pages.

export type Tint = { cool: string; warm: string };

export const palette = {
  cobalt: { cool: "#3d6bff", warm: "#ff9a3c" },
  cyan: { cool: "#0fb5c9", warm: "#ff6f4f" },
  green: { cool: "#2fc46b", warm: "#ffd23f" },
  violet: { cool: "#7b5cff", warm: "#ff5fa2" },
  indigo: { cool: "#4f63ff", warm: "#ff5a1f" },
} satisfies Record<string, Tint>;

export type TintName = keyof typeof palette;

/** Which pair each part of the site uses. */
export const tints = {
  // case studies: the same pair as their homepage card
  "/work/ipo-allotment-engine": "cobalt",
  "/work/farsight": "cyan",
  "/work/ayuva": "green",
  "/work/agentdiff": "violet",
  "/work/tsx2rs": "indigo",
  // sections
  "/about": "cobalt",
  "/services": "violet",
  "/blogs": "cyan",
  "/writeups": "indigo",
  "/videos": "violet",
  "/cooking": "green",
} as const satisfies Record<string, TintName>;

export const tintFor = (path: string): Tint | undefined => {
  const name = (tints as Record<string, TintName | undefined>)[path];
  return name ? palette[name] : undefined;
};

/** The homepage holds every project, so its dot blends all five pairs. */
export const allColours = `conic-gradient(${Object.values(palette)
  .map((t) => t.cool)
  .concat(palette.cobalt.cool)
  .join(", ")})`;
