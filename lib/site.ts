// The deployed origin, used for canonical links, the sitemap and social cards.
// Set NEXT_PUBLIC_APP_URL once a custom domain exists; until then the host's
// own production domain is used so search engines never see a dead origin.
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL
  if (configured) return configured.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`
  const railway = process.env.RAILWAY_PUBLIC_DOMAIN
  if (railway) return `https://${railway}`
  return 'https://unlocket.vercel.app'
}

export const SITE_URL = resolveSiteUrl()

export const LINKS = {
  discord: 'https://discord.gg/M9hnebRwvk',
  asherin: 'https://asherin.com/',
  source: 'https://github.com/shep95/noah',
}

export type Installer = {
  platform: 'windows' | 'linux' | 'mac'
  label: string
  file: string
  format: string
  size: string
  sha256: string
}

// Only installers that exist in public/downloads are listed.
export const INSTALLERS: Installer[] = [
  {
    platform: 'windows',
    label: 'Windows 10 and 11 (64-bit)',
    file: 'noah-windows-x86_64.exe',
    format: 'installer (.exe)',
    size: '88 MB',
    sha256: 'cc0ec55f19375aa4c2d58ffa280097dad8a6d2e2ef787ff3bf2bc13b8788e35a',
  },
  {
    platform: 'linux',
    label: 'Debian, Ubuntu, Mint, Pop!_OS (64-bit)',
    file: 'noah-linux-amd64.deb',
    format: 'package (.deb)',
    size: '83 MB',
    sha256: 'bacccc7d83d9ba7002fb9cb1a96d15e308fb21b85ab2bad41a0bb7d28c60cf33',
  },
  {
    platform: 'linux',
    label: 'Any other Linux (x86_64)',
    file: 'noah-linux-x86_64.tar.xz',
    format: 'archive (.tar.xz)',
    size: '83 MB',
    sha256: '0a2360bf14db4d0fde57d6883a54108be7d8c4469c4230504bfe43126dbc3131',
  },
]

export const DESCRIPTION =
  'noah is a free AI code editor for Windows and Linux. shepherd, its built-in agent, reads your whole project before it writes. Bring a Venice API key or run local models. No account, no paywall, no telemetry.'
