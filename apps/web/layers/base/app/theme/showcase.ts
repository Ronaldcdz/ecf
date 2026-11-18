/**
 * Data for the /design showcase page (S4, ADR 0022).
 *
 * Components may not use shade classes such as `bg-brand-blue-200` (ADR 0036), so the
 * page paints each swatch with an inline `background-color: var(--color-...)`. That is
 * the same CSS token Tailwind emits from `main.css` (`@theme static` emits all of them),
 * so the swatch shows what the app really uses, not a copy of it.
 */
import { BRAND_PALETTES, STEPS, type Step } from './palette'

export type PaletteName = keyof typeof BRAND_PALETTES

export interface Swatch {
  step: Step
  /** Hex from the generator in palette.ts; theme.test.ts keeps it equal to main.css. */
  hex: string
  /** The CSS token that paints the swatch. */
  cssVar: string
}

export interface PaletteShowcase {
  name: PaletteName
  swatches: Swatch[]
}

export function paletteShowcase(): PaletteShowcase[] {
  return (Object.keys(BRAND_PALETTES) as PaletteName[]).map((name) => ({
    name,
    swatches: STEPS.map((step) => ({
      step,
      hex: BRAND_PALETTES[name][step],
      cssVar: `var(--color-${name}-${step})`,
    })),
  }))
}

/**
 * Work Sans weights. @nuxt/fonts loads the range "400 700" by default
 * (@nuxt/fonts 0.14, `defaults.weights`); a weight outside it would be faked by the browser.
 * Each `className` is written in full so Tailwind can find it in the source.
 */
export const FONT_WEIGHTS = [
  { value: 400, label: 'Regular', className: 'font-normal' },
  { value: 500, label: 'Medium', className: 'font-medium' },
  { value: 600, label: 'Semibold', className: 'font-semibold' },
  { value: 700, label: 'Bold', className: 'font-bold' },
] as const

/**
 * Sample amounts only: the page is public (ADR 0022) and must not show real data.
 * The real money format for invoices is decided in the invoices story.
 */
const sampleAmountFormat = new Intl.NumberFormat('es-DO', {
  style: 'currency',
  currency: 'DOP',
})

export function formatSampleAmount(value: number): string {
  return sampleAmountFormat.format(value)
}
