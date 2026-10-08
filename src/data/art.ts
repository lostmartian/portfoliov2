// Add paintings and drawings here. Drop image files in /public/art and set `image: "/art/name.jpg"`.
// Entries without an image render a generative placeholder tile.
export interface ArtPiece {
  slug: string;
  title: string;
  medium: string; // "Acrylic on canvas", "Ink", "Digital"...
  year: string;
  image?: string;
  note?: string;
  size?: "tall" | "wide" | "square";
}

export const art: ArtPiece[] = [
  { slug: "piece-01", title: "Untitled I", medium: "Acrylic on canvas", year: "2026", size: "tall", note: "Replace with your first piece." },
  { slug: "piece-02", title: "Untitled II", medium: "Ink on paper", year: "2026", size: "square" },
  { slug: "piece-03", title: "Untitled III", medium: "Watercolour", year: "2025", size: "wide" },
  { slug: "piece-04", title: "Untitled IV", medium: "Pencil sketch", year: "2025", size: "square" },
  { slug: "piece-05", title: "Untitled V", medium: "Acrylic on canvas", year: "2025", size: "tall" },
  { slug: "piece-06", title: "Untitled VI", medium: "Digital", year: "2024", size: "square" },
];
