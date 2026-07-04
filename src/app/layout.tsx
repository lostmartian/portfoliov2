import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lostmartian.in"),
  title: {
    template: "%s | lostmartian",
    default: "Freelance Full-Stack AI & Backend Engineer | Sahil Gangurde",
  },
  description: "Freelance Full-Stack AI & Backend Engineer specializing in high-throughput financial settlement engines, GraphRAG platforms, and secure multi-tenant SaaS. Available for contracts and consulting.",
  openGraph: {
    title: "Freelance Full-Stack AI & Backend Engineer | Sahil Gangurde",
    description: "Specializing in high-throughput financial settlement engines, GraphRAG platforms, and secure multi-tenant SaaS. Available for contracts and consulting.",
    url: "https://lostmartian.in",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Full-Stack AI & Backend Engineer | Sahil Gangurde",
    description: "Specializing in high-throughput financial settlement engines, GraphRAG platforms, and secure multi-tenant SaaS. Available for contracts and consulting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sahil Gangurde",
    "url": "https://lostmartian.in",
    "image": "https://lostmartian.in/og-image.png",
    "jobTitle": "Freelance Full-Stack AI & Backend Engineer",
    "knowsAbout": [
      "Software Engineering",
      "Backend Development",
      "Artificial Intelligence",
      "GraphRAG",
      "Large Language Models",
      "Financial Technology",
      "Cloud Computing",
      "Go",
      "Python",
      "Next.js"
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
      "https://twitter.com/lost_martian"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <div className="flex-grow pb-12 md:pb-24">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
