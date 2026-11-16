# 0008 — ESLint por paquete

- **Fecha:** 2026-11-04
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** Tarea de Notion "Crear monorepo con Bun, estructura base y CLAUDE.md"

## Contexto

El monorepo tiene una app Nuxt y paquetes que no son Nuxt. El módulo `@nuxt/eslint` genera su configuración en `apps/web/.nuxt`, que solo existe después de correr `nuxt prepare`.

## Opciones consideradas

1. **Por paquete** — a favor: cada paquete tiene las reglas que le tocan y `shared` no depende de Nuxt / en contra: hay más de un archivo de configuración.
2. **Una sola en la raíz** — a favor: un solo archivo / en contra: no aprovecha `@nuxt/eslint` y las reglas de Vue se mantienen a mano.
3. **Raíz con `withNuxt`** — a favor: un solo archivo con reglas de Nuxt / en contra: el lint de cualquier paquete depende de que `apps/web` esté preparado.

## Decisión

Cada paquete tiene su propia configuración de lint. `apps/web` usa `@nuxt/eslint` y `packages/shared` usa `eslint.config.base.mjs`.

## Por qué

En palabras de Ronald: "Para que cada proyecto (front y back) mantengan sus recomendaciones oficiales de los docs."

## Consecuencias

Hay varios archivos de configuración. `bun run lint` en la raíz llama al script `lint` de cada paquete. `apps/api` usa otra herramienta (ADR [0013](0013-oxlint-en-api.md)).
