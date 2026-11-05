"use client";

// Auto-playing walkthrough of DocuNexus: sign in → design an ontology with AI → upload FIR
// records (CSV/JSON) → GraphRAG processing in the background → ask questions in plain
// language. Fictional sample data: no real people, places or case numbers.

import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChartColumn,
  CircleCheck,
  Cpu,
  Database,
  FileJson,
  FileSpreadsheet,
  FileText,
  Gavel,
  Link2,
  LoaderCircle,
  Lock,
  Mail,
  MapPin,
  Network,
  Search,
  Send,
  Sparkles,
  Upload,
  UserRound,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { ScreenRecording, between, clamp, type Scene, type Shot, type Waypoint } from "@/components/case-study/ScreenRecording";

/* ====================================================================== */
/* Timeline                                                                */
/* ====================================================================== */

const DURATION = 36;
const SCENES: Scene[] = [
  { t: 0, label: "Sign in", path: "/login" },
  { t: 5, label: "Ontology", path: "/ontology/fir-records" },
  { t: 15, label: "Upload", path: "/data/upload" },
  { t: 20.5, label: "Processing", path: "/jobs/ingest-0042" },
  { t: 26, label: "Ask", path: "/ask" },
];

const EMAIL = "analyst@records-unit.example";
const PROMPT = "Police FIRs with complainant, accused, offence section, police station, place and date";
const QUESTION = "Which stations saw the most vehicle thefts near bus stands in 2024?";

const CURSOR: Waypoint[] = [
  { t: 0, abs: { x: 760, y: 460 } },
  { t: 1.1, id: "email", ax: 0.25 },
  { t: 3.0, id: "password", ax: 0.25 },
  { t: 4.0, id: "signin" },
  { t: 5.9, id: "prompt", ax: 0.3, ay: 0.4, move: 0.8 },
  { t: 8.7, id: "generate" },
  { t: 11.6, id: "node-accused", move: 0.9 },
  { t: 13.4, id: "save-ontology", move: 0.9 },
  { t: 15.9, id: "dropzone", move: 0.8 },
  { t: 18.0, id: "mapping", ax: 0.7, ay: 0.55, move: 0.8 },
  { t: 19.6, id: "start-processing", move: 0.8 },
  { t: 22.5, id: "stage-graph", ax: 0.85, move: 1.0 },
  { t: 26.8, id: "ask-input", ax: 0.2, move: 1.0 },
  { t: 29.4, id: "ask-send" },
  { t: 30.5, id: "answer", ax: 0.8, ay: 0.3, move: 0.8 },
  { t: 32.2, id: "answer-chart", ax: 0.6, ay: 0.6, move: 1.0 },
  { t: 34.0, id: "citations", ax: 0.3, move: 0.8 },
];

const CLICKS = [1.2, 3.1, 4.1, 6.0, 8.8, 11.7, 13.5, 16.0, 19.7, 26.9, 29.5];

const CAMERA: Shot[] = [
  { t: 0 },
  { t: 0.6 },
  { t: 1.3, id: "login-card", max: 1.6, pad: 0.14 },
  { t: 4.4, id: "login-card", max: 1.6, pad: 0.14 },
  { t: 5.2 },
  { t: 5.5 },
  { t: 6.2, id: "assistant", max: 1.7, pad: 0.1 },
  { t: 8.9, id: "assistant", max: 1.7, pad: 0.1 },
  { t: 9.7, id: "graph", max: 1.4, pad: 0.06 },
  { t: 11.2, id: "graph", max: 1.4, pad: 0.06 },
  { t: 11.9, id: "inspector-zone", max: 1.6, pad: 0.06 },
  { t: 13.0, id: "inspector-zone", max: 1.6, pad: 0.06 },
  { t: 13.8, id: "save-ontology", max: 1.6, pad: 0.7 },
  { t: 14.6, id: "save-ontology", max: 1.6, pad: 0.7 },
  { t: 15.2 },
  { t: 15.6 },
  { t: 16.3, id: "files", max: 1.6, pad: 0.12 },
  { t: 17.3, id: "files", max: 1.6, pad: 0.12 },
  { t: 18.1, id: "mapping", max: 1.5, pad: 0.08 },
  { t: 19.4, id: "mapping", max: 1.5, pad: 0.08 },
  { t: 20.1, id: "start-processing", max: 1.6, pad: 0.7 },
  { t: 20.6 },
  { t: 21.2, id: "pipeline", max: 1.5, pad: 0.08 },
  { t: 23.6, id: "pipeline", max: 1.5, pad: 0.08 },
  { t: 24.3, id: "counters", max: 1.6, pad: 0.12 },
  { t: 25.6, id: "counters", max: 1.6, pad: 0.12 },
  { t: 26.2 },
  { t: 26.6 },
  { t: 27.3, id: "ask-bar", max: 1.6, pad: 0.2 },
  { t: 29.6, id: "ask-bar", max: 1.6, pad: 0.2 },
  { t: 30.4, id: "answer", max: 1.45, pad: 0.06 },
  { t: 34.6, id: "answer", max: 1.45, pad: 0.06 },
  { t: 35.4 },
  { t: DURATION },
];

