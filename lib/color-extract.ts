// Extract a usable editor palette from any image URL using canvas sampling.
// Returns CSS color strings derived from the image's actual pixel data.

export interface ImagePalette {
  bgBase: string
  bgSurface: string
  bgElevated: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  accent: string
  border: string
}

interface RGB { r: number; g: number; b: number }

function toHex({ r, g, b }: RGB): string {
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
      .join('')
  )
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  }
}

function luminance({ r, g, b }: RGB): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

// Sample image at thumbnail size, segment into dark/mid/light buckets
async function sampleImage(url: string): Promise<{ dark: RGB; mid: RGB; light: RGB; dominant: RGB }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      const SIZE = 80
      const canvas = document.createElement('canvas')
      canvas.width = SIZE
      canvas.height = SIZE
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('no canvas context'))
        return
      }

      ctx.drawImage(img, 0, 0, SIZE, SIZE)
      const { data } = ctx.getImageData(0, 0, SIZE, SIZE)

      const darkBucket: RGB[] = []
      const midBucket: RGB[] = []
      const lightBucket: RGB[] = []
      let rSum = 0, gSum = 0, bSum = 0, count = 0

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3]
        if (a < 128) continue // skip transparent
        const lum = luminance({ r, g, b })
        rSum += r; gSum += g; bSum += b; count++

        if (lum < 60) darkBucket.push({ r, g, b })
        else if (lum < 160) midBucket.push({ r, g, b })
        else lightBucket.push({ r, g, b })
      }

      const avg = (bucket: RGB[]): RGB => {
        if (!bucket.length) return { r: 0, g: 0, b: 0 }
        const total = bucket.reduce((a, c) => ({ r: a.r + c.r, g: a.g + c.g, b: a.b + c.b }))
        return { r: total.r / bucket.length, g: total.g / bucket.length, b: total.b / bucket.length }
      }

      resolve({
        dark: avg(darkBucket.length ? darkBucket : [{ r: rSum / count, g: gSum / count, b: bSum / count }]),
        mid: avg(midBucket.length ? midBucket : [{ r: rSum / count, g: gSum / count, b: bSum / count }]),
        light: avg(lightBucket.length ? lightBucket : [{ r: 200, g: 210, b: 200 }]),
        dominant: { r: rSum / count, g: gSum / count, b: bSum / count },
      })
    }

    img.onerror = () => reject(new Error('failed to load image'))
    img.src = url
  })
}

// Derive a legible, coherent editor palette from sampled pixel data.
// Strategy:
//  - bg family: derived from dark bucket, pushed very dark (editor needs near-black bg)
//  - text family: derived from light bucket, pulled toward neutral-light
//  - accent: derived from mid bucket, desaturated toward the image's hue
//  - border: between bg and accent
export async function extractPaletteFromImage(url: string): Promise<ImagePalette> {
  const { dark, mid, light, dominant } = await sampleImage(url)

  // Push bg to near-black while keeping image hue tint
  const bgBase: RGB = {
    r: clamp(dark.r * 0.3, 4, 18),
    g: clamp(dark.g * 0.35, 5, 22),
    b: clamp(dark.b * 0.3, 4, 18),
  }
  const bgSurface: RGB = {
    r: clamp(bgBase.r * 1.7, 8, 25),
    g: clamp(bgBase.g * 1.7, 9, 28),
    b: clamp(bgBase.b * 1.7, 8, 25),
  }
  const bgElevated: RGB = {
    r: clamp(bgSurface.r * 1.4, 12, 32),
    g: clamp(bgSurface.g * 1.4, 13, 36),
    b: clamp(bgSurface.b * 1.4, 12, 32),
  }

  // Text: pull from light bucket toward neutral so it's always readable
  const neutral: RGB = { r: 196, g: 210, b: 196 }
  const textPrimary = mix(light, neutral, 0.5)
  textPrimary.r = clamp(textPrimary.r, 170, 220)
  textPrimary.g = clamp(textPrimary.g, 180, 228)
  textPrimary.b = clamp(textPrimary.b, 170, 220)

  const textSecondary: RGB = {
    r: clamp(textPrimary.r * 0.55, 80, 140),
    g: clamp(textPrimary.g * 0.58, 85, 145),
    b: clamp(textPrimary.b * 0.55, 80, 140),
  }
  const textMuted: RGB = {
    r: clamp(textPrimary.r * 0.32, 40, 90),
    g: clamp(textPrimary.g * 0.34, 45, 95),
    b: clamp(textPrimary.b * 0.32, 40, 90),
  }

  // Accent: from mid bucket, moderate brightness, keep image hue
  const accentTarget: RGB = {
    r: clamp(mid.r * 0.5, 30, 90),
    g: clamp(mid.g * 0.7, 50, 130),
    b: clamp(mid.b * 0.5, 30, 90),
  }
  // Ensure accent is lighter than bg but darker than text
  const accentLum = luminance(accentTarget)
  const scale = accentLum < 20 ? 80 / Math.max(accentLum, 1) : 1
  const accent: RGB = {
    r: clamp(accentTarget.r * scale, 30, 120),
    g: clamp(accentTarget.g * scale, 40, 140),
    b: clamp(accentTarget.b * scale, 30, 120),
  }

  const border: RGB = {
    r: clamp((bgElevated.r + accent.r) * 0.5, 18, 60),
    g: clamp((bgElevated.g + accent.g) * 0.5, 20, 65),
    b: clamp((bgElevated.b + accent.b) * 0.5, 18, 60),
  }

  return {
    bgBase: toHex(bgBase),
    bgSurface: toHex(bgSurface),
    bgElevated: toHex(bgElevated),
    textPrimary: toHex(textPrimary),
    textSecondary: toHex(textSecondary),
    textMuted: toHex(textMuted),
    accent: toHex(accent),
    border: toHex(border),
  }
}

// Apply a palette as CSS custom properties on :root.
// Falls back to the default Shepherd palette if palette is null.
export function applyPalette(palette: ImagePalette | null): void {
  const root = document.documentElement
  if (!palette) {
    // Reset to defaults
    root.style.removeProperty('--color-bg-base')
    root.style.removeProperty('--color-bg-surface')
    root.style.removeProperty('--color-bg-elevated')
    root.style.removeProperty('--color-text-primary')
    root.style.removeProperty('--color-text-secondary')
    root.style.removeProperty('--color-text-muted')
    root.style.removeProperty('--color-accent')
    root.style.removeProperty('--color-border')
    return
  }
  root.style.setProperty('--color-bg-base', palette.bgBase)
  root.style.setProperty('--color-bg-surface', palette.bgSurface)
  root.style.setProperty('--color-bg-elevated', palette.bgElevated)
  root.style.setProperty('--color-text-primary', palette.textPrimary)
  root.style.setProperty('--color-text-secondary', palette.textSecondary)
  root.style.setProperty('--color-text-muted', palette.textMuted)
  root.style.setProperty('--color-accent', palette.accent)
  root.style.setProperty('--color-border', palette.border)
}
