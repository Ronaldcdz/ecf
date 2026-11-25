/**
 * The session flow: login, logout and restoring the session after a reload
 * (S3, S7, ADR 0069, 0075, 0076). The browser pieces (cookie, store, HTTP) are
 * replaced by small fakes, so each rule is tested on its own.
 */
import { describe, expect, it } from 'vitest'
import { AuthError } from './login-request'
import { createAuth } from './create-auth'

const credentials = { email: 'demo@facturard.do', password: 'demo1234' }
const session = {
  user: { name: 'Ana Pérez' },
  company: { name: 'Comercial Ejemplo SRL' },
}

function setup(
  options: { cookie?: unknown; request?: () => Promise<typeof session> } = {},
) {
  const state = {
    cookie: options.cookie ?? null,
    store: null as typeof session | null,
  }
  const auth = createAuth({
    request: options.request ?? (() => Promise.resolve(session)),
    cookie: {
      read: () => state.cookie,
      write: (value) => {
        state.cookie = value
      },
      clear: () => {
        state.cookie = null
      },
    },
    store: {
      signIn: (value) => {
        state.store = value
      },
      signOut: () => {
        state.store = null
      },
    },
  })
  return { auth, state }
}

describe('login', () => {
  it('keeps the session in the cookie and in the store', async () => {
    const { auth, state } = setup()

    await auth.login(credentials)

    expect(state.cookie).toEqual(session)
    expect(state.store).toEqual(session)
  })

  it('keeps nothing when the credentials are wrong, and passes the error on', async () => {
    const failure = new AuthError(
      'invalid-credentials',
      'Correo o contraseña incorrectos.',
    )
    const { auth, state } = setup({ request: () => Promise.reject(failure) })

    await expect(auth.login(credentials)).rejects.toBe(failure)

    expect(state.cookie).toBeNull()
    expect(state.store).toBeNull()
  })
})

describe('logout', () => {
  it('clears the cookie and the store', async () => {
    const { auth, state } = setup()
    await auth.login(credentials)

    auth.logout()

    expect(state.cookie).toBeNull()
    expect(state.store).toBeNull()
  })
})

describe('restore (after a reload)', () => {
  it('fills the store from the session in the cookie', () => {
    const { auth, state } = setup({ cookie: session })

    auth.restore()

    expect(state.store).toEqual(session)
  })

  it('leaves the store empty when there is no cookie', () => {
    const { auth, state } = setup()

    auth.restore()

    expect(state.store).toBeNull()
  })

  it('treats a cookie that does not match the session format as signed out, and removes it', () => {
    const { auth, state } = setup({ cookie: { user: 'Ana' } })

    auth.restore()

    expect(state.store).toBeNull()
    expect(state.cookie).toBeNull()
  })
})
