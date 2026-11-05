import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { Motion } from "@/components/Motion";
import { siteGraph } from "@/lib/schema";
import { DESCRIPTION, HANDLE, NAME, SITE_URL, TITLE, keywords } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "./globals.css";

// Inter with its optical-size axis: large headings get the tighter Display cut automatically.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], axes: ["opsz"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Pages set a short title ("About", a post's title); the template adds the name.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${NAME}` },
  description: DESCRIPTION,
  applicationName: `${NAME} (${HANDLE})`,
  keywords,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: NAME,
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [{ url: "/llms.txt", title: "Profile for AI assistants (llms.txt)" }],
      "application/rss+xml": [{ url: "/feed.xml", title: `${NAME}'s blog` }],
    },
  },
  openGraph: { type: "website", siteName: `${NAME} (${HANDLE})`, locale: "en_IN", url: "/", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", creator: "@lost_martian_", site: "@lost_martian_", title: TITLE, description: DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfdfc" },
    { media: "(prefers-color-scheme: dark)", color: "#060607" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={siteGraph} />
      </head>
      <body className="min-h-full overflow-x-hidden">
        {children}
        <Motion />
      </body>
    </html>
  );
}
