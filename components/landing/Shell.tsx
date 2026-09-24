import Link from 'next/link'
import Effects from './Effects'
import { LINKS } from '@/lib/site'
import '@/app/landing.css'

// Every page sits in the same room: the fixed wallpaper, the fog, a quiet nav
// and the footer. Pages only supply what is between them.
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="landing">
      <Effects />
      <div className="l-wallpaper" aria-hidden />
      <div className="l-wallpaper-overlay" aria-hidden />
      <div className="l-mist" aria-hidden />
      <div className="l-mist-2" aria-hidden />

      <div className="l-site">
        <nav className="l-nav" aria-label="primary">
          <Link href="/" className="l-nav-logo">
            noah
          </Link>
          <ul className="l-nav-links">
            <li><Link href="/#features">features</Link></li>
            <li><Link href="/faq">faq</Link></li>
            <li><Link href="/terms">terms</Link></li>
            <li><Link href="/download" className="l-nav-download">download</Link></li>
          </ul>
        </nav>

        {children}

        <footer className="l-footer">
          <div className="l-footer-brand">
            <span className="l-footer-logo">noah</span>
            <span className="l-footer-tags">#houseofasher · #asherin</span>
          </div>
          <ul className="l-footer-links">
            <li><Link href="/download">download</Link></li>
            <li><Link href="/faq">faq</Link></li>
            <li><Link href="/terms">terms</Link></li>
            <li><a href={LINKS.source} target="_blank" rel="noopener noreferrer">source</a></li>
            <li><a href={LINKS.discord} target="_blank" rel="noopener noreferrer">discord</a></li>
            <li><a href={LINKS.asherin} target="_blank" rel="noopener noreferrer">asherin.com</a></li>
          </ul>
        </footer>
      </div>
    </div>
  )
}
