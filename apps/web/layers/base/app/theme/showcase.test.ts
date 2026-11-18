import { describe, expect, it } from 'vitest'
import { BRAND_PALETTES, STEPS } from './palette'
import { FONT_WEIGHTS, formatSampleAmount, paletteShowcase } from './showcase'

// Executable spec for the data behind the /design page (S4, ADR 0022).
describe('/design page data (S4)', () => {
  it('shows every brand palette, in the order of ADR 0028', () => {
    expect(paletteShowcase().map((palette) => palette.name)).toEqual([
      'brand-blue',
      'brand-purple',
      'brand-gray',
    ])
  })

  it('shows the 11 steps of each palette, from 50 to 950', () => {
    for (const palette of paletteShowcase()) {
      expect(palette.swatches.map((swatch) => swatch.step)).toEqual([...STEPS])
    }
  })

  it('reads each swatch from its CSS token, so the page shows what the app really uses', () => {
    const blue600 = paletteShowcase()[0]?.swatches.find((swatch) => swatch.step === 600)
    expect(blue600).toEqual({
      step: 600,
      hex: '#247ba0',
      cssVar: 'var(--color-brand-blue-600)',
    })
  })

  it('shows the hex of the generator next to each swatch', () => {
    for (const palette of paletteShowcase()) {
      for (const swatch of palette.swatches) {
        expect(swatch.hex).toBe(BRAND_PALETTES[palette.name][swatch.step])
      }
    }
  })

  it('shows the Work Sans weights that @nuxt/fonts loads by default (400 to 700)', () => {
    expect(FONT_WEIGHTS.map((weight) => weight.value)).toEqual([400, 500, 600, 700])
  })

  it.each([
    [0, 'RD$0.00'],
    [7.5, 'RD$7.50'],
    [1234567.5, 'RD$1,234,567.50'],
  ])('formats the sample amount %d as "%s"', (value, expected) => {
    expect(formatSampleAmount(value)).toBe(expected)
  })
})
