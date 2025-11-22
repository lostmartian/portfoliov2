import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import PersistentWidgets from '@/components/PersistentWidgets';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer',
  description: 'A showcase of creative development and design engineering.',
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
