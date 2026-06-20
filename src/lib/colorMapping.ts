// Deterministic hash function for strings
function getHashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export interface GradientPreset {
  blob1: string;
  blob2: string;
  name: string;
}

// Curated collection of premium, theme-adaptive gradient configurations.
// Increased opacities to ensure vibrant, visible flowing art gradients on all themes.
export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    name: "indigo-emerald",
    blob1: "bg-indigo-500/40 dark:bg-indigo-500/30",
    blob2: "bg-emerald-500/35 dark:bg-emerald-500/25",
  },
  {
    name: "violet-fuchsia",
    blob1: "bg-violet-500/40 dark:bg-violet-500/30",
    blob2: "bg-fuchsia-500/35 dark:bg-fuchsia-500/25",
  },
  {
    name: "blue-teal",
    blob1: "bg-blue-500/40 dark:bg-blue-500/30",
    blob2: "bg-teal-500/35 dark:bg-teal-500/25",
  },
  {
    name: "orange-rose",
    blob1: "bg-orange-500/40 dark:bg-orange-500/30",
    blob2: "bg-rose-500/35 dark:bg-rose-500/25",
  },
  {
    name: "pink-purple",
    blob1: "bg-pink-500/40 dark:bg-pink-500/30",
    blob2: "bg-purple-500/35 dark:bg-purple-500/25",
  },
  {
    name: "cyan-blue",
    blob1: "bg-cyan-500/40 dark:bg-cyan-500/30",
    blob2: "bg-blue-600/35 dark:bg-blue-600/25",
  },
  {
    name: "amber-red",
    blob1: "bg-amber-500/40 dark:bg-amber-500/30",
    blob2: "bg-red-500/35 dark:bg-red-500/25",
  },
  {
    name: "emerald-teal",
    blob1: "bg-emerald-500/40 dark:bg-emerald-500/30",
    blob2: "bg-teal-500/35 dark:bg-teal-500/25",
  },
];

export function getGradientsByString(text: string): GradientPreset {
  if (!text) return GRADIENT_PRESETS[0];
  const hash = getHashCode(text);
  const index = hash % GRADIENT_PRESETS.length;
  return GRADIENT_PRESETS[index];
}
