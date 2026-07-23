import readlistData from "@/data/readlist.json";

export const metadata = {
  title: "Readlist",
  description: "Books, papers, blogs, and other materials I have read.",
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

  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xs font-mono uppercase tracking-wider text-foreground/40 font-semibold">
          Readlist
        </h1>
        <p className="text-sm text-foreground/50 leading-relaxed font-sans font-light">
          An archive of books, papers, articles, and documentation I've read.
        </p>
      </header>

      <div className="space-y-4 text-sm text-foreground/80 font-sans">
        {sortedItems.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-xs font-mono text-foreground/30 mt-1">•</span>
            <div className="flex-grow">
              <span className="text-xs font-mono text-foreground/40 mr-2">
                {item.date}
              </span>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                {item.title}
              </a>
              <span className="mx-2 text-foreground/30">—</span>
              <span className="text-xs font-mono uppercase tracking-wider text-foreground/50 bg-foreground/[0.04] px-1.5 py-0.5 border border-border/10 rounded">
                {item.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
