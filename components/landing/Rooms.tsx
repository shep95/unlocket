import Reveal from './Reveal'

// "the ui feels like architecture, not software. rooms you move through."
// Each room holds one idea inside deliberate negative space. Alignment
// alternates on purpose — intentional asymmetry, not the AI grid.
const ROOMS = [
  {
    n: '01',
    title: 'it reads the whole project first',
    body:
      'import a repo or open a folder and shepherd studies it before it writes a line — the architecture, the naming, the patterns you already chose. then it matches them, so its code reads like the hand that started the project.',
  },
  {
    n: '02',
    title: 'your models. your keys.',
    body:
      'bring a venice key for frontier models, or point noah at a model running on your own machine. local models are limited only by your hardware — 7b or 405b, whatever your memory can hold. nothing is metered, nothing phones home.',
  },
  {
    n: '03',
    title: 'the editor takes on your image',
    body:
      'set any wallpaper and the interface reads its color and light, then quietly retunes itself to match. the room you write in becomes yours — legible, calm, the code always sitting clearly on top.',
  },
  {
    n: '04',
    title: 'it learns from every correction',
    body:
      'each time you fix what it wrote, shepherd keeps the pattern. over time it stops making the same mistake. the memory is yours and stays on your machine.',
  },
  {
    n: '05',
    title: 'free. private. yours.',
    body:
      'no account, no paywall, no telemetry. we do not own your projects or keep records of them. the models you connect answer to you, under your key — not to us.',
  },
]

export default function Rooms() {
  return (
    <section className="relative z-10">
      {ROOMS.map((room, i) => {
        const right = i % 2 === 1
        return (
          <div
            key={room.n}
            className="min-h-[78svh] flex items-center px-6 md:px-[8vw] border-t border-border/40"
          >
            <div className="w-full max-w-5xl mx-auto">
              <Reveal
                className={`max-w-xl ${right ? 'ml-auto text-right' : 'mr-auto text-left'}`}
              >
                <span className="eyebrow block mb-6" style={{ letterSpacing: '0.34em' }}>
                  {room.n} <span className="opacity-40">— 05</span>
                </span>
                <h2
                  className="display text-text-primary mb-7"
                  style={{ fontSize: 'clamp(1.9rem, 5vw, 3.6rem)', fontWeight: 330 }}
                >
                  {room.title}
                </h2>
                <p
                  className={`text-text-secondary font-light leading-relaxed text-[1.02rem] ${
                    right ? 'ml-auto' : 'mr-auto'
                  }`}
                  style={{ maxWidth: '38ch' }}
                >
                  {room.body}
                </p>
              </Reveal>
            </div>
          </div>
        )
      })}
    </section>
  )
}
