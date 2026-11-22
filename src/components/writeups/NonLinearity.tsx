"use client";

// Interactive figures for the writeup "Why Neural Networks Need Non-Linearity". The Markdown
// places each one with <nn-demo kind="…"></nn-demo>; see components/blog/Markdown.tsx.
// Numbers shown in the figures are computed live from the same formulas the text uses.

import { useEffect, useMemo, useState } from "react";
import katex from "katex";
import { Button, Figure, Plot, Segmented, Slider, fmt, relu, series } from "@/components/writeups/kit";

const tex = (s: string) => ({ __html: katex.renderToString(s, { throwOnError: false }) });
const Tex = ({ children }: { children: string }) => <span dangerouslySetInnerHTML={tex(children)} />;

/* ---------- 1. Can you draw one line? ---------- */

const XOR = [
  { x: 0, y: 0, cls: 0 },
  { x: 1, y: 1, cls: 0 },
  { x: 0, y: 1, cls: 1 },
  { x: 1, y: 0, cls: 1 },
];

/** Filled dot for class 0, ring for class 1: two classes without relying on colour. */
function Point({ cx, cy, cls, r = 9, hot = false }: { cx: number; cy: number; cls: number; r?: number; hot?: boolean }) {
  return (
    <g>
      {hot && <circle cx={cx} cy={cy} r={r + 7} fill="var(--fg)" opacity={0.1} />}
      <circle cx={cx} cy={cy} r={r} fill={cls === 0 ? "var(--fg)" : "var(--surface)"} stroke="var(--fg)" strokeWidth={2.5} />
    </g>
  );
}

function XorLine() {
  const [ends, setEnds] = useState([
    { x: -0.35, y: 0.25 },
    { x: 1.45, y: 0.95 },
  ]);
  const [drag, setDrag] = useState<number | null>(null);
  const [a, b] = ends;

  const side = (p: { x: number; y: number }) => Math.sign((b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x));
  const sides = XOR.map(side);
  const separated =
    sides.every((v) => v !== 0) && sides[0] === sides[1] && sides[2] === sides[3] && sides[0] !== sides[2];

  return (
    <Figure caption="Drag either handle to move the line. Filled dots are one class, rings are the other.">
      <Plot
        x={[-0.6, 1.6]}
        y={[-0.6, 1.6]}
        height={380}
        grid={0.5}
        ariaLabel="Four points at the corners of a square, and a line you can drag"
        onPointer={(px, py, phase) => {
          let i = drag;
          if (phase === "down") {
            const d = ends.map((e) => Math.hypot(e.x - px, e.y - py));
            i = d[0] < d[1] ? 0 : 1;
            setDrag(i);
          }
          if (i === null) return;
          const clamp = (v: number) => Math.max(-0.55, Math.min(1.55, v));
          setEnds((prev) => prev.map((e, j) => (j === i ? { x: clamp(px), y: clamp(py) } : e)));
        }}
        onPointerUp={() => setDrag(null)}
      >
        {(s) => {
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          return (
            <>
              <line
                x1={s.x(a.x - dx * 20)}
                y1={s.y(a.y - dy * 20)}
                x2={s.x(a.x + dx * 20)}
                y2={s.y(a.y + dy * 20)}
                stroke="var(--chart-1)"
                strokeWidth={2.5}
              />
              {XOR.map((p) => (
                <Point key={`${p.x}${p.y}`} cx={s.x(p.x)} cy={s.y(p.y)} cls={p.cls} />
              ))}
              {ends.map((e, i) => (
                <circle key={i} cx={s.x(e.x)} cy={s.y(e.y)} r={drag === i ? 11 : 9} fill="var(--chart-1)" opacity={0.9} />
              ))}
            </>
          );
        }}
      </Plot>
      <p className="mt-3 text-center text-[15px] font-medium" aria-live="polite">
        {separated ? "Separated!" : "Not separated"}
        <span className="ml-2 font-normal text-muted">
          {separated ? "(this should be impossible)" : `· one side has ${sides.filter((v) => v > 0).length} of 4 points`}
        </span>
      </p>
    </Figure>
  );
}

