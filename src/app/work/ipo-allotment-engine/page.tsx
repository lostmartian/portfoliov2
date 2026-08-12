import type { Metadata } from "next";
import IPOAllotmentClient from "./IPOAllotmentClient";

export const metadata: Metadata = {
  title: "Scale-Elastic IPO Allotment Engine | Sahil Gangurde",
  description:
    "A scale-elastic processing platform for high-stakes IPO settlement, distributed reconciliation, and SEBI compliance by Sahil Gangurde.",
  alternates: {
    canonical: "https://lostmartian.in/work/ipo-allotment-engine",
  },
  openGraph: {
    title: "Scale-Elastic IPO Allotment Engine | Sahil Gangurde",
    description:
      "A scale-elastic processing platform for high-stakes IPO settlement and distributed reconciliation.",
    url: "https://lostmartian.in/work/ipo-allotment-engine",
    siteName: "Sahil Gangurde | lostmartian",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "https://lostmartian.in/work/ipo-allotment-engine/opengraph-image",
        width: 1200,
        height: 630,
        alt: "IPO Allotment Engine | Sahil Gangurde",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scale-Elastic IPO Allotment Engine | Sahil Gangurde",
    description:
      "A scale-elastic processing platform for high-stakes IPO settlement and distributed reconciliation.",
    creator: "@lost_martian_",
    site: "@lost_martian_",
    images: ["https://lostmartian.in/work/ipo-allotment-engine/opengraph-image"],
  },
};

export default function IPOAllotmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Scale-Elastic IPO Allotment & Settlement Engine",
    description:
      "A scale-elastic processing platform for high-stakes IPO settlement and distributed reconciliation.",
    url: "https://lostmartian.in/work/ipo-allotment-engine",
    author: {
      "@type": "Person",
      name: "Sahil Gangurde",
      url: "https://lostmartian.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IPOAllotmentClient />
    </>
  );
}
