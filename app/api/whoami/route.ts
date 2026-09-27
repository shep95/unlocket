import { NextResponse, type NextRequest } from 'next/server'

// noah shield asks this after it brings its tunnel up, to show where the
// browser's traffic now comes out. The answer is what Vercel already knows
// about the connection; nothing is stored and nothing else is read.
const HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
}

export function GET(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for') || ''
  const ip = request.headers.get('x-real-ip') || forwarded.split(',')[0].trim()
  return NextResponse.json(
    {
      ip,
      country: request.headers.get('x-vercel-ip-country') || '',
      region: request.headers.get('x-vercel-ip-country-region') || '',
      city: decodeURIComponent(request.headers.get('x-vercel-ip-city') || ''),
    },
    { headers: HEADERS },
  )
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: HEADERS })
}
