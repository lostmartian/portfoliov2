// Deterministic FNV-1a 32-bit hash function using imul for correct integer multiplication in JS
function hashString(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export interface GradientBlob {
  id: string;
  cx: string;
  cy: string;
  r: string;
  fx: string;
  fy: string;
  transform: string;
  color: string;
}

export interface FluidGradientData {
  baseColor: string;
  linearGradientEnd: string;
  blobs: GradientBlob[];
}

const PALETTES = [
  // Palette 0: Porcelain Mist (indigo on silver)
  {
    baseColor: "#eef2ff",
    linearGradientEnd: "#c7d2fe",
    blobColors: ["#a5b4fc", "#818cf8", "#e0e7ff", "#c4b5fd"]
  },
  // Palette 1: Slate Dusk (deep indigo night)
  {
    baseColor: "#1e1b4b",
    linearGradientEnd: "#4f46e5",
    blobColors: ["#6366f1", "#818cf8", "#312e81", "#a5b4fc"]
  },
  // Palette 2: Periwinkle Bloom (soft cool light)
  {
    baseColor: "#e0e7ff",
    linearGradientEnd: "#f5f3ff",
    blobColors: ["#c7d2fe", "#ddd6fe", "#bfdbfe", "#e9d5ff"]
  },
  // Palette 3: Deep Current (ink blue with violet undertone)
  {
    baseColor: "#0f172a",
    linearGradientEnd: "#3730a3",
    blobColors: ["#4f46e5", "#7c3aed", "#1e293b", "#6366f1"]
  }
];

// Generates structural data for custom layered radial gradients inspired by ffflux & OpenAI visual layouts
export function getFluidGradientData(title: string): FluidGradientData {
  const hash = hashString(title);
  const palette = PALETTES[hash % PALETTES.length];

  // Deterministic transform settings for 4 squashed & rotated radial gradient blobs (ellipse meshes)
  const blob1: GradientBlob = {
    id: "blob1",
    cx: `${20 + (hash % 15)}%`,
    cy: `${15 + ((hash >> 2) % 15)}%`,
    r: "55%",
    fx: `${25 + (hash % 10)}%`,
    fy: `${20 + ((hash >> 2) % 10)}%`,
    transform: `rotate(${(hash % 60) - 30}) scale(1.6 0.8)`,
    color: palette.blobColors[0],
  };

  const blob2: GradientBlob = {
    id: "blob2",
    cx: `${60 + ((hash >> 4) % 15)}%`,
    cy: `${15 + ((hash >> 5) % 15)}%`,
    r: "50%",
    fx: `${55 + ((hash >> 4) % 10)}%`,
    fy: `${20 + ((hash >> 5) % 10)}%`,
    transform: `rotate(${((hash >> 6) % 60) - 30}) scale(1.5 0.7)`,
    color: palette.blobColors[1],
  };

  const blob3: GradientBlob = {
    id: "blob3",
    cx: `${25 + ((hash >> 8) % 15)}%`,
    cy: `${55 + ((hash >> 9) % 15)}%`,
    r: "60%",
    fx: `${30 + ((hash >> 8) % 10)}%`,
    fy: `${50 + ((hash >> 9) % 10)}%`,
    transform: `rotate(${((hash >> 10) % 60) - 30}) scale(1.7 0.9)`,
    color: palette.blobColors[2],
  };

  const blob4: GradientBlob = {
    id: "blob4",
    cx: `${65 + ((hash >> 11) % 15)}%`,
    cy: `${60 + ((hash >> 12) % 15)}%`,
    r: "50%",
    fx: `${60 + ((hash >> 11) % 10)}%`,
    fy: `${55 + ((hash >> 12) % 10)}%`,
    transform: `rotate(${((hash >> 13) % 60) - 30}) scale(1.4 0.8)`,
    color: palette.blobColors[3],
  };

  return {
    baseColor: palette.baseColor,
    linearGradientEnd: palette.linearGradientEnd,
    blobs: [blob1, blob2, blob3, blob4],
  };
}
