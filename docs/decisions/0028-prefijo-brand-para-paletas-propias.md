# 0028 — Prefijo `brand-` para las paletas propias

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1, S2, L4); `docs/sistema-de-diseno.md` (secciones 1 y 7); tarea de Notion "Configurar tokens y tema de Nuxt UI"

## Contexto

Las tres escalas de 11 tonos de la capa primitiva necesitan un nombre en `@theme` (`--color-<nombre>-<tono>`) y en `app.config.ts`. Los nombres `blue`, `purple` y `gray` ya existen en Tailwind: redefinirlos reemplazaría sus paletas.

## Opciones consideradas

1. **Prefijo de marca** (`brand-blue`, `brand-purple`, `brand-gray`) — a favor: deja claro que son colores propios y no de Tailwind. En contra: nombres algo largos.
2. **Nombres descriptivos** (`cerulean`, `plum`, `steel`) — a favor: cortos. En contra: hay que recordar a qué color corresponde cada palabra.
3. **Nombres por rol** (`brand-primary`, `brand-secondary`, `brand-neutral`) — a favor: el rol se ve en el nombre. En contra: mezcla la capa primitiva con la semántica; si el azul deja de ser `primary`, el nombre engaña.

## Decisión

Las paletas propias se llaman `brand-blue`, `brand-purple` y `brand-gray`.

## Por qué

Ronald eligió "A, use the brand prefix" sin recomendación previa.

## Consecuencias

Los componentes siguen usando `primary`, `secondary` y `neutral`; solo `app.config.ts` y `@theme` conocen los nombres `brand-*`. La regla de lint de T3 debe permitir estas paletas y prohibir las de Tailwind que no sean tokens.
