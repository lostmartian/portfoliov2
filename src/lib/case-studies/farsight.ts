// Farsight case study (Omara Technologies). Source: Sahil's product docs for the labelling
// platform and DocuNexus. Built solo. Only structural numbers are quoted (counts, tiers,
// batch sizes); the docs' cost and latency claims were never measured, so they are left out.
// FIRs may be named; the state and police department may not.

import type { CaseLayer, CaseStory } from "@/components/case-study/blocks";

export const meta = {
  title: "Farsight",
  summary:
    "As Omara's founding engineer, I built the system that turns messy documents into trusted ground truth: a labelling platform where many people annotate, disagree and settle on one answer, and a knowledge graph that makes thousands of documents searchable in plain language.",
  description:
    "Case study: Farsight, a ground-truth labelling platform and document knowledge graph built solo as founding engineer at Omara Technologies.",
  facts: [
    ["Role", "Founding Full-Stack AI Engineer"],
    ["Company", "Omara Technologies"],
    ["Timeline", "Oct 2024 – Jan 2026"],
    ["Team", "Solo, end to end"],
  ] as [string, string][],
};

// Hero illustration: three labelers read the same field; consensus settles it.
export const disagreement = {
  field: "Total amount",
  reads: [
    { who: "Labeler A", value: "₹12,450", agrees: true },
    { who: "Labeler B", value: "₹12,450", agrees: true },
    { who: "Labeler C", value: "₹12,540", agrees: false },
  ],
  result: { value: "₹12,450", how: "Majority, 2 of 3" },
};

export const pressures = [
  {
    icon: "users",
    title: "People disagree",
    text: "Give the same document to three labelers and you often get three answers. Someone has to decide which one is right, field by field.",
  },
  {
    icon: "annotate",
    title: "Documents are messy",
    text: "Multi-page PDFs, repeating sections, nested fields and several languages. Members, payments and line items appear in any order.",
  },
  {
    icon: "target",
    title: "AI needs ground truth",
    text: "You can't measure or train a model without answers you trust. Without them, evaluation is guesswork.",
  },
];

export const context =
  "Omara needed two things. The first was a way to produce trusted ground-truth data from documents at scale, to evaluate and train AI. The second was a way to make large document collections searchable without knowing a query language. I was the first engineer, so I built both.";

export const products = [
  {
    icon: "consensus",
    name: "Labelling & ground-truth platform",
    text: "Documents go to multiple labelers. Rules catch mistakes while people work, consensus settles disagreements, and experts arbitrate what's left. The output is gold data.",
  },
  {
    icon: "graph",
    name: "DocuNexus knowledge graph",
    text: "AI reads documents into structured fields, builds a graph of the people, places and events in them, and answers plain-language questions with citations.",
  },
];

export const labellingFlow = [
  { icon: "ingest", step: "Import", text: "PDFs and pre-annotations, in bulk from S3 or ZIP" },
  { icon: "users", step: "Distribute", text: "Each file goes to several labelers, never twice to one person" },
  { icon: "annotate", step: "Annotate", text: "Boxes and values on the PDF, checked by rules live" },
  { icon: "consensus", step: "Reconcile", text: "Four-tier consensus, field by field" },
  { icon: "arbitrate", step: "Arbitrate", text: "Experts settle only the fields still in conflict" },
  { icon: "target", step: "Gold data", text: "Trusted values, labeler scores, JSONL export" },
];

export const consensusTiers = [
  { icon: "unanimous", tier: "Unanimous", text: "Every labeler gave the same value. Accept it." },
  { icon: "majority", tier: "Majority", text: "More than half agree. Accept the majority value." },
  { icon: "distance", tier: "Algorithmic", text: "Values differ slightly. Edit distance within a threshold decides." },
  { icon: "human", tier: "Human expert", text: "Still in conflict. Escalate this field, and only this field, to arbitration." },
];

export const matchingWeights = [
  { label: "Value similarity", weight: 60 },
  { label: "Position on the page", weight: 30 },
  { label: "Labeler agreement", weight: 10 },
];

