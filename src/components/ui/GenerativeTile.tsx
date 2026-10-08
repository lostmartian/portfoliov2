/**
 * Deterministic placeholder tile: a soft, muted gradient with a faint grid,
 * seeded from a string. Stands in for artwork / dish photos until real images
 * are dropped into /public and referenced from src/data/*.ts.
 */
const PALETTES = [
  ["#e9e3d8", "#d7cbb8", "#c9b79c"], // sand
  ["#e4e6e1", "#c9cfc4", "#a9b3a4"], // sage
  ["#ebe0d8", "#dbbfae", "#c79a83"], // clay
  ["#e2e4e9", "#c6cad4", "#9ea5b5"], // slate
  ["#efe6dc", "#e3c9ad", "#d6a77a"], // apricot
];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default function GenerativeTile({ seed, className = "", label }: { seed: string; className?: string; label?: string }) {
  const h = hash(seed);
  const [a, b, c] = PALETTES[h % PALETTES.length];
  const x = 20 + (h % 60);
  const y = 20 + ((h >> 5) % 60);

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ background: `radial-gradient(90% 90% at ${x}% ${y}%, ${a}, ${b} 55%, ${c})` }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {label && <span className="absolute bottom-3 right-4 label !text-black/40">{label}</span>}
    </div>
  );
}
