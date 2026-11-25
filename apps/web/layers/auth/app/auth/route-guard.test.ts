/**
 * Route protection rules (S5, S6; ADR 0071, 0083, 0084), tested without a browser.
 */
import { describe, expect, it } from 'vitest'
import { guardRoute, safeRedirect } from './route-guard'

describe('guardRoute', () => {
  it('sends someone without a session to /login, remembering the page they asked for', () => {
    const decision = guardRoute({
      path: '/clientes',
      fullPath: '/clientes',
      isPublic: false,
      isLoggedIn: false,
    })

    expect(decision).toEqual({
      path: '/login',
      query: { redirect: '/clientes' },
    })
  })

  it('remembers the query string and the hash too', () => {
    const decision = guardRoute({
      path: '/facturas',
      fullPath: '/facturas?estado=pendiente#fila-3',
      isPublic: false,
      isLoggedIn: false,
    })

    expect(decision).toEqual({
      path: '/login',
      query: { redirect: '/facturas?estado=pendiente#fila-3' },
    })
  })

  it('lets someone without a session open a public page', () => {
    const decision = guardRoute({
      path: '/design',
      fullPath: '/design',
      isPublic: true,
      isLoggedIn: false,
    })

    expect(decision).toBeNull()
  })

  it('lets someone without a session open /login', () => {
    const decision = guardRoute({
      path: '/login',
      fullPath: '/login?redirect=%2Fclientes',
      isPublic: true,
      isLoggedIn: false,
    })

    expect(decision).toBeNull()
  })

  it('lets someone with a session open a protected page', () => {
    const decision = guardRoute({
      path: '/servicios',
      fullPath: '/servicios',
      isPublic: false,
      isLoggedIn: true,
    })

    expect(decision).toBeNull()
  })

  it('sends someone who is already signed in from /login to /facturas (S6, ADR 0071)', () => {
    const decision = guardRoute({
      path: '/login',
      fullPath: '/login',
      isPublic: true,
      isLoggedIn: true,
    })

    expect(decision).toEqual({ path: '/facturas' })
  })

  it('lets someone who is signed in open another public page', () => {
    const decision = guardRoute({
      path: '/design',
      fullPath: '/design',
      isPublic: true,
      isLoggedIn: true,
    })

    expect(decision).toBeNull()
  })
})

describe('safeRedirect: where to go after a login', () => {
  it.each([
    ['a page of the app', '/clientes', '/clientes'],
    [
      'a page with a query and a hash',
      '/facturas?estado=pendiente#fila-3',
      '/facturas?estado=pendiente#fila-3',
    ],
  ])('keeps %s', (_label, value, expected) => {
    expect(safeRedirect(value)).toBe(expected)
  })

  it.each([
    ['nothing', undefined],
    ['an empty text', ''],
    ['null', null],
    ['a list of values', ['/clientes', '/servicios']],
    ['a number', 42],
  ])('goes to /facturas when it gets %s', (_label, value) => {
    expect(safeRedirect(value)).toBe('/facturas')
  })

  it.each([
    ['another site', 'https://evil.example/robo'],
    ['a site without protocol', '//evil.example/robo'],
    ['a site with a backslash trick', '/\\evil.example/robo'],
    ['a relative path', 'clientes'],
    ['a javascript link', 'javascript:alert(1)'],
    ['a tab inside, which browsers ignore', '/\t/evil.example/robo'],
    ['a line break inside, which browsers ignore', '/\n/evil.example/robo'],
  ])(
    'goes to /facturas instead of %s (it would leave the app)',
    (_label, value) => {
      expect(safeRedirect(value)).toBe('/facturas')
    },
  )

  it.each(['/login', '/login?redirect=%2Fclientes'])(
    'goes to /facturas instead of %s (it would loop)',
    (value) => {
      expect(safeRedirect(value)).toBe('/facturas')
    },
  )
})
