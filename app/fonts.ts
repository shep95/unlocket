import {
  Bebas_Neue,
  Barlow,
  Cinzel,
  Cormorant_Garamond,
  Instrument_Serif,
  JetBrains_Mono,
  Jost,
  Libre_Baskerville,
  Lora,
  Manrope,
  Space_Grotesk,
  Syncopate,
} from 'next/font/google'

// The typefaces of the wallpaper looks. The default fog look keeps the
// system's Georgia, so nothing here is preloaded: every face is self-hosted
// under font-src 'self' and the browser only fetches the ones the chosen look
// actually uses.

const glitchDisplay = Space_Grotesk({ subsets: ['latin'], variable: '--font-glitch-display', preload: false })
const glitchMono = JetBrains_Mono({ subsets: ['latin'], style: ['normal'], variable: '--font-glitch-mono', preload: false })

const haloDisplay = Cinzel({ subsets: ['latin'], variable: '--font-halo-display', preload: false })
const haloBody = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-halo-body',
  preload: false,
})

const lightsDisplay = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-lights-display', preload: false })
const lightsBody = Barlow({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-lights-body', preload: false })

const meteorDisplay = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-meteor-display',
  preload: false,
})
const meteorBody = Jost({ subsets: ['latin'], style: ['normal'], variable: '--font-meteor-body', preload: false })

const ringsDisplay = Syncopate({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-rings-display', preload: false })
const ringsBody = Manrope({ subsets: ['latin'], variable: '--font-rings-body', preload: false })

const seaDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-sea-display',
  preload: false,
})
const seaBody = Lora({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-sea-body', preload: false })

/** Defines every look's font variables on <html>; app/landing.css picks them up per look. */
export const lookFontVariables = [
  glitchDisplay,
  glitchMono,
  haloDisplay,
  haloBody,
  lightsDisplay,
  lightsBody,
  meteorDisplay,
  meteorBody,
  ringsDisplay,
  ringsBody,
  seaDisplay,
  seaBody,
]
  .map((font) => font.variable)
  .join(' ')
