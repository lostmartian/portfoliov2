// AYUVA case study (First500days). Sources: the ayuva-ai-api repo (all Sahil's), his two
// gateway commits in ayuva-backend, his development plan, and the evaluation reports from
// live HTTP runs on 2 Sep 2026. Numbers below are measured, not estimated. The contract
// value and infrastructure details are deliberately left out.

import type { CaseLayer, CaseStory } from "@/components/case-study/blocks";

export const meta = {
  title: "AYUVA",
  summary:
    "AYUVA is a UK healthcare navigation app that helps patients organise their records and understand their care. For First500days, I built its AI layer: four APIs that triage symptoms, map out care journeys, explain medical reports in plain language and answer questions, all behind guardrails that never let the AI play doctor.",
  description:
    "Case study: the AI API layer for AYUVA, a UK healthcare navigation platform, built for First500days. Symptom triage, care journeys, medical report interpretation and a guarded assistant.",
  facts: [
    ["Role", "AI Engineer, freelance"],
    ["Client", "First500days, for AYUVA"],
    ["Timeline", "Aug 2026 – present"],
    ["Scope", "The AI layer, end to end"],
  ] as [string, string][],
};

// Hero illustration: a real-shaped lab line in, a plain-language explanation out.
// Sample taken from the MIT-licensed MedOCR evaluation dataset.
export const interpretation = {
  report: {
    title: "Serology report",
    rows: [
      ["Test", "C-reactive protein (CRP)"],
      ["Specimen", "Serum"],
      ["Result", "20.90 mg/L"],
      ["Reference range", "0 – 6.0 mg/L"],
    ],
  },
  summary:
    "Your CRP result is 20.90 mg/L, which is above the laboratory's stated range of 0 to 6.0 mg/L.",
  highlight: { label: "C-reactive protein", value: "20.90 mg/L", status: "High" },
  glossary: ["C-reactive protein", "Serum", "Reference range"],
  question: "What could cause my CRP to be raised?",
};

export const pressures = [
  {
    icon: "report",
    title: "Reports are written for doctors",
    text: "Lab results, discharge notes and scans are full of abbreviations and reference ranges. Patients get the paper, not the meaning.",
  },
  {
    icon: "route",
    title: "Patients don't know where to go",
    text: "Is this self-care, a GP visit or A&E? Getting it wrong either clogs the system or delays real care.",
  },
  {
    icon: "siren",
    title: "Health AI can't overstep",
    text: "The product must never diagnose or advise on treatment, and emergencies have to escalate every time, no matter what the model says.",
  },
];

export const context =
  "First500days was building AYUVA's apps and backend. They needed an AI layer that their team could integrate quickly, that would answer reliably in a fixed format, and that would stay safe by design. I owned that layer, from the API contracts to the evaluation.";

export const architecture = [
  { icon: "phone", step: "App", text: "Patient uses the AYUVA web or mobile app" },
  { icon: "api", step: "Gateway", text: "Backend checks the login, loads the record and logs every AI call" },
  { icon: "ai", step: "AI service", text: "My FastAPI service builds the prompt for one of four tasks" },
  { icon: "contract", step: "Structured output", text: "The model must answer in a fixed, typed schema" },
  { icon: "validate", step: "Guardrails", text: "Safety rules and the disclaimer are applied in code" },
];

export const capabilities = [
  {
    icon: "stethoscope",
    name: "Symptom navigation",
    text: "Turns a description like \"fever for five days\" into extracted symptoms, an urgency level and the right place for care.",
    guard: "Emergency phrases like chest pain force an A&E recommendation, whatever the model says.",
  },
  {
    icon: "route",
    name: "Care journey",
    text: "Turns the triage result into a step-by-step pathway, from self-care to specialist or emergency care.",
    guard: "Steps come back as structured data, never as free text the app has to parse.",
  },
  {
    icon: "report",
    name: "Report interpreter",
    text: "Reads lab reports, prescriptions, scans and discharge notes, including multi-page PDFs and photos, and explains them in plain language.",
    guard: "Values can only be marked normal, high or low. No diagnosis, ever.",
  },
  {
    icon: "chat",
    name: "Assistant",
    text: "Answers questions about using AYUVA, like booking an appointment or finding a lab report.",
    guard: "Clinical questions get a fixed redirect to a professional, without calling the model at all.",
  },
];

export const stats = [
  { value: "4", label: "AI APIs" },
  { value: "55/55", label: "live report calls passed" },
  { value: "6.3s", label: "average report latency" },
  { value: "1.1¢", label: "average cost per report" },
  { value: "82%", label: "test coverage" },
];

