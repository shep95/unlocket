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
    size: '81 MB',
    sha256: '5da509a57b98f2d01dceb3198eb516cc7bece61910baa953ca97c5787eade7e4',
  },
  {
    platform: 'linux',
    label: 'Debian, Ubuntu, Mint, Pop!_OS (64-bit)',
    file: 'noah-linux-amd64.deb',
    format: 'package (.deb)',
    size: '90 MB',
    sha256: '1689353d4daa1534e29fc7ac045b3ba0fce42c8d41d94e325e34f7a66c9d5dc2',
  },
  {
    platform: 'linux',
    label: 'Any other Linux (x86_64)',
    file: 'noah-linux-x86_64.tar.xz',
    format: 'archive (.tar.xz)',
    size: '77 MB',
    sha256: '0ec0f533e2153d8c1f5b438ce555cdd8f90a8f6c732c6b12e9b0952d3ccfc370',
  },
]

export const DESCRIPTION =
  'noah is a free AI code editor for Windows and Linux. shepherd, its built-in agent, reads your whole project before it writes. Bring a Venice API key or run local models. No account, no paywall, no telemetry.'
