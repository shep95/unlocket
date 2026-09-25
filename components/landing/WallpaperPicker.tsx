'use client'

import { useEffect, useRef, useState } from 'react'

export type Wallpaper = { name: string; src: string }

type Look = {
  /** the one warm light: the download button and verified accents */
  accent: string
  /** rgb of the fog laid over the photo */
  fog: string
  /** how the photo itself is graded so it sits well under the text */
  filter: string
}

// Hand-tuned grades for the wallpapers noah ships with. Anything else gets a
// look sampled from the image itself.
const LOOKS: Record<string, Look> = {
  fog: { accent: '#5f8a58', fog: '5, 8, 6', filter: 'none' },
  rings: { accent: '#8e949c', fog: '4, 4, 5', filter: 'grayscale(1) contrast(1.08) brightness(0.9)' },
  sea: { accent: '#9a8f80', fog: '10, 9, 8', filter: 'sepia(0.15) contrast(0.95) brightness(0.82)' },
  halo: { accent: '#a8834a', fog: '6, 5, 3', filter: 'contrast(1.1) saturate(1.1) brightness(0.95)' },
  glitch: { accent: '#7d8a90', fog: '6, 7, 8', filter: 'grayscale(0.9) contrast(1.05) brightness(0.85)' },
  lights: { accent: '#b39a6b', fog: '6, 5, 4', filter: 'contrast(1.05) brightness(0.85) saturate(0.9)' },
}

const STORAGE_KEY = 'noah-wallpaper'

function sampleLook(src: string): Promise<Look> {
  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 32
      canvas.height = 20
      const context = canvas.getContext('2d')
      if (!context) return resolve(LOOKS.fog)
      context.drawImage(image, 0, 0, 32, 20)
      const pixels = context.getImageData(0, 0, 32, 20).data
      let red = 0
      let green = 0
      let blue = 0
      for (let index = 0; index < pixels.length; index += 4) {
        red += pixels[index]
        green += pixels[index + 1]
        blue += pixels[index + 2]
      }
      const count = pixels.length / 4
      const [r, g, b] = [red / count, green / count, blue / count]
      // Lift the image's own hue to a muted mid tone for the accent, and
      // sink it almost to black for the fog.
      const lift = (value: number) => Math.round(90 + (value / 255) * 80)
      const sink = (value: number) => Math.round((value / 255) * 14)
      resolve({
        accent: `rgb(${lift(r)}, ${lift(g)}, ${lift(b)})`,
        fog: `${sink(r)}, ${sink(g)}, ${sink(b)}`,
        filter: 'contrast(1.05) brightness(0.88)',
      })
    }
    image.onerror = () => resolve(LOOKS.fog)
    image.src = src
  })
}

async function apply(wallpaper: Wallpaper) {
  const root = document.querySelector<HTMLElement>('.landing')
  if (!root) return
  const look = LOOKS[wallpaper.name] ?? (await sampleLook(wallpaper.src))
  root.style.setProperty('--l-wall-image', `url('${wallpaper.src}')`)
  root.style.setProperty('--l-wall-filter', look.filter)
  root.style.setProperty('--l-fog', look.fog)
  root.style.setProperty('--l-accent', look.accent)
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  )
}

export default function WallpaperPicker({ wallpapers }: { wallpapers: Wallpaper[] }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('fog')
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let saved: string | null = null
    try {
      saved = window.localStorage.getItem(STORAGE_KEY)
    } catch {
      saved = null
    }
    const chosen = wallpapers.find((wallpaper) => wallpaper.name === saved)
    if (chosen) {
      setCurrent(chosen.name)
      void apply(chosen)
    }
  }, [wallpapers])

  useEffect(() => {
    if (!open) return
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === 'Escape') setOpen(false)
        return
      }
      if (panel.current && !panel.current.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', close)
    window.addEventListener('keydown', close)
    return () => {
      window.removeEventListener('mousedown', close)
      window.removeEventListener('keydown', close)
    }
  }, [open])

  const choose = (wallpaper: Wallpaper) => {
    setCurrent(wallpaper.name)
    void apply(wallpaper)
    try {
      window.localStorage.setItem(STORAGE_KEY, wallpaper.name)
    } catch {
      // Private windows can refuse storage; the choice still applies now.
    }
  }

  return (
    <div className="l-wall-picker" ref={panel}>
      {open && (
        <div className="l-wall-panel" role="dialog" aria-label="choose a wallpaper">
          <p className="l-wall-title">wallpaper</p>
          <div className="l-wall-grid">
            {wallpapers.map((wallpaper) => (
              <button
                key={wallpaper.name}
                type="button"
                className={`l-wall-option${wallpaper.name === current ? ' is-current' : ''}`}
                onClick={() => choose(wallpaper)}
                aria-pressed={wallpaper.name === current}
                aria-label={wallpaper.name}
                style={{ backgroundImage: `url('${wallpaper.src}')` }}
              >
                <span>{wallpaper.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        className="l-wall-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="wallpaper settings"
      >
        <SettingsIcon />
      </button>
    </div>
  )
}
