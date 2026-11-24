# 0062 — Los tests E2E corren contra el servidor de desarrollo

- **Fecha:** 2026-11-24
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T5, S1); tarea de Notion "Configurar Playwright"; [0059](0059-playwright-con-nuxt-test-utils.md)

## Contexto

`@nuxt/test-utils` tiene la opción `dev`: con `false` (valor por defecto) construye la app con `nuxt build` y prueba el servidor construido; con `true` usa el servidor de desarrollo, como `bun run dev`.

## Opciones consideradas

1. **Build de producción (`dev: false`)** — a favor: prueba lo mismo que recibirán los usuarios y encuentra errores que solo aparecen al construir / en contra: arranca más lento, porque construye en cada corrida.
2. **Servidor de desarrollo (`dev: true`)** — a favor: arranca más rápido mientras se escriben tests / en contra: no es el servidor de producción, así que un error de build puede pasar los tests.

## Decisión

Servidor de desarrollo (`dev: true`).

## Por qué

En palabras de Ronald: "Porque todavía no se va a publicar en producción. Pero eso puede cambiar."

## Consecuencias

- Un error que solo aparece en `nuxt build` no lo detectan los E2E.
- Revisar esta decisión antes del despliegue en Vercel (producción el 1 de marzo de 2027).
