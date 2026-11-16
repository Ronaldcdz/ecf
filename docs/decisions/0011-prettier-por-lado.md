# 0011 — Prettier con un estilo por lado

- **Fecha:** 2026-11-04
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** Tarea de Notion "Crear monorepo con Bun, estructura base y CLAUDE.md"

## Contexto

Prettier necesita un estilo. El código fuente de Nuxt no usa punto y coma y el starter de NestJS sí. Ambos usan comillas simples.

## Opciones consideradas

1. **Uno solo, sin punto y coma** — a favor: un solo estilo y un solo archivo / en contra: el backend se ve distinto de los ejemplos de NestJS.
2. **Uno solo, con punto y coma** — a favor: un solo estilo y un solo archivo / en contra: el frontend se ve distinto de los ejemplos de Nuxt.
3. **Uno por lado** — a favor: cada app se ve como su framework / en contra: dos archivos, y el código cambia de formato al moverlo entre `shared` y `api`.

## Decisión

El `.prettierrc` de la raíz va sin punto y coma y aplica a `apps/web` y `packages/shared`. `apps/api/.prettierrc` va con punto y coma.

## Por qué

Ronald preguntó: "Pero NestJS no usa el mismo tipo de formato que Nuxt. Para qué tener uno solo?" y prefirió que cada lado conserve el formato de su framework.

## Consecuencias

Un `.prettierrc` anidado reemplaza al de la raíz, así que `apps/api/.prettierrc` debe repetir `singleQuote`. Si el generador de NestJS crea su propio archivo en la Fase 3, hay que revisarlo.
