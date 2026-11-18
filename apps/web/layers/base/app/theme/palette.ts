/**
 * Generates the brand palettes (11 steps, 50-950) from the brand colors in ADR 0018.
 * The method is explained in `docs/sistema-de-diseno.md`, section 3:
 *
 * 1. Keep the hue of the brand color fixed.
 * 2. Give each step the lightness of the same step in Tailwind's palettes
 *    (`tailwindcss/theme.css`, v4.3): `blue` for colors, `neutral` for the gray.
 * 3. Lower the chroma towards both ends, following the shape of Tailwind's `blue`,
 *    because very light or very dark colors cannot hold much color.
 * 4. Put each brand hex, unchanged, on the step whose lightness is closest.
 *
 * `main.css` holds the output; `theme.test.ts` fails if both ever differ.
 */
import { hexToOklch, oklchToHex } from './color'

export const STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const
export type Step = (typeof STEPS)[number]
type PerStep = Record<Step, number>

/** OKLCH lightness of Tailwind's `blue` (for chromatic colors). */
const TAILWIND_BLUE_LIGHTNESS: PerStep = {
  50: 0.97,
  100: 0.932,
  200: 0.882,
  300: 0.809,
  400: 0.707,
  500: 0.623,
  600: 0.546,
  700: 0.488,
  800: 0.424,
  900: 0.379,
  950: 0.282,
}

/** OKLCH lightness of Tailwind's `neutral` (for grays). */
const TAILWIND_NEUTRAL_LIGHTNESS: PerStep = {
  50: 0.985,
  100: 0.97,
  200: 0.922,
  300: 0.87,
  400: 0.708,
  500: 0.556,
  600: 0.439,
  700: 0.371,
  800: 0.269,
  900: 0.205,
  950: 0.145,
}

/** Tailwind `blue` chroma per step divided by its peak (0.245): 1 = full color. */
const CHROMA_SHAPE: PerStep = {
  50: 0.057,
  100: 0.131,
  200: 0.241,
  300: 0.429,
  400: 0.673,
  500: 0.873,
  600: 1,
  700: 0.992,
  800: 0.812,
  900: 0.596,
  950: 0.371,
}

interface ScaleSpec {
  /** The main brand color: gives the hue and the peak chroma. */
  base: string
  lightness: PerStep
  /** Brand hexes kept unchanged on their step. */
  anchors: Partial<Record<Step, string>>
}

export function buildScale({
  base,
  lightness,
  anchors,
}: ScaleSpec): Record<Step, string> {
  // The base chroma is the peak. Deriving the peak from the anchor step instead would
  // turn the purple (anchored at 950, where little chroma is expected) into neon.
  const { c: peakChroma, h } = hexToOklch(base)
  return Object.fromEntries(
    STEPS.map((step) => [
      step,
      anchors[step] ??
        oklchToHex({
          l: lightness[step],
          c: peakChroma * CHROMA_SHAPE[step],
          h,
        }),
    ]),
  ) as Record<Step, string>
}

/** Brand palettes, named as in ADR 0028. */
export const BRAND_PALETTES = {
  // #247ba0: lightness 54.9 % -> step 600 (Tailwind blue-600 = 54.6 %).
  'brand-blue': buildScale({
    base: '#247ba0',
    lightness: TAILWIND_BLUE_LIGHTNESS,
    anchors: { 600: '#247ba0' },
  }),
  // #2f0147: lightness 23.7 % -> step 950 (darker than Tailwind blue-950 = 28.2 %).
  'brand-purple': buildScale({
    base: '#2f0147',
    lightness: TAILWIND_BLUE_LIGHTNESS,
    anchors: { 950: '#2f0147' },
  }),
  // #717c89 (58.2 %) -> 500; #f1f2ee (95.9 %) -> 100; #1c1c1c (22.6 %) -> 900.
  'brand-gray': buildScale({
    base: '#717c89',
    lightness: TAILWIND_NEUTRAL_LIGHTNESS,
    anchors: { 100: '#f1f2ee', 500: '#717c89', 900: '#1c1c1c' },
  }),
} as const
