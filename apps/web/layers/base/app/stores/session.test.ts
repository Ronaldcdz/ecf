/**
 * Session store with mock data (S9, ADR 0045). Until the Login story, the session
 * is fixed: the user and company approved in the layout design (T2).
 */
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSessionStore } from './session'

describe('useSessionStore', () => {
  beforeEach(() => {
    // A fresh Pinia per test, so no test sees state left by another one.
    setActivePinia(createPinia())
  })

  it('starts with the mock user "Ana Pérez"', () => {
    const session = useSessionStore()

    expect(session.user).toEqual({ name: 'Ana Pérez' })
  })

  it('starts with the mock active company "Comercial Ejemplo SRL"', () => {
    const session = useSessionStore()

    expect(session.activeCompany).toEqual({ name: 'Comercial Ejemplo SRL' })
  })

  it('returns the same state everywhere it is used', () => {
    expect(useSessionStore()).toBe(useSessionStore())
  })
})
