/**
 * Session store (S9, ADR 0045). Since the Login story it starts signed out and is
 * filled by `signIn` with what the login answers (ADR 0075).
 */
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSessionStore } from './session'

const session = {
  user: { name: 'Ana Pérez' },
  company: { name: 'Comercial Ejemplo SRL' },
}

describe('useSessionStore', () => {
  beforeEach(() => {
    // A fresh Pinia per test, so no test sees state left by another one.
    setActivePinia(createPinia())
  })

  it('starts signed out: no user and no active company', () => {
    const store = useSessionStore()

    expect(store.user).toBeNull()
    expect(store.activeCompany).toBeNull()
    expect(store.isSignedIn).toBe(false)
  })

  it('signIn keeps the user and the company of the session', () => {
    const store = useSessionStore()

    store.signIn(session)

    expect(store.user).toEqual({ name: 'Ana Pérez' })
    expect(store.activeCompany).toEqual({ name: 'Comercial Ejemplo SRL' })
    expect(store.isSignedIn).toBe(true)
  })

  it('signOut clears them again', () => {
    const store = useSessionStore()
    store.signIn(session)

    store.signOut()

    expect(store.user).toBeNull()
    expect(store.activeCompany).toBeNull()
    expect(store.isSignedIn).toBe(false)
  })

  it('returns the same state everywhere it is used', () => {
    expect(useSessionStore()).toBe(useSessionStore())
  })
})
