import { describe, expect, it } from 'vitest'
import { loginSchema } from './auth/login'
import {
  errorMessageSchema,
  validationErrorsFrom,
  validationErrorsSchema,
} from './errors'

describe('validationErrorsFrom', () => {
  it('groups the messages of a failed parse under the name of each field', () => {
    const result = loginSchema.safeParse({ email: 'correo', password: '' })
    if (result.success) throw new Error('the parse should have failed')

    expect(validationErrorsFrom(result.error)).toEqual({
      email: ['Escribe un correo válido'],
      password: ['Escribe tu contraseña'],
    })
  })

  it('gives only the fields that failed', () => {
    const result = loginSchema.safeParse({
      email: 'demo@facturard.do',
      password: '',
    })
    if (result.success) throw new Error('the parse should have failed')

    expect(validationErrorsFrom(result.error)).toEqual({
      password: ['Escribe tu contraseña'],
    })
  })
})

// Formats of the two error answers of the API (ADR 0077, CLAUDE.md: `{ campo: [mensajes] }`).

describe('validationErrorsSchema', () => {
  it('accepts a list of messages under each field name', () => {
    const errors = {
      email: ['Escribe un correo válido'],
      password: ['Escribe tu contraseña'],
    }
    expect(validationErrorsSchema.parse(errors)).toEqual(errors)
  })

  it('accepts no errors at all', () => {
    expect(validationErrorsSchema.parse({})).toEqual({})
  })

  it('rejects a field whose messages are not a list', () => {
    expect(
      validationErrorsSchema.safeParse({ email: 'Escribe un correo válido' })
        .success,
    ).toBe(false)
  })

  it('rejects a list with something that is not a message', () => {
    expect(validationErrorsSchema.safeParse({ email: [1] }).success).toBe(false)
  })
})

describe('errorMessageSchema', () => {
  it('accepts an answer with a message', () => {
    const body = { message: 'Correo o contraseña incorrectos.' }
    expect(errorMessageSchema.parse(body)).toEqual(body)
  })

  it('rejects an empty message', () => {
    expect(errorMessageSchema.safeParse({ message: '' }).success).toBe(false)
  })

  it('rejects an answer without message', () => {
    expect(errorMessageSchema.safeParse({}).success).toBe(false)
  })
})
