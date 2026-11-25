import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // `layers/*/e2e/` belongs to Playwright (ADR 0060); Vitest keeps its default file patterns.
    exclude: [...configDefaults.exclude, 'layers/*/e2e/**'],
    // Let tests read CSS files as text (`?raw`); Vitest empties CSS imports by default.
    css: true,
  },
})
