import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageShell, label } from "@/components/PageShell";
import { CopyEmail } from "@/components/CopyEmail";
import { Row, SmartLink } from "@/components/Row";
import { EMAIL } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { reveal } from "@/lib/reveal";
import { breadcrumbs, ids } from "@/lib/schema";
import { abs, contact, services } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Hire an AI and backend engineer",
  description:
    "Hire Sahil Gangurde, a freelance AI and backend engineer in Pune, for end-to-end product builds: AI and LLM systems, backend and data platforms, fintech and regulated software, and developer tooling. Remote, worldwide.",
  path: "/services",
  keywords: [
    "hire AI engineer",
    "hire backend engineer",
    "freelance AI engineer",
    "freelance backend developer",
    "AI engineer India",
    "AI engineer Pune",
    "fintech developer",
    "LLM developer",
    "AI agents developer",
    "contract software engineer",
  ],
});

/** Industries, each backed by shipped work. */
const industries = [
  {
    name: "Fintech and capital markets",
    text: "IPO validation, reconciliation and allotment for a SEBI-registered registrar, and the ERP that runs its shareholder registers, KYC and dividends.",
    links: [
      { label: "IPO Allotment Engine", href: "/work/ipo-allotment-engine" },
      { label: "Fintech, from the inside", href: "/blogs/software-where-being-wrong-has-a-name" },
    ],
  },
  {
    name: "AI and data",
    text: "Ground-truth labelling where people disagree, document knowledge graphs, and tools that make AI agents cheaper and safer to run.",
    links: [
      { label: "Farsight", href: "/work/farsight" },
      { label: "AgentDiff", href: "/work/agentdiff" },
    ],
  },
  {
    name: "Healthcare",
    text: "The AI layer of a UK health app: triage, care journeys and plain-language reports, behind guardrails that never let the AI play doctor.",
    links: [{ label: "AYUVA", href: "/work/ayuva" }],
  },
  {
    name: "Developer tooling",
    text: "Compilers and CLIs that make engineering teams faster: a Next.js-to-Rust compiler and an agent cost analyser.",
    links: [
      { label: "tsx2rs", href: "/work/tsx2rs" },
      { label: "AgentDiff", href: "/work/agentdiff" },
    ],
  },
];

const process = [
  { step: "Learn the domain", text: "Rules, edge cases and the source of truth come first. In regulated work, that is most of the job." },
  { step: "Design for correctness", text: "Make the dangerous path impossible, audit what matters, and test against an oracle." },
  { step: "Build end to end", text: "Backend, AI, interface and infrastructure, so nothing falls between people." },
  { step: "Ship and hand over", text: "Deployed, documented and measured, with decisions written down so your team can carry it." },
];

const engagements = [
  ["Freelance projects", "A defined product or feature, built and shipped"],
  ["Contract or retainer", "An extra senior engineer on your team"],
  ["Full-time roles", "Backend, AI or founding-engineer positions"],
  ["Where", contact.availability],
] as const;

const structured = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${abs("/services")}#page`,
    url: abs("/services"),
    name: "Hire Sahil Gangurde, AI and backend engineer",
    about: { "@id": ids.service },
    mainEntity: { "@id": ids.service },
  },
  breadcrumbs([{ name: "Services", path: "/services" }]),
];

export default function ServicesPage() {
  return (
    <PageShell
      active="/services"
      eyebrow="Services"
      title={
        <>
          Work with me. <span className="text-fg/40">From the first idea to production.</span>
        </>
      }
      intro={
        <p>
          I&apos;m an AI and backend engineer who builds whole products: architecture, backend, AI, interface and deployment. I&apos;ve
          shipped fintech for a stock registrar, AI platforms as a founding engineer and AI for a UK health app.
        </p>
      }
    >
      <JsonLd data={structured} />

      <div {...reveal(340)} className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-16">
        <a
          href={`mailto:${EMAIL}?subject=Project%20enquiry`}
          className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-[15px] font-medium text-ink transition-transform active:scale-[0.98]"
        >
          Start a project
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} />
        </a>
        <CopyEmail withIcon className="inline-flex items-center gap-2 text-[15px] font-medium text-muted transition-colors hover:text-fg" />
      </div>

      <Row name="What I do">
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.name}>
              <h2 className="text-lg font-medium">{s.name}</h2>
              <p className="mt-2 text-[15px] leading-[1.7] text-muted">{s.description}</p>
            </div>
          ))}
        </div>
      </Row>

      <Row name="Industries" note="Each one backed by shipped work">
        <div className="space-y-10">
          {industries.map((i) => (
            <div key={i.name} className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-8">
              <h2 className="text-[15px] font-medium">{i.name}</h2>
              <div>
                <p className="max-w-[60ch] text-[15px] leading-[1.7] text-muted">{i.text}</p>
                <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {i.links.map((l) => (
                    <SmartLink key={l.href} href={l.href}>
                      {l.label}
                    </SmartLink>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Row>

      <Row name="How I work">
        <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {process.map((p, i) => (
            <li key={p.step}>
              <p className="tabular text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-1 text-lg font-medium">{p.step}</h2>
              <p className="mt-1.5 text-[15px] leading-[1.7] text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </Row>

      <Row name="Ways to work together">
        <dl className="space-y-5">
          {engagements.map(([k, v]) => (
            <div key={k} className="grid gap-1 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
              <dt className="text-[15px] font-medium">{k}</dt>
              <dd className="text-[15px] leading-[1.7] text-muted">{v}</dd>
            </div>
          ))}
        </dl>
        <p className={`${label} mt-10`}>
          Based in Pune, India. Write to{" "}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-fg transition-opacity hover:opacity-60">
            {EMAIL}
          </a>
          .
        </p>
      </Row>
    </PageShell>
  );
}
