/**
 * App shell (T6 of `odd/tasks/layout-y-navegacion.md`, S1–S9).
 * Written RED first: each test names the spec or ADR it proves.
 * Button names come from Nuxt UI's Spanish locale (`es`).
 */
import type { Page } from '@playwright/test'
import { expect, test } from '@nuxt/test-utils/playwright'

const MENU = ['Facturas', 'Clientes', 'Servicios'] as const

/** Presses Tab until the link with `name` has focus; fails after `max` presses. */
async function tabTo(page: Page, name: string, max = 30) {
  const target = page.getByRole('link', { name, exact: true })
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab')
    if (await target.evaluate(el => el === document.activeElement)) return
  }
  throw new Error(`"${name}" never received focus after ${max} Tab presses`)
}

test.describe('desktop', () => {
  test('/ redirects to /facturas (S7, ADR 0043)', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })

    await expect(page).toHaveURL(/\/facturas$/)
    await expect(page.getByText('Aquí verás tus facturas')).toBeVisible()
  })

  test('menu shows Facturas, Clientes, Servicios in that order (S4)', async ({ page, goto }) => {
    await goto('/facturas', { waitUntil: 'hydration' })

    const nav = page.getByRole('navigation')
    await expect(nav.getByRole('link')).toHaveText([...MENU])
  })

  test('marks the active section (S1)', async ({ page, goto }) => {
    await goto('/clientes', { waitUntil: 'hydration' })

    await expect(page.getByRole('link', { name: 'Clientes', exact: true })).toHaveAttribute('aria-current', 'page')
    await expect(page.getByRole('link', { name: 'Facturas', exact: true })).not.toHaveAttribute('aria-current', 'page')
  })

  test('navigates with the keyboard only (S1)', async ({ page, goto }) => {
    await goto('/facturas', { waitUntil: 'hydration' })

    await tabTo(page, 'Servicios')
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(/\/servicios$/)
    await expect(page.getByRole('link', { name: 'Servicios', exact: true })).toHaveAttribute('aria-current', 'page')
  })

  test('header shows the page title, company and user (S5, S9)', async ({ page, goto }) => {
    await goto('/facturas', { waitUntil: 'hydration' })

    await expect(page.getByRole('heading', { name: 'Facturas', level: 1 })).toBeVisible()
    await expect(page.getByText('Comercial Ejemplo SRL')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Ana Pérez' })).toBeVisible()
  })

  test('a first visit starts in dark mode (S6, ADR 0046)', async ({ page, goto }) => {
    await goto('/facturas', { waitUntil: 'hydration' })

    await expect(page.locator('html')).toHaveClass(/\bdark\b/)
  })

  test('the two-state button switches to light and keeps it (S6)', async ({ page, goto }) => {
    await goto('/facturas', { waitUntil: 'hydration' })

    await page.getByRole('button', { name: 'Cambiar a modo claro' }).click()
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/)

    await goto('/facturas', { waitUntil: 'hydration' })
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/)
  })

  test('collapsed sidebar shows tooltips and stays collapsed after reload (S2, ADR 0038)', async ({ page, goto }) => {
    await goto('/facturas', { waitUntil: 'hydration' })

    await page.getByRole('button', { name: 'Colapsar barra lateral' }).click()
    await expect(page.getByRole('button', { name: 'Expandir barra lateral' })).toBeVisible()

    await page.getByRole('link', { name: 'Clientes', exact: true }).hover()
    await expect(page.getByRole('tooltip')).toHaveText('Clientes')

    await goto('/facturas', { waitUntil: 'hydration' })
    await expect(page.getByRole('button', { name: 'Expandir barra lateral' })).toBeVisible()
  })
})

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('the ≡ button opens a drawer that closes on navigation (S3, ADR 0039)', async ({ page, goto }) => {
    await goto('/facturas', { waitUntil: 'hydration' })

    await page.getByRole('button', { name: 'Abrir barra lateral' }).click()
    const drawer = page.getByRole('dialog')
    await expect(drawer).toBeVisible()

    await drawer.getByRole('link', { name: 'Servicios', exact: true }).click()

    await expect(page).toHaveURL(/\/servicios$/)
    await expect(drawer).toBeHidden()
  })

  test('header keeps company, mode button and user menu (S5, ADR 0041)', async ({ page, goto }) => {
    await goto('/facturas', { waitUntil: 'hydration' })

    await expect(page.getByText('Comercial Ejemplo SRL')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cambiar a modo claro' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Ana Pérez' })).toBeVisible()
  })
})
