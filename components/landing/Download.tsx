'use client'

import { useEffect, useState } from 'react'

// Installers are hosted on this site (public/downloads), so the button pulls
// the file straight from here. Only platforms with a built installer are
// offered; the others say so plainly.
const DOWNLOADS = '/downloads'

type Platform = 'windows' | 'mac' | 'linux'

const BUILDS: Record<Platform, { file: string; name: string; available: boolean }> = {
  windows: { file: 'noah-windows-x86_64.exe', name: 'windows', available: true },
  mac: { file: 'noah-macos.dmg', name: 'mac', available: false },
  linux: { file: 'noah-linux-x86_64.tar.gz', name: 'linux', available: false },
}

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

  const primary = BUILDS.windows
  const soon = (Object.keys(BUILDS) as Platform[]).filter((platform) => !BUILDS[platform].available)
  const visitorWaiting = visitor !== null && !BUILDS[visitor].available

  return (
    <div>
      {visitorWaiting && (
        <p className="l-download-note">noah for {BUILDS[visitor].name} is coming soon.</p>
      )}
      <div className="l-cta-row">
        <a href={`${DOWNLOADS}/${primary.file}`} download className="l-btn-primary">
          <DownloadIcon />
          download for {primary.name}
        </a>
        <span className="l-btn-ghost">{soon.map((platform) => BUILDS[platform].name).join(' & ')} coming soon</span>
      </div>
    </div>
  )
}
