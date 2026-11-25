import type { BrowserContext } from '@playwright/test'
import { SESSION_COOKIE } from '../layers/auth/app/auth/session-cookie'
import { DEMO_SESSION } from '../layers/auth/shared/utils/demo-account'

// Signs in by setting the session cookie, without going through the login page.
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
