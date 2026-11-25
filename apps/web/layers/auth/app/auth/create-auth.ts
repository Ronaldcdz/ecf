// The browser pieces (`request`, `cookie`, `store`) are passed in, so tests use small fakes.
import { loginResponseSchema } from '@ecf/shared'
import type { LoginInput, LoginResponse } from '@ecf/shared'

export interface AuthDependencies {
  request: (credentials: LoginInput) => Promise<LoginResponse>
  cookie: {
    read: () => unknown
    write: (session: LoginResponse) => void
    clear: () => void
  }
  store: {
    signIn: (session: LoginResponse) => void
    signOut: () => void
  }
}

export function createAuth({ request, cookie, store }: AuthDependencies) {
  return {
    async login(credentials: LoginInput): Promise<void> {
      const session = await request(credentials)
      cookie.write(session)
      store.signIn(session)
    },

    logout(): void {
      cookie.clear()
      store.signOut()
    },

    restore(): void {
      const saved = cookie.read()
      if (saved === null || saved === undefined) {
        store.signOut()
        return
      }

      // A cookie that is not a valid session counts as signed out and is removed (ADR 0075).
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
