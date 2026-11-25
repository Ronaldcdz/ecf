/**
 * The demo account and the rules of the simulated login route (ADR 0068, 0079).
 *
 * This file is in the `shared/` folder of the auth layer, so Nuxt offers it to the
 * app (the "Entrar como demo" button) and to the server (the mock route) at the same
 * time. It must never move to `packages/shared`: the real API does not know it.
 */
import { loginSchema, validationErrorsFrom } from '@ecf/shared'
import type {
  ErrorMessage,
  LoginData,
  LoginResponse,
  ValidationErrors,
} from '@ecf/shared'

export const DEMO_ACCOUNT = {
  email: 'demo@facturard.do',
  password: 'demo1234',
} as const

/** Who signs in with the demo account: the user and company approved in the design (T2). */
export const DEMO_SESSION: LoginResponse = {
  user: { name: 'Ana Pérez' },
  company: { name: 'Comercial Ejemplo SRL' },
}

/** The session of the demo account, or `null` for any other email or password. */
export function authenticateDemo(data: LoginData): LoginResponse | null {
  const isDemo =
    data.email === DEMO_ACCOUNT.email && data.password === DEMO_ACCOUNT.password
  return isDemo ? DEMO_SESSION : null
}

export type LoginAttempt =
  | { status: 200; body: LoginResponse }
  | { status: 400; body: ValidationErrors }
  | { status: 401; body: ErrorMessage }

/**
 * What `POST /api/auth/login` answers for a body (ADR 0077): 400 when the format is
 * wrong, 401 when the format is right but the account is not the demo one, 200 with
 * the session otherwise. The route only adds the delay (ADR 0078) and the HTTP status.
 */
export function loginAttempt(body: unknown): LoginAttempt {
  // A body that is not an object has no fields: it is read as an object with every field
  // missing, so the 400 still says which fields are needed (a whole-object error would
  // leave `{}`, with no messages).
  const isObject =
    typeof body === 'object' && body !== null && !Array.isArray(body)
  const parsed = loginSchema.safeParse(isObject ? body : {})
  if (!parsed.success) {
    return { status: 400, body: validationErrorsFrom(parsed.error) }
  }

  const session = authenticateDemo(parsed.data)
  if (!session) {
    return {
      status: 401,
      body: { message: 'Correo o contraseña incorrectos.' },
    }
  }
  return { status: 200, body: session }
}
