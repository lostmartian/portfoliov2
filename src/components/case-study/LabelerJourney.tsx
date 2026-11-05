"use client";

// An auto-playing "screen recording" of a labeler's day in Farsight, in the app's original
// dark theme: sign in → projects dashboard → project tasks → annotation workspace.
//
// How it works: a clock drives a timeline. React renders each screen from the current time
// (typed text, active tab, drawn box...). A layout effect then measures target elements and
// moves the cursor and the camera imperatively, so motion never lags a frame behind layout.
// Sample data only; the scheme on the document is fictional.

import { ScreenRecording, between, clamp, type Anchor, type Scene, type Shot, type Waypoint } from "@/components/case-study/ScreenRecording";
import {
  ArrowRight,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  Circle,
  Clock,
  FileText,
  Hand,
  History,
  Keyboard,
  LoaderCircle,
  Lock,
  Mail,
  MousePointer2,
  Play,
  Redo2,
  Search,
  Sparkles,
  Square,
  TextCursorInput,
  Trash2,
  TrendingUp,
  TriangleAlert,
  Undo2,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from "lucide-react";

/* ====================================================================== */
/* Timeline                                                                */
/* ====================================================================== */

const DURATION = 30;
const SCENES: Scene[] = [
  { t: 0, label: "Sign in", path: "/login" },
  { t: 5.8, label: "Projects", path: "/projects" },
  { t: 11.4, label: "Tasks", path: "/projects/health-claims/tasks" },
  { t: 16, label: "Workspace", path: "/tasks/T-48213" },
];

const EMAIL = "labeler.0142@example.com";


// Top-left corner of the bounding box the cursor drags out.
const DRAW_FROM: Anchor = { id: "total-value", ax: 0, ay: 0, dx: -7, dy: -5 };

const CURSOR: Waypoint[] = [
  { t: 0, abs: { x: 760, y: 470 } },
  { t: 1.2, id: "email", ax: 0.2 },
  { t: 3.4, id: "password", ax: 0.2 },
  { t: 5.0, id: "signin" },
  { t: 7.5, id: "kpi-earnings", ax: 0.75, ay: 0.6, move: 0.9 },
  { t: 8.9, id: "kpi-score", ax: 0.7, ay: 0.6, move: 0.8 },
  { t: 9.9, id: "project-health", ax: 0.35, ay: 0.55, move: 0.8 },
  { t: 12.6, id: "tab-Rejected", move: 0.8 },
  { t: 14.0, id: "tab-Pending" },
  { t: 15.3, id: "row-T-48213", ax: 0.12 },
  { t: 16.9, id: "tool-box", move: 0.8 },
  { t: 18.3, ...DRAW_FROM, move: 1.2 },
  { t: 19.9, id: "total-value", ax: 1, ay: 1, dx: 7, dy: 5, move: 1.1, linear: true },
  { t: 20.6, id: "popup-total" },
  { t: 23.2, id: "view-switch", move: 1.0 },
  { t: 24.4, id: "rule-fail", ax: 0.85, ay: 0.5, move: 0.8 },
  { t: 26.6, id: "submit", move: 1.1 },
  { t: 27.7, id: "toast", ax: 0.9, ay: 0.9, move: 0.7 },
];

const CLICKS = [1.3, 3.5, 5.1, 10.9, 12.7, 14.1, 15.4, 17.0, 18.75, 20.7, 23.3, 26.7];
const DRAW = { start: 18.8, end: 19.9 };

const CAMERA: Shot[] = [
  { t: 0 },
  { t: 0.6 },
  { t: 1.4, id: "login-card", max: 1.6, pad: 0.14 },
  { t: 5.4, id: "login-card", max: 1.6, pad: 0.14 },
  { t: 6.2 },
  { t: 6.8 },
  { t: 7.5, id: "kpi-earnings", max: 1.7, pad: 0.45 },
  { t: 8.2, id: "kpi-earnings", max: 1.7, pad: 0.45 },
  { t: 8.9, id: "kpi-score", max: 1.7, pad: 0.45 },
  { t: 9.3, id: "kpi-score", max: 1.7, pad: 0.45 },
  { t: 10.0, id: "project-health", max: 1.7, pad: 0.4 },
  { t: 11.0, id: "project-health", max: 1.7, pad: 0.4 },
  { t: 11.6 },
  { t: 12.0 },
  { t: 12.6, id: "task-table", max: 1.5, pad: 0.06 },
  { t: 15.6, id: "task-table", max: 1.5, pad: 0.06 },
  { t: 16.3 },
  { t: 17.1 },
  { t: 18.3, id: "bill-table", max: 2.4, pad: 0.12 },
  { t: 21.2, id: "bill-table", max: 2.4, pad: 0.12 },
  { t: 22.2, id: "view-switch", max: 1.8, pad: 0.6 },
  { t: 23.6, id: "view-switch", max: 1.8, pad: 0.6 },
  { t: 24.3, id: "rules", max: 1.8, pad: 0.12 },
  { t: 25.6, id: "rules", max: 1.8, pad: 0.12 },
  { t: 26.2, id: "submit", max: 1.8, pad: 0.75 },
  { t: 27.0, id: "submit", max: 1.8, pad: 0.75 },
  { t: 27.7, id: "toast", max: 1.7, pad: 0.55 },
  { t: 28.7, id: "toast", max: 1.7, pad: 0.55 },
  { t: 29.4 },
  { t: DURATION },
];


/* ====================================================================== */
/* Dark app palette (local to the mockup)                                  */
/* ====================================================================== */

const bg = "bg-[#0d0d0f]";
const panel = "bg-[#141417]";
const raised = "bg-[#1c1c20]";
const line = "border-white/[0.08]";
const muted = "text-white/50";

/* ====================================================================== */
/* Screens                                                                 */
/* ====================================================================== */

function AppNav() {
  return (
    <div className={`flex items-center justify-between border-b ${line} px-5 py-3 text-[12px]`}>
      <div className="flex items-center gap-6">
        <span className="font-semibold tracking-tight text-white">Farsight</span>
        <span className="text-white">Projects</span>
        <span className={muted}>Earnings</span>
        <span className={muted}>Guidelines</span>
      </div>
      <div className="flex items-center gap-4">
        <span className={`flex items-center gap-2 rounded-lg ${raised} px-2.5 py-1.5 ${muted}`}>
          <Search className="h-3.5 w-3.5" /> Search tasks
        </span>
        <Bell className={`h-4 w-4 ${muted}`} />
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-[10px] font-medium text-white">L2</span>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone: Record<string, string> = {
    Pending: "bg-white/[0.06] text-white/70",
    Submitted: "bg-white/[0.06] text-white/70",
    "In review": "bg-white/[0.06] text-white/70",
    Approved: "bg-white text-black",
    Rejected: "border border-white/30 text-white",
  };
  return <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${tone[status]}`}>{status}</span>;
}

function SignIn({ t }: { t: number }) {
  const emailChars = Math.floor(clamp((t - 1.4) / 1.6) * EMAIL.length);
  const passChars = Math.floor(clamp((t - 3.6) / 0.9) * 10);
  const focus = between(t, 1.3, 3.4) ? "email" : between(t, 3.5, 5.0) ? "password" : null;
  const caretOn = Math.floor(t * 2) % 2 === 0;
  const loading = t >= 5.2;
  const pressed = between(t, 5.1, 5.3);
  const field = (active: boolean) =>
    `mt-1.5 flex h-9 items-center gap-2 rounded-lg border px-3 text-[12px] text-white ${raised} ${
      active ? "border-white/60 ring-2 ring-white/10" : line
    }`;

  return (
    <div className={`flex h-full items-center justify-center ${bg}`}>
      <div data-t="login-card" className={`w-[330px] rounded-2xl border ${line} ${panel} p-7`}>
        <p className="text-lg font-semibold tracking-tight text-white">Farsight</p>
        <p className={`mt-1 text-[12px] ${muted}`}>Sign in to your labelling workspace</p>
        <label className="mt-6 block text-[11px] text-white/70">Email</label>
        <div data-t="email" className={field(focus === "email")}>
          <Mail className={`h-3.5 w-3.5 shrink-0 ${muted}`} />
          <span>{EMAIL.slice(0, emailChars)}</span>
          {focus === "email" && caretOn && <span className="-ml-1.5 h-3.5 w-px bg-white" />}
          {emailChars === 0 && focus !== "email" && <span className="text-white/30">you@company.com</span>}
        </div>
        <label className="mt-4 block text-[11px] text-white/70">Password</label>
        <div data-t="password" className={field(focus === "password")}>
          <Lock className={`h-3.5 w-3.5 shrink-0 ${muted}`} />
          <span className="tracking-[0.25em]">{"•".repeat(passChars)}</span>
          {focus === "password" && caretOn && <span className="-ml-1 h-3.5 w-px bg-white" />}
        </div>
        <div
          data-t="signin"
          className={`mt-6 flex h-10 items-center justify-center gap-2 rounded-lg bg-white text-[12px] font-semibold text-black transition-transform ${
            pressed ? "scale-[0.97]" : ""
          }`}
        >
          {loading ? (
            <>
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Signing in
            </>
          ) : (
            <>
              Sign in <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </div>
        <p className={`mt-4 text-center text-[11px] ${muted}`}>Forgot password?</p>
      </div>
    </div>
  );
}

const PROJECTS = [
  { name: "Health claims", type: "Live", left: 24, done: 76, fields: 14 },
  { name: "Invoice extraction", type: "Live", left: 61, done: 48, fields: 22 },
  { name: "KYC forms", type: "Batch", left: 0, done: 100, fields: 9 },
];

const RECENT = [
  { id: "T-48207", project: "Health claims", status: "Approved", time: "18m", score: "98" },
  { id: "T-48199", project: "Health claims", status: "In review", time: "22m", score: "–" },
  { id: "T-47961", project: "Invoice extraction", status: "Rejected", time: "31m", score: "61" },
];

function Projects({ t }: { t: number }) {
  const hover = between(t, 9.8, 11.4);
  const pressed = between(t, 10.9, 11.1);
  return (
    <div className={`h-full ${bg}`}>
      <AppNav />
      <div className="space-y-4 p-5">
        <div>
          <p className="text-[15px] font-semibold text-white">Good afternoon, Labeler 0142</p>
          <p className={`text-[12px] ${muted}`}>You have 2 active projects and 85 tasks waiting.</p>
        </div>

        <div data-t="kpis" className="grid grid-cols-3 gap-3">
          <div data-t="kpi-earnings" className={`rounded-xl border ${line} ${panel} p-3.5`}>
            <p className={`text-[11px] ${muted}`}>Earnings this month</p>
            <p className="tabular mt-2 text-2xl font-semibold text-white">₹18,420</p>
            <p className={`mt-1 text-[11px] ${muted}`}>₹64,900 all time</p>
          </div>
          <div data-t="kpi-score" className={`rounded-xl border ${line} ${panel} p-3.5`}>
            <p className={`text-[11px] ${muted}`}>Productivity score</p>
            <p className="tabular mt-2 text-2xl font-semibold text-white">
              92 <span className={`text-sm font-normal ${muted}`}>/ 100</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[92%] rounded-full bg-white" />
            </div>
          </div>
          <div className={`rounded-xl border ${line} ${panel} p-3.5`}>
            <p className={`text-[11px] ${muted}`}>Accuracy, last 30 days</p>
            <p className="tabular mt-2 text-2xl font-semibold text-white">96.4%</p>
            <p className={`mt-1 flex items-center gap-1 text-[11px] ${muted}`}>
              <TrendingUp className="h-3 w-3" /> Improving
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-[12px] font-medium text-white">Your projects</p>
          <div className="grid grid-cols-3 gap-3">
            {PROJECTS.map((p, i) => (
              <div
                key={p.name}
                data-t={i === 0 ? "project-health" : undefined}
                className={`rounded-xl border ${line} ${panel} p-4 transition-all ${
                  i === 0 && hover ? "bg-[#1b1b1f] ring-1 ring-white/40" : ""
                } ${i === 0 && pressed ? "scale-[0.98]" : ""} ${i > 0 ? "opacity-70" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium text-white">{p.name}</p>
                  <span className={`text-[10px] ${muted}`}>{p.type}</span>
                </div>
                <p className={`mt-1 text-[11px] ${muted}`}>
                  {p.left ? `${p.left} tasks left` : "Complete"} · {p.fields} fields
                </p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-white/80" style={{ width: `${p.done}%` }} />
                </div>
                {i === 0 && (
                  <p className="mt-3 flex items-center gap-1 text-[11px] font-medium text-white">
                    Open project <ArrowRight className="h-3 w-3" />
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border ${line} ${panel}`}>
          <p className={`border-b ${line} px-4 py-2.5 text-[12px] font-medium text-white`}>Recent tasks</p>
          <table className="w-full text-[11px]">
            <tbody>
              {RECENT.map((r) => (
                <tr key={r.id} className={`border-b ${line} last:border-0`}>
                  <td className="tabular px-4 py-2 font-medium text-white">{r.id}</td>
                  <td className={`px-4 py-2 ${muted}`}>{r.project}</td>
                  <td className="px-4 py-2">
                    <StatusPill status={r.status} />
                  </td>
                  <td className={`tabular px-4 py-2 ${muted}`}>{r.time}</td>
                  <td className="tabular px-4 py-2 text-right text-white">{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const TABS = ["Pending", "Submitted", "In review", "Rejected"] as const;
type Tab = (typeof TABS)[number];
const COUNTS: Record<Tab, number> = { Pending: 24, Submitted: 58, "In review": 12, Rejected: 3 };
const TASKS: Record<"Pending" | "Rejected", { id: string; doc: string; pages: number; cycle: string; note: string }[]> = {
  Pending: [
    { id: "T-48213", doc: "claim_20931.pdf", pages: 4, cycle: "2 of 3", note: "Pre-annotated" },
    { id: "T-48214", doc: "claim_20934.pdf", pages: 3, cycle: "1 of 3", note: "—" },
    { id: "T-48219", doc: "claim_20940.pdf", pages: 6, cycle: "2 of 3", note: "Pre-annotated" },
    { id: "T-48222", doc: "claim_20951.pdf", pages: 2, cycle: "3 of 3", note: "—" },
    { id: "T-48230", doc: "claim_20966.pdf", pages: 5, cycle: "1 of 3", note: "—" },
  ],
  Rejected: [
    { id: "T-48172", doc: "claim_20871.pdf", pages: 4, cycle: "1 of 3", note: "Total amount box missed page 3" },
    { id: "T-48166", doc: "claim_20862.pdf", pages: 2, cycle: "2 of 3", note: "Admission date in wrong format" },
    { id: "T-48151", doc: "claim_20840.pdf", pages: 3, cycle: "1 of 3", note: "Beneficiary ID incomplete" },
  ],
};

function Tasks({ t }: { t: number }) {
  const tab: "Pending" | "Rejected" = between(t, 12.75, 14.15) ? "Rejected" : "Pending";
  const rowActive = between(t, 15.0, 16.2);
  return (
    <div className={`h-full ${bg}`}>
      <AppNav />
      <div className="p-5">
        <p className={`text-[11px] ${muted}`}>Projects / Health claims</p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-[15px] font-semibold text-white">Health claims</p>
            <p className={`mt-0.5 text-[12px] ${muted}`}>Live · 14 fields · 3 labelers per document</p>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <span className={`flex items-center gap-1.5 rounded-lg border ${line} px-3 py-1.5 text-white/80`}>
              <BookOpen className="h-3.5 w-3.5" /> Instructions
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 font-semibold text-black">
              <Play className="h-3.5 w-3.5" /> Start next task
            </span>
          </div>
        </div>

        <div data-t="task-table">
          <div className={`mt-5 flex gap-1 border-b ${line} text-[12px]`}>
            {TABS.map((x) => (
              <span
                key={x}
                data-t={`tab-${x}`}
                className={`-mb-px flex items-center gap-2 border-b-2 px-3 py-2 ${
                  tab === x ? "border-white text-white" : `border-transparent ${muted}`
                }`}
              >
                {x}
                <span className="tabular rounded-full bg-white/10 px-1.5 text-[10px]">{COUNTS[x]}</span>
              </span>
            ))}
          </div>

          <table className="mt-1 w-full text-[11.5px]">
            <thead>
              <tr className={`text-left ${muted}`}>
                <th className="py-2.5 pr-4 font-normal">Task</th>
                <th className="py-2.5 pr-4 font-normal">Document</th>
                <th className="py-2.5 pr-4 font-normal">Pages</th>
                <th className="py-2.5 pr-4 font-normal">Cycle</th>
                <th className="py-2.5 pr-4 font-normal">Status</th>
                <th className="py-2.5 font-normal">{tab === "Rejected" ? "Reason" : "Notes"}</th>
              </tr>
            </thead>
            <tbody>
              {TASKS[tab].map((r, i) => {
                const first = tab === "Pending" && i === 0;
                return (
                  <tr
                    key={r.id}
                    data-t={first ? "row-T-48213" : undefined}
                    className={`border-t ${line} ${first && rowActive ? "bg-white/[0.08]" : ""}`}
                  >
                    <td className="tabular py-2.5 pr-4 font-medium text-white">{r.id}</td>
                    <td className="py-2.5 pr-4 text-white/80">{r.doc}</td>
                    <td className={`tabular py-2.5 pr-4 ${muted}`}>{r.pages}</td>
                    <td className={`tabular py-2.5 pr-4 ${muted}`}>{r.cycle}</td>
                    <td className="py-2.5 pr-4">
                      <StatusPill status={tab} />
                    </td>
                    <td className={`py-2.5 ${tab === "Rejected" ? "text-white/80" : muted}`}>{r.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- Workspace and the claim form ---------- */

const TOOLS: { id: string; icon: LucideIcon; name: string }[] = [
  { id: "select", icon: MousePointer2, name: "Select" },
  { id: "box", icon: Square, name: "Bounding box" },
  { id: "text", icon: TextCursorInput, name: "Text span" },
  { id: "pan", icon: Hand, name: "Pan" },
  { id: "zoom-in", icon: ZoomIn, name: "Zoom in" },
  { id: "zoom-out", icon: ZoomOut, name: "Zoom out" },
  { id: "undo", icon: Undo2, name: "Undo" },
  { id: "redo", icon: Redo2, name: "Redo" },
  { id: "delete", icon: Trash2, name: "Delete" },
];

/** Wraps a value on the form in an annotation box. */
function Ann({ on, pre, name, children, t }: { on: boolean; pre?: boolean; name?: string; children: React.ReactNode; t?: string }) {
  return (
    <span data-t={t} className="relative inline-block">
      {children}
      {on && (
        <span
          className={`pointer-events-none absolute -inset-x-[3px] -inset-y-[2px] rounded-[2px] ${
            pre ? "border border-dashed border-[#1e3a8a]/70" : "border border-[#1e3a8a] bg-[#1e3a8a]/[0.06]"
          }`}
        >
          {name && (
            <span className="absolute -top-[9px] left-[-1px] whitespace-nowrap rounded-t-[2px] bg-[#1e3a8a] px-1 text-[5px] font-semibold leading-[9px] text-white">
              {name}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

function Barcode() {
  return (
    <span
      className="block h-[14px] w-[78px]"
      style={{
        background:
          "repeating-linear-gradient(90deg,#111 0 1px,transparent 1px 2px,#111 2px 4px,transparent 4px 5px,#111 5px 6px,transparent 6px 8px,#111 8px 9px,transparent 9px 11px)",
      }}
    />
  );
}

function ClaimForm({ totalOn }: { totalOn: boolean }) {
  const cell = "border border-black/25 px-1.5 py-[2px]";
  return (
    <div className="h-full w-full overflow-hidden bg-white px-[14px] py-3 font-sans text-[6.5px] leading-[1.35] text-[#111]">
      {/* Header */}
      <div className="flex items-start justify-between border-b-2 border-black pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-black text-[5px] font-bold">NHAS</span>
          <div>
            <p className="text-[5px] font-semibold tracking-[0.18em]">GOVERNMENT OF INDIA</p>
            <p className="text-[8.5px] font-bold leading-tight">National Health Assistance Scheme</p>
            <p className="text-[5.5px]">Department of Health &amp; Family Welfare</p>
          </div>
        </div>
        <div className="text-right">
          <Barcode />
          <p className="tabular mt-0.5 text-[5px]">Claim No. CL-2025-0447120</p>
          <p className="text-[5px] font-semibold">Form NHAS-CL/B</p>
        </div>
      </div>
      <p className="mt-1.5 text-center text-[7px] font-bold tracking-wide">HOSPITAL CLAIM FORM · PART B</p>

      {/* 1. Beneficiary */}
      <p className="mt-1.5 bg-black/[0.06] px-1 py-[2px] text-[6px] font-bold">1. BENEFICIARY DETAILS</p>
      <table className="mt-[3px] w-full border-collapse">
        <tbody>
          <tr>
            <td className={`${cell} w-[38%] text-black/70`}>Beneficiary ID</td>
            <td className={cell}>
              <Ann on>
                <span className="inline-flex gap-[1px]">
                  {"NH4471209318".split("").map((c, i) => (
                    <span key={i} className="tabular inline-flex h-[8px] w-[6px] items-center justify-center border border-black/40 text-[5.5px]">
                      {c}
                    </span>
                  ))}
                </span>
              </Ann>
            </td>
          </tr>
          <tr>
            <td className={`${cell} text-black/70`}>Name of beneficiary</td>
            <td className={`${cell} font-semibold`}>
              <Ann on>RAMESH KUMAR SHARMA</Ann>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 2. Hospital */}
      <p className="mt-1.5 bg-black/[0.06] px-1 py-[2px] text-[6px] font-bold">2. HOSPITAL &amp; ADMISSION</p>
      <table className="mt-[3px] w-full border-collapse">
        <tbody>
          <tr>
            <td className={`${cell} w-[38%] text-black/70`}>Hospital name</td>
            <td className={`${cell} font-semibold`}>
              <Ann on>City Care Multispeciality Hospital</Ann>
            </td>
          </tr>
          <tr>
            <td className={`${cell} text-black/70`}>Hospital ID</td>
            <td className={`${cell} tabular`}>HOSP-0931-E</td>
          </tr>
          <tr>
            <td className={`${cell} text-black/70`}>Date of admission</td>
            <td className={`${cell} tabular`}>
              <Ann on pre>08/03/2025</Ann>
              <span className="ml-3 text-black/70">Discharge</span> <span className="tabular">12/03/2025</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 3. Bill */}
      <p className="mt-1.5 bg-black/[0.06] px-1 py-[2px] text-[6px] font-bold">3. BILL SUMMARY (₹)</p>
      <table data-t="bill-table" className="mt-[3px] w-full border-collapse">
        <thead>
          <tr>
            <th className={`${cell} text-left font-semibold`}>Particulars</th>
            <th className={`${cell} w-[34%] text-right font-semibold`}>Amount</th>
          </tr>
        </thead>
        <tbody className="tabular">
          {[
            ["Room & boarding", "4,200.00"],
            ["Medicines & consumables", "3,150.00"],
            ["Investigations", "2,610.00"],
            ["Procedure charges", "1,900.00"],
          ].map(([k, v]) => (
            <tr key={k}>
              <td className={cell}>{k}</td>
              <td className={`${cell} text-right`}>{v}</td>
            </tr>
          ))}
          <tr>
            <td className={`${cell} font-semibold`}>Subtotal</td>
            <td className={`${cell} text-right`}>
              <Ann on>11,860.00</Ann>
            </td>
          </tr>
          <tr>
            <td className={cell}>GST</td>
            <td className={`${cell} text-right`}>
              <Ann on>590.00</Ann>
            </td>
          </tr>
          <tr>
            <td className={`${cell} font-bold`}>Total payable</td>
            <td className={`${cell} text-right font-bold`}>
              <Ann on={totalOn} name="Total amount" t="total-value">
                12,540.00
              </Ann>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Declaration */}
      <p className="mt-2 text-[5px] leading-[1.45] text-black/70">
        I hereby certify that the above treatment was provided to the beneficiary and that the amounts claimed are as
        per the scheme&apos;s package rates. No amount has been collected from the beneficiary.
      </p>
      <div className="mt-2 flex justify-between border-t border-black/20 pt-1 text-[4.5px] text-black/50">
        <span>For official use only</span>
        <span>Page 2 of 4</span>
      </div>
    </div>
  );
}

const LABELS: { name: string; value: string; status: "done" | "pre" | "violation" | "missing" }[] = [
  { name: "Beneficiary ID", value: "NH4471209318", status: "done" },
  { name: "Beneficiary name", value: "Ramesh K. Sharma", status: "done" },
  { name: "Hospital name", value: "City Care Multi…", status: "done" },
  { name: "Admission date", value: "08/03/2025", status: "pre" },
  { name: "Subtotal", value: "11,860.00", status: "done" },
  { name: "GST", value: "590.00", status: "done" },
];

function StatusIcon({ status }: { status: string }) {
  const cls = "h-4 w-4 shrink-0";
  if (status === "done") return <CircleCheck className={`${cls} text-white`} strokeWidth={1.75} />;
  if (status === "pre") return <Sparkles className={`${cls} text-white/60`} strokeWidth={1.75} />;
  if (status === "violation") return <TriangleAlert className={`${cls} text-white`} strokeWidth={1.75} />;
  return <Circle className={`${cls} text-white/30`} strokeWidth={1.75} strokeDasharray="3 3" />;
}

function Workspace({ t }: { t: number }) {
  const tool = t >= 17.0 ? "box" : "select";
  const assigned = t >= 20.8;
  const popup = between(t, 19.9, 20.8);
  const view = t >= 23.4 ? "Validation" : "Labels";
  const menuOpen = between(t, 23.3, 23.4);
  const submitPressed = between(t, 26.7, 26.9);
  const submitted = t >= 26.8;
  const clock = `12:${String(29 + Math.floor((t - 16) / 1.2)).padStart(2, "0")}`;
  const labels = [
    ...LABELS,
    { name: "Total amount", value: assigned ? "12,540.00" : "Draw a box", status: assigned ? "violation" : "missing" },
  ] as const;

  return (
    <div className={`relative flex h-full flex-col ${bg} text-white`}>
      {/* Task metadata */}
      <div className={`flex items-center justify-between gap-4 border-b ${line} px-4 py-2.5 text-[11.5px]`}>
        <div className="flex items-center gap-4">
          <ChevronLeft className={`h-4 w-4 ${muted}`} />
          <span className="flex items-center gap-2 whitespace-nowrap font-medium">
            <FileText className="h-4 w-4" strokeWidth={1.75} /> DOC-20931
          </span>
          {[
            ["Task", "T-48213"],
            ["Assignee", "L-0142"],
            ["Project", "Health claims"],
            ["Cycle", "2 of 3"],
          ].map(([k, v]) => (
            <span key={k} className="flex items-center gap-1.5 whitespace-nowrap">
              <span className={muted}>{k}</span>
              <span className="tabular font-medium">{v}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <span className={`flex items-center gap-1.5 whitespace-nowrap rounded-full ${raised} px-2.5 py-1`}>
            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="tabular font-medium">{clock}</span>
          </span>
          <span className={`rounded-lg border ${line} px-3 py-1.5 font-medium`}>Skip</span>
          <span
            data-t="submit"
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-semibold text-black transition-transform ${
              submitPressed ? "scale-95" : ""
            }`}
          >
            Submit
            {assigned && <span className="rounded bg-black/10 px-1.5 text-[10px]">1 flag</span>}
          </span>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[48px_1fr_250px]">
        {/* Toolbox */}
        <div className={`flex flex-col items-center gap-1 border-r ${line} ${panel} py-3`}>
          {TOOLS.map((x, i) => {
            const Ico = x.icon;
            const active = x.id === tool;
            return (
              <div key={x.id} className="contents">
                {(i === 4 || i === 6 || i === 8) && <span className="my-1.5 h-px w-6 bg-white/10" />}
                <span
                  data-t={`tool-${x.id}`}
                  title={x.name}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    active ? "bg-white text-black" : "text-white/60"
                  }`}
                >
                  <Ico className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
              </div>
            );
          })}
        </div>

        {/* Canvas */}
        <div className="flex min-h-0 flex-col bg-[#09090a]">
          <div className="relative flex min-h-0 flex-1 items-center justify-center p-4">
            <div className="relative aspect-[1/1.414] h-full shadow-[0_8px_30px_rgba(0,0,0,0.55)]">
              <ClaimForm totalOn={assigned} />
              {popup && <LabelPicker />}
            </div>
          </div>
          <div className={`flex items-center justify-center gap-4 border-t ${line} py-2 text-[12px]`}>
            <ChevronLeft className={`h-4 w-4 ${muted}`} />
            <span className="tabular">Page 2 of 4</span>
            <ChevronRight className={`h-4 w-4 ${muted}`} />
            <span className="h-3 w-px bg-white/15" />
            <span className={`tabular ${muted}`}>{t >= 18.2 && t < 21.4 ? "200%" : "100%"}</span>
          </div>
        </div>

        {/* Sidebar */}
        <div data-t="sidebar" className={`flex min-h-0 flex-col border-l ${line} ${panel}`}>
          <div className={`relative border-b ${line} p-3`}>
            <div
              data-t="view-switch"
              className={`flex w-full items-center justify-between rounded-lg border ${line} ${raised} px-3 py-2 text-[12.5px] font-medium`}
            >
              {view}
              <ChevronDown className="h-4 w-4" />
            </div>
            {menuOpen && (
              <div className={`absolute inset-x-3 top-[calc(100%-6px)] z-10 rounded-lg border ${line} ${raised} p-1 text-[12.5px] shadow-xl`}>
                {["Labels", "Validation", "History"].map((v) => (
                  <p key={v} className={`rounded-md px-2.5 py-1.5 ${v === "Validation" ? "bg-white/10" : ""}`}>
                    {v}
                  </p>
                ))}
              </div>
            )}
          </div>

          {assigned && view === "Labels" && (
            <div className="mx-3 mt-3 flex items-start gap-2 rounded-lg border border-white/25 bg-white/[0.06] p-2.5 text-[11px]">
              <TriangleAlert className="mt-px h-3.5 w-3.5 shrink-0" />
              <span>1 rule failed: Subtotal + GST ≠ Total</span>
            </div>
          )}

          <div data-t="rules" className="min-h-0 flex-1 overflow-hidden p-3 text-[11.5px]">
            {view === "Labels" ? (
              <ul className="space-y-0.5">
                {labels.map((f) => (
                  <li
                    key={f.name}
                    className={`flex items-center gap-2.5 rounded-lg px-2 py-[7px] ${f.name === "Total amount" && assigned ? "bg-white/10" : ""}`}
                  >
                    <StatusIcon status={f.status} />
                    <span className="flex-1 font-medium">{f.name}</span>
                    <span className={`tabular ${f.status === "missing" ? muted : ""}`}>{f.value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2">
                {[
                  { ok: false, rule: "Subtotal + GST = Total", detail: "11,860 + 590 = 12,450, form says 12,540" },
                  { ok: true, rule: "Beneficiary ID has 12 characters", detail: "NH4471209318" },
                  { ok: true, rule: "Admission before discharge", detail: "08/03 → 12/03/2025" },
                  { ok: true, rule: "Hospital ID format HOSP-####-X", detail: "HOSP-0931-E" },
                ].map((r) => (
                  <li
                    key={r.rule}
                    data-t={r.ok ? undefined : "rule-fail"}
                    className={`flex gap-2.5 rounded-lg border ${r.ok ? line : "border-white/30 bg-white/[0.05]"} p-2.5`}
                  >
                    {r.ok ? (
                      <CircleCheck className="mt-px h-4 w-4 shrink-0" strokeWidth={1.75} />
                    ) : (
                      <TriangleAlert className="mt-px h-4 w-4 shrink-0" strokeWidth={1.75} />
                    )}
                    <span>
                      <span className="block font-medium">{r.rule}</span>
                      <span className={muted}>{r.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={`flex items-center gap-2 border-t ${line} px-3 py-2.5 text-[10.5px] ${muted}`}>
            <History className="h-3.5 w-3.5" /> {assigned ? "Drew Total amount · just now" : "Last change 12:41 by L-0142"}
          </div>
        </div>
      </div>

      {/* Help and hotkeys */}
      <div className={`flex items-center justify-between gap-4 border-t ${line} ${panel} px-4 py-2.5 text-[11px]`}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <CircleHelp className="h-4 w-4" strokeWidth={1.75} /> Help
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Keyboard className="h-4 w-4" strokeWidth={1.75} /> Shortcuts
          </span>
          <span className="h-3 w-px bg-white/15" />
          {[
            ["V", "Select"],
            ["B", "Box"],
            ["T", "Text"],
            ["Tab", "Next label"],
            ["⌘Z", "Undo"],
            ["⏎", "Submit"],
          ].map(([k, v]) => (
            <span key={k} className={`flex items-center gap-1.5 whitespace-nowrap ${muted}`}>
              <kbd
                className={`inline-flex min-w-5 items-center justify-center rounded-[5px] border ${line} ${raised} px-1.5 py-0.5 font-mono text-[10px] text-white ${
                  k === "B" && between(t, 16.95, 17.25) ? "bg-white text-black" : ""
                }`}
              >
                {k}
              </kbd>
              {v}
            </span>
          ))}
        </div>
        <span className={`flex items-center gap-1.5 ${muted}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" /> Autosaved
        </span>
      </div>

      {submitted && (
        <div data-t="toast" className="absolute bottom-14 right-4 flex items-center gap-2 rounded-lg bg-white px-3.5 py-2.5 text-[12px] font-medium text-black shadow-2xl">
          <CircleCheck className="h-4 w-4" /> Submitted · 1 rule flagged for review
        </div>
      )}
    </div>
  );
}

function LabelPicker() {
  return (
    <div className="absolute bottom-[23%] right-[3%] z-10 w-[118px] rounded-md border border-white/15 bg-[#1c1c20] p-1 text-[8px] text-white shadow-2xl">
      <p className="px-1.5 pb-1 pt-0.5 text-[7px] text-white/50">Assign label</p>
      <p data-t="popup-total" className="rounded bg-white/15 px-1.5 py-1 font-medium">
        Total amount
      </p>
      <p className="px-1.5 py-1 text-white/70">Subtotal</p>
      <p className="px-1.5 py-1 text-white/70">GST</p>
    </div>
  );
}

/* ====================================================================== */
/* Recording                                                               */
/* ====================================================================== */

export function LabelerJourney() {
  return (
    <ScreenRecording
      duration={DURATION}
      scenes={SCENES}
      cursor={CURSOR}
      clicks={CLICKS}
      camera={CAMERA}
      drag={{ ...DRAW, from: DRAW_FROM }}
      host="farsight.app"
      app="Farsight"
      favicon="F"
      avatar="L2"
      posterTime={20.9}
    >
      {(t, scene) => (
        <>
          {scene === 0 && <SignIn t={t} />}
          {scene === 1 && <Projects t={t} />}
          {scene === 2 && <Tasks t={t} />}
          {scene === 3 && <Workspace t={t} />}
        </>
      )}
    </ScreenRecording>
  );
}
