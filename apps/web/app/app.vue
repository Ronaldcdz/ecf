<script setup lang="ts">
import { es } from '@nuxt/ui/locale'

// Spanish labels for Nuxt UI's built-in buttons ("Colapsar barra lateral", "Cambiar a modo claro").
useHead({ htmlAttrs: { lang: es.code } })
</script>

<template>
  <UApp :locale="es">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
