<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import {
  FONT_WEIGHTS,
  formatSampleAmount,
  paletteShowcase,
} from '../theme/showcase'

// /design: live showcase of the design tokens (S4, ADR 0022). Public in production,
// so every value here is sample data.
useHead({ title: 'Sistema de diseño' })

const palettes = paletteShowcase()
const semanticColors = useAppConfig().ui.colors

// Classes written in full so Tailwind finds them (ADR 0036: semantic names only).
const textTokens = [
  { name: 'text-highlighted', className: 'text-highlighted' },
  { name: 'text-default', className: 'text-default' },
  { name: 'text-toned', className: 'text-toned' },
  { name: 'text-muted', className: 'text-muted' },
  { name: 'text-dimmed', className: 'text-dimmed' },
]

const backgroundTokens = [
  { name: 'bg-default', className: 'bg-default text-default' },
  { name: 'bg-muted', className: 'bg-muted text-default' },
  { name: 'bg-elevated', className: 'bg-elevated text-default' },
  { name: 'bg-accented', className: 'bg-accented text-default' },
  { name: 'bg-inverted', className: 'bg-inverted text-inverted' },
]

const statusColors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
  'neutral',
] as const

const sampleAmounts = [1.1, 1111.11, 250, 98765.4]

interface SampleRow {
  ncf: string
  client: string
  total: number
}

const rows: SampleRow[] = [
  { ncf: 'E310000000001', client: 'Cliente de ejemplo A', total: 1180 },
  { ncf: 'E310000000002', client: 'Cliente de ejemplo B', total: 25370.5 },
  { ncf: 'E320000000001', client: 'Cliente de ejemplo C', total: 99.99 },
]

const columns: TableColumn<SampleRow>[] = [
  { accessorKey: 'ncf', header: 'e-NCF' },
  { accessorKey: 'client', header: 'Cliente' },
  { accessorKey: 'total', header: 'Total' },
]

const serviceOptions = ['Consultoría', 'Mantenimiento', 'Soporte']
const service = ref('Consultoría')
const notify = ref(true)
</script>

