'use client'

import { useEffect, useState } from 'react'

// Direct file downloads only — clicking pulls the installer straight down, the
// way Cursor/VS Code do. GitHub is just the invisible file host (release assets
// are served with Content-Disposition: attachment), never a page the visitor sees.
const REL = 'https://github.com/shep95/noah/releases/latest/download'

type OS = 'mac' | 'windows' | 'linux' | 'unknown'

const ASSET: Record<Exclude<OS, 'unknown'>, { file: string; label: string }> = {
  mac: { file: 'noah-macos-aarch64.dmg', label: 'Download for macOS' },
  windows: { file: 'noah-windows-x86_64.exe', label: 'Download for Windows' },
  linux: { file: 'noah-linux-x86_64.tar.gz', label: 'Download for Linux' },
}

const OTHERS: { os: Exclude<OS, 'unknown'>; file: string; label: string }[] = [
  { os: 'mac', file: 'noah-macos-aarch64.dmg', label: 'macOS · Apple Silicon' },
  { os: 'mac', file: 'noah-macos-x86_64.dmg', label: 'macOS · Intel' },
  { os: 'windows', file: 'noah-windows-x86_64.exe', label: 'Windows' },
  { os: 'linux', file: 'noah-linux-x86_64.tar.gz', label: 'Linux' },
]

function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  const platform = (navigator.platform || '').toLowerCase()
  if (/mac|iphone|ipad|ipod/.test(ua) || platform.startsWith('mac')) return 'mac'
  if (/win/.test(ua) || platform.startsWith('win')) return 'windows'
  if (/linux|x11/.test(ua) && !/android/.test(ua)) return 'linux'
  return 'unknown'
}

export default function DownloadButton({
  variant = 'hero',
}: {
  variant?: 'hero' | 'nav'
}) {
  const [os, setOs] = useState<OS>('unknown')
  const [showAll, setShowAll] = useState(false)
  useEffect(() => setOs(detectOS()), [])

  const known = os !== 'unknown'
  // When we can't detect, default the primary to macOS Apple Silicon but still
  // give the full direct-download list right below — never route to a page.
  const primary = known ? ASSET[os] : ASSET.mac
  const primaryHref = `${REL}/${primary.file}`

  if (variant === 'nav') {
    return (
      <a href={primaryHref} download className="btn-primary px-4 py-2 rounded-full text-sm">
        Download
      </a>
    )
  }

  return (
    <div className="flex flex-col items-center sm:items-start gap-3">
      <a
        href={primaryHref}
        download
        className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm tracking-wide"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
          <path d="M7.5 1.5V10M4 6.5L7.5 10L11 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 12.5H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {primary.label}
      </a>

      <div className="text-text-muted text-xs flex flex-col items-center sm:items-start gap-2">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="hover:text-text-secondary transition-colors"
        >
          {known ? 'other platforms' : 'choose your platform'} {showAll ? '−' : '+'}
        </button>

        {showAll && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
            {OTHERS.map((o) => (
              <a
                key={o.label}
                href={`${REL}/${o.file}`}
                download
                className="hover:text-text-secondary transition-colors"
              >
                {o.label}
              </a>
            ))}
          </div>
        )}

        <span className="opacity-80">free · no sign-up</span>
      </div>
    </div>
  )
}
