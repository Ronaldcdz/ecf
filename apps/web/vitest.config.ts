import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Let tests read CSS files as text (`?raw`); Vitest empties CSS imports by default.
    css: true,
  },
})