/* ====================================================================== */
/* Shared look                                                             */
/* ====================================================================== */

const bg = "bg-[#0d0d0f]";
const panel = "bg-[#141417]";
const raised = "bg-[#1c1c20]";
const line = "border-white/[0.08]";
const muted = "text-white/50";

const typed = (text: string, t: number, start: number, dur: number) =>
  text.slice(0, Math.floor(clamp((t - start) / dur) * text.length));
const Caret = ({ on }: { on: boolean }) => (on ? <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-white" /> : null);

function AppNav({ active }: { active: string }) {
  return (
    <div className={`flex h-11 items-center justify-between border-b ${line} px-5 text-[12px]`}>
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 font-semibold tracking-tight text-white">
          <Network className="h-4 w-4" /> DocuNexus
        </span>
        {["Ontology", "Data", "Jobs", "Ask"].map((n) => (
          <span key={n} className={n === active ? "text-white" : muted}>
            {n}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className={`rounded-md border ${line} px-2.5 py-1 ${muted}`}>Records Unit</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-[10px] font-medium text-white">AN</span>
      </div>
    </div>
  );
}

/* ====================================================================== */
/* 1. Sign in                                                              */
/* ====================================================================== */

function SignIn({ t }: { t: number }) {
  const focus = between(t, 1.2, 3.0) ? "email" : between(t, 3.1, 4.0) ? "password" : null;
  const caret = Math.floor(t * 2) % 2 === 0;
  const field = (active: boolean) =>
    `mt-1.5 flex h-9 items-center gap-2 rounded-lg border px-3 text-[12px] text-white ${raised} ${active ? "border-white/60 ring-2 ring-white/10" : line}`;
  return (
    <div className={`flex h-full items-center justify-center ${bg}`}>
      <div data-t="login-card" className={`w-[340px] rounded-2xl border ${line} ${panel} p-7`}>
        <p className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <Network className="h-5 w-5" /> DocuNexus
        </p>
        <p className={`mt-1 text-[12px] ${muted}`}>Sign in to your organisation&apos;s knowledge graph</p>
        <label className="mt-6 block text-[11px] text-white/70">Work email</label>
        <div data-t="email" className={field(focus === "email")}>
          <Mail className={`h-3.5 w-3.5 shrink-0 ${muted}`} />
          <span>{typed(EMAIL, t, 1.3, 1.5)}</span>
          <Caret on={focus === "email" && caret} />
        </div>
        <label className="mt-4 block text-[11px] text-white/70">Password</label>
        <div data-t="password" className={field(focus === "password")}>
          <Lock className={`h-3.5 w-3.5 shrink-0 ${muted}`} />
          <span className="tracking-[0.25em]">{"•".repeat(Math.floor(clamp((t - 3.2) / 0.7) * 11))}</span>
          <Caret on={focus === "password" && caret} />
        </div>
        <div
          data-t="signin"
          className={`mt-6 flex h-10 items-center justify-center gap-2 rounded-lg bg-white text-[12px] font-semibold text-black transition-transform ${
            between(t, 4.1, 4.3) ? "scale-[0.97]" : ""
          }`}
        >
          {t >= 4.2 ? (
            <>
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Signing in
            </>
          ) : (
            <>
              Sign in <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </div>
        <p className={`mt-4 text-center text-[11px] ${muted}`}>Single sign-on available for your organisation</p>
      </div>
    </div>
  );
}

/* ====================================================================== */
/* 2. Ontology creator                                                     */
/* ====================================================================== */

type Node = { id: string; label: string; kind: string; icon: LucideIcon; x: number; y: number };
const NODES: Node[] = [
  { id: "fir", label: "FIR", kind: "Case", icon: FileText, x: 255, y: 210 },
  { id: "complainant", label: "Complainant", kind: "Person", icon: UserRound, x: 95, y: 90 },
  { id: "accused", label: "Accused", kind: "Person", icon: UserRound, x: 95, y: 330 },
  { id: "offence", label: "Offence", kind: "Section", icon: Gavel, x: 415, y: 90 },
  { id: "station", label: "Police station", kind: "Place", icon: Building2, x: 415, y: 330 },
  { id: "place", label: "Location", kind: "Place", icon: MapPin, x: 255, y: 395 },
  { id: "date", label: "Date", kind: "Time", icon: CalendarDays, x: 255, y: 40 },
];
const EDGES: [string, string, string][] = [
  ["complainant", "fir", "FILED"],
  ["accused", "fir", "ACCUSED_IN"],
  ["fir", "offence", "UNDER_SECTION"],
  ["fir", "station", "REGISTERED_AT"],
  ["fir", "place", "OCCURRED_AT"],
  ["place", "station", "IN_JURISDICTION"],
  ["fir", "date", "ON_DATE"],
];
const nodeAt = (id: string) => NODES.find((n) => n.id === id)!;
const appearAt = (i: number) => 9.0 + i * 0.22;

function Ontology({ t }: { t: number }) {
  const generating = between(t, 8.8, 10.8);
  const selected = t >= 11.7 ? "accused" : null;
  const saved = t >= 13.5;
  const caret = Math.floor(t * 2) % 2 === 0;

  return (
    <div className={`flex h-full flex-col ${bg}`}>
      <AppNav active="Ontology" />
      <div className={`flex h-11 items-center justify-between border-b ${line} px-5 text-[12px]`}>
        <div className="flex items-center gap-3">
          <span className="font-medium text-white">FIR records</span>
          <span className={`rounded-full ${raised} px-2 py-0.5 text-[10px] ${muted}`}>{saved ? "v1 · saved" : "v1 · draft"}</span>
        </div>
        <span
          data-t="save-ontology"
          className={`flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 font-semibold text-black transition-transform ${
            between(t, 13.5, 13.7) ? "scale-95" : ""
          }`}
        >
          {saved ? <CircleCheck className="h-3.5 w-3.5" /> : null}
          {saved ? "Saved" : "Save ontology"}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[240px_1fr_210px]">
        {/* AI assistant */}
        <div data-t="assistant" className={`flex flex-col gap-3 border-r ${line} ${panel} p-4`}>
          <p className="flex items-center gap-2 text-[12px] font-medium text-white">
            <Sparkles className="h-3.5 w-3.5" /> Ontology assistant
          </p>
          <p className={`text-[11px] leading-relaxed ${muted}`}>Describe your documents and I&apos;ll draft the entities and how they relate.</p>
          <div
            data-t="prompt"
            className={`min-h-[96px] rounded-lg border ${between(t, 6.0, 8.8) ? "border-white/60" : line} ${raised} p-2.5 text-[11.5px] leading-relaxed text-white`}
          >
            {typed(PROMPT, t, 6.1, 2.4)}
            <Caret on={between(t, 6.0, 8.8) && caret} />
          </div>
          <span
            data-t="generate"
            className={`flex items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-[12px] font-semibold text-black ${
              between(t, 8.8, 9.0) ? "scale-[0.97]" : ""
            }`}
          >
            {generating ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <WandSparkles className="h-3.5 w-3.5" />}
            {generating ? "Drafting ontology" : "Generate with AI"}
          </span>
          {t >= 10.8 && (
            <div className={`rounded-lg border ${line} p-2.5 text-[11px] leading-relaxed text-white/80`}>
              Drafted <span className="text-white">7 entities</span> and <span className="text-white">7 relationships</span> from your
              description. Review and edit them on the canvas.
            </div>
          )}
        </div>

        {/* Graph canvas */}
        <div
          data-t="graph"
          className="relative overflow-hidden"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        >
          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            {EDGES.map(([a, b, label]) => {
              const na = nodeAt(a);
              const nb = nodeAt(b);
              const ia = NODES.indexOf(na);
              const ib = NODES.indexOf(nb);
              const k = clamp((t - Math.max(appearAt(ia), appearAt(ib)) - 0.15) / 0.45);
              if (k <= 0) return null;
              const len = Math.hypot(nb.x - na.x, nb.y - na.y);
              return (
                <g key={label}>
                  <line
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.2"
                    strokeDasharray={len}
                    strokeDashoffset={len * (1 - k)}
                  />
                  {k > 0.9 && (
                    <text x={(na.x + nb.x) / 2} y={(na.y + nb.y) / 2 - 4} fill="rgba(255,255,255,0.45)" fontSize="8" textAnchor="middle" fontFamily="var(--font-geist-mono)">
                      {label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          {NODES.map((n, i) => {
            const k = clamp((t - appearAt(i)) / 0.3);
            if (k <= 0) return null;
            const Ico = n.icon;
            const isSel = selected === n.id;
            return (
              <div
                key={n.id}
                data-t={`node-${n.id}`}
                className={`absolute flex items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-2 text-[11.5px] ${
                  isSel ? "border-white bg-white text-black" : `border-white/20 ${raised} text-white`
                }`}
                style={{ left: n.x, top: n.y, opacity: k, transform: `translate(-50%, -50%) scale(${0.85 + 0.15 * k})` }}
              >
                <Ico className="h-3.5 w-3.5" />
                <span className="font-medium">{n.label}</span>
                <span className={`text-[9.5px] ${isSel ? "text-black/50" : "text-white/40"}`}>{n.kind}</span>
              </div>
            );
          })}
          {t < 9.0 && (
            <p className={`absolute inset-0 flex items-center justify-center text-[12px] ${muted}`}>Your ontology will appear here</p>
          )}
        </div>

        {/* Inspector */}
        <div data-t="inspector-zone" className={`border-l ${line} ${panel} p-4 text-[11.5px]`}>
          {selected ? (
            <div>
              <p className={`text-[10.5px] ${muted}`}>Entity</p>
              <p className="mt-1 flex items-center gap-2 text-[14px] font-semibold text-white">
                <UserRound className="h-4 w-4" /> Accused
              </p>
              <p className={`mt-0.5 ${muted}`}>Type: Person</p>
              <p className={`mt-4 text-[10.5px] ${muted}`}>Properties</p>
              <ul className="mt-1.5 space-y-1.5 text-white/85">
                {[
                  ["name", "text"],
                  ["age", "number"],
                  ["gender", "enum"],
                  ["address", "text"],
                ].map(([k, v]) => (
                  <li key={k} className={`flex justify-between rounded-md border ${line} px-2 py-1`}>
                    <span>{k}</span>
                    <span className={muted}>{v}</span>
                  </li>
                ))}
              </ul>
              <p className={`mt-4 text-[10.5px] ${muted}`}>Relationships</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-white/85">
                <Link2 className="h-3 w-3" /> ACCUSED_IN → FIR
              </p>
              <p className={`mt-3 flex items-center gap-1.5 ${muted}`}>
                <Sparkles className="h-3 w-3" /> Merge duplicates by name + address
              </p>
            </div>
          ) : (
            <p className={`${muted} mt-1`}>Select an entity to see its properties and relationships.</p>
          )}
        </div>
      </div>

      {saved && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-[12px] font-medium text-black shadow-2xl">
          <CircleCheck className="h-4 w-4" /> Ontology v1 saved · 7 entities · 7 relationships
        </div>
      )}
    </div>
  );
}

/* ====================================================================== */
/* 3. Upload and map                                                       */
/* ====================================================================== */

const FILES = [
  { name: "fir_records_2024.csv", icon: FileSpreadsheet, meta: "12,480 rows · 19 columns" },
  { name: "fir_records_2023.json", icon: FileJson, meta: "9,915 records" },
];

const MAPPING = [
  ["fir_no", "FIR · number"],
  ["date_of_occurrence", "Date · value"],
  ["ps_name", "Police station · name"],
  ["section_text", "Offence · section"],
  ["accused_name", "Accused · name"],
  ["place_of_occurrence", "Location · name"],
];

function UploadScreen({ t }: { t: number }) {
  const shown = FILES.filter((_, i) => t >= 16.2 + i * 0.45);
  const mapped = Math.floor(clamp((t - 17.0) / 1.2) * MAPPING.length);
  return (
    <div className={`flex h-full flex-col ${bg}`}>
      <AppNav active="Data" />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.15fr] gap-4 p-5">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[15px] font-semibold text-white">Upload records</p>
            <p className={`text-[12px] ${muted}`}>CSV or JSON. Mapped to ontology FIR records v1.</p>
          </div>
          <div
            data-t="dropzone"
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed ${
              between(t, 15.8, 16.3) ? "border-white/60 bg-white/[0.04]" : "border-white/20"
            } py-7 text-[12px]`}
          >
            <Upload className="h-5 w-5 text-white/70" />
            <span className="text-white">Drop files or click to browse</span>
            <span className={muted}>Up to 2 GB per file</span>
          </div>
          <div data-t="files" className="space-y-2">
            {shown.map((f) => {
              const Ico = f.icon;
              return (
                <div key={f.name} className={`flex items-center gap-3 rounded-lg border ${line} ${panel} px-3 py-2.5 text-[12px]`}>
                  <Ico className="h-4 w-4 text-white/80" />
                  <span className="flex-1">
                    <span className="block font-medium text-white">{f.name}</span>
                    <span className={`text-[11px] ${muted}`}>{f.meta}</span>
                  </span>
                  <CircleCheck className="h-4 w-4 text-white" />
                </div>
              );
            })}
          </div>
        </div>

        <div data-t="mapping" className={`flex flex-col rounded-xl border ${line} ${panel}`}>
          <div className={`flex items-center justify-between border-b ${line} px-4 py-3 text-[12px]`}>
            <span className="font-medium text-white">Column mapping</span>
            {t >= 17.0 && (
              <span className={`flex items-center gap-1.5 rounded-full ${raised} px-2 py-0.5 text-[10.5px] text-white/80`}>
                <Sparkles className="h-3 w-3" /> AI mapped 18 of 19 columns
              </span>
            )}
          </div>
          <table className="w-full text-[11.5px]">
            <thead>
              <tr className={`text-left ${muted}`}>
                <th className="px-4 py-2 font-normal">Source column</th>
                <th className="px-4 py-2 font-normal">Ontology field</th>
              </tr>
            </thead>
            <tbody>
              {MAPPING.map(([col, field], i) => (
                <tr key={col} className={`border-t ${line}`}>
                  <td className="px-4 py-2 font-mono text-[11px] text-white/80">{col}</td>
                  <td className="px-4 py-2">
                    {i < mapped ? (
                      <span className="flex items-center gap-1.5 text-white">
                        <ArrowRight className={`h-3 w-3 ${muted}`} /> {field}
                      </span>
                    ) : (
                      <span className="text-white/25">—</span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className={`border-t ${line}`}>
                <td className="px-4 py-2 font-mono text-[11px] text-white/80">io_remarks</td>
                <td className={`px-4 py-2 ${muted}`}>{t >= 18.2 ? "Kept as document text" : "—"}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-auto flex justify-end p-3">
            <span
              data-t="start-processing"
              className={`flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[12px] font-semibold text-black ${
                between(t, 19.7, 19.9) ? "scale-95" : ""
              }`}
            >
              <Cpu className="h-3.5 w-3.5" /> Start processing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================== */
/* 4. Background processing                                                */
/* ====================================================================== */

const STAGES = [
  { id: "parse", name: "Parse records", detail: "22,395 records from 2 files", from: 20.6, to: 21.4 },
  { id: "extract", name: "Extract entities", detail: "Gemini reads each FIR into the ontology", from: 21.2, to: 23.2 },
  { id: "resolve", name: "Resolve duplicates", detail: "Same person across FIRs merged", from: 22.6, to: 23.9 },
  { id: "graph", name: "Build knowledge graph", detail: "Entities and relationships in Neo4j", from: 23.0, to: 24.6 },
  { id: "embed", name: "Summarise and embed", detail: "Vectors for semantic search", from: 23.8, to: 25.3 },
];

function Processing({ t }: { t: number }) {
  const done = t >= 25.3;
  const k = clamp((t - 21.0) / 4.3);
  const counters = [
    ["Records", Math.round(22395 * clamp((t - 20.6) / 0.8))],
    ["Entities", Math.round(48210 * k)],
    ["Relationships", Math.round(131904 * k)],
    ["Languages", t >= 22 ? 3 : t >= 21.4 ? 2 : 1],
  ] as const;
  return (
    <div className={`flex h-full flex-col ${bg}`}>
      <AppNav active="Jobs" />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-semibold text-white">Ingest job #0042</p>
            <p className={`text-[12px] ${muted}`}>Running in the background. You can leave this page.</p>
          </div>
          <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${done ? "bg-white text-black" : `${raised} text-white`}`}>
            {done ? <CircleCheck className="h-3.5 w-3.5" /> : <LoaderCircle className="h-3.5 w-3.5 animate-spin" />}
            {done ? "Ready to query" : "Processing"}
          </span>
        </div>

        <div data-t="counters" className="mt-4 grid grid-cols-4 gap-3">
          {counters.map(([label, v]) => (
            <div key={label} className={`rounded-xl border ${line} ${panel} p-3.5`}>
              <p className={`text-[11px] ${muted}`}>{label}</p>
              <p className="tabular mt-1.5 text-xl font-semibold text-white">{v.toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>

        <div data-t="pipeline" className={`mt-3 rounded-xl border ${line} ${panel}`}>
          {STAGES.map((s) => {
            const p = clamp((t - s.from) / (s.to - s.from));
            return (
              <div key={s.id} data-t={`stage-${s.id}`} className={`flex items-center gap-4 border-b ${line} px-4 py-2.5 last:border-0 text-[12px]`}>
                <span className="w-4">
                  {p >= 1 ? (
                    <CircleCheck className="h-4 w-4 text-white" />
                  ) : p > 0 ? (
                    <LoaderCircle className="h-4 w-4 animate-spin text-white/80" />
                  ) : (
                    <span className="block h-3 w-3 rounded-full border border-white/25" />
                  )}
                </span>
                <span className="w-[170px]">
                  <span className={`block font-medium ${p > 0 ? "text-white" : "text-white/40"}`}>{s.name}</span>
                  <span className={`text-[10.5px] ${muted}`}>{s.detail}</span>
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full rounded-full bg-white/80" style={{ width: `${p * 100}%` }} />
                </span>
                <span className={`tabular w-10 text-right ${muted}`}>{Math.round(p * 100)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ====================================================================== */
/* 5. Ask                                                                  */
/* ====================================================================== */

const ANSWER =
  "Three stations account for 41% of vehicle thefts reported near bus stands in 2024. Most incidents fall between 6 and 10 pm, and 23 accused persons appear in more than one of these FIRs.";
const BARS = [
  ["Central PS", 212],
  ["Market Road PS", 187],
  ["Riverside PS", 164],
  ["Station Road PS", 96],
  ["Hill View PS", 71],
] as const;

function Ask({ t }: { t: number }) {
  const asked = t >= 29.5;
  const thinking = between(t, 29.6, 30.6);
  const answerText = typed(ANSWER, t, 30.6, 1.6);
  const showChart = t >= 31.2;
  const caret = Math.floor(t * 2) % 2 === 0;
  const inputText = asked ? "" : typed(QUESTION, t, 27.0, 2.2);

  return (
    <div className={`flex h-full flex-col ${bg}`}>
      <AppNav active="Ask" />
      <div className="grid min-h-0 flex-1 grid-cols-[200px_1fr]">
        <div className={`border-r ${line} ${panel} p-4 text-[11.5px]`}>
          <p className={`mb-2 text-[10.5px] ${muted}`}>Recent questions</p>
          {["Repeat offenders across stations", "Snatching hotspots by month", "Open cases older than 90 days"].map((q) => (
            <p key={q} className={`mb-1.5 rounded-md px-2 py-1.5 ${muted}`}>
              {q}
            </p>
          ))}
          <p className={`mt-5 mb-2 text-[10.5px] ${muted}`}>Knowledge graph</p>
          <p className="flex items-center gap-1.5 text-white/80">
            <Database className="h-3 w-3" /> FIR records v1
          </p>
          <p className={`mt-1 ${muted}`}>48,210 entities</p>
        </div>

        <div className="flex min-h-0 flex-col p-5">
          {!asked ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3">
              <p className="text-[17px] font-semibold text-white">Ask your records anything</p>
              <p className={`text-[12px] ${muted}`}>Answers come from the knowledge graph, with the FIRs they rely on.</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 text-[11px]">
                {["Repeat offenders this year", "Thefts near railway stations", "Cases by section"].map((c) => (
                  <span key={c} className={`rounded-full border ${line} px-3 py-1 text-white/70`}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div data-t="answer" className="flex min-h-0 flex-1 flex-col gap-3">
              <p className="self-end rounded-xl bg-white px-3.5 py-2 text-[12px] font-medium text-black">{QUESTION}</p>
              <div className={`rounded-xl border ${line} ${panel} p-4 text-[12px] leading-relaxed text-white/90`}>
                {thinking ? (
                  <p className={`flex items-center gap-2 ${muted}`}>
                    <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                    {t < 30.1 ? "Searching the graph and documents" : "Running generated Cypher query"}
                  </p>
                ) : (
                  <>
                    <p>{answerText}</p>
                    {showChart && (
                      <div data-t="answer-chart" className="mt-3 space-y-1.5">
                        <p className={`flex items-center gap-1.5 text-[10.5px] ${muted}`}>
                          <ChartColumn className="h-3 w-3" /> Vehicle thefts near bus stands, 2024
                        </p>
                        {BARS.map(([name, v], i) => {
                          const k = clamp((t - 31.2 - i * 0.1) / 0.5);
                          return (
                            <div key={name} className="flex items-center gap-2 text-[11px]">
                              <span className="w-[96px] text-white/75">{name}</span>
                              <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                                <span className={`block h-full rounded-full ${i < 3 ? "bg-white" : "bg-white/40"}`} style={{ width: `${(v / 212) * 100 * k}%` }} />
                              </span>
                              <span className="tabular w-7 text-right text-white/75">{Math.round(v * k)}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {t >= 32.0 && (
                      <div data-t="citations" className="mt-3 flex flex-wrap items-center gap-1.5 text-[10.5px]">
                        <span className={muted}>Sources</span>
                        {["FIR 0412/2024", "FIR 0877/2024", "FIR 1093/2024"].map((c) => (
                          <span key={c} className={`flex items-center gap-1 rounded-md border ${line} px-2 py-0.5 text-white/80`}>
                            <FileText className="h-3 w-3" /> {c}
                          </span>
                        ))}
                        <span className={muted}>+38 more</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          <div
            data-t="ask-bar"
            className={`mt-3 flex items-center gap-2 rounded-xl border ${between(t, 26.9, 29.5) ? "border-white/60" : line} ${panel} px-3.5 py-2.5 text-[12px]`}
          >
            <Search className={`h-3.5 w-3.5 ${muted}`} />
            <span data-t="ask-input" className="flex-1 text-white">
              {inputText || <span className="text-white/30">Ask a question about your records…</span>}
              <Caret on={between(t, 26.9, 29.4) && caret && !!inputText} />
            </span>
            <span data-t="ask-send" className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black ${between(t, 29.5, 29.7) ? "scale-90" : ""}`}>
              <Send className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================== */
/* Recording                                                               */
/* ====================================================================== */

export function DocuNexusJourney() {
  return (
    <ScreenRecording
      duration={DURATION}
      scenes={SCENES}
      cursor={CURSOR}
      clicks={CLICKS}
      camera={CAMERA}
      host="docunexus.app"
      app="DocuNexus"
      favicon="D"
      avatar="AN"
      posterTime={32.5}
    >
      {(t, scene) => (
        <>
          {scene === 0 && <SignIn t={t} />}
          {scene === 1 && <Ontology t={t} />}
          {scene === 2 && <UploadScreen t={t} />}
          {scene === 3 && <Processing t={t} />}
          {scene === 4 && <Ask t={t} />}
        </>
      )}
    </ScreenRecording>
  );
}
