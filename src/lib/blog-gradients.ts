// Deterministic FNV-1a 32-bit hash function
function hashString(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    // Multiply by 32-bit FNV prime 16777619
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

// Generate the exact CSS background gradient string based on the title hash (vibrant poppy theme)
export function getFluidGradientStyle(title: string): string {
  const hash = hashString(title);

  const baseHue = hash % 360;
  const hue2 = (baseHue + 40) % 360;
  const hue3 = (baseHue + 130) % 360;
  const hue4 = (baseHue + 220) % 360;
  const hue5 = (baseHue + 310) % 360;

  // Curated HSL ranges for a beautiful, light, poppy, and vibrant holographic mesh
  const c1 = `hsl(${baseHue}, 80%, 35%)`; // Base background (vibrant mid-tone)
  const c2 = `hsl(${hue2}, 95%, 58%)`;   // Blob 1 (bright, poppy)
  const c3 = `hsl(${hue3}, 95%, 55%)`;   // Blob 2 (bright, poppy)
  const c4 = `hsl(${hue4}, 90%, 52%)`;   // Blob 3 (bright, poppy)
  const c5 = `hsl(${hue5}, 85%, 50%)`;   // Blob 4 (bright, poppy)

  // Deterministic coordinates and sizes for overlapping radial color blobs
  const x1 = 15 + (hash % 30);
  const y1 = 10 + ((hash >> 2) % 30);
  const r1 = 45 + (hash % 20);

  const x2 = 55 + ((hash >> 4) % 35);
  const y2 = 15 + ((hash >> 6) % 30);
  const r2 = 50 + ((hash >> 1) % 20);

  const x3 = 25 + ((hash >> 8) % 40);
  const y3 = 55 + ((hash >> 10) % 30);
  const r3 = 55 + ((hash >> 3) % 20);

  const x4 = 70 + ((hash >> 12) % 20);
  const y4 = 60 + ((hash >> 14) % 30);
  const r4 = 40 + ((hash >> 5) % 20);

  // Layered radial gradients representing a liquid color mesh
  return `
    radial-gradient(circle at ${x1}% ${y1}%, ${c2} 0%, transparent ${r1}%),
    radial-gradient(circle at ${x2}% ${y2}%, ${c3} 0%, transparent ${r2}%),
    radial-gradient(circle at ${x3}% ${y3}%, ${c4} 0%, transparent ${r3}%),
    radial-gradient(circle at ${x4}% ${y4}%, ${c5} 0%, transparent ${r4}%),
    linear-gradient(135deg, ${c1} 0%, hsl(${baseHue}, 85%, 25%) 100%)
  `.trim();
}
