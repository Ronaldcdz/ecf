# 0022 — Página `/design` en desarrollo y producción

- **Fecha:** 2026-11-13
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S4); tarea de Notion "Página /design de muestra"

## Contexto

Los tokens solo se validan de verdad al verlos aplicados en los componentes reales. Ronald preguntó si era mejor esa página o una maqueta en Claude Design. La maqueta muestra cómo *debería* verse; la página, cómo se ve *de verdad* con el código actual.

## Opciones consideradas

1. **`/design` solo en desarrollo** — a favor: referencia interna que no llega a producción. En contra: una página más que mantener.
2. **`/design` también en producción** — a favor: se puede enseñar en la demo del MVP. En contra: expone una página interna.
3. **Sin página** — a favor: menos trabajo. En contra: los problemas de contraste aparecen tarde.

## Decisión

Opción 2: "Hazla para ambos".

## Por qué

La página es la fuente única de verdad de los tokens y demuestra que la historia está terminada. Además, sirve para la demo.

## Consecuencias

La página es pública en producción, así que no debe mostrar datos reales ni nada interno.
