import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SessionUser {
  name: string
}

export interface SessionCompany {
  name: string
}

/**
 * Global session state: the signed-in user and the active company (S9, ADR 0045).
 * Until the Login story, both hold fixed mock values approved in the layout design.
 */
export const useSessionStore = defineStore('session', () => {
  const user = ref<SessionUser>({ name: 'Ana Pérez' })
  const activeCompany = ref<SessionCompany>({ name: 'Comercial Ejemplo SRL' })

  return { user, activeCompany }
})
