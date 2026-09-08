import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lostmartian.in"),
  title: {
    template: "%s | Sahil Gangurde (lostmartian)",
    default: "Sahil Gangurde | Freelance AI & Backend Engineer | Founder of AgentDiff & KerrShift",
  },
  description: "Sahil Gangurde (lostmartian) is an elite Freelance AI & Backend Engineer, and Founder of AgentDiff (agentdiff.app) & KerrShift (kerrshift.com). Ex-Founding Full-Stack AI Engineer at Omara Technologies, Software Engineer at JRat's Studio building mission-critical SEBI financial engines for Niche Technologies (NTPL). Specializing in High-Throughput Go/Python, Agentic AI, and GraphRAG.",
  keywords: [
    "Sahil Gangurde",
    "Sahil Gangurde portfolio",
    "lostmartian",
    "AI freelancer",
    "Freelance AI Engineer",
    "Freelance Backend Engineer",
    "AI engineer freelance",
    "Senior AI Consultant",
    "Full-Stack AI Engineer",
    "Omara Technology",
    "Omara Technologies Sahil Gangurde",
    "Founding Engineer Omara Technologies",
    "JRat's Studio",
    "Jrats Studio Sahil Gangurde",
    "NTPL",
    "Niche Technology Pvt Ltd",
    "Niche Technologies",
    "NTPL IPO Allotment Engine",
    "SEBI Allotment Engine",
    "Founder of AgentDiff",
    "AgentDiff founder",
    "agentdiff.app",
    "Founder of KerrShift",
    "KerrShift founder",
    "kerrshift.com",
    "AI agent regression testing",
    "agent trajectory testing",
    "Go AI engineer",
    "Python AI engineer",
    "GraphRAG Neo4j engineer",
    "Pune AI engineer India",
    "IIIT Gwalior Sahil Gangurde"
  ],
  authors: [{ name: "Sahil Gangurde", url: "https://lostmartian.in" }],
  creator: "Sahil Gangurde",
  publisher: "Sahil Gangurde",
  alternates: {
    canonical: "https://lostmartian.in",
  },
  openGraph: {
    title: "Sahil Gangurde | Freelance AI & Backend Engineer | Founder of AgentDiff & KerrShift",
    description: "Portfolio of Sahil Gangurde (lostmartian) — Freelance AI Engineer & Founder of AgentDiff & KerrShift. Engineering high-concurrency systems for Omara Technologies, JRat's Studio, and NTPL.",
    url: "https://lostmartian.in",
    siteName: "Sahil Gangurde Portfolio",
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Gangurde | Freelance AI & Backend Engineer | Founder of AgentDiff & KerrShift",
    description: "Portfolio of Sahil Gangurde (lostmartian) — Freelance AI Engineer & Founder of AgentDiff & KerrShift. Systems engineering for Omara Technologies, JRat's Studio, and NTPL.",
    creator: "@lost_martian_",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://lostmartian.in/#person",
        "name": "Sahil Gangurde",
        "alternateName": ["lostmartian", "Sahil"],
        "url": "https://lostmartian.in",
        "image": "https://lostmartian.in/og-image.png",
        "jobTitle": "Freelance Full-Stack AI & Backend Engineer, Founder",
        "description": "Sahil Gangurde is a Freelance AI & Backend Engineer and founder of AgentDiff and KerrShift. He has engineered systems for Omara Technologies, JRat's Studio, and Niche Technologies (NTPL).",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Indian Institute of Information Technology and Management, Gwalior (IIIT Gwalior)",
          "url": "https://www.iiitm.ac.in/"
        },
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "Freelance AI Engineer",
            "description": "Architecting autonomous agents, GraphRAG systems, and AI evaluators."
          },
          {
            "@type": "Occupation",
            "name": "Freelance Backend Engineer",
            "description": "Building high-throughput Go and Python financial engines and scale-elastic infrastructure."
          }
        ],
        "founder": [
          {
            "@type": "Organization",
            "name": "AgentDiff",
            "url": "https://agentdiff.app",
            "sameAs": [
              "https://www.linkedin.com/company/agentdiff",
              "https://github.com/lostmartian/agentdiff"
            ]
          },
          {
            "@type": "Organization",
            "name": "KerrShift",
            "url": "https://kerrshift.com"
          }
        ],
        "worksFor": [
          {
            "@type": "Organization",
            "name": "First500days",
            "url": "https://first500days.com/"
          },
          {
            "@type": "Organization",
            "name": "JRat's Studio",
            "url": "https://www.jrats.studio/"
          }
        ],
        "knowsAbout": [
          "AI Freelance Engineering",
          "Backend Freelance Engineering",
          "Omara Technologies Architecture",
          "JRat's Studio Software Engineering",
          "NTPL Niche Technology Pvt Ltd SEBI Compliance",
          "AgentDiff AI Agent Testing",
          "KerrShift Platforms",
          "High-Throughput Go (Golang)",
          "Python FastAPI & Polars",
          "GraphRAG (Neo4j & Gemini)",
          "Large Language Models (LLMs)",
          "Financial Settlement Engines",
          "AWS Cloud Infrastructure (Batch, Step Functions, ECS, Aurora)"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "addressCountry": "India"
        },
        "sameAs": [
          "https://github.com/lostmartian",
          "https://linkedin.com/in/lostmartian",
          "https://twitter.com/lost_martian_",
          "https://agentdiff.app",
          "https://kerrshift.com",
          "https://latentchronicle.online/"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://agentdiff.app/#organization",
        "name": "AgentDiff",
        "url": "https://agentdiff.app",
        "founder": {
          "@id": "https://lostmartian.in/#person"
        },
        "description": "AI agent trajectory and execution path regression testing tool for CI/CD, founded by Sahil Gangurde."
      },
      {
        "@type": "Organization",
        "@id": "https://kerrshift.com/#organization",
        "name": "KerrShift",
        "url": "https://kerrshift.com",
        "founder": {
          "@id": "https://lostmartian.in/#person"
        },
        "description": "Technology platform founded by Sahil Gangurde."
      },
      {
        "@type": "WebSite",
        "@id": "https://lostmartian.in/#website",
        "url": "https://lostmartian.in",
        "name": "Sahil Gangurde Portfolio | Freelance AI & Backend Engineer",
        "description": "Official website and portfolio of Sahil Gangurde (lostmartian) — Freelance AI Engineer, Founder of AgentDiff and KerrShift.",
        "publisher": {
          "@id": "https://lostmartian.in/#person"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >

          <div className="max-w-5xl mx-auto px-6 pt-2 pb-8 min-h-screen flex flex-col justify-between">
            <div>
              <Navigation />
              <main className="py-8">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
