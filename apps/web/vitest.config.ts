import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Unit tests only. `*.spec.ts` files in `layers/*/e2e/` belong to Playwright (ADR 0060).
    include: ['**/*.test.ts'],
    // Let tests read CSS files as text (`?raw`); Vitest empties CSS imports by default.
    css: true,
  },
})
