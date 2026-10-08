"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Figure, Hut, Tree } from "./Warli";
import { devaNum } from "@/components/ui/deva";

/**
 * The village grows as you read, in the left margin of the home page.
 * A winding path climbs the gutter and draws itself with your progress while a
 * Warli figure walks up it; each section you reach (marked data-village) grows
 * one piece beside the path. Pieces name their section on hover and jump there
 * on click. It sits low in the viewport so the sticky section numerals above
 * it stay clear.
 */

const G = 58; // ground line, in a 1440 × 64 board

/** One piece per home section, in order. */
const PIECES: { x: number; draw: ReactNode }[] = [
  // About: you, under a tree
  { x: 120, draw: <><Tree x={-14} y={G} h={46} branches={5} /><Figure x={14} y={G} s={1.15} pose="stand" /></> },
  // Work: a hut
  { x: 280, draw: <g transform={`translate(0 ${G}) scale(0.95)`}><Hut /></g> },
  // Services: a tree
  { x: 420, draw: <Tree y={G} h={50} branches={6} /> },
  // Experience: two figures on the road
  { x: 560, draw: <><Figure x={-12} y={G} s={1.1} pose="walk" /><Figure x={14} y={G} s={1.1} pose="walk" /></> },
  // Toolkit: a granary on stilts
  {
    x: 700,
    draw: (
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={`M-12 ${G} V${G - 10} M12 ${G} V${G - 10}`} />
        <path d={`M-15 ${G - 10} H15 V${G - 26} H-15 Z`} />
        <path d={`M-18 ${G - 26} L0 ${G - 38} L18 ${G - 26}`} />
        {[-8, 0, 8].map((x) => <line key={x} x1={x} x2={x} y1={G - 12} y2={G - 24} />)}
      </g>
    ),
  },
  // Off the clock: someone cooking over a fire
  {
    x: 850,
    draw: (
      <>
        <Figure x={-10} y={G} s={1.1} pose="hold" />
        <g fill="currentColor">
          <path d={`M10 ${G - 14} q-2 -8 6 -10 h6 q8 2 6 10 z`} />
          <polygon points={`12,${G} 15,${G - 9} 18,${G}`} />
          <polygon points={`18,${G} 21,${G - 11} 24,${G}`} />
        </g>
      </>
    ),
  },
  // Videos: dancers
  { x: 1010, draw: <>{[-20, -6, 8, 22].map((x, i) => <Figure key={x} x={x} y={G} s={1} pose="dance" flip={i % 2 === 1} />)}</> },
  // Contact: a big tree, someone waving
  { x: 1190, draw: <><Tree x={-16} y={G} h={56} branches={7} /><Figure x={18} y={G} s={1.2} pose="raise" /></> },
];

interface Mark {
  el: HTMLElement;
  label: string;
  mr: string;
}

// The column is a 220 × 560 board; the path climbs from the bottom.
const BW = 220;
const BH = 560;
const STEP = (BH - 40) / PIECES.length;
const stationY = (i: number) => BH - 20 - (i + 0.5) * STEP;
const pathX = (i: number) => (i % 2 ? 128 : 92);
const pieceX = (i: number) => (i % 2 ? 46 : 172);

function pathD() {
  let d = `M 110 ${BH - 10}`;
  for (let i = 0; i < PIECES.length; i++) {
    const y0 = i === 0 ? BH - 10 : stationY(i - 1);
    const y1 = stationY(i);
    const x0 = i === 0 ? 110 : pathX(i - 1);
    const x1 = pathX(i);
    d += ` C ${x0} ${y0 - (y0 - y1) * 0.55}, ${x1} ${y1 + (y0 - y1) * 0.55}, ${x1} ${y1}`;
  }
  d += ` C ${pathX(PIECES.length - 1)} ${stationY(PIECES.length - 1) - 20}, 110 20, 110 12`;
  return d;
}
const D = pathD();

