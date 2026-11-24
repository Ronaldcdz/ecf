export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  css: ['#layers/base/app/assets/css/main.css'],
  // Dark by default; the user's choice is saved (ADR 0046, S6).
  colorMode: { preference: 'dark' },
})
