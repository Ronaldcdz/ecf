/**
 * The session flow: login, logout and restoring the session after a reload
 * (S3, S7; ADR 0069, 0075, 0076).
 *
 * The browser pieces arrive as arguments (`request`, `cookie`, `store`), so this logic
 * is tested with small fakes and `useAuth` only connects the real ones.
 */
import { loginResponseSchema } from '@ecf/shared'
import type { LoginInput, LoginResponse } from '@ecf/shared'

export interface AuthDependencies {
  /** Asks the server for the session of some credentials; throws an `AuthError`. */
  request: (credentials: LoginInput) => Promise<LoginResponse>
  /** The session cookie: lasts until the browser closes (ADR 0076). */
  cookie: {
    read: () => unknown
    write: (session: LoginResponse) => void
    clear: () => void
  }
  /** The Pinia session store. */
  store: {
    signIn: (session: LoginResponse) => void
    signOut: () => void
  }
}

export function createAuth({ request, cookie, store }: AuthDependencies) {
  return {
    /** Signs in and keeps the session in the cookie and the store. Nothing is kept if it fails. */
    async login(credentials: LoginInput): Promise<void> {
      const session = await request(credentials)
      cookie.write(session)
      store.signIn(session)
    },

    /** Clears the cookie and the store. */
    logout(): void {
      cookie.clear()
      store.signOut()
    },

    /**
     * Fills the store from the cookie (after a reload). A cookie that does not have
     * the session format counts as signed out and is removed (ADR 0075).
     */
    restore(): void {
      const saved = cookie.read()
      if (saved === null || saved === undefined) {
        store.signOut()
        return
      }

      const session = loginResponseSchema.safeParse(saved)
      if (session.success) {
        store.signIn(session.data)
      } else {
        cookie.clear()
        store.signOut()
      }
    },
  }
}
