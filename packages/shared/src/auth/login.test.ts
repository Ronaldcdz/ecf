import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { loginResponseSchema, loginSchema } from './login'

// Messages come from the approved login design (odd/tasks/login-con-sesion-simulada.md, L4).
const INVALID_EMAIL = 'Escribe un correo válido'
const MISSING_PASSWORD = 'Escribe tu contraseña'

function fieldErrors(input: unknown) {
  const result = loginSchema.safeParse(input)
  if (result.success) return {}
  return z.flattenError(result.error).fieldErrors
}

describe('loginSchema: email', () => {
  it('accepts a normal email and keeps it as it is', () => {
    const result = loginSchema.parse({
      email: 'demo@facturard.do',
      password: 'demo1234',
    })
    expect(result.email).toBe('demo@facturard.do')
  })

  it('removes spaces around the email (ADR 0074)', () => {
    const result = loginSchema.parse({
      email: '  demo@facturard.do  ',
      password: 'x',
    })
    expect(result.email).toBe('demo@facturard.do')
  })

  it('lowercases the email, so "Demo@FacturaRD.do" is the demo account (ADR 0074)', () => {
    const result = loginSchema.parse({
      email: 'Demo@FacturaRD.do',
      password: 'x',
    })
    expect(result.email).toBe('demo@facturard.do')
  })

  it('removes spaces first and then lowercases', () => {
    const result = loginSchema.parse({
      email: ' Demo@FacturaRD.DO ',
      password: 'x',
    })
    expect(result.email).toBe('demo@facturard.do')
  })

  it.each([
    ['empty', ''],
    ['only spaces', '   '],
    ['no @', 'correo'],
    ['no domain', 'correo@'],
    ['no name', '@facturard.do'],
    ['a space inside', 'dem o@facturard.do'],
  ])('rejects an email that is %s', (_label, email) => {
    expect(fieldErrors({ email, password: 'x' }).email).toEqual([INVALID_EMAIL])
  })
})

describe('loginSchema: password', () => {
  it('rejects an empty password', () => {
    expect(
      fieldErrors({ email: 'demo@facturard.do', password: '' }).password,
    ).toEqual([MISSING_PASSWORD])
  })

  it('keeps the spaces of the password: they can be part of it', () => {
    const result = loginSchema.parse({
      email: 'demo@facturard.do',
      password: ' a b ',
    })
    expect(result.password).toBe(' a b ')
  })

  it('accepts a password that is only spaces, because it is not empty', () => {
    const result = loginSchema.safeParse({
      email: 'demo@facturard.do',
      password: '   ',
    })
    expect(result.success).toBe(true)
  })
})

describe('loginSchema: both fields', () => {
  it('reports the email error and the password error together, each under its field', () => {
    expect(fieldErrors({ email: 'correo', password: '' })).toEqual({
      email: [INVALID_EMAIL],
      password: [MISSING_PASSWORD],
    })
  })

  it('rejects a missing field the same way as an empty one', () => {
    expect(fieldErrors({})).toEqual({
      email: [INVALID_EMAIL],
      password: [MISSING_PASSWORD],
    })
  })
})

describe('loginResponseSchema', () => {
  const session = {
    user: { name: 'Ana Pérez' },
    company: { name: 'Comercial Ejemplo SRL' },
  }

  it('accepts the user and the company of the session', () => {
    expect(loginResponseSchema.parse(session)).toEqual(session)
  })

  it('rejects a response without company', () => {
    expect(loginResponseSchema.safeParse({ user: session.user }).success).toBe(
      false,
    )
  })

  it('rejects an empty user name', () => {
    expect(
      loginResponseSchema.safeParse({ ...session, user: { name: '' } }).success,
    ).toBe(false)
  })
})