export const layers: CaseLayer[] = [
  {
    icon: "ai",
    name: "AI microservice",
    role: "Built",
    impact: "The single place where every AI answer in AYUVA is produced.",
    stack: ["Python", "FastAPI", "Pydantic", "OpenAI"],
    points: [
      "Four internal APIs, each with its own prompt, schema and safety rules.",
      "Structured outputs, so every response matches the backend's types exactly.",
      "A fallback model, and per-task model choice through configuration instead of code changes.",
      "Stateless by design: the backend owns patient data, the AI service only generates.",
    ],
  },
  {
    icon: "validate",
    name: "Safety guardrails",
    role: "Built",
    impact: "Rules that hold even when the model is wrong.",
    stack: ["Python", "Keyword rules", "Typed enums"],
    points: [
      "Emergency phrases override any triage to emergency care.",
      "Clinical questions are redirected before the model is ever called.",
      "Report values are limited to normal, high or low, with no room for a diagnosis.",
      "The same medical disclaimer is attached to every single response.",
    ],
  },
  {
    icon: "report",
    name: "Report reading",
    role: "Built",
    impact: "Handles the messy reality of what patients upload.",
    stack: ["Vision OCR", "PyMuPDF", "Multi-page PDFs"],
    points: [
      "Reads photos and scanned PDFs, including several images or pages in one request.",
      "Glossary terms and three suggested questions to take to the doctor.",
      "Tested on a public medical document dataset of 50 images and 54 PDFs.",
    ],
  },
  {
    icon: "contract",
    name: "Contracts & gateway integration",
    role: "Contributed",
    impact: "Let the client's team build in parallel from the first week.",
    stack: ["JSON Schema", "NestJS", "TypeScript"],
    points: [
      "Schemas that mirror the backend's types one to one, exported as contracts for the app and database.",
      "Wired the backend gateway to the AI service behind an internal secret.",
    ],
  },
  {
    icon: "coins",
    name: "Evaluation & cost telemetry",
    role: "Built",
    impact: "Real numbers on quality, speed and cost before launch.",
    stack: ["pytest", "Telemetry", "Reports"],
    points: [
      "Token usage and cost recorded for every model call.",
      "Live test runs for each API, written up per capability.",
      "A stakeholder report with results, samples, cost and time analysis.",
    ],
  },
];

export const stories: CaseStory[] = [
  {
    tag: "Collaboration",
    title: "Contracts before code",
    problem: "The app, backend and database teams were waiting on the AI layer before they could build anything that used it.",
    decision:
      "In the first days I fixed the exact shape of every request and response, mirrored the backend's types one to one, and exported them as JSON schema contracts.",
    outcome: "The client's team built and mocked against stable contracts while I implemented the AI behind them.",
    metric: { value: "1:1", label: "schemas match backend types" },
  },
  {
    tag: "Safety",
    title: "Safety can't depend on the model",
    problem: "A language model can be talked into giving medical advice, or can underrate a real emergency.",
    decision:
      "I put the critical rules in code around the model. Emergency phrases force emergency care, clinical questions are redirected before any model call, and the disclaimer is attached to every response.",
    outcome: "Crushing chest pain is routed to A&E every time, and clinical questions are turned away in a few milliseconds.",
    metric: { value: "≤5 ms", label: "clinical redirect, no model call" },
  },
  {
    tag: "Architecture",
    title: "A separate service behind the gateway",
    problem: "Patient data, logins and audit logs belong in one place, and AI code shouldn't touch them.",
    decision:
      "The AI runs as its own stateless service. The client's backend stays the gateway for auth, storage and audit, and calls the AI service over an internal, secret-protected route.",
    outcome: "Models can be swapped per task through configuration, and the AI never owns patient data.",
    metric: { value: "0", label: "patient tables owned by the AI" },
  },
  {
    tag: "Quality",
    title: "Test on documents patients actually upload",
    problem: "The first test set of scanned forms didn't look like real medical paperwork.",
    decision:
      "I replaced it with a public medical document dataset, added vision OCR for photos and multi-page PDFs, and ran every file through the live service.",
    outcome: "All 55 live calls passed, and prescriptions correctly came back with no values to flag.",
    metric: { value: "55/55", label: "live calls passed" },
  },
  {
    tag: "Cost",
    title: "Know the bill before launch",
    problem: "Healthcare startups need predictable costs, and AI usage can quietly grow.",
    decision: "I logged tokens and cost for every model call, measured them across the full test run, and projected monthly spend at different volumes.",
    outcome: "About 1.1¢ per report on average, half of the input tokens served from cache, and a clear monthly projection for the client.",
    metric: { value: "1.1¢", label: "average cost per report" },
  },
];

export const leadResult = {
  value: "55/55",
  label: "live report interpretations passed, across labs, scans, prescriptions and multi-page PDFs",
  note: "Run against the running service over real HTTP, not mocked, using a public, MIT-licensed medical document dataset. Every response returned the right structure, the disclaimer, and an explanation.",
};

export const results = [
  { value: "6.3s", label: "average report latency, 10.4s at p95" },
  { value: "1.1¢", label: "average cost per report" },
  { value: "13/13", label: "prescriptions correctly returned no values to flag" },
  { value: "4/4", label: "triage levels produced a care journey" },
  { value: "82%", label: "test coverage, model calls mocked in CI" },
];

export const stack = [
  { group: "AI service", items: ["Python", "FastAPI", "Pydantic", "uv"] },
  { group: "AI", items: ["OpenAI Structured Outputs", "Vision OCR", "PyMuPDF"] },
  { group: "Integration", items: ["NestJS", "TypeScript", "MongoDB"] },
  { group: "Quality", items: ["pytest", "ruff", "Docker"] },
];

export const takeaway = "In health AI, the guardrails are the product.";

export const reflection = [
  "The model is the easy part. The work that mattered was everything around it: contracts the team could build against, rules that hold when the model is wrong, and real measurements of quality, speed and cost.",
  "AYUVA is still being built. The AI layer is integrated with the backend, and the next step is taking it from a tested service to patients in production.",
];
