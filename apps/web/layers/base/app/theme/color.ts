/**
 * Color math for the design tokens: hex <-> OKLCH conversion and WCAG contrast.
 * Used by the palette generator and the theme tests, not at runtime.
 *
 * Sources:
 * - OKLab / OKLCH: Björn Ottosson, "A perceptual color space for image processing"
 *   (https://bottosson.github.io/posts/oklab/).
 * - Contrast: WCAG 2.2, definitions of "relative luminance" and "contrast ratio"
 *   (https://www.w3.org/TR/WCAG22/#dfn-relative-luminance).
 */

/** l: perceived lightness 0-1; c: chroma (0 = gray); h: hue angle in degrees. */
export interface Oklch {
  l: number
  c: number
  h: number
}

type Rgb = [number, number, number]

/** sRGB channel (0-1) -> linear light. */
function toLinear(channel: number): number {
  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4
}

/** Linear light -> sRGB channel (0-1). */
function fromLinear(channel: number): number {
  return channel <= 0.0031308
    ? channel * 12.92
    : 1.055 * channel ** (1 / 2.4) - 0.055
}

function hexToLinearRgb(hex: string): Rgb {
  const value = Number.parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((byte) =>
    toLinear(byte / 255),
  ) as Rgb
}

function linearRgbToHex(rgb: Rgb): string {
  return `#${rgb
    .map((channel) => {
      const byte = Math.round(
        fromLinear(Math.min(1, Math.max(0, channel))) * 255,
      )
      return byte.toString(16).padStart(2, '0')
    })
    .join('')}`
}

function oklchToLinearRgb({ l, c, h }: Oklch): Rgb {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const lms = [
    (l + 0.3963377774 * a + 0.2158037573 * b) ** 3,
    (l - 0.1055613458 * a - 0.0638541728 * b) ** 3,
    (l - 0.0894841775 * a - 1.291485548 * b) ** 3,
  ] as const
  return [
    4.0767416621 * lms[0] - 3.3077115913 * lms[1] + 0.2309699292 * lms[2],
    -1.2684380046 * lms[0] + 2.6097574011 * lms[1] - 0.3413193965 * lms[2],
    -0.0041960863 * lms[0] - 0.7034186147 * lms[1] + 1.707614701 * lms[2],
  ]
}

export function hexToOklch(hex: string): Oklch {
  const [r, g, b] = hexToLinearRgb(hex)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const bAxis = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return {
    l: lightness,
    c: Math.hypot(a, bAxis),
    h: ((Math.atan2(bAxis, a) * 180) / Math.PI + 360) % 360,
  }
}

const inGamut = (rgb: Rgb): boolean =>
  rgb.every((channel) => channel >= -1e-6 && channel <= 1 + 1e-6)

/**
 * OKLCH -> hex. Some OKLCH colors (very light or dark and very saturated) do not exist
 * in sRGB; for those, chroma is lowered until the color fits, so lightness and hue stay.
 */
export function oklchToHex(color: Oklch): string {
  let chroma = color.c
  let rgb = oklchToLinearRgb(color)
  while (!inGamut(rgb) && chroma > 0) {
    chroma = Math.max(0, chroma - 0.001)
    rgb = oklchToLinearRgb({ ...color, c: chroma })
  }
  return linearRgbToHex(rgb)
}

/** WCAG relative luminance: how much light a color emits, 0 (black) to 1 (white). */
function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToLinearRgb(hex)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio, from 1 (same color) to 21 (black on white). Order does not matter. */
export function contrastRatio(first: string, second: string): number {
  const [lighter, darker] = [
    relativeLuminance(first),
    relativeLuminance(second),
  ].sort((x, y) => y - x) as [number, number]
  return (lighter + 0.05) / (darker + 0.05)
}
