import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import Shell from '@/components/landing/Shell'
import { INSTALLERS, RELEASE_VERSION, type Installer } from '@/lib/site'
import { breadcrumbs, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/download',
  title: 'download noah for windows and linux',
  description: `download noah ${RELEASE_VERSION}, the free ai code editor with shepherd. an installer for windows 10 and 11, a .deb and a .tar.xz for linux. mac is coming soon.`,
})

function Steps({ installer }: { installer: Installer }) {
  switch (installer.platform) {
    case 'windows':
      return (
        <>
          <ol>
            <li>
              If your browser says the file &ldquo;may be dangerous&rdquo; or &ldquo;isn&rsquo;t commonly
              downloaded&rdquo;, open the downloads list and choose <strong>Keep</strong>. Browsers warn about
              any new, unsigned program; the SHA-256 below lets you confirm the file is the one published here.
            </li>
            <li>Open the downloaded <code>{installer.file}</code>.</li>
            <li>
              If Windows shows &ldquo;Windows protected your PC&rdquo;, choose <strong>More info</strong>, then{' '}
              <strong>Run anyway</strong>. The installer is not code-signed yet, so SmartScreen does not
              recognise it.
            </li>
            <li>
              It installs for your user only (no administrator prompt) into{' '}
              <code>%LOCALAPPDATA%\Programs\noah</code>, adds Start menu and desktop shortcuts, and opens noah.
            </li>
          </ol>
          <p>To remove it: Settings → Apps → Installed apps → noah → Uninstall.</p>
        </>
      )
    case 'linux':
      return installer.file.endsWith('.deb') ? (
        <ol>
          <li>Open the downloaded <code>{installer.file}</code>; your software center installs it.</li>
          <li>
            Or from a terminal: <code>sudo apt install ./{installer.file}</code>
          </li>
          <li>Start noah from your app launcher, or run <code>noah</code>.</li>
        </ol>
      ) : (
        <ol>
          <li>
            Extract it: <code>tar -xf {installer.file}</code>
          </li>
          <li>
            Install for your user: <code>./noah.app/install.sh</code>
          </li>
          <li>Start noah from your app launcher, or run <code>noah</code>. Remove it with <code>~/.local/noah.app/install.sh --uninstall</code>.</li>
        </ol>
      )
    case 'mac':
      return null
  }
}

export default function DownloadPage() {
  const hasLinux = INSTALLERS.some((installer) => installer.platform === 'linux')

  return (
    <Shell>
      <JsonLd data={breadcrumbs([{ name: 'download', path: '/download' }])} />
      <main className="l-doc">
        <div className="l-doc-card">
          <p className="l-doc-meta">free · no account · no telemetry</p>
          <h1>Download noah</h1>
          <p className="l-doc-lede">
            The editor and shepherd, its agent, in one install. After it opens, add a Venice API key or
            point it at a local model and start.
          </p>

          {INSTALLERS.map((installer) => (
            <section key={installer.file} className="l-installer">
              <div className="l-installer-head">
                <div>
                  <div className="l-installer-name">{installer.label}</div>
                  <div className="l-installer-meta">
                    {installer.format} · {installer.size}
                  </div>
                </div>
                <a className="l-btn-primary" href={`/downloads/${installer.file}`} download>
                  download
                </a>
              </div>
              <Steps installer={installer} />
              <p className="l-installer-sum">
                SHA-256: <code>{installer.sha256}</code>
              </p>
            </section>
          ))}

          <h2>macOS{hasLinux ? '' : ' and Linux'}</h2>
          <p>
            Coming soon. {hasLinux ? 'The macOS build' : 'These builds'} will appear here the moment {hasLinux ? 'it is' : 'they are'} ready.
          </p>

          <h2>Check your download</h2>
          <p>
            Compare the file&apos;s SHA-256 with the value above. On Windows, in PowerShell:{' '}
            <code>Get-FileHash .\noah-windows-x86_64.exe</code>. On Linux: <code>sha256sum &lt;file&gt;</code>.
          </p>

          <h2>What it needs</h2>
          <ul>
            <li>Windows 10 (version 1607 or later) or Windows 11, 64-bit, with a DirectX 11 graphics driver.</li>
            <li>Linux on x86-64 with a Vulkan graphics driver.</li>
            <li>An internet connection for hosted models and web search. Local models run offline.</li>
          </ul>
        </div>
      </main>
    </Shell>
  )
}
