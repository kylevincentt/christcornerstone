import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://christcornerstone.org';

export const metadata: Metadata = {
  title: {
    default: 'ChristCornerstone — A Home for Your Faith',
    template: '%s — ChristCornerstone',
  },
  description:
    'Explore the evidence, doctrine, and life Christianity offers. Answers to hard questions, deep Bible study, and resources for every stage of faith.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  keywords: ['Christianity', 'Christian faith', 'apologetics', 'Bible study', 'doctrine', 'theology', 'Jesus Christ', 'Scripture'],
  authors: [{ name: 'ChristCornerstone' }],
  creator: 'ChristCornerstone',
  publisher: 'ChristCornerstone',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'ChristCornerstone — A Home for Your Faith',
    description: "Truth doesn't fear questions. Explore the evidence, the doctrine, and the life Christianity offers — wherever you're starting from.",
    url: SITE_URL,
    siteName: 'ChristCornerstone',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChristCornerstone — A Home for Your Faith',
    description: "Truth doesn't fear questions.",
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0e1a' },
    { media: '(prefers-color-scheme: light)', color: '#faf6eb' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// Inline script — runs before first paint, reads saved theme pref.
// Defaults to 'light' when no preference has been saved.
const themeInitScript = `(function(){try{var t=localStorage.getItem('cc-theme');if(!t){t='light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <JsonLd />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
