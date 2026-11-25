<script setup lang="ts">
import type { LoginData, LoginInput } from '@ecf/shared'
import { AuthError } from '../auth/login-request'
import { safeRedirect } from '../auth/route-guard'

// Its own page: no sidebar or header (ADR 0067). Public: no session needed (ADR 0084).
definePageMeta({ layout: false, public: true })
useHead({ title: 'Iniciar sesión' })

const auth = useAuth()
const route = useRoute()
const state = reactive<LoginInput>({ email: '', password: '' })
const loading = ref(false)
const errorMessage = ref('')

async function signIn(data: LoginData) {
  // The button is disabled while loading, but a submit can skip the button (`requestSubmit`).
  if (loading.value) return
  loading.value = true
  errorMessage.value = ''
  try {
    await auth.login(data)
    await navigateTo(safeRedirect(route.query.redirect))
  } catch (error) {
    errorMessage.value =
      error instanceof AuthError
        ? error.message
        : 'No pudimos iniciar sesión. Inténtalo de nuevo.'
  } finally {
    loading.value = false
  }
}

// "Entrar como demo" only fills the form; the visitor presses "Entrar" (ADR 0070).
function fillDemo() {
  state.email = DEMO_ACCOUNT.email
  state.password = DEMO_ACCOUNT.password
}
</script>

<template>
  <main class="flex min-h-dvh items-center justify-center p-4 sm:p-8">
    <LoginForm
      v-model="state"
      :loading="loading"
      :error-message="errorMessage"
      @submit="signIn"
      @demo="fillDemo"
    />
  </main>
</template>
