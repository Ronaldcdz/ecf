# 0059 — Los tests E2E usan `@nuxt/test-utils/playwright`

- **Fecha:** 2026-11-24
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T5, S1); tarea de Notion "Configurar Playwright"

## Contexto

`CLAUDE.md` fija Playwright para los flujos. Antes de escribir el primer test hay que decidir cómo se arranca Nuxt para que Playwright lo pruebe.

## Opciones consideradas

1. **`@playwright/test` solo, con la opción `webServer`** — a favor: es la configuración oficial de Playwright, sin capa extra de Nuxt / en contra: el comando, el puerto y la espera del servidor se configuran a mano.
2. **`@nuxt/test-utils/playwright`** — a favor: es la ayuda oficial de Nuxt sobre `@playwright/test`; construye y arranca Nuxt solo, en un puerto libre, y su `goto` puede esperar a que Vue esté listo en la página (`waitUntil: 'hydration'`) / en contra: una dependencia más.

## Decisión

`@nuxt/test-utils/playwright`.

## Por qué

En palabras de Ronald: "Es más fácil de integrar, porque es la forma que recomienda el equipo de Nuxt."

## Consecuencias

- `apps/web` instala `@nuxt/test-utils` y `@playwright/test` como dependencias de desarrollo.
- Los tests importan `test` y `expect` desde `@nuxt/test-utils/playwright`, no desde `@playwright/test`.
