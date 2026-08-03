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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Readlist
        </h1>
        <p className="text-sm text-foreground/75 leading-relaxed font-sans">
          An archive of books, papers, articles, and documentation I've read.
        </p>
      </header>

      <div className="space-y-4 text-sm text-foreground/80 font-sans">
        {sortedItems.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-xs font-sans text-accent/60 mt-1">•</span>
            <div className="flex-grow">
              <span className="text-xs font-mono text-foreground/65 mr-2">
                {item.date}
              </span>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-accent hover:underline"
              >
                {item.title}
              </a>
              <span className="mx-2 text-foreground/30">—</span>
              <span className="text-[9px] font-sans font-semibold uppercase tracking-wider text-accent bg-accent/5 px-1.5 py-0.5 border border-accent/15 rounded">
                {item.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
