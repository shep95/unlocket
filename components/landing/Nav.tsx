'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import DownloadButton from './DownloadButton'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled ? 'py-3.5 glass-nav' : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="display text-text-primary text-lg"
          style={{ letterSpacing: '0.32em', textIndent: '0.32em', fontWeight: 340 }}
        >
          noah
        </Link>

        <div className="flex items-center gap-7">
          <a
            href="https://discord.gg/M9hnebRwvk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-[0.8rem] tracking-wide hidden sm:inline"
          >
            discord
          </a>
          <Link href="/terms" className="btn-ghost text-[0.8rem] tracking-wide hidden sm:inline">
            terms
          </Link>
          <DownloadButton variant="nav" />
        </div>
      </div>
    </nav>
  )
}
