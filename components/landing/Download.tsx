'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { INSTALLERS, type Installer } from '@/lib/site'

// Installers are hosted on this site (public/downloads), so the button pulls
// the file straight from here. The button offers the visitor's own platform
// when there is a build for it; platforms without one say so plainly.
type Platform = Installer['platform']

const PLATFORM_NAMES: Record<Platform, string> = { windows: 'windows', linux: 'linux', mac: 'mac' }

function detectPlatform(): Platform | null {
  const agent = navigator.userAgent.toLowerCase()
  const platform = (navigator.platform || '').toLowerCase()
  if (/mac|iphone|ipad|ipod/.test(agent) || platform.startsWith('mac')) return 'mac'
  if (/win/.test(agent) || platform.startsWith('win')) return 'windows'
  if (/linux|x11/.test(agent) && !/android/.test(agent)) return 'linux'
  return null
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export default function Download() {
  const [visitor, setVisitor] = useState<Platform | null>(null)
  useEffect(() => setVisitor(detectPlatform()), [])

  const forVisitor = INSTALLERS.find((installer) => installer.platform === visitor)
  const primary = forVisitor ?? INSTALLERS[0]
  const available = new Set(INSTALLERS.map((installer) => installer.platform))
  const soon = (Object.keys(PLATFORM_NAMES) as Platform[]).filter((platform) => !available.has(platform))

  return (
    <div>
      {visitor && !forVisitor && (
        <p className="l-download-note">noah for {PLATFORM_NAMES[visitor]} is coming soon.</p>
      )}
      <div className="l-cta-row">
        <a href={`/downloads/${primary.file}`} download className="l-btn-primary">
          <DownloadIcon />
          download for {PLATFORM_NAMES[primary.platform]}
        </a>
        <Link href="/download" className="l-btn-ghost">
          {soon.length > 0
            ? `${soon.map((platform) => PLATFORM_NAMES[platform]).join(' & ')} coming soon →`
            : 'all downloads →'}
        </Link>
      </div>
    </div>
  )
}
