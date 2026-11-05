import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { reveal } from "@/lib/reveal";

// Editorial building blocks shared by About and Services.

const textLink = "inline-flex items-center gap-1.5 font-semibold text-fg transition-opacity hover:opacity-60";

/** One editorial row: a quiet label on the left, the content on the right. */
export function Row({ name, note, children }: { name: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-16 sm:py-20 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12">
      <div {...reveal()}>
        <h2 className="text-[15px] font-medium">{name}</h2>
        {note && <p className="mt-1 text-[13px] text-muted">{note}</p>}
      </div>
      <div {...reveal(120)} className="min-w-0">
        {children}
      </div>
    </section>
  );
}

export function SmartLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
    </>
  );
  return external ? (
    <a href={href} className={textLink}>
      {content}
    </a>
  ) : (
    <Link href={href} className={textLink}>
      {content}
    </Link>
  );
}

