# 0032 — Tono 700 para los colores de estado en modo claro

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1, L4); `docs/sistema-de-diseno.md` (sección 7); ADR 0018; tarea de Notion "Configurar tokens y tema de Nuxt UI"

## Contexto

`success`, `warning`, `info` y `error` usan las paletas estándar de Tailwind (verde, amarillo, azul y rojo; ADR 0018). Nuxt UI v4.12 usa el tono 500 en modo claro con texto blanco en insignias y botones sólidos. Texto blanco sobre el 500: rojo 3,81:1, azul 3,76:1, verde 2,22:1, amarillo 1,91:1; ninguno pasa AA. En modo oscuro el tono 400 por defecto pasa en los cuatro. En esta app esos colores indican el estado de un e-CF, así que deben leerse bien.

## Opciones consideradas

1. **Los cuatro en el 700** — a favor: una sola regla; todos pasan (rojo 6,42, azul 6,83, verde 4,95, amarillo 4,93). En contra: rojo y azul quedan más oscuros de lo necesario.
2. **Cada uno en el tono más claro que pase** (rojo y azul en 600, verde y amarillo en 700) — a favor: colores lo más vivos posible. En contra: tonos mezclados.
3. **Dejar el 500 por defecto** — a favor: sin cambios. En contra: texto blanco no pasa AA en ninguno; verde y amarillo ni siquiera llegan a 3:1.

## Decisión

`success`, `warning`, `info` y `error` usan el tono 700 en modo claro; en modo oscuro, el 400 por defecto.

## Por qué

Ronald eligió "A" sin recomendación previa: una sola regla para los cuatro colores.

## Consecuencias

El amarillo 700 se ve ámbar o marrón. El test de contraste mide texto blanco sobre el 700 de cada color en modo claro y cada color 400 frente al fondo oscuro.
