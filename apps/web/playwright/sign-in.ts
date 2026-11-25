import type { BrowserContext } from '@playwright/test'
import { SESSION_COOKIE } from '../layers/auth/app/auth/session-cookie'
import { DEMO_SESSION } from '../layers/auth/shared/utils/demo-account'

/**
 * Signs in for an E2E test without going through the login page: it sets the session
 * cookie the app reads at start (ADR 0069, 0075). Tests of the layout use it, because
 * the app shell only shows to someone who is signed in. Tests of the login page itself
 * fill the real form instead.
 */
export async function signIn(
  context: BrowserContext,
  baseURL: string | undefined,
) {
  if (!baseURL)
    throw new Error('signIn needs the base URL of the app under test')

  // `useCookie` writes objects as URI-encoded JSON.
  await context.addCookies([
    {
      name: SESSION_COOKIE,
      value: encodeURIComponent(JSON.stringify(DEMO_SESSION)),
      url: baseURL,
    },
  ])
}
