import type { Metadata } from 'next'
import Download from '@/components/landing/Download'
import Shell from '@/components/landing/Shell'
import { HOME_TITLE, pageMetadata } from '@/lib/seo'
import { dictionary } from '@/lib/i18n'
import { currentLanguage } from '@/lib/language'

export function generateMetadata(): Metadata {
  const language = currentLanguage()
  return pageMetadata({
    path: '/',
    title: HOME_TITLE,
    description: dictionary(language).home.description,
    absoluteTitle: true,
    language,
    translated: true,
  })
}

const MODELS = [
  { name: 'anthropic · claude', local: false },
  { name: 'deepseek · r1', local: false },
  { name: 'llama 3.3 70b', local: true },
  { name: 'qwen 2.5 coder 32b · q4', local: true },
]

const RESULTS = [
  { title: 'spawn_blocking in tokio::task', url: 'docs.rs/tokio' },
  { title: 'Bridging with sync code', url: 'tokio.rs/tokio/topics' },
  { title: 'When should you use spawn_blocking?', url: 'users.rust-lang.org' },
]

/** Feature titles break where the translator broke them. */
function Lines({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  )
}

export default function Home() {
  const language = currentLanguage()
  const t = dictionary(language)
  const [readsFirst, yourModels, yourImage, looksOutward] = t.features
  return (
    <Shell>
        <main>
          <section className="l-hero">
            <div className="l-hero-identity">
              <h1 className="l-hero-title">noah</h1>
              <p className="l-hero-sub">
                <span className="l-hero-claim">{t.hero.claim}</span>{' '}
                <span className="l-hero-proof">{t.hero.proof}</span>
              </p>
            </div>
            <div className="l-hero-cta">
              <Download language={language} t={t.download} />
            </div>
          </section>

          <div className="l-glass" id="features">
            <div className="l-feature-row l-reveal">
              <div className="l-feature-copy">
                <p className="l-feat-num">01 / 05</p>
                <h2 className="l-feat-title"><Lines text={readsFirst.title} /></h2>
                <p className="l-feat-body">{readsFirst.body}</p>
              </div>
              <div className="l-feature-visual" aria-hidden>
                <div className="l-code-block">
                  <div className="l-c-comment">{'// scanning project structure'}</div>
                  <div style={{ marginTop: 12 }}><span className="l-c-arrow">→</span> <span className="l-c-label">src/components/</span></div>
                  <div><span className="l-c-arrow">→</span> <span className="l-c-label">naming convention</span>&nbsp;&nbsp;<span className="l-c-val">camelCase</span></div>
                  <div><span className="l-c-arrow">→</span> <span className="l-c-label">pattern</span>&nbsp;&nbsp;<span className="l-c-val">functional + hooks</span></div>
                  <div><span className="l-c-arrow">→</span> <span className="l-c-label">style layer</span>&nbsp;&nbsp;<span className="l-c-val">css modules</span></div>
                  <div><span className="l-c-arrow">→</span> <span className="l-c-label">test runner</span>&nbsp;&nbsp;<span className="l-c-val">vitest</span></div>
                  <div style={{ marginTop: 18 }} className="l-c-comment">{'// writing in your voice'}</div>
                  <div style={{ marginTop: 8 }} className="l-c-base">const <span className="l-c-val">useAuthState</span> = () =&gt; {'{'}</div>
                  <div className="l-c-base l-indent-1">const [user, setUser] = <span className="l-c-val">useState</span>(null)</div>
                  <div className="l-c-base l-indent-1"><span className="l-c-val">useEffect</span>(() =&gt; {'{'}</div>
                  <div className="l-c-base l-indent-2"><span className="l-c-val">checkSession</span>().then(setUser)</div>
                  <div className="l-c-base l-indent-1">{'}'}, [])</div>
                  <div className="l-c-base">{'}'}</div>
                </div>
              </div>
            </div>

            <div className="l-feature-row l-reverse l-reveal" id="models">
              <div className="l-feature-visual" aria-hidden>
                <div className="l-stack">
                  <div className="l-panel-label">{t.panels.connected}</div>
                  {MODELS.map((model) => (
                    <div key={model.name} className="l-row l-model-row">
                      <span className="l-model-name">{model.name}</span>
                      <span className={`l-badge ${model.local ? 'l-badge-local' : 'l-badge-key'}`}>
                        {model.local ? t.panels.local : t.panels.yourKey}
                      </span>
                    </div>
                  ))}
                  <p className="l-panel-note">{t.panels.nothingMetered}</p>
                </div>
              </div>
              <div className="l-feature-copy">
                <p className="l-feat-num">02 / 05</p>
                <h2 className="l-feat-title"><Lines text={yourModels.title} /></h2>
                <p className="l-feat-body">{yourModels.body}</p>
              </div>
            </div>

            <div className="l-feature-row l-reveal">
              <div className="l-feature-copy">
                <p className="l-feat-num">03 / 05</p>
                <h2 className="l-feat-title"><Lines text={yourImage.title} /></h2>
                <p className="l-feat-body">{yourImage.body}</p>
              </div>
              <div className="l-feature-visual" aria-hidden>
                <div className="l-editor-mock">
                  <div className="l-editor-bar">
                    <div className="l-dot l-dot-r" />
                    <div className="l-dot l-dot-y" />
                    <div className="l-dot l-dot-g" />
                    <span className="l-editor-filename">auth.ts</span>
                  </div>
                  <div className="l-editor-body">
                    <div><span className="l-ed-kw">export async function</span> <span className="l-ed-fn">validateToken</span><span className="l-ed-dim">(</span></div>
                    <div className="l-indent-1"><span className="l-ed-dim">token: string</span></div>
                    <div><span className="l-ed-dim">): Promise&lt;</span><span className="l-ed-kw">User | null</span><span className="l-ed-dim">&gt; {'{'}</span></div>
                    <div className="l-indent-1"><span className="l-ed-dim">const payload = await</span></div>
                    <div className="l-indent-2"><span className="l-ed-call">verify</span><span className="l-ed-dim">(token, secret)</span></div>
                    <div className="l-indent-1"><span className="l-ed-kw">if</span><span className="l-ed-dim"> (!payload) </span><span className="l-ed-kw">return</span><span className="l-ed-dim"> null</span></div>
                    <div className="l-indent-1"><span className="l-ed-kw">return</span> <span className="l-ed-call">findUser</span><span className="l-ed-dim">(payload.sub)</span></div>
                    <div><span className="l-ed-dim">{'}'}</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="l-feature-row l-reverse l-reveal">
              <div className="l-feature-visual" aria-hidden>
                <div className="l-stack">
                  <div className="l-panel-label">{t.panels.webSearch}</div>
                  <div className="l-search-query">tokio spawn_blocking vs spawn</div>
                  {RESULTS.map((result) => (
                    <div key={result.url} className="l-row">
                      <div className="l-result-title">{result.title}</div>
                      <div className="l-result-url">{result.url}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="l-feature-copy">
                <p className="l-feat-num">04 / 05</p>
                <h2 className="l-feat-title"><Lines text={looksOutward.title} /></h2>
                <p className="l-feat-body">{looksOutward.body}</p>
              </div>
            </div>
          </div>

          <section className="l-privacy l-reveal" id="privacy">
            <p className="l-feat-num">05 / 05</p>
            <h2 className="l-priv-title">{t.privacy.title}</h2>
            <p className="l-priv-body">{t.privacy.body}</p>
            <div className="l-stats">
              <div className="l-stat"><div className="l-stat-num">0</div><div className="l-stat-label">{t.privacy.accounts}</div></div>
              <div className="l-stat-divider" />
              <div className="l-stat"><div className="l-stat-num">0</div><div className="l-stat-label">{t.privacy.telemetry}</div></div>
              <div className="l-stat-divider" />
              <div className="l-stat"><div className="l-stat-num">∞</div><div className="l-stat-label">{t.privacy.localModels}</div></div>
              <div className="l-stat-divider" />
              <div className="l-stat"><div className="l-stat-num">0</div><div className="l-stat-label">{t.privacy.paywalls}</div></div>
            </div>
          </section>

          <section className="l-cta" id="download">
            <p className="l-cta-eyebrow">{t.cta.eyebrow}</p>
            <h2 className="l-cta-title"><span>{t.cta.lineOne}</span><span>{t.cta.lineTwo}</span></h2>
            <Download language={language} t={t.download} />
          </section>
        </main>
    </Shell>
  )
}
