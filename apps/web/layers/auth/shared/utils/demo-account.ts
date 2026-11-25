// In the layer's `shared/` folder so the app (demo button) and the server (mock route) use
// the same file. Never move it to `packages/shared`: the real API must not know it (ADR 0079).
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

export const DEMO_SESSION: LoginResponse = {
  user: { name: 'Ana Pérez' },
  company: { name: 'Comercial Ejemplo SRL' },
}

export function authenticateDemo(data: LoginData): LoginResponse | null {
  const isDemo =
    data.email === DEMO_ACCOUNT.email && data.password === DEMO_ACCOUNT.password
  return isDemo ? DEMO_SESSION : null
}

export type LoginAttempt =
  | { status: 200; body: LoginResponse }
  | { status: 400; body: ValidationErrors }
  | { status: 401; body: ErrorMessage }

export function loginAttempt(body: unknown): LoginAttempt {
  // Not an object: read it as an object with every field missing, so the 400 names the
  // fields (a whole-object error would leave `{}`).
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
