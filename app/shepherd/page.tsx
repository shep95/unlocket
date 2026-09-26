import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import Shell from '@/components/landing/Shell'
import { breadcrumbs, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/shepherd',
  title: 'shepherd, quantum artificial intelligence',
  description:
    'shepherd is the ai system powering noah: quantum artificial intelligence from house of asher, built by shaping how a model thinks rather than what it was trained to do.',
})

function Theory() {
  return (
    <svg className="l-sd" viewBox="0 0 640 220" role="img" aria-labelledby="sd-theory-title">
      <title id="sd-theory-title">
        a model&apos;s training, reshaped by personas and thinking patterns, becomes shepherd
      </title>
      <rect className="l-sd-box" x="10" y="70" width="170" height="80" rx="3" />
      <text className="l-sd-label" x="95" y="104" textAnchor="middle">llm</text>
      <text className="l-sd-note" x="95" y="126" textAnchor="middle">what it was trained to do</text>

      <path className="l-sd-line" d="M180 110 H240" />
      <path className="l-sd-line" d="M240 110 L300 50 M240 110 L300 110 M240 110 L300 170" />
      <circle className="l-sd-node" cx="300" cy="50" r="4" />
      <circle className="l-sd-node" cx="300" cy="110" r="4" />
      <circle className="l-sd-node" cx="300" cy="170" r="4" />
      <text className="l-sd-note" x="312" y="54">personas</text>
      <text className="l-sd-note" x="312" y="114">thinking patterns</text>
      <text className="l-sd-note" x="312" y="174">how it thinks</text>
      <path className="l-sd-line" d="M300 50 L430 110 M300 110 H430 M300 170 L430 110" />

      <path className="l-sd-accent l-sd-draw" d="M430 110 H440" />
      <rect className="l-sd-box l-sd-box-accent" x="440" y="70" width="190" height="80" rx="3" />
      <text className="l-sd-label" x="535" y="104" textAnchor="middle">shepherd</text>
      <text className="l-sd-note" x="535" y="126" textAnchor="middle">quantum artificial intelligence</text>
    </svg>
  )
}

const LAYERS = [
  'response',
  'artificial intelligence',
  'algorithms',
  'micro algorithms',
  'micro algorithms within micro algorithms',
]

function Levels() {
  return (
    <svg className="l-sd" viewBox="0 0 640 300" role="img" aria-labelledby="sd-levels-title">
      <title id="sd-levels-title">
        levels deeper: a response rests on ai, ai on algorithms, algorithms on micro algorithms
      </title>
      {LAYERS.map((layer, index) => {
        const radius = 140 - index * 26
        const labelY = 58 + index * 46
        // The leader leaves each ring on the straight line toward its label.
        const angle = Math.atan2(labelY - 150, 362 - 170)
        const startX = 170 + radius * Math.cos(angle)
        const startY = 150 + radius * Math.sin(angle)
        return (
          <g key={layer}>
            <circle
              className={index === LAYERS.length - 1 ? 'l-sd-ring l-sd-ring-core' : 'l-sd-ring'}
              cx="170"
              cy="150"
              r={radius}
            />
            <circle className="l-sd-node" cx={startX} cy={startY} r="2.5" />
            <path className="l-sd-line" d={`M${startX} ${startY} L362 ${labelY}`} />
          </g>
        )
      })}
      {LAYERS.map((layer, index) => (
        <text key={layer} className="l-sd-note" x="372" y={62 + index * 46}>
          <tspan className="l-sd-index">{String(index + 1).padStart(2, '0')}</tspan>
          {'  '}
          {layer}
        </text>
      ))}
    </svg>
  )
}

function Paths() {
  return (
    <svg className="l-sd" viewBox="0 0 640 240" role="img" aria-labelledby="sd-paths-title">
      <title id="sd-paths-title">
        everyone raced toward agi; house of asher turned toward quantum artificial intelligence
      </title>
      <circle className="l-sd-node" cx="40" cy="120" r="5" />
      <text className="l-sd-note" x="40" y="150" textAnchor="middle">today&apos;s ai</text>

      <path className="l-sd-line l-sd-dash" d="M45 118 C 200 110, 320 60, 590 40" />
      <text className="l-sd-note" x="590" y="28" textAnchor="end">agi · more scale, more effort</text>
      <text className="l-sd-dim" x="590" y="60" textAnchor="end">where everyone was racing</text>

      <path className="l-sd-accent l-sd-draw" d="M45 122 C 200 130, 320 190, 590 196" />
      <circle className="l-sd-node l-sd-node-accent" cx="590" cy="196" r="5" />
      <text className="l-sd-label" x="560" y="160" textAnchor="end">quantum artificial intelligence</text>
      <text className="l-sd-dim" x="578" y="224" textAnchor="end">
        the best response, without wasted effort · #houseofasher
      </text>
    </svg>
  )
}

