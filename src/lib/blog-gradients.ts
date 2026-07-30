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

// Generates structural data for custom layered radial gradients inspired by ffflux & OpenAI visual layouts
export function getFluidGradientData(title: string): FluidGradientData {
  const hash = hashString(title);

  const baseHue = hash % 360;
  const hue2 = (baseHue + 50) % 360;
  const hue3 = (baseHue + 140) % 360;
  const hue4 = (baseHue + 230) % 360;
  const hue5 = (baseHue + 320) % 360;

  // Ultra-vibrant poppy colors
  const baseColor = `hsl(${baseHue}, 85%, 35%)`;
  const linearGradientEnd = `hsl(${baseHue}, 85%, 20%)`;

  const c2 = `hsl(${hue2}, 95%, 58%)`;
  const c3 = `hsl(${hue3}, 95%, 55%)`;
  const c4 = `hsl(${hue4}, 90%, 52%)`;
  const c5 = `hsl(${hue5}, 90%, 50%)`;

  // Deterministic transform settings for 4 squashed & rotated radial gradient blobs (ellipse meshes)
  const blob1: GradientBlob = {
    id: "blob1",
    cx: `${20 + (hash % 15)}%`,
    cy: `${15 + ((hash >> 2) % 15)}%`,
    r: "55%",
    fx: `${25 + (hash % 10)}%`,
    fy: `${20 + ((hash >> 2) % 10)}%`,
    transform: `rotate(${(hash % 60) - 30}) scale(1.6 0.8)`,
    color: c2,
  };

  const blob2: GradientBlob = {
    id: "blob2",
    cx: `${60 + ((hash >> 4) % 15)}%`,
    cy: `${15 + ((hash >> 5) % 15)}%`,
    r: "50%",
    fx: `${55 + ((hash >> 4) % 10)}%`,
    fy: `${20 + ((hash >> 5) % 10)}%`,
    transform: `rotate(${((hash >> 6) % 60) - 30}) scale(1.5 0.7)`,
    color: c3,
  };

  const blob3: GradientBlob = {
    id: "blob3",
    cx: `${25 + ((hash >> 8) % 15)}%`,
    cy: `${55 + ((hash >> 9) % 15)}%`,
    r: "60%",
    fx: `${30 + ((hash >> 8) % 10)}%`,
    fy: `${50 + ((hash >> 9) % 10)}%`,
    transform: `rotate(${((hash >> 10) % 60) - 30}) scale(1.7 0.9)`,
    color: c4,
  };

  const blob4: GradientBlob = {
    id: "blob4",
    cx: `${65 + ((hash >> 11) % 15)}%`,
    cy: `${60 + ((hash >> 12) % 15)}%`,
    r: "50%",
    fx: `${60 + ((hash >> 11) % 10)}%`,
    fy: `${55 + ((hash >> 12) % 10)}%`,
    transform: `rotate(${((hash >> 13) % 60) - 30}) scale(1.4 0.8)`,
    color: c5,
  };

  return {
    baseColor,
    linearGradientEnd,
    blobs: [blob1, blob2, blob3, blob4],
  };
}
