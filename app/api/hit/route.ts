import { NextResponse, type NextRequest } from 'next/server'
import { recordHit } from '@/lib/stats'

// The beacon from components/Analytics.tsx lands here. It answers nothing
// but a status; failures in the store are logged, never shown to visitors.
const NO_BODY = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }

export async function POST(request: NextRequest) {
  const text = await request.text()
  if (text.length > 2000) return new NextResponse(null, { status: 413, headers: NO_BODY })
  let payload: unknown
  try {
    payload = JSON.parse(text)
  } catch {
    return new NextResponse(null, { status: 400, headers: NO_BODY })
  }
  try {
    await recordHit(payload, {
      country: request.headers.get('x-vercel-ip-country'),
      region: request.headers.get('x-vercel-ip-country-region'),
      userAgent: request.headers.get('user-agent'),
      host: request.headers.get('host'),
    })
  } catch (error) {
    console.error('stats: could not record a hit', error)
  }
  return new NextResponse(null, { status: 204, headers: NO_BODY })
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { ...NO_BODY, Allow: 'POST' } })
}
