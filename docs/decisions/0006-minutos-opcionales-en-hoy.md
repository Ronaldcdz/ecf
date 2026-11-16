# 0006 — `/hoy` no exige los minutos disponibles

- **Fecha:** 2026-11-04
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `.claude/skills/hoy/SKILL.md`

## Contexto

`/hoy` preguntaba en cada sesión cuántos minutos había disponibles para elegir una tarea cuyo estimado cupiera en ellos. Ronald no siempre tiene un tiempo fijo y quiere avanzar la fase actual en el tiempo que tenga.

## Opciones consideradas

1. **Minutos opcionales** — a favor: `/hoy` arranca sin preguntas. En contra: sin minutos, puede proponer una tarea que no se termine en la sesión.
2. **Seguir preguntando** — a favor: la tarea elegida siempre cabe en la sesión. En contra: añade un paso aunque no haya un tiempo definido.

## Decisión

Opción 1. Si no se indican minutos, `/hoy` no pregunta, no filtra por Estimado (min) y propone la primera tarea por Orden que no esté bloqueada. Si se indican, sigue eligiendo la primera que quepa.

## Por qué

En palabras de Ronald: "No tengo minutos fijos, sigamos con la fase actual. Actualiza esa skill para que si no especifico minutos entienda por default que solo trabajaré cualquier tiempo."

## Consecuencias

Una tarea puede quedar a medias al cerrar la sesión. `/cerrar` lo detecta y deja la tarea En Progreso (ADR 0007).
