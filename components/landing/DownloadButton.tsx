'use client'

import { useEffect, useState } from 'react'

// Installers are hosted on this site (public/downloads), so clicking Download
// pulls the file straight from here — no GitHub, no extra pages.
// Only platforms with a built installer are offered; others say so honestly.
const DL = '/downloads'

type OS = 'mac' | 'windows' | 'linux' | 'unknown'

type Build = { file: string; label: string; available: boolean }

const BUILDS: Record<Exclude<OS, 'unknown'>, Build> = {
  windows: { file: 'noah-windows-x86_64.exe', label: 'Download for Windows', available: true },
  linux: { file: 'noah-linux-x86_64.tar.gz', label: 'Download for Linux', available: false },
  mac: { file: 'noah-macos.dmg', label: 'Download for macOS', available: false },
}

const PLATFORM_NAME: Record<Exclude<OS, 'unknown'>, string> = {
  windows: 'Windows',
  linux: 'Linux',
  mac: 'macOS',
}

function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  const platform = (navigator.platform || '').toLowerCase()
  if (/mac|iphone|ipad|ipod/.test(ua) || platform.startsWith('mac')) return 'mac'
  if (/win/.test(ua) || platform.startsWith('win')) return 'windows'
  if (/linux|x11/.test(ua) && !/android/.test(ua)) return 'linux'
  return 'unknown'
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M7.5 1.5V10M4 6.5L7.5 10L11 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 12.5H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export default function DownloadButton({
  variant = 'hero',
}: {
  variant?: 'hero' | 'nav'
}) {
  const [os, setOs] = useState<OS>('unknown')
  useEffect(() => setOs(detectOS()), [])

  const available = (Object.keys(BUILDS) as Exclude<OS, 'unknown'>[]).filter(
    (k) => BUILDS[k].available,
  )
  const mine = os !== 'unknown' ? BUILDS[os] : null
  const primary: Build = mine && mine.available ? mine : BUILDS[available[0] ?? 'windows']
  const href = `${DL}/${primary.file}`

  if (variant === 'nav') {
    return (
      <a href={href} download className="btn-primary px-4 py-2 rounded-full text-sm">
        Download
      </a>
    )
  }

  const unavailableHere = os !== 'unknown' && !BUILDS[os].available

  return (
    <div className="flex flex-col items-center sm:items-start gap-3">
      {unavailableHere && (
        <p className="text-text-secondary text-sm">
          noah for {PLATFORM_NAME[os as Exclude<OS, 'unknown'>]} is coming soon.
        </p>
      )}

      <a
        href={href}
        download
        className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm tracking-wide"
      >
        <DownloadIcon />
        {primary.label}
      </a>

      <div className="text-text-muted text-xs flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
        {(Object.keys(BUILDS) as Exclude<OS, 'unknown'>[])
          .filter((k) => BUILDS[k] !== primary)
          .map((k) =>
            BUILDS[k].available ? (
              <a key={k} href={`${DL}/${BUILDS[k].file}`} download className="hover:text-text-secondary transition-colors">
                {PLATFORM_NAME[k]}
              </a>
            ) : (
              <span key={k} className="opacity-60">
                {PLATFORM_NAME[k]} · soon
              </span>
            ),
          )}
        <span className="opacity-40">·</span>
        <span>free · no sign-up</span>
      </div>
    </div>
  )
}
