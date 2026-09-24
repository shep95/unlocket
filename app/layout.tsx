import type { Metadata, Viewport } from 'next'
import './globals.css'
import { DESCRIPTION, LINKS, SITE_URL } from '@/lib/site'

const SHARE_DESCRIPTION =
  'A free AI code editor. shepherd reads your whole project before it writes. Venice or local models, no account, no paywall.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'noah — free AI code editor with the shepherd agent',
    template: '%s · noah',
  },
  description: DESCRIPTION,
  applicationName: 'noah',
  keywords: [
    'free ai code editor',
    'ai code editor',
    'ai coding agent',
    'cursor alternative',
    'free cursor alternative',
    'zed fork',
    'local llm code editor',
    'ollama code editor',
    'venice ai',
    'code editor without account',
    'private ai ide',
    'shepherd ai',
    'houseofasher',
  ],
  authors: [{ name: '#houseofasher', url: LINKS.asherin }],
  creator: '#houseofasher',
  publisher: '#houseofasher',
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'noah',
    title: 'noah — free AI code editor',
    description: SHARE_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1302,
        height: 366,
        alt: 'noah, an unfiltered code editor by #houseofasher, over misty green hills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'noah — free AI code editor',
    description: SHARE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070909',
  colorScheme: 'dark',
}

// Describes who makes noah, the site, and the app itself, so search engines
// can connect the brand, the download and the organisation behind it.
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: '#houseofasher',
      url: LINKS.asherin,
      logo: `${SITE_URL}/icon.png`,
      sameAs: [LINKS.asherin, LINKS.discord, LINKS.source],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'noah',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: 'noah',
      description: DESCRIPTION,
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Code editor',
      operatingSystem: 'Windows 10, Windows 11',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      downloadUrl: `${SITE_URL}/download`,
      image: `${SITE_URL}/og-image.jpg`,
      license: 'https://www.gnu.org/licenses/gpl-3.0.html',
      isAccessibleForFree: true,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/wallpaper.jpg" as="image" fetchPriority="high" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
