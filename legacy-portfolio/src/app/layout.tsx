import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import PersistentWidgets from '@/components/PersistentWidgets';
import MobileNavbar from '@/components/MobileNavbar';
import JsonLd from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  metadataBase: new URL('https://lostmartian.in'),
  title: {
    default: 'lostmartian | High-End Dev Studio & Design Engineering',
    template: '%s | lostmartian',
  },
  description: 'Specializing in design engineering, high-performance AI solutions, and boutique software development. Elevating digital products through technical excellence.',
  keywords: [
    'lostmartian',
    'lostmartian Studio',
    'Dev Studio',
    'Design Engineering',
    'AI Solutions',
    'Full-Stack AI Engineer',
    'AI Architect',
    'Sahil Gangurde',
    'Boutique Software Development',
    'High-Performance Computing',
    'WebAssembly',
    'Wasm',
    'C++',
    'Golang',
    'Go Language',
    'Python',
    'TypeScript',
    'Next.js',
    'React',
    'Generative AI',
    'LLMs',
    'LangGraph',
    'LangChain',
    'GraphRAG',
    'Knowledge Graphs',
    'Neo4j',
    'PostgreSQL',
    'Database Systems',
    'B-Tree Indexing',
    'Distributed Systems',
    'Microservices',
    'Event-Driven Architecture',
    'AWS',
    'Docker',
    'Kubernetes',
    'EKS',
    'Serverless',
    'Cloud Native',
    'Computer Vision',
    'Deep Learning',
    'Image Processing',
    'UNet',
    'EffUNet',
    'Steganography',
    'Cryptography',
    'AES',
    'Slotted Page Format',
    'Key-Value Store',
    'lostdb',
    'WasmQuant',
    'Quant Tech',
    'Financial Technology',
    'Algorithm Design',
    'DSA'
  ],
  authors: [{ name: 'Sahil Gangurde' }],
  creator: 'Sahil Gangurde',
  publisher: 'Sahil Gangurde',
  openGraph: {
    title: 'lostmartian | High-End Dev Studio & Design Engineering',
    description: 'Specializing in design engineering, high-performance AI solutions, and boutique software development. Elevating digital products through technical excellence.',
    url: 'https://lostmartian.in',
    siteName: 'lostmartian',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'lostmartian | High-End Dev Studio & Design Engineering',
    description: 'Specializing in design engineering, high-performance AI solutions, and boutique software development. Elevating digital products through technical excellence.',
    creator: '@lostmartian',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[var(--bg-deep)] text-[var(--text-primary)] transition-colors duration-300`}>
        <ThemeProvider>
          <PersistentWidgets />
          <MobileNavbar />
          {children}
          <JsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}
