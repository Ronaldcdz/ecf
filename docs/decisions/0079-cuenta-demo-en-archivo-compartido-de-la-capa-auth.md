# 0079 — La cuenta demo vive en un archivo compartido de la capa auth

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S2, S4, T4); tarea de Notion "T4 Mock route /api/auth/login + useAuth composable + tests"

## Contexto

El botón "Entrar como demo" (navegador) y la ruta simulada (servidor) necesitan el mismo correo y contraseña. La cuenta demo no puede ir en `packages/shared`, porque la API real no debe conocerla (ADR 0068).

## Opciones consideradas

1. **Un archivo `layers/auth/shared/utils/demo-account.ts`** — a favor: Nuxt lo ofrece a la app y al servidor, así que ambos usan la misma fuente y no pueden diferir / en contra: la contraseña demo queda también en el código del navegador (es una cuenta pública de demostración).
2. **Dos copias (formulario y ruta)** — a favor: nada compartido / en contra: un error de escritura en una copia rompe la demo.

## Decisión

La cuenta demo, la sesión que devuelve y la función que comprueba las credenciales viven en `layers/auth/shared/utils/demo-account.ts`.

## Por qué

Ronald eligió la opción 1 sin añadir un motivo propio.

## Consecuencias

- Se verificó en la documentación de Nuxt que cada capa puede tener su carpeta `shared/` y que los archivos de `shared/utils/` se importan automáticamente en la app y en el servidor.
- Los tests de la regla viven junto al archivo, en Vitest.
