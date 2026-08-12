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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Readlist
        </h1>
        <p className="text-sm text-foreground/75 leading-relaxed font-sans">
          An archive of books, papers, articles, and documentation I&apos;ve read.
        </p>
      </header>

      <div className="space-y-4 text-sm text-foreground/80 font-sans">
        {sortedItems.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-xs font-sans text-accent/60 mt-1">•</span>
            <div className="flex-grow space-y-0.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:text-accent hover:underline"
                >
                  {item.title} ↗
                </a>
                <div className="flex items-center gap-2 text-xs font-mono text-foreground/40">
                  <span className="uppercase text-[10px] tracking-wider bg-foreground/5 px-1.5 py-0.5 rounded text-foreground/60">
                    {item.type}
                  </span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
