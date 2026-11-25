<script setup lang="ts">
import { loginSchema } from '@ecf/shared'
import type { LoginData, LoginInput } from '@ecf/shared'
import type { FormSubmitEvent } from '@nuxt/ui'

const state = defineModel<LoginInput>({ required: true })

defineProps<{
  loading: boolean
  /** Shown in an alert above the form; empty means no alert. */
  errorMessage?: string
}>()

const emit = defineEmits<{
  submit: [data: LoginData]
  demo: []
}>()

function onSubmit(event: FormSubmitEvent<LoginData>) {
  emit('submit', event.data)
}
</script>

<template>
  <UCard variant="subtle" class="w-full max-w-100">
    <div class="flex flex-col gap-6 p-2">
      <header class="flex flex-col gap-2">
        <span class="text-lg font-bold text-highlighted">FacturaRD</span>
        <h1 class="text-2xl font-semibold text-highlighted">Iniciar sesión</h1>
        <p class="text-sm text-muted">
          Entra para emitir y revisar tus facturas electrónicas.
        </p>
      </header>

      <UAlert
        v-if="errorMessage"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
        :title="errorMessage"
        role="alert"
      />

      <!-- Only the "Entrar" button shows loading; the fields stay editable. -->
      <UForm
        :schema="loginSchema"
        :state="state"
        :loading-auto="false"
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <UFormField name="email" label="Correo">
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="email"
            placeholder="tu@correo.com"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <UFormField name="password" label="Contraseña">
          <UInput
            v-model="state.password"
            type="password"
            autocomplete="current-password"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <UButton
          type="submit"
          label="Entrar"
          :loading="loading"
          size="xl"
          block
        />
      </UForm>

      <div class="flex flex-col gap-3">
        <USeparator label="o" />
        <UButton
          type="button"
          label="Entrar como demo"
          color="neutral"
          variant="outline"
          size="xl"
          block
          @click="emit('demo')"
        />
        <p class="text-center text-sm text-muted">
          Rellena el formulario con una cuenta de prueba.
        </p>
      </div>
    </div>
  </UCard>
</template>
