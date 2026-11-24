<script setup lang="ts">
// `/` has no content of its own: Facturas is the main page (S7, ADR 0043).
// `redirect` works on the server (first load) and in client navigation.
definePageMeta({ redirect: '/facturas' })
</script>

<template>
  <div />
</template>
