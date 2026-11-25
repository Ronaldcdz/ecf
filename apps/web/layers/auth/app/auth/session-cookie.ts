/**
 * Name of the session cookie (ADR 0069). It has its own file so `useAuth` and the
 * Playwright helper that signs in for E2E tests agree on it.
 */
export const SESSION_COOKIE = 'session'
