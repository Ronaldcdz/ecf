# 0074 — El correo del login se limpia: sin espacios y en minúsculas

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S2, T3); `packages/shared/src/auth/login.ts`; tarea de Notion "T3 Login schemas in packages/shared + tests"

## Contexto

El formulario de login recibe el correo tal como lo escribe el visitante, por ejemplo `" Demo@FacturaRD.do "`. Había que decidir si el esquema Zod lo limpia antes de validarlo y compararlo con la cuenta demo.

## Opciones consideradas

1. **Quitar espacios y pasar a minúsculas** — a favor: la cuenta demo se reconoce sin importar cómo se escriba; evita errores por un espacio al pegar / en contra: el valor que llega al servidor ya no es exactamente lo que se escribió.
2. **Solo quitar espacios** — a favor: respeta las mayúsculas / en contra: `Demo@...` no coincidiría con `demo@...`.
3. **Ninguna de las dos** — a favor: se valida exactamente lo escrito / en contra: un espacio al final hace fallar un correo correcto.

## Decisión

El esquema quita los espacios de los extremos y pasa el correo a minúsculas antes de comprobar su formato. La contraseña no se toca.

## Por qué

Ronald eligió la opción 1 sin añadir un motivo propio.

## Consecuencias

- La limpieza vive en `loginSchema` (`packages/shared`), así el formulario de la web y la API de la Fase 3 aplican la misma regla.
- La contraseña conserva sus espacios, porque pueden ser parte de ella; una contraseña de solo espacios se acepta porque no está vacía.
- Si el proveedor de correo o la API real distinguieran mayúsculas en el correo, habría que revisar esta decisión.
