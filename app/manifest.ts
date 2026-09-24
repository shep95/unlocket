import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'noah — free AI code editor',
    short_name: 'noah',
    description: 'A free, native AI code editor with the shepherd agent. No account, no paywall.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070909',
    theme_color: '#070909',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