export const nexusFlow = [
  { icon: "ingest", step: "Ingest", text: "From Google Drive, S3 or local folders, synced incrementally" },
  { icon: "extract", step: "Extract", text: "Gemini reads up to 20 PDFs per call into a field template" },
  { icon: "graph", step: "Connect", text: "Entities and relationships in Neo4j, each tied to its source file" },
  { icon: "ai", step: "Embed", text: "Node summaries and 768-dimension vectors for semantic search" },
  { icon: "ask", step: "Ask", text: "An agent runs vector search and generated Cypher in parallel" },
];

export const stats = [
  { value: "2", label: "products, built solo" },
  { value: "100+", label: "API endpoints" },
  { value: "9", label: "validation rule types" },
  { value: "4", label: "consensus tiers" },
  { value: "3", label: "document languages" },
];

export const layers: CaseLayer[] = [
  {
    icon: "api",
    name: "Labelling platform backend",
    role: "Built",
    impact: "The engine behind every task, rule, score and settled answer.",
    stack: ["Go", "Gin", "PostgreSQL", "GORM", "AWS Lambda"],
    points: [
      "100+ REST endpoints across 25+ services, with Swagger docs and integration tests.",
      "Five roles, from labeler to client subject-matter expert, with project-level access for client teams.",
      "Task distribution in parallel or series, with repeat cycles and no labeler ever seeing the same file twice.",
      "Real-time notifications over server-sent events, plus scheduled daily reports and nightly consensus runs.",
    ],
  },
  {
    icon: "consensus",
    name: "Consensus, scoring & arbitration",
    role: "Built",
    impact: "Turns several imperfect answers into one trusted value, and shows who to trust.",
    stack: ["Go", "Levenshtein distance", "Hungarian algorithm"],
    points: [
      "Four-tier consensus run independently for every field.",
      "Instance matching across labelers with the Hungarian algorithm, so the order people annotated in doesn't matter.",
      "Arbitration that escalates only the conflicting fields, with auto-filled values for the rest.",
      "Labeler quality scores, accuracy trends and calibration flags.",
    ],
  },
  {
    icon: "annotate",
    name: "Annotation workspace",
    role: "Built",
    impact: "Where labelers spend their day, so it had to be fast and hard to get wrong.",
    stack: ["Next.js", "React", "TanStack Query", "react-pdf", "shadcn/ui"],
    points: [
      "PDF annotation with bounding boxes and text spans: drag, resize and work across multiple pages.",
      "ML pre-annotations shown for review instead of starting from blank.",
      "A live violations panel that flags rule breaks as the labeler works.",
      "Task timer, skip-with-reason, session recovery and a guided onboarding tour.",
    ],
  },
  {
    icon: "rules",
    name: "Validation & quality tooling",
    role: "Built",
    impact: "Catches mistakes while labelling instead of after it.",
    stack: ["TypeScript", "Zod", "Chart.js", "ReactFlow"],
    points: [
      "Nine rule types, from regex and ranges to cross-field checks like subtotal plus tax equals total.",
      "Approval by consensus, by rules or by hand, with auto-approve thresholds.",
      "Side-by-side arbitration screen with each labeler's value attributed.",
      "Analytics on throughput, agreement and labeler performance over time.",
    ],
  },
  {
    icon: "extract",
    name: "DocuNexus extraction",
    role: "Built",
    impact: "Reads documents in three languages into clean, structured, checkable fields.",
    stack: ["Python", "Gemini", "Pydantic", "Flask"],
    points: [
      "Template-driven extraction, up to 20 PDFs per model call, validated against Pydantic schemas.",
      "A bounding box and confidence score for every value, so a person can verify it.",
      "Hindi and Bengali detected and translated to English, with the original language kept.",
      "Context caching and per-job cost tracking to keep model spend visible.",
    ],
  },
  {
    icon: "graph",
    name: "Knowledge graph & search",
    role: "Built",
    impact: "Lets anyone question a document collection in plain language and see the sources.",
    stack: ["Neo4j", "LangGraph", "LangChain", "Embeddings"],
    points: [
      "Graph built from a declarative relationship file, with duplicate entities merged.",
      "Every entity linked back to the document it came from.",
      "Seven-step agent that runs semantic search and generated Cypher side by side, retrying failed queries up to three times.",
      "Answers with citations and ten turns of conversation memory.",
    ],
  },
];

