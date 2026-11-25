/**
 * Route protection (T6 of `odd/tasks/login-con-sesion-simulada.md`, S5, S6, ADR 0071, 0083, 0084).
 * Written RED first: each test names the spec or ADR it proves.
 */
import { expect, test } from '@nuxt/test-utils/playwright'
import type { Page } from '@playwright/test'
import { signIn } from '../../../playwright/sign-in'
import { SESSION_COOKIE } from '../app/auth/session-cookie'

const demoButton = (page: Page) =>
  page.getByRole('button', { name: 'Entrar como demo' })
const submitButton = (page: Page) =>
  page.getByRole('button', { name: 'Entrar', exact: true })

test.describe('without a session', () => {
  for (const path of ['/facturas', '/clientes', '/servicios']) {
    test(`${path} sends you to /login and remembers the page (S5)`, async ({
      page,
      goto,
    }) => {
      await goto(path, { waitUntil: 'hydration' })

      await expect(page).toHaveURL(new RegExp(`/login\\?redirect=${path}$`))
      await expect(
        page.getByRole('heading', { name: 'Iniciar sesión', level: 1 }),
      ).toBeVisible()
    })
  }

  test('"/" goes to the login too', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })

    await expect(page).toHaveURL(/\/login\?redirect=\/facturas$/)
  })

  test('after the login you land on the page you asked for (S5, ADR 0071)', async ({
    page,
    goto,
  }) => {
    await goto('/clientes', { waitUntil: 'hydration' })
    await demoButton(page).click()
    await submitButton(page).click()

    await expect(page).toHaveURL(/\/clientes$/)
    await expect(
      page.getByRole('heading', { name: 'Clientes', level: 1 }),
    ).toBeVisible()
  })

  test('the query string of the page you asked for is kept', async ({
    page,
    goto,
  }) => {
    await goto('/servicios?estado=activo', { waitUntil: 'hydration' })
    await demoButton(page).click()
    await submitButton(page).click()

    await expect(page).toHaveURL(/\/servicios\?estado=activo$/)
  })

  test('opening /login directly lands on /facturas after the login (ADR 0071)', async ({
    page,
    goto,
  }) => {
    await goto('/login', { waitUntil: 'hydration' })
    await demoButton(page).click()
    await submitButton(page).click()

    await expect(page).toHaveURL(/\/facturas$/)
  })

  test('a redirect to another site is ignored: you stay in the app', async ({
    page,
    goto,
  }) => {
    await goto('/login?redirect=https%3A%2F%2Fevil.example%2Frobo', {
      waitUntil: 'hydration',
    })
    await demoButton(page).click()
    await submitButton(page).click()

    await expect(page).toHaveURL(/\/facturas$/)
  })

  test('/design is public (ADR 0083)', async ({ page, goto }) => {
    await goto('/design', { waitUntil: 'hydration' })

    await expect(page).toHaveURL(/\/design$/)
    await expect(page).toHaveTitle('Sistema de diseño')
  })

  test('a session cookie that is not a valid session counts as signed out and is removed', async ({
    page,
    context,
    baseURL,
    goto,
  }) => {
    await context.addCookies([
      {
        name: SESSION_COOKIE,
        value: encodeURIComponent(JSON.stringify({ user: 'Ana' })),
        url: baseURL!,
      },
    ])

    await goto('/facturas', { waitUntil: 'hydration' })

    await expect(page).toHaveURL(/\/login\?redirect=\/facturas$/)
    const cookie = (await context.cookies()).find(
      (c) => c.name === SESSION_COOKIE,
    )
    expect(cookie).toBeUndefined()
  })
})

test.describe('with a session', () => {
  test.beforeEach(async ({ context, baseURL }) => {
    await signIn(context, baseURL)
  })

  test('/login sends you to /facturas (S6, ADR 0071)', async ({
    page,
    goto,
  }) => {
    await goto('/login', { waitUntil: 'hydration' })

    await expect(page).toHaveURL(/\/facturas$/)
  })

  test('/design stays open', async ({ page, goto }) => {
    await goto('/design', { waitUntil: 'hydration' })

    await expect(page).toHaveURL(/\/design$/)
  })

  test('the protected pages open', async ({ page, goto }) => {
    await goto('/servicios', { waitUntil: 'hydration' })

    await expect(page).toHaveURL(/\/servicios$/)
  })
})