export default function VillageGrowth({ className = "" }: { className?: string }) {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [built, setBuilt] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const road = useRef<SVGPathElement>(null);
  const column = useRef<HTMLDivElement>(null);
  const [yieldTo, setYieldTo] = useState(false);
  const [walker, setWalker] = useState({ x: 110, y: BH - 10 });

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-village]")].slice(0, PIECES.length);
    const t = setTimeout(() => setMarks(els.map((el) => ({ el, label: el.dataset.village ?? "", mr: el.dataset.villageMr ?? "" }))), 0);

    // Cheap (eight rects), so it runs straight from the scroll event.
    const labels = els.map((el) => el.querySelector<HTMLElement>(":scope > aside > div")).filter(Boolean) as HTMLElement[];
    const update = () => {
      const vh = window.innerHeight;
      // Make way: fade back while a section label scrolls up through the column.
      const box = column.current?.getBoundingClientRect();
      if (box) {
        setYieldTo(
          labels.some((l) => {
            const r = l.getBoundingClientRect();
            return r.bottom > box.top + 10 && r.top < box.bottom && r.left < box.right;
          })
        );
      }
      let n = 0;
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.6) n += 1;
      });
      setBuilt(n);
      const first = els[0]?.getBoundingClientRect();
      const lastEl = els[els.length - 1]?.getBoundingClientRect();
      if (first && lastEl) {
        const span = lastEl.top - first.top || 1;
        setProgress(Math.min(1, Math.max(0, (vh * 0.6 - first.top) / span)));
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // The walker stands at the tip of the drawn path.
  useEffect(() => {
    const pe = road.current;
    if (!pe) return;
    const L = pe.getTotalLength();
    const pt = pe.getPointAtLength(L * Math.min(0.995, Math.max(0.005, progress)));
    const id = setTimeout(() => setWalker({ x: pt.x, y: pt.y }), 0);
    return () => clearTimeout(id);
  }, [progress]);

  const jump = (i: number) => {
    const el = marks[i]?.el;
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o: { offset: number }) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -88 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div
        ref={column}
        className="sticky top-[40svh] h-[56svh] flex flex-col transition-opacity duration-500"
        style={{ opacity: yieldTo ? 0.12 : 1 }}
      >
        <svg viewBox={`0 0 ${BW} ${BH}`} preserveAspectRatio="xMinYMax meet" className="w-full flex-1 min-h-0 text-accent overflow-visible">
          {/* the road ahead, faint; the road walked, inked */}
          <path d={D} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.2" strokeDasharray="2 6" />
          <path ref={road} d={D} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - progress} />

          {PIECES.map((p, i) => {
            const on = i < built;
            const x = pieceX(i);
            const y = stationY(i);
            return (
              <g
                key={i}
                transform={`translate(${x} ${y - G})`}
                className="village-piece"
                style={{ pointerEvents: on ? "auto" : "none", cursor: "pointer" }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => jump(i)}
              >
                <rect x="-40" y="0" width="80" height="64" fill="transparent" />
                <line x1="-26" x2="26" y1={G} y2={G} stroke="currentColor" strokeWidth="1" opacity={on ? 0.8 : 0.15} />
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 100%",
                    transform: on ? "scale(1)" : "scale(0.2)",
                    opacity: on ? 1 : 0,
                    transition: "transform 900ms cubic-bezier(0.34,1.56,0.64,1), opacity 400ms",
                  }}
                >
                  {p.draw}
                </g>
                {!on && <circle cx="0" cy={G - 2} r="2.5" fill="currentColor" opacity="0.3" />}
                {hover === i && marks[i] && (
                  <text x="0" y={G + 16} textAnchor="middle" fontSize="11" fill="var(--foreground)" fontFamily="var(--font-body), sans-serif">
                    {marks[i].label}
                  </text>
                )}
              </g>
            );
          })}

          {/* the walker, at the tip of the path */}
          {progress > 0 && progress < 1 && <Figure x={walker.x} y={walker.y + 4} s={1.05} pose="walk" />}
          {progress >= 1 && <Figure x={110} y={16} s={1.1} pose="raise" />}
        </svg>
        <p className="label mt-2 pl-1">
          <span className="deva normal-case tracking-normal text-accent text-[13px] mr-1">गाव</span>
          {devaNum(built)}/{devaNum(PIECES.length)}
        </p>
      </div>
    </div>
  );
}
