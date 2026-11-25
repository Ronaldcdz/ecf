<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
import { useSessionStore } from '../stores/session'

// App shell (T6, S1–S5): approved in the "FacturaRD — Layout" canvas (T2).
// `UDashboardGroup storage="cookie"`: the collapsed state is read on the server,
// so a reload keeps it without a flash (ADR 0038).
// The base layer only knows the routes; each feature layer owns its page.
// `aria-label`: a collapsed item shows only its icon, so the label must stay readable
// for screen readers and keyboard users (S1).
const items: NavigationMenuItem[] = [
  { label: 'Facturas', 'aria-label': 'Facturas', icon: 'i-lucide-receipt-text', to: '/facturas' },
  { label: 'Clientes', 'aria-label': 'Clientes', icon: 'i-lucide-users', to: '/clientes' },
  { label: 'Servicios', 'aria-label': 'Servicios', icon: 'i-lucide-briefcase-business', to: '/servicios' },
]

const session = useSessionStore()

// The user is `null` only before signing in. T7 moves this area to the sidebar footer (ADR 0072).
const userName = computed(() => session.user?.name ?? '')
const userMenu = computed<DropdownMenuItem[]>(() => [{ label: userName.value, type: 'label' }])

// Each page sets `definePageMeta({ title })`; the header shows it.
const route = useRoute()
const title = computed(() => (typeof route.meta.title === 'string' ? route.meta.title : ''))
</script>

<template>
  <UDashboardGroup storage="cookie" unit="rem">
    <UDashboardSidebar
      id="main"
      collapsible
      :default-size="16"
    >
      <template #header="{ collapsed }">
        <span class="font-semibold text-highlighted">{{ collapsed ? 'F' : 'FacturaRD' }}</span>
      </template>

      <template #default="{ collapsed }">
        <!-- `tooltip`: a collapsed item shows its label on hover or focus (S2). -->
        <!-- Active item: `text-highlighted`, because `text-primary` on `bg-elevated` fails AA in light mode (L4). -->
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          :collapsed="collapsed"
          tooltip
          :ui="{ link: 'data-active:text-highlighted' }"
        />
      </template>
    </UDashboardSidebar>

    <UDashboardPanel id="content">
      <template #header>
        <!-- The navbar's ≡ toggle opens the sidebar as a slideover below `lg` (S3, ADR 0039). -->
        <UDashboardNavbar :title="title">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #right>
            <span class="truncate text-sm text-muted">{{ session.activeCompany?.name }}</span>
            <UColorModeButton />
            <UDropdownMenu :items="userMenu">
              <UButton
                :label="userName"
                icon="i-lucide-circle-user"
                color="neutral"
                variant="ghost"
                :ui="{ label: 'hidden sm:inline' }"
                :aria-label="userName"
              />
            </UDropdownMenu>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
