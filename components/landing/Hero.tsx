import DownloadButton from './DownloadButton'

// shepherd doctrine: dark, cold, cinematic. negative space is the primary
// material. the type arrives quietly, lowercase, and you come to it. one accent,
// reserved for the single trust state — the download.
export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      <div className="hero-wallpaper" aria-hidden />

      {/* the wordmark floats in the fog — placed high, with weight below it */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow fade d2 mb-8">a native code editor</p>

        <h1
          className="display fade d1 text-text-primary"
          style={{
            fontSize: 'clamp(2.6rem, 11vw, 8.5rem)',
            letterSpacing: '0.18em',
            fontWeight: 320,
            textIndent: '0.18em',
          }}
        >
          noah
        </h1>

        {/* the single hairline — the reference's divider */}
        <div
          className="fade d3"
          style={{
            width: 'min(70%, 520px)',
            height: 1,
            margin: '2.2rem 0 1.6rem',
            background:
              'linear-gradient(90deg, transparent, rgba(214,224,210,0.5), transparent)',
          }}
        />

        <p className="eyebrow fade d3" style={{ letterSpacing: '0.34em' }}>
          #houseofasher
        </p>

        <p className="rise d4 mt-10 max-w-md text-text-secondary text-[0.95rem] leading-relaxed font-light">
          a shepherd for your code. it reads your whole project — the architecture,
          the patterns, the aesthetic — and writes like it already lived there.
        </p>

        <div className="rise d5 mt-12">
          <DownloadButton variant="hero" />
        </div>
      </div>

      {/* quiet scroll cue — arriving without shouting */}
      <div className="relative z-10 pb-10 flex justify-center fade d5">
        <span className="eyebrow" style={{ letterSpacing: '0.3em', opacity: 0.55 }}>
          scroll
        </span>
      </div>
    </section>
  )
}
