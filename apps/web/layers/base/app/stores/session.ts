import type { LoginResponse } from '@ecf/shared'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface SessionUser {
  name: string
}

export interface SessionCompany {
  name: string
}

// Starts signed out; the `auth` layer calls `signIn` and `signOut` (ADR 0075).
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
