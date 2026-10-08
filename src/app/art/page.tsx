import type { Metadata } from "next";
import { art } from "@/data/art";
import PageHeader, { PageBody } from "@/components/ui/PageHeader";
import ArtGallery from "./ArtGallery";
import ArtWalk from "@/components/offclock/ArtWalk";

export const metadata: Metadata = {
  title: "Canvas | Paintings & Drawings by Sahil Gangurde",
  description:
    "The off-duty side of Sahil Gangurde: acrylic paintings, ink drawings and sketches made away from the keyboard.",
  alternates: { canonical: "https://lostmartian.in/art" },
  openGraph: {
    title: "Canvas | Paintings & Drawings by Sahil Gangurde",
    description: "Acrylic paintings, ink drawings and sketches by Sahil Gangurde (lostmartian).",
    url: "https://lostmartian.in/art",
    siteName: "Sahil Gangurde | lostmartian",
    type: "website",
  },
};

export default function ArtPage() {
  return (
    <div>
      <PageHeader mr="चित्र" label="Off the clock — Canvas" title={<>The other side of <span className="serif text-accent">the screen.</span></>}>
        When I&apos;m not debugging, I&apos;m painting and drawing, mostly acrylics and ink. It&apos;s where I
        practise composition and colour without a design system to lean on.
      </PageHeader>
      <ArtWalk pieces={art} />
      <PageBody>
      <p className="label mb-8 mt-24">All pieces · tap to open</p>
      <ArtGallery pieces={art} />
      </PageBody>
    </div>
  );
}