/* ---------- 2. What a neuron computes ---------- */

function NeuronDiagram() {
  const inputs = [70, 150, 230];
  return (
    <svg viewBox="0 0 600 300" className="block h-auto w-full" role="img" aria-label="Diagram of a neuron: three weighted inputs and a bias are summed into z">
      <defs>
        <marker id="nn-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
        </marker>
      </defs>
      {inputs.map((y, i) => (
        <g key={y}>
          <line x1={110} y1={y} x2={318} y2={150} stroke="var(--muted)" strokeWidth={1.5} markerEnd="url(#nn-arrow)" />
          <circle cx={80} cy={y} r={28} fill="var(--card)" stroke="var(--line)" strokeWidth={2} />
          <text x={80} y={y + 7} textAnchor="middle" fontSize={21} fill="var(--fg)">
            x{["₁", "₂", "₃"][i]}
          </text>
          <text x={200} y={(y + 150) / 2 - 8} textAnchor="middle" fontSize={19} fill="var(--chart-1)" fontWeight={600}>
            w{["₁", "₂", "₃"][i]}
          </text>
        </g>
      ))}
      <line x1={350} y1={262} x2={350} y2={192} stroke="var(--muted)" strokeWidth={1.5} markerEnd="url(#nn-arrow)" />
      <text x={350} y={288} textAnchor="middle" fontSize={19} fill="var(--chart-2)" fontWeight={600}>
        bias b
      </text>
      <circle cx={350} cy={150} r={40} fill="var(--card)" stroke="var(--fg)" strokeWidth={2} />
      <text x={350} y={160} textAnchor="middle" fontSize={30} fill="var(--fg)">
        Σ
      </text>
      <line x1={392} y1={150} x2={500} y2={150} stroke="var(--muted)" strokeWidth={1.5} markerEnd="url(#nn-arrow)" />
      <text x={545} y={159} textAnchor="middle" fontSize={26} fill="var(--fg)" fontWeight={600}>
        z
      </text>
      <text x={350} y={56} textAnchor="middle" fontSize={18} fill="var(--muted)">
        z = w₁x₁ + w₂x₂ + w₃x₃ + b
      </text>
    </svg>
  );
}

function NeuronLine() {
  const [w, setW] = useState(1.5);
  const [b, setB] = useState(-1);
  return (
    <Figure caption="One input, so the neuron is just z = w·x + b. Sliding w tilts the line and b shifts it, but it never bends.">
      <NeuronDiagram />
      <div className="mt-6 border-t border-line pt-6">
        <Plot x={[-3, 3]} y={[-6, 6]} grid={1} height={300} curves={[{ f: (x) => w * x + b, style: "bold", color: "var(--chart-1)" }]} ariaLabel={`The line z = ${w}x + ${b}`} />
        <p className="mt-2 text-center text-[15px]">
          <Tex>{`z = ${fmt(w)}\\,x ${b < 0 ? "-" : "+"} ${fmt(Math.abs(b))}`}</Tex>
        </p>
        <div className="mt-4 grid gap-3">
          <Slider label="weight w" value={w} min={-3} max={3} onChange={setW} />
          <Slider label="bias b" value={b} min={-3} max={3} onChange={setB} />
        </div>
      </div>
    </Figure>
  );
}

/* ---------- 3. Stacking linear layers collapses into one ---------- */

const algebra = [
  { tex: "h = 3x + 1", note: "The first layer: a weighted input plus a bias." },
  { tex: "y = 2h + 5", note: "The second layer takes h as its input." },
  { tex: "y = 2(3x + 1) + 5", note: "Substitute the first layer into the second." },
  { tex: "y = 6x + 2 + 5", note: "Multiply out the brackets." },
  { tex: "y = 6x + 7", note: "Two layers, and the result is a single straight line." },
  { tex: "y = W_2(W_1x + b_1) + b_2", note: "The same thing with matrices, for layers of any width." },
  { tex: "y = (W_2W_1)\\,x + (W_2b_1 + b_2)", note: "Multiplying matrices is still linear, so it rearranges the same way." },
  { tex: "y = W'x + b'", note: "One weight matrix and one bias: exactly one linear layer." },
];

