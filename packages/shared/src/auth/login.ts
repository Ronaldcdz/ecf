import { z } from 'zod'

const INVALID_EMAIL = 'Escribe un correo válido'
const MISSING_PASSWORD = 'Escribe tu contraseña'

/**
 * The email is trimmed and lowercased before its format is checked (ADR 0074).
 * The password is kept as typed: spaces can be part of it.
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

export const loginResponseSchema = z.object({
  user: z.object({ name: z.string().min(1) }),
  company: z.object({ name: z.string().min(1) }),
})

export type LoginResponse = z.infer<typeof loginResponseSchema>
