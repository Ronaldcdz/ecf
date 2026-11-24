// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    strict: true,
    // Typecheck the Playwright files too (paths are relative to `.nuxt/`).
    nodeTsConfig: {
      compilerOptions: { types: ['node'] },
      include: ['../playwright.config.ts', '../playwright/**/*', '../layers/*/e2e/**/*'],
    },
  },
})
