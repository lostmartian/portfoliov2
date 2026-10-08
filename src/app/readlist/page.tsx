import readlistData from "@/data/readlist.json";
import type { Metadata } from "next";
import PageHeader, { PageBody } from "@/components/ui/PageHeader";
import { devaNum } from "@/components/ui/deva";

export const metadata: Metadata = {
  title: "Readlist & Technical Archive | Sahil Gangurde",
  description:
    "An archive of papers, technical books, essays, and systems engineering materials read and annotated by Sahil Gangurde.",
  alternates: {
    canonical: "https://lostmartian.in/readlist",
  },
  openGraph: {
    title: "Readlist & Technical Archive | Sahil Gangurde",
    description:
      "An archive of papers, technical books, essays, and systems engineering materials read by Sahil Gangurde.",
    url: "https://lostmartian.in/readlist",
    siteName: "Sahil Gangurde | lostmartian",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Readlist & Technical Archive | Sahil Gangurde",
    description:
      "An archive of papers, technical books, essays, and systems engineering materials read by Sahil Gangurde.",
    creator: "@lost_martian_",
    site: "@lost_martian_",
  },
};

interface ReadlistItem {
  date: string;
  title: string;
  link: string;
  type: string;
}

function formatYear(dateStr: string): string {
  if (!dateStr) return "";
  const match = dateStr.match(/\b\d{4}\b/);
  return match ? match[0] : dateStr.slice(0, 4);
}

export default function ReadlistPage() {
  const sortedItems = [...(readlistData as ReadlistItem[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Readlist & Technical Archive | Sahil Gangurde",
    description:
      "An archive of papers, technical books, essays, and systems engineering materials read by Sahil Gangurde.",
    url: "https://lostmartian.in/readlist",
    author: {
      "@type": "Person",
      name: "Sahil Gangurde",
      url: "https://lostmartian.in",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader mr="वाचन" label="Readlist" title={<>A running record of <span className="serif text-accent">what I read.</span></>}>
        Books, papers, articles and documentation I&apos;ve read.
      </PageHeader>

      <PageBody>
      <div className="border-t border-border">
        <ul className="divide-y divide-border">
          {sortedItems.map((item, i) => (
            <li key={i}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="row-link group flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-6 py-4"
              >
                <span className="flex items-baseline gap-4 min-w-0">
                  <span className="deva text-accent w-7 shrink-0">{devaNum(i + 1)}</span>
                  <span className="text-[15px] sm:text-base font-medium text-foreground group-hover:text-accent transition-colors">
                    {item.title} ↗
                  </span>
                </span>
                <span className="flex items-center gap-3 shrink-0 pl-10 sm:pl-0">
                  <span className="label !text-accent">{item.type}</span>
                  <span className="label tabular-nums">{formatYear(item.date)}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      </PageBody>
    </div>
  );
}