<template>
  <UContainer class="flex flex-col gap-12 py-10">
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-highlighted">Sistema de diseño</h1>
        <p class="mt-2 text-muted">
          Tokens y componentes de la aplicación. Todos los datos son de ejemplo.
        </p>
      </div>
      <UColorModeSwitch aria-label="Cambiar entre modo claro y oscuro" />
    </header>

    <section aria-labelledby="colores" class="flex flex-col gap-6">
      <h2 id="colores" class="text-2xl font-semibold text-highlighted">Colores</h2>

      <div v-for="palette in palettes" :key="palette.name" class="flex flex-col gap-2">
        <h3 class="font-medium text-highlighted">{{ palette.name }}</h3>
        <ul class="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
          <li v-for="swatch in palette.swatches" :key="swatch.step">
            <div
              class="h-12 rounded-md border border-default"
              :style="{ backgroundColor: swatch.cssVar }"
            />
            <p class="mt-1 text-sm text-highlighted">{{ swatch.step }}</p>
            <p class="font-mono text-xs text-muted">{{ swatch.hex }}</p>
          </li>
        </ul>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="font-medium text-highlighted">Colores semánticos (app.config.ts)</h3>
        <dl class="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-4">
          <div v-for="(palette, semantic) in semanticColors" :key="semantic">
            <dt class="text-sm text-muted">{{ semantic }}</dt>
            <dd class="font-mono text-sm text-highlighted">{{ palette }}</dd>
          </div>
        </dl>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="flex flex-col gap-2">
          <h3 class="font-medium text-highlighted">Texto</h3>
          <p v-for="token in textTokens" :key="token.name" :class="token.className">
            {{ token.name }}: Factura enviada a la DGII
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="font-medium text-highlighted">Fondos</h3>
          <p
            v-for="token in backgroundTokens"
            :key="token.name"
            class="rounded-md border border-default p-3"
            :class="token.className"
          >
            {{ token.name }}
          </p>
        </div>
      </div>
    </section>

    <section aria-labelledby="tipografia" class="flex flex-col gap-4">
      <h2 id="tipografia" class="text-2xl font-semibold text-highlighted">Tipografía</h2>
      <p class="text-muted">Work Sans</p>
      <p
        v-for="weight in FONT_WEIGHTS"
        :key="weight.value"
        class="text-xl text-highlighted"
        :class="weight.className"
      >
        {{ weight.value }} {{ weight.label }}: Comprobante fiscal electrónico
      </p>
    </section>

    <section aria-labelledby="montos" class="flex flex-col gap-4">
      <h2 id="montos" class="text-2xl font-semibold text-highlighted">Montos</h2>
      <p class="text-muted">
        Con cifras tabulares (<code>tabular-nums</code>) cada dígito ocupa el mismo ancho
        y las columnas de montos quedan alineadas.
      </p>
      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 class="mb-2 font-medium text-highlighted">Con tabular-nums</h3>
          <p
            v-for="amount in sampleAmounts"
            :key="amount"
            class="text-right text-lg tabular-nums"
          >
            {{ formatSampleAmount(amount) }}
          </p>
        </div>
        <div>
          <h3 class="mb-2 font-medium text-highlighted">Sin tabular-nums</h3>
          <p v-for="amount in sampleAmounts" :key="amount" class="text-right text-lg">
            {{ formatSampleAmount(amount) }}
          </p>
        </div>
      </div>
    </section>

    <section aria-labelledby="componentes" class="flex flex-col gap-8">
      <h2 id="componentes" class="text-2xl font-semibold text-highlighted">Componentes</h2>

      <div class="flex flex-col gap-3">
        <h3 class="font-medium text-highlighted">Botones</h3>
        <div class="flex flex-wrap gap-2">
          <UButton v-for="color in statusColors" :key="color" :color="color">
            {{ color }}
          </UButton>
        </div>
        <div class="flex flex-wrap gap-2">
          <UButton variant="outline">Outline</UButton>
          <UButton variant="soft">Soft</UButton>
          <UButton variant="ghost">Ghost</UButton>
          <UButton loading>Cargando</UButton>
          <UButton disabled>Deshabilitado</UButton>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <h3 class="font-medium text-highlighted">Insignias y alertas</h3>
        <div class="flex flex-wrap gap-2">
          <UBadge color="success" variant="subtle">Aceptado</UBadge>
          <UBadge color="warning" variant="subtle">En proceso</UBadge>
          <UBadge color="error" variant="subtle">Rechazado</UBadge>
          <UBadge color="info" variant="subtle">Borrador</UBadge>
        </div>
        <UAlert
          color="success"
          variant="subtle"
          title="Factura enviada"
          description="La DGII recibió el comprobante de ejemplo."
        />
        <UAlert
          color="error"
          variant="subtle"
          title="No se pudo enviar"
          description="Ejemplo de mensaje de error."
        />
      </div>

      <div class="flex flex-col gap-3">
        <h3 class="font-medium text-highlighted">Formulario</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <UFormField label="RNC o cédula" help="9 u 11 dígitos">
            <UInput placeholder="101000000" class="w-full" />
          </UFormField>
          <UFormField label="Correo" error="Escribe un correo válido">
            <UInput model-value="cliente@" class="w-full" />
          </UFormField>
          <UFormField label="Servicio">
            <USelect v-model="service" :items="serviceOptions" class="w-full" />
          </UFormField>
          <UFormField label="Notificaciones">
            <USwitch v-model="notify" label="Enviar la factura por correo" />
          </UFormField>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <h3 class="font-medium text-highlighted">Tabla</h3>
        <UTable :data="rows" :columns="columns">
          <template #total-cell="{ row }">
            <span class="tabular-nums">{{ formatSampleAmount(row.original.total) }}</span>
          </template>
        </UTable>
      </div>

      <div class="flex flex-col gap-3">
        <h3 class="font-medium text-highlighted">Tarjeta y modal</h3>
        <UCard>
          <template #header>
            <p class="font-medium text-highlighted">Resumen de ejemplo</p>
          </template>
          <p class="text-muted">Contenido de una tarjeta.</p>
          <template #footer>
            <UModal title="Modal de ejemplo" description="Así se ve un diálogo.">
              <UButton variant="outline">Abrir modal</UButton>
              <template #body>
                <p class="text-default">Contenido del modal.</p>
              </template>
            </UModal>
          </template>
        </UCard>
      </div>
    </section>
  </UContainer>
</template>
