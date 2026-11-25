/**
 * Typed client of `POST /api/auth/login` (ADR 0077). Components never call `$fetch`
 * themselves (CLAUDE.md): they go through `useAuth`, which uses this client.
 */
import {
  errorMessageSchema,
  loginResponseSchema,
  validationErrorsSchema,
} from '@ecf/shared'
import type { LoginInput, LoginResponse, ValidationErrors } from '@ecf/shared'

export type AuthErrorKind = 'invalid-credentials' | 'validation' | 'unknown'

/** Why a login failed, in a form the login page can show. */
export class AuthError extends Error {
  constructor(
    readonly kind: AuthErrorKind,
    message: string,
    /** Only for `validation`: the messages under each field. */
    readonly fieldErrors?: ValidationErrors,
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

/** The part of `$fetch` this client needs; tests replace it with a fake. */
export type Fetcher = (
  url: string,
  options: { method: 'POST'; body: LoginInput },
) => Promise<unknown>

const nuxtFetcher: Fetcher = (url, options) => $fetch(url, options)

/** The status and the body of a failed `$fetch` call, or `undefined` when there was no answer. */
function answerOf(
  error: unknown,
): { status: number; data: unknown } | undefined {
  if (typeof error !== 'object' || error === null) return undefined
  const { status, statusCode, data } = error as Record<string, unknown>
  const code = typeof status === 'number' ? status : statusCode
  return typeof code === 'number' ? { status: code, data } : undefined
}

function failureFrom(error: unknown): AuthError {
  const answer = answerOf(error)

  if (answer?.status === 401) {
    const message = errorMessageSchema.safeParse(answer.data)
    if (message.success)
      return new AuthError('invalid-credentials', message.data.message)
  }
  if (answer?.status === 400) {
    const fieldErrors = validationErrorsSchema.safeParse(answer.data)
    if (fieldErrors.success) {
      return new AuthError(
        'validation',
        'Revisa los datos del formulario.',
        fieldErrors.data,
      )
    }
  }
  return new AuthError(
    'unknown',
    'No pudimos iniciar sesión. Inténtalo de nuevo.',
  )
}

export async function requestLogin(
  credentials: LoginInput,
  fetcher: Fetcher = nuxtFetcher,
): Promise<LoginResponse> {
  let answer: unknown
  try {
    answer = await fetcher('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })
  } catch (error) {
    throw failureFrom(error)
  }

  const session = loginResponseSchema.safeParse(answer)
  if (!session.success) {
    throw new AuthError(
      'unknown',
      'No pudimos iniciar sesión. Inténtalo de nuevo.',
    )
  }
  return session.data
}