export const stories: CaseStory[] = [
  {
    tag: "Quality",
    title: "Escalate fields, not documents",
    problem:
      "When labelers disagree, the usual fix is to send the whole document to an expert. Experts are scarce and most of each document was already agreed.",
    decision:
      "I ran consensus per field, in four tiers: unanimous, majority, edit distance, then human. Only the fields that fail every automatic tier go to arbitration, and the rest arrive pre-filled.",
    outcome: "Expert time goes only where people genuinely disagree, and every settled value records how it was decided.",
    metric: { value: "4", label: "tiers before a human" },
  },
  {
    tag: "Algorithms",
    title: "Match answers, not positions",
    problem:
      "On repeating sections, like several members or payments, labelers annotate in different orders and different counts. Comparing item 1 to item 1 is meaningless.",
    decision:
      "I paired instances across labelers with the Hungarian algorithm over a weighted score: value similarity, position on the page, and agreement. Similarity is type-aware for dates, numbers and text.",
    outcome: "Consensus works on repeating sections regardless of annotation order, and missing items are handled instead of breaking the match.",
    metric: { value: "60 · 30 · 10", label: "value · position · agreement" },
  },
  {
    tag: "Validation",
    title: "Catch errors while people work",
    problem: "Mistakes found at review time cost a full round trip: reject, reassign, re-label.",
    decision:
      "I built a rule engine that checks annotations live: formats and ranges, plus cross-field logic like totals, date order, uniqueness and required-if conditions. Projects can run in strict mode.",
    outcome: "Labelers see violations as they annotate, and reviewers get cleaner submissions.",
    metric: { value: "9", label: "rule types" },
  },
  {
    tag: "Reliability",
    title: "Change the engine mid-flight",
    problem: "New distribution strategies were needed while live projects were still running on the old model.",
    decision:
      "I added parallel and series strategies through nullable columns so existing projects kept their behaviour. Task assignment runs inside transactions so two labelers can't claim the same task, and stale tasks retire automatically.",
    outcome: "New projects got the new strategies without migrating or disrupting the old ones.",
    metric: { value: "2", label: "distribution strategies" },
  },
  {
    tag: "AI & search",
    title: "Ask the documents, not a database",
    problem:
      "The people who needed answers from thousands of FIRs couldn't write graph queries, and keyword search misses meaning.",
    decision:
      "I built an agent that runs semantic vector search and model-generated Cypher in parallel, retries failed queries with the error as feedback, and answers with citations to the source documents.",
    outcome: "Plain-language questions return grounded answers, and every claim points back to a document.",
    metric: { value: "2", label: "search modes in parallel" },
  },
];

export const leadResult = {
  value: "Solo",
  label: "Two products and three codebases, designed, built and shipped by one engineer.",
  note: "As Omara's founding engineer I owned every layer: the Go backend, the Next.js workspace, the consensus and scoring algorithms, and the AI and graph pipeline.",
};

export const results = [
  { value: "100+", label: "REST endpoints across 25+ services" },
  { value: "5", label: "user roles, including client admins and experts" },
  { value: "9", label: "live validation rule types" },
  { value: "3", label: "languages read: English, Hindi, Bengali" },
  { value: "768", label: "dimension embeddings for semantic search" },
];

export const stack = [
  { group: "Backend", items: ["Go", "Gin", "GORM", "Flask", "Python"] },
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "TanStack Query", "shadcn/ui", "react-pdf"] },
  { group: "AI", items: ["Gemini", "LangGraph", "LangChain", "Embeddings", "Pydantic"] },
  { group: "Data", items: ["PostgreSQL", "Neo4j", "S3"] },
  { group: "Cloud", items: ["AWS Cognito", "Lambda", "EventBridge", "Amplify", "Docker"] },
];

export const takeaway = "Ground truth is a process, not a dataset.";

export const reflection = [
  "The hardest part wasn't any single algorithm. It was designing the path a disagreement takes, from three labelers to one trusted value, so that every step is automatic until it genuinely needs a person.",
  "Being the only engineer meant owning every trade-off, from database columns to the button a labeler clicks. It taught me to build for the person doing the work, and to keep every answer traceable to its source.",
];
