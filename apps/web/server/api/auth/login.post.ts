// Simulated server delay, so the "Entrar" button shows its loading state (ADR 0078).
const LOGIN_DELAY_MS = 600

export default defineEventHandler(async (event) => {
  // A body that is not valid JSON is read as no body at all: `loginAttempt` answers 400.
  const body: unknown = await readBody(event).catch(() => undefined)

  await new Promise((resolve) => setTimeout(resolve, LOGIN_DELAY_MS))

  const attempt = loginAttempt(body)
  setResponseStatus(event, attempt.status)
  return attempt.body
})
