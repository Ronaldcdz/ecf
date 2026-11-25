/**
 * The demo account and the rules of the simulated login route
 * (ADR 0068, 0073, 0077, 0079; odd/tasks/login-con-sesion-simulada.md S2).
 */
import { describe, expect, it } from 'vitest'
import {
  DEMO_ACCOUNT,
  DEMO_SESSION,
  authenticateDemo,
  loginAttempt,
} from './utils/demo-account'

describe('the demo account', () => {
  it('is demo@facturard.do with the password demo1234', () => {
    expect(DEMO_ACCOUNT).toEqual({
      email: 'demo@facturard.do',
      password: 'demo1234',
    })
  })

  it('signs in as Ana Pérez, from Comercial Ejemplo SRL', () => {
    expect(DEMO_SESSION).toEqual({
      user: { name: 'Ana Pérez' },
      company: { name: 'Comercial Ejemplo SRL' },
    })
  })
})

describe('authenticateDemo', () => {
  it('gives the session when email and password are the demo account', () => {
    expect(authenticateDemo(DEMO_ACCOUNT)).toEqual(DEMO_SESSION)
  })

  it('gives nothing when the password is wrong', () => {
    expect(
      authenticateDemo({ email: DEMO_ACCOUNT.email, password: 'otra' }),
    ).toBeNull()
  })

  it('gives nothing when the email is another one', () => {
    expect(
      authenticateDemo({
        email: 'ana@ejemplo.com',
        password: DEMO_ACCOUNT.password,
      }),
    ).toBeNull()
  })

  it('tells uppercase from lowercase in the password', () => {
    expect(
      authenticateDemo({ email: DEMO_ACCOUNT.email, password: 'DEMO1234' }),
    ).toBeNull()
  })
})

describe('loginAttempt: what the route answers', () => {
  it('answers 200 with the session for the demo account', () => {
    expect(loginAttempt(DEMO_ACCOUNT)).toEqual({
      status: 200,
      body: DEMO_SESSION,
    })
  })

  it('cleans the email first: " Demo@FacturaRD.do " is the demo account (ADR 0074)', () => {
    const attempt = loginAttempt({
      email: ' Demo@FacturaRD.do ',
      password: DEMO_ACCOUNT.password,
    })
    expect(attempt).toEqual({ status: 200, body: DEMO_SESSION })
  })

  it('answers 401 with a message when the format is right but the account is not (ADR 0077)', () => {
    expect(
      loginAttempt({ email: 'ana@ejemplo.com', password: 'clave1234' }),
    ).toEqual({
      status: 401,
      body: { message: 'Correo o contraseña incorrectos.' },
    })
  })

  it('answers 400 with the messages under each field when the format is wrong', () => {
    expect(loginAttempt({ email: 'correo', password: '' })).toEqual({
      status: 400,
      body: {
        email: ['Escribe un correo válido'],
        password: ['Escribe tu contraseña'],
      },
    })
  })

  it.each([
    ['nothing', undefined],
    ['null', null],
    ['text', 'hola'],
    ['a number', 42],
    ['a list', []],
  ])(
    'answers 400 with a message for each field when the body is %s',
    (_label, body) => {
      expect(loginAttempt(body)).toEqual({
        status: 400,
        body: {
          email: ['Escribe un correo válido'],
          password: ['Escribe tu contraseña'],
        },
      })
    },
  )
})
