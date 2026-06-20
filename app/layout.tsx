import type { Metadata } from 'next';
import { Outfit, Cairo, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles
import Header from '@/components/common/Header';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

export const metadata: Metadata = {
  title: 'Fardy ODD',
  description: 'Bilingual (Arabic/English) social media platform for ADHD patients',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The dir/lang will be handled by client-side hydration or cookie in a real app,
  // but for MVP we default to LTR and let `useLanguage` hook set it on mount.
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${cairo.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans antialiased text-slate-800 bg-slate-50 min-h-screen flex flex-col`} suppressHydrationWarning>
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
