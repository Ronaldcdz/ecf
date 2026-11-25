<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
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

// The user is `null` only before signing in.
const userName = computed(() => session.user?.name ?? '')

// The user area lives in the sidebar footer (S7, ADR 0072).
// The layout calls `useAuth` from the `auth` layer on purpose (ADR 0085): a documented
// exception to "a layer only uses what `base` exposes".
const { logout } = useAuth()
async function signOut() {
  logout()
  await navigateTo('/login')
}

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
      :ui="{ footer: 'border-t border-default' }"
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

      <!-- Expanded: avatar, name and a labelled button. Collapsed: avatar and an icon-only button. -->
      <template #footer="{ collapsed }">
        <div class="flex w-full flex-col gap-1">
          <div
            class="flex min-h-10 items-center gap-2.5"
            :class="collapsed ? 'justify-center' : 'px-3'"
          >
            <UAvatar
              :alt="userName"
              role="img"
              :aria-label="userName"
            />
            <span
              v-if="!collapsed"
              class="truncate text-sm font-medium text-default"
            >{{ userName }}</span>
          </div>

          <UTooltip
            text="Cerrar sesión"
            :disabled="!collapsed"
          >
            <UButton
              :label="collapsed ? undefined : 'Cerrar sesión'"
              aria-label="Cerrar sesión"
              icon="i-lucide-log-out"
              color="neutral"
              variant="ghost"
              :block="!collapsed"
              :class="collapsed ? 'justify-center' : 'justify-start'"
              @click="signOut"
            />
          </UTooltip>
        </div>
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
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
