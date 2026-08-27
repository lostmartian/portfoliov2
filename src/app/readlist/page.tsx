import readlistData from "@/data/readlist.json";
import type { Metadata } from "next";

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
    <main className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-1">
        <h1 className="text-[1.75rem] sm:text-[2.4rem] font-bold tracking-tight leading-tight text-foreground">
          A running record of what I read.
        </h1>
        <p className="text-[15px] text-foreground/75 leading-relaxed">
          An archive of books, papers, articles, and documentation I&apos;ve read.
        </p>
      </header>

      <div className="divide-y divide-border/60 border-y border-border/60">
        {sortedItems.map((item, i) => (
          <div key={i} className="py-4 group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-foreground group-hover:text-accent transition-colors"
            >
              {item.title} ↗
            </a>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs uppercase tracking-wide text-accent/80 font-semibold">
                {item.type}
              </span>
              <span className="text-sm text-foreground/55 tabular-nums">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
