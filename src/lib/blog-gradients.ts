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
  // Palette 0: Warm Sunrise (OpenAI Peach, Gold & Rose)
  {
    baseColor: "#ff7e5f",
    linearGradientEnd: "#feb47b",
    blobColors: ["#ff6b6b", "#ffe066", "#e94057", "#fbc2eb"]
  },
  // Palette 1: Twilight Sunset (OpenAI Deep Plum & Peach Glow)
  {
    baseColor: "#3f2b96",
    linearGradientEnd: "#a8c0ff",
    blobColors: ["#e94057", "#f27121", "#8a2387", "#ff9ff3"]
  },
  // Palette 2: Spring Bloom (OpenAI Sky Blue, Teal & Lavender)
  {
    baseColor: "#30cfd0",
    linearGradientEnd: "#330867",
    blobColors: ["#a1c4fd", "#c2e9fb", "#fbc2eb", "#ffe5d9"]
  },
  // Palette 3: Gold Meadow (OpenAI Emerald Green & Warm Apricot)
  {
    baseColor: "#11998e",
    linearGradientEnd: "#38ef7d",
    blobColors: ["#fcb69f", "#ffecd2", "#ff9a9e", "#fecfef"]
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
