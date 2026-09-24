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
    sha256: '3e86e5d77ec1497365a0138307a256f1908d9cf5272c551d5785364c0887f4a1',
  },
]

export const DESCRIPTION =
  'noah is a free AI code editor for Windows and Linux. shepherd, its built-in agent, reads your whole project before it writes. Bring a Venice API key or run local models. No account, no paywall, no telemetry.'
