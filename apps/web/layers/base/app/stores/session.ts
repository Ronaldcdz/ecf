import type { LoginResponse } from '@ecf/shared'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface SessionUser {
  name: string
}

export interface SessionCompany {
  name: string
}

/**
 * Global session state: the signed-in user and the active company (S9, ADR 0045).
 * It starts signed out; `signIn` fills it with what the login answers (ADR 0075)
 * and `signOut` clears it. The `auth` layer decides when to call them.
 */
export const useSessionStore = defineStore('session', () => {
  const user = ref<SessionUser | null>(null)
  const activeCompany = ref<SessionCompany | null>(null)
  const isSignedIn = computed(() => user.value !== null)

  function signIn(session: LoginResponse) {
    user.value = session.user
    activeCompany.value = session.company
  }

  function signOut() {
    user.value = null
    activeCompany.value = null
  }

  return { user, activeCompany, isSignedIn, signIn, signOut }
})
