import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ChristCornerstone — A Home for Your Faith',
  description: 'Explore the evidence, doctrine, and life Christianity offers. Answers to hard questions, deep Bible study, and resources for every stage of faith.',
  metadataBase: new URL('https://christcornerstone.org'),
  openGraph: {
    title: 'ChristCornerstone — A Home for Your Faith',
    description: 'Truth doesn\'t fear questions. Explore the evidence, the doctrine, and the life Christianity offers — wherever you\'re starting from.',
    url: 'https://christcornerstone.org',
    siteName: 'ChristCornerstone',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChristCornerstone',
    description: 'Truth doesn\'t fear questions.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}