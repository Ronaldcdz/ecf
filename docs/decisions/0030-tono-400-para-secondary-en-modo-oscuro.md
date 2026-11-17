# 0030 — Tono 400 para `secondary` en modo oscuro

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1, L4); `docs/sistema-de-diseno.md` (sección 7); ADR 0027; tarea de Notion "Configurar tokens y tema de Nuxt UI"

## Contexto

El morado de marca `#2f0147` (tono 950, ADR 0027) da 1,01:1 sobre el fondo oscuro `#1c1c1c`: no se ve. Nuxt UI v4.12 usa el tono 400 de `secondary` en modo oscuro.

## Opciones consideradas

1. **Dejar el 400 por defecto** (≈ `#b68bd8`) — a favor: 6,23:1; sin configuración extra. En contra: casi la misma luminosidad que el azul `primary` 400 (1,08:1); se distinguen solo por el tono.
2. **Usar el 300** (≈ `#d7abfa`) — a favor: 9,00:1. En contra: morado pastel.
3. **Usar el 500** (≈ `#9c72bd`) — a favor: el que más se diferencia del azul en luminosidad (1,49:1). En contra: 4,51:1, al límite de AA.
4. **Usar el 950** (`#2f0147`) — a favor: mismo morado que en modo claro. En contra: 1,01:1, invisible.

## Decisión

`secondary` usa el tono 400 (valor por defecto de Nuxt UI) en modo oscuro.

## Por qué

Ronald eligió "A" sin recomendación previa.

## Consecuencias

En modo oscuro, `primary` y `secondary` se distinguen por el tono y no por la luminosidad. Como `secondary` se usa con moderación (ADR 0027), no deberían aparecer juntos con frecuencia. Ninguna información debe depender solo de distinguir esos dos colores.
