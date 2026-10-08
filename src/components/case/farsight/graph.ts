/** Illustrative document knowledge graph used by the Farsight "constellations" scene. */
export const NODES = [
  { id: "contract", label: "Contract", x: 150, y: 130, k: 1 },
  { id: "party-a", label: "Party A", x: 70, y: 60, k: 0 },
  { id: "party-b", label: "Party B", x: 260, y: 55, k: 0 },
  { id: "clause", label: "Clause 14.2", x: 250, y: 180, k: 2 },
  { id: "obligation", label: "Obligation", x: 370, y: 140, k: 0 },
  { id: "invoice", label: "Invoice", x: 470, y: 70, k: 1 },
  { id: "amount", label: "₹ Amount", x: 560, y: 150, k: 0 },
  { id: "filing", label: "Filing", x: 420, y: 250, k: 2 },
  { id: "director", label: "Director", x: 120, y: 260, k: 0 },
  { id: "company", label: "Company", x: 280, y: 300, k: 1 },
  { id: "subsidiary", label: "Subsidiary", x: 530, y: 290, k: 0 },
];

export const LINKS: [string, string, string][] = [
  ["party-a", "contract", "SIGNED"],
  ["party-b", "contract", "SIGNED"],
  ["contract", "clause", "CONTAINS"],
  ["clause", "obligation", "CREATES"],
  ["obligation", "invoice", "SETTLED_BY"],
  ["invoice", "amount", "FOR"],
  ["party-b", "invoice", "ISSUED"],
  ["company", "filing", "FILED"],
  ["filing", "obligation", "DISCLOSES"],
  ["director", "company", "DIRECTS"],
  ["director", "party-a", "SAME_PERSON"],
  ["company", "subsidiary", "OWNS"],
  ["subsidiary", "amount", "RECEIVED"],
];
