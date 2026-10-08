import type { Metadata } from "next";
import Image from "next/image";
import { Clock } from "lucide-react";
import { dishes, type Dish } from "@/data/kitchen";
import PageHeader, { PageBody } from "@/components/ui/PageHeader";
import GenerativeTile from "@/components/ui/GenerativeTile";
import KitchenStory from "@/components/offclock/KitchenStory";

export const metadata: Metadata = {
  title: "Kitchen | Food & Cooking by Sahil Gangurde",
  description: "What Sahil Gangurde cooks when the laptop is closed: home-cooked dishes, experiments and weekend projects.",
  alternates: { canonical: "https://lostmartian.in/kitchen" },
  openGraph: {
    title: "Kitchen | Food & Cooking by Sahil Gangurde",
    description: "Home-cooked dishes, experiments and weekend projects by Sahil Gangurde (lostmartian).",
    url: "https://lostmartian.in/kitchen",
    siteName: "Sahil Gangurde | lostmartian",
    type: "website",
  },
};

const SPAN: Record<NonNullable<Dish["size"]>, string> = {
  tall: "",
  wide: "sm:col-span-2",
  square: "",
};

export default function KitchenPage() {
  return (
    <div>
      <PageHeader mr="स्वयंपाक" label="Off the clock — Kitchen" title={<>Same debugging mindset, <span className="serif text-accent">more garlic.</span></>}>
        Cooking is the one place where the feedback loop is under an hour and the output is delicious.
        Here&apos;s what&apos;s come off the stove lately.
      </PageHeader>

      <KitchenStory dishes={dishes} />
      <PageBody>
      <p className="label mb-8 mt-24">The full menu</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {dishes.map((d) => (
          <article key={d.slug} className={`surface group p-1.5 flex flex-col ${SPAN[d.size ?? "square"]}`}>
            <div className="relative aspect-[4/3] overflow-hidden">
              {d.image ? (
                <Image src={d.image} alt={d.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="photo object-cover" />
              ) : (
                <GenerativeTile seed={d.slug} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              )}
              <span className="absolute top-4 left-4 label !text-foreground bg-background/90 px-2.5 py-1.5">{d.cuisine}</span>
            </div>
            <div className="px-4 pt-5 pb-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl sm:text-[1.7rem] leading-tight">{d.title}</h2>
                <span className="label flex items-center gap-1.5 shrink-0 pt-1"><Clock className="w-3.5 h-3.5" />{d.time}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{d.note}</p>
              <ul className="flex flex-wrap gap-1.5">
                {d.tags.map((t) => (
                  <li key={t} className="bg-accent-subtle px-2 py-0.5 text-xs text-foreground/80">{t}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      </PageBody>
    </div>
  );
}
