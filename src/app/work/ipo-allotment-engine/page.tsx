import type { Metadata } from "next";
import IPOAllotmentClient from "./IPOAllotmentClient";

export const metadata: Metadata = {
  title: "SEBI IPO Allotment Engine | JRat's Studio & NTPL | Sahil Gangurde",
  description:
    "A deterministic, SEBI-compliant IPO Allotment Engine engineered by Sahil Gangurde (Freelance AI & Backend Engineer) for JRat’s Studio & Niche Technology Pvt Ltd (NTPL). Processes 1.6M+ records/sec under strict T+3 cycles with vectorized Polars and AWS Batch.",
  alternates: {
    canonical: "https://lostmartian.in/work/ipo-allotment-engine",
  },
  keywords: [
    "Sahil Gangurde",
    "JRat's Studio",
    "Jrats Studio",
    "NTPL",
    "Niche Technology Pvt Ltd",
    "Niche Technologies",
    "SEBI IPO Allotment Engine",
    "AI Freelancer",
    "Backend Engineer Freelance",
    "Vectorized Reconciliation",
    "High Throughput FinTech"
  ],
  openGraph: {
    title: "SEBI IPO Allotment Engine | JRat's Studio & NTPL | Sahil Gangurde",
    description:
      "Engineered by Sahil Gangurde for JRat’s Studio & Niche Technology Pvt Ltd (NTPL). High-throughput vectorized reconciliation processing 1.6M+ records/sec.",
    url: "https://lostmartian.in/work/ipo-allotment-engine",
    siteName: "Sahil Gangurde Portfolio",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "https://lostmartian.in/work/ipo-allotment-engine/opengraph-image",
        width: 1200,
        height: 630,
        alt: "IPO Allotment Engine by Sahil Gangurde for JRat's Studio and NTPL",
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
