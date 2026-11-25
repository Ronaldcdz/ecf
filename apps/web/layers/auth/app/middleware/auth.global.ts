import { guardRoute } from '../auth/route-guard'

// Runs on every navigation. A page opts out with `definePageMeta({ public: true })` (ADR 0084).
export default defineNuxtRouteMiddleware((to) => {
  const decision = guardRoute({
    path: to.path,
    fullPath: to.fullPath,
    isPublic: to.meta.public === true,
    isLoggedIn: useSessionStore().isSignedIn,
  })

  if (decision) return navigateTo(decision)
})
