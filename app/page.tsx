import Nav from '@/components/landing/Nav'
import Hero from '@/components/landing/Hero'
import Rooms from '@/components/landing/Rooms'
import Reveal from '@/components/landing/Reveal'
import Footer from '@/components/landing/Footer'
import DownloadButton from '@/components/landing/DownloadButton'

export default function Home() {
  return (
    <main className="relative min-h-screen grain">
      {/* full-page wallpaper base — the fog carries through the whole page */}
      <div className="wallpaper" aria-hidden />

      <Nav />
      <Hero />
      <Rooms />

      {/* the last room — the single accent lands here, in silence */}
      <section className="relative z-10 border-t border-border/40 min-h-[86svh] flex items-center justify-center px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-8" style={{ letterSpacing: '0.34em' }}>
            when you are ready
          </p>
          <h2
            className="display text-text-primary mb-10"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)', fontWeight: 320, letterSpacing: '-0.01em' }}
          >
            come to the quiet
            <br />
            and start.
          </h2>
          <div className="flex justify-center">
            <DownloadButton variant="hero" />
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
