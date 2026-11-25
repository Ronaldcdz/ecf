import type { LoginResponse } from '@ecf/shared'
import { createAuth } from '../auth/create-auth'
import { requestLogin } from '../auth/login-request'
import { SESSION_COOKIE } from '../auth/session-cookie'

export function useAuth() {
  const store = useSessionStore()
  const cookie = useCookie<LoginResponse | null>(SESSION_COOKIE, {
    default: () => null,
    sameSite: 'lax',
    // No `maxAge`: the cookie lasts until the browser closes (ADR 0076).
  })

  const auth = createAuth({
    request: requestLogin,
    cookie: {
      read: () => cookie.value,
      write: (session) => {
        cookie.value = session
      },
      clear: () => {
        cookie.value = null
      },
    },
    store,
  })

  return { ...auth, isLoggedIn: computed(() => store.isSignedIn) }
}
