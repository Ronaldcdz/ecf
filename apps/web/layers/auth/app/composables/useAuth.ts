import type { LoginResponse } from '@ecf/shared'
import { createAuth } from '../auth/create-auth'
import { requestLogin } from '../auth/login-request'
import { SESSION_COOKIE } from '../auth/session-cookie'

/**
 * Session of the app: sign in, sign out and know if someone is signed in.
 *
 * The session lives in a cookie with no expiry date, so it lasts until the browser
 * closes (ADR 0076). Pages and components use this composable and never call
 * `$fetch` themselves (CLAUDE.md).
 */
export function useAuth() {
  const store = useSessionStore()
  const cookie = useCookie<LoginResponse | null>(SESSION_COOKIE, {
    default: () => null,
    sameSite: 'lax',
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
