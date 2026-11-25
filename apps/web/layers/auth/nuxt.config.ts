// "auth" feature layer (ADR 0044): the simulated login, the session cookie and, later, route protection.
export default defineNuxtConfig({
  // `zod` reaches the app through `@ecf/shared`. Pre-bundling it stops Vite from finding it late
  // in dev and reloading the page, which would make E2E tests flaky.
  vite: { optimizeDeps: { include: ['@ecf/shared > zod'] } },
})
