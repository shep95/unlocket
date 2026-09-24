'use client'

import { useEffect, useState } from 'react'

const REL = 'https://github.com/shep95/noah/releases/latest/download'
const RELEASES = 'https://github.com/shep95/noah/releases/latest'

type OS = 'mac' | 'windows' | 'linux' | 'unknown'

const ASSET: Record<Exclude<OS, 'unknown'>, { file: string; label: string }> = {
  mac: { file: 'noah-macos-aarch64.dmg', label: 'Download for macOS' },
  windows: { file: 'noah-windows-x86_64.exe', label: 'Download for Windows' },
  linux: { file: 'noah-linux-x86_64.tar.gz', label: 'Download for Linux' },
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

export default function DownloadButton({
  variant = 'hero',
}: {
  variant?: 'hero' | 'nav'
}) {
  const [os, setOs] = useState<OS>('unknown')
  useEffect(() => setOs(detectOS()), [])

  const known = os !== 'unknown'
  const primaryHref = known ? `${REL}/${ASSET[os].file}` : RELEASES
  const primaryLabel = known ? ASSET[os].label : 'Download noah'

  if (variant === 'nav') {
    return (
      <a
        href={primaryHref}
        className="btn-primary px-4 py-2 rounded-full text-sm"
        aria-label={primaryLabel}
      >
        Download
      </a>
    )
  }

  return (
    <div className="flex flex-col items-center sm:items-start gap-3">
      <a
        href={primaryHref}
        className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm tracking-wide"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
          <path d="M7.5 1.5V10M4 6.5L7.5 10L11 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 12.5H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {primaryLabel}
      </a>

      <div className="text-text-muted text-xs flex flex-wrap items-center gap-x-3 gap-y-1">
        {os === 'mac' && (
          <>
            <a href={`${REL}/noah-macos-x86_64.dmg`} className="hover:text-text-secondary transition-colors">
              Intel Mac
            </a>
            <span className="opacity-40">·</span>
          </>
        )}
        <a href={RELEASES} className="hover:text-text-secondary transition-colors">
          all platforms &amp; versions
        </a>
        <span className="opacity-40">·</span>
        <span>free · no sign-up</span>
      </div>
    </div>
  )
}
