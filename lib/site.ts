/** The one origin search engines should know noah's site by. */
export const CANONICAL_ORIGIN = 'https://noah.asherin.com'

// Canonical links, the sitemap and social cards always name the production
// domain, even on preview deployments, so a preview URL can never become the
// canonical. NEXT_PUBLIC_APP_URL is honoured only by `next dev`, for trying
// the metadata against a local origin.
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL
  if (configured && process.env.NODE_ENV === 'development') return configured.replace(/\/$/, '')
  return CANONICAL_ORIGIN
}

export const SITE_URL = resolveSiteUrl()

export const LINKS = {
  discord: 'https://discord.gg/M9hnebRwvk',
  asherin: 'https://asherin.com/',
  source: 'https://github.com/shep95/noah',
  instagram: 'https://www.instagram.com/asher_united/',
  twitter: 'https://x.com/house_ofasher',
}

export type Installer = {
  platform: 'windows' | 'linux' | 'mac'
  label: string
  file: string
  format: string
  size: string
  /** What the installer runs on, shown under the download button. */
  requirement: string
  sha256: string
}

/** The published release, matching `version` in public/downloads/latest.json. */
export const RELEASE_VERSION = '2026.9.25'

// Only installers that exist in public/downloads are listed.
export const INSTALLERS: Installer[] = [
  {
    platform: 'windows',
    label: 'Windows 10 and 11 (64-bit)',
    file: 'noah-windows-x86_64.exe',
    format: 'installer (.exe)',
    size: '72 MB',
    requirement: 'windows 10+',
    sha256: 'b83d355291b79405307557441f41ec166fc2ac99e64e2f52c679952536734c74',
  },
  {
    platform: 'linux',
    label: 'Debian, Ubuntu, Mint, Pop!_OS (64-bit)',
    file: 'noah-linux-amd64.deb',
    format: 'package (.deb)',
    size: '83 MB',
    requirement: 'ubuntu 22.04+ / debian 12+',
    sha256: '7277bb1c5819787089c30a3d003025f456faff7ee917ac1ce48cc9a843b70504',
  },
  {
    platform: 'linux',
    label: 'Any other Linux (x86_64)',
    file: 'noah-linux-x86_64.tar.xz',
    format: 'archive (.tar.xz)',
    size: '83 MB',
    requirement: 'x86_64 linux',
    sha256: '9b458ade85ffb48804b856153c03a9b1ef020aaa18b760fe234d83c341af73c1',
  },
]

/** The search-result description: kept under ~160 characters so it isn't cut. */
export const DESCRIPTION =
  'noah is a free ai code editor for windows and linux. shepherd, its agent, reads your whole project first. nearly fifty providers on your own key, or local models.'

/** The longer account, for structured data and share cards. */
export const LONG_DESCRIPTION =
  'noah is a free ai code editor for windows and linux, built on zed. shepherd, its agent, reads your whole project before it writes, searches the web when it has to, and reasons as deeply as you ask. bring your own key for nearly fifty providers, western and chinese, or run models locally. no account, no paywall, no telemetry.'

export const RELEASE_DATE = releaseDate(RELEASE_VERSION)

/** `2026.9.25` names the day it shipped. */
function releaseDate(version: string): Date {
  const [year, month, day] = version.split('.').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

/** What noah does, for the SoftwareApplication feature list. */
export const FEATURES = [
  'shepherd, an agent that reads your whole project before it writes',
  'web search and adjustable reasoning levels',
  'nearly fifty bring-your-own-key ai providers, western and chinese, plus local models',
  'api keys kept in the system keychain',
  'asherin.chat, for thinking with shepherd outside a project',
  'asherin.pages, for pdfs, digital books and slideshows',
  'asherin.eye, a live 3d globe intelligence console you can extend',
  'a device security room: security checks, health, a system-wide ad blocker and a duplicate-file cleaner',
  'a browser room shared with shepherd',
  'chat history with pinning',
  'ed25519-signed automatic updates',
  'a trust layer: evidence, provenance, secret redaction and prompt-injection screening',
  'a sandbox for the commands shepherd runs',
  'wallpapers the interface takes its palette from',
]

/** Where the wallpaper picker remembers the visitor's choice. */
export const WALLPAPER_STORAGE_KEY = 'noah-wallpaper'

// Wallpapers with a hand-made look in app/landing.css: its own palette, type
// and layout. Any other image in public/wallpapers gets a palette sampled
// from the image and keeps the fog look's type and layout.
export const THEMED_LOOKS = ['fog', 'glitch', 'halo', 'lights', 'meteor', 'rings', 'sea'] as const
