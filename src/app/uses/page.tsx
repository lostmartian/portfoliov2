import type { Metadata } from "next";
import Link from "next/link";
import PageHeader, { PageBody } from "@/components/ui/PageHeader";
import { TECHNICAL_TOOLKIT } from "@/config/about";
import { PERSONAL_USES, SITE_STACK } from "@/data/uses";
import Glyph from "@/components/warli/Glyph";

export const metadata: Metadata = {
  title: "Uses | Sahil Gangurde",
  description: "The tools, stack and setup Sahil Gangurde uses to build AI and backend systems, and this website.",
  alternates: { canonical: "https://lostmartian.in/uses" },
};

const TOOLKIT_GLYPHS = ["ai", "lang", "db", "cloud", "ui"] as const;
const TOOLKIT_MR = ["बुद्धी", "भाषा", "माहिती", "ढग", "रूप"];

export default function UsesPage() {
  const groups = [
    ...TECHNICAL_TOOLKIT.map((g, i) => ({ title: g.title, mr: TOOLKIT_MR[i] ?? "", glyph: TOOLKIT_GLYPHS[i] ?? "code", items: g.list.map((name) => ({ name })) })),
    { title: "This website", mr: "हे संकेतस्थळ", glyph: "site" as const, items: SITE_STACK },
    ...PERSONAL_USES,
  ];

  return (
    <div>
      <PageHeader mr="वापर" label="Uses" title={<>The tools I <span className="serif text-accent">reach for.</span></>}>
        The stack behind the client work, the products and this site.
      </PageHeader>

      <PageBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {groups.map((g) => (
            <section key={g.title} className="group bg-background p-7 sm:p-9 transition-colors duration-500 hover:bg-card-bg">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div>
                  <p className="deva text-accent leading-none">{g.mr}</p>
                  <h2 className="text-3xl sm:text-4xl leading-tight mt-2">{g.title}</h2>
                </div>
                <span className="transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110">
                  <Glyph kind={g.glyph} />
                </span>
              </div>
              <ul className="border-t border-border">
                {g.items.map((it: { name: string; note?: string }) => (
                  <li key={it.name} className="flex items-baseline justify-between gap-4 py-2.5 border-b border-border last:border-b-0 text-[15px]">
                    <span>{it.name}</span>
                    {it.note && <span className="text-[13px] text-muted text-right">{it.note}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="text-[14px] text-muted">
          See them in action in the <Link href="/work" className="ink-link">case studies</Link>, or what I&apos;m using them for{" "}
          <Link href="/now" className="ink-link">right now</Link>.
        </p>
      </PageBody>
    </div>
  );
}
