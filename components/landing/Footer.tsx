import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 px-6 py-14">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <span
            className="display text-text-primary text-base"
            style={{ letterSpacing: '0.3em', textIndent: '0.3em' }}
          >
            noah
          </span>
          <span className="text-text-muted text-xs tracking-wide">
            #houseofasher · #asherin
          </span>
        </div>

        <div className="flex items-center gap-7 text-[0.8rem] text-text-secondary tracking-wide">
          <Link href="/terms" className="btn-ghost">
            terms
          </Link>
          <a
            href="https://discord.gg/M9hnebRwvk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            discord
          </a>
          <a
            href="https://asherin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            asherin.com
          </a>
        </div>

        <p className="text-text-muted text-xs tracking-wide">
          free · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
