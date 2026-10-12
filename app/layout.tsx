import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://pongcast.ai'
  ),
  title: {
    default: 'PongCast — AI-Powered Table Tennis Broadcast Engine',
    template: '%s | PongCast',
  },
  description:
    'Turn raw table tennis match footage into TV-ready broadcasts with real-time ball trajectory tracking, ITTF-compliant scoring, and official WTT-style overlays.',
  applicationName: 'PongCast',
  keywords: [
    'table tennis broadcast',
    'table tennis AI',
    'computer vision sports',
    'ITTF automated scoring',
    'ball tracking',
    'WTT broadcast overlay',
    'sports video analysis',
  ],
  authors: [{ name: 'PongCast Engineering Team' }],
  creator: 'PongCast',
  publisher: 'PongCast',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'PongCast',
    title: 'PongCast — AI-Powered Table Tennis Broadcast Engine',
    description:
      'Turn raw table tennis match footage into TV-ready broadcasts with real-time ball trajectory tracking, ITTF-compliant scoring, and official WTT-style overlays.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PongCast — AI-Powered Table Tennis Broadcast Engine Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PongCast — AI-Powered Table Tennis Broadcast Engine',
    description:
      'Turn raw table tennis match footage into TV-ready broadcasts with real-time ball tracking, ITTF scoring, and broadcast graphics.',
    images: ['/og-image.png'],
    creator: '@pongcast_ai',
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-brand-lightBg text-neutral-900 dark:bg-brand-dark dark:text-neutral-100 selection:bg-sage-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
