import { describe, expect, it } from 'vitest'
import { contrastRatio, hexToOklch, oklchToHex } from './color'

describe('contrastRatio (WCAG 2)', () => {
  it('gives 21:1 for black on white, the maximum possible', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 2)
  })

  it('gives 1:1 for a color against itself', () => {
    expect(contrastRatio('#247ba0', '#247ba0')).toBeCloseTo(1, 2)
  })

  it('does not depend on argument order', () => {
    expect(contrastRatio('#ffffff', '#247ba0')).toBeCloseTo(
      contrastRatio('#247ba0', '#ffffff'),
      5,
    )
  })

  it('measures the brand blue on white as 4.76:1 (ADR 0025)', () => {
    expect(contrastRatio('#247ba0', '#ffffff')).toBeCloseTo(4.76, 2)
  })

  it('measures the brand gray on white as 4.25:1, below AA (ADR 0026)', () => {
    expect(contrastRatio('#717c89', '#ffffff')).toBeCloseTo(4.25, 2)
  })
})

describe('OKLCH conversion', () => {
  it('reads the brand blue as lightness 54.9 %, hue ~231', () => {
    const { l, h } = hexToOklch('#247ba0')
    expect(l).toBeCloseTo(0.549, 3)
    expect(h).toBeCloseTo(231.1, 1)
  })

  it('reads a pure gray as zero chroma', () => {
    expect(hexToOklch('#1c1c1c').c).toBeCloseTo(0, 3)
  })

  it('converts a hex to OKLCH and back to the same hex', () => {
    for (const hex of ['#247ba0', '#2f0147', '#717c89', '#1c1c1c', '#f1f2ee']) {
      expect(oklchToHex(hexToOklch(hex))).toBe(hex)
    }
  })

  it('keeps out-of-gamut colors displayable by lowering chroma, not shifting hue', () => {
    // Very light and very saturated: impossible in sRGB.
    const hex = oklchToHex({ l: 0.95, c: 0.3, h: 231 })
    const back = hexToOklch(hex)
    expect(back.l).toBeCloseTo(0.95, 2)
    expect(back.c).toBeLessThan(0.3)
    // Rounding to 8-bit hex moves the hue by a degree or two at most.
    expect(Math.abs(back.h - 231)).toBeLessThan(3)
  })
})
