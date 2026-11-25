import { z } from 'zod'

// Messages come from the approved login design (odd/tasks/login-con-sesion-simulada.md, L4).
const INVALID_EMAIL = 'Escribe un correo válido'
const MISSING_PASSWORD = 'Escribe tu contraseña'

/**
 * Data the login form sends (S2).
 *
 * The email is cleaned before it is checked (ADR 0074): the checks run in the order
 * they are chained, so "  Demo@FacturaRD.do " becomes "demo@facturard.do" first and
 * only then is tested as an email. The password is never changed: spaces can be
 * part of it.
 */
export const loginSchema = z.object({
  email: z
    .string({ error: INVALID_EMAIL })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: INVALID_EMAIL })),
  password: z.string({ error: MISSING_PASSWORD }).min(1, MISSING_PASSWORD),
})

export type LoginInput = z.input<typeof loginSchema>
export type LoginData = z.output<typeof loginSchema>

/**
 * What the login answers when the credentials are right: who is signed in and for
 * which company. The web store (`useSessionStore`) holds the same two names.
 */
export const loginResponseSchema = z.object({
  user: z.object({ name: z.string().min(1) }),
  company: z.object({ name: z.string().min(1) }),
})

export type LoginResponse = z.infer<typeof loginResponseSchema>
