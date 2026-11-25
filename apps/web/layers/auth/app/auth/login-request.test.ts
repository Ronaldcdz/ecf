/**
 * The typed client of the login route (ADR 0077). It turns the answers of the route
 * into a session or into an `AuthError` the form can show.
 */
import { describe, expect, it } from 'vitest'
import { AuthError, requestLogin } from './login-request'

const credentials = { email: 'demo@facturard.do', password: 'demo1234' }
const session = {
  user: { name: 'Ana Pérez' },
  company: { name: 'Comercial Ejemplo SRL' },
}

/** A fake of `$fetch` that fails like the real one: an error with `status` and `data`. */
function failingWith(status: number, data: unknown) {
  return () =>
    Promise.reject(Object.assign(new Error(`HTTP ${status}`), { status, data }))
}

async function failureOf(promise: Promise<unknown>): Promise<AuthError> {
  const error = await promise.then(
    () => null,
    (reason: unknown) => reason,
  )
  expect(error).toBeInstanceOf(AuthError)
  return error as AuthError
}

describe('requestLogin', () => {
  it('posts the credentials to /api/auth/login', async () => {
    const calls: unknown[][] = []
    const fetcher = (url: string, options: unknown) => {
      calls.push([url, options])
      return Promise.resolve(session)
    }

    await requestLogin(credentials, fetcher)

    expect(calls).toEqual([
      ['/api/auth/login', { method: 'POST', body: credentials }],
    ])
  })

  it('gives the session when the route answers 200', async () => {
    expect(
      await requestLogin(credentials, () => Promise.resolve(session)),
    ).toEqual(session)
  })

  it('fails as "unknown" when a 200 answer is not a session', async () => {
    const error = await failureOf(
      requestLogin(credentials, () => Promise.resolve({ user: 1 })),
    )
    expect(error.kind).toBe('unknown')
  })

  it('fails as "invalid-credentials" with the message of the 401 answer', async () => {
    const fetcher = failingWith(401, {
      message: 'Correo o contraseña incorrectos.',
    })

    const error = await failureOf(requestLogin(credentials, fetcher))

    expect(error.kind).toBe('invalid-credentials')
    expect(error.message).toBe('Correo o contraseña incorrectos.')
  })

  it('fails as "validation" with the field errors of the 400 answer', async () => {
    const fieldErrors = { email: ['Escribe un correo válido'] }

    const error = await failureOf(
      requestLogin(credentials, failingWith(400, fieldErrors)),
    )

    expect(error.kind).toBe('validation')
    expect(error.fieldErrors).toEqual(fieldErrors)
  })

  it('fails as "unknown" for any other status', async () => {
    const error = await failureOf(
      requestLogin(credentials, failingWith(500, { x: 1 })),
    )
    expect(error.kind).toBe('unknown')
  })

  it('fails as "unknown" when there is no answer at all (network down)', async () => {
    const error = await failureOf(
      requestLogin(credentials, () =>
        Promise.reject(new Error('Failed to fetch')),
      ),
    )
    expect(error.kind).toBe('unknown')
  })

  it('fails as "unknown" when a 401 answer has no message', async () => {
    const error = await failureOf(
      requestLogin(credentials, failingWith(401, {})),
    )
    expect(error.kind).toBe('unknown')
  })
})
