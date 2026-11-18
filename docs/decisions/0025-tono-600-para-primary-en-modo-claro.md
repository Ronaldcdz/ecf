# 0025 — Tono 600 para `primary` en modo claro

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1, L4); `docs/sistema-de-diseno.md` (secciones 3 y 7); tarea de Notion "Configurar tokens y tema de Nuxt UI"

## Contexto

Nuxt UI v4.12 usa el tono 500 de cada color semántico en modo claro. El azul de marca `#247ba0` (ADR 0018) tiene una luminosidad OKLCH de 54,9 %, que corresponde al tono 600 de la escala (`blue-600` de Tailwind = 54,6 %). Un botón sólido de Nuxt UI pone texto blanco sobre `primary`, así que esa pareja debe pasar AA (4,5:1).

## Opciones consideradas

1. **Usar el 600** (`--ui-primary: var(--ui-color-primary-600)`) — a favor: es el azul exacto de marca; el texto blanco da 4,76:1 y pasa AA. En contra: una línea que se aparta del valor por defecto de Nuxt UI.
2. **Dejar el 500 por defecto** (≈ `#3e91b7`) — a favor: no hay que cambiar nada. En contra: el texto blanco da 3,54:1 y no pasa AA; el azul de marca no aparecería en los botones.

## Decisión

`primary` usa el tono 600 en modo claro.

## Por qué

Ronald eligió "A, use the 600": conserva el color de marca exacto y es la única opción que pasa AA con texto blanco.

## Consecuencias

El test de contraste de T2 debe medir texto blanco sobre `primary-600`. El modo oscuro se decide aparte, porque allí el fondo es oscuro y cambia la pareja que se mide.
