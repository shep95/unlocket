import { NextResponse, type NextRequest } from 'next/server'
import { isBlockedAgent, isProbePath } from '@/lib/bots'

// Each page response gets a fresh nonce, and only scripts carrying it (Next.js
// reads it from the request's CSP header and stamps its own tags) may run.
// 'strict-dynamic' lets those scripts load the app's chunks without widening
// the list. Styles keep 'unsafe-inline' because React writes style attributes
// and the wallpaper picker sets custom properties inline.
function contentSecurityPolicy(nonce: string): string {
  const development = process.env.NODE_ENV === 'development'
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${development ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "media-src 'self'",
    "manifest-src 'self'",
    "worker-src 'none'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    ...(development ? [] : ['upgrade-insecure-requests']),
  ].join('; ')
}

// Answers carry no body and no hints about what the site runs on.
function refuse(status: 403 | 404) {
  return new NextResponse(null, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (isProbePath(pathname)) return refuse(404)
  if (isBlockedAgent(request.headers.get('user-agent'))) return refuse(403)

  // Images get the same gate as pages, but no page CSP.
  if (pathname.startsWith('/wallpapers/') || pathname === '/founder.jpg') return NextResponse.next()

  const nonce = btoa(crypto.randomUUID())
  const policy = contentSecurityPolicy(nonce)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', policy)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', policy)
  return response
}

// Pages and the site's own images. Other static files, including the
// installers the updater fetches, get their fixed headers from
// next.config.mjs and never pay for a middleware call.
export const config = {
  matcher: [
    {
      source:
        '/((?!_next/static|_next/image|downloads/|\\.well-known/|favicon\\.ico|icon|apple-touch-icon\\.png|og-image\\.jpg|wallpaper\\.jpg|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