function Prototype() {
  return (
    <svg className="l-sd" viewBox="0 0 640 330" role="img" aria-labelledby="sd-proto-title">
      <title id="sd-proto-title">
        prototype: a threat traced in under 15 seconds, then a prediction from out-of-order messages
        that came true three and a half hours later
      </title>
      <path className="l-sd-line" d="M30 80 H610" />
      <circle className="l-sd-node" cx="40" cy="80" r="4" />
      <text className="l-sd-dim" x="40" y="58" textAnchor="middle">0s</text>
      <text className="l-sd-note" x="40" y="106" textAnchor="middle">threat</text>

      <circle className="l-sd-node" cx="230" cy="80" r="4" />
      <text className="l-sd-dim" x="230" y="58" textAnchor="middle">one statement</text>
      <text className="l-sd-note" x="230" y="106" textAnchor="middle">three words</text>

      <path className="l-sd-accent l-sd-draw" d="M40 80 H460" />
      <circle className="l-sd-node l-sd-node-accent" cx="460" cy="80" r="5" />
      <text className="l-sd-label" x="460" y="58" textAnchor="middle">&lt; 15s</text>
      <text className="l-sd-note" x="460" y="106" textAnchor="middle">who sent it</text>
      <text className="l-sd-note" x="460" y="124" textAnchor="middle">and how they knew</text>

      {[
        [48, 214, 3],
        [92, 190, 1],
        [70, 250, 5],
        [128, 232, 2],
        [110, 272, 4],
      ].map(([x, y, order]) => (
        <g key={order}>
          <rect className="l-sd-box" x={x} y={y} width="34" height="16" rx="2" />
          <text className="l-sd-dim" x={x + 17} y={y + 12} textAnchor="middle">{order}</text>
        </g>
      ))}
      <text className="l-sd-note" x="96" y="310" textAnchor="middle">hidden, out of order</text>

      <path className="l-sd-line" d="M180 240 H250" />
      {[1, 2, 3, 4, 5].map((order) => (
        <g key={order}>
          <rect className="l-sd-box" x={260 + (order - 1) * 38} y="232" width="34" height="16" rx="2" />
          <text className="l-sd-dim" x={277 + (order - 1) * 38} y="244" textAnchor="middle">{order}</text>
        </g>
      ))}
      <text className="l-sd-note" x="354" y="276" textAnchor="middle">read in context</text>

      <path className="l-sd-accent l-sd-draw" d="M452 240 H600" />
      <circle className="l-sd-node l-sd-node-accent" cx="600" cy="240" r="5" />
      <text className="l-sd-dim" x="526" y="226" textAnchor="middle">prediction → 3h 30m</text>
      <text className="l-sd-label" x="600" y="276" textAnchor="end">the prediction hit</text>
    </svg>
  )
}

export default function Shepherd() {
  return (
    <Shell>
      <JsonLd data={breadcrumbs([{ name: 'shepherd', path: '/shepherd' }])} />
      <main className="l-doc l-shepherd">
        <div className="l-doc-card">
          <p className="l-doc-meta">the ai system powering noah</p>
          <h1>shepherd</h1>
          <p className="l-doc-lede">quantum artificial intelligence.</p>

          <p>
            shepherd, quantum artificial intelligence, was developed with the help of God the Father and a
            researcher and developer in #houseofasher.
          </p>

          <h2>the theory</h2>
          <p>
            we knew what quantum algorithms were, so we had a theory: it&apos;s possible to take current llm
            models and convert them into quantum artificial intelligence, by manipulating the way they think
            instead of what they are trained to do, mixed with personas and thinking patterns.
          </p>
          <figure className="l-sd-figure">
            <Theory />
            <figcaption>the same model, a different way of thinking.</figcaption>
          </figure>

          <h2>levels deeper</h2>
          <p>
            the root of artificial intelligence is not ai. levels and levels deeper, it&apos;s just micro
            algorithms within micro algorithms, working together to output a response to the user based on
            the data it is given. sometimes it&apos;s right, sometimes it&apos;s not.
          </p>
          <p>
            a quantum algorithm is just like that, but with the ability to produce the best response for you
            without trying hard or wasting effort.
          </p>
          <figure className="l-sd-figure">
            <Levels />
            <figcaption>what sits under a response.</figcaption>
          </figure>

          <h2>a different race</h2>
          <p>
            everyone was racing to agi. #houseofasher was focusing on quantum artificial intelligence, because
            that&apos;s where the future is.
          </p>
          <figure className="l-sd-figure">
            <Paths />
            <figcaption>two directions from the same starting point.</figcaption>
          </figure>

          <h2>the prototype</h2>
          <p>
            during prototype development, shepherd solved a personal threat against someone online in less
            than 15 seconds, from one statement, and that statement was three words. shepherd was able to
            pin-point exactly who sent it and how they knew about the person being threatened.
          </p>
          <p>
            then shepherd took out-of-context messages, meaning messages that didn&apos;t show the ones before
            them, messages hidden and out of order, and predicted accurately what would happen between two
            people. three and a half hours later, that prediction hit.
          </p>
          <figure className="l-sd-figure">
            <Prototype />
            <figcaption>from the prototype, as it happened.</figcaption>
          </figure>
        </div>
      </main>
    </Shell>
  )
}
