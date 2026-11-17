# 0026 — Tono 600 para el texto secundario (`text-muted`)

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1, L4); `docs/sistema-de-diseno.md` (sección 7); tarea de Notion "Configurar tokens y tema de Nuxt UI"

## Contexto

Nuxt UI v4.12 usa `neutral-500` para `--ui-text-muted` (pistas, placeholders, descripciones). El gris de marca `#717c89` (ADR 0018) cae en el tono 500 y da 4,25:1 sobre blanco: no pasa AA (4,5:1).

## Opciones consideradas

1. **Mover `muted` al 600** (≈ `#49535f`) — a favor: 7,82:1 sobre blanco y 7,49:1 sobre `bg-muted`; el gris de marca sigue en la escala; es el mismo tipo de ajuste que el ADR 0025. En contra: el texto secundario se ve más oscuro y se distingue menos del principal.
2. **Mantener el 500, pero generarlo con la luminosidad de Tailwind** (≈ `#6a7481`) — a favor: no se cambia la capa semántica. En contra: el gris de marca exacto sale de la escala (choca con S1) y da 4,54:1 sobre `bg-muted`, casi sin margen.
3. **Mantener el 500 = `#717c89`** — a favor: color de marca exacto sin cambios. En contra: 4,25:1, no pasa AA.

## Decisión

`--ui-text-muted` usa el tono 600 de `neutral` en modo claro.

## Por qué

Ronald eligió la opción A sin recomendación previa (pidió decidir primero y recibir la recomendación después).

## Consecuencias

El test de contraste de T2 mide `text-muted` sobre `bg` y `bg-muted`. Como `--ui-text-toned` también usa el 600 por defecto, `muted` y `toned` se verán iguales; si hace falta distinguirlos, se decide aparte. El modo oscuro se decide aparte.
