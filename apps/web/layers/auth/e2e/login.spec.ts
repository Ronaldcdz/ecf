/**
 * Login page (T5 of `odd/tasks/login-con-sesion-simulada.md`, S1, S2, S3, S4).
 * Written RED first: each test names the spec or ADR it proves.
 */
import { expect, test } from '@nuxt/test-utils/playwright'
import type { Page } from '@playwright/test'

const DEMO = { email: 'demo@facturard.do', password: 'demo1234' }

const emailField = (page: Page) => page.getByLabel('Correo')
const passwordField = (page: Page) => page.getByLabel('Contraseña')
const submitButton = (page: Page) =>
  page.getByRole('button', { name: 'Entrar', exact: true })
const demoButton = (page: Page) =>
  page.getByRole('button', { name: 'Entrar como demo' })

test.describe('login page', () => {
  test.beforeEach(async ({ goto }) => {
    await goto('/login', { waitUntil: 'hydration' })
  })

  test('is its own page, with no sidebar or header (S1, ADR 0067)', async ({
    page,
  }) => {
    await expect(page).toHaveTitle('Iniciar sesión')
    await expect(
      page.getByRole('heading', { name: 'Iniciar sesión', level: 1 }),
    ).toBeVisible()
    await expect(page.getByRole('navigation')).toHaveCount(0)
    await expect(page.getByRole('link', { name: 'Clientes' })).toHaveCount(0)
  })

  test('has labelled fields and both buttons (S2, S4)', async ({ page }) => {
    await expect(emailField(page)).toBeVisible()
    await expect(passwordField(page)).toBeVisible()
    await expect(passwordField(page)).toHaveAttribute('type', 'password')
    await expect(submitButton(page)).toBeVisible()
    await expect(demoButton(page)).toBeVisible()
  })

  test('an empty form shows an error under each field (S2)', async ({
    page,
  }) => {
    await submitButton(page).click()

    await expect(page.getByText('Escribe un correo válido')).toBeVisible()
    await expect(page.getByText('Escribe tu contraseña')).toBeVisible()
    await expect(page).toHaveURL(/\/login$/)
  })

  test('an email without the right format shows only the email error (S2)', async ({
    page,
  }) => {
    await emailField(page).fill('correo')
    await passwordField(page).fill('algo')
    await submitButton(page).click()

    await expect(page.getByText('Escribe un correo válido')).toBeVisible()
    await expect(page.getByText('Escribe tu contraseña')).toHaveCount(0)
  })

  test('"Entrar como demo" only fills the form: it does not sign in (S4, ADR 0070)', async ({
    page,
  }) => {
    await demoButton(page).click()

    await expect(emailField(page)).toHaveValue(DEMO.email)
    await expect(passwordField(page)).toHaveValue(DEMO.password)
    await expect(page).toHaveURL(/\/login$/)
    await expect(page.getByRole('alert')).toHaveCount(0)
  })

  test('wrong credentials show the alert and keep both fields as typed (ADR 0073, decision 2)', async ({
    page,
  }) => {
    await emailField(page).fill('ana@ejemplo.com')
    await passwordField(page).fill('clave1234')
    await submitButton(page).click()

    await expect(page.getByRole('alert')).toContainText(
      'Correo o contraseña incorrectos.',
    )
    await expect(emailField(page)).toHaveValue('ana@ejemplo.com')
    await expect(passwordField(page)).toHaveValue('clave1234')
    await expect(page).toHaveURL(/\/login$/)
  })

  test('the alert goes away when the next attempt starts', async ({ page }) => {
    await emailField(page).fill('ana@ejemplo.com')
    await passwordField(page).fill('clave1234')
    await submitButton(page).click()
    await expect(page.getByRole('alert')).toBeVisible()

    await demoButton(page).click()
    await submitButton(page).click()

    await expect(page.getByRole('alert')).toHaveCount(0)
    await expect(page).toHaveURL(/\/facturas$/)
  })

  test('while it waits, only the "Entrar" button is busy; the fields stay editable (ADR 0078, decision 1)', async ({
    page,
  }) => {
    await demoButton(page).click()
    await submitButton(page).click()

    await expect(submitButton(page)).toBeDisabled()
    await expect(emailField(page)).toBeEnabled()
    await expect(passwordField(page)).toBeEnabled()
    await expect(page).toHaveURL(/\/facturas$/)
  })

  test('pressing Enter while it waits does not send a second login (decision 1)', async ({
    page,
  }) => {
    const requests: string[] = []
    page.on('request', (request) => {
      if (request.url().endsWith('/api/auth/login'))
        requests.push(request.method())
    })

    await demoButton(page).click()
    await submitButton(page).click()
    await passwordField(page).press('Enter')

    await expect(page).toHaveURL(/\/facturas$/)
    expect(requests).toEqual(['POST'])
  })

  test('a second submit that skips the disabled button is ignored while it waits', async ({
    page,
  }) => {
    const requests: string[] = []
    page.on('request', (request) => {
      if (request.url().endsWith('/api/auth/login'))
        requests.push(request.method())
    })

    await demoButton(page).click()
    await submitButton(page).click()
    // `requestSubmit` is what password managers and scripts call: it ignores the button.
    await page
      .locator('form')
      .evaluate((form: HTMLFormElement) => form.requestSubmit())

    await expect(page).toHaveURL(/\/facturas$/)
    expect(requests).toEqual(['POST'])
  })

  test('the demo account signs in, lands on /facturas and survives a reload (S3)', async ({
    page,
    context,
  }) => {
    await demoButton(page).click()
    await submitButton(page).click()

    await expect(page).toHaveURL(/\/facturas$/)
    await expect(page.getByRole('button', { name: 'Ana Pérez' })).toBeVisible()

    await page.reload()
    await expect(page.getByRole('button', { name: 'Ana Pérez' })).toBeVisible()

    // `expires: -1` is a session cookie: it lasts until the browser closes (ADR 0076).
    const cookie = (await context.cookies()).find((c) => c.name === 'session')
    expect(cookie?.expires).toBe(-1)
  })

  test('works with the keyboard only: Tab through the fields and Enter sends (S2)', async ({
    page,
  }) => {
    await emailField(page).focus()
    await page.keyboard.type(DEMO.email)
    await page.keyboard.press('Tab')
    await page.keyboard.type(DEMO.password)
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(/\/facturas$/)
  })

  test('cleans the email before checking it (ADR 0074)', async ({ page }) => {
    await emailField(page).fill('  Demo@FacturaRD.do ')
    await passwordField(page).fill(DEMO.password)
    await submitButton(page).click()

    await expect(page).toHaveURL(/\/facturas$/)
  })
})

test.describe('login page on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('fits the screen and keeps both buttons reachable (S1)', async ({
    page,
    goto,
  }) => {
    await goto('/login', { waitUntil: 'hydration' })

    await expect(submitButton(page)).toBeInViewport()
    await expect(demoButton(page)).toBeInViewport()
    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    )
    expect(overflows).toBe(false)
  })
})
