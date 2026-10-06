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
  description: "Sahil Gangurde (lostmartian) is an elite Freelance AI & Backend Engineer, SDE 2 Systems Architect, and Founder of AgentDiff & KerrShift based in Pune, India. Available for hire: freelance projects, senior AI consulting, full-time and contract SDE roles, and 1-on-1 AI technical mentorship. Specializing in high-throughput Go/Python systems, agentic AI workflows, and GraphRAG.",
  keywords: [
    "Sahil Gangurde",
    "Sahil Gangurde portfolio",
    "lostmartian",
    "Pune AI engineer",
    "hire AI engineer Pune",
    "AI engineer Pune hire",
    "Pune AI consultant",
    "AI consultant Pune",
    "Pune software engineer",
    "Pune software engineer hire",
    "backend engineer Pune",
    "hire backend engineer Pune",
    "AI freelancer",
    "Freelance AI Engineer",
    "Freelance Backend Engineer",
    "AI engineer freelance",
    "hire freelance AI developer",
    "project basis AI engineer",
    "contract AI engineer",
    "Senior AI Consultant",
    "Full-Stack AI Engineer",
    "software engineer hire",
    "backend AI software hire",
    "SDE 1 backend",
    "SDE 2 backend",
    "SDE2 AI engineer",
    "SDE backend engineer hire",
    "teach AI",
    "AI teacher",
    "AI mentor",
    "AI tutor Pune",
    "learn AI engineering mentor",
    "1 on 1 AI coaching",
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
    "IIIT Gwalior Sahil Gangurde",
    "Sahil Gangurde Tech",
    "sahilgangurdetech",
    "Sahil Gangurde YouTube",
    "Attention Is All You Need systems breakdown",
    "GPU memory systems transformer"
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
        "jobTitle": "Freelance Full-Stack AI & Backend Engineer, SDE 2 Systems Architect, Founder & Educator",
        "description": "Sahil Gangurde (lostmartian) is an elite Freelance AI & Backend Engineer, SDE 2 Systems Architect, and Founder of AgentDiff & KerrShift based in Pune, India. Available for hire: freelance projects, senior AI consulting, full-time and contract SDE roles, and 1-on-1 AI technical mentorship.",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Indian Institute of Information Technology and Management, Gwalior (IIIT Gwalior)",
          "url": "https://www.iiitm.ac.in/"
        },
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "Freelance AI Engineer & Systems Architect",
            "description": "Architecting autonomous agents, GraphRAG systems, and AI evaluators on a contract or project basis."
          },
          {
            "@type": "Occupation",
            "name": "Freelance Backend Engineer & SDE 2",
            "description": "Building high-throughput Go and Python financial engines, SEBI allotment systems, and scale-elastic infrastructure."
          },
          {
            "@type": "Occupation",
            "name": "Senior AI Consultant & Systems Advisor",
            "description": "Enterprise AI architecture review, prompt drift auditing, trajectory evaluation via AgentDiff, and token cost optimization."
          },
          {
            "@type": "Occupation",
            "name": "Software Development Engineer (SDE 1 / SDE 2 / Backend AI)",
            "description": "Production software engineering across Go, Python, distributed databases (Aurora, Neo4j), and cloud infrastructure (AWS)."
          },
          {
            "@type": "Occupation",
            "name": "AI Technical Educator & 1-on-1 Mentor",
            "description": "Teaching first-principles deep learning, Attention mechanisms, GPU execution, and production AI agent engineering to teams and individuals."
          }
        ],
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Freelance AI Engineering (Project Basis)",
              "description": "Autonomous agents, GraphRAG pipelines, LLM evaluators, and production deployments."
            },
            "areaServed": ["Pune, Maharashtra, India", "Global Remote"]
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "High-Throughput Backend Engineering (SDE 1 / SDE 2 / Contract / Full-Time)",
              "description": "Concurrency-critical Go and Python financial engines, distributed systems, and AWS cloud architectures."
            },
            "areaServed": ["Pune, Maharashtra, India", "Global Remote"]
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Architecture Consulting & Auditing",
              "description": "Evaluation pipelines, CI/CD regression gates, and performance optimization."
            },
            "areaServed": ["Pune, Maharashtra, India", "Global Remote"]
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "1-on-1 AI Technical Mentorship & Educational Coaching",
              "description": "Hands-on instruction in deep learning mathematics, transformer mechanics, GPU bottlenecks, and building AI projects from first principles."
            },
            "areaServed": ["Pune, Maharashtra, India", "Global Remote"]
          }
        ],
        "creator": [
          {
            "@id": "https://www.youtube.com/@sahilgangurdetech#channel"
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
          "Sahil Gangurde Tech (@sahilgangurdetech)",
          "Transformer Attention Mechanisms & GPU Systems",
          "Deep Learning Architecture Mathematics",
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
          "https://www.youtube.com/@sahilgangurdetech",
          "https://www.youtube.com/channel/UCtaWm5UMqhiBtgHzKzkOabw",
          "https://agentdiff.app",
          "https://kerrshift.com",
          "https://latentchronicle.online/"
        ]
      },
      {
        "@type": "VideoChannel",
        "@id": "https://www.youtube.com/@sahilgangurdetech#channel",
        "name": "Sahil Gangurde Tech",
        "url": "https://www.youtube.com/@sahilgangurdetech",
        "description": "First-principles engineering deep dives into Autonomous AI Agents, Attention Mechanisms, GPU Memory limits, and Scaled Systems.",
        "author": {
          "@id": "https://lostmartian.in/#person"
        }
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
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Sahil Gangurde Tech (@sahilgangurdetech) Video Feed"
          href="https://www.youtube.com/feeds/videos.xml?channel_id=UCtaWm5UMqhiBtgHzKzkOabw"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
