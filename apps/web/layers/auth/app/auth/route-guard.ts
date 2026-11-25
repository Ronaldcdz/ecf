const LOGIN_PAGE = '/login'
const DEFAULT_PAGE = '/facturas'

export interface RouteGuardInput {
  path: string
  fullPath: string
  isPublic: boolean
  isLoggedIn: boolean
}

/** Where to send the visitor instead, or `null` to let the navigation go on. */
export type RouteGuardDecision = {
  path: string
  query?: { redirect: string }
} | null

export function guardRoute({
  path,
  fullPath,
  isPublic,
  isLoggedIn,
}: RouteGuardInput): RouteGuardDecision {
  if (isLoggedIn && path === LOGIN_PAGE) return { path: DEFAULT_PAGE }
  if (!isLoggedIn && !isPublic)
    return { path: LOGIN_PAGE, query: { redirect: fullPath } }
  return null
}

/**
 * The page to open after a login. The value comes from the URL, so anyone can write it:
 * only paths inside this app are accepted, anything else goes to the default page.
 */
export function safeRedirect(value: unknown): string {
  if (typeof value !== 'string') return DEFAULT_PAGE

  // Browsers drop tabs and line breaks inside a URL, so "/\t/evil.example" would become "//evil.example".
  const hasControlCharacter = [...value].some(
    (character) => character.charCodeAt(0) < 32,
  )
  const staysInApp =
    value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\')
  const isLoginPage = /^\/login(?:[/?#]|$)/.test(value)

  return staysInApp && !hasControlCharacter && !isLoginPage
    ? value
    : DEFAULT_PAGE
}