function CollapseAlgebra() {
  const [step, setStep] = useState(1);
  return (
    <Figure caption="Click through the algebra one step at a time.">
      <ol className="space-y-3">
        {algebra.slice(0, step).map((a, i) => (
          <li key={a.tex} className={`grid gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-center sm:gap-6 ${i === step - 1 ? "" : "opacity-55"}`}>
            <span className="text-[17px]">
              <Tex>{a.tex}</Tex>
            </span>
            <span className="text-[13px] text-muted">{a.note}</span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button primary onClick={() => setStep((s) => Math.min(algebra.length, s + 1))}>
          {step < algebra.length ? "Next step" : "Done"}
        </Button>
        <Button onClick={() => setStep(1)}>Start over</Button>
      </div>
    </Figure>
  );
}

/** Small seeded generator so the "random" weights are the same on the server and in the browser. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function CollapseLayers() {
  const [layers, setLayers] = useState(3);
  const [seed, setSeed] = useState(7);
  const weights = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: 10 }, () => ({ w: (r() < 0.5 ? -1 : 1) * (0.6 + r() * 0.7), b: r() * 2 - 1 }));
  }, [seed]);

  // Compose layer by layer: y = w·(previous) + b keeps the form W·x + B.
  let W = 1;
  let B = 0;
  for (const l of weights.slice(0, layers)) {
    W = l.w * W;
    B = l.w * B + l.b;
  }

  return (
    <Figure caption="Each layer has a random weight and bias. However many you stack, the whole network is one straight line.">
      <Plot x={[-3, 3]} y={[-4, 4]} grid={1} height={300} curves={[{ f: (x) => W * x + B, style: "bold", color: "var(--chart-1)" }]} ariaLabel={`${layers} linear layers composed into one line`} />
      <p className="mt-2 text-center text-[15px]">
        <span className="font-semibold">
          {layers} {layers === 1 ? "layer" : "layers"} = still 1 line
        </span>
        <span className="ml-2 text-muted">
          <Tex>{`y = ${fmt(W)}\\,x ${B < 0 ? "-" : "+"} ${fmt(Math.abs(B))}`}</Tex>
        </span>
      </p>
      <div className="mt-4 grid gap-3">
        <Slider label="layers" value={layers} min={1} max={10} step={1} onChange={setLayers} format={(v) => String(v)} />
      </div>
      <div className="mt-4">
        <Button onClick={() => setSeed((s) => s + 1)}>New random weights</Button>
      </div>
    </Figure>
  );
}

/* ---------- 4. Solving XOR with ReLU ---------- */

const xorNet = XOR.map((p) => {
  const h1 = relu(p.x + p.y);
  const h2 = relu(p.x + p.y - 1);
  return { ...p, h1, h2, out: h1 - 2 * h2, pre2: p.x + p.y - 1 };
});

function XorRelu() {
  const [hidden, setHidden] = useState(false);
  const [hot, setHot] = useState<number | null>(null);

  return (
    <Figure caption="Each point moves from its inputs (x₁, x₂) to its hidden values (h₁, h₂). Hover a point or a row to match them up.">
      <Plot
        x={[-0.5, 2.5]}
        y={[-0.5, 1.5]}
        grid={0.5}
        height={300}
        curves={hidden ? [{ f: (h1) => (h1 - 0.5) / 2, style: "solid", color: "var(--chart-1)" }] : []}
        ariaLabel={hidden ? "The four points in hidden space, separated by one line" : "The four XOR points in input space"}
      >
        {(s) => (
          <>
            <text x={s.x(2.45)} y={s.y(0) - 8} textAnchor="end" fontSize={13} fill="var(--muted)">
              {hidden ? "h₁" : "x₁"}
            </text>
            <text x={s.x(0) + 8} y={s.y(1.45)} fontSize={13} fill="var(--muted)">
              {hidden ? "h₂" : "x₂"}
            </text>
            {xorNet.map((p, i) => {
              const px = hidden ? p.h1 : p.x;
              const py = hidden ? p.h2 : p.y;
              return (
                <g
                  key={i}
                  onPointerEnter={() => setHot(i)}
                  onPointerLeave={() => setHot(null)}
                  style={{ transform: `translate(${s.x(px)}px, ${s.y(py)}px)`, transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)" }}
                >
                  <Point cx={0} cy={0} cls={p.cls} hot={hot === i} />
                </g>
              );
            })}
            {hidden && (
              <text x={s.x(1)} y={s.y(0) + 28} textAnchor="middle" fontSize={12} fill="var(--muted)">
                (0,1) and (1,0) land on the same spot
              </text>
            )}
          </>
        )}
      </Plot>
      <div className="mt-3 flex justify-center">
        <Button primary onClick={() => setHidden((h) => !h)}>
          {hidden ? "Back to input space" : "Move to hidden space"}
        </Button>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-center text-[14px] tabular-nums">
          <thead className="text-[12px] text-muted">
            <tr>
              <th className="py-2 font-medium">x₁, x₂</th>
              <th className="py-2 font-medium">
                h₁<span className="max-sm:hidden"> = ReLU(x₁ + x₂)</span>
              </th>
              <th className="py-2 font-medium">
                h₂<span className="max-sm:hidden"> = ReLU(x₁ + x₂ − 1)</span>
              </th>
              <th className="py-2 font-medium">
                y<span className="max-sm:hidden"> = h₁ − 2h₂</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {xorNet.map((p, i) => (
              <tr
                key={i}
                onPointerEnter={() => setHot(i)}
                onPointerLeave={() => setHot(null)}
                className={`border-t border-line transition-colors ${hot === i ? "bg-fg/[0.06]" : ""}`}
              >
                <td className="whitespace-nowrap py-2">
                  ({p.x}, {p.y})
                </td>
                <td className="py-2">{p.h1}</td>
                <td className="py-2">
                  {p.h2}
                  {p.pre2 < 0 && (
                    <span className="ml-1.5 whitespace-nowrap text-[12px] text-muted">
                      (<span className="max-sm:hidden">−1 </span>clipped<span className="max-sm:hidden"> to 0</span>)
                    </span>
                  )}
                </td>
                <td className="py-2 font-semibold">{p.out}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Figure>
  );
}

/* ---------- 5. ReLU as a hinge ---------- */

function Hinge() {
  const [a, setA] = useState(1.5);
  const [b, setB] = useState(0.5);
  return (
    <Figure caption="b moves the bend left and right. a sets how much the slope changes there: from 0 before the bend to a after it.">
      <Plot x={[-3, 3]} y={[-5, 5]} grid={1} height={300} curves={[{ f: (x) => a * relu(x - b), style: "bold", color: "var(--chart-1)" }]} ariaLabel={`A hinge with bend at ${b} and slope ${a}`}>
        {(s) => (
          <>
            <circle cx={s.x(b)} cy={s.y(0)} r={6} fill="var(--chart-2)" />
            <text x={s.x(b)} y={s.y(0) + (a >= 0 ? 22 : -12)} textAnchor="middle" fontSize={12} fill="var(--chart-2)">
              bend at x = {fmt(b)}
            </text>
          </>
        )}
      </Plot>
      <p className="mt-2 text-center text-[15px]">
        <Tex>{`y = ${fmt(a)} \\cdot \\mathrm{ReLU}(x ${b < 0 ? "+" : "-"} ${fmt(Math.abs(b))})`}</Tex>
      </p>
      <div className="mt-4 grid gap-3">
        <Slider label="a (slope)" value={a} min={-3} max={3} onChange={setA} />
        <Slider label="b (bend)" value={b} min={-2} max={2} onChange={setB} />
      </div>
    </Figure>
  );
}

/* ---------- 6. Adding hinges to build a curve ---------- */

/** Hinges at 0, Δ, 2Δ… on [0, 3] that trace y = x²: the first weight is the first slope, the
 *  rest are each slope change, which is 2Δ for a parabola. */
function parabolaNet(n: number) {
  const d = 3 / n;
  return Array.from({ length: n }, (_, i) => ({ k: i * d, w: i === 0 ? d : 2 * d }));
}
const maxError = (n: number) => (3 / n) ** 2 / 4;

function CurveBuilder() {
  const [n, setN] = useState<3 | 6>(3);
  const [x, setX] = useState(1.5);
  const net = parabolaNet(n);
  const out = (v: number) => net.reduce((s, h) => s + h.w * relu(v - h.k), 0);
  const y = out(x);

  const bars = [1, 2, 3, 6, 12];

  return (
    <Figure caption="Dashed lines are the weighted hinges; the bold line is their sum; the faint line is the true x². Move x to run the network by hand.">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="Neurons"
          value={n}
          onChange={setN}
          options={[
            { value: 3, label: "3 neurons" },
            { value: 6, label: "6 neurons" },
          ]}
        />
        <span className="text-[13px] text-muted">max error {maxError(n)}</span>
      </div>
      <Plot
        x={[0, 3]}
        y={[0, 9.5]}
        grid={1}
        height={340}
        curves={[
          { f: (v) => v * v, style: "faint", key: "true" },
          ...net.map((h, i) => ({ f: (v: number) => h.w * relu(v - h.k), style: "dashed" as const, color: series[i % series.length], key: `h${i}` })),
          { f: out, style: "bold", key: "sum" },
        ]}
        ariaLabel={`A ${n}-neuron network approximating x squared`}
      >
        {(s) => (
          <>
            <line x1={s.x(x)} x2={s.x(x)} y1={s.y(0)} y2={s.y(9.5)} stroke="var(--muted)" strokeDasharray="2 4" />
            <circle cx={s.x(x)} cy={s.y(x * x)} r={5} fill="var(--surface)" stroke="var(--fg)" strokeWidth={1.5} opacity={0.6} />
            <circle cx={s.x(x)} cy={s.y(y)} r={6} fill="var(--fg)" />
          </>
        )}
      </Plot>
      <div className="mt-4 grid gap-3">
        <Slider label="x" value={x} min={0} max={3} step={0.01} onChange={setX} />
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-[13px] tabular-nums">
          <thead className="text-[12px] text-muted">
            <tr>
              <th className="py-1.5 text-left font-medium">neuron</th>
              <th className="py-1.5 text-right font-medium">
                h<span className="max-sm:hidden"> = ReLU(x − bend)</span>
              </th>
              <th className="py-1.5 text-right font-medium">× weight</th>
              <th className="py-1.5 text-right font-medium">
                <span className="max-sm:hidden">= </span>contribution
              </th>
            </tr>
          </thead>
          <tbody>
            {net.map((h, i) => (
              <tr key={i} className="border-t border-line">
                <td className="py-1.5">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: series[i % series.length] }} />h{i + 1}
                </td>
                <td className="whitespace-nowrap py-1.5 text-right">
                  <span className="max-sm:hidden">
                    ReLU({fmt(x)} − {fmt(h.k, h.k % 1 ? 1 : 0)}) ={" "}
                  </span>
                  {fmt(relu(x - h.k))}
                </td>
                <td className="whitespace-nowrap py-1.5 text-right">× {fmt(h.w, h.w % 1 ? 1 : 0)}</td>
                <td className="py-1.5 text-right">{fmt(h.w * relu(x - h.k))}</td>
              </tr>
            ))}
            <tr className="border-t border-fg/30 font-semibold">
              <td className="py-1.5" colSpan={3}>
                sum (network output)
              </td>
              <td className="py-1.5 text-right">{fmt(y, 3)}</td>
            </tr>
            <tr className="text-muted">
              <td className="py-1" colSpan={3}>
                true x²
              </td>
              <td className="py-1 text-right">{fmt(x * x, 3)}</td>
            </tr>
            <tr className="text-muted">
              <td className="py-1" colSpan={3}>
                error
              </td>
              <td className="py-1 text-right">{fmt(Math.abs(y - x * x), 3)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="text-[13px] font-medium">Max error vs number of neurons</p>
        <div className="mt-3 grid grid-cols-5 items-end gap-3" style={{ height: 140 }}>
          {bars.map((k) => {
            const e = maxError(k);
            const h = Math.max(2, (e / maxError(1)) * 100);
            return (
              <div key={k} className="flex h-full flex-col items-center justify-end gap-1.5">
                <span className="tabular text-[11px] text-muted">{e < 0.1 ? e.toFixed(4) : e.toFixed(2)}</span>
                <div className={`w-full max-w-12 rounded-t-md ${k === n ? "bg-fg" : "bg-fg/20"}`} style={{ height: `${h}%` }} />
                <span className="tabular text-[12px]">{k}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-[12px] text-muted">Each doubling of neurons halves the spacing between bends and divides the error by four.</p>
      </div>
    </Figure>
  );
}

/* ---------- 7. Universal approximation ---------- */

type Target = "square" | "sine" | "step" | "draw";
const targets: Record<Exclude<Target, "draw">, { f: (x: number) => number; x: [number, number]; y: [number, number] }> = {
  square: { f: (x) => x * x, x: [0, 3], y: [-0.5, 9.5] },
  sine: { f: (x) => Math.sin(x), x: [0, 2 * Math.PI], y: [-1.4, 1.4] },
  step: { f: (x) => (x < 1.5 ? 0 : 1), x: [0, 3], y: [-0.4, 1.4] },
};
const DRAW_X: [number, number] = [0, 3];
const DRAW_N = 121;

function Universal() {
  const [target, setTarget] = useState<Target>("sine");
  const [n, setN] = useState(6);
  const [drawn, setDrawn] = useState(() => Array.from({ length: DRAW_N }, (_, i) => 0.8 * Math.sin((i / (DRAW_N - 1)) * 3 * 2.2)));
  const [last, setLast] = useState<number | null>(null);

  const t =
    target === "draw"
      ? {
          f: (x: number) => {
            const p = ((x - DRAW_X[0]) / (DRAW_X[1] - DRAW_X[0])) * (DRAW_N - 1);
            const i = Math.max(0, Math.min(DRAW_N - 2, Math.floor(p)));
            return drawn[i] + (drawn[i + 1] - drawn[i]) * (p - i);
          },
          x: DRAW_X,
          y: [-1.5, 1.5] as [number, number],
        }
      : targets[target];

  // n hinges at evenly spaced knots: a piecewise-linear interpolation of the target.
  const knots = Array.from({ length: n + 1 }, (_, i) => t.x[0] + ((t.x[1] - t.x[0]) * i) / n);
  const vals = knots.map(t.f);
  const slopes = knots.slice(0, -1).map((k, i) => (vals[i + 1] - vals[i]) / (knots[i + 1] - k));
  const weights = slopes.map((s, i) => (i === 0 ? s : s - slopes[i - 1]));
  const approx = (x: number) => vals[0] + weights.reduce((acc, w, i) => acc + w * relu(x - knots[i]), 0);

  let err = 0;
  for (let i = 0; i <= 300; i++) {
    const x = t.x[0] + ((t.x[1] - t.x[0]) * i) / 300;
    err = Math.max(err, Math.abs(approx(x) - t.f(x)));
  }
  const negatives = weights.filter((w) => w < -1e-9).length;

  return (
    <Figure caption={target === "draw" ? "Draw your own curve on the plot, then change the number of neurons." : "Pick a target and add neurons. The bold line is the network; the faint line is the target."}>
      <div className="mb-4">
        <Segmented
          label="Target function"
          value={target}
          onChange={setTarget}
          options={[
            { value: "square", label: "x²" },
            { value: "sine", label: "sin x" },
            { value: "step", label: "step" },
            { value: "draw", label: "draw your own" },
          ]}
        />
      </div>
      <Plot
        x={t.x}
        y={t.y}
        grid={1}
        gridY={target === "square" ? 1 : 0.5}
        height={320}
        curves={[
          { f: t.f, style: "faint", key: `t-${target}` },
          { f: approx, style: "bold", color: "var(--chart-1)", key: "approx" },
        ]}
        ariaLabel={`A ${n}-neuron approximation of the target`}
        onPointer={
          target === "draw"
            ? (px, py) => {
                const i = Math.round(((px - DRAW_X[0]) / (DRAW_X[1] - DRAW_X[0])) * (DRAW_N - 1));
                if (i < 0 || i >= DRAW_N) return;
                const v = Math.max(-1.45, Math.min(1.45, py));
                setDrawn((prev) => {
                  const next = prev.slice();
                  const from = last ?? i;
                  const lo = Math.min(from, i);
                  const hi = Math.max(from, i);
                  for (let j = lo; j <= hi; j++) next[j] = hi === lo ? v : prev[from] + ((v - prev[from]) * (j - from)) / (i - from);
                  next[i] = v;
                  return next;
                });
                setLast(i);
              }
            : undefined
        }
        onPointerUp={() => setLast(null)}
      >
        {(s) => (
          <g fill="var(--chart-1)">
            {knots.map((k, i) => (
              <circle key={i} cx={s.x(k)} cy={s.y(vals[i])} r={3} />
            ))}
          </g>
        )}
      </Plot>
      <div className="mt-4 grid gap-3">
        <Slider label="neurons" value={n} min={1} max={30} step={1} onChange={setN} format={(v) => String(v)} />
      </div>
      <p className="mt-3 text-[13px] text-muted">
        {n} {n === 1 ? "neuron" : "neurons"} · {negatives} negative {negatives === 1 ? "weight" : "weights"} · max error {fmt(err, 3)}
      </p>
    </Figure>
  );
}

/* ---------- 8. The geometric view: folding space ---------- */

const A = [
  [1.1, 0.8],
  [-0.7, 0.9],
];
const C = [0.2, -0.3];
const linear = ([x, y]: number[]) => [A[0][0] * x + A[0][1] * y + C[0], A[1][0] * x + A[1][1] * y + C[1]];
const gridLines = (() => {
  const lines: number[][][] = [];
  for (let v = -2; v <= 2 + 1e-9; v += 0.5) {
    const h: number[][] = [];
    const vert: number[][] = [];
    for (let t = -2; t <= 2 + 1e-9; t += 0.1) {
      h.push([t, v]);
      vert.push([v, t]);
    }
    lines.push(h, vert);
  }
  return lines;
})();

function FoldGrid() {
  const [stage, setStage] = useState(0);
  const [t, setT] = useState(1);

  useEffect(() => {
    if (stage === 0) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(1);
      return;
    }
    setT(0);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1100);
      setT(1 - (1 - p) ** 3);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  const place = (p: number[]) => {
    const l = linear(p);
    const lerp = (a: number[], b: number[], k: number) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    if (stage === 0) return p;
    if (stage === 1) return lerp(p, l, t);
    return lerp(l, [relu(l[0]), relu(l[1])], t);
  };

  return (
    <Figure caption="Linear layers stretch and rotate. Non-linearities bend and fold.">
      <Plot x={[-3, 3]} y={[-3, 3]} grid={1} height={380} ariaLabel="A grid being transformed by a linear layer and then folded by ReLU">
        {(s) => (
          <g fill="none" strokeLinejoin="round">
            {gridLines.map((line, i) => (
              <polyline
                key={i}
                points={line
                  .map(place)
                  .map(([x, y]) => `${s.x(x).toFixed(1)},${s.y(y).toFixed(1)}`)
                  .join(" ")}
                stroke={i % 2 === 0 ? "var(--chart-1)" : "var(--chart-2)"}
                strokeWidth={1.4}
                opacity={0.75}
              />
            ))}
          </g>
        )}
      </Plot>
      <p className="mt-3 text-center text-[13px] text-muted" aria-live="polite">
        {["The input space: a square grid.", "After a linear layer: still straight, still parallel, just stretched and turned.", "After ReLU: every negative coordinate is clipped to 0, so the grid folds onto the axes."][stage]}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Button primary={stage === 0} onClick={() => setStage(1)}>
          1. Apply a linear layer
        </Button>
        <Button primary={stage === 1} onClick={() => setStage(2)}>
          2. Apply ReLU
        </Button>
        <Button
          onClick={() => {
            setStage(0);
            setT(1);
          }}
        >
          Reset
        </Button>
      </div>
    </Figure>
  );
}

/* ---------- 9. Choosing an activation function ---------- */

const activations = [
  { name: "ReLU", f: relu },
  { name: "Leaky ReLU", f: (z: number) => (z > 0 ? z : 0.1 * z) },
  { name: "GELU", f: (z: number) => 0.5 * z * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (z + 0.044715 * z ** 3))) },
  { name: "sigmoid", f: (z: number) => 1 / (1 + Math.exp(-z)) },
  { name: "tanh", f: Math.tanh },
];

function Activations() {
  const [on, setOn] = useState<Set<string>>(new Set(["ReLU", "sigmoid", "tanh"]));
  const [deriv, setDeriv] = useState(false);
  const d = (f: (z: number) => number) => (z: number) => (f(z + 1e-4) - f(z - 1e-4)) / 2e-4;

  return (
    <Figure caption={deriv ? "Derivatives: sigmoid and tanh flatten to almost zero away from the middle, so gradients vanish there. ReLU's stays at 1 for every positive input." : "The activation functions themselves. Turn on the derivative to see how they pass gradients back."}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Activations" className="flex flex-wrap gap-1.5">
          {activations.map((a, i) => {
            const active = on.has(a.name);
            return (
              <button
                key={a.name}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setOn((prev) => {
                    const next = new Set(prev);
                    if (next.has(a.name)) next.delete(a.name);
                    else next.add(a.name);
                    return next;
                  })
                }
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium ring-1 ring-inset transition-colors ${
                  active ? "text-fg ring-fg/40" : "text-muted ring-line"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: active ? series[i] : "var(--line)" }} />
                {a.name}
              </button>
            );
          })}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] font-medium">
          <input type="checkbox" checked={deriv} onChange={(e) => setDeriv(e.target.checked)} className="accent-[var(--fg)]" />
          Show derivative
        </label>
      </div>
      <Plot
        x={[-4, 4]}
        y={deriv ? [-0.25, 1.25] : [-1.5, 3]}
        grid={1}
        gridY={deriv ? 0.25 : 1}
        height={320}
        curves={activations
          .map((a, i) => ({ a, i }))
          .filter(({ a }) => on.has(a.name))
          .map(({ a, i }) => ({ f: deriv ? d(a.f) : a.f, style: "solid" as const, color: series[i], key: a.name + deriv }))}
        ariaLabel={deriv ? "Derivatives of activation functions" : "Activation functions"}
      />
    </Figure>
  );
}

/* ---------- dispatcher ---------- */

const demos = {
  "xor-line": XorLine,
  neuron: NeuronLine,
  "collapse-algebra": CollapseAlgebra,
  "collapse-layers": CollapseLayers,
  "xor-relu": XorRelu,
  hinge: Hinge,
  curve: CurveBuilder,
  universal: Universal,
  fold: FoldGrid,
  activations: Activations,
} as const;

export default function NeuralDemo({ kind }: { kind: string }) {
  const Demo = demos[kind as keyof typeof demos];
  return Demo ? <Demo /> : null;
}
