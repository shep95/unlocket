import type { Metadata } from 'next'
import Link from 'next/link'
import Shell from '@/components/landing/Shell'

export const metadata: Metadata = {
  title: 'Questions about noah and shepherd',
  description:
    'Is noah free? Does it need an account? Which AI models does it use, can they run locally, and where does your code go? Straight answers about the noah code editor.',
  alternates: { canonical: '/faq' },
}

// Each answer is written once and used both on the page and in the FAQPage
// structured data, so the two can never disagree.
const QUESTIONS: { question: string; answer: string }[] = [
  {
    question: 'Is noah free?',
    answer:
      'Yes. noah costs nothing and has no paid tier, no trial and no paywall. Hosted AI models are billed by their provider under your own key; local models cost nothing.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'No. There is no sign-up, no email and no login. Download it, open it, and start.',
  },
  {
    question: 'What is shepherd?',
    answer:
      "shepherd is noah's built-in AI agent. It reads your project before it writes, works through research, planning and development, and keeps building and testing until the work holds up. It can edit files, run commands you approve, and search the web.",
  },
  {
    question: 'Which AI models can I use?',
    answer:
      'noah comes set up for Venice AI (Qwen3 235B, DeepSeek R1, Llama and more) with your own Venice key. It also works with OpenAI-compatible providers and with local models through Ollama, LM Studio or llama.cpp.',
  },
  {
    question: 'Can I run models locally, offline?',
    answer:
      'Yes. Point noah at a model served by Ollama, LM Studio or llama.cpp on your machine. The only limit is your hardware: whatever your memory can hold, from 7B to 405B.',
  },
  {
    question: 'Where does my code go?',
    answer:
      'Your projects stay on your machine. noah keeps no records of them and collects no telemetry. When you use a hosted model, your prompt and the code you include go straight to that provider under your key; noah is not a middleman.',
  },
  {
    question: 'Does shepherd search the web?',
    answer:
      'Yes, without an account or key. Searches go to DuckDuckGo, noah asks you before each one, and the sources are listed under the answer.',
  },
  {
    question: 'How is noah related to Zed?',
    answer:
      'noah is built on Zed, the open-source editor, under its GPL-3.0 license. It keeps Zed’s speed and native rendering, removes the account and cloud features, and adds shepherd, Venice and the wallpaper-driven interface.',
  },
  {
    question: 'Which systems does it run on?',
    answer:
      'Windows 10 and 11, and 64-bit Linux (a .deb for Debian and Ubuntu family systems, and a .tar.xz for every other distribution). macOS follows on the download page when its build is ready.',
  },
  {
    question: 'Windows says it protected my PC. Is the installer safe?',
    answer:
      'The installer is not code-signed yet, so SmartScreen does not recognise it. Choose More info, then Run anyway. You can check the file against the SHA-256 on the download page first.',
  },
]

export default function FaqPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QUESTIONS.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="l-doc">
        <div className="l-doc-card">
          <p className="l-doc-meta">questions</p>
          <h1>Straight answers</h1>
          <p className="l-doc-lede">
            Anything else, ask in the <a href="https://discord.gg/M9hnebRwvk">discord</a>. Ready to try it?{' '}
            <Link href="/download">Download noah</Link>.
          </p>
          {QUESTIONS.map(({ question, answer }) => (
            <section key={question} className="l-faq-item">
              <h2>{question}</h2>
              <p>{answer}</p>
            </section>
          ))}
        </div>
      </main>
    </Shell>
  )
}
