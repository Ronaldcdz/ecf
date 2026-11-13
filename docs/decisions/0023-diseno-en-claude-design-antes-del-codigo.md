# 0023 — Diseñar cada pantalla en Claude Design antes del código

- **Fecha:** 2026-11-13
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S5); tarea de Notion "Sistema de diseño en Claude Design"; `CLAUDE.md`

## Contexto

Ronald toma las decisiones de diseño de UI (`CLAUDE.md`), pero hasta ahora no tenía forma de ver una pantalla antes de que llegara al código.

## Opciones consideradas

1. **Diseñar directamente en código** — a favor: sin pasos extra. En contra: Ronald ve la pantalla cuando ya está programada y cada cambio cuesta más.
2. **Diseñar primero en Claude Design** — a favor: Ronald revisa y aprueba antes de programar. En contra: hace falta un sistema de diseño en Claude Design con los mismos tokens que el código; si no, cada maqueta inventa sus colores.

## Decisión

Opción 2: "para hacer todo el diseno lo haremos en claude design para yo verlo antes de que llegue al codigo". El sistema de diseño en Claude Design se crea en esta misma historia.

## Por qué

Ronald quiere ver cada diseño antes de que llegue al código. Crear el sistema de diseño ahora evita traducir los tokens dos veces en momentos distintos.

## Consecuencias

- El código es la fuente de verdad de los tokens. Si un token cambia, se actualiza también el sistema de diseño en Claude Design.
- Cada historia de UI añade un paso de diseño antes del código.
