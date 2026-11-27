import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { type Dish, dishes } from "@/lib/cooking";
import { pageMeta } from "@/lib/meta";
import { reveal } from "@/lib/reveal";
import { breadcrumbs, ids } from "@/lib/schema";
import { abs } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Cooking",
  description:
    "Dishes Sahil Gangurde has cooked at home, from tea cupcakes to a chicken burger to a Japanese dinner, in photos.",
  path: "/cooking",
  keywords: ["Sahil Gangurde cooking", "home cooking", "air fryer", "cupcakes", "food photos"],
});

const structured = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${abs("/cooking")}#page`,
    url: abs("/cooking"),
    name: "Cooking by Sahil Gangurde",
    author: { "@id": ids.person },
    hasPart: dishes.map((d) => ({
      "@type": "CreativeWork",
      name: d.name,
      ...(d.note ? { description: d.note } : {}),
      ...(d.date ? { dateCreated: d.date } : {}),
      image: d.photos.map((p) => abs(p.src)),
    })),
  },
  breadcrumbs([{ name: "Cooking", path: "/cooking" }]),
];

const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Rows of up to three: 1, 2, 3, then 2+2, 3+2, 3+3 and so on. */
function rows<T>(items: T[]): T[][] {
  const n = items.length;
  if (n <= 3) return [items];
  const out: T[][] = [];
  let i = 0;
  while (i < n) {
    const left = n - i;
    const take = left === 4 ? 2 : Math.min(3, left);
    out.push(items.slice(i, i + take));
    i += take;
  }
  return out;
}

/** Every photo whole, never cropped: the photos in a row share one height and each takes the
 *  width its own shape needs (flex-grow by aspect ratio). A row never grows past 560px tall. */
function DishBento({ dish, first }: { dish: Dish; first: boolean }) {
  return (
    <div className="space-y-3">
      {rows(dish.photos).map((row, r) => {
        const ratios = row.map((p) => p.width / p.height);
        const total = ratios.reduce((a, b) => a + b, 0);
        return (
          <div key={r} className="flex gap-3" style={{ maxWidth: `calc(${total} * 560px + ${(row.length - 1) * 12}px)` }}>
            {row.map((p, i) => (
              <div
                key={p.src}
                className="relative overflow-hidden rounded-2xl bg-surface ring-1 ring-line"
                style={{ flex: `${ratios[i]} 1 0%`, aspectRatio: `${p.width} / ${p.height}` }}
              >
                <Image
                  src={p.src}
                  alt={r === 0 && i === 0 ? dish.name : `${dish.name}, another view`}
                  fill
                  priority={first && r === 0 && i === 0}
                  sizes={`(min-width: 1024px) ${Math.round((ratios[i] / total) * 1000)}px, ${Math.round((ratios[i] / total) * 100)}vw`}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function CookingPage() {
  return (
    <PageShell
      active="/cooking"
      eyebrow="Cooking"
      title={
        <>
          Things I&apos;ve cooked. <span className="text-fg/40">From my kitchen.</span>
        </>
      }
      intro={<p>Away from the keyboard, I cook. Here&apos;s what came out of the kitchen.</p>}
    >
      <JsonLd data={structured} />
      {dishes.length ? (
        dishes.map((d, i) => (
          <section
            key={d.slug}
            className="grid gap-5 border-t border-line py-12 first:border-t-0 first:pt-0 sm:py-16 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12"
          >
            <div {...reveal()}>
              <h2 className="text-[17px] font-medium leading-snug">{d.name}</h2>
              {d.date && (
                <p className="tabular mt-1 text-[13px] text-muted">
                  <time dateTime={d.date}>{date.format(new Date(d.date))}</time>
                </p>
              )}
              {d.note && <p className="mt-3 max-w-[32ch] text-[14px] leading-[1.6] text-muted">{d.note}</p>}
            </div>
            <div {...reveal(120)} className="min-w-0">
              <DishBento dish={d} first={i === 0} />
            </div>
          </section>
        ))
      ) : (
        <p className="text-muted">Photos coming soon.</p>
      )}
    </PageShell>
  );
}
