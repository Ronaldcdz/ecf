/**
 * Smoke test (T5): proves Playwright can start Nuxt and open a page in each browser.
 * `/design` is the only real page today; the layout tests arrive in T6.
 */
import { expect, test } from '@nuxt/test-utils/playwright'

test('opens the design system page', async ({ page, goto }) => {
  // `hydration` waits until Vue has taken over the server HTML, so clicks would work.
  await goto('/design', { waitUntil: 'hydration' })

  await expect(page).toHaveTitle('Sistema de diseño')
})
