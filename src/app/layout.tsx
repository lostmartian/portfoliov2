import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import PersistentWidgets from '@/components/PersistentWidgets';
import MobileNavbar from '@/components/MobileNavbar';
import JsonLd from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  metadataBase: new URL('https://lostmartian.in'),
  title: {
    default: 'Home | lostmartian',
    template: '%s | lostmartian',
  },
  description: 'A showcase of creative development and design engineering.',
  keywords: ['Full-Stack Engineer', 'AI Architect', 'Web Development', 'React', 'Next.js', 'Portfolio', 'Sahil Gangurde'],
  authors: [{ name: 'Sahil Gangurde' }],
  creator: 'Sahil Gangurde',
  publisher: 'Sahil Gangurde',
  openGraph: {
    title: 'Home | lostmartian',
    description: 'A showcase of creative development and design engineering.',
    url: 'https://lostmartian.in',
    siteName: 'lostmartian',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | lostmartian',
    description: 'A showcase of creative development and design engineering.',
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
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Force dark mode
                  localStorage.setItem('theme', 'dark');
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300`}>
        <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false} storageKey="theme">
          <PersistentWidgets />
          <MobileNavbar />
          {children}
          <JsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}
